import { BLOOD, BONE, DUSK, INK, MOSS, MUSTARD, RUST, STEEL, backdrop, black, border, flat, glare, line, shaded, shape } from './ink';

/**
 * Hero portraits, full figure on a 120 x 150 canvas. The class supplies the body, pose,
 * weapon and headgear; the ancestry supplies the head and the figure's proportions.
 * 8 classes x 7 ancestries = 56 portraits.
 */
export const HERO_H = 150;
const GLOW = '#9fe06a';

interface Ancestry { skin: string; scale: [number, number]; head: (skin: string) => string }

const face = (d: string, right: string, skin: string) => shape(d, skin) + black(right);

const ANCESTRY: Record<string, Ancestry> = {
  human: {
    skin: '#c9a37a', scale: [1, 1],
    head: (k) => face('M50 46 L48 30 L54 20 L66 20 L72 30 L70 46 L60 51z', 'M60 20 L66 20 L72 30 L70 46 L60 51z', k) +
      black('M46 30 L52 16 L68 16 L74 30 L66 24 L54 24z') + glare(60, 33, 5, BONE, 6) + line('M54 43 L60 44 L65 43', INK, 1.6) + line('M52 36 L55 42', BLOOD, 1.4),
  },
  elf: {
    skin: '#dcc7a0', scale: [0.9, 1.05],
    head: (k) => shape('M50 34 L28 16 L49 41z', k) + black('M70 34 L92 16 L71 41z') +
      flat('M49 28 L44 62 L50 58 L51 34z M71 28 L76 62 L70 58 L69 34z', '#e6d49a') +
      face('M52 48 L50 28 L55 18 L65 18 L70 28 L68 48 L60 53z', 'M60 18 L65 18 L70 28 L68 48 L60 53z', k) +
      flat('M50 27 L55 16 L65 16 L70 27 L64 22 L56 22z', '#e6d49a') + glare(60, 32, 4.5, GLOW, 6) + line('M56 44 L64 44', INK, 1.4),
  },
  dwarf: {
    skin: '#b9805a', scale: [1.14, 0.8],
    head: (k) => face('M46 44 L46 30 L52 22 L68 22 L74 30 L74 44z', 'M60 22 L68 22 L74 30 L74 44 L60 44z', k) +
      black('M46 27 L58 30 L58 33 L46 31z M74 27 L62 30 L62 33 L74 31z') + glare(60, 34, 6, BONE, 6) +
      shape('M44 40 L76 40 L74 60 L60 78 L46 60z', '#b0562a') + black('M60 40 L76 40 L74 60 L60 78z') +
      line('M50 48 L52 62 M56 48 L57 68', INK, 1.6) + line('M64 48 L63 68 M70 48 L68 62', '#b0562a', 1.4) + shape('M56 34 L64 34 L65 43 L55 43z', '#a06a48'),
  },
  halfling: {
    skin: '#d9b08c', scale: [0.8, 0.76],
    head: (k) => face('M50 46 L48 32 L54 24 L66 24 L72 32 L70 46 L60 51z', 'M60 24 L66 24 L72 32 L70 46 L60 51z', k) +
      shape('M43 36 L45 22 L52 24 L54 15 L60 22 L66 15 L68 24 L75 22 L77 36 L70 29 L50 29z', RUST) + black('M60 22 L66 15 L68 24 L75 22 L77 36 L70 29 L60 29z') +
      glare(60, 36, 5, BONE, 6) + line('M54 43 L62 45 L67 41', INK, 1.8),
  },
  goblin: {
    skin: '#86a548', scale: [0.88, 0.74],
    head: (k) => shape('M49 34 L16 18 L47 43z', k) + black('M71 34 L104 18 L73 43z') +
      face('M48 46 L46 32 L54 23 L66 23 L74 32 L72 46 L60 54z', 'M60 23 L66 23 L74 32 L72 46 L60 54z', k) +
      glare(60, 33, 6, MUSTARD, 8) + flat('M58 36 L62 36 L60 45z', '#6d8a45') + black('M51 44 L69 44 L65 50 L55 50z') + flat('M52 44 L55 48 L58 44 L61 48 L64 44 L67 48 L68 44z', BONE),
  },
  orc: {
    skin: '#6d8a45', scale: [1.14, 0.98],
    head: (k) => shape('M47 34 L38 26 L46 40z', k) + black('M73 34 L82 26 L74 40z') +
      face('M46 50 L46 30 L54 21 L66 21 L74 30 L74 50 L66 56 L54 56z', 'M60 21 L66 21 L74 30 L74 50 L66 56 L60 56z', k) +
      black('M46 29 L74 29 L73 34 L47 34z') + glare(60, 36, 6, BLOOD, 7) + line('M52 50 L68 50', INK, 2) +
      flat('M50 51 L52 41 L55 51z M65 51 L68 41 L70 51z', BONE) + line('M50 40 L54 46', '#4f6a30', 1.6),
  },
  gnome: {
    skin: '#d9b08c', scale: [0.8, 0.7],
    head: (k) => face('M50 44 L48 32 L54 24 L66 24 L72 32 L70 44z', 'M60 24 L66 24 L72 32 L70 44 L60 44z', k) +
      flat('M47 29 L58 32 L58 35 L47 33z M73 29 L62 32 L62 35 L73 33z', BONE) + glare(60, 36, 6, BONE, 5) +
      shape('M45 41 L75 41 L68 66 L60 84 L52 66z', BONE) + black('M60 41 L75 41 L68 66 L60 84z') + line('M52 48 L56 64', INK, 1.4) +
      shape('M55 35 L65 35 L67 45 L53 45z', '#b86a5a'),
  },
};

