import { CARDS } from './content/cards';
import { ANCESTRIES, CLASSES, EPITHETS, FIRST_NAMES, QUIRKS, RELICS } from './content/heroes';
import { DM_LINES, RIVALS, type DmEvent } from './content/dm';
import { GIVERS, OBJECTIVES, TWISTS } from './content/quests';
import type {
  Boon, Card, Choice, Effects, Meta, QuestOffer, Risk, RollResult, RunState, Stat, Stats, Tier, Tone, Txt,
} from './types';
import { STATS } from './types';

export const QUESTS_TO_WIN = 10;
export const CARDS_PER_QUEST = 2;
export const POTION_HEAL = 6;

const RISK: Record<Risk, { dc: number; gold: number; dmg: number }> = {
  safe: { dc: -3, gold: 0.6, dmg: 2 },
  bold: { dc: 0, gold: 1, dmg: 3 },
  reckless: { dc: 4, gold: 2.2, dmg: 5 },
};
const TIER: Record<Tier, { dc: number; pay: number }> = {
  0: { dc: -2, pay: 0.6 },
  1: { dc: 0, pay: 1 },
  2: { dc: 2, pay: 1.8 },
};

const byId = <T extends { id: string }>(list: T[], id: string): T => {
  const found = list.find((x) => x.id === id);
  if (!found) throw new Error(`Unknown id: ${id}`);
  return found;
};
export const classOf = (id: string) => byId(CLASSES, id);
export const ancestryOf = (id: string) => byId(ANCESTRIES, id);
export const quirkOf = (id: string) => byId(QUIRKS, id);
export const relicOf = (id: string) => byId(RELICS, id);
export const giverOf = (id: string) => byId(GIVERS, id);
export const objectiveOf = (id: string) => byId(OBJECTIVES, id);
export const twistOf = (id: string) => byId(TWISTS, id);
export const cardOf = (id: string): Card =>
  id.startsWith('x-') ? byId(OBJECTIVES.map((o) => o.climax), id) : byId(CARDS, id);

export const t = (txt: Txt, tone: Tone): string => {
  if (typeof txt === 'string') return txt;
  if (tone >= 2 && txt.x) return txt.x;
  if (tone >= 1 && txt.c) return txt.c;
  return txt.f;
};

export const modOf = (score: number) => Math.floor((score - 10) / 2);

// --- RNG (mulberry32, state carried in the run so saves are deterministic) ---
const rand = (run: { rng: number }): number => {
  let x = (run.rng = (run.rng + 0x6d2b79f5) >>> 0);
  x = Math.imul(x ^ (x >>> 15), x | 1);
  x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
  return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
};
const randInt = (run: { rng: number }, n: number) => Math.floor(rand(run) * n);
const pick = <T>(run: { rng: number }, list: T[]): T => list[randInt(run, list.length)];
const shuffled = <T>(run: { rng: number }, list: T[]): T[] => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(run, i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));

// --- The Dungeon Master ---
/** Sets the DM's current line. Picks deterministically without disturbing the run's dice. */
const say = (run: RunState, event: DmEvent, choice = '') => {
  const pool = DM_LINES[event];
  const line = pool[((run.rng >>> 5) + run.said * 7) % pool.length];
  run.said += 1;
  const q = run.quest;
  run.narration = t(line, 0)
    .replace(/\{hero\}/g, run.hero.name)
    .replace(/\{rival\}/g, run.rival)
    .replace(/\{class\}/g, classOf(run.hero.classId).name.toLowerCase())
    .replace(/\{quest\}/g, q ? t(objectiveOf(q.offer.objectiveId).title, 0) : '')
    .replace(/\{choice\}/g, choice);
};
const lower = (label: string) => label.charAt(0).toLowerCase() + label.slice(1);
export const isFinalQuest = (run: RunState) => run.questIndex >= QUESTS_TO_WIN - 1;

// --- Aggregated modifiers from ancestry, quirk and relics ---
export interface Mods {
  rollBonus: number;
  climaxBonus: number;
  goldMult: number;
  dmgReduce: number;
  healPerQuest: number;
  critRange: number;
  luckPerQuest: number;
}

