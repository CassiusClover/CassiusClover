const STATS = new Set(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']);
const RISKS = new Set(['safe', 'bold', 'reckless']);
const id = (v) => typeof v === 'string' && /^[a-z][a-z0-9-]*$/.test(v);
const object = (v) => v && typeof v === 'object' && !Array.isArray(v);

/** Content is data, never executable code. Errors include a path the author can find. */
export function validatePacks(packs) {
  const stories = [], rivals = [], extraObjectives = [], errors = [], ids = new Set(), storyIds = new Set(), objectiveIds = new Set();
  const check = (ok, at, message) => { if (!ok) errors.push(`${at}: ${message}`); };
  const text = (v, at) => {
    const plain = (val) => typeof val === 'string' && !!val.trim() && val.length <= 1200;
    const language = (val) => plain(val) || object(val) && plain(val.f) &&
      Object.entries(val).every(([key, line]) => ['f', 'c', 'x'].includes(key) && plain(line));
    const valid = language(v) || object(v) && plain(v.f) && Object.entries(v).every(([key, val]) =>
      key === 'v' ? object(val) && Object.entries(val).every(([level, words]) => ['cartoon', 'gritty', 'brutal'].includes(level) && language(words)) : ['f', 'c', 'x'].includes(key) && plain(val));
    check(valid, at, 'use text or { f, c, x }, with optional v: { cartoon, gritty, brutal } text variants');
  };
  const effect = (v, at) => {
    if (v === undefined) return;
    check(object(v), at, 'expected an effect object');
    if (!object(v)) return;
    check(Object.keys(v).every((k) => ['flag', 'momentum', 'memory'].includes(k)), at, 'unknown effect field');
    if (v.flag !== undefined) check(id(v.flag), at, 'flag must be a lowercase slug');
    if (v.momentum !== undefined) check(Number.isInteger(v.momentum) && Math.abs(v.momentum) <= 1, at, 'momentum must be -1, 0 or 1');
    if (v.memory !== undefined) text(v.memory, `${at}.memory`);
  };
  const choices = (list, at) => {
    check(Array.isArray(list) && list.length >= 1 && list.length <= 5, at, 'provide one to five choices');
    for (const [i, c] of (Array.isArray(list) ? list : []).entries()) {
      const here = `${at}[${i}]`;
      if (!object(c)) { check(false, here, 'expected a choice object'); continue; }
      for (const key of ['label', 'win', 'lose']) text(c[key], `${here}.${key}`);
      check(STATS.has(c.stat), here, 'stat must be STR, DEX, CON, INT, WIS or CHA');
      check(RISKS.has(c.risk), here, 'risk must be safe, bold or reckless');
      if (c.hint !== undefined) check(typeof c.hint === 'string' && !!c.hint.trim(), here, 'hint must be text');
      if (c.requires !== undefined) check(id(c.requires), here, 'requires must name a flag');
      if (c.deal !== undefined) check(object(c.deal) && Object.keys(c.deal).every((k) => ['gold', 'luck'].includes(k)) &&
        Number.isInteger(c.deal.gold) && c.deal.gold >= 0 && c.deal.gold <= 300 &&
        (c.deal.luck === undefined || Number.isInteger(c.deal.luck) && c.deal.luck >= 0 && c.deal.luck <= 3), here, 'deal needs a non-negative integer gold cost (0–300) and optional luck cost (0–3)');
      effect(c.onWin, `${here}.onWin`);
      effect(c.onLose, `${here}.onLose`);
    }
  };
  const scene = (s, at) => {
    if (!object(s)) { check(false, at, 'expected a scene object'); return; }
    check(id(s.id) && !s.id.startsWith('x-'), at, 'scene id must be a lowercase slug, without the reserved x- prefix');
    check(!ids.has(s.id), at, `duplicate scene id ${s.id}`); ids.add(s.id);
    text(s.text, `${at}.text`);
    check(object(s.text) && ['f', 'c', 'x'].every((key) => typeof s.text[key] === 'string') &&
      new Set([s.text.f, s.text.c, s.text.x]).size === 3, `${at}.text`, 'scene text needs distinct f, c and x language versions');
    check(typeof s.art === 'string' && !!s.art, at, 'art must name an existing card or objective id');
    choices(s.choices, `${at}.choices`);
    check(Array.isArray(s.choices) && s.choices.filter((c) => c && !c.requires && !c.deal).length >= 1, at, 'keep at least one unconditional roll so a broke hero can continue');
    if (s.next !== undefined) {
      check(Array.isArray(s.next) && s.next.length > 0, at, 'next must be a non-empty list');
      if (Array.isArray(s.next)) {
        check(s.next.filter((n) => n && n.when === undefined).length === 1 && s.next.at(-1)?.when === undefined, at, 'end next with exactly one unconditional fallback');
        for (const n of s.next) check(object(n) && id(n.scene) && (n.when === undefined || id(n.when)), at, 'next entries need a scene id and optional when flag');
      }
    }
  };
  for (const [file, pack] of packs) {
    if (!object(pack) || pack.version !== 1 || !Array.isArray(pack.stories)) { errors.push(`${file}: expected version 1 and a stories array`); continue; }
    for (const [i, o] of (pack.objectives ?? []).entries()) {
      const at = `${file}.objectives[${i}]`;
      if (!object(o)) { errors.push(`${at}: expected an objective`); continue; }
      check(id(o.id) && !objectiveIds.has(o.id), at, 'use a unique objective id'); objectiveIds.add(o.id);
      text(o.title, `${at}.title`); text(o.task, `${at}.task`);
      check(typeof o.art === 'string' && !!o.art, at, 'art must name an existing objective');
      check(object(o.climax) && o.climax.id === `x-${o.id}`, at, 'climax id must be x- followed by the objective id');
      if (object(o.climax)) { text(o.climax.text, `${at}.climax.text`); choices(o.climax.choices, `${at}.climax.choices`); }
      extraObjectives.push(o);
    }
    for (const [i, story] of pack.stories.entries()) {
      const at = `${file}.stories[${i}]`;
      if (!object(story) || !Array.isArray(story.scenes)) { errors.push(`${at}: expected a story with scenes`); continue; }
      check(id(story.objective), at, 'objective must be an existing objective id');
      const storyId = story.id ?? story.objective;
      check(id(storyId) && !storyIds.has(storyId), at, `duplicate or invalid story id ${storyId}`); storyIds.add(storyId);
      for (const [j, s] of story.scenes.entries()) scene(s, `${at}.scenes[${j}]`);
      if (story.finaleChoices) choices(story.finaleChoices, `${at}.finaleChoices`);
      const map = new Map(story.scenes.filter(object).map((s) => [s.id, s]));
      check(map.has(story.entry), at, 'entry must name a scene in this story');
      const flags = new Set(story.scenes.flatMap((s) => (s?.choices ?? []).flatMap((c) => [c?.onWin?.flag, c?.onLose?.flag]).filter(Boolean)));
      for (const s of story.scenes.filter(object)) {
        for (const c of s.choices ?? []) if (c?.requires) check(flags.has(c.requires) || c.requires.startsWith('season-'), at, `unknown flag ${c.requires}`);
        for (const n of s.next ?? []) {
          check(map.has(n?.scene), at, `unknown next scene ${n?.scene}`);
          if (n?.when) check(flags.has(n.when) || n.when.startsWith('season-'), at, `unknown flag ${n.when}`);
        }
      }
      for (const c of story.finaleChoices ?? []) if (c?.requires) check(flags.has(c.requires), at, `unknown finale flag ${c.requires}`);
      const visited = new Set();
      const walk = (key, path) => {
        if (path.includes(key)) { errors.push(`${at}: cycle at ${key}`); return; }
        if (path.length >= 3) { errors.push(`${at}: keep each route to at most three scenes before the finale`); return; }
        const s = map.get(key); if (!s) return;
        visited.add(key);
        for (const n of s.next ?? []) walk(n.scene, [...path, key]);
      };
      walk(story.entry, []);
      for (const key of map.keys()) check(visited.has(key), at, `unreachable scene ${key}`);
      stories.push(story);
    }
    for (const [i, s] of (pack.rivals ?? []).entries()) { scene(s, `${file}.rivals[${i}]`); rivals.push(s); }
  }
  const allScenes = [...stories.flatMap((s) => s.scenes), ...rivals];
  const seasonFlags = new Set(allScenes.flatMap((s) => (s.choices ?? []).flatMap((c) => [c?.onWin?.flag, c?.onLose?.flag]).filter(Boolean)));
  for (const s of allScenes) for (const flag of [...(s.next ?? []).map((n) => n.when), ...(s.choices ?? []).map((c) => c.requires)]) {
    if (flag?.startsWith('season-')) check(seasonFlags.has(flag), s.id, `unknown season flag ${flag}`);
  }
  if (errors.length) throw new Error(errors.join('\n'));
  return { stories, rivals, extraObjectives };
}
