#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const TARGET_DIR = path.join(ROOT, "public", "products");
const STRICT = process.argv.includes("--strict");

const SUPPORTED_EXTENSIONS = new Set([
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
]);

const SIZE_LIMIT_BYTES = {
  ".svg": 500 * 1024,
  ".png": 400 * 1024,
  ".jpg": 350 * 1024,
  ".jpeg": 350 * 1024,
  ".webp": 250 * 1024,
  ".avif": 200 * 1024,
};

const toKb = (value) => `${(value / 1024).toFixed(1)} KB`;

async function collectFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectFiles(absolutePath);
      }
      return [absolutePath];
    })
  );

  return files.flat();
}

async function run() {
  let stat;
  try {
    stat = await fs.stat(TARGET_DIR);
  } catch {
    console.error(`Image audit failed: directory not found: ${TARGET_DIR}`);
    process.exit(1);
  }

  if (!stat.isDirectory()) {
    console.error(`Image audit failed: not a directory: ${TARGET_DIR}`);
    process.exit(1);
  }

  const allFiles = await collectFiles(TARGET_DIR);
  const imageFiles = allFiles.filter((filePath) =>
    SUPPORTED_EXTENSIONS.has(path.extname(filePath).toLowerCase())
  );

  const assets = await Promise.all(
    imageFiles.map(async (filePath) => {
      const fileStat = await fs.stat(filePath);
      const ext = path.extname(filePath).toLowerCase();
      return {
        ext,
        bytes: fileStat.size,
        relativePath: path.relative(ROOT, filePath),
      };
    })
  );

  assets.sort((a, b) => b.bytes - a.bytes);

  const totalBytes = assets.reduce((sum, item) => sum + item.bytes, 0);
  const oversized = assets.filter((asset) => asset.bytes > (SIZE_LIMIT_BYTES[asset.ext] ?? Infinity));

  console.log("Image asset audit: public/products");
  console.log(`Files scanned: ${assets.length}`);
  console.log(`Total size: ${toKb(totalBytes)}`);
  console.log("");

  console.log("Largest files:");
  assets.slice(0, 10).forEach((asset, index) => {
    console.log(`${String(index + 1).padStart(2, " ")}. ${asset.relativePath} (${toKb(asset.bytes)})`);
  });

  console.log("");
  if (oversized.length === 0) {
    console.log("No oversized files against current thresholds.");
    process.exit(0);
  }

  console.log("Oversized files:");
  oversized.forEach((asset) => {
    const limit = SIZE_LIMIT_BYTES[asset.ext];
    console.log(
      `- ${asset.relativePath} (${toKb(asset.bytes)} > ${toKb(limit)})`
    );
  });

  console.log("");
  console.log("Suggestion: compress SVGs via SVGO and export heavy assets as WebP/AVIF where possible.");

  if (STRICT) {
    process.exit(2);
  }
}

run().catch((error) => {
  console.error("Image audit failed with an unexpected error.");
  console.error(error);
  process.exit(1);
});
