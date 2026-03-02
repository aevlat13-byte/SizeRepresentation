import { describe, expect, it } from 'vitest';
import { bitsFromPixels, bytesFromBits, inferBitsPerPixel, mbFromBytes, mibFromBytes, paletteToBpp, roundTo2 } from './calculations';

describe('calculation helpers', () => {
  it('computes bits and bytes', () => {
    expect(bitsFromPixels(640 * 500, 24)).toBe(7680000);
    expect(bytesFromBits(7680000)).toBe(960000);
  });

  it('converts MB and MiB correctly', () => {
    expect(roundTo2(mbFromBytes(960000))).toBe(0.96);
    expect(roundTo2(mibFromBytes(960000))).toBe(0.92);
  });

  it('infers palette and bpp', () => {
    expect(paletteToBpp(256)).toBe(8);
    expect(inferBitsPerPixel(360000, 400, 300)).toBe(24);
  });

  it('handles decimal rounding edge', () => {
    expect(roundTo2(1.005)).toBe(1);
  });
});
