import { STORIES } from '../game/content/stories.generated';
import { artForRival, GIVER_ART } from './cast';
import { ART } from './creatures';
import { BLOOD, BONE, INK, MOSS, MUSTARD, PLUM, RUST, STEEL, black, flat, glare, instance, line, shape, type InkArt, type InkFigure } from './ink';

/** Stage the existing cut-paper actors. One visual joke; no extra surface detail. */
let actorId = 0;
const place = (art: InkFigure, x: number, y: number, w = 100, flip = false, tilt = 0) =>
  `<g transform="translate(${x} ${y}) scale(${w / 120}) rotate(${tilt} 60 60)">` +
  `<g transform="${flip ? 'translate(120 0) scale(-1 1)' : 'translate(0 0)'}">${instance(art.figure, `actor${actorId++}`)}</g></g>`;
const actor = (key: string, x: number, y: number, w = 100, flip = false, tilt = 0) => place(ART[key], x, y, w, flip, tilt);
const giver = (key: string, x: number, y: number, w = 100) => place(GIVER_ART[key], x, y, w);

const form = (x: number, y: number, s = 1, tilt = 0) => `<g transform="translate(${x} ${y}) scale(${s}) rotate(${tilt})">` +
  shape('M0 0 L25 0 L29 6 L29 35 L0 35z', BONE) + line('M6 9 L20 9 M6 15 L23 15 M6 21 L18 21', INK, 1.7) + '</g>';
const forms = (x: number, y: number) => form(x, y) + form(x + 5, y - 26, 1, -6) + form(x - 2, y - 52, 1, 5);
const coins = (x: number, y: number) => shape(`M${x} ${y} h24 v7 h-24z M${x + 3} ${y - 8} h20 v7 h-20z M${x + 5} ${y - 16} h17 v7 h-17z`, MUSTARD);
const desk = (x = 138, y = 85, w = 86) => shape(`M${x} ${y} h${w} v10 h-${w}z M${x + 7} ${y + 10} h7 v18 h-7z M${x + w - 14} ${y + 10} h7 v18 h-7z`, RUST);
const gavel = (x: number, y: number, tilt = 0) => `<g transform="translate(${x} ${y}) rotate(${tilt})">` + line('M0 0 L0 26', INK, 5) + shape('M-13 -8 L13 -8 L13 2 L-13 2z', RUST) + '</g>';
const trophy = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">` +
  shape('M0 0 L40 0 L34 25 L26 30 L26 42 L35 42 L35 50 L5 50 L5 42 L14 42 L14 30 L6 25z', MUSTARD) +
  line('M1 7 L-8 7 L-8 18 L8 25 M39 7 L48 7 L48 18 L32 25', MUSTARD, 4) + black('M22 1 L40 1 L34 25 L26 30 L26 42 L35 42 L35 50 L22 50z') + '</g>';
