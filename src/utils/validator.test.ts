import { describe, expect, it } from 'vitest';
import { levels } from '../data/levels';
import { validateAnswer } from './validator';

describe('validator', () => {
  it('accepts tolerance for MB', () => {
    const result = validateAnswer(levels[0], levels[0].questions[1], '0.96');
    expect(result.correct).toBe(true);
  });

  it('rejects wrong unit selection value', () => {
    const result = validateAnswer(levels[0], levels[0].questions[0], '0.96');
    expect(result.correct).toBe(false);
  });

  it('checks size difference explanation keywords', () => {
    const result = validateAnswer(levels[1], levels[1].questions[3], 'Because headers and metadata add overhead, and compression can alter final size.');
    expect(result.correct).toBe(true);
  });
});