const effectSources = (run: RunState): Effects[] => [
  ancestryOf(run.hero.ancestryId).effects,
  quirkOf(run.hero.quirkId).effects,
  ...run.relics.map((id) => relicOf(id).effects),
];

export const modsOf = (run: RunState): Mods => {
  const m: Mods = { rollBonus: run.metaRollBonus, climaxBonus: 0, goldMult: 1, dmgReduce: 0, healPerQuest: 0, critRange: 0, luckPerQuest: 0 };
  for (const e of effectSources(run)) {
    m.rollBonus += e.rollBonus ?? 0;
    m.climaxBonus += e.climaxBonus ?? 0;
    m.goldMult *= e.goldMult ?? 1;
    m.dmgReduce += e.dmgReduce ?? 0;
    m.healPerQuest += e.healPerQuest ?? 0;
    m.critRange += e.critRange ?? 0;
    m.luckPerQuest += e.luckPerQuest ?? 0;
  }
  const cls = run.hero.classId;
  if (cls === 'rogue') m.goldMult *= 1.4;
  if (cls === 'cleric') m.dmgReduce += 1;
  if (cls === 'fighter') m.healPerQuest += 2;
  if (cls === 'bard') m.critRange += 2;
  if (cls === 'ranger') m.luckPerQuest += 1;
  if (cls === 'paladin') m.climaxBonus += 3;
  return m;
};

const applyEffects = (run: RunState, e: Effects) => {
  for (const s of STATS) run.hero.stats[s] += e.stats?.[s] ?? 0;
  if (e.maxHp) {
    run.hero.maxHp += e.maxHp;
    run.hero.hp += e.maxHp;
  }
  // CON gained after creation also toughens the hero a little.
  if (e.stats?.CON && e.stats.CON >= 2) {
    run.hero.maxHp += 1;
    run.hero.hp += 1;
  }
};

const heal = (run: RunState, amount: number) => {
  run.hero.hp = Math.min(run.hero.maxHp, run.hero.hp + amount);
};

// --- Run creation ---
export interface HeroChoice {
  classId: string;
  ancestryId: string;
  quirkId: string;
  name?: string;
}

export const rollQuirk = (seed: number): string => QUIRKS[randInt({ rng: seed >>> 0 }, QUIRKS.length)].id;
export const rollName = (seed: number): string => {
  const r = { rng: (seed ^ 0x9e3779b9) >>> 0 };
  return `${pick(r, FIRST_NAMES)} ${pick(r, EPITHETS)}`;
};

export const newRun = (meta: Meta, choice: HeroChoice, seed: number, blessed = false): RunState => {
  const cls = classOf(choice.classId);
  const up = meta.upgrades;
  const stats: Stats = { ...cls.stats };
  const run: RunState = {
    rng: seed >>> 0,
    hero: {
      name: choice.name ?? rollName(seed),
      classId: cls.id,
      ancestryId: choice.ancestryId,
      quirkId: choice.quirkId,
      stats,
      hp: 0,
      maxHp: 0,
    },
    gold: 15 * (up.purse ?? 0),
    goldEarned: 0,
    luck: up.coin ?? 0,
    relics: [],
    questIndex: 0,
    questsDone: 0,
    phase: 'board',
    board: [],
    quest: null,
    result: null,
    boons: [],
    payout: 0,
    revived: false,
    blessed,
    metaRollBonus: up.training ?? 0,
    seenCards: [],
    objectivesDone: [],
    epitaph: '',
    rival: RIVALS[(seed >>> 7) % RIVALS.length],
    narration: '',
    said: 0,
    streak: 0,
  };
  const anc = ancestryOf(choice.ancestryId).effects;
  const quirk = quirkOf(choice.quirkId).effects;
  for (const e of [anc, quirk]) {
    for (const s of STATS) stats[s] += e.stats?.[s] ?? 0;
    run.luck += e.startLuck ?? 0;
    run.gold += e.startGold ?? 0;
  }
  run.hero.maxHp = Math.max(4, cls.hp + modOf(stats.CON) + (anc.maxHp ?? 0) + (quirk.maxHp ?? 0) + 2 * (up.boots ?? 0));
  run.hero.hp = run.hero.maxHp;
  if (blessed) {
    // Sponsor's Blessing (rewarded ad): a relic, a luck token and some gold.
    const relic = pick(run, RELICS);
    run.relics.push(relic.id);
    applyEffects(run, relic.effects);
    run.luck += 1;
    run.gold += 20;
  }
  dealBoard(run);
  say(run, 'intro');
  return run;
};