const tooth = (x: number, y: number, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${shape('M0 0 L8 -6 L16 0 L24 -6 L32 0 L28 28 L20 38 L16 19 L12 38 L4 28z', BONE)}</g>`;
const bolt = (x: number, y: number, tilt: number) => `<g transform="translate(${x} ${y}) rotate(${tilt})">` +
  shape('M0 0 L20 0 L20 10 L0 10z M7 10 L13 10 L13 43 L7 43z', STEEL) + line('M6 24 L14 24 M6 31 L14 31 M6 38 L14 38', INK, 2) + '</g>';

const panel = (label: string, bg: string, back: string, drawing: string): InkArt => ({
  bg, label, width: 240, height: 120,
  svg: `<rect width="240" height="120" fill="${bg}"/><circle cx="119" cy="53" r="51" fill="${back}"/>` +
    line('M0 20 L20 0 M0 33 L33 0 M0 46 L46 0 M212 120 L240 92 M224 120 L240 104', INK, 1.5) +
    black('M0 110 L18 106 L42 111 L70 107 L96 111 L125 105 L152 110 L179 107 L207 111 L240 107 V120 H0z') +
    drawing + `<rect x="1.5" y="1.5" width="237" height="117" fill="none" stroke="${INK}" stroke-width="3"/>`,
});

const tax = (audit = false) => panel(audit ? 'Two dragons disagree over one very small tax form' : 'A dragon discovers its tax paperwork is taller than the accountant', '#33241a', BLOOD,
  actor('dragon', -2, 5, 122) + (audit ? actor('dragon', 145, 39, 78, true) : giver('guild', 145, 44, 77)) +
  forms(117, 65) + desk() + form(165, 72, .62, -7) + coins(204, 79));
const soup = (escape = false) => panel(escape ? 'The soup flees on tiny legs while the chef brandishes a ladle' : 'A very small chef threatens a very large, very unwilling soup', '#33241a', RUST,
  giver('baker', 157, 28, 91) + actor('soup', escape ? 18 : 14, 17, escape ? 104 : 116, false, escape ? -9 : 0) +
  (escape ? line('M54 105 L40 113 M76 104 L91 113 M8 67 L20 65 M5 79 L16 77', BONE, 3) : '') +
  line('M184 69 L148 19', INK, 5) + shape('M136 9 L150 7 L160 20 L155 31 L144 29z', STEEL));
const goose = (evidence = false) => panel(evidence ? 'The goose presents a feather as evidence; the judge has questions' : 'A goose in a legal wig bangs a gavel from a ludicrously tall bench', '#22313d', MUSTARD,
  actor('goose', 16, 5, 113) + shape('M52 34 L48 22 L57 25 L63 18 L71 24 L82 21 L91 34z', BONE) +
  desk(7, 86, 127) + gavel(114, 56, -25) +
  (evidence ? form(159, 53, 1.1, 8) + shape('M182 54 L207 29 L200 54 L181 66z', BONE) + line('M177 69 L202 37', INK, 2) : giver('guild', 153, 39, 80)) +
  flat('M140 15 L144 8 L148 17 L144 22z', BONE));
const checkout = (supervisor = false) => panel(supervisor ? 'A haunted checkout summons an even larger ghostly supervisor' : 'A ghost waits at a checkout whose receipt has reached the floor', '#1e2a33', STEEL,
  actor('ghost', supervisor ? 2 : 7, supervisor ? -8 : 16, supervisor ? 126 : 100) +
  shape('M139 34 L213 34 L213 75 L139 75z M150 75 L206 75 L218 100 L136 100z', MOSS) +
  black('M150 43 L202 43 L202 65 L150 65z') + glare(176, 50, 14, BONE, 10) +
  shape('M165 82 L187 82 L186 99 L194 106 L184 112 L172 106 L168 98z', BONE) + line('M173 88 L182 88 M174 95 L182 95 M178 103 L185 105', INK, 1.5));

export const QUEST_PANELS: Record<string, InkArt> = {
  'dragon-tax': tax(),
  'lich-eviction': panel('The lich guards its dressing gown while an eviction notice blocks the crypt', '#2a2030', MOSS,
    actor('lich', 4, 11, 110) + actor('door', 142, 15, 108) + form(144, 57, 1.3, -8) + shape('M114 91 L143 91 L140 108 L117 108z', RUST)),
  'kings-sock': panel('The king gives one solitary sock the protection of a royal portrait', '#33241a', MUSTARD,
    giver('king', 8, 15, 108) + shape('M138 15 L220 18 L216 106 L134 103z', MUSTARD) + black('M145 23 L212 26 L208 98 L142 95z') + actor('sock', 148, 28, 61)),
  sandwich: panel('Two armies face off over one completely unarmoured sandwich', '#4a1c14', MUSTARD,
    actor('blackknight', -6, 21, 94) + actor('knight', 151, 21, 94, true) + actor('sandwich', 80, 30, 82) +
    line('M73 21 L96 38 M167 21 L145 38', BONE, 2.5) + flat('M96 38 L86 35 L92 30z M145 38 L149 29 L155 34z', BONE)),
  soup: soup(),
  'goblin-union': panel('The goblins demand a tooth bigger than their employer', '#262b1c', BLOOD,
    actor('goblin', 4, 28, 91) + actor('blackknight', 152, 36, 86) + line('M109 41 L109 109', INK, 5) +
    shape('M79 15 L139 13 L143 65 L82 68z', BONE) + tooth(96, 28, .8) + desk(146, 86, 87)),
  hellhound: panel('Three heads pull one lead and a very small walker in three different directions', '#4a1c14', MUSTARD,
    actor('hellhound', 0, 12, 128) + line('M43 83 L176 47 M64 66 L176 47 M98 83 L176 47', BONE, 2) +
    place(GIVER_ART.intern, 173, 0, 54, false, 28) + line('M214 64 L226 70 M211 77 L222 83', BONE, 2)),
  'library-book': panel('One overdue book meets a fine taller than the librarian', '#2a2030', PLUM,
    giver('mother', 7, 16, 109) + actor('book', 111, 42, 75) + forms(194, 71) + form(193, -4, 1, -6) + desk(99, 94, 132)),
  'giant-furniture': panel('The wardrobe is finished; the spare screws are larger than the assembler', '#33241a', STEEL,
    actor('wardrobe', 0, 3, 128) + giver('intern', 148, 59, 54) + bolt(155, 25, -32) + bolt(220, 58, 18) + form(113, 77, .7, -12)),
  babysit: panel('The child and its enormous shadow both expect a bedtime story', '#2a2030', BLOOD,
    actor('imp', 2, -3, 127) + actor('book', 148, 55, 69) + shape('M134 77 L230 77 L230 91 L134 91z M142 91 L149 91 L149 111 L142 111z M219 91 L226 91 L226 111 L219 111z', RUST) +
    shape('M173 33 L194 33 L197 64 L170 64z', BONE) + flat('M175 39 h17 v13 h-17z', MUSTARD)),
  password: panel('The wizard offers a key; the door insists on another security question', '#33241a', STEEL,
    actor('door', 8, 6, 119) + giver('wizard', 143, 8, 111) +
    shape('M114 35 L151 35 L151 62 L135 62 L123 74 L125 62 L114 62z', BONE) + black('M127 42 L139 42 L140 48 L135 52 L135 56 L130 56 L130 50 L134 47 L127 47z') + flat('M130 58 h5 v3 h-5z', INK)),
  'vampire-wedding': panel('The vampire wedding is perfect, apart from the enormous garlic bulb in the dip', '#1c1622', BLOOD,
    actor('vampire', 3, 10, 112) + desk(121, 88, 110) + shape('M129 65 L221 65 L208 88 L144 88z', BONE) +
    shape('M159 61 L161 43 L175 31 L184 42 L193 50 L196 64z', BONE) + line('M175 34 L169 62 M181 41 L184 62 M175 31 L179 20', INK, 2.5)),
  fountain: panel('The fountain has reduced its plumber to a suspiciously tiny apprentice', '#22313d', STEEL,
    actor('fountain', 3, 7, 127) + giver('wizard', 173, 71, 43) + line('M166 108 L166 54', RUST, 4) + shape('M151 107 L156 95 L176 95 L182 107z', BLOOD) +
    shape('M167 15 L193 15 L179 34 L193 51 L167 51 L180 34z', BONE) + flat('M171 20 L189 20 L180 31z M171 47 L180 38 L189 47z', MUSTARD)),
  marrow: panel('Two enormous suspicious marrows compete for a pathetically small trophy', '#262b1c', BLOOD,
    actor('marrow', -7, 12, 118) + actor('marrow', 128, 12, 118, true) + trophy(109, 83, .53)),
  kraken: panel('The kraken clings to swimming aids while the instructor demonstrates from dry land', '#16242e', STEEL,
    actor('kraken', 0, 1, 130) + giver('intern', 164, 24, 78) + shape('M141 88 L238 88 L238 98 L141 98z', RUST) + line('M155 99 L155 120 M219 99 L219 120', INK, 5) +
    line('M145 112 L156 108 L167 112 L178 108 L189 112 L200 108 L211 112 L222 108 L234 112', BONE, 2)),
  parade: panel('The snail parade is almost at the finish; a hungry bird is already waiting', '#262b1c', MOSS,
    actor('snail', 2, 19, 110) + line('M125 22 L125 111', INK, 4) + shape('M125 22 L167 22 L167 47 L125 47z', BONE) + flat('M126 23 h13 v11 h-13z M152 23 h14 v11 h-14z M139 34 h13 v12 h-13z', INK) +
    giver('pigeon', 171, 30, 84)),
  showdown: panel('Two grand heroes and one trophy with room for only one name', '#2a2030', BLOOD,
    actor('knight', 0, 16, 98) + actor('blackknight', 144, 16, 98, true) + trophy(96, 47, 1.2)),
  'goose-lawyer': goose(),
  'checkout-haunting': checkout(),
};

const SCENE_PANELS: Record<string, InkArt> = {
  'tax-auditor': tax(true), 'tax-ashes': tax(true),
  'soup-escape': soup(true), 'soup-manifesto': soup(true),
  'goose-evidence': goose(true), 'checkout-supervisor': checkout(true),
};
const STORY_OBJECTIVE: Record<string, string> = Object.fromEntries(STORIES.flatMap((story) => story.scenes.map((scene) => [scene.id, story.objective])));
const rivalPanels = new Map<string, InkArt>();

const rivalPanel = (cardId: string, name: string): InkArt => {
  const key = `${cardId}:${name}`;
  const existing = rivalPanels.get(key);
  if (existing) return existing;
  const rival = place(artForRival(name), 15, 0, 127);
  const scene = cardId === 'x-showdown'
    ? panel('Your rival guards the Hero of the Year trophy for safekeeping, apparently', '#2a2030', BLOOD,
      actor('knight', 0, 16, 98) + place(artForRival(name), 138, -2, 104) + trophy(96, 47, 1.2))
    : cardId === 'rival-first-meeting'
    ? panel('Your rival blocks the road to pose for a portrait of themself', '#2a2030', MUSTARD,
      rival + shape('M153 10 L222 16 L218 88 L149 82z', RUST) + place(artForRival(name), 155, 17, 62) + line('M155 87 L148 112 M212 89 L220 112', INK, 5))
    : cardId === 'rival-middle-meeting'
      ? panel('Your rival has defeated many foes, but cannot open a lunch tin', '#2a2030', MOSS,
        rival + shape('M139 65 L215 65 L215 103 L139 103z', STEEL) + shape('M134 58 L220 58 L220 68 L134 68z', STEEL) +
        shape('M166 74 L188 74 L188 95 L166 95z', MUSTARD) + black('M175 79 h5 v6 h-5z M176 84 h3 v6 h-3z'))
      : panel('Your rival presents a dramatic invitation to a rather small nemesis ceremony', '#2a2030', BLOOD,
        rival + shape('M145 35 L218 35 L218 87 L145 87z', BONE) + line('M146 37 L182 64 L217 37', INK, 2.5) + shape('M175 58 L183 53 L191 59 L187 69 L177 68z', BLOOD));
  rivalPanels.set(key, scene);
  return scene;
};

/** Ordinary road cards keep their original portrait. Authored quest scenes get panels. */
export const panelForCard = (cardId: string, rival: string): InkArt | undefined => {
  if (['x-showdown', 'rival-first-meeting', 'rival-middle-meeting', 'rival-last-meeting'].includes(cardId)) return rivalPanel(cardId, rival);
  if (cardId.startsWith('x-')) return QUEST_PANELS[cardId.slice(2)];
  return SCENE_PANELS[cardId] ?? QUEST_PANELS[STORY_OBJECTIVE[cardId]];
};
