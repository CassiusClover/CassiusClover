/**
 * Cartoon card art, authored as SVG markup on a 120 x 120 canvas and rendered with SvgXml.
 * Everything shares one look: thick ink outlines, flat colour, large round eyes.
 */
export const INK = '#2b1a0d';
export const O = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const o = (w: number) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

/** One eye: white ball, ink pupil, a glint. `lx`/`ly` shift the gaze. */
export const eye = (x: number, y: number, r = 7, lx = 0, ly = 0) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${o(2.5)}/>` +
  `<circle cx="${x + lx}" cy="${y + ly}" r="${r * 0.45}" fill="${INK}"/>` +
  `<circle cx="${x + lx - r * 0.15}" cy="${y + ly - r * 0.2}" r="${r * 0.15}" fill="#fff"/>`;
export const eyes = (cx: number, y: number, gap = 12, r = 7, lx = 0, ly = 0) =>
  eye(cx - gap, y, r, lx, ly) + eye(cx + gap, y, r, lx, ly);
/** Closed, contented eyes. */
const shut = (cx: number, y: number, gap = 12, w = 6) =>
  `<path d="M${cx - gap - w} ${y} q${w} ${w} ${w * 2} 0 M${cx + gap - w} ${y} q${w} ${w} ${w * 2} 0" fill="none" ${o(2.5)}/>`;
export const smile = (cx: number, y: number, w = 10, d = 6) =>
  `<path d="M${cx - w} ${y} q${w} ${d * 2} ${w * 2} 0" fill="none" ${o(2.5)}/>`;
const frown = (cx: number, y: number, w = 10, d = 5) =>
  `<path d="M${cx - w} ${y} q${w} ${-d * 2} ${w * 2} 0" fill="none" ${o(2.5)}/>`;
const grin = (cx: number, y: number, w = 12, h = 9) =>
  `<path d="M${cx - w} ${y} h${w * 2} q0 ${h} ${-w} ${h} q${-w} 0 ${-w} ${-h}z" fill="#7a2418" ${o(2.5)}/>` +
  `<path d="M${cx - w + 3} ${y} v4 h5 v-4 M${cx + w - 8} ${y} v4 h5 v-4" fill="#fff" ${o(1.5)}/>`;
const brow = (x1: number, y1: number, x2: number, y2: number) => `<path d="M${x1} ${y1} L${x2} ${y2}" ${o(3)}/>`;
const blush = (x: number, y: number) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#e8806f" opacity="0.6"/>`;
const sparkle = (x: number, y: number, s = 5, fill = '#f6d05a') =>
  `<path d="M${x} ${y - s} l${s * 0.3} ${s * 0.7} l${s * 0.7} ${s * 0.3} l${-s * 0.7} ${s * 0.3} l${-s * 0.3} ${s * 0.7} l${-s * 0.3} ${-s * 0.7} l${-s * 0.7} ${-s * 0.3} l${s * 0.7} ${-s * 0.3}z" fill="${fill}" ${o(1.5)}/>`;
const zzz = (x: number, y: number) =>
  `<path d="M${x} ${y} h8 l-8 9 h8 M${x + 12} ${y - 12} h6 l-6 7 h6" fill="none" ${o(2)}/>`;
const ground = `<ellipse cx="60" cy="108" rx="40" ry="6" fill="${INK}" opacity="0.18"/>`;

const knight = (armour: string, plume: string, nervous: boolean) =>
  ground +
  `<path d="M34 108 q0 -34 26 -34 q26 0 26 34z" fill="${armour}" ${O}/>` +
  `<path d="M60 22 q-10 -16 -24 -8 q10 4 14 16z" fill="${plume}" ${O}/>` +
  `<path d="M36 50 q0 -28 24 -28 q24 0 24 28 v18 q-24 12 -48 0z" fill="${armour}" ${O}/>` +
  `<path d="M40 48 h40 v10 h-40z" fill="${INK}" ${O}/>` +
  eyes(60, 53, 9, 4, nervous ? 1 : 0) +
  `<path d="M60 58 v16 M50 66 v6 M70 66 v6" ${o(2)}/>` +
  (nervous ? `<path d="M90 34 q4 6 0 9 q-4 -3 0 -9z" fill="#9cc4e0" ${o(1.5)}/>` : '') +
  `<path d="M96 104 v-44" ${o(4)}/><path d="M96 30 l6 30 h-12z" fill="#dfe6ea" ${O}/><path d="M88 62 h16" ${o(4)}/>`;

