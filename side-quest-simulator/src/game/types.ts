export type Stat = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';
export const STATS: Stat[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
export type Stats = Record<Stat, number>;

/** 0 = family friendly, 1 = cheeky, 2 = crude. */
export type Tone = 0 | 1 | 2;

/** Text with optional per-tone variants. Falls back towards the family version. */
export type Txt = string | { f: string; c?: string; x?: string };

export type Risk = 'safe' | 'bold' | 'reckless';

export interface Choice {
  label: Txt;
  stat: Stat;
  risk: Risk;
  win: Txt;
  lose: Txt;
  /** A fixed trade with no roll. `win` holds what happens. Negative amounts are costs. */
  deal?: { gold?: number; hp?: number; luck?: number };
}

export interface Card {
  id: string;
  text: Txt;
  choices: Choice[];
}

export interface Effects {
  stats?: Partial<Stats>;
  maxHp?: number;
  rollBonus?: number;
  climaxBonus?: number;
  goldMult?: number;
  dmgReduce?: number;
  healPerQuest?: number;
  critRange?: number;
  luckPerQuest?: number;
  startLuck?: number;
  startGold?: number;
}

export interface ClassDef {
  id: string;
  name: string;
  blurb: string;
  stats: Stats;
  hp: number;
  perkName: string;
  perkText: string;
  cost: number;
}

export interface AncestryDef {
  id: string;
  name: string;
  blurb: string;
  effects: Effects;
  lucky?: boolean;
}

export interface QuirkDef {
  id: string;
  name: string;
  text: string;
  effects: Effects;
}

export interface RelicDef {
  id: string;
  name: string;
  text: string;
  effects: Effects;
}

export interface Giver {
  id: string;
  name: Txt;
}

export interface Objective {
  id: string;
  title: Txt;
  task: Txt;
  climax: Card;
  /** Only offered as the last quest of a run. */
  final?: boolean;
}

export interface Twist {
  id: string;
  text: Txt;
  note: string;
  statDc?: Partial<Stats>;
  dcMod?: number;
  goldMult?: number;
  dmgMod?: number;
  heal?: number;
}

export type Tier = 0 | 1 | 2;

export interface QuestOffer {
  giverId: string;
  objectiveId: string;
  twistId: string;
  tier: Tier;
}

export type Outcome = 'crit' | 'success' | 'fail' | 'fumble' | 'bribe' | 'deal';

export interface RollResult {
  cardId: string;
  choiceIdx: number;
  stat: Stat;
  d20: number;
  mod: number;
  bonus: number;
  total: number;
  dc: number;
  outcome: Outcome;
  dmg: number;
  gold: number;
  heal: number;
  /** Luck tokens gained or lost (deals only). */
  luck?: number;
  notes: string[];
}

export type Boon =
  | { kind: 'heal'; amount: number }
  | { kind: 'stat'; stat: Stat; amount: number }
  | { kind: 'relic'; relicId: string }
  | { kind: 'luck'; amount: number }
  | { kind: 'gold'; amount: number };

/** One finished quest, for the season tracker. */
export interface QuestRecord {
  objectiveId: string;
  tier: Tier;
  pay: number;
  /** False when the finale went wrong and the client paid half. */
  clean: boolean;
}

/** Lines written by the live Dungeon Master for one quest. They replace the scripted ones. */
export interface AiLines {
  questIndex: number;
  bridgeGood: string;
  bridgeBad: string;
  finaleIntro: string;
  /** One pair per card of the quest, in order: the DM's reaction to success and to failure. */
  cards: { good: string; bad: string }[];
  done: string;
  doneBadly: string;
}

export type Phase = 'board' | 'card' | 'result' | 'boon' | 'dead' | 'victory';

export interface ActiveQuest {
  offer: QuestOffer;
  cards: string[];
  cardIdx: number;
  firstRollDone: boolean;
  luckyUsed: boolean;
  climaxFailed: boolean;
  /** Momentum carried into the finale: earlier successes help, failures rattle. */
  edge: number;
}

export interface Hero {
  name: string;
  classId: string;
  ancestryId: string;
  quirkId: string;
  stats: Stats;
  hp: number;
  maxHp: number;
}

export interface RunState {
  rng: number;
  hero: Hero;
  gold: number;
  goldEarned: number;
  luck: number;
  relics: string[];
  questIndex: number;
  questsDone: number;
  phase: Phase;
  board: QuestOffer[];
  quest: ActiveQuest | null;
  result: RollResult | null;
  boons: Boon[];
  payout: number;
  revived: boolean;
  blessed: boolean;
  metaRollBonus: number;
  seenCards: string[];
  objectivesDone: string[];
  epitaph: string;
  /** The season's rival, and the Dungeon Master's current line. */
  rival: string;
  narration: string;
  said: number;
  /** Consecutive successes (positive) or failures (negative). */
  streak: number;
  history: QuestRecord[];
  ai?: AiLines | null;
  /** The Dungeon Master's mood for this season, and rival encounters already used. */
  mood: string;
  rivalsSeen: string[];
}

export interface Obituary {
  name: string;
  line: string;
  quests: number;
  won: boolean;
}

export interface Meta {
  version: 1;
  tips: number;
  tone: Tone;
  toneChosen: boolean;
  haptics: boolean;
  /** Use the on-device AI Dungeon Master (needs a downloaded model). */
  liveDm: boolean;
  dmModel: 'small' | 'better';
  unlockedClasses: string[];
  upgrades: Record<string, number>;
  journal: {
    runs: number;
    victories: number;
    bestQuests: number;
    totalQuests: number;
    cardsSeen: string[];
    relicsFound: string[];
    objectivesDone: string[];
    classesPlayed: string[];
    obituaries: Obituary[];
  };
}
