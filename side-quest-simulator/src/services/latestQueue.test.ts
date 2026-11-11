import { expect, it } from 'vitest';
import { createLatestQueue } from './latestQueue';

it('serialises inference, drops obsolete waiting work and rejects stale results', async () => {
  const started: number[] = [];
  let finish!: (n: number) => void;
  const queue = createLatestQueue<number, number>(async (n) => {
    started.push(n);
    if (n === 1) return new Promise((resolve) => { finish = resolve; });
    return n;
  });
  const first = queue.request(1);
  await Promise.resolve();
  const second = queue.request(2), third = queue.request(3);
  finish(1);
  expect(await first).toBeNull();
  expect(await second).toBeNull();
  expect(await third).toBe(3);
  expect(started).toEqual([1, 3]);
});

it('recovers after inference failure and cancels queued work', async () => {
  const queue = createLatestQueue<number, number>(async (n) => { if (n === 1) throw Error('unavailable'); return n; });
  expect(await queue.request(1)).toBeNull();
  expect(await queue.request(2)).toBe(2);
  const cancelled = queue.request(3);
  queue.cancel();
  expect(await cancelled).toBeNull();
});
