import { RIVALS } from '../game/content/dm';
import { ART } from './creatures';
import { heroFigure } from './heroes';
import { BLOOD, BONE, DUSK, INK, MOSS, MUSTARD, PLUM, RUST, STEEL, backdrop, black, border, figure, flat, glare, line, shape, type InkFigure, type Piece } from './ink';

const portrait = (p: Piece, label: string): InkFigure => {
  const actor = figure(p);
  return { bg: p.bg, svg: backdrop(p.bg, p.back ?? MUSTARD, [60, 46, 39]) + actor + border(), figure: actor, label };
};

/** A broad coat, a half-black face and one telling prop. No extra rendering detail. */
const person = (coat: string, props: string, hat = '', face = ''): Piece => ({
  bg: '#33241a', back: MUSTARD,
  sil: 'M22 108 L30 68 L45 56 L46 34 L52 22 L68 22 L75 34 L74 56 L90 68 L100 108z',
  fill: coat,
  over: shape('M46 32 L74 32 L72 50 L60 58 L48 50z', BONE) + black('M60 32 L74 32 L72 50 L60 58z') +
    (face || glare(60, 39, 7, BONE, 7) + line('M54 49 L65 49', INK, 2)) + hat + props,
});

const paper = shape('M60 72 L92 66 L98 102 L66 108z', BONE) + line('M68 80 L86 77 M70 86 L88 83 M72 93 L84 91', INK, 2);
const crown = shape('M44 25 L42 10 L52 18 L60 5 L68 18 L78 10 L76 25z', MUSTARD);
const chefHat = shape('M42 32 L38 18 L46 9 L55 14 L61 6 L72 13 L80 10 L84 23 L76 32z', BONE);

export const CHEF_ART = portrait(person(BONE, line('M78 84 L91 53', INK, 4) + shape('M88 41 L98 42 L100 53 L92 58 L85 51z', STEEL) + line('M36 66 L45 99', INK, 2.5), chefHat), 'The chef with a raised ladle');
export const PLUMBER_ART = portrait(person(DUSK, shape('M75 83 L81 61 L76 53 L77 42 L83 38 L83 50 L90 52 L94 41 L98 48 L96 58 L89 62 L83 87z', STEEL)), 'The plumber and an oversized wrench');

