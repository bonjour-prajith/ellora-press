import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { QuoteEmail } from '@/components/emails/QuoteEmail';
import { AutoReplyEmail } from '@/components/emails/AutoReplyEmail';
import { render } from '@react-email/render';
import * as React from 'react';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ENTRIES = 10_000;
const MAX_CONTENT_LENGTH_BYTES = 20_000;
const MAX_EMAIL_LENGTH = 320;
const MAX_DETAILS_LENGTH = 5_000;
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

type QuoteRequestPayload = {
  email: string;
  details: string;
  website: string;
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const pickString = (value: unknown, maxLength = 5000) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : '';

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const noStoreHeaders = {
  'Cache-Control': 'no-store',
} as const;

const routeTag = '/api/send';
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

type LogLevel = 'info' | 'warn' | 'error';

function logStructured(level: LogLevel, event: string, details: Record<string, unknown>) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    event,
    route: routeTag,
    ...details,
  };
  const line = JSON.stringify(payload);
  if (level === 'error') {
    console.error(line);
    return;
  }
  if (level === 'warn') {
    console.warn(line);
    return;
  }
  console.info(line);
}

function makeRequestId() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function parseHostFromUrl(raw: string | null): string | null {
  if (!raw) return null;
  try {
    return new URL(raw).host;
  } catch {
    return null;
  }
}

function withRequestHeaders(requestId: string) {
  return {
    ...noStoreHeaders,
    'X-Request-Id': requestId,
  };
}

function checkRateLimitInMemory(ip: string): boolean {
  const now = Date.now();

  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }

  // Guard against unbounded growth in long-running processes.
  if (rateLimitStore.size > RATE_LIMIT_MAX_ENTRIES) {
    rateLimitStore.clear();
  }

  const entry = rateLimitStore.get(ip);
  if (!entry) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return true;
}

