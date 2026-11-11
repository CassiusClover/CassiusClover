import { describe, expect, it } from 'vitest';
import { artForObjective } from '../art/creatures';
import { dmMomentMessages } from '../services/dmPrompt';
import { OBJECTIVES } from './content/quests';
import { STORIES, RIVAL_SCENES } from './content/stories.generated';
import { applyAiNarration, bribe, canReroll, cardOf, checkInfo, choose, clearAiNarration, currentCard, dmMomentContext,
  narrationKey, newRun, pickQuest, proceed, revive } from './engine';
import { defaultMeta } from './meta';
import { canChoose, choiceUnlocked, storyOf, storyRoute } from './stories';
import type { RunState } from './types';

const quest = (objective = 'dragon-tax', gold = 40): RunState => {
  const run = newRun(defaultMeta(), { classId: 'wizard', ancestryId: 'human', quirkId: 'whistle' }, 42);
  run.gold = gold;
  run.board[0] = { objectiveId: objective, giverId: 'guild', tier: 1, twistId: 'none' };
  const picked = pickQuest(run, 0);
  picked.quest!.storyId = objective;
  picked.quest!.cards = [...storyRoute(storyOf(objective)!.entry, []), `x-${objective}`];
  return picked;
};

describe('authored stories', () => {
  it('covers every objective and resolves all scenes and artwork', () => {
    expect([...new Set(STORIES.map((s) => s.objective))].sort()).toEqual(OBJECTIVES.map((o) => o.id).sort());
    for (const scene of [...STORIES.flatMap((s) => s.scenes), ...RIVAL_SCENES]) {
      expect(cardOf(scene.id).id).toBe(scene.id);
      expect(artForObjective(scene.art!), scene.id).toBeDefined();
      expect(scene.choices.some((c) => !c.requires && !c.deal)).toBe(true);
    }
    expect(new Set(STORIES.map((s) => storyRoute(s.entry, []).length)).size).toBeGreaterThan(1);
  });

  it('deals more than one authored version of repeated jobs across seeds', () => {
    const seen = new Set<string>();
    for (let seed = 1; seed < 40; seed++) {
      const run = newRun(defaultMeta(), { classId: 'fighter', ancestryId: 'human', quirkId: 'whistle' }, seed);
      run.board[0] = { objectiveId: 'dragon-tax', giverId: 'guild', tier: 1, twistId: 'none' };
      seen.add(pickQuest(run, 0).quest!.storyId!);
    }
    expect(seen).toEqual(new Set(['dragon-tax', 'dragon-offshore']));
  });

  it('a paid receipt changes the next scene and unlocks a finale approach', () => {
    let run = quest();
    expect(currentCard(run)!.id).toBe('tax-receipts');
    const before = run.gold, rng = run.rng;
    run = choose(run, 1);
    expect(run.result!.outcome).toBe('deal');
    expect(run.gold).toBe(before);
    expect(run.rng).toBe(rng);
    expect(canReroll(run)).toBe(false);
    run = proceed(run);
    expect(run.gold).toBe(before - 15);
    expect(proceed(run)).toBe(run);
    expect(currentCard(run)!.id).toBe('tax-auditor');
    expect(run.quest!.firstRollDone).toBe(false);
    run = proceed(bribe(run));
    const final = currentCard(run)!;
    expect(final.id).toBe('x-dragon-tax');
    expect(final.choices.filter((c) => choiceUnlocked(run, c)).map((c) => c.label)).toContain('Submit the fireproof duplicate with everything itemised');
    const other = proceed(bribe(quest()));
    expect(currentCard(other)!.id).toBe('tax-ashes');
    expect(other.quest!.flags).not.toContain('receipts');
  });

  it('rejects unaffordable, locked and malformed choices without consuming randomness', () => {
    const poor = quest('dragon-tax', 0);
    expect(choose(poor, 1)).toBe(poor);
    expect(choose(poor, -1)).toBe(poor);
    expect(choose(poor, 500)).toBe(poor);
    expect(choose(poor, 0.5)).toBe(poor);
    const showdown = quest('showdown');
    expect(choose(showdown, 0)).toBe(showdown);
    expect(currentCard(poor)!.choices.some((c) => canChoose(poor, c))).toBe(true);
  });

  it('applies preparation only to the finale and caps it', () => {
    let run = quest();
    const choice = currentCard(run)!.choices[0];
    const base = checkInfo(run, choice).bonus;
    run.quest!.momentum = 2;
    expect(checkInfo(run, choice).bonus).toBe(base);
    run.quest!.cardIdx = run.quest!.cards.length - 1;
    const final = currentCard(run)!.choices[0];
    const boosted = checkInfo(run, final).bonus;
    run.quest!.momentum = 0;
    expect(checkInfo(run, final).bonus).toBe(boosted - 2);
    run = quest();
    run.quest!.momentum = 2;
    run = choose(run, 0);
    run.result!.storyEffect = { momentum: 1, memory: 'Verified consequence.' };
    run.result!.dmg = 0;
    run = proceed(run);
    expect(run.quest!.momentum).toBe(2);
  });

  it('only remembers the accepted result and keeps it through save/resume', () => {
    const run = choose(quest(), 1);
    expect(run.decisions).toEqual([]);
    const accepted = proceed(JSON.parse(JSON.stringify(run)));
    expect(accepted.decisions).toHaveLength(1);
    expect(accepted.decisions![0].memory).toContain('emergency duplicate');
    expect(accepted.quest!.flags).toContain('receipts');
  });

  it('supports old active saves without the new story fields', () => {
    const run = quest();
    delete run.id; delete run.decisions; delete run.storyFlags;
    delete run.quest!.flags; delete run.quest!.momentum;
    const resumed = proceed(choose(JSON.parse(JSON.stringify(run)), 1));
    expect(resumed.quest!.flags).toContain('receipts');
    expect(resumed.decisions).toHaveLength(1);
  });

  it('puts the rival in person on three season milestones', () => {
    for (const [i, stage] of [2, 5, 8].entries()) {
      const run = newRun(defaultMeta(), { classId: 'fighter', ancestryId: 'human', quirkId: 'whistle' }, 3);
      run.questIndex = stage;
      expect(pickQuest(run, 0).quest!.cards).toContain(RIVAL_SCENES[i].id);
    }
  });

  it('a remembered road truce enables the joint trophy ending', () => {
    let run = quest('showdown', 100);
    run.storyFlags = ['season-rival-truce'];
    expect(choiceUnlocked(run, currentCard(run)!.choices[0])).toBe(true);
    run = proceed(choose(run, 0));
    expect(currentCard(run)!.id).toBe('showdown-truce');
    run = proceed(bribe(run));
    const choice = currentCard(run)!.choices.findIndex((c) => c.requires === 'shared-trophy');
    expect(choice).toBeGreaterThan(0);
    run.questIndex = 9; run.questsDone = 9;
    run = choose(run, choice);
    run.result = { ...run.result!, outcome: 'success', dmg: 0, storyEffect: currentCard(run)!.choices[choice].onWin };
    run = proceed(run);
    expect(run.phase).toBe('victory');
    expect(run.epitaph).toContain('Joint Heroes');
    expect(run.history.at(-1)!.memories!.some((m) => String(m).includes('joint Heroes'))).toBe(true);
  });

  it('does not apply bargain costs a second time when reviving', () => {
    let run = proceed(choose(quest(), 1));
    const gold = run.gold;
    run = choose(run, 0);
    run.result!.dmg = run.hero.hp;
    run = proceed(run);
    expect(run.phase).toBe('dead');
    const back = revive(run);
    expect(back.gold).toBe(gold + run.result!.gold);
    expect(back.decisions).toHaveLength(2);
  });
});

