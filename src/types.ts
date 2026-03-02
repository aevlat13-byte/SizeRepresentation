export type ScaffoldingLevel = 'heavy' | 'partial' | 'minimal';

export type QuestionType =
  | 'pixels'
  | 'bits'
  | 'bytes'
  | 'mb'
  | 'mib'
  | 'inferBpp'
  | 'paletteToBpp'
  | 'differenceReason';

export interface Question {
  id: string;
  prompt: string;
  type: QuestionType;
  tolerance?: number;
  options?: string[];
}

export interface Level {
  id: number;
  title: string;
  scenario: string;
  width: number;
  height: number;
  colourDepthBits?: number;
  colourDepthBytes?: number;
  paletteSize?: number;
  providedFileSizeBytes?: number;
  scaffoldingLevel: ScaffoldingLevel;
  questions: Question[];
}

export interface DerivedMetrics {
  pixels: number;
  bitsPerPixel: number;
  bits: number;
  bytes: number;
  mb: number;
  mib: number;
}