const dealBoard = (run: RunState) => {
  run.phase = 'board';
  run.quest = null;
  run.result = null;
  if (isFinalQuest(run)) {
    // The season always ends the same way: one posting, and the rival is on it.
    run.board = [{ giverId: 'guild', objectiveId: 'showdown', twistId: 'rival', tier: 1 }];
    say(run, 'final');
    return;
  }
  const recent = new Set(run.objectivesDone.slice(-6));
  const pool = shuffled(run, OBJECTIVES.filter((o) => !o.final && !recent.has(o.id)));
  const givers = shuffled(run, GIVERS);
  run.board = ([0, 1, 2] as Tier[]).map((tier, i): QuestOffer => ({
    giverId: givers[i].id,
    objectiveId: pool[i].id,
    twistId: pick(run, TWISTS).id,
    tier,
  }));
  const beat: Record<number, DmEvent> = { 2: 'rival1', 5: 'rival2', 8: 'rival3' };
  say(run, beat[run.questIndex] ?? (run.hero.hp * 2 <= run.hero.maxHp ? 'boardHurt' : 'board'));
};

export const questPay = (run: RunState, offer: QuestOffer): number => {
  const twist = twistOf(offer.twistId);
  return Math.round((18 + 7 * run.questIndex) * TIER[offer.tier].pay * (twist.goldMult ?? 1) * modsOf(run).goldMult);
};

export const pickQuest = (prev: RunState, idx: number): RunState => {
  const run = clone(prev);
  if (run.phase !== 'board') return prev;
  const offer = run.board[Math.min(idx, run.board.length - 1)];
  const recent = new Set(run.seenCards.slice(-12));
  let pool = CARDS.filter((c) => !recent.has(c.id));
  if (pool.length < CARDS_PER_QUEST) pool = CARDS;
  const cards = shuffled(run, pool).slice(0, CARDS_PER_QUEST).map((c) => c.id);
  run.quest = {
    offer,
    cards: [...cards, objectiveOf(offer.objectiveId).climax.id],
    cardIdx: 0,
    firstRollDone: false,
    luckyUsed: false,
    climaxFailed: false,
  };
  run.luck += modsOf(run).luckPerQuest;
  run.phase = 'card';
  noteCard(run);
  say(run, 'questStart');
  return run;
};

const noteCard = (run: RunState) => {
  const id = run.quest!.cards[run.quest!.cardIdx];
  if (!run.seenCards.includes(id)) run.seenCards.push(id);
  else {
    run.seenCards.splice(run.seenCards.indexOf(id), 1);
    run.seenCards.push(id);
  }
};

export const currentCard = (run: RunState): Card | null =>
  run.quest ? cardOf(run.quest.cards[run.quest.cardIdx]) : null;

export const isClimax = (run: RunState): boolean =>
  !!run.quest && run.quest.cardIdx === run.quest.cards.length - 1;

// --- Checks ---
export interface CheckInfo {
  dc: number;
  mod: number;
  bonus: number;
  /** Chance of success, 0..1, ignoring rerolls. */
  chance: number;
  notes: string[];
}

