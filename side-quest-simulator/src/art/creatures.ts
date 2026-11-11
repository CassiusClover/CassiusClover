import { PACK_ART } from '../game/content/packs.generated';
import { BLOOD, BONE, DUSK, INK, MOSS, MUSTARD, PLUM, RUST, STEEL, black, build, flat, glare, line, shape, slit } from './ink';

/**
 * Card art in the comic-ink style: one angular figure per card, half in black shadow.
 * See ink.ts for the kit. `bg` is the dominant backdrop colour of each piece.
 */
const piece = (p: Parameters<typeof build>[0]) => ({ bg: p.bg, svg: build(p) });
const NIGHT = '#1e2a33';
const SOOT = '#2b2620';
const WINE = '#4a1c14';
const GLOW = '#9fe06a';
const ICE = '#bcd6dc';

const knight = (dark: boolean) => piece({
  bg: dark ? '#2a2030' : NIGHT, back: dark ? BLOOD : MUSTARD, disc: [60, 46, 38], shadow: dark ? 'L' : 'R',
  under: shape('M60 14 L50 -4 L74 0 L68 14z', BLOOD) + (dark ? line('M96 108 L100 20', INK, 4) + shape('M96 22 L100 2 L104 22z', STEEL) : ''),
  sil: 'M36 108 L40 74 L30 70 L28 48 L42 40 L44 30 L42 20 L52 12 L68 12 L78 20 L76 30 L78 40 L92 48 L90 70 L80 74 L84 108 L66 108 L62 82 L58 82 L54 108z',
  fill: dark ? '#4a4452' : '#c9ced0',
  over: black('M44 22 L76 22 L75 29 L45 29z') + glare(60, 24, 7, dark ? BLOOD : BONE, 7) + line('M60 30 L60 40 M54 32 L54 38 M66 32 L66 38', INK, 1.4) +
    (dark
      ? flat('M22 30 L26 22 L28 32 L25 36z', ICE) + line('M48 52 L60 62 L72 52', '#6a6274', 1.6)
      : shape('M40 58 L78 54 L82 78 L44 84z', BONE) + line('M48 64 L56 70 L62 62 L70 72 M50 76 L58 74', BLOOD, 1.6) + flat('M54 44 L66 44 L64 54 L56 54z', MUSTARD)),
});

