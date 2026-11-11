import { CLASSES } from './content/heroes';
import type { Meta, RunState } from './types';

export interface UpgradeDef {
  id: string;
  name: string;
  text: string;
  costs: number[];
}

export const UPGRADES: UpgradeDef[] = [
  { id: 'boots', name: 'Sturdier Boots', text: '+2 max HP per level.', costs: [30, 60, 100, 150, 220] },
  { id: 'purse', name: 'Padded Purse', text: '+15 starting gold per level.', costs: [25, 50, 90, 140] },
  { id: 'coin', name: 'Lucky Coin', text: '+1 starting luck token per level.', costs: [60, 140, 260] },
  { id: 'union', name: 'Union Membership', text: '+10% tips from every run per level.', costs: [40, 80, 130, 200, 300] },
  { id: 'training', name: 'Training Montage', text: '+1 to every roll per level.', costs: [200, 450] },
];

export const defaultMeta = (): Meta => ({
  version: 1,
  tips: 0,
  tone: 0,
  toneChosen: false,
  haptics: true,
  liveDm: false,
  dmModel: 'small',
  unlockedClasses: CLASSES.filter((c) => c.cost === 0).map((c) => c.id),
  upgrades: {},
  journal: {
    runs: 0,
    victories: 0,
    bestQuests: 0,
    totalQuests: 0,
    cardsSeen: [],
    relicsFound: [],
    objectivesDone: [],
    classesPlayed: [],
    obituaries: [],
  },
});

/** Merge a loaded save over defaults so older saves survive new fields. */
export const hydrateMeta = (raw: unknown): Meta => {
  const base = defaultMeta();
  if (!raw || typeof raw !== 'object') return base;
  const saved = raw as Partial<Meta>;
  return {
    ...base,
    ...saved,
    version: 1,
    upgrades: { ...base.upgrades, ...(saved.upgrades ?? {}) },
    journal: { ...base.journal, ...(saved.journal ?? {}) },
  };
};

export const upgradeLevel = (meta: Meta, id: string) => meta.upgrades[id] ?? 0;

export const upgradeCost = (meta: Meta, def: UpgradeDef): number | null => {
  const level = upgradeLevel(meta, def.id);
  return level >= def.costs.length ? null : def.costs[level];
};

export const buyUpgrade = (meta: Meta, id: string): Meta => {
  const def = UPGRADES.find((u) => u.id === id);
  if (!def) return meta;
  const cost = upgradeCost(meta, def);
  if (cost === null || meta.tips < cost) return meta;
  return { ...meta, tips: meta.tips - cost, upgrades: { ...meta.upgrades, [id]: upgradeLevel(meta, id) + 1 } };
};

export const unlockClass = (meta: Meta, classId: string): Meta => {
  const cls = CLASSES.find((c) => c.id === classId);
  if (!cls || meta.unlockedClasses.includes(classId) || meta.tips < cls.cost) return meta;
  return { ...meta, tips: meta.tips - cls.cost, unlockedClasses: [...meta.unlockedClasses, classId] };
};

/** Tips (permanent currency) earned by a finished run, before any ad doubling. */
export const tipsFor = (meta: Meta, run: RunState): number => {
  const base = run.questsDone * 10 + Math.floor(run.goldEarned / 8) + (run.phase === 'victory' ? 120 : 0);
  return Math.max(3, Math.round(base * (1 + 0.1 * upgradeLevel(meta, 'union'))));
};

const union = (a: string[], b: string[]) => Array.from(new Set([...a, ...b]));

/** Bank a finished run: award tips and update the journal. */
export const finishRun = (meta: Meta, run: RunState, doubled: boolean): Meta => {
  const won = run.phase === 'victory';
  const j = meta.journal;
  return {
    ...meta,
    tips: meta.tips + tipsFor(meta, run) * (doubled ? 2 : 1),
    journal: {
      runs: j.runs + 1,
      victories: j.victories + (won ? 1 : 0),
      bestQuests: Math.max(j.bestQuests, run.questsDone),
      totalQuests: j.totalQuests + run.questsDone,
      cardsSeen: union(j.cardsSeen, run.seenCards),
      relicsFound: union(j.relicsFound, run.relics),
      objectivesDone: union(j.objectivesDone, run.objectivesDone),
      classesPlayed: union(j.classesPlayed, [run.hero.classId]),
      obituaries: [{ name: run.hero.name, line: run.epitaph, quests: run.questsDone, won }, ...j.obituaries].slice(0, 25),
    },
  };
};
