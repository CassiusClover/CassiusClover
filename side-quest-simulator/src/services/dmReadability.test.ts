import { describe, expect, it } from 'vitest';
import { readableDmLine } from './dmReadability';

describe('narrator readability fallback', () => {
  it('accepts complete, concise British observations', () => {
    for (const line of [
      'The marshal has budgeted six hours for a rather modest curb.',
      'You have rescued the soup, which is more than the chef intended.',
      'The accountant calls your filing system a bloody improvement.',
    ]) expect(readableDmLine(line), line).toBe(true);
  });
  it('rejects fragments, truncated replies and generation loops', () => {
    for (const line of [
      'Statutory elbow soup paperwork damages and purple.',
      'The marshal has discovered that the road',
      'the accountant has filed your silly receipts.',
      'You have found the door and found the door and found the door.',
      'As an AI language model, I cannot write that.',
    ]) expect(readableDmLine(line), line).toBe(false);
  });
});
