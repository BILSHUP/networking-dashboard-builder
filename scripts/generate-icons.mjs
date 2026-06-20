// Generates public/icon-192.png and public/icon-512.png with zero dependencies.
// Runs in `npm run build` (and `npm run gen-icons`). Uses only Node built-ins so it
// works locally and on Vercel with no extra config. Mirrors public/icon.svg.
import { deflateSync } from "node:zlib";
import { writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const BG = [14, 19, 32];
const ACCENT = [91, 155, 245];
const GREEN = [123, 216, 143];

// Geometry in a 512-space (matches icon.svg), scaled to the target size.
const NODES = [
  [146, 150, 34],
  [372, 160, 28],
  [160, 372, 28],
  [372, 356, 34],
];
const CENTER = [256, 256, 46];
const STROKE = 14;

function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy || 1;
  let t = ((px - ax) * dx + (py - ay) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}

function renderRGBA(size) {
  const s = size / 512;
  const buf = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let color = BG;
      // connecting lines from center to each node
      for (const [nx, ny] of NODES) {
        if (
          distToSegment(x, y, CENTER[0] * s, CENTER[1] * s, nx * s, ny * s) <=
          (STROKE / 2) * s
        ) {
          color = ACCENT;
        }
      }
      // satellite nodes
      for (const [nx, ny, r] of NODES) {
        if (Math.hypot(x - nx * s, y - ny * s) <= r * s) color = ACCENT;
      }
      // center node
      if (Math.hypot(x - CENTER[0] * s, y - CENTER[1] * s) <= CENTER[2] * s) {
        color = GREEN;
      }
      const i = (y * size + x) * 4;
      buf[i] = color[0];
      buf[i + 1] = color[1];
      buf[i + 2] = color[2];
      buf[i + 3] = 255;
    }
  }
  return buf;
}

// --- Minimal PNG encoder ---
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}
function encodePNG(rgba, size) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  // raw scanlines with filter byte 0 per row
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

let wrote = 0;
for (const size of [192, 512]) {
  const out = join(OUT_DIR, `icon-${size}.png`);
  // Skip if already present (keeps incremental builds fast); delete to regenerate.
  if (existsSync(out) && process.argv.includes("--skip-existing")) continue;
  writeFileSync(out, encodePNG(renderRGBA(size), size));
  wrote++;
}
console.log(`generate-icons: wrote ${wrote} PNG icon(s) to /public`);
