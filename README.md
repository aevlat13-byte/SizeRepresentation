# Pixel Byte Quest

A browser-based KS3 (Year 9) Computing game for learning bitmap image size calculations.

## Learning objective
- Calculate bitmap image sizes using resolution and colour depth.
- Convert between bits, bytes, MB (decimal), and MiB (binary).
- Explain why computed raw size can differ from real file size (headers, metadata, compression).

## Formula reference
- pixels = width × height
- bits = pixels × bitsPerPixel
- bytes = bits ÷ 8
- MB = bytes ÷ 1,000,000
- MiB = bytes ÷ 1,048,576
- bitsPerPixel from palette = log2(number of colours)

## Run locally
```bash
npm install
npm run dev
```

## Test
```bash
npm run test
```

## Teacher notes: editing/adding levels
Levels are data-driven in `src/data/levels.ts`.
Each level supports:
- `id`, `title`, `scenario`
- `width`, `height`
- `colourDepthBits` OR `colourDepthBytes` OR `paletteSize`
- optional `providedFileSizeBytes` for inference tasks
- `scaffoldingLevel`: `heavy` | `partial` | `minimal`
- `questions[]` with `type` values like `bits`, `bytes`, `mb`, `mib`, `inferBpp`, `paletteToBpp`, `differenceReason`

The validator and expected-answer engine are in `src/utils/validator.ts` and calculations in `src/utils/calculations.ts`.

## Troubleshooting blank page
- Do not open `index.html` directly from the file system. Run with Vite:
  - `npm install`
  - `npm run dev`
- If a runtime error occurs, an on-screen error panel now appears with a message; open DevTools Console for full details.
