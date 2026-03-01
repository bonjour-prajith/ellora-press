import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const cspReportOnly = process.env.CSP_REPORT_ONLY === "true";
const cspEnforce =
  process.env.CSP_ENFORCE === "true" ||
  (process.env.NODE_ENV === "production" && !cspReportOnly);
const cspHeaderKey = cspEnforce
  ? "Content-Security-Policy"
  : "Content-Security-Policy-Report-Only";

const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob: https://api.qrserver.com",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  scriptSrc,
  "connect-src 'self' https: ws: wss:",
  "media-src 'self' data: blob:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "frame-src 'none'",
  "upgrade-insecure-requests",
  "report-uri /api/csp-report",
].join("; ");

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(self), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: cspHeaderKey,
    value: cspDirectives,
  },
  {
    key: "Reporting-Endpoints",
    value: 'csp-endpoint="/api/csp-report"',
  },
  {
    key: "Report-To",
    value:
      '{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"/api/csp-report"}]}',
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
        pathname: "/v1/create-qr-code/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      {
        source: "/:path*\\.(svg|jpg|jpeg|png|webp|avif|gif|ico|ttf|otf|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
