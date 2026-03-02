import { useMemo, useState } from 'react';
import { Calculator } from './components/Calculator';
import { PixelScene } from './components/PixelScene';
import { levels } from './data/levels';
import { deriveMetrics } from './utils/calculations';
import { expectedAnswer, validateAnswer } from './utils/validator';

function App() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFormula, setShowFormula] = useState(true);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sound, setSound] = useState(false);

  const level = levels[levelIdx];
  const metrics = useMemo(() => deriveMetrics(level), [level]);
  const stars = Math.floor(xp / 100);

  const checkLevel = () => {
    const lines: string[] = [];
    let correctCount = 0;
    level.questions.forEach((q) => {
      const result = validateAnswer(level, q, answers[q.id] || '');
      if (result.correct) correctCount++;
      lines.push(`${q.prompt} => ${result.correct ? '✅' : `❌ expected ${result.expected}`}`);
    });
    const allCorrect = correctCount === level.questions.length;
    setFeedback(lines);
    if (allCorrect) {
      setXp((v) => v + 120);
      setStreak((s) => s + 1);
      if (sound) new Audio('data:audio/wav;base64,UklGRkQAAABXQVZFZm10IBAAAAABAAEA').play().catch(() => null);
    } else {
      setStreak(0);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 p-4 text-slate-100">
      <h1 className="mb-2 text-3xl font-bold text-cyan-300">Pixel Byte Quest (KS3 Year 9)</h1>
      <p className="mb-4">XP: {xp} | ⭐ Stars: {stars} | 🔥 Streak: {streak}</p>
      <div className="mb-3 flex flex-wrap gap-2">
        {levels.map((l, i) => (
          <button key={l.id} className={`rounded px-3 py-1 ${i === levelIdx ? 'bg-cyan-600' : 'bg-slate-700'}`} onClick={() => { setLevelIdx(i); setFeedback([]); }}>
            L{l.id}
          </button>
        ))}
        <button className="rounded bg-emerald-700 px-3 py-1" onClick={() => setSound((v) => !v)}>{sound ? 'Sound: On' : 'Sound: Off'}</button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <section className="rounded-lg border border-cyan-600 bg-slate-900 p-3">
          <h2 className="text-xl font-semibold">{level.title}</h2>
          <p className="mb-2 text-sm text-slate-300">{level.scenario}</p>
          <PixelScene seed={level.id} />
          <div className="mt-2 text-sm">
            <p>Resolution: {level.width} × {level.height}</p>
            <p>Colour depth: {level.colourDepthBits ? `${level.colourDepthBits} bits` : level.colourDepthBytes ? `${level.colourDepthBytes} bytes` : level.paletteSize ? `${level.paletteSize} colours` : 'Not stated'}</p>
            {level.id <= 3 && <p className="text-amber-300">Default rule: if colour depth not stated, assume 24 bits.</p>}
          </div>
        </section>

        <section className="rounded-lg border border-fuchsia-600 bg-slate-900 p-3">
          <h3 className="mb-2 text-lg font-semibold">Answer Area</h3>
          {level.questions.map((q) => (
            <label key={q.id} className="mb-2 block text-sm">
              {q.prompt}
              {q.options ? (
                <select aria-label={q.prompt} className="mt-1 w-full rounded bg-slate-800 p-2" value={answers[q.id] || ''} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}>
                  <option value="">Select</option>
                  {q.options.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              ) : (
                <input aria-label={q.prompt} className="mt-1 w-full rounded bg-slate-800 p-2" value={answers[q.id] || ''} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })} />
              )}
            </label>
          ))}
          <button className="rounded bg-fuchsia-700 px-3 py-2" onClick={checkLevel}>Check Answers</button>
          <div className="mt-2 text-xs text-slate-300">
            {feedback.map((line) => <p key={line}>{line}</p>)}
          </div>
          {feedback.length > 0 && (
            <details className="mt-2 text-xs">
              <summary>Show worked solution</summary>
              <p>pixels = width × height = {metrics.pixels}</p>
              <p>bits = pixels × bpp = {metrics.bits}</p>
              <p>bytes = bits ÷ 8 = {metrics.bytes}</p>
              <p>MB = bytes ÷ 1,000,000 = {metrics.mb.toFixed(2)}</p>
            </details>
          )}
        </section>

        <div className="space-y-4">
          <section className="rounded-lg border border-amber-500 bg-slate-900 p-3">
            <button className="mb-2 rounded bg-amber-700 px-2 py-1" onClick={() => setShowFormula((s) => !s)}>{showFormula ? 'Hide' : 'Show'} Formula Panel</button>
            {showFormula && (
              <ul className="text-sm">
                <li>pixels = width × height</li>
                <li>bits = pixels × bitsPerPixel</li>
                <li>bytes = bits ÷ 8</li>
                <li>MB = bytes ÷ 1,000,000</li>
                <li>MiB = bytes ÷ 1,048,576</li>
              </ul>
            )}
          </section>
          <Calculator />
        </div>
      </div>
    </main>
  );
}

export default App;
