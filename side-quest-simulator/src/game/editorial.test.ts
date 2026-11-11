import { describe, expect, it } from 'vitest';
import { STORIES, RIVAL_SCENES } from './content/stories.generated';
import { OBJECTIVES } from './content/quests';
import { t } from './engine';

describe('mobile story copy', () => {
  it('keeps scene copy short enough to share a phone screen with actions', () => {
    for (const scene of [...STORIES.flatMap((s) => s.scenes), ...RIVAL_SCENES]) {
      for (const tone of [0, 1, 2] as const) {
        const text = t(scene.text, tone);
        expect(text.split(/\s+/).length, scene.id).toBeLessThanOrEqual(45);
        expect(text.length, scene.id).toBeLessThanOrEqual(280);
        expect(text, scene.id).toMatch(/[.!?][”']?$/);
      }
      for (const choice of scene.choices) expect(t(choice.label, 0).length, scene.id).toBeLessThanOrEqual(62);
    }
  });
  it('uses American spelling in quest prose, retaining stable content IDs', () => {
    for (const card of [...STORIES.flatMap((s) => s.scenes), ...RIVAL_SCENES, ...OBJECTIVES.map((o) => o.climax)]) {
      for (const text of [card.text, ...card.choices.flatMap((c) => [c.label, c.win, c.lose])]) {
        for (const tone of [0, 1, 2] as const) expect(t(text, tone), card.id).not.toMatch(/\b(?:kerb|armour|centre|centrepiece|colour|favour|honour|organised|authorised)\b/i);
      }
    }
  });
});
