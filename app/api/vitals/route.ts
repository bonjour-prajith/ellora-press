import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WebVitalsPayload = {
  id: string;
  name: string;
  value: number;
  delta: number;
  rating: string;
  navigationType: string;
  path: string;
  ts: number;
};

const isValidPayload = (payload: unknown): payload is WebVitalsPayload => {
  if (!payload || typeof payload !== "object") return false;
  const candidate = payload as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.value === "number" &&
    typeof candidate.delta === "number" &&
    typeof candidate.rating === "string" &&
    typeof candidate.navigationType === "string" &&
    typeof candidate.path === "string" &&
    typeof candidate.ts === "number"
  );
};

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  if (!isValidPayload(payload)) {
    return NextResponse.json(
      { error: "Invalid vitals payload." },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

  // Log in development for quick verification; production forwarding can be added later.
  if (process.env.NODE_ENV !== "production") {
    const metric = payload;
    console.info(
      `[WebVitals] ${metric.name}=${metric.value} rating=${metric.rating} path=${metric.path}`
    );
  }

  return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
