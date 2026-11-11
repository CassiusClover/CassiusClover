# Side Quest Simulator

A fast, choice-driven roguelike for iOS and Android. Pick a class, an ancestry and a
regrettable quirk, take absurd jobs from the quest board, and roll a d20 against your six
stats until you retire a legend or die doing something undignified. A sardonic Dungeon
Master narrates each run: a ten-quest race against a rival for Hero of the Year, ending in
a showdown. Runs last two to ten minutes.

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

## Build for a phone

Cloud builds (both platforms) use EAS and need a one-time link to an Expo account:

```bash
npx eas-cli@latest init
```

```bash
npx eas-cli@latest build --profile preview --platform android
```

```bash
npx eas-cli@latest device:create
```

```bash
npx eas-cli@latest build --profile development --platform ios
```

`device:create` registers an iPhone for test installs; the iOS build then asks for the Apple
Developer login. The `preview` profile gives a standalone app, `development` a dev client that
loads code from `npx expo start`.

An Android APK can also be compiled locally with the Android SDK and JDK 17 installed:

```bash
npx expo prebuild --platform android
```

```bash
cd android && ./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a
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

## The AI Dungeon Master

The Dungeon Master is scripted by default (`src/game/content/dm.ts`). Players can switch on
an AI version in Settings, which runs a small language model on the phone itself with
`llama.rn`: no server, no API key, nothing leaves the device, and it works offline.

- The model is a one-off download chosen in Settings: Apprentice (Qwen2.5 0.5B, 469 MB) or
  Archmage (Qwen2.5 1.5B, 1.1 GB), both Apache-2.0. The catalogue is `src/services/dmModels.ts`.
- The model reacts to the current scene and the choice you actually made, with recent
  accepted decisions as callbacks (`src/services/dmPrompt.ts`). Each request asks for one
  short line. Obsolete queued requests are skipped and late replies cannot affect another
  scene or hero. If the model is missing, slow or produces junk, authored narration carries on.
- It needs a real build. On web and in Expo Go the setting explains that it is unavailable.

## Language and violence settings

Language (Clean/Cheeky/Crude) and violence descriptions (Cartoon/Gritty/Brutal) are independent.
Both are available at first launch and in Settings, with a live example. They affect the
current adventure immediately and persist across restarts. All 50 story/rival scene bodies
and every scripted narrator event have authored language alternatives. Violence changes
injury, blood-specific passages and defeat wording. Dice, HP damage, rewards, art and quest
outcomes stay the same. Existing progress is kept; older saves default to Cartoon violence.

The native AI receives both preferences and the same selected text, injury and memory
context. Common violations are rejected in favour of authored narration; the word guard is
not a complete semantic content filter. AI writing quality and device performance still
need phone testing. These controls also work in the browser with the AI switched off.

## Artwork

The original angular SVG figures now stage 19 quest comic panels, six extra scene variants
and rival encounters. Quest givers and rivals have recurring portraits; heroes react to
triumphs and disasters. Flat colours, heavy shadows and simple props keep the original look.
See [the art guide](docs/ART_GUIDE.md) and [art samples](docs/artwork-preview.png).

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
6. Review included content before store release: Crude includes strong swearing, and Brutal
   includes bloody injury and death descriptions.
7. Replace the placeholder icon and splash art in `assets/`.

Never tap your own live ads. AdMob suspends accounts for it.

## Layout

- `src/game/` rules and content, pure TypeScript with no UI imports
  - `engine.ts` run state machine: board, cards, d20 checks, boons, death, revive
  - `meta.ts` tips, upgrades, class unlocks, journal
  - `content/` classes, ancestries, quirks, relics, quests, twists, road events and the
    Dungeon Master's lines (`dm.ts`)
- `src/services/` storage, ads (`ads.native.ts` is the real AdMob integration) and the
  on-device Dungeon Master (`localDm.native.ts`)
- `src/art/` comic-ink vector art for heroes and cards
- `src/ui/` screens, the component kit, motion effects (`fx.tsx`: the d20 roll, DM speech)
  and the season tracker (`tracker.tsx`)
- `App.tsx` screen flow

## Adding content

Read [the story guide](docs/STORY_GUIDE.md) and copy `stories/TEMPLATE.json.example` to
`stories/my-story.json`. Add whole new jobs or replay variants without editing game code.
Run `npm run stories:build`, `npm test` and `npm run typecheck`, then restart the preview.

The packs contain 19 jobs, 22 story versions, 47 scenes and three direct rival encounters.
Choices can unlock branches and finale approaches, spend gold in guaranteed deals, change
finale preparation, and leave factual callbacks in the season log. A road truce can unlock
a joint-trophy ending. Existing meta progress and old active saves remain compatible.

`npm run lint` checks the source; `npm run stories:check` checks generated content is current.
