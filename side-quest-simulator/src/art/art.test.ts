import { describe, expect, it } from 'vitest';
import { GIVERS, OBJECTIVES } from '../game/content/quests';
import { RIVALS } from '../game/content/dm';
import { RIVAL_SCENES, STORIES } from '../game/content/stories.generated';
import { artForGiver, artForRival } from './cast';
import { panelForCard, QUEST_PANELS } from './panels';

const checkReferences = (svg: string) => {
  const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  expect(new Set(ids).size).toBe(ids.length);
  for (const match of svg.matchAll(/url\(#([^)]+)\)/g)) expect(ids).toContain(match[1]);
};

describe('storytelling art', () => {
  it('covers every quest and authored scene, including alternate story routes', () => {
    expect(Object.keys(QUEST_PANELS).sort()).toEqual(OBJECTIVES.map((o) => o.id).sort());
    for (const id of [...OBJECTIVES.map((o) => `x-${o.id}`), ...STORIES.flatMap((s) => s.scenes.map((c) => c.id))]) {
      const panel = panelForCard(id, RIVALS[0]);
      expect(panel, id).toBeDefined();
      expect(panel!.width).toBe(240);
      expect(panel!.height).toBe(120);
      expect(panel!.label).toBeTruthy();
      checkReferences(panel!.svg);
    }
    expect(panelForCard('toll-troll', RIVALS[0])).toBeUndefined();
  });

  it('has a portrait for every recurring giver and rival', () => {
    for (const giver of GIVERS) {
      expect(artForGiver(giver.id)?.figure, giver.id).toBeTruthy();
      expect(artForGiver(giver.id)?.label).toBeTruthy();
    }
    const portraits = RIVALS.map((name) => artForRival(name).svg);
    expect(new Set(portraits).size).toBe(RIVALS.length);
  });

  it('uses the current rival in encounters without colliding repeated actor clip paths', () => {
    for (const cardId of [...RIVAL_SCENES.map((scene) => scene.id), 'x-showdown']) {
      const variants = RIVALS.map((name) => {
        const panel = panelForCard(cardId, name)!;
        checkReferences(panel.svg);
        expect(panelForCard(cardId, name)).toBe(panel);
        return panel.svg;
      });
      expect(new Set(variants).size).toBe(RIVALS.length);
    }
  });
});