export const checkInfo = (run: RunState, choice: Choice): CheckInfo => {
  const q = run.quest!;
  const twist = twistOf(q.offer.twistId);
  const m = modsOf(run);
  const climax = isClimax(run);
  const dc =
    9 + Math.round(run.questIndex * 1.25) + TIER[q.offer.tier].dc + RISK[choice.risk].dc +
    (twist.dcMod ?? 0) + (twist.statDc?.[choice.stat] ?? 0) + (climax ? 1 : 0);
  const notes: string[] = [];
  let bonus = m.rollBonus;
  if (climax && m.climaxBonus) {
    bonus += m.climaxBonus;
    notes.push(`Finale +${m.climaxBonus}`);
  }
  if (run.hero.classId === 'wizard' && !q.firstRollDone) {
    bonus += 4;
    notes.push('Prepared Spell +4');
  }
  if (run.hero.classId === 'barbarian' && run.hero.hp * 2 <= run.hero.maxHp) {
    bonus += 3;
    notes.push('Rage +3');
  }
  const mod = modOf(run.hero.stats[choice.stat]);
  // d20: natural 1 always fails, natural 20 always succeeds.
  const need = dc - mod - bonus;
  const chance = Math.min(19, Math.max(1, 21 - need)) / 20;
  return { dc, mod, bonus, chance, notes };
};

export const bribeCost = (run: RunState) => 14 + 6 * run.questIndex;
export const canBribe = (run: RunState) => run.phase === 'card' && !isClimax(run) && run.gold >= bribeCost(run);

const rollChoice = (run: RunState, choiceIdx: number): RollResult => {
  const q = run.quest!;
  const card = currentCard(run)!;
  const choice = card.choices[choiceIdx];
  const info = checkInfo(run, choice);
  const m = modsOf(run);
  const twist = twistOf(q.offer.twistId);
  const notes = [...info.notes];
  let d20 = 1 + randInt(run, 20);
  if (d20 === 1 && ancestryOf(run.hero.ancestryId).lucky && !q.luckyUsed) {
    q.luckyUsed = true;
    d20 = 1 + randInt(run, 20);
    notes.push('Halfling luck: natural 1 rerolled');
  }
  q.firstRollDone = true;
  const total = d20 + info.mod + info.bonus;
  const critAt = 20 - m.critRange;
  const success = d20 !== 1 && (d20 === 20 || total >= info.dc);
  const outcome = d20 === 1 ? 'fumble' : success ? (d20 >= critAt ? 'crit' : 'success') : 'fail';
  let gold = 0;
  let dmg = 0;
  let healed = 0;
  if (success) {
    gold = Math.round((7 + 2 * run.questIndex) * RISK[choice.risk].gold * (isClimax(run) ? 1.5 : 1) * (twist.goldMult ?? 1) * m.goldMult);
    if (outcome === 'crit') {
      gold *= 2;
      healed = 1;
    }
  } else {
    dmg = RISK[choice.risk].dmg + Math.floor(run.questIndex / 2) + (twist.dmgMod ?? 0) + (outcome === 'fumble' ? 2 : 0) - m.dmgReduce;
    dmg = Math.max(1, dmg);
  }
  return { cardId: card.id, choiceIdx, stat: choice.stat, d20, mod: info.mod, bonus: info.bonus, total, dc: info.dc, outcome, dmg, gold, heal: healed, notes };
};

/** Pick a choice on the current card. The result is shown, then applied by `proceed`. */
export const choose = (prev: RunState, choiceIdx: number): RunState => {
  if (prev.phase !== 'card' || !prev.quest) return prev;
  const run = clone(prev);
  run.result = rollChoice(run, choiceIdx);
  run.phase = 'result';
  react(run);
  return run;
};

/** The DM's verdict on the roll now showing. */
const react = (run: RunState) => {
  const res = run.result!;
  const good = res.dmg === 0;
  const streak = good ? Math.max(run.streak, 0) + 1 : Math.min(run.streak, 0) - 1;
  const label = lower(t(cardOf(res.cardId).choices[res.choiceIdx].label, 0));
  if (res.dmg >= run.hero.hp) say(run, 'lethal');
  else if (res.outcome === 'fumble') say(run, 'fumble');
  else if (res.outcome === 'crit') say(run, 'crit');
  else if (streak === 3) say(run, 'streakGood');
  else if (streak === -2 || streak === -4) say(run, 'streakBad');
  else say(run, good ? 'success' : 'fail', label);
};

