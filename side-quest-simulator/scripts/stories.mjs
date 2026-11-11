// Compiles the plain-text story files in stories/ into game content.
// The format is documented in STORIES.md. This module has no dependencies so it can be run
// with plain Node and imported by the tests.

const STATS = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
const RISKS = { careful: 'safe', bold: 'bold', reckless: 'reckless' };
const TONES = { cheeky: 'c', crude: 'x' };
const ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Adds a line to a possibly tone-varied text. */
const addText = (target, key, tone, value) => {
  const cur = target[key];
  if (!tone) {
    if (cur && typeof cur === 'object') cur.f = cur.f ? `${cur.f} ${value}` : value;
    else target[key] = cur ? `${cur} ${value}` : value;
    return;
  }
  const obj = cur && typeof cur === 'object' ? cur : { f: cur ?? '' };
  obj[TONES[tone]] = obj[TONES[tone]] ? `${obj[TONES[tone]]} ${value}` : value;
  target[key] = obj;
};

const parseGives = (value, fail) => {
  const deal = {};
  for (const part of value.split(',')) {
    const m = part.trim().match(/^([+-]\d+)\s*(gold|hp|luck)$/i);
    if (!m) {
      fail(`cannot read "${part.trim()}" in gives. Use amounts like "+4 hp, -10 gold, +1 luck".`);
      continue;
    }
    deal[m[2].toLowerCase()] = Number(m[1]);
  }
  return deal;
};

/**
 * @param {{ name: string, text: string }[]} files
 * @param {{ artKeys?: string[] }} [options]
 */
