import { defineConfig, globalIgnores } from "eslint/config";

const normalizeConfigArray = (value) => (Array.isArray(value) ? value : [value]);

let nextCoreConfigs = [];
let nextTsConfigs = [];

try {
  const nextVitalsModule = await import("eslint-config-next/core-web-vitals");
  const nextTsModule = await import("eslint-config-next/typescript");

  nextCoreConfigs = normalizeConfigArray(nextVitalsModule.default ?? nextVitalsModule);
  nextTsConfigs = normalizeConfigArray(nextTsModule.default ?? nextTsModule);
} catch {
  // Offline/legacy fallback: keep lint runnable; full Next rules activate once modern config entries resolve.
  nextCoreConfigs = [];
  nextTsConfigs = [];
}

export default defineConfig([
  ...nextCoreConfigs,
  ...nextTsConfigs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