export const bribe = (prev: RunState): RunState => {
  if (!canBribe(prev)) return prev;
  const run = clone(prev);
  const card = currentCard(run)!;
  run.gold -= bribeCost(run);
  run.quest!.firstRollDone = true;
  run.result = { cardId: card.id, choiceIdx: -1, stat: 'CHA', d20: 0, mod: 0, bonus: 0, total: 0, dc: 0, outcome: 'bribe', dmg: 0, gold: 0, heal: 0, notes: [] };
  run.phase = 'result';
  say(run, 'bribe');
  return run;
};

export const canReroll = (run: RunState) =>
  run.phase === 'result' && !!run.result && (run.result.outcome === 'fail' || run.result.outcome === 'fumble') && run.luck > 0;

/** Spend a luck token to reroll a failed check. */
export const reroll = (prev: RunState): RunState => {
  if (!canReroll(prev)) return prev;
  const run = clone(prev);
  run.luck -= 1;
  const res = rollChoice(run, run.result!.choiceIdx);
  res.notes.push('Luck token spent');
  run.result = res;
  react(run);
  return run;
};

/** Apply the shown result and move on: next card, boon screen, or death. */
export const proceed = (prev: RunState): RunState => {
  if (prev.phase !== 'result' || !prev.result || !prev.quest) return prev;
  const run = clone(prev);
  const res = run.result!;
  const q = run.quest!;
  run.gold += res.gold;
  run.goldEarned += res.gold;
  heal(run, res.heal);
  run.hero.hp -= res.dmg;
  if (res.outcome !== 'bribe') run.streak = res.dmg === 0 ? Math.max(run.streak, 0) + 1 : Math.min(run.streak, 0) - 1;
  if (res.dmg > 0 && isClimax(run)) q.climaxFailed = true;
  if (run.hero.hp <= 0) {
    run.hero.hp = 0;
    const card = cardOf(res.cardId);
    const label = t(card.choices[res.choiceIdx].label, 0);
    run.epitaph = `Tried to "${lower(label)}" during "${t(objectiveOf(q.offer.objectiveId).title, 0)}".`;
    run.phase = 'dead';
    say(run, 'dead');
    return run;
  }
  return advance(run);
};

const advance = (run: RunState): RunState => {
  const q = run.quest!;
  const wentWell = !run.result || run.result.dmg === 0;
  run.result = null;
  if (q.cardIdx < q.cards.length - 1) {
    q.cardIdx += 1;
    run.phase = 'card';
    noteCard(run);
    if (isClimax(run)) say(run, run.hero.hp * 2 > run.hero.maxHp ? 'climaxGood' : 'climaxBad');
    else say(run, wentWell ? 'bridgeGood' : 'bridgeBad');
    return run;
  }
  // Quest complete.
  const twist = twistOf(q.offer.twistId);
  const m = modsOf(run);
  const pay = Math.round(questPay(run, q.offer) * (q.climaxFailed ? 0.5 : 1));
  run.payout = pay;
  run.gold += pay;
  run.goldEarned += pay;
  heal(run, m.healPerQuest + (twist.heal ?? 0));
  run.questsDone += 1;
  if (!run.objectivesDone.includes(q.offer.objectiveId)) run.objectivesDone.push(q.offer.objectiveId);
  else {
    run.objectivesDone.splice(run.objectivesDone.indexOf(q.offer.objectiveId), 1);
    run.objectivesDone.push(q.offer.objectiveId);
  }
  if (run.questsDone >= QUESTS_TO_WIN) {
    run.phase = 'victory';
    run.epitaph = `Hero of the Year. Beat ${run.rival} to the trophy and retired to open a modest tavern.`;
    say(run, 'victory');
    return run;
  }
  run.boons = dealBoons(run, q.offer.tier === 2);
  run.phase = 'boon';
  say(run, q.climaxFailed ? 'questDoneBadly' : 'questDone');
  return run;
};

