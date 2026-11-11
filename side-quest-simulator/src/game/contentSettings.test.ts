import { describe, expect, it } from 'vitest';
import { DM_LINES } from './content/dm';
import { CARDS } from './content/cards';
import { OBJECTIVES } from './content/quests';
import { RIVAL_SCENES, STORIES } from './content/stories.generated';
import { allowsModelLine, contentSettings, contentText, deathDescription, deathHeading,
  injuryDescription, languagePreview, VIOLENCE_NAMES, violencePreview } from './contentSettings';
import { applyAiNarration, choose, clearAiNarration, currentCard, dmContext, dmMomentContext, isLiveNarration,
  narrationFor, narrationKey, newRun, pickQuest, t } from './engine';
import { defaultMeta, hydrateMeta } from './meta';
import { dmMessages, dmMomentMessages } from '../services/dmPrompt';
import type { Tone, Txt, Violence } from './types';

const LEVELS = [0, 1, 2] as const;
const hero = { classId: 'wizard', ancestryId: 'human', quirkId: 'whistle' };
const active = () => pickQuest(newRun(defaultMeta(), hero, 42), 0);

describe('independent content controls', () => {
  it('selects all nine combinations without one setting overriding the other', () => {
    const text: Txt = { f: 'clean base', c: 'cheeky base', x: 'crude base', v: {
      cartoon: { f: 'clean cartoon', c: 'cheeky cartoon', x: 'crude cartoon' },
      gritty: { f: 'clean gritty', c: 'cheeky gritty', x: 'crude gritty' },
      brutal: { f: 'clean brutal', c: 'cheeky brutal', x: 'crude brutal' },
    } };
    for (const tone of LEVELS) for (const violence of LEVELS) {
      expect(t(text, tone, violence)).toBe(`${['clean', 'cheeky', 'crude'][tone]} ${VIOLENCE_NAMES[violence]}`);
    }
    expect(contentText({ f: 'base', c: 'cheek', v: { gritty: 'a cut' } }, 2, 2)).toBe('cheek');
    expect(contentText('facts do not need swearing', 2, 2)).toBe('facts do not need swearing');
  });

  it('migrates old saves to cartoon violence while retaining selected language and progress', () => {
    const restored = hydrateMeta({ tone: 2, tips: 61, unlockedClasses: ['fighter', 'wizard', 'rogue', 'bard'], journal: { runs: 8 } });
    expect(restored.violence).toBe(0);
    expect(restored.tone).toBe(2);
    expect(restored.tips).toBe(61);
    expect(restored.unlockedClasses).toContain('bard');
    expect(restored.journal.runs).toBe(8);
    for (const invalid of [-1, 3, '2', null, NaN]) {
      expect(contentSettings({ tone: invalid as Tone, violence: invalid as Violence })).toEqual({ tone: 0, violence: 0 });
    }
    expect(hydrateMeta(JSON.parse(JSON.stringify({ ...restored, violence: 2 })))).toMatchObject({ tone: 2, violence: 2 });
  });

  it('changes injury and defeat wording at each level and never adds injuries to successful actions', () => {
    const hit = { dmg: 4, d20: 2, cardId: 'invoice' };
    expect(new Set(LEVELS.map((v) => injuryDescription(hit, v))).size).toBe(3);
    expect(new Set(LEVELS.map(deathDescription)).size).toBe(3);
    expect(new Set(LEVELS.map(deathHeading)).size).toBe(3);
    expect(injuryDescription(hit, 0)).not.toMatch(/blood|wound|torn|bleed/i);
    expect(injuryDescription(hit, 1)).toMatch(/blood|split lip|scrape/i);
    expect(injuryDescription(hit, 2)).toMatch(/skin|wound|blood/i);
    for (const v of LEVELS) expect(injuryDescription({ ...hit, dmg: 0 }, v)).toBe('');
  });

  it('has three genuinely distinct story versions for every shipped scene and every narrator event', () => {
    for (const scene of [...STORIES.flatMap((s) => s.scenes), ...RIVAL_SCENES]) {
      const rendered = LEVELS.map((tone) => t(scene.text, tone, 0));
      expect(new Set(rendered).size, scene.id).toBe(3);
      expect(allowsModelLine(rendered[0], { tone: 0, violence: 0 }), scene.id).toBe(true);
    }
    for (const [event, lines] of Object.entries(DM_LINES)) for (const line of lines) {
      expect(new Set(LEVELS.map((tone) => t(line, tone, 0))).size, event).toBe(3);
      expect(allowsModelLine(t(line, 0, 0), { tone: 0, violence: 0 }), event).toBe(true);
    }
    expect(new Set(LEVELS.map(languagePreview)).size).toBe(3);
    expect(new Set(LEVELS.map(violencePreview)).size).toBe(3);
  });

  it('keeps existing bloody passages out of cartoon descriptions, including finales and memories', () => {
    const cards = [...CARDS, ...OBJECTIVES.map((o) => o.climax), ...STORIES.flatMap((s) => s.scenes), ...RIVAL_SCENES];
    for (const card of cards) {
      const texts = [card.text, ...card.choices.flatMap((c) => [c.win, c.lose, c.onWin?.memory, c.onLose?.memory])].filter((x): x is Txt => x !== undefined);
      for (const txt of texts) expect(allowsModelLine(t(txt, 0, 0), { tone: 0, violence: 0 }), `${card.id}: ${t(txt, 0, 0)}`).toBe(true);
    }
    for (const story of STORIES) for (const choice of story.finaleChoices ?? []) {
      expect(allowsModelLine(t(choice.win, 0, 0), { tone: 0, violence: 0 }), story.objective).toBe(true);
    }
  });

  it('updates a saved current narrator line immediately, without rolling or changing an adventure', () => {
    const run = active();
    const saved = JSON.parse(JSON.stringify(run));
    const before = JSON.stringify(saved);
    expect(new Set(LEVELS.map((tone) => narrationFor(saved, tone))).size).toBe(3);
    const old = { ...saved }; delete old.scriptedNarration;
    expect(new Set(LEVELS.map((tone) => narrationFor(old, tone))).size).toBe(3);
    expect(JSON.stringify(saved)).toBe(before);
    expect(narrationFor(saved, 2)).not.toMatch(/[{}]/);
    for (const tone of LEVELS) for (const violence of LEVELS) {
      expect(newRun({ ...defaultMeta(), tone, violence }, hero, 42)).toEqual(newRun(defaultMeta(), hero, 42));
    }
  });
});