export const ART: Record<string, { bg: string; svg: string }> = {
  troll: piece({
    bg: '#3f4a2e', back: MUSTARD, disc: [60, 46, 38],
    under: shape('M96 70 L108 14 L118 18 L112 40 L118 44 L106 74z', RUST),
    sil: 'M20 108 L12 78 L18 50 L36 34 L49 36 L51 24 L60 20 L69 24 L71 36 L86 36 L102 54 L108 82 L100 108 L84 108 L88 80 L78 68 L76 108 L44 108 L42 70 L32 80 L36 108z',
    fill: MOSS,
    over: glare(60, 28, 5, MUSTARD, 7) + flat('M53 37 L55 30 L58 37z M62 37 L65 30 L67 37z', BONE) + line('M52 34 L68 34') +
      line('M30 52 L40 46 M26 62 L36 58', INK, 1.6) + flat('M96 60 L100 58 L104 80 L100 96z', '#8fa860'),
  }),
  mimic: piece({
    bg: SOOT, back: MUSTARD, disc: [60, 50, 40],
    sil: 'M16 108 L18 68 L102 68 L104 108z M14 60 L24 28 L94 16 L106 50z',
    fill: RUST,
    over: flat('M20 68 L28 80 L36 68 L44 80 L52 68 L60 80 L68 68 L76 80 L84 68 L92 80 L100 68z', BONE) +
      flat('M18 58 L26 46 L34 57 L42 44 L50 56 L58 42 L66 55 L74 41 L82 54 L90 40 L98 52 L104 50z', BONE) +
      shape('M46 68 L50 92 L62 100 L72 90 L70 68z', BLOOD) + glare(58, 30, 14, MUSTARD, 11) +
      shape('M54 94 L66 94 L66 106 L54 106z', MUSTARD) + line('M24 88 L44 88 M22 98 L40 98', INK, 1.6),
  }),
  goose: piece({
    bg: '#22313d', back: BONE, disc: [62, 50, 38], shadow: 'L',
    sil: 'M28 108 L22 86 L32 72 L48 64 L50 44 L46 32 L56 30 L68 30 L84 34 L98 40 L72 44 L70 52 L68 64 L84 74 L94 92 L90 108z',
    fill: BONE,
    over: shape('M22 86 L32 72 L48 64 L68 64 L84 74 L94 92 L90 108 L28 108z', PLUM) + black('M22 86 L32 72 L48 64 L56 64 L52 108 L28 108z') +
      shape('M40 32 L58 2 L72 32z', PLUM) + black('M40 32 L58 2 L56 32z') + line('M32 33 L80 31', INK, 4) +
      shape('M70 35 L100 40 L72 45z', MUSTARD) + slit(62, 38, -1, BLOOD, 9) + flat('M60 14 l2 4 l4 1 l-4 1 l-2 4 l-2 -4 l-4 -1 l4 -1z', MUSTARD) +
      glare(38, 88, 4, BONE, 5) + flat('M36 93 L42 95 L36 97z', MUSTARD) + glare(74, 88, 4, BONE, 5) + flat('M72 93 L78 95 L72 97z', MUSTARD),
  }),
  soup: piece({
    bg: SOOT, back: '#c9762a', disc: [60, 44, 36],
    under: line('M40 20 L36 10 L42 4 M60 16 L56 6 L62 0 M80 20 L76 10 L82 4', BONE, 2),
    sil: 'M18 52 L102 52 L96 94 L80 108 L40 108 L24 94z',
    fill: '#4a5055',
    over: shape('M20 52 L100 52 L96 60 L24 60z', '#c9762a') + shape('M38 52 L42 34 L54 26 L70 28 L80 40 L82 52z', '#c9762a') + black('M62 27 L70 28 L80 40 L82 52 L60 52z') +
      glare(60, 38, 8, BONE, 9) + line('M50 47 L58 44 L66 47', INK, 2) + flat('M30 54 h4 v3 h-4z', BLOOD) + flat('M86 55 h4 v3 h-4z', MOSS) +
      line('M10 60 L18 64 M110 60 L102 64', INK, 4) + line('M30 70 L34 92', '#6a7278', 2),
  }),
  skeleton: piece({
    bg: '#2a2030', back: BLOOD, disc: [62, 48, 38],
    under: line('M30 72 L22 8', INK, 4) + shape('M4 8 L42 2 L44 26 L6 32z', MUSTARD) + line('M10 14 L36 10 M12 22 L30 19', INK, 2.5),
    sil: 'M48 14 L68 14 L74 22 L72 34 L66 38 L66 42 L82 46 L88 72 L80 72 L78 54 L72 54 L74 76 L70 76 L74 108 L62 108 L61 82 L57 82 L56 108 L44 108 L48 76 L44 76 L46 54 L40 54 L36 74 L26 72 L34 46 L52 42 L52 38 L46 34 L44 22z',
    fill: BONE,
    over: black('M49 21 L56 22 L55 28 L49 27z') + flat('M62 22 L69 21 L69 27 L63 28z', BLOOD) + line('M54 33 L64 33 M56 31 L56 36 M59 31 L59 36 M62 31 L62 36', INK, 1.2) +
      line('M48 58 L60 60 M48 64 L60 66 M48 70 L60 72', INK, 1.6) + line('M62 60 L72 58 M62 66 L72 64', BONE, 1.4),
  }),
  door: piece({
    bg: SOOT, back: '#7a8c96', disc: [60, 50, 42],
    sil: 'M28 108 L28 30 L42 12 L78 12 L92 30 L92 108z',
    fill: RUST,
    over: line('M44 14 L44 106 M60 12 L60 106', '#7a4420', 1.6) + line('M76 14 L76 106', '#3a2416', 1.6) +
      line('M36 34 L52 40 M84 34 L68 40', INK, 3) + glare(60, 46, 13, MUSTARD, 11) +
      black('M56 64 L64 64 L66 72 L62 74 L64 88 L56 88 L58 74 L54 72z') + flat('M80 70 h5 v7 h-5z', MUSTARD) +
      black('M28 30 L42 12 L46 12 L32 30z') + flat('M30 100 L40 108 L28 108z', BONE),
  }),
  ghost: piece({
    bg: NIGHT, back: '#4f6b7a', disc: [60, 46, 40],
    sil: 'M32 108 L28 60 L34 34 L48 18 L62 14 L76 20 L88 36 L92 62 L90 108 L82 94 L74 108 L66 92 L58 108 L50 94 L42 108z',
    fill: '#c9d4d8',
    over: black('M42 38 L54 41 L52 51 L43 48z') + flat('M66 41 L78 38 L77 48 L68 51z', '#4f6b7a') + black('M55 58 L65 58 L63 76 L57 76z') +
      shape('M6 60 L30 54 L34 84 L10 90z', BONE) + line('M12 64 L26 61 M13 71 L28 68 M14 78 L24 76', INK, 1.6) + line('M30 66 L40 62', INK, 3),
  }),
  bandit: piece({
    bg: '#262b1c', back: MUSTARD, disc: [58, 44, 36],
    sil: 'M20 108 L30 62 L42 50 L40 34 L48 20 L62 14 L76 22 L80 36 L78 50 L92 62 L100 108z',
    fill: '#56613a',
    over: flat('M46 30 L74 30 L72 46 L60 54 L48 46z', '#c9a37a') + black('M60 30 L74 30 L72 46 L60 54z') + black('M44 31 L76 31 L75 40 L45 40z') +
      glare(60, 33, 7, BONE, 8) + line('M52 46 L60 49 L68 46', INK, 1.8) + flat('M55 47 L57 50 L59 48z', BONE) +
      shape('M66 70 L96 66 L100 100 L70 104z', RUST) + flat('M70 74 L92 71 L95 96 L73 99z', BONE) +
      line('M74 79 L77 82 L82 76 M74 88 L77 91 L82 85 M85 80 L91 79 M85 89 L91 88', INK, 1.6) + line('M40 70 L50 100', '#6d7a48', 1.6),
  }),
  dragon: piece({
    bg: WINE, back: MUSTARD, disc: [64, 50, 40], shadow: 'L',
    under: shape('M58 52 L24 14 L30 44 L12 36 L26 60 L10 62 L40 74z', '#7a2418') + shape('M70 50 L104 18 L98 46 L114 42 L100 62 L112 68 L84 74z', BLOOD),
    sil: 'M44 108 L40 84 L48 66 L44 50 L52 44 L50 30 L58 36 L64 28 L72 30 L88 40 L98 52 L84 54 L90 60 L76 62 L78 76 L88 90 L84 108 L70 108 L66 92 L60 108z',
    fill: BLOOD,
    over: slit(70, 40, -1, MUSTARD, 9) + flat('M80 54 L82 59 L84 54z M86 54 L87 58 L89 54z', BONE) + line('M62 70 L72 70 M62 78 L74 78 M64 86 L76 86', '#d9643a', 1.6) +
      flat('M8 108 L12 98 L18 106 L22 94 L28 108z', MUSTARD),
  }),
  sandwich: piece({
    bg: '#2a2030', back: '#8fae6a', disc: [60, 56, 42],
    under: line('M100 30 L108 22 L104 14 M12 34 L6 26 L10 18', GLOW, 2),
    sil: 'M14 62 L28 40 L92 36 L106 60 L104 70 L108 78 L100 82 L104 94 L96 106 L24 106 L16 94 L20 84 L12 78 L16 70z',
    fill: '#c99a55',
    over: shape('M12 78 L20 70 L30 78 L40 70 L50 78 L60 70 L70 78 L80 70 L90 78 L100 70 L108 78 L100 84 L20 84z', MOSS) +
      shape('M18 84 L102 84 L104 92 L16 92z', BLOOD) + flat('M30 64 L44 72 L58 64z M62 64 L76 72 L90 64z', MUSTARD) +
      black('M64 37 L92 36 L106 60 L104 68 L64 68z') + line('M40 46 L52 51 M80 46 L68 51', INK, 3) + glare(60, 54, 12, GLOW, 11) +
      black('M52 98 L56 94 L60 98 L64 94 L68 98 L64 102 L56 102z'),
  }),
  bridge: piece({
    bg: NIGHT, back: '#4f6b7a', disc: [60, 40, 34],
    under: line('M4 44 L60 62 L116 44 M4 70 L60 92 L116 70', INK, 2.5) + line('M10 30 L10 84 M110 30 L110 84', INK, 5) +
      shape('M24 8 L50 6 L52 22 L40 24 L36 32 L34 24 L26 24z', BONE) + line('M30 14 L46 13', BLOOD, 2.5) +
      shape('M68 14 L96 10 L98 26 L88 28 L86 36 L82 28 L70 30z', BONE) + line('M74 20 L92 18', INK, 2.5),
    sil: 'M14 52 L34 58 L34 82 L14 76z M40 62 L58 66 L58 92 L40 88z M64 66 L82 62 L82 88 L64 92z M88 58 L106 52 L106 76 L88 82z',
    fill: RUST,
    over: glare(24, 62, 4, MUSTARD, 5) + black('M20 70 L28 72 L27 76 L21 75z') + glare(49, 72, 4, MUSTARD, 5) + line('M44 82 L54 84', INK, 2) +
      glare(73, 72, 4, BLOOD, 5) + flat('M68 80 L78 80 L76 86 L70 86z', BONE) + glare(97, 62, 4, BLOOD, 5) + line('M92 72 L102 70', BONE, 2),
  }),
  tower: piece({
    bg: '#22313d', back: MUSTARD, disc: [56, 40, 34],
    under: line('M82 108 L90 108 L90 98 L98 98 L98 88 L106 88 L106 78 L114 78', INK, 3),
    sil: 'M38 108 L44 40 L34 40 L34 22 L44 22 L44 30 L54 30 L54 20 L66 20 L66 30 L76 30 L76 22 L86 22 L86 40 L76 40 L84 108z',
    fill: STEEL,
    over: line('M60 20 L60 2', INK, 3) + flat('M61 2 L78 7 L61 12z', BLOOD) + glare(60, 54, 8, MUSTARD, 8) +
      black('M52 108 L52 86 L60 78 L68 86 L68 108z') + line('M46 66 L54 66 M48 76 L52 76 M44 96 L50 96', '#5a6468', 1.6) + flat('M54 108 L54 88 L58 84 L58 108z', MUSTARD),
  }),
  cube: piece({
    bg: '#1f2e28', back: BONE, disc: [56, 60, 44],
    under: shape('M82 4 L116 2 L118 24 L84 26z', BONE) + line('M88 20 L96 12 L102 16 L112 6', BLOOD, 2),
    sil: 'M18 46 L40 26 L100 30 L98 88 L76 108 L20 104z',
    fill: '#5f9a80',
    over: line('M18 46 L78 50 L76 108 M78 50 L100 30', INK, 2) + line('M22 52 L72 55', '#8fc4aa', 1.6) +
      glare(48, 68, 11, BONE, 10) + line('M38 84 L48 88 L58 84', INK, 2.5) +
      flat('M26 92 L34 86 L36 96z', BONE) + flat('M60 94 L68 92 L70 100 L62 102z', BONE) + line('M84 64 L92 44', BONE, 2) + flat('M84 78 h6 v6 h-6z', '#3d6a58'),
  }),
  mug: piece({
    bg: '#3a2418', back: BLOOD, disc: [56, 54, 42],
    under: shape('M84 50 L106 52 L108 86 L88 90 L88 78 L96 76 L96 62 L86 60z', MUSTARD),
    sil: 'M28 42 L86 38 L90 106 L32 108z',
    fill: MUSTARD,
    over: shape('M22 44 L28 26 L40 32 L48 18 L60 28 L72 16 L80 30 L92 28 L90 44z', BONE) + flat('M34 44 L36 58 L42 44z M56 44 L58 54 L62 44z', BONE) +
      line('M38 58 L52 64 M78 58 L66 64', INK, 3) + glare(58, 70, 10, BLOOD, 10) +
      black('M44 84 L74 82 L72 94 L46 96z') + flat('M48 85 L52 91 L56 85 L60 91 L64 84 L68 90 L71 84 L71 83 L46 85z', BONE) +
      line('M34 50 L40 70 L36 80', '#e0b85a', 1.6) + line('M8 60 L18 66 M8 82 L18 78 M12 100 L20 92', BONE, 2.5),
  }),
  fairy: piece({
    bg: '#2a2030', back: '#a8477a', disc: [60, 46, 34],
    under: shape('M52 54 L10 16 L20 54 L6 66 L48 70z', ICE) + shape('M68 54 L110 16 L100 54 L114 66 L72 70z', '#8fb0b8') + line('M16 24 L44 60 M104 24 L76 60', INK, 1.4),
    sil: 'M52 108 L50 78 L44 62 L50 46 L48 32 L56 22 L66 22 L72 32 L70 46 L76 62 L70 78 L70 108 L61 86z',
    fill: MOSS,
    over: flat('M50 30 L70 30 L69 42 L60 48 L51 42z', BONE) + black('M60 30 L70 30 L69 42 L60 48z') + black('M46 32 L56 18 L68 20 L74 32 L66 26 L56 26z') +
      glare(60, 34, 5, MUSTARD, 6) + line('M55 42 L60 44 L66 41', INK, 1.6) +
      shape('M22 70 L44 64 L48 74 L34 80 L40 98 L26 106 L20 92 L28 84z', BONE) + line('M28 72 L40 69 M28 90 L34 96', INK, 1.4) +
      line('M76 62 L96 40', INK, 2.5) + flat('M96 30 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3z', MUSTARD),
  }),
  knight: knight(false),
  blackknight: knight(true),
  mushroom: piece({
    bg: '#2e2a22', back: BONE, disc: [60, 50, 40],
    under: shape('M44 68 L76 68 L82 108 L38 108z', BONE) + black('M62 68 L76 68 L82 108 L60 108z'),
    sil: 'M10 68 L24 36 L48 20 L72 20 L96 36 L110 68 L60 76z',
    fill: BLOOD,
    over: flat('M28 46 L36 40 L42 48 L34 54z M56 28 L64 26 L66 34 L58 36z', BONE) + flat('M80 44 L88 42 L90 52 L82 54z', '#c9c0a8') +
      shape('M46 20 L50 8 L56 16 L60 4 L64 16 L70 8 L74 20z', MUSTARD) + glare(60, 84, 7, MUSTARD, 7) + line('M52 96 L60 93 L68 96', INK, 2) +
      black('M12 108 L14 98 L8 96 L18 88 L28 96 L22 98 L24 108z') + black('M96 108 L97 100 L92 98 L102 90 L112 98 L107 100 L108 108z'),
  }),
  cat: piece({
    bg: '#33241a', back: MUSTARD, disc: [60, 50, 40],
    under: black('M4 108 L6 80 L2 62 L12 70 L22 66 L28 58 L30 80 L34 108z') + glare(16, 78, 5, GLOW, 5) +
      black('M86 108 L90 82 L88 62 L98 70 L108 66 L116 58 L116 108z') + glare(102, 78, 5, GLOW, 5) + line('M88 100 L104 96 L110 82', INK, 5),
    sil: 'M34 108 L30 80 L36 60 L30 30 L46 44 L60 42 L74 44 L90 30 L84 60 L90 80 L86 108z',
    fill: '#c9762a',
    over: glare(60, 58, 11, GLOW, 11) + flat('M56 68 L64 68 L60 73z', BLOOD) + line('M60 73 L54 78 M60 73 L66 78', INK, 1.8) +
      line('M48 46 L52 54 M56 44 L58 52 M40 84 L50 86 M38 94 L48 96', INK, 2) + line('M40 68 L24 64 M40 72 L24 74 M80 68 L96 64 M80 72 L96 74', BONE, 1.2),
  }),
  lich: piece({
    bg: '#2a2030', back: '#8fae6a', disc: [60, 44, 36],
    under: line('M100 108 L100 20', INK, 4) + shape('M100 6 L108 18 L100 30 L92 18z', GLOW),
    sil: 'M24 108 L34 66 L30 54 L44 50 L46 40 L44 28 L50 18 L54 24 L60 14 L66 24 L70 18 L76 28 L74 40 L76 50 L90 54 L86 66 L96 108 L74 108 L70 84 L62 108 L56 108 L52 84 L46 108z',
    fill: PLUM,
    over: flat('M47 28 L73 28 L72 40 L66 48 L54 48 L48 40z', BONE) + black('M60 28 L73 28 L72 40 L66 48 L60 48z') +
      black('M51 33 L57 34 L56 38 L52 37z') + flat('M53 34.5 h2.5 v2 h-2.5z', GLOW) + flat('M63 34.5 h3 v2.5 h-3z', GLOW) +
      line('M55 44 v4 M58 44 v4 M62 44 v4 M65 44 v4', INK, 1.2) + shape('M46 26 L50 18 L54 24 L60 14 L66 24 L70 18 L74 26z', MUSTARD) +
      line('M40 70 L44 96 M36 82 L38 100', '#7a5680', 1.6) + shape('M8 108 L20 80 L32 108z', MUSTARD) + line('M14 98 L26 98 M17 90 L23 90', INK, 1.6),
  }),
  sign: piece({
    bg: SOOT, back: BLOOD, disc: [60, 44, 36],
    under: shape('M54 56 L66 54 L70 108 L56 108z', RUST) + line('M96 4 L80 26 M112 30 L92 40', INK, 2) + flat('M96 4 L102 6 L98 12z M112 30 L114 37 L108 36z', BONE),
    sil: 'M10 28 L102 14 L110 50 L18 64z',
    fill: MUSTARD,
    over: line('M22 34 L92 24 M24 46 L70 40', INK, 5) + line('M26 56 L60 52', INK, 2) + glare(86, 44, 6, BLOOD, 6) +
      flat('M8 108 L16 88 L24 108z M30 108 L36 94 L42 108z M80 108 L88 90 L96 108z M100 108 L106 96 L112 108z', BONE) + black('M12 108 L16 88 L24 108z M84 108 L88 90 L96 108z'),
  }),
  lute: piece({
    bg: WINE, back: BONE, disc: [56, 60, 40],
    under: line('M14 30 L14 10 L28 6 L28 24', INK, 2.5) + black('M6 30 L14 26 L16 32 L8 36z M20 26 L28 22 L30 28 L22 32z') + line('M106 70 L106 52', INK, 2.5) + black('M98 72 L106 68 L108 74 L100 78z'),
    sil: 'M28 98 L18 78 L26 58 L46 48 L62 56 L94 12 L106 20 L72 66 L76 86 L62 102 L42 106z',
    fill: MUSTARD,
    over: black('M90 6 L108 14 L104 24 L88 14z') + black('M42 66 L54 64 L58 76 L46 80z') + line('M38 88 L96 16 M44 92 L102 20', BONE, 1.2) +
      line('M30 70 L40 62', '#e0b85a', 1.6) + line('M50 96 L44 110 L52 114', BONE, 1.4) + glare(40, 90, 5, BLOOD, 5),
  }),
  orb: piece({
    bg: '#221c33', back: MUSTARD, disc: [62, 48, 42],
    under: shape('M34 108 L44 84 L84 84 L94 108z', RUST) + black('M64 84 L84 84 L94 108 L62 108z'),
    sil: 'M40 22 L64 14 L88 24 L100 50 L90 76 L64 86 L40 78 L28 50z',
    fill: '#7a68a8',
    over: shape('M40 50 L64 36 L88 50 L64 64z', BONE) + shape('M58 42 L70 42 L72 58 L56 58z', BLOOD) + black('M62 44 L66 44 L67 56 L61 56z') +
      line('M38 36 L48 26 M36 46 L40 40', ICE, 2.5) + line('M36 50 L30 44 M92 50 L100 42', INK, 2) +
      flat('M14 20 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2z', BONE) + flat('M106 84 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z', BONE),
  }),
  giant: piece({
    bg: SOOT, back: SOOT, disc: [0, 0, 0],
    sil: 'M6 124 L2 60 L18 26 L50 10 L84 12 L110 32 L118 70 L114 124z',
    fill: '#b9805a',
    over: black('M0 40 L18 22 L50 6 L86 8 L112 28 L120 44 L96 30 L74 34 L54 26 L30 34z') + black('M14 48 L52 44 L50 53 L16 56z') + black('M70 46 L104 50 L102 58 L72 54z') +
      shape('M22 60 L46 58 L48 72 L24 74z', BONE) + black('M32 60 L40 60 L40 72 L32 72z') + line('M74 66 L98 68', BONE, 2.5) +
      shape('M56 62 L64 62 L70 90 L52 92z', '#a06a48') + line('M40 106 L60 100 L82 108', INK, 3) +
      shape('M84 82 L100 76 L114 86 L116 104 L104 114 L88 108 L80 96z', ICE) + line('M90 88 L98 82', BONE, 2.5),
  }),
  goblin: piece({
    bg: '#262b1c', back: MUSTARD, disc: [60, 46, 36],
    sil: 'M28 108 L34 78 L28 64 L36 50 L8 32 L40 38 L48 28 L66 26 L76 36 L110 26 L84 50 L92 64 L86 80 L94 108z',
    fill: '#86a548',
    over: line('M42 40 L54 45 M78 40 L66 45', INK, 3) + glare(60, 48, 10, MUSTARD, 10) + flat('M58 52 L62 52 L64 62 L57 60z', '#6d8a45') +
      black('M44 64 L76 64 L72 74 L48 74z') + flat('M46 64 L50 70 L54 64 L58 70 L62 64 L66 70 L70 64 L74 69 L75 64z', BONE) +
      shape('M34 82 L86 80 L94 108 L28 108z', RUST) + black('M62 81 L86 80 L94 108 L60 108z') +
      shape('M40 88 L46 88 L47 100 L39 100z', BLOOD) + shape('M52 86 L58 86 L59 100 L51 100z', GLOW) + flat('M70 90 h6 v10 h-6z', MUSTARD),
  }),
  statue: piece({
    bg: '#22313d', back: BONE, disc: [60, 44, 36],
    under: black('M70 12 L80 4 L86 10 L96 8 L84 16 L76 16z'),
    sil: 'M24 108 L24 92 L38 92 L40 64 L32 60 L36 44 L46 38 L46 22 L54 12 L68 12 L76 22 L74 38 L84 44 L90 62 L80 66 L82 92 L96 92 L96 108z',
    fill: STEEL,
    over: slit(54, 24, 1, MUSTARD, 8) + line('M62 24 L70 25', INK, 2.5) + line('M54 32 L66 32', INK, 2) +
      line('M46 44 L56 54 L52 66 M40 76 L48 84', INK, 1.6) + flat('M26 92 L36 92 L32 100 L24 98z M44 50 L50 46 L52 54z', MOSS) + line('M26 100 L50 100', '#aab4b8', 1.6),
  }),
  portal: piece({
    bg: '#221c33', back: '#7a68a8', disc: [60, 96, 50],
    under: shape('M10 96 L34 84 L86 84 L110 96 L86 110 L34 110z', PLUM) + line('M24 96 L42 90 L78 90 L96 96 L78 102 L46 102 L40 96 L60 94', ICE, 1.6) +
      shape('M92 30 L104 24 L108 36 L98 42z', BONE) + shape('M10 40 L22 36 L20 48z', '#6fa8b8'),
    sil: 'M48 98 L46 62 L36 40 L46 44 L50 28 L57 46 L62 22 L67 46 L76 30 L76 56 L74 98z',
    fill: '#86a548',
    over: shape('M52 62 L60 56 L68 62 L60 68z', BONE) + black('M58 58 L62 58 L62 66 L58 66z') + line('M50 78 L56 80 M50 86 L56 88', '#6d8a45', 1.6),
  }),
  horse: piece({
    bg: '#33241a', back: BONE, disc: [64, 48, 40], shadow: 'L',
    under: black('M40 18 L24 34 L32 42 L20 54 L30 60 L22 76 L40 72z') + shape('M4 6 L38 2 L40 26 L6 30z', BONE) +
      flat('M12 10 l2 4 l4 1 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -1z', MUSTARD) + line('M22 14 L34 13 M10 24 L34 21', INK, 1.6),
    sil: 'M32 108 L38 70 L30 52 L40 18 L50 34 L62 30 L86 52 L106 74 L102 88 L84 90 L70 80 L68 108z',
    fill: RUST,
    over: line('M56 38 L72 44', INK, 3) + slit(66, 48, -1, BONE, 9) + black('M96 76 L100 76 L100 80 L97 80z') +
      flat('M82 84 L84 78 L87 84 L90 78 L93 84 L96 79 L99 84 L100 88 L84 90z', BONE) + line('M82 84 L100 84', INK, 1.4) + line('M74 60 L84 66', '#b8733c', 1.6),
  }),
  moon: piece({
    bg: '#151a2a', back: '#151a2a', disc: [0, 0, 0],
    under: flat('M14 16 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5z M108 12 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 l3 -1z M10 84 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 l3 -1z', BONE) +
      shape('M92 108 L94 76 L112 76 L114 108z', '#c99a55') + line('M98 84 h2 M106 90 h2 M100 98 h2', INK, 2),
    sil: 'M34 18 L62 8 L90 18 L104 44 L98 74 L74 94 L46 92 L24 72 L18 44z',
    fill: MUSTARD,
    over: flat('M30 32 L40 28 L44 38 L34 42z M70 20 L78 18 L80 26 L72 28z M36 70 L42 68 L44 76 L38 78z', '#a87a1e') + black('M98 74 L74 94 L78 70z') +
      line('M38 44 L52 49 M80 44 L68 49', INK, 3) + glare(60, 52, 11, WINE, 10) +
      black('M44 68 L76 68 L70 80 L50 80z') + flat('M46 68 L50 74 L54 68 L58 74 L62 68 L66 74 L70 68 L74 73 L75 68z', BONE),
  }),
  hedge: piece({
    bg: '#1f2e28', back: BONE, disc: [60, 56, 36],
    under: line('M2 6 L20 24 L12 28 L30 46', MUSTARD, 3.5) + line('M118 6 L100 24 L108 28 L90 46', ICE, 3.5),
    sil: 'M12 106 L6 82 L16 68 L10 52 L28 48 L30 32 L46 38 L56 24 L68 36 L84 28 L88 46 L106 50 L100 68 L112 82 L106 106z',
    fill: '#4f7a3c',
    over: line('M38 58 L52 64 M82 58 L68 64', INK, 3) + glare(60, 68, 12, BLOOD, 11) +
      black('M40 84 L80 84 L74 96 L46 96z') + flat('M42 84 L46 90 L50 84 L54 90 L58 84 L62 90 L66 84 L70 90 L74 84 L78 89 L79 84z', BONE) +
      line('M22 62 L28 70 M26 86 L34 92 M30 46 L36 52', '#6f9a56', 1.8),
  }),
  privy: piece({
    bg: NIGHT, back: MUSTARD, disc: [84, 26, 20],
    under: shape('M92 54 L104 40 L114 50 L110 68 L116 80 L104 76 L98 84 L94 72z', '#c9d4d8') + black('M100 52 h3 v4 h-3z M106 54 h3 v4 h-3z'),
    sil: 'M28 108 L32 42 L20 42 L56 12 L98 38 L86 40 L90 108z',
    fill: RUST,
    over: black('M20 42 L56 12 L60 15 L28 42z') + shape('M42 108 L44 52 L76 50 L78 108z', '#6a3e1e') + black('M62 51 L76 50 L78 108 L60 108z') +
      flat('M54 60 L62 58 L66 64 L60 70 L62 64z', MUSTARD) + glare(60, 84, 6, GLOW, 6) + flat('M70 86 h4 v5 h-4z', MUSTARD) +
      line('M34 60 L40 60 M33 80 L40 80 M82 62 L88 62', '#b8733c', 1.6),
  }),
  book: piece({
    bg: SOOT, back: MUSTARD, disc: [58, 54, 42],
    under: shape('M86 18 L100 30 L102 100 L92 106z', BONE),
    sil: 'M20 26 L86 16 L94 102 L34 110 L22 98z',
    fill: BLOOD,
    over: flat('M88 30 L96 36 L88 42 L96 48 L88 54 L96 60 L88 66 L96 72 L89 78 L96 84 L90 90 L96 96 L92 104 L88 100z', BONE) +
      shape('M34 50 L56 38 L78 48 L56 62z', BONE) + shape('M50 42 L62 42 L64 58 L48 58z', MUSTARD) + black('M54 44 L58 44 L59 57 L53 57z') +
      line('M28 32 L80 24 M30 92 L84 86', MUSTARD, 2) + shape('M40 70 L72 66 L74 78 L42 82z', MUSTARD) + line('M46 76 L68 73', INK, 2) +
      shape('M30 100 L30 116 L36 110 L42 116 L42 100z', MOSS),
  }),
  sock: piece({
    bg: '#22313d', back: MUSTARD, disc: [60, 52, 40],
    under: line('M16 44 L10 34 L18 26 L12 16 M100 48 L94 38 L102 30 L96 20 M26 30 L22 22', '#86a548', 2.5),
    sil: 'M40 14 L74 10 L76 60 L100 78 L106 96 L92 108 L60 106 L40 90z',
    fill: BLOOD,
    over: shape('M38 12 L76 8 L76 24 L40 28z', BONE) + flat('M41 40 L75 37 L75 44 L41 47z M41 56 L76 53 L77 60 L41 63z', MUSTARD) +
      shape('M48 12 L52 0 L58 8 L62 -2 L66 8 L72 2 L72 10z', MUSTARD) + glare(58, 74, 7, BONE, 7) + line('M50 86 L58 84 L66 87', INK, 2) +
      shape('M84 92 L96 88 L100 98 L90 102z', '#7a8c96') + line('M86 96 L98 93 M90 90 L94 100', INK, 1.2),
  }),
  hellhound: piece({
    bg: WINE, back: MUSTARD, disc: [60, 44, 38],
    under: flat('M40 108 L36 96 L44 100 L46 88 L54 98 L60 84 L66 98 L74 88 L76 100 L84 96 L80 108z', MUSTARD),
    sil: 'M16 108 L22 80 L8 62 L6 40 L16 26 L22 40 L34 38 L40 52 L42 30 L46 10 L56 24 L64 24 L74 10 L78 30 L80 52 L86 38 L98 40 L104 26 L114 40 L112 62 L98 80 L104 108 L80 108 L76 90 L44 90 L40 108z',
    fill: '#5a2a2a',
    over: glare(22, 50, 6, MUSTARD, 7) + flat('M14 62 L18 70 L22 62 L26 70 L30 62z', BONE) + glare(60, 38, 7, MUSTARD, 8) +
      flat('M50 52 L54 62 L58 52 L62 62 L66 52 L70 62 L72 52z', BONE) + black('M56 44 L64 44 L62 50 L58 50z') +
      glare(98, 50, 6, MUSTARD, 7) + flat('M90 62 L94 70 L98 62 L102 70 L106 62z', BONE) + line('M30 80 L90 80', STEEL, 4) + flat('M40 76 L44 70 L48 76z M56 76 L60 70 L64 76z M72 76 L76 70 L80 76z', BONE),
  }),
  wardrobe: piece({
    bg: SOOT, back: '#7a8c96', disc: [60, 50, 44],
    under: shape('M4 96 L14 90 L18 96 L8 102z', BONE) + shape('M100 106 L114 96 L118 102 L104 112z', BONE) + line('M108 20 L116 12 L112 4', STEEL, 3),
    sil: 'M22 108 L16 18 L98 8 L104 106z',
    fill: RUST,
    over: line('M57 14 L62 107', INK, 2.5) + line('M34 34 L50 40 M84 30 L68 38', INK, 3) + glare(60, 46, 15, MUSTARD, 11) +
      black('M56 60 L64 60 L66 96 L60 102 L56 96z') + flat('M57 62 L60 70 L63 62z M58 94 L60 88 L63 94z', BONE) +
      flat('M48 72 h5 v8 h-5z', MUSTARD) + flat('M68 71 h5 v8 h-5z', '#8a6a1e') + line('M22 24 L26 100', '#b8733c', 1.6),
  }),
  imp: piece({
    bg: '#2a2030', back: BLOOD, disc: [60, 30, 30],
    under: black('M4 108 L10 60 L2 40 L18 46 L22 20 L34 34 L46 6 L60 26 L76 4 L84 32 L98 18 L100 44 L116 38 L110 62 L118 108z') +
      glare(40, 24, 5, BONE, 6) + glare(82, 22, 5, BONE, 6) + flat('M56 12 h3 v3 h-3z M64 12 h3 v3 h-3z M20 40 h3 v3 h-3z M98 40 h3 v3 h-3z', GLOW),
    sil: 'M38 108 L44 84 L36 68 L40 52 L28 34 L46 44 L60 40 L74 44 L92 34 L80 52 L84 68 L76 84 L82 108z',
    fill: BLOOD,
    over: glare(60, 58, 9, MUSTARD, 10) + black('M48 70 L72 70 L68 80 L52 80z') + flat('M50 70 L54 76 L58 70 L62 76 L66 70 L70 75 L71 70z', BONE) +
      flat('M28 34 L38 42 L34 46z M92 34 L82 42 L86 46z', BONE) + line('M84 100 L100 96 L104 84', INK, 3) + flat('M100 80 L108 82 L104 90z', BLOOD),
  }),
  vampire: piece({
    bg: '#1c1622', back: BLOOD, disc: [60, 40, 34],
    under: '',
    sil: 'M14 108 L28 54 L20 20 L44 44 L48 30 L54 20 L66 20 L72 30 L76 44 L100 20 L92 54 L106 108z',
    fill: '#3a2a44',
    over: flat('M48 30 L72 30 L71 44 L60 54 L49 44z', '#d8d8c8') + black('M60 30 L72 30 L71 44 L60 54z') + black('M46 32 L54 18 L66 18 L74 32 L66 26 L60 32 L54 26z') +
      glare(60, 36, 6, BLOOD, 7) + line('M54 45 L60 47 L66 45', INK, 1.6) + flat('M55 46 L56.5 51 L58 46.5z M62 46.5 L63.5 51 L65 46z', BONE) +
      flat('M44 62 L60 108 L76 62 L60 70z', BLOOD) + line('M44 62 L60 70 L76 62', INK, 2) + shape('M54 58 L60 62 L66 58 L66 66 L60 63 L54 66z', BONE) +
      line('M30 70 L24 100 M36 78 L34 100', '#5a4868', 1.6),
  }),
  fountain: piece({
    bg: NIGHT, back: BONE, disc: [60, 40, 34],
    under: line('M60 30 L44 8 L34 30 M60 30 L76 8 L86 30 M60 30 L60 4', '#6fa8b8', 3.5),
    sil: 'M8 76 L112 76 L100 106 L20 106z M52 76 L54 46 L34 42 L44 30 L76 30 L86 42 L66 46 L68 76z',
    fill: STEEL,
    over: shape('M12 76 L108 76 L104 84 L16 84z', '#6fa8b8') + line('M20 80 L36 80 M70 80 L96 80', BONE, 1.6) +
      shape('M26 78 L24 62 L28 66 L30 56 L33 66 L36 58 L38 66 L42 62 L40 78z', BONE) + glare(60, 94, 7, MUSTARD, 7) +
      flat('M14 16 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z M104 20 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2z', MUSTARD),
  }),
  marrow: piece({
    bg: '#262b1c', back: BLOOD, disc: [60, 44, 36],
    under: line('M18 70 L14 10 M8 12 L8 26 L20 26 L20 10 M100 70 L106 10 M100 12 L100 26 L112 26 L112 10 M14 26 L14 12 M106 26 L106 12', INK, 3),
    sil: 'M6 88 L14 66 L40 54 L80 54 L106 66 L114 88 L102 106 L18 106z',
    fill: '#55803c',
    over: line('M28 62 L22 100 M46 56 L42 104 M74 56 L78 104', '#3d6028', 2) + line('M92 62 L98 100', '#1f3314', 2) +
      line('M38 70 L52 75 M82 70 L68 75', INK, 3) + glare(60, 78, 11, MUSTARD, 10) + line('M46 92 L60 96 L74 92', INK, 2.5) +
      shape('M22 40 L30 32 L40 34 L44 44 L38 52 L28 52z', DUSK) + shape('M26 50 L22 68 L30 62 L34 70 L38 52z', DUSK) + flat('M30 38 h6 v8 h-6z', BONE),
  }),
  kraken: piece({
    bg: '#16242e', back: '#6fa8b8', disc: [60, 40, 36],
    under: shape('M26 100 L8 70 L6 44 L18 34 L24 46 L16 52 L22 70 L34 86z', '#a8477a') + shape('M94 100 L112 70 L114 44 L102 34 L96 46 L104 52 L98 70 L86 86z', '#7a3058') +
      flat('M8 58 L22 54 L24 62 L10 66z', MUSTARD) + flat('M98 54 L112 58 L110 66 L96 62z', MUSTARD),
    sil: 'M34 104 L30 62 L38 36 L52 18 L68 18 L82 36 L90 62 L86 104z',
    fill: '#a8477a',
    over: line('M42 46 L54 50 M78 46 L66 50', INK, 3) + glare(60, 56, 11, BONE, 12) + line('M52 74 L57 71 L62 75 L68 71', INK, 2.5) +
      flat('M-2 98 L12 92 L26 98 L40 92 L54 98 L68 92 L82 98 L96 92 L110 98 L122 94 L122 122 L-2 122z', DUSK) +
      line('M0 98 L12 92 L26 98 L40 92 L54 98 L68 92 L82 98 L96 92 L110 98 L120 94', BONE, 2) + line('M40 30 L46 24', '#c96a9a', 2),
  }),
  snail: piece({
    bg: '#262b1c', back: BONE, disc: [56, 56, 40],
    under: line('M34 44 L30 6', INK, 3) + flat('M31 6 L50 12 L32 18z', BLOOD) + line('M100 58 L94 30 M108 58 L112 30', INK, 3),
    sil: 'M6 106 L14 92 L30 90 L28 66 L40 44 L62 36 L84 46 L92 68 L90 86 L96 84 L96 56 L112 56 L114 92 L102 106z',
    fill: '#b0762a',
    over: flat('M6 106 L14 92 L30 90 L90 86 L96 84 L96 56 L112 56 L114 92 L102 106z', '#c9a37a') + black('M100 56 L112 56 L114 92 L102 106 L98 106z') +
      line('M30 90 L90 86', INK, 2.5) + line('M60 62 L52 56 L44 66 L50 80 L66 82 L78 70 L72 50 L54 44', INK, 2.5) +
      flat('M40 44 L44 34 L48 42z M60 36 L64 26 L68 38z M82 46 L90 38 L88 50z', BONE) +
      shape('M90 24 L98 24 L98 32 L90 32z', BONE) + black('M93 26 h3 v4 h-3z') + shape('M108 24 L116 24 L116 32 L108 32z', BONE) + black('M111 26 h3 v4 h-3z'),
  }),
  dm: piece({
    bg: '#1c1622', back: MUSTARD, disc: [60, 40, 34],
    sil: 'M20 108 L30 62 L38 40 L50 18 L70 18 L82 40 L90 62 L100 108z',
    fill: PLUM,
    over: black('M44 30 L52 22 L68 22 L76 30 L74 50 L60 58 L46 50z') + glare(60, 36, 7, MUSTARD, 8) + line('M54 47 L60 49 L66 46', MUSTARD, 1.6) +
      shape('M8 110 L12 70 L42 78 L78 78 L108 70 L112 110z', RUST) + black('M78 78 L108 70 L112 110 L80 110z') + line('M42 78 L40 110 M78 78 L80 110', INK, 2.5) +
      line('M18 82 L36 86 M18 92 L36 95 M48 88 L72 88 M48 97 L66 97', '#c9762a', 1.6) +
      shape('M52 66 L60 60 L68 66 L66 76 L54 76z', BONE) + line('M57 67 L60 72 L63 67', INK, 1.4),
  }),
};