export const ART: Record<string, { bg: string; svg: string }> = {
  troll: {
    bg: '#cfe0b4',
    svg: ground +
      `<path d="M22 56 l-12 -10 l8 20z M98 56 l12 -10 l-8 20z" fill="#7fa35a" ${O}/>` +
      `<path d="M22 70 q0 -42 38 -42 q38 0 38 42 q0 38 -38 38 q-38 0 -38 -38z" fill="#8fb565" ${O}/>` +
      `<path d="M46 30 q4 -12 10 -2 q4 -12 10 0 q6 -10 8 4" fill="#5d7d3f" ${O}/>` +
      brow(38, 50, 52, 54) + brow(82, 50, 68, 54) + eyes(60, 62, 14, 8) +
      `<ellipse cx="60" cy="76" rx="8" ry="6" fill="#6f9450" ${O}/>` +
      `<path d="M40 90 q20 10 40 0" fill="none" ${O}/>` +
      `<path d="M44 91 l3 -10 l4 11z M76 91 l-3 -10 l-4 11z" fill="#fff" ${o(2)}/>`,
  },
  mimic: {
    bg: '#e8d2a6',
    svg: ground +
      `<path d="M22 66 h76 v36 q0 4 -4 4 h-68 q-4 0 -4 -4z" fill="#9a6331" ${O}/>` +
      `<path d="M22 66 q0 -40 38 -40 q38 0 38 40z" fill="#b57a3f" ${O} transform="rotate(-8 60 66)"/>` +
      `<path d="M26 66 l6 9 l6 -9 l6 9 l6 -9 l6 9 l6 -9 l6 9 l6 -9 l6 9 l6 -9 l6 9 l4 -9" fill="#fff" ${o(2)}/>` +
      `<path d="M52 74 q8 26 20 20 q8 -6 -2 -20z" fill="#e0607a" ${O}/>` +
      `<g transform="rotate(-8 60 66)">${eyes(60, 44, 13, 8, 2, 1)}</g>` +
      `<rect x="54" y="84" width="12" height="12" rx="2" fill="#f6d05a" ${O}/>`,
  },
  goose: {
    bg: '#d6e4ef',
    svg: ground +
      `<path d="M30 108 q-6 -34 30 -36 q36 2 30 36z" fill="#5a4a8a" ${O}/>` +
      `<path d="M52 76 q-6 -30 0 -40 q8 -12 18 0 q6 10 0 40z" fill="#fff" ${O}/>` +
      `<path d="M70 48 l22 6 l-22 6z" fill="#f29a3a" ${O}/>` +
      eye(62, 44, 6, 1) + brow(54, 34, 68, 38) +
      `<path d="M40 34 l22 -30 l14 30z" fill="#5a4a8a" ${O}/>` +
      `<path d="M34 34 h48" ${o(5)}/>` + sparkle(58, 22, 5) +
      eye(44, 90, 4) + eye(76, 92, 4) + `<path d="M48 94 l8 2 l-8 3z M80 96 l8 2 l-8 3z" fill="#f29a3a" ${o(1.5)}/>`,
  },
  soup: {
    bg: '#f3d9b0',
    svg: ground +
      `<path d="M44 26 q-8 -8 0 -16 M60 24 q-8 -8 0 -16 M76 26 q-8 -8 0 -16" fill="none" ${o(2.5)} opacity="0.5"/>` +
      `<path d="M20 52 h80 q0 52 -40 52 q-40 0 -40 -52z" fill="#4c4f58" ${O}/>` +
      `<ellipse cx="60" cy="52" rx="40" ry="12" fill="#e58a3c" ${O}/>` +
      `<circle cx="42" cy="50" r="3" fill="#c8532f"/><circle cx="80" cy="54" r="3" fill="#6f9450"/>` +
      eyes(60, 50, 10, 6, 0, -1) + frown(60, 62, 6, 2) +
      `<path d="M14 62 q-8 0 -6 10 M106 62 q8 0 6 10" fill="none" ${O}/>` +
      `<path d="M40 104 v6 M80 104 v6" ${o(4)}/>`,
  },
  skeleton: {
    bg: '#dcd6e6',
    svg: ground +
      `<path d="M92 108 v-70" ${o(4)}/><rect x="74" y="12" width="38" height="28" rx="3" fill="#fbf4e2" ${O}/>` +
      `<path d="M80 22 h26 M80 30 h18" ${o(2.5)}/>` +
      `<path d="M38 108 v-26 h28 v26 M44 88 h16 M44 96 h16" fill="none" ${O}/>` +
      `<path d="M26 54 q0 -30 26 -30 q26 0 26 30 q0 14 -10 18 v10 h-32 v-10 q-10 -4 -10 -18z" fill="#fbf4e2" ${O}/>` +
      `<circle cx="42" cy="54" r="8" fill="${INK}"/><circle cx="62" cy="54" r="8" fill="${INK}"/>` +
      `<circle cx="43" cy="54" r="2.5" fill="#fff"/><circle cx="63" cy="54" r="2.5" fill="#fff"/>` +
      `<path d="M52 64 l-3 6 h6z" fill="${INK}"/><path d="M40 76 h24 M46 72 v10 M52 72 v10 M58 72 v10" ${o(2)}/>`,
  },
  door: {
    bg: '#d9c7a3',
    svg: ground +
      `<path d="M24 108 v-66 q0 -30 36 -30 q36 0 36 30 v66z" fill="#7b7f88" ${O}/>` +
      `<path d="M32 108 v-64 q0 -24 28 -24 q28 0 28 24 v64z" fill="#a0652f" ${O}/>` +
      `<path d="M46 22 v86 M74 22 v86" ${o(2)} opacity="0.35"/>` +
      brow(40, 46, 52, 42) + brow(80, 46, 68, 42) + eyes(60, 56, 12, 7, 0, -2) +
      `<ellipse cx="60" cy="80" rx="7" ry="5" fill="${INK}"/>` +
      `<circle cx="82" cy="72" r="4" fill="#f6d05a" ${o(2)}/>` +
      `<path d="M96 22 q6 -8 12 0 q0 6 -6 8 v6" fill="none" ${o(3)}/><circle cx="102" cy="44" r="1.8" fill="${INK}"/>`,
  },
  ghost: {
    bg: '#cfd9e6',
    svg: `<ellipse cx="60" cy="110" rx="30" ry="4" fill="${INK}" opacity="0.12"/>` +
      `<path d="M28 100 v-46 q0 -34 32 -34 q32 0 32 34 v46 l-11 -9 l-10 9 l-11 -9 l-11 9 l-10 -9z" fill="#fbfbff" ${O}/>` +
      eyes(60, 52, 11, 7, 0, 1) + `<ellipse cx="60" cy="70" rx="5" ry="7" fill="${INK}"/>` + blush(40, 62) + blush(80, 62) +
      `<rect x="84" y="62" width="26" height="32" rx="2" fill="#fbf4e2" ${O} transform="rotate(10 97 78)"/>` +
      `<path d="M90 72 h14 M90 79 h14 M90 86 h8" ${o(2)} transform="rotate(10 97 78)"/>`,
  },
  bandit: {
    bg: '#d5dfc6',
    svg: ground +
      `<path d="M30 108 q0 -30 30 -30 q30 0 30 30z" fill="#4e5a3a" ${O}/>` +
      `<circle cx="60" cy="52" r="26" fill="#e9b98c" ${O}/>` +
      `<path d="M34 46 q26 -12 52 0 v12 q-26 10 -52 0z" fill="${INK}" ${O}/>` + eyes(60, 52, 11, 5.5) +
      `<path d="M34 40 q26 -34 52 0 q-26 -10 -52 0z" fill="#8c3b2a" ${O}/>` + smile(60, 66, 9, 5) +
      `<rect x="78" y="74" width="28" height="34" rx="3" fill="#b57a3f" ${O}/><rect x="82" y="80" width="20" height="24" fill="#fbf4e2" ${o(2)}/>` +
      `<path d="M85 87 l2 2 l4 -4 M85 96 l2 2 l4 -4 M94 88 h5 M94 97 h5" fill="none" ${o(1.8)}/>`,
  },
  dragon: {
    bg: '#f0c9a8',
    svg: ground +
      `<path d="M84 60 l22 -26 l-4 34z" fill="#c8532f" ${O}/>` +
      `<path d="M14 98 q-6 -30 30 -32 q14 -30 44 -22 q22 8 16 34 q-4 22 -30 28 h-50 q-10 0 -10 -8z" fill="#d9643a" ${O}/>` +
      `<path d="M60 44 l4 -14 l8 12 M78 46 l6 -12 l6 14" fill="#f6d05a" ${O}/>` +
      `<path d="M30 78 q20 -8 36 4 q-16 12 -36 6z" fill="#f3c98a" ${O}/>` +
      shut(72, 62, 12, 6) + `<circle cx="24" cy="80" r="2" fill="${INK}"/><circle cx="32" cy="76" r="2" fill="${INK}"/>` +
      `<path d="M14 70 q-8 -6 -2 -14 q6 2 4 10" fill="#cfd3d6" ${o(2)} opacity="0.8"/>` + zzz(92, 30) +
      `<circle cx="40" cy="104" r="6" fill="#f6d05a" ${o(2)}/><circle cx="52" cy="106" r="5" fill="#f6d05a" ${o(2)}/>`,
  },
  sandwich: {
    bg: '#e3e9c4',
    svg: ground +
      `<path d="M18 86 h84 q4 0 4 4 v8 q0 6 -6 6 h-80 q-6 0 -6 -6 v-8 q0 -4 4 -4z" fill="#e2b06a" ${O}/>` +
      `<path d="M16 86 q6 -8 12 0 q6 -8 12 0 q6 -8 12 0 q6 -8 12 0 q6 -8 12 0 q6 -8 12 0 q6 -8 12 0z" fill="#7fb04f" ${O}/>` +
      `<path d="M20 78 h80 v6 h-80z" fill="#d9503c" ${O}/><path d="M18 72 l14 8 l10 -8 l12 8 l12 -8 l12 8 l12 -8 l12 6 v-4 h-84z" fill="#f6d05a" ${O}/>` +
      `<path d="M16 72 q0 -40 44 -40 q44 0 44 40z" fill="#e8bb78" ${O}/>` +
      eyes(60, 56, 12, 7, 2, 0) + smile(60, 64, 6, 3) +
      `<circle cx="40" cy="42" r="1.6" fill="#fbf4e2"/><circle cx="76" cy="40" r="1.6" fill="#fbf4e2"/><circle cx="58" cy="38" r="1.6" fill="#fbf4e2"/>` +
      `<path d="M98 30 q8 -4 6 -12 M106 36 q8 0 10 -8" fill="none" ${o(2)} opacity="0.6"/>`,
  },
  bridge: {
    bg: '#cfe3e6',
    svg: `<path d="M0 112 q60 -16 120 0 v8 h-120z" fill="#7fb7c9"/>` +
      `<path d="M6 44 q54 30 108 0 M6 70 q54 30 108 0" fill="none" ${O}/>` +
      `<path d="M10 40 v36 M110 40 v36" ${o(5)}/>` +
      [0, 1, 2, 3].map((i) => {
        const x = 20 + i * 21;
        const y = 62 + (i === 1 || i === 2 ? 9 : 3);
        return `<rect x="${x}" y="${y}" width="18" height="24" rx="3" fill="${i % 2 ? '#b57a3f' : '#a0652f'}" ${O}/>` +
          eyes(x + 9, y + 9, 4, 3) + (i % 2 ? `<ellipse cx="${x + 9}" cy="${y + 18}" rx="4" ry="3" fill="${INK}"/>` : `<path d="M${x + 4} ${y + 17} h10" ${o(2)}/>`);
      }).join('') +
      `<path d="M30 40 q-4 -10 6 -12 h14 q8 2 4 12 l-6 0 l-4 6 l-2 -6z" fill="#fff" ${o(2)}/><path d="M36 34 h12" ${o(2)}/>` +
      `<path d="M72 44 q-4 -10 6 -12 h14 q8 2 4 12 h-12 l-2 6 l-4 -6z" fill="#fff" ${o(2)}/><path d="M78 38 h12" ${o(2)}/>`,
  },
  tower: {
    bg: '#d5d9ea',
    svg: ground +
      `<path d="M38 108 v-70 h44 v70z" fill="#a9adb8" ${O}/>` +
      `<path d="M32 38 v-12 h10 v6 h8 v-6 h10 v6 h8 v-6 h10 v6 h10 v12z" fill="#bfc3cc" ${O}/>` +
      `<path d="M60 8 v18" ${o(3)}/><path d="M60 8 l16 6 l-16 6z" fill="#d9503c" ${o(2)}/>` +
      eyes(60, 56, 9, 6, 0, 2) + smile(60, 68, 6, 3) +
      `<path d="M50 108 v-18 q10 -10 20 0 v18z" fill="#7a4a22" ${O}/>` +
      `<path d="M84 108 l6 0 l0 -8 l6 0 l0 -8 l6 0 l0 -8 l6 0" fill="none" ${O}/>` +
      `<path d="M14 100 h12 M14 100 l4 -4 M14 100 l4 4" ${o(2)} opacity="0.5"/>`,
  },
  cube: {
    bg: '#cdeadf',
    svg: ground +
      `<path d="M22 44 l16 -16 h60 v60 l-16 16 h-60z" fill="#7fd1b0" opacity="0.9" ${O}/>` +
      `<path d="M22 44 h60 v60 M82 44 l16 -16" fill="none" ${O}/>` +
      `<path d="M34 88 l8 -6 l2 8z" fill="#fbf4e2" ${o(2)}/><circle cx="66" cy="92" r="5" fill="#fbf4e2" ${o(2)}/><path d="M30 60 l10 4" ${o(3)}/>` +
      eyes(52, 66, 11, 7) + smile(52, 78, 8, 4) +
      `<rect x="88" y="8" width="26" height="18" rx="2" fill="#fff" ${o(2)}/><path d="M92 20 l5 -6 l4 4 l6 -8" fill="none" ${o(2)}/>`,
  },
  mug: {
    bg: '#f0d7a8',
    svg: ground +
      `<path d="M84 56 q22 0 22 18 q0 18 -22 18" fill="none" ${o(7)}/><path d="M84 56 q22 0 22 18 q0 18 -22 18" fill="none" stroke="#c7922a" stroke-width="3"/>` +
      `<path d="M28 44 h58 v54 q0 8 -8 8 h-42 q-8 0 -8 -8z" fill="#d9a441" ${O}/>` +
      `<path d="M24 46 q-4 -12 8 -12 q2 -12 14 -8 q8 -10 18 0 q12 -6 14 8 q12 0 8 12 q-4 8 -12 4 q-4 10 -12 2 q-8 8 -14 0 q-8 6 -12 -2 q-10 4 -12 -4z" fill="#fff" ${O}/>` +
      `<path d="M42 56 v42 M72 56 v42" ${o(2)} opacity="0.3"/>` +
      brow(40, 62, 52, 66) + brow(76, 62, 64, 66) + eyes(58, 72, 10, 6) + grin(58, 84, 10, 7) +
      sparkle(104, 34, 5, '#fff') + `<path d="M10 70 l8 4 M10 84 l8 -2" ${o(2.5)}/>`,
  },
  fairy: {
    bg: '#ead4ee',
    svg: `<ellipse cx="60" cy="112" rx="22" ry="4" fill="${INK}" opacity="0.12"/>` +
      `<path d="M52 60 q-36 -30 -38 -4 q0 18 38 14z M68 60 q36 -30 38 -4 q0 18 -38 14z" fill="#d9f0f7" ${O}/>` +
      `<path d="M52 72 q-26 4 -22 20 q14 6 22 -12z M68 72 q26 4 22 20 q-14 6 -22 -12z" fill="#c4e6f0" ${O}/>` +
      `<path d="M46 98 q14 -40 28 0z" fill="#c95fa0" ${O}/>` +
      `<circle cx="60" cy="48" r="18" fill="#f4c9a4" ${O}/>` +
      `<path d="M42 44 q4 -22 20 -16 q16 -4 16 16 q-8 -10 -18 -8 q-10 -2 -18 8z" fill="#f6d05a" ${O}/>` +
      eyes(60, 50, 8, 5, 1) + smile(60, 58, 5, 3) + blush(48, 56) + blush(72, 56) +
      `<path d="M84 86 l14 -22" ${o(2.5)}/>` + sparkle(100, 60, 7) +
      `<rect x="14" y="84" width="16" height="26" rx="2" fill="#fbf4e2" ${o(2)}/><path d="M18 90 h8 M18 95 h8 M18 100 h8 M18 105 h5" ${o(1.5)}/>`,
  },
  knight: { bg: '#dfe6ee', svg: knight('#cfd6dc', '#3f7fbf', false) },
  blackknight: { bg: '#d9cfd6', svg: knight('#4a4652', '#a3321f', true) },
  mushroom: {
    bg: '#d9e8c8',
    svg: ground +
      `<path d="M44 108 q-4 -30 4 -44 h24 q8 14 4 44z" fill="#fbf4e2" ${O}/>` +
      `<path d="M12 66 q4 -46 48 -46 q44 0 48 46 q-48 14 -96 0z" fill="#d9503c" ${O}/>` +
      `<circle cx="36" cy="46" r="7" fill="#fff" ${o(2)}/><circle cx="62" cy="34" r="6" fill="#fff" ${o(2)}/><circle cx="86" cy="50" r="7" fill="#fff" ${o(2)}/>` +
      eyes(60, 80, 8, 5.5) + smile(60, 90, 6, 4) + blush(46, 88) + blush(74, 88) +
      `<path d="M48 22 l4 -10 l6 6 l6 -8 l6 8 l6 -6 l2 10z" fill="#f6d05a" ${o(2)}/>` +
      `<path d="M16 108 q-2 -12 6 -14 q8 2 6 14z M94 108 q-2 -10 5 -12 q7 2 5 12z" fill="#fbf4e2" ${o(2)}/><path d="M12 96 q10 -10 20 0z M90 97 q9 -9 18 0z" fill="#e58a3c" ${o(2)}/>`,
  },
  cat: {
    bg: '#f1dcc0',
    svg: ground +
      `<path d="M92 98 q20 -4 12 -30" fill="none" ${o(8)}/><path d="M92 98 q20 -4 12 -30" fill="none" stroke="#e58a3c" stroke-width="4" stroke-linecap="round"/>` +
      `<path d="M30 108 q-4 -32 30 -32 q34 0 30 32z" fill="#e58a3c" ${O}/>` +
      `<path d="M30 40 l-2 -24 l20 12z M90 40 l2 -24 l-20 12z" fill="#e58a3c" ${O}/>` +
      `<ellipse cx="60" cy="54" rx="32" ry="28" fill="#f29a4a" ${O}/>` +
      `<path d="M52 30 l4 10 M60 28 v11 M68 30 l-4 10" ${o(2.5)}/>` +
      eyes(60, 52, 13, 8) + `<path d="M56 64 h8 l-4 5z" fill="#e0607a" ${o(2)}/><path d="M60 69 q-6 8 -12 2 M60 69 q6 8 12 2" fill="none" ${o(2)}/>` +
      `<path d="M30 62 l-14 -3 M30 68 l-14 3 M90 62 l14 -3 M90 68 l14 3" ${o(1.8)}/>` +
      `<path d="M44 108 v-10 M76 108 v-10" ${o(2.5)}/>`,
  },
  lich: {
    bg: '#d6d0e4',
    svg: ground +
      `<path d="M24 108 q0 -36 36 -36 q36 0 36 36z" fill="#4b3a6b" ${O}/>` +
      `<path d="M38 60 q0 -28 22 -28 q22 0 22 28 q0 10 -8 14 v8 h-28 v-8 q-8 -4 -8 -14z" fill="#e8ecd8" ${O}/>` +
      `<circle cx="51" cy="58" r="7" fill="${INK}"/><circle cx="69" cy="58" r="7" fill="${INK}"/>` +
      `<circle cx="51" cy="58" r="3" fill="#6ee06a"/><circle cx="69" cy="58" r="3" fill="#6ee06a"/>` +
      `<path d="M48 76 h24 M54 72 v8 M60 72 v8 M66 72 v8" ${o(2)}/>` +
      `<path d="M36 36 l6 -18 l8 12 l10 -18 l10 18 l8 -12 l6 18z" fill="#f6d05a" ${O}/><circle cx="60" cy="30" r="3" fill="#d9503c" ${o(1.5)}/>` +
      `<path d="M92 104 l12 -26 l12 26z" fill="#f6d05a" ${O}/><path d="M97 94 h14 M100 86 h8" ${o(2)}/>`,
  },
  sign: {
    bg: '#e4d6b4',
    svg: ground +
      `<path d="M56 108 v-44 h8 v44z" fill="#7a4a22" ${O}/>` +
      `<rect x="14" y="20" width="92" height="48" rx="4" fill="#d9a441" ${O} transform="rotate(-4 60 44)"/>` +
      `<g transform="rotate(-4 60 44)"><path d="M24 32 h72 M24 42 h50" ${o(4)}/>${eyes(82, 54, 7, 5, -2, 1)}<path d="M24 56 h40" ${o(2)} opacity="0.5"/></g>` +
      `<path d="M10 104 l8 -14 l8 14z M94 104 l8 -14 l8 14z" fill="#cfd6dc" ${o(2)}/>` +
      `<path d="M30 108 q4 -8 8 0 M80 108 q4 -8 8 0" fill="none" ${o(2)}/>`,
  },
  lute: {
    bg: '#e9d3b8',
    svg: ground +
      `<path d="M66 50 l30 -34" ${o(9)}/><path d="M66 50 l30 -34" stroke="#7a4a22" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M92 8 l12 8 l-6 8 l-12 -8z" fill="#7a4a22" ${O}/>` +
      `<ellipse cx="50" cy="72" rx="32" ry="30" fill="#d9a441" ${O} transform="rotate(-40 50 72)"/>` +
      `<circle cx="56" cy="64" r="9" fill="${INK}"/>` +
      `<path d="M40 86 l52 -66 M44 90 l52 -66" ${o(1.2)}/>` +
      eyes(42, 78, 8, 5.5, 1, -1) + `<ellipse cx="44" cy="92" rx="5" ry="6" fill="${INK}"/>` +
      `<path d="M14 30 v-14 l12 -3 v14" fill="none" ${o(2.5)}/><ellipse cx="11" cy="31" rx="4" ry="3" fill="${INK}"/><ellipse cx="23" cy="28" rx="4" ry="3" fill="${INK}"/>` +
      `<path d="M100 60 v-12" ${o(2.5)}/><ellipse cx="97" cy="61" rx="4" ry="3" fill="${INK}"/>`,
  },
  orb: {
    bg: '#d3d6ee',
    svg: ground +
      `<path d="M36 108 q0 -16 24 -16 q24 0 24 16z" fill="#7a4a22" ${O}/>` +
      `<circle cx="60" cy="58" r="36" fill="#b9a6e8" ${O}/>` +
      `<path d="M36 44 q8 -16 24 -18" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="0.7"/>` +
      shut(60, 56, 12, 6) + `<path d="M54 72 h12" ${o(2.5)}/>` +
      sparkle(22, 26, 6) + sparkle(100, 30, 5) +
      `<path d="M92 84 q12 0 12 -10 M98 92 q14 0 16 -14" fill="none" ${o(2)} opacity="0.5"/>` +
      `<path d="M16 76 q-6 8 0 14 q6 -6 0 -14z" fill="#f6d05a" ${o(1.5)}/>`,
  },
  giant: {
    bg: '#e6d3c0',
    svg: `<path d="M0 120 v-50 q0 -56 60 -56 q60 0 60 56 v50z" fill="#e3a57c" ${O}/>` +
      `<path d="M10 40 q10 -34 50 -34 q40 0 50 34 q-50 -22 -100 0z" fill="#7a4a22" ${O}/>` +
      brow(22, 50, 50, 46) + brow(98, 50, 70, 46) +
      eye(40, 66, 13, 2, 2) + `<path d="M68 66 q12 -8 24 0" fill="none" ${O}/>` +
      `<path d="M60 70 q-10 20 0 24 q10 -2 6 -10" fill="#d9946a" ${O}/>` + frown(60, 106, 14, 4) +
      `<circle cx="100" cy="100" r="13" fill="#cfeaf5" opacity="0.85" ${O}/><path d="M94 94 q4 -5 10 -3" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
  },
  goblin: {
    bg: '#dbe6b8',
    svg: ground +
      `<path d="M34 108 q0 -26 26 -26 q26 0 26 26z" fill="#8c5a2b" ${O}/>` +
      `<path d="M36 52 l-30 -14 l22 30z M84 52 l30 -14 l-22 30z" fill="#8fbf4f" ${O}/>` +
      `<ellipse cx="60" cy="56" rx="28" ry="26" fill="#9fd05a" ${O}/>` +
      brow(42, 42, 54, 47) + brow(78, 42, 66, 47) + eyes(60, 54, 12, 7.5) +
      `<path d="M58 62 q2 8 6 2" fill="none" ${o(2.5)}/>` + grin(60, 70, 13, 8) +
      `<path d="M90 108 v-22 h20 v22z" fill="#b57a3f" ${O}/><path d="M94 86 q6 -12 12 0" fill="none" ${O}/>` +
      `<circle cx="100" cy="98" r="5" fill="#f6d05a" ${o(2)}/>`,
  },
  statue: {
    bg: '#dcdcd6',
    svg: ground +
      `<path d="M26 108 v-10 h68 v10z M34 98 v-8 h52 v8z" fill="#9a9c98" ${O}/>` +
      `<path d="M40 90 q-2 -22 8 -30 h24 q10 8 8 30z" fill="#bfc1bc" ${O}/>` +
      `<circle cx="60" cy="42" r="22" fill="#cfd1cc" ${O}/>` +
      `<path d="M40 34 q20 -22 40 0 q-20 -8 -40 0z" fill="#a9aba6" ${O}/>` +
      eye(51, 44, 6, 2) + `<path d="M63 44 h12" ${o(2.5)}/>` + `<path d="M54 56 h12" ${o(2.5)}/>` +
      `<path d="M74 24 l6 8 l-4 6 M44 70 l6 6" fill="none" ${o(1.8)}/>` +
      `<path d="M86 26 q6 -6 12 0 q-2 4 -6 4z" fill="#fff" ${o(2)}/><circle cx="96" cy="26" r="1.5" fill="${INK}"/><path d="M98 27 l5 1" ${o(2)}/>`,
  },
  portal: {
    bg: '#d9d2c2',
    svg: `<path d="M0 78 h120 v42 h-120z" fill="#b9ad94"/><path d="M0 78 h120" ${o(2)} opacity="0.4"/>` +
      `<ellipse cx="60" cy="92" rx="44" ry="18" fill="#3b2a55" ${O}/>` +
      `<path d="M32 92 q28 -16 56 0 q-28 14 -44 2 q14 -8 28 -2" fill="none" stroke="#b9a6e8" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M52 84 v-34 q0 -10 8 -10 q8 0 8 10 v34z" fill="#9fd05a" ${O}/>` + eyes(60, 54, 5, 4.5, 0, -1) + frown(60, 66, 4, 2) +
      `<path d="M52 62 l-14 -10 M68 62 l14 -10" ${o(3)}/>` +
      `<path d="M92 40 l10 -8 l2 10 l-8 4z" fill="#fbf4e2" ${o(2)}/><path d="M18 44 q4 -8 10 -2 q-2 8 -10 2z" fill="#7fb7c9" ${o(2)}/>` +
      sparkle(24, 70, 4, '#b9a6e8') + sparkle(100, 66, 4, '#b9a6e8'),
  },
  horse: {
    bg: '#e8dcc6',
    svg: ground +
      `<path d="M40 108 v-30 q-4 -20 6 -34 l-4 -22 l14 12 q30 -6 36 26 q4 24 -10 30 q-12 2 -14 -10 q-8 4 -10 28z" fill="#a8703e" ${O}/>` +
      `<path d="M46 44 q-18 2 -20 30 q8 0 12 -8 q2 10 8 14" fill="#5a3a1c" ${O}/>` +
      eye(66, 48, 7, 2, 1) + brow(58, 38, 72, 42) +
      `<ellipse cx="84" cy="72" rx="3" ry="4" fill="${INK}"/><path d="M70 82 q8 4 14 0" fill="none" ${o(2.5)}/>` +
      `<rect x="6" y="14" width="34" height="26" rx="3" fill="#fbf4e2" ${O}/>` +
      sparkle(15, 24, 5) + `<path d="M24 22 h10 M12 33 h22" ${o(2)}/>`,
  },
  moon: {
    bg: '#2f3a5c',
    svg: `<circle cx="18" cy="20" r="1.8" fill="#fff"/><circle cx="104" cy="14" r="1.5" fill="#fff"/><circle cx="96" cy="96" r="1.8" fill="#fff"/><circle cx="12" cy="88" r="1.5" fill="#fff"/>` +
      `<circle cx="58" cy="54" r="38" fill="#f6d05a" ${O}/>` +
      `<circle cx="40" cy="36" r="7" fill="#e0b23c" ${o(2)}/><circle cx="80" cy="34" r="5" fill="#e0b23c" ${o(2)}/><circle cx="82" cy="74" r="8" fill="#e0b23c" ${o(2)}/><circle cx="34" cy="72" r="4" fill="#e0b23c" ${o(2)}/>` +
      eyes(58, 52, 11, 7, 0, 2) + `<ellipse cx="58" cy="68" rx="5" ry="6" fill="${INK}"/>` +
      `<path d="M92 120 v-22 h20 v22z" fill="#e2b06a" ${O}/><circle cx="98" cy="106" r="1.5" fill="${INK}"/><circle cx="106" cy="112" r="1.5" fill="${INK}"/><circle cx="104" cy="102" r="1.5" fill="${INK}"/>`,
  },
  hedge: {
    bg: '#d3e6d0',
    svg: ground +
      `<path d="M16 104 q-10 -14 2 -26 q-8 -18 12 -24 q4 -18 24 -12 q14 -12 26 2 q20 -2 20 18 q14 10 4 26 q8 12 -4 16z" fill="#4f8f45" ${O}/>` +
      `<path d="M34 60 q6 -6 10 2 M76 54 q6 -6 10 2 M30 88 q6 -6 10 2 M82 86 q6 -6 10 2" fill="none" stroke="#3a6e33" stroke-width="2.5" stroke-linecap="round"/>` +
      eyes(60, 70, 12, 7.5, 0, 0) + brow(40, 58, 54, 60) + brow(80, 58, 66, 60) + `<path d="M52 86 q8 -4 16 0" fill="none" ${o(2.5)}/>` +
      `<path d="M4 30 l16 16" ${o(3)}/>` + sparkle(24, 50, 6, '#e0607a') +
      `<path d="M116 30 l-16 16" ${o(3)}/>` + sparkle(96, 50, 6, '#7fd1f0'),
  },
  privy: {
    bg: '#d8d4c4',
    svg: ground +
      `<path d="M30 108 v-66 h60 v66z" fill="#a0652f" ${O}/>` +
      `<path d="M22 44 l38 -26 l38 26z" fill="#7a4a22" ${O}/>` +
      `<path d="M42 108 v-54 h36 v54z" fill="#8a5527" ${O}/>` +
      `<path d="M54 64 q6 -8 12 0 q-6 8 -12 0z" fill="${INK}"/>` +
      eyes(60, 82, 7, 5, 0, -1) +
      `<circle cx="72" cy="88" r="2.5" fill="#f6d05a" ${o(1.5)}/>` +
      `<path d="M84 34 q4 -18 16 -14 q12 4 8 18 q4 10 -4 14 l-4 -4 l-4 4 l-4 -4 l-6 2z" fill="#fbfbff" opacity="0.92" ${o(2.5)}/>` +
      `<circle cx="96" cy="32" r="2" fill="${INK}"/><circle cx="104" cy="34" r="2" fill="${INK}"/><ellipse cx="100" cy="40" rx="2" ry="3" fill="${INK}"/>`,
  },
  book: {
    bg: '#e6d2bc',
    svg: ground +
      `<path d="M22 34 q20 -10 38 0 q18 -10 38 0 v62 q-20 -10 -38 0 q-18 -10 -38 0z" fill="#fbf4e2" ${O}/>` +
      `<path d="M18 40 v62 q22 -10 42 0 q20 -10 42 0 v-62" fill="none" ${o(5)}/><path d="M18 40 v62 q22 -10 42 0 q20 -10 42 0 v-62" fill="none" stroke="#8c3b2a" stroke-width="2"/>` +
      `<path d="M60 34 v62" ${o(2.5)}/>` +
      `<path d="M30 48 h20 M30 56 h20 M30 64 h14 M70 48 h20 M70 56 h20 M70 64 h14" ${o(1.8)} opacity="0.45"/>` +
      eyes(60, 78, 16, 6, 0, 0) + `<path d="M50 90 q10 6 20 0" fill="none" ${o(2.5)}/>` +
      `<path d="M52 28 v-18 l8 6 l8 -6 v18z" fill="#d9503c" ${o(2.5)}/>`,
  },
  sock: {
    bg: '#dfe3ee',
    svg: ground +
      `<path d="M44 14 h30 v50 q0 8 8 12 l14 8 q10 8 2 18 q-6 6 -18 2 l-28 -12 q-10 -6 -10 -20z" fill="#d9503c" ${O}/>` +
      `<path d="M42 12 h34 v14 h-34z" fill="#fbf4e2" ${O}/>` +
      `<path d="M46 40 h26 M46 52 h26" stroke="#f6d05a" stroke-width="4"/>` +
      `<path d="M84 100 q10 2 14 -6" fill="none" stroke="#f6d05a" stroke-width="4" stroke-linecap="round"/>` +
      eyes(60, 68, 7, 5.5, 1, 1) + smile(62, 80, 5, 3) +
      `<path d="M14 40 q-6 -8 0 -16 M24 36 q-6 -8 0 -16 M96 44 q-6 -8 0 -16" fill="none" stroke="#7fa35a" stroke-width="2.5" stroke-linecap="round"/>` +
      `<path d="M50 8 l4 -6 l5 5 l5 -5 l4 6z" fill="#f6d05a" ${o(1.8)}/>`,
  },
  hellhound: {
    bg: '#efc7b0',
    svg: ground +
      `<path d="M28 108 q-2 -30 32 -30 q34 0 32 30z" fill="#5a3030" ${O}/>` +
      [[26, 54, -14], [94, 54, 14]].map(([x, y, r]) =>
        `<g transform="rotate(${r} ${x} ${y})"><path d="M${x - 14} ${y - 12} l-2 -16 l12 8z M${x + 14} ${y - 12} l2 -16 l-12 8z" fill="#6e3a3a" ${O}/><circle cx="${x}" cy="${y}" r="18" fill="#6e3a3a" ${O}/>${eyes(x, y - 3, 7, 4.5)}<ellipse cx="${x}" cy="${y + 6}" rx="4" ry="3" fill="${INK}"/><path d="M${x - 6} ${y + 11} q6 5 12 0" fill="none" ${o(2)}/></g>`).join('') +
      `<path d="M42 30 l-4 -20 l14 10z M78 30 l4 -20 l-14 10z" fill="#7d4242" ${O}/><circle cx="60" cy="48" r="22" fill="#7d4242" ${O}/>` +
      eyes(60, 44, 9, 6) + `<ellipse cx="60" cy="55" rx="5" ry="4" fill="${INK}"/>` +
      `<path d="M50 61 q10 8 20 0" fill="none" ${o(2.5)}/><path d="M57 65 q3 12 7 0z" fill="#e0607a" ${o(2)}/>` +
      `<path d="M92 104 q16 -4 14 -22" fill="none" ${O}/><path d="M104 74 q6 4 2 10 q-6 -2 -2 -10z" fill="#f29a3a" ${o(2)}/>`,
  },
  wardrobe: {
    bg: '#e2d6c0',
    svg: ground +
      `<path d="M26 104 l-4 -84 l76 -4 l2 88z" fill="#b57a3f" ${O}/>` +
      `<path d="M61 18 l1 86" ${O}/>` +
      `<circle cx="54" cy="64" r="3" fill="#f6d05a" ${o(1.8)}/><circle cx="68" cy="64" r="3" fill="#f6d05a" ${o(1.8)}/>` +
      eyes(60, 42, 20, 6, 0, 2) + `<path d="M36 84 q24 -8 48 0" fill="none" ${o(2.5)}/>` +
      `<path d="M30 104 v8 M94 104 v8" ${o(5)}/>` +
      `<path d="M6 96 l8 -4 l2 4 l-8 4z M102 110 l8 -6 l3 4 l-8 6z" fill="#cfd6dc" ${o(2)}/>` +
      `<path d="M100 20 l12 -8 M104 30 l12 -2" ${o(2.5)}/>`,
  },
  imp: {
    bg: '#e8c9d0',
    svg: ground +
      `<path d="M38 108 q0 -26 22 -26 q22 0 22 26z" fill="#3b2a55" ${O}/>` +
      `<path d="M38 36 q-12 -8 -10 -22 q10 4 16 14z M82 36 q12 -8 10 -22 q-10 4 -16 14z" fill="#fbf4e2" ${O}/>` +
      `<circle cx="60" cy="56" r="28" fill="#d9503c" ${O}/>` +
      eyes(60, 54, 12, 8.5, 0, 1) + grin(60, 68, 11, 8) + blush(40, 66) + blush(80, 66) +
      `<path d="M84 96 q22 6 20 -16" fill="none" ${O}/><path d="M104 80 l-6 -8 l12 0z" fill="#d9503c" ${o(2)}/>` +
      `<path d="M14 108 v-18 q0 -8 8 -8 q8 0 8 8 v18z" fill="#e2b06a" ${O}/>` + eyes(22, 92, 3, 2.2),
  },
  vampire: {
    bg: '#d8ccd8',
    svg: ground +
      `<path d="M14 108 q4 -40 20 -44 l-6 -22 l22 16 h20 l22 -16 l-6 22 q16 4 20 44z" fill="#2f2440" ${O}/>` +
      `<path d="M44 108 q0 -30 16 -30 q16 0 16 30z" fill="#a3321f" ${O}/>` +
      `<path d="M38 52 q0 -26 22 -26 q22 0 22 26 q0 24 -22 26 q-22 -2 -22 -26z" fill="#dfe6dc" ${O}/>` +
      `<path d="M38 46 q2 -22 22 -22 q20 0 22 22 q-12 -10 -22 2 q-10 -12 -22 -2z" fill="${INK}" ${O}/>` +
      eyes(60, 54, 9, 6) + `<path d="M50 66 q10 6 20 0" fill="none" ${o(2.5)}/><path d="M53 67 l2 6 l2 -5z M63 68 l2 5 l2 -6z" fill="#fff" ${o(1.5)}/>` +
      `<path d="M52 82 l8 6 l8 -6 l-2 10 h-12z" fill="#fff" ${o(2)}/>`,
  },
  fountain: {
    bg: '#cfe4ea',
    svg: ground +
      `<path d="M60 40 q-22 -30 -30 4 M60 40 q22 -30 30 4 M60 40 v-22" fill="none" stroke="#7fd1f0" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M54 80 v-36 h12 v36z" fill="#bfc3cc" ${O}/><path d="M38 44 q22 12 44 0 q-4 -8 -22 -8 q-18 0 -22 8z" fill="#cfd6dc" ${O}/>` +
      `<path d="M12 78 h96 q0 28 -48 28 q-48 0 -48 -28z" fill="#bfc3cc" ${O}/>` +
      `<ellipse cx="60" cy="78" rx="48" ry="10" fill="#7fd1f0" ${O}/>` +
      eyes(60, 92, 10, 6, 0, -1) + smile(60, 100, 5, 2) +
      sparkle(22, 30, 5, '#fff') + sparkle(98, 26, 6, '#fff') +
      `<circle cx="30" cy="76" r="5" fill="#f4c9a4" ${o(2)}/><path d="M26 73 q4 -6 8 0" fill="#fff" ${o(1.5)}/>`,
  },
  marrow: {
    bg: '#dfe8c2',
    svg: ground +
      `<path d="M10 84 q-4 -30 50 -30 q54 0 50 30 q-4 22 -50 22 q-46 0 -50 -22z" fill="#5f9a45" ${O}/>` +
      `<path d="M26 66 q-6 18 2 32 M46 58 q-6 24 0 46 M74 58 q6 24 0 46 M94 66 q6 18 -2 32" fill="none" stroke="#3f6b35" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M106 70 q10 -6 8 -16" fill="none" ${o(4)}/>` +
      eyes(60, 76, 10, 6.5) + smile(60, 88, 8, 4) + blush(42, 86) + blush(78, 86) +
      `<circle cx="60" cy="30" r="14" fill="#3f7fbf" ${O}/><path d="M52 42 l-6 18 l10 -6 l4 8 l4 -8 l10 6 l-6 -18z" fill="#3f7fbf" ${O}/>` +
      `<path d="M55 34 v-8 l5 -2 v10" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
  },
  kraken: {
    bg: '#c9dfe8',
    svg: `<path d="M0 86 q15 -8 30 0 q15 8 30 0 q15 -8 30 0 q15 8 30 0 v34 h-120z" fill="#5fa8c9"/>` +
      `<path d="M14 92 q-10 -30 6 -34 q10 0 4 12 q-4 10 4 22z M106 92 q10 -30 -6 -34 q-10 0 -4 12 q4 10 -4 22z" fill="#c95f8a" ${O}/>` +
      `<path d="M28 92 q-8 -70 32 -72 q40 2 32 72z" fill="#d9709a" ${O}/>` +
      `<rect x="8" y="64" width="18" height="10" rx="5" fill="#f29a3a" ${o(2)}/><rect x="94" y="64" width="18" height="10" rx="5" fill="#f29a3a" ${o(2)}/>` +
      brow(40, 46, 52, 42) + brow(80, 46, 68, 42) + eyes(60, 56, 12, 8.5, 0, 2) +
      `<path d="M52 74 q4 -4 8 0 q4 4 8 0" fill="none" ${o(2.5)}/>` + blush(40, 68) + blush(80, 68) +
      `<path d="M0 92 q15 -8 30 0 q15 8 30 0 q15 -8 30 0 q15 8 30 0" fill="none" stroke="#fff" stroke-width="3" opacity="0.7"/>`,
  },
  snail: {
    bg: '#dce8c9',
    svg: ground +
      `<path d="M10 104 q0 -10 14 -10 h62 q12 0 12 -14 v-22 q0 -8 8 -8 q8 0 8 10 v30 q0 18 -18 18h-76 q-10 0 -10 -4z" fill="#e8c98a" ${O}/>` +
      `<circle cx="52" cy="66" r="32" fill="#c8793a" ${O}/>` +
      `<path d="M52 66 q0 -12 10 -10 q12 2 10 14 q-2 16 -20 14 q-20 -2 -18 -22 q2 -20 24 -18" fill="none" ${o(3)}/>` +
      `<path d="M100 52 l-6 -26 M110 52 l4 -26" ${o(3)}/>` + eye(94, 24, 6, 1) + eye(114, 24, 6, 1) +
      smile(106, 72, 4, 3) +
      `<path d="M30 30 v-22" ${o(2.5)}/><path d="M30 8 l16 5 l-16 6z" fill="#d9503c" ${o(2)}/>`,
  },
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
};

/** Quest board thumbnails are keyed by objective id. */
export const artForObjective = (objectiveId: string) => ART[ART_FOR[`x-${objectiveId}`]];
export const artForCard = (cardId: string) => ART[ART_FOR[cardId]];
