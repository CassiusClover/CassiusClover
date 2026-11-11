// Usage: npm run stories
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseStories, renderStories } from './stories.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'stories');
const files = readdirSync(dir)
  .filter((f) => f.endsWith('.txt') && f !== 'TEMPLATE.txt')
  .sort()
  .map((name) => ({ name: `stories/${name}`, text: readFileSync(join(dir, name), 'utf8') }));

// The drawings available, read from the art file.
const artSource = readFileSync(join(root, 'src/art/creatures.ts'), 'utf8');
const artKeys = [...artSource.matchAll(/^  ([a-z]+): (?:piece|knight)\(/gm)].map((m) => m[1]);

const parsed = parseStories(files, { artKeys });
if (parsed.errors.length) {
  console.error(`\nThe stories have ${parsed.errors.length} problem(s):\n`);
  for (const e of parsed.errors) console.error(`  ${e}`);
  console.error('\nNothing was changed. Fix these and run "npm run stories" again.\n');
  process.exit(1);
}
writeFileSync(join(root, 'src/game/content/packs.generated.ts'), renderStories(parsed));
const sceneCount = Object.values(parsed.scenes).reduce((n, list) => n + list.length, 0);
console.log(`Stories built: ${parsed.quests.length} new quests, ${sceneCount} quest scenes, ${parsed.events.length} road events, ${parsed.rivals.length} rival encounters.`);
