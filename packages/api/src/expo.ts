export function chunkArray<T>(items: T[], max: number): T[][] {
  if (max <= 0) throw new Error('max must be > 0');
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += max) {
    chunks.push(items.slice(i, i + max));
  }
  return chunks;
}


