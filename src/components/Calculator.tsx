import { useState } from 'react';

export function Calculator() {
  const [value, setValue] = useState('');
  const push = (v: string) => setValue((prev) => prev + v);
  const safeEval = () => {
    try {
      // eslint-disable-next-line no-new-func
      setValue(String(Function(`return (${value || 0})`)()));
    } catch {
      setValue('Error');
    }
  };

  const n = Number(value || 0);
  return (
    <section className="rounded-lg border border-violet-500 bg-slate-900 p-3">
      <h3 className="mb-2 font-bold text-violet-200">Quick Calculator</h3>
      <input aria-label="Calculator display" className="mb-2 w-full rounded bg-slate-800 p-2" value={value} onChange={(e) => setValue(e.target.value)} />
      <div className="mb-2 grid grid-cols-4 gap-1 text-sm">
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '+', '='].map((k) => (
          <button key={k} className="rounded bg-violet-700 p-1" onClick={() => (k === '=' ? safeEval() : push(k))}>{k}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1 text-xs">
        <button className="rounded bg-cyan-700 p-1" onClick={() => setValue(String(n / 8))}>bits→bytes</button>
        <button className="rounded bg-cyan-700 p-1" onClick={() => setValue(String(n * 8))}>bytes→bits</button>
        <button className="rounded bg-cyan-700 p-1" onClick={() => setValue(String(n / 1_000_000))}>bytes→MB</button>
        <button className="rounded bg-cyan-700 p-1" onClick={() => setValue(String(n * 1_000_000))}>MB→bytes</button>
        <button className="rounded bg-cyan-700 p-1" onClick={() => setValue(String(n / 1_048_576))}>bytes→MiB</button>
        <button className="rounded bg-cyan-700 p-1" onClick={() => setValue('')}>clear</button>
      </div>
    </section>
  );
}
