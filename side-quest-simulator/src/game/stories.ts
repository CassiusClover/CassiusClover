import { STORIES, RIVAL_SCENES } from './content/stories.generated';
import type { Card, Choice, QuestStory, RunState, StoryScene } from './types';

export const storiesFor = (objective: string) => STORIES.filter((s) => s.objective === objective);
export const storyOf = (objective: string, id?: string): QuestStory | undefined =>
  storiesFor(objective).find((s) => (s.id ?? s.objective) === (id ?? objective));
export const STORY_CARDS: StoryScene[] = [...STORIES.flatMap((s) => s.scenes), ...RIVAL_SCENES];
export const storyCard = (id: string) => STORY_CARDS.find((s) => s.id === id);
export const hasFlag = (run: RunState, flag: string) => (run.quest?.flags?.includes(flag) || run.storyFlags?.includes(flag)) ?? false;
export const choiceUnlocked = (run: RunState, choice: Choice) => !choice.requires || hasFlag(run, choice.requires);
export const canAfford = (run: RunState, choice: Choice) =>
  !choice.deal || (run.gold >= choice.deal.gold && run.luck >= (choice.deal.luck ?? 0));
export const canChoose = (run: RunState, choice: Choice) => choiceUnlocked(run, choice) && canAfford(run, choice);

export const nextScene = (card: Card, flags: string[]): string | undefined =>
  (card as StoryScene).next?.find((n) => !n.when || flags.includes(n.when))?.scene;

export const storyRoute = (entry: string, flags: string[]): string[] => {
  const route: string[] = [];
  let key: string | undefined = entry;
  while (key && !route.includes(key) && route.length < 3) {
    const card = storyCard(key);
    if (!card) break;
    route.push(key);
    key = nextScene(card, flags);
  }
  return route;
};

export const choiceConsequence = (choice: Choice): string => {
  const parts: string[] = [];
  if (choice.deal) {
    parts.push(choice.deal.gold ? `Costs ${choice.deal.gold} gold` : 'No gold cost');
    if (choice.deal.luck) parts.push(`Costs ${choice.deal.luck} luck`);
    parts.push('No roll, no gold prize');
  }
  if (choice.hint) parts.push(choice.hint);
  return parts.join('  |  ');
};