interface Klass { bg: string; back: string; body: (skin: string) => string; hat: string }

const FIGHTER_SIL = 'M38 138 L42 100 L36 96 L30 70 L22 66 L28 50 L48 46 L72 46 L92 50 L98 66 L90 70 L84 96 L78 100 L82 138 L66 138 L62 108 L58 108 L54 138z';

const CLASS: Record<string, Klass> = {
  fighter: {
    bg: '#1e2a33', back: BLOOD,
    body: () => shaded(FIGHTER_SIL, STEEL) + flat('M52 50 L60 50 L60 98 L54 98z', BLOOD) + line('M44 98 L76 98', INK, 3) +
      line('M32 56 L44 60 M34 72 L42 74', INK, 1.6) + shape('M57 74 L63 74 L62 130 L60 140 L58 130z', BONE) + shape('M47 69 L73 69 L73 75 L47 75z', MUSTARD) + black('M56 62 L64 62 L64 69 L56 69z'),
    hat: shape('M46 30 L48 18 L56 12 L64 12 L72 18 L74 30 L68 24 L62 28 L60 20 L58 28 L52 24z', STEEL) + black('M60 12 L64 12 L72 18 L74 30 L68 24 L62 28 L60 20z') + shape('M57 12 L60 0 L64 12z', BLOOD),
  },
  wizard: {
    bg: '#221c33', back: MUSTARD,
    body: () => line('M102 140 L100 12', INK, 4) + shape('M100 -2 L108 10 L100 22 L92 10z', GLOW) +
      shaded('M28 138 L44 82 L40 60 L50 48 L70 48 L82 56 L96 46 L106 54 L86 72 L80 84 L96 138z', DUSK) +
      line('M34 128 L60 132', MUSTARD, 2.5) + line('M42 86 L78 84', INK, 3) + flat('M56 60 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z', MUSTARD) + line('M46 96 L40 124 M54 98 L52 126', '#57748c', 1.6),
    hat: shape('M34 28 L52 22 L60 -8 L66 6 L70 22 L88 28 L60 33z', DUSK) + black('M60 -8 L66 6 L70 22 L88 28 L60 33z') + line('M38 28 L60 32', MUSTARD, 2) + flat('M54 10 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5z', MUSTARD),
  },
  rogue: {
    bg: '#2b2620', back: '#7a8c96',
    body: () => shaded('M34 138 L44 104 L38 82 L24 96 L18 90 L44 58 L52 48 L70 48 L80 60 L98 74 L94 84 L78 76 L80 100 L88 138 L72 138 L64 110 L52 138z', '#5a5466') +
      shape('M94 76 L112 58 L100 84z', BONE) + shape('M22 92 L6 106 L24 100z', BONE) + line('M42 100 L80 98', INK, 3) + flat('M46 96 h7 v8 h-7z', MUSTARD) + line('M46 62 L54 92', '#787288', 1.6),
    hat: black('M42 54 L44 26 L54 13 L66 13 L76 26 L78 54 L72 46 L72 30 L60 24 L48 30 L48 46z') + flat('M48 38 L72 38 L72 46 L60 50 L48 46z', INK) ,
  },
  bard: {
    bg: '#4a1c14', back: BONE,
    body: () => black('M40 56 L22 120 L34 112 L40 126 L46 100z') +
      shaded('M36 138 L46 100 L42 84 L30 92 L24 84 L42 56 L50 48 L70 48 L84 58 L94 80 L84 84 L78 74 L76 100 L86 138 L70 138 L62 110 L54 138z', '#a8477a') +
      line('M62 86 L92 52', INK, 5) + line('M62 86 L92 52', RUST, 2) + shape('M44 96 L36 84 L44 72 L58 70 L68 80 L64 94 L52 102z', MUSTARD) + black('M50 80 L58 79 L59 87 L51 88z') +
      line('M44 100 L78 100', INK, 2.5),
    hat: shape('M38 27 L50 13 L72 11 L84 25 L60 22z', BLOOD) + black('M60 12 L72 11 L84 25 L60 22z') + shape('M72 13 L94 -6 L86 16 L78 20z', MUSTARD),
  },
  cleric: {
    bg: '#22313d', back: MUSTARD,
    body: () => line('M98 140 L96 40', INK, 4) + shape('M96 20 L104 28 L114 28 L108 40 L110 52 L96 46 L82 52 L86 40 L80 28 L90 28z', STEEL) +
      shaded('M34 138 L40 72 L32 64 L46 48 L74 48 L88 60 L102 66 L102 78 L82 74 L86 138z', BONE) +
      flat('M51 50 L56 50 L56 132 L49 132z', MUSTARD) + flat('M64 50 L69 50 L71 132 L64 132z', '#8a6a1e') + shape('M56 62 L60 56 L64 62 L60 68z', BLOOD) + line('M40 84 L42 128', '#c9c0a8', 1.6),
    hat: shape('M48 25 L50 10 L60 -4 L70 10 L72 25z', BONE) + black('M60 -4 L70 10 L72 25 L60 25z') + line('M55 8 L55 20 M50 14 L59 14', MUSTARD, 2.5),
  },
  barbarian: {
    bg: '#33241a', back: BLOOD,
    body: (skin) => line('M98 80 L104 6', INK, 5) + shape('M104 10 L124 2 L122 36 L106 30z', STEEL) + shape('M104 10 L88 6 L90 30 L106 30z', '#aab4b8') +
      shaded('M34 138 L42 108 L36 84 L22 80 L16 60 L34 46 L86 46 L104 60 L104 80 L86 84 L78 108 L86 138 L68 138 L60 114 L52 138z', skin) +
      shape('M40 100 L80 100 L90 128 L74 120 L60 132 L46 120 L30 128z', RUST) + black('M60 100 L80 100 L90 128 L74 120 L60 132z') +
      line('M36 50 L74 100', INK, 4) + shape('M54 96 L66 96 L64 106 L56 106z', BONE) + line('M40 62 L52 66 M42 74 L50 76', INK, 1.6),
    hat: shape('M49 22 L32 16 L26 0 L38 12 L52 16z', BONE) + black('M71 22 L88 16 L94 0 L82 12 L68 16z') + shape('M46 28 L50 15 L70 15 L74 28 L60 24z', RUST) + black('M60 15 L70 15 L74 28 L60 24z'),
  },
  ranger: {
    bg: '#1f2e28', back: BONE,
    body: () => line('M24 18 L8 66 L24 114', INK, 4.5) + line('M24 18 L24 114', BONE, 1.2) + line('M24 66 L74 60', INK, 2) + flat('M74 56 L82 59 L74 64z', STEEL) +
      shape('M78 28 L92 24 L96 58 L84 60z', RUST) + line('M82 26 L80 14 M88 24 L90 12', BONE, 2) +
      shaded('M40 138 L46 100 L40 78 L24 72 L22 62 L46 50 L72 48 L86 60 L80 78 L76 100 L84 138 L68 138 L62 112 L56 138z', MOSS) +
      line('M46 100 L76 98', INK, 3) + line('M46 56 L76 96', INK, 2.5) + line('M44 108 L42 130', '#8fa860', 1.6),
    hat: shape('M44 52 L44 28 L54 12 L74 6 L66 16 L76 28 L76 52 L72 44 L72 30 L60 24 L48 30 L48 44z', MOSS) + black('M60 10 L74 6 L66 16 L76 28 L76 52 L72 44 L72 30 L60 24z') + shape('M50 16 L40 -2 L56 10z', BLOOD),
  },
  paladin: {
    bg: '#22313d', back: BONE,
    body: () => line('M98 140 L98 34', INK, 4.5) + shape('M82 16 L114 16 L114 38 L82 38z', STEEL) + black('M100 16 L114 16 L114 38 L100 38z') +
      shaded('M36 138 L40 100 L34 96 L28 70 L18 64 L26 48 L48 46 L72 46 L94 48 L104 64 L104 76 L90 72 L86 96 L80 100 L84 138 L66 138 L62 108 L58 108 L54 138z', MUSTARD) +
      shape('M18 74 L58 70 L58 108 L40 132 L22 108z', DUSK) + black('M44 71 L58 70 L58 108 L44 126z') + shape('M32 88 L38 80 L44 88 L38 98z', MUSTARD) + line('M22 80 L54 77', '#57748c', 1.6),
    hat: shape('M47 26 L26 20 L32 6 L48 16z', BONE) + black('M73 26 L94 20 L88 6 L72 16z') + shape('M46 30 L50 14 L70 14 L74 30 L60 26z', MUSTARD) + black('M60 14 L70 14 L74 30 L60 26z'),
  },
};

export const CLASS_IDS = Object.keys(CLASS);
export const ANCESTRY_IDS = Object.keys(ANCESTRY);

export const heroSvg = (classId: string, ancestryId: string): string => {
  const c = CLASS[classId] ?? CLASS.fighter;
  const a = ANCESTRY[ancestryId] ?? ANCESTRY.human;
  const [sx, sy] = a.scale;
  return (
    backdrop(c.bg, c.back, [60, 58, 44], HERO_H) +
    `<g transform="translate(60 144) scale(${sx} ${sy}) translate(-60 -138)">` + c.body(a.skin) + a.head(a.skin) + c.hat + '</g>' +
    border(HERO_H)
  );
};