export const parseStories = (files, options = {}) => {
  const errors = [];
  const quests = [];
  const scenes = {};
  const events = [];
  const rivals = [];
  const art = {};
  const ids = new Set();

  for (const file of files) {
    let block = null; // { kind, id, line, title, task, art, cards: [] }
    let card = null; // the card being written
    let choice = null;
    const fail = (line, msg) => errors.push(`${file.name}:${line}: ${msg}`);

    const finishCard = () => {
      if (!card) return;
      const where = card.line;
      if (!card.text || (typeof card.text === 'object' && !card.text.f)) fail(where, `this ${card.kind} has no text. Write a sentence or two describing the scene.`);
      if (card.choices.length < 2 || card.choices.length > 4) fail(where, `this ${card.kind} has ${card.choices.length} choices. A scene needs 2 to 4 lines starting with ">".`);
      const used = new Set();
      let free = false;
      for (const c of card.choices) {
        if (c.deal) {
          if (!Object.keys(c.deal).length) fail(c.line, 'a Deal choice needs a "gives:" line, for example "gives: +4 hp, -10 gold".');
          if (!c.win) fail(c.line, 'a Deal choice needs a "then:" line saying what happens.');
          if (!Object.values(c.deal).some((v) => v < 0)) free = true;
        } else {
          free = true;
          if (used.has(c.stat)) fail(c.line, `two choices in this scene both use ${c.stat}. Each roll in a scene must use a different stat.`);
          used.add(c.stat);
          if (!c.win) fail(c.line, 'this choice needs a "win:" line.');
          if (!c.lose) fail(c.line, 'this choice needs a "lose:" line.');
        }
      }
      if (card.choices.length && !free) fail(where, 'every choice here costs something. Add one roll, or one Deal that costs nothing, so the player can never be stuck.');
      card = null;
      choice = null;
    };

    const startCard = (kind, id, line) => {
      finishCard();
      card = { kind, id, line, text: '', choices: [] };
      block.cards.push(card);
      return card;
    };

    const finishBlock = () => {
      finishCard();
      if (!block) return;
      const toCard = (c) => ({
        id: c.id,
        text: c.text,
        choices: c.choices.map((x) =>
          x.deal
            ? { label: x.label, stat: 'CHA', risk: 'safe', win: x.win ?? '', lose: x.win ?? '', deal: x.deal }
            : { label: x.label, stat: x.stat, risk: x.risk, win: x.win ?? '', lose: x.lose ?? '' }),
      });
      if (block.kind === 'QUEST') {
        const sceneCards = block.cards.filter((c) => c.kind === 'scene');
        const finale = block.cards.find((c) => c.kind === 'finale');
        if (block.title) {
          if (!block.task) fail(block.line, 'a new quest needs a "task:" line that finishes the sentence "The client needs you to ...".');
          if (!block.art) fail(block.line, 'a new quest needs an "art:" line naming one of the drawings.');
          if (!finale) fail(block.line, 'a new quest needs a FINALE.');
          if (finale) quests.push({ id: block.id, title: block.title, task: block.task ?? '', climax: toCard(finale) });
        } else {
          if (finale) fail(finale.line, `"${block.id}" has no title, so it adds scenes to a quest that already exists, and that quest already has a finale. Give it a "title:" to make a new quest.`);
          if (!sceneCards.length) fail(block.line, 'this QUEST block adds nothing. Add a SCENE, or a title, task, art and FINALE for a new quest.');
        }
        if (sceneCards.length) scenes[block.id] = [...(scenes[block.id] ?? []), ...sceneCards.map(toCard)];
        for (const c of block.cards) if (block.art) art[c.id] = block.art;
      } else {
        const c = block.cards[0];
        if (c) {
          (block.kind === 'EVENT' ? events : rivals).push(toCard(c));
          art[c.id] = block.art ?? (block.kind === 'RIVAL' ? 'blackknight' : 'sign');
        }
      }
      block = null;
    };

    file.text.split(/\r?\n/).forEach((raw, i) => {
      const line = i + 1;
      const s = raw.trim();
      if (!s || s.startsWith('#')) return;

      const head = s.match(/^(QUEST|EVENT|RIVAL)\s+(\S+)\s*$/);
      if (head) {
        finishBlock();
        const [, kind, id] = head;
        if (!ID.test(id)) fail(line, `"${id}" is not a valid name. Use lowercase letters, numbers and hyphens, like "haunted-well".`);
        const full = kind === 'RIVAL' ? `r-${id}` : id;
        if (kind !== 'QUEST' && ids.has(full)) fail(line, `the name "${id}" is used twice.`);
        ids.add(full);
        block = { kind, id, line, cards: [] };
        if (kind !== 'QUEST') startCard(kind.toLowerCase(), full, line);
        return;
      }
      if (/^(QUEST|EVENT|RIVAL)\b/.test(s)) return fail(line, 'a QUEST, EVENT or RIVAL line needs a name after it, like "EVENT haunted-well".');
      if (!block) return fail(line, 'this line is not inside anything. Start with "QUEST name", "EVENT name" or "RIVAL name".');

      if (s === 'SCENE' || s === 'FINALE') {
        if (block.kind !== 'QUEST') return fail(line, `${s} only belongs inside a QUEST.`);
        if (s === 'FINALE' && block.cards.some((c) => c.kind === 'finale')) return fail(line, 'this quest already has a FINALE.');
        const n = block.cards.filter((c) => c.kind === 'scene').length + 1 + (scenes[block.id]?.length ?? 0);
        startCard(s.toLowerCase(), s === 'FINALE' ? `x-${block.id}` : `s-${block.id}-${n}`, line);
        return;
      }

      const ch = s.match(/^>\s*([A-Za-z]+)(?:\s+([A-Za-z]+))?\s*:\s*(.+)$/);
      if (s.startsWith('>')) {
        if (!card) return fail(line, 'a choice has to come after the text of a SCENE, FINALE, EVENT or RIVAL.');
        if (!ch) return fail(line, 'cannot read this choice. Write it like "> Bold STR: Kick the door" or "> Deal: Pay the toll".');
        const [, first, second, label] = ch;
        if (first.toLowerCase() === 'deal' && !second) {
          choice = { line, label, deal: {} };
        } else {
          const risk = RISKS[first.toLowerCase()];
          const stat = (second ?? '').toUpperCase();
          if (!risk) return fail(line, `"${first}" is not a risk level. Use Careful, Bold or Reckless (or Deal for a choice with no roll).`);
          if (!STATS.includes(stat)) return fail(line, `"${second ?? ''}" is not a stat. Use one of ${STATS.join(', ')}.`);
          choice = { line, label, stat, risk };
        }
        card.choices.push(choice);
        return;
      }

      const kv = s.match(/^([a-z]+)(?:\s*\((cheeky|crude)\))?\s*:\s*(.*)$/);
      if (kv && ['title', 'task', 'art', 'text', 'win', 'lose', 'gives', 'then'].includes(kv[1])) {
        const [, key, tone, value] = kv;
        if (!value) return fail(line, `"${key}:" has nothing after it.`);
        if (key === 'title' || key === 'task') {
          if (block.kind !== 'QUEST') return fail(line, `"${key}:" only belongs to a QUEST.`);
          return addText(block, key, tone, value);
        }
        if (key === 'art') {
          if (options.artKeys && !options.artKeys.includes(value)) return fail(line, `there is no drawing called "${value}". Choose from: ${options.artKeys.join(', ')}.`);
          block.art = value;
          return;
        }
        if (key === 'text') {
          if (!card) return fail(line, '"text:" has to be inside a SCENE, FINALE, EVENT or RIVAL.');
          return addText(card, 'text', tone, value);
        }
        if (!choice) return fail(line, `"${key}:" has to come under a choice line that starts with ">".`);
        if (key === 'gives') {
          if (!choice.deal) return fail(line, '"gives:" only belongs under a Deal choice.');
          choice.deal = parseGives(value, (m) => fail(line, m));
          return;
        }
        if (key === 'then') {
          if (!choice.deal) return fail(line, '"then:" only belongs under a Deal choice. Rolls use "win:" and "lose:".');
          return addText(choice, 'win', tone, value);
        }
        if (choice.deal) return fail(line, `a Deal has no "${key}:". Use "gives:" and "then:".`);
        return addText(choice, key, tone, value);
      }

      // Anything else is scene text.
      if (!card) return fail(line, 'this text is not inside a SCENE, FINALE, EVENT or RIVAL.');
      if (choice) return fail(line, 'cannot read this line. Under a choice, lines start with "win:", "lose:", "gives:" or "then:".');
      addText(card, 'text', null, s);
    });
    finishBlock();
  }
  return { quests, scenes, events, rivals, art, errors };
};

export const renderStories = (parsed) =>
  '// GENERATED from stories/*.txt by "npm run stories". Do not edit by hand: edit the story files.\n' +
  "import type { Card, Objective } from '../types';\n\n" +
  `/** New quests written in story files. */\nexport const PACK_QUESTS: Objective[] = ${JSON.stringify(parsed.quests, null, 2)};\n\n` +
  `/** Scenes that belong to one quest, played before its finale. Keyed by quest id. */\nexport const PACK_SCENES: Record<string, Card[]> = ${JSON.stringify(parsed.scenes, null, 2)};\n\n` +
  `/** Road events that can turn up in any quest. */\nexport const PACK_EVENTS: Card[] = ${JSON.stringify(parsed.events, null, 2)};\n\n` +
  `/** Encounters with the season's rival. */\nexport const PACK_RIVALS: Card[] = ${JSON.stringify(parsed.rivals, null, 2)};\n\n` +
  `/** Which drawing illustrates each story card. */\nexport const PACK_ART: Record<string, string> = ${JSON.stringify(parsed.art, null, 2)};\n`;
