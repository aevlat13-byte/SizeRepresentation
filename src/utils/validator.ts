import { Level, Question } from '../types';
import { deriveMetrics, inferBitsPerPixel, paletteToBpp, roundTo2 } from './calculations';

const DIFFERENCE_KEYWORDS = ['header', 'metadata', 'compression', 'format'];

export function expectedAnswer(level: Level, question: Question): string | number {
  const metrics = deriveMetrics(level);
  switch (question.type) {
    case 'pixels':
      return metrics.pixels;
    case 'bits':
      return metrics.bits;
    case 'bytes':
      return metrics.bytes;
    case 'mb':
      return roundTo2(metrics.mb);
    case 'mib':
      return roundTo2(metrics.mib);
    case 'inferBpp':
      return level.providedFileSizeBytes ? inferBitsPerPixel(level.providedFileSizeBytes, level.width, level.height) : metrics.bitsPerPixel;
    case 'paletteToBpp':
      return level.paletteSize ? paletteToBpp(level.paletteSize) : metrics.bitsPerPixel;
    case 'differenceReason':
      return 'headers/metadata/compression';
  }
}

export function validateAnswer(level: Level, question: Question, rawAnswer: string) {
  const exp = expectedAnswer(level, question);
  if (question.type === 'differenceReason') {
    const text = rawAnswer.toLowerCase();
    const ok = DIFFERENCE_KEYWORDS.some((k) => text.includes(k));
    return { correct: ok, expected: exp };
  }

  const num = Number(rawAnswer);
  if (Number.isNaN(num)) return { correct: false, expected: exp };

  const tolerance = question.tolerance ?? (question.type === 'mb' || question.type === 'mib' ? 0.01 : 0);
  const correct = Math.abs(num - Number(exp)) <= tolerance;
  return { correct, expected: exp };
}
