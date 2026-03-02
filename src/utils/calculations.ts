import { Level, DerivedMetrics } from '../types';

export const calculatePixels = (width: number, height: number) => width * height;
export const bitsFromPixels = (pixels: number, bitsPerPixel: number) => pixels * bitsPerPixel;
export const bytesFromBits = (bits: number) => bits / 8;
export const mbFromBytes = (bytes: number) => bytes / 1_000_000;
export const mibFromBytes = (bytes: number) => bytes / 1_048_576;
export const paletteToBpp = (paletteSize: number) => Math.log2(paletteSize);

export const resolveBitsPerPixel = (level: Level) => {
  if (level.colourDepthBits) return level.colourDepthBits;
  if (level.colourDepthBytes) return level.colourDepthBytes * 8;
  if (level.paletteSize) return paletteToBpp(level.paletteSize);
  return 24;
};

export const deriveMetrics = (level: Level): DerivedMetrics => {
  const pixels = calculatePixels(level.width, level.height);
  const bitsPerPixel = resolveBitsPerPixel(level);
  const bits = bitsFromPixels(pixels, bitsPerPixel);
  const bytes = bytesFromBits(bits);
  return { pixels, bitsPerPixel, bits, bytes, mb: mbFromBytes(bytes), mib: mibFromBytes(bytes) };
};

export const inferBitsPerPixel = (bytes: number, width: number, height: number) => {
  const pixels = calculatePixels(width, height);
  return (bytes * 8) / pixels;
};

export const roundTo2 = (n: number) => Math.round(n * 100) / 100;
