import { eyes, INK, O, smile } from './creatures';

/**
 * Hero portraits are assembled from two layers: the ancestry draws the head and face, the
 * class draws the outfit, headgear and held item. 8 classes x 7 ancestries = 56 portraits.
 */
const o = (w: number) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const blush = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#e8806f" opacity="0.6"/>`;
const head = (skin: string) => `<ellipse cx="60" cy="60" rx="24" ry="23" fill="${skin}" ${O}/>`;

interface Ancestry { skin: string; back: string; face: string }

const ANCESTRY: Record<string, Ancestry> = {
  human: {
    skin: '#e9b98c',
    back: `<circle cx="36" cy="62" r="5" fill="#e9b98c" ${O}/><circle cx="84" cy="62" r="5" fill="#e9b98c" ${O}/>`,
    face: `<path d="M37 56 q2 -12 10 -12 M83 56 q-2 -12 -10 -12" fill="none" stroke="#6b4423" stroke-width="5" stroke-linecap="round"/>` +
      eyes(60, 60, 9, 5.5) + smile(60, 71, 7, 4),
  },
  elf: {
    skin: '#f6d9b8',
    back: `<path d="M38 60 l-24 -22 l18 32z M82 60 l24 -22 l-18 32z" fill="#f6d9b8" ${O}/>` +
      `<path d="M36 54 q-8 24 -2 42 l10 -4 q-6 -18 0 -36z M84 54 q8 24 2 42 l-10 -4 q6 -18 0 -36z" fill="#f2d675" ${O}/>`,
    face: eyes(60, 60, 9, 5.5, 0, 0) + `<path d="M47 51 l10 2 M73 51 l-10 2" ${o(2)}/>` + smile(60, 72, 5, 3),
  },
  dwarf: {
    skin: '#e3a57c',
    back: `<circle cx="36" cy="60" r="5" fill="#e3a57c" ${O}/><circle cx="84" cy="60" r="5" fill="#e3a57c" ${O}/>`,
    face: eyes(60, 57, 9, 5.5) +
      `<path d="M34 62 q-2 40 26 48 q28 -8 26 -48 q-12 12 -26 6 q-14 6 -26 -6z" fill="#d9783a" ${O}/>` +
      `<path d="M48 84 v14 M60 86 v18 M72 84 v14" stroke="#b05c26" stroke-width="2.5" stroke-linecap="round"/>` +
      `<path d="M44 70 q8 -8 16 0 q8 -8 16 0 q-8 6 -16 2 q-8 4 -16 -2z" fill="#e58a4a" ${o(2.5)}/>` +
      `<ellipse cx="60" cy="66" rx="6" ry="5" fill="#d9946a" ${o(2.5)}/>`,
  },
  halfling: {
    skin: '#f0c39a',
    back: `<circle cx="34" cy="50" r="8" fill="#7a4a22" ${O}/><circle cx="86" cy="50" r="8" fill="#7a4a22" ${O}/>` +
      `<circle cx="32" cy="64" r="7" fill="#7a4a22" ${O}/><circle cx="88" cy="64" r="7" fill="#7a4a22" ${O}/>`,
    face: eyes(60, 60, 10, 6.5) + blush(43, 70) + blush(77, 70) +
      `<path d="M52 71 q8 9 16 0z" fill="#7a2418" ${o(2.5)}/>` +
      `<circle cx="50" cy="66" r="1" fill="#b5764a"/><circle cx="70" cy="66" r="1" fill="#b5764a"/><circle cx="60" cy="68" r="1" fill="#b5764a"/>`,
  },
  goblin: {
    skin: '#9fd05a',
    back: `<path d="M38 56 l-32 -12 l24 30z M82 56 l32 -12 l-24 30z" fill="#8fbf4f" ${O}/>`,
    face: `<path d="M45 51 l11 4 M75 51 l-11 4" ${o(2.5)}/>` + eyes(60, 60, 10, 6.5) +
      `<path d="M58 66 q2 6 5 1" fill="none" ${o(2)}/>` +
      `<path d="M48 72 h24 q0 8 -12 8 q-12 0 -12 -8z" fill="#7a2418" ${o(2.5)}/><path d="M51 72 l2 5 l3 -5z M64 72 l3 5 l2 -5z" fill="#fff" ${o(1.2)}/>`,
  },
  orc: {
    skin: '#7fa35a',
    back: `<path d="M38 56 l-12 -10 l6 20z M82 56 l12 -10 l-6 20z" fill="#7fa35a" ${O}/>`,
    face: `<path d="M42 52 q9 -4 16 2 M78 52 q-9 -4 -16 2" fill="none" ${o(3.5)}/>` + eyes(60, 60, 9, 5) +
      `<ellipse cx="60" cy="67" rx="5" ry="3.5" fill="#6f9450" ${o(2)}/>` +
      `<path d="M47 76 q13 6 26 0" fill="none" ${o(2.5)}/>` +
      `<path d="M49 77 l1 -10 l5 10z M71 77 l-1 -10 l-5 10z" fill="#fff" ${o(2)}/>`,
  },
  gnome: {
    skin: '#f4c9a4',
    back: `<path d="M38 60 l-12 -6 l8 16z M82 60 l12 -6 l-8 16z" fill="#f4c9a4" ${O}/>` +
      `<path d="M34 58 q-10 6 -6 20 q8 -2 10 -10z M86 58 q10 6 6 20 q-8 -2 -10 -10z" fill="#fff" ${O}/>`,
    face: eyes(60, 57, 10, 5.5) + blush(44, 66) + blush(76, 66) +
      `<path d="M40 72 q10 -8 20 0 q10 -8 20 0 q-10 8 -20 2 q-10 6 -20 -2z" fill="#fff" ${o(2.5)}/>` +
      `<circle cx="60" cy="67" r="7" fill="#eda58c" ${o(2.5)}/>`,
  },
};

