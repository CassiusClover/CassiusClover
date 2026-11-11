import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { validatePacks } from './story-format.mjs';

const source = () => JSON.parse(readFileSync(new URL('../stories/TEMPLATE.json.example', import.meta.url), 'utf8'));
const compile = (pack) => validatePacks([['test.json', pack]]);

describe('story authoring validation', () => {
  it('accepts the complete copy-and-edit template, including a new objective', () => {
    const result = compile(source());
    expect(result.extraObjectives).toHaveLength(1);
    expect(result.stories).toHaveLength(1);
  });
  it('identifies duplicate ids and unsupported stats', () => {
    const pack = source();
    pack.stories[0].scenes.push(structuredClone(pack.stories[0].scenes[0]));
    pack.stories[0].scenes[0].choices[0].stat = 'VIBES';
    expect(() => compile(pack)).toThrow(/duplicate scene id/);
    expect(() => compile(pack)).toThrow(/stat must/);
  });
  it('rejects negative costs, unaffordable-only scenes, and missing references', () => {
    const pack = source();
    const scene = pack.stories[0].scenes[0];
    scene.choices.forEach((c) => { c.deal = { gold: -1 }; });
    scene.next = [{ scene: 'nonexistent' }];
    expect(() => compile(pack)).toThrow(/non-negative integer/);
    expect(() => compile(pack)).toThrow(/unconditional roll/);
    expect(() => compile(pack)).toThrow(/unknown next scene/);
  });
  it('catches cycles, unreachable scenes, and missing fallback routes', () => {
    const pack = source(), entry = pack.stories[0].scenes[0];
    entry.next = [{ when: 'made-up', scene: entry.id }];
    expect(() => compile(pack)).toThrow(/cycle/);
    expect(() => compile(pack)).toThrow(/unreachable scene/);
    expect(() => compile(pack)).toThrow(/unconditional fallback/);
    expect(() => compile(pack)).toThrow(/unknown flag/);
  });
  it('requires language alternatives and validates independent violence variants', () => {
    const pack = source();
    pack.stories[0].scenes[0].text = { f: 'Clean.', c: 'Cheeky.', x: 'Crude.', v: { gritty: { f: 'A cut.', c: 'An embarrassing cut.', x: 'A bloody nuisance of a cut.' } } };
    expect(() => compile(pack)).not.toThrow();
    pack.stories[0].scenes[0].text.v.graphic = 'Unknown level';
    expect(() => compile(pack)).toThrow(/cartoon, gritty, brutal/);
    pack.stories[0].scenes[0].text = 'One unchanging scene.';
    expect(() => compile(pack)).toThrow(/distinct f, c and x/);
  });
});