async function checkRateLimitDistributed(ip: string): Promise<boolean | null> {
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  const bucket = Math.floor(Date.now() / RATE_LIMIT_WINDOW_MS);
  const key = `rate:api:send:${bucket}:${ip}`;
  const encodedKey = encodeURIComponent(key);

  try {
    const incrementResponse = await fetch(`${UPSTASH_REDIS_REST_URL}/incr/${encodedKey}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!incrementResponse.ok) {
      throw new Error(`Upstash incr failed with status ${incrementResponse.status}`);
    }

    const incrementJson = (await incrementResponse.json()) as { result?: number };
    const count = typeof incrementJson.result === 'number' ? incrementJson.result : NaN;
    if (!Number.isFinite(count)) {
      throw new Error('Upstash incr response missing numeric result');
    }

    // Best effort TTL (2 windows). Rate limiting still works even if this call fails.
    if (count === 1) {
      void fetch(
        `${UPSTASH_REDIS_REST_URL}/expire/${encodedKey}/${Math.ceil((RATE_LIMIT_WINDOW_MS * 2) / 1000)}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}`,
          },
          cache: 'no-store',
        }
      ).catch(() => undefined);
    }

    return count <= RATE_LIMIT_MAX_REQUESTS;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStructured('warn', 'rate_limit_distributed_fallback', {
      reason: errorMessage,
    });
    return null;
  }
}

function isAllowedOrigin(request: Request): boolean {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  const allowedHosts = new Set<string>(['localhost:3000', '127.0.0.1:3000']);

  if (configuredOrigin) {
    try {
      const configuredHost = new URL(configuredOrigin).host;
      allowedHosts.add(configuredHost);
      if (configuredHost.startsWith('www.')) {
        allowedHosts.add(configuredHost.slice(4));
      } else {
        allowedHosts.add(`www.${configuredHost}`);
      }
    } catch {
      // Ignore invalid configured URL and continue with localhost fallbacks.
    }
  }

  const origin = request.headers.get('origin');
  if (origin) {
    try {
      return allowedHosts.has(new URL(origin).host);
    } catch {
      return false;
    }
  }

  const referer = request.headers.get('referer');
  if (referer) {
    try {
      return allowedHosts.has(new URL(referer).host);
    } catch {
      return false;
    }
  }

  // No origin/referrer: allow (covers same-origin server calls and tooling).
  return true;
}

function normalizePayload(body: unknown): QuoteRequestPayload | null {
  if (!isObject(body)) return null;

  const email = pickString(body.email, MAX_EMAIL_LENGTH);
  const website = pickString(body.website, 255);

  const detailsFromQuote = pickString(body.details, MAX_DETAILS_LENGTH);
  if (email && detailsFromQuote) {
    return { email, details: detailsFromQuote, website };
  }

  const fullName = pickString(body.fullName, 160) || pickString(body.name, 160);
  const phone = pickString(body.phone, 64);
  const projectType = pickString(body.projectType, 160);
  const message = pickString(body.message, MAX_DETAILS_LENGTH);

  if (!email || !message) {
    return null;
  }

  const details = [
    fullName ? `Full Name: ${fullName}` : null,
    phone ? `Phone: ${phone}` : null,
    projectType ? `Project Type: ${projectType}` : null,
    `Message: ${message}`,
  ]
    .filter(Boolean)
    .join('\n')
    .slice(0, MAX_DETAILS_LENGTH);

  return { email, details, website };
}

export async function POST(request: Request) {
  const requestId = makeRequestId();
  const startedAt = performance.now();
  const contentType = request.headers.get('content-type') ?? '';
  const contentLength = Number(request.headers.get('content-length') ?? '0');
  const originHost = parseHostFromUrl(request.headers.get('origin'));
  const refererHost = parseHostFromUrl(request.headers.get('referer'));
  if (!isAllowedOrigin(request)) {
    logStructured('warn', 'request_rejected_origin', {
      requestId,
      originHost,
      refererHost,
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
    });
    return NextResponse.json(
      { error: 'Request origin is not allowed.' },
      { status: 403, headers: withRequestHeaders(requestId) }
    );
  }

  if (!contentType.toLowerCase().includes('application/json')) {
    logStructured('warn', 'request_rejected_content_type', {
      requestId,
      contentType,
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
    });
    return NextResponse.json(
      { error: 'Content-Type must be application/json.' },
      { status: 415, headers: withRequestHeaders(requestId) }
    );
  }

  if (Number.isFinite(contentLength) && contentLength > MAX_CONTENT_LENGTH_BYTES) {
    logStructured('warn', 'request_rejected_payload_too_large', {
      requestId,
      contentLength,
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
    });
    return NextResponse.json(
      { error: 'Payload is too large.' },
      { status: 413, headers: withRequestHeaders(requestId) }
    );
  }

  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const clientIp =
    forwardedFor?.split(',')[0]?.trim() ||
    realIp?.trim() ||
    cfConnectingIp?.trim() ||
    'unknown';

  logStructured('info', 'request_received', {
    requestId,
    clientIp,
    originHost,
    refererHost,
    contentLength: Number.isFinite(contentLength) ? contentLength : null,
  });

  const distributedRateLimitResult = await checkRateLimitDistributed(clientIp);
  const rateLimitAllowed =
    distributedRateLimitResult === null
      ? checkRateLimitInMemory(clientIp)
      : distributedRateLimitResult;

  if (!rateLimitAllowed) {
    logStructured('warn', 'request_rejected_rate_limited', {
      requestId,
      clientIp,
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
    });
    return NextResponse.json(
      { error: 'Too many requests. Please wait a minute and try again.' },
      { status: 429, headers: withRequestHeaders(requestId) }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    logStructured('warn', 'request_rejected_invalid_json', {
      requestId,
      clientIp,
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
    });
    return NextResponse.json(
      { error: 'Invalid request payload.' },
      { status: 400, headers: withRequestHeaders(requestId) }
    );
  }

  const payload = normalizePayload(body);
  if (!payload) {
    logStructured('warn', 'request_rejected_invalid_payload', {
      requestId,
      clientIp,
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
    });
    return NextResponse.json(
      { error: 'Please provide a valid email and project details.' },
      { status: 400, headers: withRequestHeaders(requestId) }
    );
  }

  const { email, details, website } = payload;
  if (!isValidEmail(email)) {
    logStructured('warn', 'request_rejected_invalid_email', {
      requestId,
      clientIp,
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
    });
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
      { status: 400, headers: withRequestHeaders(requestId) }
    );
  }

  if (website) {
    logStructured('info', 'honeypot_triggered', {
      requestId,
      clientIp,
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
    });
    return NextResponse.json(
      { message: 'Request accepted.' },
      { headers: withRequestHeaders(requestId) }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    logStructured('error', 'email_service_not_configured', {
      requestId,
      clientIp,
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
    });
    return NextResponse.json(
      { error: 'Email service is not configured. Please try again later.' },
      { status: 503, headers: withRequestHeaders(requestId) }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // 1. Send internal notification
    await resend.emails.send({
      from: 'Ellora Press <solutions@ellorapress.com>',
      to: ['solutions@ellorapress.com'],
      replyTo: email,
      subject: '🚀 New Quote Request',
      html: await render(<QuoteEmail email={email} details={details} />),
    });

    // 2. Send auto-reply to customer
    await resend.emails.send({
      from: 'Ellora Press <solutions@ellorapress.com>',
      to: [email],
      subject: 'We received your quote request',
      html: await render(<AutoReplyEmail />),
    });

    logStructured('info', 'emails_sent', {
      requestId,
      clientIp,
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
    });
    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { headers: withRequestHeaders(requestId) }
    );
  } catch (error) {
    const errorName = error instanceof Error ? error.name : 'UnknownError';
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStructured('error', 'email_send_failed', {
      requestId,
      clientIp,
      errorName,
      errorMessage,
      durationMs: Number((performance.now() - startedAt).toFixed(1)),
    });
    return NextResponse.json(
      { error: 'Unable to send email right now. Please try again shortly.' },
      { status: 500, headers: withRequestHeaders(requestId) }
    );
  }
}