export const GIVER_ART: Record<string, InkFigure> = {
  baker: portrait(person(BONE,
    shape('M30 80 L60 68 L72 82 L40 96z', RUST) + line('M40 78 L48 85 M51 74 L59 81', INK, 2), chefHat,
    glare(60, 39, 7, BONE, 7) + flat('M51 44 L47 54 L54 51z', STEEL) + line('M55 51 L60 47 L65 51', INK, 2)), 'The weeping baker, holding a loaf like a handkerchief'),
  guild: portrait(person(PLUM, paper + line('M34 63 L47 82 L60 63', MUSTARD, 4) + shape('M42 81 L48 76 L54 82 L48 90z', MUSTARD)), 'The Guild clerk and an unreasonable amount of paperwork'),
  cat: { ...ART.cat, svg: ART.cat.svg + shape('M42 43 L38 27 L50 33 L60 20 L70 33 L82 27 L78 43z', MUSTARD), figure: ART.cat.figure + shape('M42 43 L38 27 L50 33 L60 20 L70 33 L82 27 L78 43z', MUSTARD), label: 'The cat wearing a small crown' },
  landlord: portrait(person(MOSS,
    line('M78 68 L78 98 L90 98 M78 90 L86 90', MUSTARD, 5) + shape('M72 62 L78 56 L84 62 L78 70z', MUSTARD),
    black('M44 32 L48 18 L72 18 L78 32z') + shape('M70 38 L80 38 L80 48 L70 48z', MUSTARD)), 'The landlord, guarding a very large key'),
  cloud: portrait({ bg: '#22313d', back: BONE, sil: 'M16 84 L6 64 L20 50 L30 52 L38 32 L56 30 L68 44 L82 38 L100 48 L98 60 L114 70 L104 88z', fill: STEEL,
    over: glare(60, 61, 12, BONE, 11) + line('M49 78 L70 76', INK, 2) + line('M34 95 L28 104 M52 95 L46 104 M86 95 L80 104', STEEL, 3) }, 'The cloud only you can see'),
  king: portrait(person(BLOOD,
    line('M32 66 L42 108', MUSTARD, 4) + shape('M72 76 L96 76 L96 88 L72 88z', BONE), crown,
      glare(60, 40, 7, BONE, 7) + line('M49 46 L55 47 M65 47 L71 46 M55 52 L65 52', INK, 2)), 'The extremely tired king'),
  trenchcoat: portrait({ bg: '#262b1c', back: BONE, sil: 'M26 108 L32 38 L44 28 L44 15 L76 15 L76 28 L88 38 L94 108z', fill: RUST,
    over: black('M38 28 L82 28 L80 35 L40 35z') + glare(60, 31, 8, BONE, 7) +
      shape('M34 20 L42 12 L44 0 L76 0 L78 12 L86 20z', RUST) +
      black('M48 55 L76 53 L76 63 L48 65z M46 81 L74 79 L74 89 L46 91z') + glare(62, 57, 7, BONE, 6) + glare(60, 83, 7, BONE, 6) + line('M44 39 L60 48 L78 37 M60 48 L58 108', INK, 2.5) }, 'Three pairs of eyes in one allegedly adult coat'),
  board: portrait({ bg: '#33241a', back: MOSS, sil: 'M14 26 L106 18 L110 100 L10 108z', fill: RUST,
    over: shape('M26 32 L60 36 L58 70 L24 66z', BONE) + shape('M68 28 L94 26 L98 62 L72 64z', BONE) + glare(60, 49, 19, BONE, 12) + black('M36 81 L84 77 L78 91 L42 95z') + line('M20 28 L20 100', '#c9762a', 2) }, 'The notice board itself, speaking through its notices'),
  dentist: portrait(person(BONE,
    line('M28 60 L28 100', STEEL, 4) + shape('M20 46 L24 42 L32 42 L36 46 L33 60 L28 55 L23 60z', BONE) + paper,
    black('M46 31 L52 16 L68 16 L74 31z'), glare(60, 39, 7, MOSS, 7) + black('M53 48 L67 48 L64 54 L56 54z')), 'The dentist-necromancer, with a suspiciously fresh tooth'),
  intern: { ...ART.knight, label: 'The unpaid knight, carrying an induction form' },
  mother: portrait(person(PLUM,
    line('M34 69 L82 96 M34 96 L82 69', INK, 9),
    shape('M43 36 L42 22 L52 14 L70 16 L80 28 L76 36 L66 25 L52 27z', STEEL),
    glare(60, 39, 7, BONE, 7) + line('M54 50 L66 50', INK, 2.5)), 'Your mother, waiting with folded arms'),
  pigeon: portrait({ bg: '#22313d', back: MUSTARD, sil: 'M22 108 L26 72 L42 54 L46 32 L56 24 L72 28 L80 40 L100 48 L78 52 L82 74 L94 108z', fill: STEEL,
    over: black('M60 25 L72 28 L80 40 L78 52 L82 74 L94 108 L60 108z') + shape('M78 43 L100 48 L78 53z', MUSTARD) + glare(62, 38, 6, BONE, 6) + shape('M58 35 L71 35 L71 47 L58 47z', MUSTARD) + line('M69 47 L76 69', MUSTARD, 2) + shape('M44 68 L56 62 L62 78 L52 94z', BONE) + flat('M52 69 L56 73 L52 78 L48 73z', BLOOD) }, 'The wealthy pigeon, wearing a monocle and saying nothing'),
  ghost: { ...ART.ghost, label: 'The ghost with unfinished admin' },
  wizard: { bg: '#221c33', figure: `<g transform="translate(12 5) scale(.8 .72)">${heroFigure('wizard', 'gnome')}</g>`, svg: '', label: 'The wizard who lost a bet' },
};
GIVER_ART.wizard.svg = backdrop(GIVER_ART.wizard.bg, MUSTARD, [60, 46, 39]) + GIVER_ART.wizard.figure + border();

const RIVAL_CAST = [
  ['paladin', 'human', BLOOD], ['fighter', 'dwarf', MUSTARD], ['wizard', 'elf', PLUM], ['fighter', 'human', DUSK],
  ['ranger', 'elf', MOSS], ['barbarian', 'orc', RUST], ['bard', 'halfling', BLOOD], ['cleric', 'gnome', DUSK],
] as const;

export const RIVAL_ART: Record<string, InkFigure> = Object.fromEntries(RIVALS.map((name, i) => {
  const [klass, ancestry, back] = RIVAL_CAST[i];
  const actor = `<g transform="translate(12 7) scale(.8 .72)">${heroFigure(klass, ancestry, 'triumphant')}</g>`;
  return [name, { bg: '#2a2030', svg: backdrop('#2a2030', back, [60, 46, 39]) + actor + border(), figure: actor, label: name }];
}));

export const artForGiver = (id: string): InkFigure | undefined => GIVER_ART[id];
export const artForRival = (name: string): InkFigure => RIVAL_ART[name] ?? RIVAL_ART[RIVALS[0]];