describe('AI content preferences', () => {
  it('matches whole content terms without blocking innocent words such as several or arsenal', () => {
    expect(allowsModelLine('Several goblins work in the royal arsenal.', { tone: 0, violence: 0 })).toBe(true);
    expect(allowsModelLine('A severed limb blocks the door.', { tone: 0, violence: 0 })).toBe(false);
    expect(allowsModelLine('A bloody brilliant plan, for once.', { tone: 2, violence: 0 })).toBe(true);
  });
  it('sends both axes, selected text and actual injury detail to both prompt formats', () => {
    const run = choose(active(), 0);
    run.result!.dmg = 4;
    for (const tone of LEVELS) for (const violence of LEVELS) {
      const ctx = dmMomentContext(run, tone, violence);
      const messages = dmMomentMessages(ctx);
      expect(ctx.violence).toBe(VIOLENCE_NAMES[violence]);
      expect(ctx.scene).toBe(t(currentCard(run)!.text, tone, violence));
      expect(JSON.parse(messages[1].content).injury).toBe(injuryDescription(run.result!, violence));
      expect(messages[0].content).toContain('Violence:');
      expect(dmMessages(dmContext(run, tone, violence))[0].content).toContain('Violence:');
    }
    expect(dmMomentMessages(dmMomentContext(run, 0, 2))[0].content).toContain('No profanity');
    expect(dmMomentMessages(dmMomentContext(run, 2, 0))[0].content).toContain('Cartoon slapstick only');
  });

  it('rejects common model violations for the selected combination and keeps the scripted fallback', () => {
    const run = active(), key = narrationKey(run);
    expect(applyAiNarration(run, key, { line: 'That was a fucking terrible plan.' }, 0, 0)).toBe(run);
    expect(applyAiNarration(run, key, { line: 'Blood pours from your wounded arm.' }, 2, 0)).toBe(run);
    expect(applyAiNarration(run, key, { line: 'You stare at the severed limb.' }, 2, 1)).toBe(run);
    const crudeCartoon = applyAiNarration(run, key, { line: 'The goblin calls the paperwork complete bollocks.' }, 2, 0);
    expect(isLiveNarration(crudeCartoon, 2, 0)).toBe(true);
    expect(isLiveNarration(crudeCartoon, 0, 0)).toBe(false);
    const cleanBrutal = applyAiNarration(run, key, { line: 'Blood runs down your arm from the ragged wound.' }, 0, 2);
    expect(isLiveNarration(cleanBrutal, 0, 2)).toBe(true);
    expect(narrationFor(cleanBrutal, 0, 0)).not.toMatch(/blood|wound/i);
    const cleared = clearAiNarration(cleanBrutal);
    expect(cleared.liveNarrationSettings).toBeUndefined();
    expect(cleared.quest).toEqual(run.quest);
    expect(cleared.rng).toBe(run.rng);
  });
});
