export type Stat = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';
export const STATS: Stat[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
export type Stats = Record<Stat, number>;

/** Language: 0 = clean, 1 = cheeky, 2 = crude. */
export type Tone = 0 | 1 | 2;
/** Injury prose: 0 = cartoon, 1 = gritty, 2 = brutal. */
export type Violence = 0 | 1 | 2;
export type ViolenceName = 'cartoon' | 'gritty' | 'brutal';
export interface ContentSettings { tone: Tone; violence: Violence }

/** Independent language and violence variants. Missing language falls back towards clean. */
export type ToneText = string | { f: string; c?: string; x?: string };
export type Txt = string | { f: string; c?: string; x?: string; v?: Partial<Record<ViolenceName, ToneText>> };

export type Risk = 'safe' | 'bold' | 'reckless';

export interface StoryEffect {
  /** Quest-local flags choose later scenes and unlock approaches. */
  flag?: string;
  momentum?: number;
  /** A factual callback, retained for the rest of this season. */
  memory?: Txt;
}

export interface Choice {
  label: Txt;
  stat: Stat;
  risk: Risk;
  win: Txt;
  lose: Txt;
  hint?: string;
  /** A guaranteed bargain. Costs are paid when its result is accepted. */
  deal?: { gold: number; luck?: number };
  requires?: string;
  onWin?: StoryEffect;
  onLose?: StoryEffect;
}

export interface Card {
  id: string;
  text: Txt;
  choices: Choice[];
  art?: string;
}

export interface StoryScene extends Card {
  next?: { scene: string; when?: string }[];
}

export interface QuestStory {
  id?: string;
  objective: string;
  entry: string;
  scenes: StoryScene[];
  /** Extra finale approaches earned in this story. */
  finaleChoices?: Choice[];
}

export interface StoryDecision {
  quest: string;
  scene: string;
  choice: string;
  outcome: Outcome;
  memory: Txt;
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
  art?: string;
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
  notes: string[];
  cost?: number;
  luckCost?: number;
  storyEffect?: StoryEffect;
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
  memories?: Txt[];
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
  storyId?: string;
  offer: QuestOffer;
  cards: string[];
  cardIdx: number;
  firstRollDone: boolean;
  luckyUsed: boolean;
  climaxFailed: boolean;
  flags?: string[];
  momentum?: number;
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
  /** Preserve source text so saved narration can be re-rendered with new preferences. */
  scriptedNarration?: { text: Txt; choice: string };
  said: number;
  /** Consecutive successes (positive) or failures (negative). */
  streak: number;
  history: QuestRecord[];
  ai?: AiLines | null;
  /** Stable across saves, so a late model reply cannot affect another hero. */
  id?: string;
  decisions?: StoryDecision[];
  liveNarrationKey?: string;
  liveNarrationSettings?: ContentSettings;
  storyFlags?: string[];
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
  violence: Violence;
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
