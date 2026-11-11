import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseStories, renderStories } from '../../scripts/stories.mjs';
import { ART, artKeyFor } from '../art/creatures';
import { ANCESTRY_IDS, CLASS_IDS, heroSvg } from '../art/heroes';
import { CARDS } from './content/cards';
import { ANCESTRIES, CLASSES, QUIRKS, RELICS } from './content/heroes';
import { OBJECTIVES } from './content/quests';
import {
  ALL_CARDS, ALL_EVENTS, ALL_OBJECTIVES, applyAiLines, canChoose, dmContext, bribe, buyPotion, canBribe, canBuyPotion, canReroll, canRevive, checkInfo, choose, currentCard, newRun, pickBoon,
  pickQuest, proceed, QUESTS_TO_WIN, reroll, revive, rollQuirk, t,
} from './engine';
import { buyUpgrade, defaultMeta, finishRun, hydrateMeta, tipsFor, unlockClass } from './meta';
import type { RunState } from './types';

type Policy = 'smart' | 'random';

/** Plays a whole run with a simple policy and returns the final state. */
const playRun = (seed: number, classId: string, policy: Policy, meta = defaultMeta(), allowRevive = false): RunState => {
  let pr = seed;
  const prand = () => ((pr = (pr * 1664525 + 1013904223) >>> 0) / 4294967296);
  let run = newRun(meta, { classId, ancestryId: ANCESTRIES[seed % ANCESTRIES.length].id, quirkId: rollQuirk(seed) }, seed);
  for (let guard = 0; guard < 500; guard++) {
    if (run.phase === 'board') run = pickQuest(run, policy === 'smart' ? 1 : Math.floor(prand() * 3));
    else if (run.phase === 'card') {
      const card = currentCard(run)!;
      const allowed = card.choices.map((_, i) => i).filter((i) => canChoose(run, i));
      let idx = allowed[Math.floor(prand() * allowed.length)];
      if (policy === 'smart') {
        // Best expected value: gold-weighted success against HP-weighted failure.
        const score = card.choices.map((c, i) => {
          if (!canChoose(run, i)) return -Infinity;
          if (c.deal) {
            const hurt = run.hero.hp * 2 <= run.hero.maxHp;
            return (c.deal.hp ?? 0) * (hurt ? 2.5 : 0.4) + (c.deal.luck ?? 0) * 4 + (c.deal.gold ?? 0) * 0.25;
          }
          const p = checkInfo(run, c).chance;
          const risk = c.risk === 'safe' ? [0.6, 2] : c.risk === 'bold' ? [1, 3] : [2.2, 5];
          const hpWeight = run.hero.hp <= 6 ? 6 : 3;
          return p * risk[0] * 4 - (1 - p) * risk[1] * hpWeight;
        });
        idx = score.indexOf(Math.max(...score));
      }
      run = choose(run, idx);
    } else if (run.phase === 'result') {
      if (policy === 'smart' && canReroll(run)) run = reroll(run);
      else run = proceed(run);
    } else if (run.phase === 'boon') {
      while (policy === 'smart' && canBuyPotion(run) && run.hero.hp + 6 <= run.hero.maxHp) run = buyPotion(run);
      let idx = 0;
      if (policy === 'smart') {
        const hurt = run.hero.hp * 2 <= run.hero.maxHp;
        const want = hurt ? ['heal', 'relic', 'stat', 'luck', 'gold'] : ['relic', 'stat', 'luck', 'heal', 'gold'];
        idx = run.boons.map((b) => want.indexOf(b.kind)).reduce((best, v, i, a) => (v < a[best] ? i : best), 0);
      }
      run = pickBoon(run, idx);
    } else if (run.phase === 'dead' && allowRevive && canRevive(run)) run = revive(run);
    else return run;
  }
  throw new Error('Run did not terminate');
};

