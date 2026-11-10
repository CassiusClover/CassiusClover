/**
 * Comic-ink art kit. Every drawing is an angular silhouette in one flat colour, half of it
 * swallowed by solid black shadow, with slit eyes and a single accent colour. Authored as
 * SVG markup on a 120 x 120 canvas (heroes: 120 x 150) and rendered with SvgXml.
 */
export const INK = '#15100b';
export const BONE = '#eadfc4';
export const BLOOD = '#a8321e';
export const MUSTARD = '#c9962a';
export const MOSS = '#6d8a45';
export const STEEL = '#8d979c';
export const DUSK = '#3c5468';
export const PLUM = '#5a3b5e';
export const RUST = '#9a5a2c';

const S = `stroke="${INK}" stroke-width="2.5" stroke-linejoin="miter" stroke-miterlimit="6"`;
/** Flat angular shape with an ink outline. */
export const shape = (d: string, fill: string) => `<path d="${d}" fill="${fill}" ${S}/>`;
/** Solid black shape: props, shadows, hair. */
export const black = (d: string) => `<path d="${d}" fill="${INK}"/>`;
/** Unoutlined flat colour, for accents and rim light. */
export const flat = (d: string, fill: string) => `<path d="${d}" fill="${fill}"/>`;
export const line = (d: string, color = INK, w = 2) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="square" stroke-linejoin="miter"/>`;
/** A narrowed, glaring eye. `dir` 1 slants the left eye, -1 the right. */
export const slit = (x: number, y: number, dir: 1 | -1, fill = BONE, w = 8) =>
  `<path d="M${x - (w / 2) * dir} ${y - 1.5} L${x + (w / 2) * dir} ${y + 0.5} L${x + (w / 2 - 1) * dir} ${y + 3} L${x - (w / 2 - 1.5) * dir} ${y + 2}z" fill="${fill}" stroke="${INK}" stroke-width="1"/>` +
  `<rect x="${x - 1}" y="${y - 0.5}" width="2" height="3" fill="${INK}"/>`;
export const glare = (cx: number, y: number, gap: number, fill = BONE, w = 8) => slit(cx - gap, y, 1, fill, w) + slit(cx + gap, y, -1, fill, w);

const SHADOW = {
  R: 'M64 -4 L56 16 L68 32 L54 50 L66 68 L55 86 L65 104 L58 164 L130 164 L130 -4z',
  L: 'M56 -4 L64 16 L52 32 L66 50 L54 68 L65 86 L55 104 L62 164 L-10 164 L-10 -4z',
};

let uid = 0;

/** Backdrop: colour field, a large disc behind the figure, corner hatching and rough ground. */
export const backdrop = (bg: string, back: string, disc: [number, number, number], h = 120) =>
  `<rect x="-2" y="-2" width="124" height="${h + 4}" fill="${bg}"/>` +
  `<circle cx="${disc[0]}" cy="${disc[1]}" r="${disc[2]}" fill="${back}"/>` +
  `<path d="M-4 26 L26 -4 M-4 38 L38 -4 M-4 50 L50 -4 M82 ${h + 4} L124 ${h - 38} M94 ${h + 4} L124 ${h - 26} M106 ${h + 4} L124 ${h - 14}" stroke="${INK}" stroke-width="1.6" opacity="0.28"/>` +
  `<path d="M-2 ${h - 12} L14 ${h - 16} L30 ${h - 11} L50 ${h - 17} L72 ${h - 12} L92 ${h - 18} L122 ${h - 13} V${h + 2} H-2z" fill="${INK}"/>`;

export const border = (h = 120) => `<rect x="1.5" y="1.5" width="117" height="${h - 3}" fill="none" stroke="${INK}" stroke-width="3"/>`;

/** A silhouette in flat colour with one side swallowed by black. */
export const shaded = (sil: string, fill: string, side: 'L' | 'R' = 'R') => {
  const id = `sh${uid++}`;
  return `<defs><clipPath id="${id}"><path d="${sil}"/></clipPath></defs>` + shape(sil, fill) +
    `<g clip-path="url(#${id})"><path d="${SHADOW[side]}" fill="${INK}"/></g>`;
};

export interface Piece {
  /** Backdrop colour and the colour of the large disc behind the figure. */
  bg: string;
  back?: string;
  /** Drawn behind the silhouette (props, wings, far limbs). */
  under?: string;
  /** The figure's outline as one or more subpaths. */
  sil: string;
  fill: string;
  shadow?: 'L' | 'R';
  /** Drawn on top: eyes, teeth, accents, rim light. */
  over?: string;
  disc?: [number, number, number];
}

export const build = (p: Piece): string =>
  backdrop(p.bg, p.back ?? BONE, p.disc ?? [60, 52, 40]) + (p.under ?? '') + shaded(p.sil, p.fill, p.shadow) + (p.over ?? '') + border();
