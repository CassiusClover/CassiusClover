import { BLOOD, BONE, INK, MOSS, MUSTARD, PLUM, RUST, STEEL, black, build, figure, flat, line, shaded, shape, slit, type InkFigure, type Piece } from './ink';

const piece = (p: Piece): InkFigure => { const actor = figure(p); return { bg: p.bg, svg: build(p, actor), figure: actor }; };

/** Readable animal silhouettes; flat ink, a few curves, and no ornamental detail. */
export const STORY_ACTORS: Record<string, InkFigure> = {
  snail: piece({
    bg: '#262b1c', back: MOSS,
    under: line('M92 82 L88 51 M103 82 L108 49', INK, 3) + shape('M84 49 L89 45 L94 49 L92 56 L85 56z', BONE) + shape('M103 48 L109 44 L114 48 L112 55 L105 55z', BONE),
    sil: 'M7 104 L22 94 L66 91 L79 85 L82 68 Q93 63 107 69 L111 89 Q114 103 99 108 L25 110z', fill: '#c9a37a',
    over: shaded('M19 96 L15 77 Q12 48 35 34 Q61 23 77 46 Q93 64 78 93 L64 100z', RUST) +
      line('M67 84 Q79 62 62 48 Q44 36 30 52 Q19 69 33 82 Q48 95 60 80 Q69 67 56 59 Q43 52 38 64 Q35 73 45 76 L50 71', INK, 3.5) +
      flat('M87 49 h3 v5 h-3z M107 48 h3 v5 h-3z', INK) + line('M96 92 L103 90', BONE, 1.8) + line('M16 105 L66 104', '#eadfc4', 1.5),
  }),
  duck: piece({
    bg: '#262b1c', back: MUSTARD,
    under: line('M55 99 L51 109 L40 111 M76 98 L80 108 L92 110', MUSTARD, 3),
    sil: 'M12 65 L29 71 Q34 59 58 60 L77 66 L83 47 Q77 39 82 30 Q88 19 103 26 Q113 32 109 45 L100 54 L99 75 Q100 98 74 103 L43 102 Q21 97 12 65z', fill: MOSS,
    over: shape('M104 37 L119 39 L117 48 L103 47z', MUSTARD) + slit(99, 33, -1, BONE, 6) + line('M38 76 Q56 66 70 78 L57 91 L39 88', INK, 2.5) + flat('M80 51 L100 52 L99 60 L79 59z', BONE),
  }),
  'court-goose': piece({
    bg: '#22313d', back: MUSTARD,
    under: line('M49 99 L47 109 L35 112 M72 99 L77 109 L90 111', MUSTARD, 3),
    sil: 'M13 72 L31 74 Q42 60 66 69 L76 65 L79 37 Q72 30 79 22 Q88 14 99 22 L106 31 L102 43 L94 47 L95 74 Q100 98 73 105 L44 103 Q24 100 13 72z', fill: BONE,
    over: shape('M99 31 L119 34 L115 42 L99 41z', MUSTARD) + slit(92, 28, -1, BLOOD, 7) + line('M38 78 L56 73 L69 82 L59 94 L40 91', INK, 2.5),
  }),
  sock: piece({
    bg: '#33241a', back: MUSTARD,
    sil: 'M43 15 L79 15 L74 70 L100 84 Q113 94 100 105 L86 111 L33 105 Q20 99 27 87 L40 65z', fill: BLOOD,
    over: shape('M42 15 L81 15 L79 30 L41 30z', BONE) + black('M63 15 L81 15 L79 30 L62 30z') + line('M47 36 L59 36 M46 43 L58 43', MUSTARD, 3) + slit(52, 52, 1, BONE, 7) + slit(65, 52, -1, BONE, 7) + line('M49 66 L62 68', INK, 2) + flat('M34 88 L43 92 L39 100 L31 96z', BONE),
  }),
  soup: piece({
    bg: '#33241a', back: RUST,
    under: line('M40 25 L35 17 L41 9 M62 22 L57 13 L63 4 M82 25 L77 16 L83 8', BONE, 2),
    sil: 'M18 57 L102 57 L95 93 Q90 105 77 108 L42 108 Q28 106 24 94z', fill: STEEL,
    over: shape('M19 57 Q34 44 60 47 Q88 43 102 57 L98 65 Q61 72 23 65z', '#c9762a') + black('M61 47 Q87 43 102 57 L98 65 L60 69z') + slit(49, 55, 1, BONE, 8) + slit(72, 55, -1, BONE, 8) + line('M53 63 L60 60 L67 63', INK, 2) + line('M7 69 L19 73 M102 73 L114 69', INK, 4) + line('M32 77 L37 96', BONE, 2),
  }),
  kraken: piece({
    bg: '#16242e', back: STEEL,
    under: shape('M40 91 Q17 93 12 71 L9 42 Q9 30 22 31 L30 43 L23 47 L25 66 L47 74z', PLUM) + shape('M80 91 Q103 93 108 71 L111 42 Q111 30 98 31 L90 43 L97 47 L95 66 L73 74z', PLUM) + shape('M9 56 L27 53 L29 64 L11 67z M93 53 L111 56 L109 67 L91 64z', MUSTARD),
    sil: 'M31 95 L30 61 Q29 34 47 20 Q60 8 76 20 Q93 34 91 61 L87 95 L77 106 L64 96 L51 106z', fill: '#a8477a',
    over: slit(48, 49, -1, BONE, 9) + slit(73, 49, 1, BONE, 9) + line('M51 65 L58 61 L66 65', INK, 2) + line('M2 102 L16 96 L30 102 L44 96 L58 102 L72 96 L86 102 L100 96 L118 102', BONE, 2.5),
  }),
  wardrobe: piece({
    bg: '#33241a', back: STEEL,
    sil: 'M22 108 L18 18 L100 10 L105 108z', fill: RUST,
    over: shape('M27 26 L59 23 L60 99 L30 101z', '#b8733c') + black('M64 22 L93 19 L97 98 L65 99z') + line('M42 27 L44 95', '#9a5a2c', 1.8) + shape('M50 56 L56 56 L56 65 L50 65z M68 55 L74 55 L74 64 L68 64z', MUSTARD),
  }),
  marrow: piece({
    bg: '#262b1c', back: BLOOD,
    under: line('M18 70 L14 10 M8 12 L8 26 L20 26 L20 10 M100 70 L106 10 M100 12 L100 26 L112 26 L112 10', INK, 3),
    sil: 'M10 89 Q10 65 36 58 L78 56 Q107 62 111 84 Q113 104 87 109 L34 108 Q12 105 10 89z', fill: MOSS,
    over: line('M28 74 Q24 88 32 101 M43 66 Q35 87 45 104 M56 64 Q50 88 57 105', '#8fa860', 2) + shape('M25 57 L33 48 L44 51 L46 62 L38 70 L27 67z', STEEL) + shape('M30 67 L26 82 L34 77 L41 84 L40 68z', STEEL),
  }),
};
