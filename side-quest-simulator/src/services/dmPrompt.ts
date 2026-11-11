import type { dmContext } from '../game/engine';

export type DmContext = ReturnType<typeof dmContext>;

const TONE = {
  family: 'Clean and silly. No swearing, nothing rude.',
  cheeky: 'Cheeky. Mild innuendo and gentle rudeness are fine. No strong swearing.',
  crude: 'Crude. Mild British swearing is welcome.',
} as const;

/** Chat messages asking a small model for one quest's worth of Dungeon Master lines. */
export const dmMessages = (ctx: DmContext) => {
  const cards = ctx.quest.cards
    .map((c, i) => `Scene ${i + 1}${i === ctx.quest.cards.length - 1 ? ' (the finale)' : ''}: ${c.scene}`)
    .join('\n');
  const past = ctx.history.length ? ctx.history.map((h) => `${h.quest} (${h.result})`).join('; ') : 'none yet';
  return [
    {
      role: 'system',
      content:
        `You are the Dungeon Master of a comedy fantasy game. You are dry, sardonic and British, privately fond of the player, and today you are in a ${ctx.mood} mood: let it colour every line. ` +
        'You speak to the player as "you". Every line is one or two short sentences, at most 25 words, and must mention something specific from the scene or the hero. ' +
        `Never use emoji. Never mention dice numbers. Tone: ${TONE[ctx.tone]} Reply with JSON only.`,
    },
    {
      role: 'user',
      content:
        `Hero: ${ctx.hero.name}, a ${ctx.hero.ancestry} ${ctx.hero.class}. Quirk: ${ctx.hero.quirk}. Health ${ctx.health}.\n` +
        `Rival for Hero of the Year: ${ctx.rival}.\n` +
        `This is quest ${ctx.questNumber} of ${ctx.questsTotal}. Earlier quests: ${past}.\n` +
        `Quest: "${ctx.quest.title}". ${ctx.quest.client} needs the hero to ${ctx.quest.task}. ${ctx.quest.twist}\n` +
        `${cards}\n\n` +
        'Write the Dungeon Master\'s lines for this quest. Vary the sentence shapes; do not start two lines the same way. Refer back to an earlier quest or to the rival in at least two lines.\n' +
        '- cards: for each scene in order, "good" is your remark when the hero succeeds there, "bad" when they fail.\n' +
        '- bridgeGood / bridgeBad: said while moving to the next scene after a success / after a failure.\n' +
        '- finaleIntro: said as the finale begins.\n' +
        '- done / doneBadly: said when the quest is finished well / finished badly.',
    },
  ];
};

const line = { type: 'string', maxLength: 200 } as const;

export const dmSchema = (cardCount: number) => ({
  type: 'object',
  properties: {
    cards: {
      type: 'array', minItems: cardCount, maxItems: cardCount,
      items: { type: 'object', properties: { good: line, bad: line }, required: ['good', 'bad'], additionalProperties: false },
    },
    bridgeGood: line, bridgeBad: line, finaleIntro: line, done: line, doneBadly: line,
  },
  required: ['cards', 'bridgeGood', 'bridgeBad', 'finaleIntro', 'done', 'doneBadly'],
  additionalProperties: false,
});
