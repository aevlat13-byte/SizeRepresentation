import { Level } from '../types';

export const levels: Level[] = [
  {
    id: 1,
    title: 'Level 1 - Starry Night Save Slot',
    scenario: 'Task 1 worksheet: The Starry Night screenshot is 640×500 with colour depth 3 bytes (24 bits).',
    width: 640,
    height: 500,
    colourDepthBytes: 3,
    scaffoldingLevel: 'heavy',
    questions: [
      { id: 'l1-q1', prompt: 'How many bytes are needed?', type: 'bytes' },
      { id: 'l1-q2', prompt: 'Convert to MB (decimal, 2 d.p.)', type: 'mb', tolerance: 0.01 }
    ]
  },
  {
    id: 2,
    title: 'Level 2 - Kingfisher Capture Card',
    scenario: 'Task 2 worksheet: kingfisher.bmp style problem, 1024×720 at 24 bits per pixel.',
    width: 1024,
    height: 720,
    colourDepthBits: 24,
    scaffoldingLevel: 'heavy',
    questions: [
      { id: 'l2-q1', prompt: 'Total size in bits?', type: 'bits' },
      { id: 'l2-q2', prompt: 'Convert that value to bytes.', type: 'bytes' },
      { id: 'l2-q3', prompt: 'Convert bytes to MB (2 d.p.)', type: 'mb', tolerance: 0.01 },
      { id: 'l2-q4', prompt: 'Why might actual file size differ from this calculation?', type: 'differenceReason' }
    ]
  },
  {
    id: 3,
    title: 'Level 3 - Dungeon Map Buffer',
    scenario: 'No reminder now: if colour depth is missing, default to 24 bits.',
    width: 800,
    height: 600,
    scaffoldingLevel: 'partial',
    questions: [{ id: 'l3-q1', prompt: 'Image size in bytes?', type: 'bytes' }]
  },
  {
    id: 4,
    title: 'Level 4 - Pixel Forge Export',
    scenario: 'Compare decimal MB and binary MiB for an export.',
    width: 1280,
    height: 720,
    colourDepthBits: 32,
    scaffoldingLevel: 'partial',
    questions: [
      { id: 'l4-q1', prompt: 'Size in MB (decimal)', type: 'mb', tolerance: 0.01 },
      { id: 'l4-q2', prompt: 'Size in MiB (binary)', type: 'mib', tolerance: 0.01 }
    ]
  },
  {
    id: 5,
    title: 'Level 5 - Palette Plains',
    scenario: 'Retro mode uses a 256 colour palette. Infer bits per pixel first.',
    width: 512,
    height: 512,
    paletteSize: 256,
    scaffoldingLevel: 'partial',
    questions: [
      { id: 'l5-q1', prompt: 'Bits per pixel from 256 colours?', type: 'paletteToBpp' },
      { id: 'l5-q2', prompt: 'Total bytes for the image?', type: 'bytes' }
    ]
  },
  {
    id: 6,
    title: 'Level 6 - Mystery Capture',
    scenario: 'Given file data and resolution, infer colour depth.',
    width: 400,
    height: 300,
    providedFileSizeBytes: 360000,
    scaffoldingLevel: 'minimal',
    questions: [{ id: 'l6-q1', prompt: 'Infer bits per pixel.', type: 'inferBpp' }]
  },
  {
    id: 7,
    title: 'Level 7 - Raid Report',
    scenario: 'Mixed units challenge with almost no hints.',
    width: 1920,
    height: 1080,
    colourDepthBits: 16,
    scaffoldingLevel: 'minimal',
    questions: [
      { id: 'l7-q1', prompt: 'Total bits?', type: 'bits' },
      { id: 'l7-q2', prompt: 'Total MiB (2 d.p.)?', type: 'mib', tolerance: 0.01 }
    ]
  },
  {
    id: 8,
    title: 'Level 8 - Final Boss: File Truth',
    scenario: 'Explain why two files with same raw bitmap dimensions can have different disk sizes.',
    width: 1366,
    height: 768,
    colourDepthBits: 24,
    scaffoldingLevel: 'minimal',
    questions: [
      { id: 'l8-q1', prompt: 'Raw bytes?', type: 'bytes' },
      { id: 'l8-q2', prompt: 'Why can true file size differ?', type: 'differenceReason' }
    ]
  }
];
