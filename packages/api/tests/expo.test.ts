import { describe, it, expect } from 'vitest';
import { chunkArray } from '../src/expo';

describe('chunkArray', () => {
  it('chunks correctly', () => {
    const arr = Array.from({ length: 205 }, (_, i) => i);
    const chunks = chunkArray(arr, 100);
    expect(chunks.length).toBe(3);
    expect(chunks[0].length).toBe(100);
    expect(chunks[1].length).toBe(100);
    expect(chunks[2].length).toBe(5);
  });
});


