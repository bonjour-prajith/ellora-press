import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REPORT_CONTENT_LENGTH_BYTES = 30_000;

const noStoreHeaders = {
  "Cache-Control": "no-store",
} as const;

function makeRequestId() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `csp_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function safeSerialize(payload: unknown, maxLength = 4_000) {
  try {
    const serialized = JSON.stringify(payload);
    if (serialized.length <= maxLength) return serialized;
    return `${serialized.slice(0, maxLength)}...(truncated)`;
  } catch {
    return '"[unserializable]"';
  }
}

export async function POST(request: Request) {
  const requestId = makeRequestId();
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  const contentType = request.headers.get("content-type") ?? "";

  if (
    Number.isFinite(contentLength) &&
    contentLength > MAX_REPORT_CONTENT_LENGTH_BYTES
  ) {
    return new NextResponse(null, {
      status: 204,
      headers: { ...noStoreHeaders, "X-Request-Id": requestId },
    });
  }

  let payload: unknown = null;
  try {
    if (
      contentType.includes("application/json") ||
      contentType.includes("application/reports+json") ||
      contentType.includes("application/csp-report")
    ) {
      payload = await request.json();
    } else {
      payload = await request.text();
    }
  } catch {
    payload = null;
  }

  console.warn(
    JSON.stringify({
      ts: new Date().toISOString(),
      level: "warn",
      event: "csp_report",
      route: "/api/csp-report",
      requestId,
      contentType,
      contentLength: Number.isFinite(contentLength) ? contentLength : null,
      report: safeSerialize(payload),
    })
  );

  return new NextResponse(null, {
    status: 204,
    headers: { ...noStoreHeaders, "X-Request-Id": requestId },
  });
}

