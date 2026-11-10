# Side Quest Simulator

A fast, choice-driven roguelike for iOS and Android. Pick a class, an ancestry and a
regrettable quirk, take absurd jobs from the quest board, and roll a d20 against your six
stats until you retire a legend or die doing something undignified. Runs last two to ten
minutes.

Built with Expo (React Native, TypeScript). One codebase for both stores.

## Run it

```bash
npm install
```

```bash
npm run web
```

The web build and Expo Go use simulated ads (the reward is simply granted). Real ads need a
development build, because the ad SDK is native code:

```bash
npx eas-cli@latest build --profile development --platform android
```

## Check it

```bash
npm test
```

```bash
npm run typecheck
```

`npm test` includes a balance simulation that plays thousands of runs per class and prints
average quests, win rate and tips, so difficulty changes can be measured rather than guessed.

## How it earns

Rewarded ads only, always the player's choice:

| Placement | Where | Reward |
| --- | --- | --- |
| `blessing` | Hero creation | Start with a relic, a luck token and 20 gold |
| `revive` | Death screen | Return at half health, once per run |
| `doubleTips` | End of run | Double the permanent currency earned |

## Before a store release

1. Create an AdMob account, register the iOS and Android apps, and create three rewarded ad
   units per platform.
2. Replace the two sample app ids in `app.json` (the `react-native-google-mobile-ads` plugin).
   They are currently Google's public test app ids.
3. Paste the ad unit ids into `src/services/adConfig.ts`. While they are empty, or in any
   development build, Google's test units are used.
4. Confirm the bundle identifier and Android package in `app.json`.
5. Set up a consent message in AdMob (Privacy and messaging) for the EEA and UK; the app
   already requests it on launch.
6. Rate the app for its strongest content. The Crude tone setting contains mild swearing, so
   answer the store age-rating questionnaires accordingly, or remove that option.
7. Replace the placeholder icon and splash art in `assets/`.

Never tap your own live ads. AdMob suspends accounts for it.

## Layout

- `src/game/` rules and content, pure TypeScript with no UI imports
  - `engine.ts` run state machine: board, cards, d20 checks, boons, death, revive
  - `meta.ts` tips, upgrades, class unlocks, journal
  - `content/` classes, ancestries, quirks, relics, quests, twists and road events
- `src/services/` storage and ads (`ads.native.ts` is the real AdMob integration)
- `src/ui/` screens and the small component kit
- `App.tsx` screen flow

## Adding content

Add a road event to `src/game/content/cards.ts` or a quest to `content/quests.ts`; the tests
check ids are unique and each choice on a card uses a different stat. Any text can carry
tone variants: `{ f: 'family', c: 'cheeky', x: 'crude' }`.
