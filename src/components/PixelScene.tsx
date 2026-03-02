import { useEffect, useRef } from 'react';

export function PixelScene({ seed }: { seed: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rnd = (n: number) => Math.abs(Math.sin(seed * 999 + n));
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#0b1024';
    ctx.fillRect(0, 0, 160, 100);
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = i % 2 ? '#dbeafe' : '#93c5fd';
      ctx.fillRect(Math.floor(rnd(i) * 155), Math.floor(rnd(i + 1) * 35), 2, 2);
    }
    ctx.fillStyle = '#14532d';
    ctx.fillRect(0, 70, 160, 30);
    ctx.fillStyle = '#22c55e';
    for (let i = 0; i < 24; i++) ctx.fillRect(i * 7, 65 + (i % 2), 6, 5);
    ctx.fillStyle = '#f97316';
    const x = 20 + (seed * 17) % 120;
    ctx.fillRect(x, 52, 10, 10);
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(x + 2, 54, 2, 2);
    ctx.fillRect(x + 6, 54, 2, 2);
    ctx.fillStyle = '#7c2d12';
    ctx.fillRect(x + 2, 58, 6, 2);
  }, [seed]);

  return <canvas aria-label="Generated retro screenshot" className="w-full rounded border border-sky-500" ref={ref} width={160} height={100} />;
}