const dealBoons = (run: RunState, guaranteeRelic: boolean): Boon[] => {
  const available = RELICS.filter((r) => !run.relics.includes(r.id));
  const options: Boon[] = [
    { kind: 'heal', amount: 6 },
    { kind: 'stat', stat: pick(run, STATS), amount: 2 },
    { kind: 'luck', amount: 1 },
    { kind: 'gold', amount: 20 + 6 * run.questIndex },
  ];
  if (available.length) options.push({ kind: 'relic', relicId: pick(run, available).id });
  if (available.length > 1 && rand(run) < 0.5) {
    const first = options[options.length - 1] as { relicId: string };
    options.push({ kind: 'relic', relicId: pick(run, available.filter((r) => r.id !== first.relicId)).id });
  }
  let picked = shuffled(run, options).slice(0, 3);
  if (guaranteeRelic && available.length && !picked.some((b) => b.kind === 'relic')) {
    picked[0] = options.find((b) => b.kind === 'relic')!;
  }
  // Always offer healing to a badly hurt hero, so a run is never lost on the boon screen.
  if (run.hero.hp * 2 <= run.hero.maxHp && !picked.some((b) => b.kind === 'heal')) {
    const slot = picked.findIndex((b) => b.kind !== 'relic');
    picked[slot === -1 ? 2 : slot] = options[0];
  }
  return picked;
};

export const potionCost = (run: RunState) => 25 + 5 * run.questIndex;

export const canBuyPotion = (run: RunState) => run.phase === 'boon' && run.gold >= potionCost(run) && run.hero.hp < run.hero.maxHp;

export const buyPotion = (prev: RunState): RunState => {
  if (!canBuyPotion(prev)) return prev;
  const run = clone(prev);
  run.gold -= potionCost(run);
  heal(run, POTION_HEAL);
  return run;
};

export const pickBoon = (prev: RunState, idx: number): RunState => {
  if (prev.phase !== 'boon') return prev;
  const run = clone(prev);
  const boon = run.boons[idx];
  if (boon.kind === 'heal') heal(run, boon.amount);
  if (boon.kind === 'stat') applyEffects(run, { stats: { [boon.stat]: boon.amount } });
  if (boon.kind === 'luck') run.luck += boon.amount;
  if (boon.kind === 'gold') {
    const amount = Math.round(boon.amount * modsOf(run).goldMult);
    run.gold += amount;
    run.goldEarned += amount;
  }
  if (boon.kind === 'relic') {
    run.relics.push(boon.relicId);
    applyEffects(run, relicOf(boon.relicId).effects);
  }
  run.boons = [];
  run.questIndex += 1;
  dealBoard(run);
  return run;
};

export const canRevive = (run: RunState) => run.phase === 'dead' && !run.revived;

/** Second chance (rewarded ad): back on your feet at half health, once per run. */
export const revive = (prev: RunState): RunState => {
  if (!canRevive(prev)) return prev;
  const run = clone(prev);
  run.revived = true;
  run.hero.hp = Math.ceil(run.hero.maxHp / 2);
  run.epitaph = '';
  const next = advance(run);
  if (next.phase === 'card') say(next, 'revived');
  return next;
};

export const describeBoon = (boon: Boon): { title: string; text: string } => {
  switch (boon.kind) {
    case 'heal': return { title: 'A Proper Lunch', text: `Heal ${boon.amount} HP.` };
    case 'stat': return { title: 'Character Development', text: `+${boon.amount} ${boon.stat}, permanently for this run.` };
    case 'luck': return { title: 'Four-Leaf Something', text: `Gain ${boon.amount} luck token. Spend it to reroll a failure.` };
    case 'gold': return { title: 'Cash in Hand', text: `About ${boon.amount} gold, no questions asked.` };
    case 'relic': {
      const r = relicOf(boon.relicId);
      return { title: r.name, text: r.text };
    }
  }
};