/** Which drawing illustrates each card. */
export const ART_FOR: Record<string, string> = {
  'toll-troll': 'troll', 'mimic-queue': 'mimic', 'goose-wizard': 'goose', 'salty-soup': 'soup',
  'skeleton-strike': 'skeleton', 'forgetful-door': 'door', 'ghost-form': 'ghost', 'survey-bandits': 'bandit',
  'sleeping-dragon': 'dragon', 'cursed-lunch': 'sandwich', 'opinion-bridge': 'bridge', 'endless-stairs': 'tower',
  'cube-seminar': 'cube', 'tavern-brawl': 'mug', 'fairy-contract': 'fairy', 'lost-paladin': 'knight',
  'mushroom-mayor': 'mushroom', 'new-knight': 'blackknight', 'cat-avalanche': 'cat', 'lich-scheme': 'lich',
  'not-a-trap': 'sign', 'bard-off': 'lute', 'oracle-hold': 'orb', 'giant-lens': 'giant',
  'goblin-samples': 'goblin', 'blinking-statue': 'statue', 'inconvenience-portal': 'portal', 'horse-review': 'horse',
  'cheese-moon': 'moon', 'wizard-neighbours': 'hedge', 'haunted-privy': 'privy', 'barbarian-book-club': 'book',
  'x-dragon-tax': 'dragon', 'x-lich-eviction': 'lich', 'x-kings-sock': 'sock', 'x-sandwich': 'sandwich',
  'x-soup': 'soup', 'x-goblin-union': 'goblin', 'x-hellhound': 'hellhound', 'x-library-book': 'book',
  'x-giant-furniture': 'wardrobe', 'x-babysit': 'imp', 'x-password': 'door', 'x-vampire-wedding': 'vampire',
  'x-fountain': 'fountain', 'x-marrow': 'marrow', 'x-kraken': 'kraken', 'x-parade': 'snail',
  'x-showdown': 'blackknight',
};

/** Quest board thumbnails are keyed by objective id. */
export const artKeyFor = (cardId: string): string | undefined => {
  const own = PACK_ART[cardId] ?? ART_FOR[cardId];
  if (own) return own;
  // A quest's own scenes use that quest's drawing unless they name one.
  const scene = cardId.match(/^s-(.+)-\d+$/);
  return scene ? PACK_ART[`x-${scene[1]}`] ?? ART_FOR[`x-${scene[1]}`] : undefined;
};
export const artForObjective = (objectiveId: string) => ART[artKeyFor(`x-${objectiveId}`) ?? ''];
export const artForCard = (cardId: string) => ART[artKeyFor(cardId) ?? ''];
