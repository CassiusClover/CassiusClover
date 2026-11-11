import { describe, expect, it } from 'vitest';
import { ART, ART_FOR } from '../art/creatures';
import { ANCESTRY_IDS, CLASS_IDS, heroSvg } from '../art/heroes';
import { CARDS } from './content/cards';
import { ANCESTRIES, CLASSES, QUIRKS, RELICS } from './content/heroes';
import { OBJECTIVES } from './content/quests';
import {
  bribe, buyPotion, canBribe, canBuyPotion, canReroll, canRevive, checkInfo, choose, currentCard, newRun, pickBoon,
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
      let idx = Math.floor(prand() * card.choices.length);
      if (policy === 'smart') {
        // Best expected value: gold-weighted success against HP-weighted failure.
        const score = card.choices.map((c) => {
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
    const cards = [...CARDS, ...OBJECTIVES.map((o) => o.climax)];
    expect(new Set(cards.map((c) => c.id)).size).toBe(cards.length);
    for (const c of cards) {
      expect(c.choices.length).toBeGreaterThanOrEqual(2);
      expect(new Set(c.choices.map((x) => x.stat)).size).toBe(c.choices.length);
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
    for (const c of [...CARDS, ...OBJECTIVES.map((o) => o.climax)]) expect(ART[ART_FOR[c.id]], c.id).toBeDefined();
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
      else if (run.phase === 'card') run = choose(run, 0);
      else if (run.phase === 'result') run = proceed(run);
      else if (run.phase === 'boon') run = pickBoon(run, 0);
    }
    expect(run.narration).not.toMatch(/[{}]/);
    expect(seen.size).toBeGreaterThan(5);
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
        const n = 400;
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
  });
});