describe('content', () => {
  it('has unique ids and well-formed cards', () => {
    const cards = ALL_CARDS;
    expect(cards.length).toBeGreaterThan(CARDS.length + OBJECTIVES.length);
    for (const c of cards) {
      expect(c.choices.length).toBeGreaterThanOrEqual(2);
      const rolls = c.choices.filter((x) => !x.deal);
      expect(new Set(rolls.map((x) => x.stat)).size, c.id).toBe(rolls.length);
      for (const x of c.choices) for (const tone of [0, 1, 2] as const) expect(t(x.label, tone).length).toBeGreaterThan(0);
    }
    for (const list of [CLASSES, ANCESTRIES, QUIRKS, RELICS, OBJECTIVES]) {
      expect(new Set(list.map((x) => x.id)).size).toBe(list.length);
    }
  });

  it('gives every stat a fair share of choices', () => {
    const counts: Record<string, number> = {};
    for (const c of CARDS) for (const x of c.choices) counts[x.stat] = (counts[x.stat] ?? 0) + 1;
    for (const stat of ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']) expect(counts[stat]).toBeGreaterThanOrEqual(12);
  });

  it('has art for every card, class and ancestry', () => {
    for (const c of ALL_CARDS) expect(ART[artKeyFor(c.id) ?? ''], c.id).toBeDefined();
    for (const c of CLASSES) expect(CLASS_IDS).toContain(c.id);
    for (const a of ANCESTRIES) expect(ANCESTRY_IDS).toContain(a.id);
    expect(heroSvg('wizard', 'gnome').length).toBeGreaterThan(200);
  });

  it('falls back through tone variants', () => {
    expect(t({ f: 'a', c: 'b' }, 2)).toBe('b');
    expect(t({ f: 'a', x: 'c' }, 1)).toBe('a');
    expect(t('plain', 2)).toBe('plain');
  });
});

describe('engine', () => {
  it('is deterministic for a given seed', () => {
    expect(playRun(42, 'fighter', 'smart')).toEqual(playRun(42, 'fighter', 'smart'));
  });

  it('always terminates in death or victory for every class', () => {
    for (const cls of CLASSES) {
      for (let seed = 1; seed <= 40; seed++) {
        const run = playRun(seed * 7919, cls.id, 'random');
        expect(['dead', 'victory']).toContain(run.phase);
        expect(run.questsDone).toBeLessThanOrEqual(QUESTS_TO_WIN);
        expect(run.hero.hp).toBeGreaterThanOrEqual(0);
        expect(run.gold).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('deals a board of three distinct quests', () => {
    const run = newRun(defaultMeta(), { classId: 'rogue', ancestryId: 'elf', quirkId: 'lucky' }, 5);
    expect(run.board).toHaveLength(3);
    expect(new Set(run.board.map((q) => q.objectiveId)).size).toBe(3);
    expect(run.luck).toBe(1);
  });

  it('bribes past a road event but not a finale', () => {
    const meta = { ...defaultMeta(), upgrades: { purse: 4 } };
    let run = pickQuest(newRun(meta, { classId: 'fighter', ancestryId: 'human', quirkId: 'whistle' }, 9), 1);
    expect(canBribe(run)).toBe(true);
    const gold = run.gold;
    run = proceed(bribe(run));
    expect(run.gold).toBeLessThan(gold);
    expect(run.quest!.cardIdx).toBe(1);
    run = proceed(bribe(run));
    expect(canBribe(run)).toBe(false);
  });

  it('revives once per run at half health', () => {
    for (let seed = 1; seed < 200; seed++) {
      const dead = playRun(seed, 'wizard', 'random');
      if (dead.phase !== 'dead') continue;
      expect(canRevive(dead)).toBe(true);
      const back = revive(dead);
      expect(back.hero.hp).toBe(Math.ceil(back.hero.maxHp / 2));
      expect(back.phase).not.toBe('dead');
      expect(canRevive({ ...back, phase: 'dead' })).toBe(false);
      return;
    }
    throw new Error('no death found');
  });

  it('applies the sponsor blessing', () => {
    const run = newRun(defaultMeta(), { classId: 'fighter', ancestryId: 'human', quirkId: 'whistle' }, 3, true);
    expect(run.relics).toHaveLength(1);
    expect(run.luck).toBe(1);
    expect(run.gold).toBe(20);
  });
});

describe('story files', () => {
  const dir = join(__dirname, '../../stories');
  const files = readdirSync(dir).filter((f) => f.endsWith('.txt')).sort()
    .map((name) => ({ name: `stories/${name}`, text: readFileSync(join(dir, name), 'utf8') }));

  it('compile without problems, including the template', () => {
    expect(parseStories(files, { artKeys: Object.keys(ART) }).errors).toEqual([]);
  });

  it('are what the game is actually built from', () => {
    const parsed = parseStories(files.filter((f) => !f.name.endsWith('TEMPLATE.txt')), { artKeys: Object.keys(ART) });
    const generated = readFileSync(join(__dirname, 'content/packs.generated.ts'), 'utf8');
    expect(generated, 'run "npm run stories" after editing story files').toBe(renderStories(parsed));
  });

  it('only add scenes to quests that exist', () => {
    const parsed = parseStories(files.filter((f) => !f.name.endsWith('TEMPLATE.txt')));
    for (const id of Object.keys(parsed.scenes)) expect(ALL_OBJECTIVES.map((o) => o.id), id).toContain(id);
    expect(new Set(ALL_OBJECTIVES.map((o) => o.id)).size).toBe(ALL_OBJECTIVES.length);
    expect(new Set(ALL_EVENTS.map((c) => c.id)).size).toBe(ALL_EVENTS.length);
  });

  it('explain mistakes in plain words with the line number', () => {
    const bad = parseStories([{ name: 'x.txt', text: 'EVENT Bad Name\nEVENT ok\nSome text.\n> Brave STR: Go\n> Bold STR: A\n  win: w\n> Bold STR: B\n  win: w\n  lose: l\n> Deal: Pay\n  gives: lots\n' }]);
    const all = bad.errors.join('\n');
    expect(all).toMatch(/x\.txt:1: .*needs a name/);
    expect(all).toMatch(/x\.txt:4: "Brave" is not a risk level/);
    expect(all).toMatch(/both use STR/);
    expect(all).toMatch(/needs a "lose:" line/);
    expect(all).toMatch(/cannot read "lots"/);
  });
});

describe('story structure', () => {
  it('gives each quest its own scene, and meets the rival in person three times', () => {
    let run = newRun(defaultMeta(), { classId: 'barbarian', ancestryId: 'orc', quirkId: 'bones' }, 2024);
    const rivalQuests: number[] = [];
    for (let i = 0; i < 400 && run.phase !== 'dead' && run.phase !== 'victory'; i++) {
      if (run.phase === 'board') {
        run = pickQuest(run, 0);
        const q = run.quest!;
        expect(q.cards).toHaveLength(3);
        expect(q.cards[1]).toBe(`s-${q.offer.objectiveId}-1`);
        if (q.cards[0].startsWith('r-')) rivalQuests.push(run.questIndex);
        expect(run.narration).not.toMatch(/[{}]/);
      } else if (run.phase === 'card') {
        run = { ...run, hero: { ...run.hero, hp: run.hero.maxHp } };
        const idx = currentCard(run)!.choices.findIndex((c, n) => !c.deal && canChoose(run, n));
        run = choose(run, idx);
      } else if (run.phase === 'result') run = proceed(run);
      else if (run.phase === 'boon') run = pickBoon(run, 0);
    }
    expect(rivalQuests.slice(0, 3)).toEqual([2, 5, 8].slice(0, rivalQuests.length));
    expect(rivalQuests.length).toBeGreaterThanOrEqual(1);
  });

  it('settles deals without dice and never lets one be fatal or unaffordable', () => {
    const base = pickQuest(newRun(defaultMeta(), { classId: 'fighter', ancestryId: 'human', quirkId: 'whistle' }, 1), 0);
    const deals = ALL_CARDS.flatMap((c) => c.choices.map((x, i) => ({ c, x, i }))).filter((d) => d.x.deal);
    expect(deals.length).toBeGreaterThan(10);
    for (const { c, x, i } of deals) {
      const at = (gold: number, hp: number): RunState => ({ ...base, gold, luck: 3, hero: { ...base.hero, hp }, quest: { ...base.quest!, cards: [c.id, c.id, base.quest!.cards[2]] } });
      const poor = at(0, 1);
      const cost = x.deal!;
      expect(canChoose(poor, i), c.id).toBe((cost.gold ?? 0) >= 0 && (cost.hp ?? 0) >= 0);
      expect(choose(poor, i) === poor).toBe(!canChoose(poor, i));
      const rich = at(100, 5);
      const after = proceed(choose(rich, i));
      expect(after.gold).toBe(100 + (cost.gold ?? 0));
      expect(after.hero.hp).toBe(Math.min(rich.hero.maxHp, 5 + (cost.hp ?? 0)));
      expect(after.luck).toBe(3 + (cost.luck ?? 0));
      expect(after.phase).not.toBe('dead');
    }
  });

  it('carries momentum into the finale', () => {
    let run = pickQuest(newRun(defaultMeta(), { classId: 'fighter', ancestryId: 'human', quirkId: 'whistle' }, 3), 1);
    run = { ...run, quest: { ...run.quest!, cardIdx: 2, edge: 2 } };
    const withEdge = checkInfo(run, currentCard(run)!.choices[0]);
    const without = checkInfo({ ...run, quest: { ...run.quest!, edge: 0 } }, currentCard(run)!.choices[0]);
    expect(withEdge.bonus - without.bonus).toBe(2);
    expect(withEdge.notes).toContain('Momentum +2');
  });
});

describe('dungeon master', () => {
  it('narrates every step with tokens filled in', () => {
    let run = newRun(defaultMeta(), { classId: 'bard', ancestryId: 'elf', quirkId: 'whistle', name: 'Test Hero' }, 77);
    expect(run.narration).toContain(run.rival);
    const seen = new Set<string>();
    for (let i = 0; i < 200 && run.phase !== 'dead' && run.phase !== 'victory'; i++) {
      expect(run.narration.length).toBeGreaterThan(10);
      expect(run.narration).not.toMatch(/[{}]/);
      seen.add(run.narration);
      if (run.phase === 'board') run = pickQuest(run, 0);
      else if (run.phase === 'card') run = choose(run, currentCard(run)!.choices.findIndex((_, n) => canChoose(run, n)));
      else if (run.phase === 'result') run = proceed(run);
      else if (run.phase === 'boon') run = pickBoon(run, 0);
    }
    expect(run.narration).not.toMatch(/[{}]/);
    expect(seen.size).toBeGreaterThan(5);
  });

  it('records a season history for the tracker', () => {
    const run = playRun(11, 'fighter', 'smart');
    expect(run.history).toHaveLength(run.questsDone);
    expect(run.history.every((h) => h.pay >= 0 && typeof h.clean === 'boolean')).toBe(true);
  });

  it('uses live lines for the current quest only, and ignores junk', () => {
    let run = pickQuest(newRun(defaultMeta(), { classId: 'fighter', ancestryId: 'orc', quirkId: 'whistle' }, 5), 1);
    const ctx = dmContext(run, 1);
    expect(ctx.quest.cards).toHaveLength(3);
    expect(ctx.tone).toBe('cheeky');
    const lines = {
      bridgeGood: 'LIVE bridge good', bridgeBad: 'LIVE bridge bad', finaleIntro: 'LIVE finale',
      cards: [{ good: 'LIVE c0 good', bad: 'LIVE c0 bad' }, { good: 'LIVE c1 good', bad: 'LIVE c1 bad' }, { good: 'LIVE c2 good', bad: 'LIVE c2 bad' }],
      done: 'LIVE done', doneBadly: 'LIVE done badly',
    };
    expect(applyAiLines(run, 3, lines)).toBe(run);
    expect(applyAiLines(run, 0, { nonsense: true })).toBe(run);
    expect(applyAiLines(run, 0, null)).toBe(run);
    run = applyAiLines(run, 0, lines);
    const heard: string[] = [];
    for (let i = 0; i < 40 && run.phase !== 'boon' && run.phase !== 'dead'; i++) {
      run = run.phase === 'card' ? choose(run, currentCard(run)!.choices.findIndex((c) => !c.deal)) : proceed(run);
      heard.push(run.narration);
    }
    expect(heard.filter((l) => l.startsWith('LIVE')).length).toBeGreaterThanOrEqual(3);
    if (run.phase === 'boon') {
      run = pickQuest(pickBoon(run, 0), 0);
      run = choose(run, 0);
      expect(run.narration.startsWith('LIVE')).toBe(false);
    }
  });

  it('ends every season with the rival showdown', () => {
    for (let seed = 1; seed < 400; seed++) {
      const run = playRun(seed * 31, 'barbarian', 'smart');
      if (run.phase !== 'victory') continue;
      expect(run.objectivesDone[run.objectivesDone.length - 1]).toBe('showdown');
      expect(run.epitaph).toContain(run.rival);
      return;
    }
    throw new Error('no victory found');
  });
});

describe('meta', () => {
  it('buys upgrades and unlocks classes only when affordable', () => {
    let meta = defaultMeta();
    expect(buyUpgrade(meta, 'boots')).toBe(meta);
    expect(unlockClass(meta, 'bard')).toBe(meta);
    meta = { ...meta, tips: 100 };
    meta = buyUpgrade(meta, 'boots');
    expect(meta.tips).toBe(70);
    meta = unlockClass(meta, 'bard');
    expect(meta.tips).toBe(10);
    expect(meta.unlockedClasses).toContain('bard');
    const run = newRun(meta, { classId: 'bard', ancestryId: 'human', quirkId: 'whistle' }, 1);
    const plain = newRun(defaultMeta(), { classId: 'bard', ancestryId: 'human', quirkId: 'whistle' }, 1);
    expect(run.hero.maxHp).toBe(plain.hero.maxHp + 2);
  });

  it('banks a run, doubling tips when asked', () => {
    const meta = defaultMeta();
    const run = playRun(11, 'fighter', 'smart');
    const tips = tipsFor(meta, run);
    expect(finishRun(meta, run, false).tips).toBe(tips);
    const after = finishRun(meta, run, true);
    expect(after.tips).toBe(tips * 2);
    expect(after.journal.runs).toBe(1);
    expect(after.journal.obituaries[0].name).toBe(run.hero.name);
  });

  it('hydrates partial saves', () => {
    const meta = hydrateMeta({ tips: 5, journal: { runs: 2 } });
    expect(meta.tips).toBe(5);
    expect(meta.journal.runs).toBe(2);
    expect(meta.journal.cardsSeen).toEqual([]);
    expect(hydrateMeta(null).unlockedClasses).toHaveLength(3);
  });
});

describe('balance', () => {
  it('keeps runs winnable but not trivial', () => {
    const report: string[] = [];
    const rows: { policy: Policy; win: number; quests: number }[] = [];
    for (const cls of CLASSES) {
      for (const policy of ['smart', 'random'] as const) {
        const n = 250;
        let quests = 0, wins = 0, cards = 0, tips = 0;
        for (let seed = 1; seed <= n; seed++) {
          const run = playRun(seed * 104729 + 17, cls.id, policy);
          quests += run.questsDone;
          wins += run.phase === 'victory' ? 1 : 0;
          cards += run.questsDone * 3 + (run.quest ? run.quest.cardIdx + 1 : 0);
          tips += tipsFor(defaultMeta(), run);
        }
        report.push(`${cls.id.padEnd(10)} ${policy.padEnd(6)} quests ${(quests / n).toFixed(1)}  win ${((wins / n) * 100).toFixed(0)}%  cards ${(cards / n).toFixed(0)}  tips ${(tips / n).toFixed(0)}`);
        rows.push({ policy, win: wins / n, quests: quests / n });
      }
    }
    console.log(report.join('\n'));
    for (const row of rows) {
      if (row.policy === 'smart') {
        expect(row.win).toBeGreaterThan(0.05);
        expect(row.win).toBeLessThan(0.5);
        expect(row.quests).toBeGreaterThan(3.5);
      } else {
        expect(row.win).toBeLessThan(0.1);
        expect(row.quests).toBeGreaterThan(1.5);
      }
    }
  }, 60000);
});