interface Klass { body: string; hat: string; item: string }

const torso = (fill: string, detail = '') =>
  `<path d="M24 122 q0 -36 36 -36 q36 0 36 36z" fill="${fill}" ${O}/>` + detail;

const CLASS: Record<string, Klass> = {
  fighter: {
    body: torso('#9aa3ad', `<path d="M24 112 q-8 -18 10 -22 q8 6 4 18z M96 112 q8 -18 -10 -22 q-8 6 -4 18z" fill="#b8c0c8" ${O}/><path d="M60 88 v30" ${o(2)} opacity="0.4"/>`),
    hat: `<path d="M35 52 q0 -34 25 -34 q25 0 25 34z" fill="#b8c0c8" ${O}/><path d="M33 52 h54" ${o(5)}/><path d="M60 20 v40" ${o(4)}/><path d="M60 22 v36" stroke="#dfe6ea" stroke-width="2"/>`,
    item: `<path d="M102 116 v-30" ${o(6)}/><path d="M102 116 v-30" stroke="#7a4a22" stroke-width="3"/><path d="M94 86 h16" ${o(5)}/><path d="M97 84 v-50 l5 -10 l5 10 v50z" fill="#dfe6ea" ${O}/>`,
  },
  wizard: {
    body: torso('#4a5fae', `<path d="M48 88 l12 14 l12 -14" fill="none" stroke="#f6d05a" stroke-width="3" stroke-linejoin="round"/>`),
    hat: `<path d="M38 46 q10 -40 34 -44 q-8 12 10 44z" fill="#4a5fae" ${O}/><path d="M26 48 q34 -12 68 0 q-34 10 -68 0z" fill="#3d4f94" ${O}/>` +
      `<path d="M58 22 l2 5 l5 1 l-4 3 l1 5 l-4 -3 l-4 3 l1 -5 l-4 -3 l5 -1z" fill="#f6d05a" ${o(1.5)}/><circle cx="70" cy="34" r="2" fill="#f6d05a"/>`,
    item: `<path d="M104 118 v-76" ${o(6)}/><path d="M104 118 v-76" stroke="#7a4a22" stroke-width="3"/><circle cx="104" cy="34" r="10" fill="#b9a6e8" ${O}/><path d="M99 30 q3 -4 7 -3" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
  },
  rogue: {
    body: torso('#3d3d48', `<path d="M40 92 l40 24" ${o(4)}/><path d="M40 92 l40 24" stroke="#8c5a2b" stroke-width="2"/>`),
    hat: `<path d="M30 70 q-6 -56 30 -56 q36 0 30 56 q-4 -30 -30 -30 q-26 0 -30 30z" fill="#4a4a58" ${O}/><path d="M37 47 q23 -9 46 0" fill="none" stroke="${INK}" stroke-width="2" opacity="0.5"/>`,
    item: `<path d="M100 116 v-14" ${o(6)}/><path d="M100 116 v-14" stroke="#7a4a22" stroke-width="3"/><path d="M93 102 h14" ${o(4)}/><path d="M96 100 l4 -28 l4 28z" fill="#dfe6ea" ${O}/>`,
  },
  bard: {
    body: torso('#c95fa0', `<path d="M44 88 q16 14 32 0" fill="#fbf4e2" ${O}/>`),
    hat: `<path d="M30 46 q4 -30 34 -28 q28 2 26 26 q-30 -10 -60 2z" fill="#5a9a6a" ${O}/><path d="M76 22 q18 -22 30 -8 q-14 0 -22 16z" fill="#f6d05a" ${O}/><path d="M80 26 q10 -10 20 -10" fill="none" ${o(1.5)}/>`,
    item: `<path d="M100 92 l10 -34" ${o(6)}/><path d="M100 92 l10 -34" stroke="#7a4a22" stroke-width="3"/><ellipse cx="96" cy="102" rx="13" ry="14" fill="#d9a441" ${O}/><circle cx="97" cy="100" r="4" fill="${INK}"/>`,
  },
  cleric: {
    body: torso('#fbf4e2', `<path d="M60 88 v30 M50 98 h20" stroke="#c7922a" stroke-width="4" stroke-linecap="round"/>`),
    hat: `<path d="M40 48 q0 -22 20 -36 q20 14 20 36z" fill="#fbf4e2" ${O}/><path d="M38 48 h44" stroke="#c7922a" stroke-width="5" stroke-linecap="round"/><path d="M60 20 v22 M53 28 h14" stroke="#c7922a" stroke-width="3.5" stroke-linecap="round"/>`,
    item: `<path d="M104 118 v-62" ${o(6)}/><path d="M104 118 v-62" stroke="#7a4a22" stroke-width="3"/>` +
      `<path d="M104 30 l4 9 l10 -3 l-6 8 l6 8 l-10 -3 l-4 9 l-4 -9 l-10 3 l6 -8 l-6 -8 l10 3z" fill="#f6d05a" ${O}/>`,
  },
  barbarian: {
    body: torso('#e3a57c', `<path d="M24 122 q2 -30 22 -34 l30 34z" fill="#a0652f" ${O}/><path d="M30 104 l4 6 M40 96 l3 7 M52 108 l3 6" ${o(2)} opacity="0.5"/>`),
    hat: `<path d="M38 44 q-22 -4 -20 -30 q12 12 26 14z M82 44 q22 -4 20 -30 q-12 12 -26 14z" fill="#fbf4e2" ${O}/><path d="M36 52 q0 -30 24 -30 q24 0 24 30z" fill="#8c5a2b" ${O}/><path d="M34 52 h52" ${o(5)}/>`,
    item: `<path d="M104 118 v-78" ${o(6)}/><path d="M104 118 v-78" stroke="#7a4a22" stroke-width="3"/><path d="M104 44 q-22 -8 -18 16 q10 -8 18 -4z M104 44 q22 -8 18 16 q-10 -8 -18 -4z" fill="#b8c0c8" ${O}/>`,
  },
  ranger: {
    body: torso('#4f7f45', `<path d="M36 90 l44 28" ${o(4)}/><path d="M36 90 l44 28" stroke="#8c5a2b" stroke-width="2"/>`),
    hat: `<path d="M32 50 q10 -34 62 -22 q-18 4 -22 16 q-20 -4 -40 6z" fill="#5d9450" ${O}/><path d="M50 26 q-4 -20 -22 -22 q6 14 10 26z" fill="#d9503c" ${O}/>`,
    item: `<path d="M98 30 q26 44 0 88" fill="none" ${o(6)}/><path d="M98 30 q26 44 0 88" fill="none" stroke="#8c5a2b" stroke-width="3"/><path d="M98 30 v88" ${o(1.5)}/>`,
  },
  paladin: {
    body: torso('#e0c060', `<path d="M24 112 q-8 -18 10 -22 q8 6 4 18z" fill="#f0d98a" ${O}/>`),
    hat: `<path d="M36 44 q-24 -10 -22 -32 q8 8 14 8 q-2 6 6 8 q-2 6 6 8z M84 44 q24 -10 22 -32 q-8 8 -14 8 q2 6 -6 8 q2 6 -6 8z" fill="#fbf4e2" ${O}/>` +
      `<path d="M35 52 q0 -34 25 -34 q25 0 25 34z" fill="#dfe6ea" ${O}/><path d="M33 52 h54" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M34 52 h52" stroke="#f6d05a" stroke-width="3" stroke-linecap="round"/>`,
    item: `<path d="M82 84 h34 v16 q0 16 -17 22 q-17 -6 -17 -22z" fill="#3f7fbf" ${O}/><path d="M99 90 v24 M90 99 h18" stroke="#f6d05a" stroke-width="4" stroke-linecap="round"/>`,
  },
};

export const CLASS_IDS = Object.keys(CLASS);
export const ANCESTRY_IDS = Object.keys(ANCESTRY);

export const heroSvg = (classId: string, ancestryId: string): string => {
  const c = CLASS[classId] ?? CLASS.fighter;
  const a = ANCESTRY[ancestryId] ?? ANCESTRY.human;
  return c.body + a.back + head(a.skin) + a.face + c.hat + c.item;
};
