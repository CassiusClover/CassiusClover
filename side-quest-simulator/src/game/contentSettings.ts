import type { ContentSettings, RollResult, Tone, ToneText, Txt, Violence, ViolenceName } from './types';

export const VIOLENCE_NAMES: ViolenceName[] = ['cartoon', 'gritty', 'brutal'];
export const LANGUAGE_OPTIONS = [
  { value: 0 as const, name: 'Clean', text: 'Clean language, dry jokes and silly fantasy.' },
  { value: 1 as const, name: 'Cheeky', text: 'Sharper sarcasm, rude jokes and mild innuendo.' },
  { value: 2 as const, name: 'Crude', text: 'Strong swearing and foul-mouthed commentary.' },
];
export const VIOLENCE_OPTIONS = [
  { value: 0 as const, name: 'Cartoon', text: 'Slapstick mishaps and non-graphic defeat. No bloody injury detail.' },
  { value: 1 as const, name: 'Gritty', text: 'Cuts, bruises and blood, without graphic wound detail.' },
  { value: 2 as const, name: 'Brutal', text: 'Bloody wounds and harsher injury and death descriptions.' },
];

export const contentSettings = (raw: Partial<ContentSettings> = {}): ContentSettings => ({
  tone: raw.tone === 1 || raw.tone === 2 ? raw.tone : 0,
  violence: raw.violence === 1 || raw.violence === 2 ? raw.violence : 0,
});

const toneText = (txt: ToneText, tone: Tone): string => typeof txt === 'string' ? txt :
  tone === 2 ? txt.x ?? txt.c ?? txt.f : tone === 1 ? txt.c ?? txt.f : txt.f;

/** Select each axis independently. The default is clean language and cartoon peril. */
export const contentText = (txt: Txt, tone: Tone, violence: Violence = 0): string => {
  if (typeof txt === 'string') return txt;
  const version = txt.v?.[VIOLENCE_NAMES[violence]];
  return toneText(version ?? txt, tone);
};

const STRONG = /\b(?:fuck\w*|shit\w*|cunt\w*|motherfuck\w*|twat\w*)\b/i;
const RUDE = /\b(?:bastard\w*|bitch\w*|bollocks|arse(?:s|hole(?:s)?)?|damn\w*|sodding|sod)\b|bloody (?:hell|idiot|brilliant|magnificent|paperwork|mess)/i;
const BLOOD = /\b(?:blood(?:ied|stained|shed)?|bleed\w*|bled|gore|gory|wound\w*|sever(?:ed|ing|ance|s)?|dismember\w*|entrails|innards|decapitat\w*)\b|bloody (?:wound|body|corpse|stump|injury)/i;
const GRAPHIC = /\b(?:gore|gory|entrails|innards|dismember\w*|decapitat\w*|sever(?:ed|ing|ance|s)?)\b|exposed bone|torn flesh|torn skin|skin (?:splits|tears)|flesh (?:splits|tears)/i;

/** Conservative local guard for model replies. Authored text uses explicit variants.
 * This catches common violations, not every possible semantic violation from a model. */
export const allowsModelLine = (line: string, settings: ContentSettings) =>
  !(settings.tone < 2 && STRONG.test(line)) && !(settings.tone === 0 && RUDE.test(line)) &&
  !(settings.violence === 0 && BLOOD.test(line)) && !(settings.violence === 1 && GRAPHIC.test(line));

const INJURIES: Record<Violence, string[][]> = {
  0: [
    ['You land in a heap, with your dignity arriving a moment later.', 'A spectacular pratfall. Someone politely offers you a cushion.'],
    ['You tumble into a stack of empty crates. The top crate awards you six out of ten.', 'Stars orbit your head. One asks whether this is a regular service.'],
    ['The scenery wins. You peel yourself off it and reconsider your technique.', 'A dramatic crash, a cloud of dust, and a very undignified landing.'],
  ],
  1: [
    ['Your knuckles scrape and sting. A thin line of blood marks the cuff.', 'A shallow cut burns as you catch your breath.'],
    ['The impact leaves a deep bruise and a split lip. You wipe away the blood.', 'Pain flares along your side. Your sleeve sticks to a bleeding scrape.'],
    ['A hard blow leaves you winded and bleeding. Every movement hurts.', 'You stagger, holding a bloodied sleeve against the injury until the shaking eases.'],
  ],
  2: [
    ['Skin splits across your knuckles; blood beads between the torn edges.', 'A jagged scrape strips skin from your forearm, leaving a wet red trail.'],
    ['The impact tears skin along your ribs. Blood soaks into the cloth as you struggle for breath.', 'A ragged wound opens across your shoulder; warm blood runs down your arm.'],
    ['Your knee buckles as torn flesh pulls beneath your clothes. Blood pools under the hand pressed to your side.', 'The blow opens a deep, ragged wound. You clamp it shut with shaking hands, blood running through your fingers.'],
  ],
};

export const injuryDescription = (result: Pick<RollResult, 'dmg' | 'd20' | 'cardId'>, violence: Violence): string => {
  if (result.dmg <= 0) return '';
  const severity = result.dmg <= 2 ? 0 : result.dmg <= 5 ? 1 : 2;
  const index = (result.cardId.length + result.d20) % 2;
  return INJURIES[violence][severity][index];
};

const DEATH: Record<Violence, string> = {
  0: 'A final wobble, a theatrical collapse, and the curtain falls on this adventure. The Guild files the paperwork.',
  1: 'Your strength gives out. Blood darkens the ground as the last noise of the fight fades.',
  2: 'You fall clutching the wound. Blood slips between your fingers, your breathing falters, and the struggle ends.',
};
export const deathDescription = (violence: Violence) => DEATH[violence];
export const deathHeading = (violence: Violence) => ['ADVENTURE OVER', 'YOU HAVE DIED', 'A BLOODY END'][violence];

export const languagePreview = (tone: Tone) => contentText({
  f: 'The goblin calls your plan ambitious. It means you have forgotten the door again.',
  c: 'The goblin nominates your plan for Most Confident Use of Absolutely No Common Sense.',
  x: 'The goblin calls your plan complete bollocks, then points out the door you have somehow missed.',
}, tone);
export const violencePreview = (violence: Violence) => injuryDescription({ dmg: 4, d20: 2, cardId: 'preview' }, violence);