describe('reactive dungeon master', () => {
  it('clears a saved AI reply on tone/model changes without changing the adventure', () => {
    const run = quest();
    const narrated = applyAiNarration(run, narrationKey(run), { line: 'The accountant has strong opinions about your biscuit tin.' });
    const cleared = clearAiNarration(narrated);
    expect(cleared.liveNarrationKey).toBeUndefined();
    expect(cleared.ai).toBeNull();
    expect(cleared.narration).not.toBe(narrated.narration);
    expect(cleared.quest).toEqual(run.quest);
    expect(cleared.rng).toBe(run.rng);
    expect(clearAiNarration(run)).toBe(run);
  });
  it('gets the actual choice, accepted memories, and authored consequence', () => {
    let run = proceed(choose(quest(), 1));
    run = choose(run, 0);
    const ctx = dmMomentContext(run, 0);
    expect(ctx.action).toBe('Reclassify the village as dependent relatives');
    expect(ctx.memories[0]).toContain('emergency duplicate');
    const messages = dmMomentMessages(ctx);
    expect(messages[0].content).toContain('Do not invent');
    expect(messages[1].content).toContain(ctx.consequence);
    expect(messages.map((m) => m.content).join('').length).toBeLessThan(4500);
  });

  it('accepts only valid replies for the current scene and hero', () => {
    const run = quest(), key = narrationKey(run);
    expect(applyAiNarration(run, key, { line: 'The biscuit-tin accountant has filed your confidence under combustible materials.' }).liveNarrationKey).toBe(key);
    for (const raw of [null, {}, { line: 1 }, { line: 'Hi' }, { line: '<script>bad</script>' }, { line: 'a'.repeat(241) }]) expect(applyAiNarration(run, key, raw)).toBe(run);
    const moved = choose(run, 0);
    expect(applyAiNarration(moved, key, { line: 'A late line that should be discarded.' })).toBe(moved);
    const other = { ...run, id: 'another-hero' };
    expect(applyAiNarration(other, key, { line: 'A late line for the previous hero.' })).toBe(other);
    expect(choose(applyAiNarration(run, key, { line: 'A concrete biscuit tin refuses to open.' }), 0).liveNarrationKey).toBeUndefined();
  });
});
