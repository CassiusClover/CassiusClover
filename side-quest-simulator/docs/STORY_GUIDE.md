# Writing Side Quest Simulator stories

Start with `stories/TEMPLATE.json.example`. Copy it to `stories/my-story.json`, edit the text and ids, and run:

```sh
npm run stories:build
npm test
npm run typecheck
npm run web
```

No game code needs editing. Every `.json` file in `stories/` is compiled into the game. Restart the preview after compiling. Commit the JSON and generated `src/game/content/stories.generated.ts` together. `npm test` checks that generated content is current.

The shipped packs provide 19 jobs, 22 story versions, 47 quest scenes and three rival encounters. The `.example` template is not included until you copy it to a `.json` file.

## What makes a story work

Give an absurd situation an ordinary emotional problem. Gregory is soup, but wants his family safe. The rival is boastful in public, but cannot open a lunch tin in private. Let consequences change a later scene or provide a new way to finish the job.

Use this outline before writing JSON:

1. **Job:** A concrete task and an absurd obstacle.
2. **Opening:** Someone wants something. The hero chooses an approach.
3. **Change:** A real clue, relationship, obligation or complication follows the choice.
4. **Follow-up:** Show that change, using `next` conditions if useful.
5. **Finale:** Cash out the clue or relationship. Include an earned option where appropriate.
6. **Callback:** One factual sentence the Dungeon Master can remember.

Keep each route to one to three scenes before the finale. Short jobs, longer jobs and bargains produce different rhythms. Keep at least one roll available to a hero with no gold or luck.

## A new job

The template includes an `objectives` entry. Give it a unique `id`, `title`, `task`, `art` and `climax`. The climax id must be `x-` followed by the objective id. The matching story's `objective` must equal that id.

New jobs appear among the procedural board offers. The tenth posting remains the rival showdown. Givers and quest twists are mixed in automatically.

Reuse an existing illustration with `art`: for example `dragon-tax`, `lich-eviction`, `kings-sock`, `soup`, `goblin-union`, `library-book`, `kraken`, `parade`, `password` or `showdown`. This selects an existing illustration; it does not generate new art.

## Another version of an existing job

Omit `objectives`. Give the story an existing `objective`, plus a unique `id`, for example:

```json
{"version":1,"stories":[{"id":"dragon-my-new-version","objective":"dragon-tax","entry":"my-opening","scenes":[]}]}
```

Replace the empty `scenes` with your actual scenes. The engine picks between versions when the job is accepted. `extra-trouble.json` contains complete examples. Every scene id must be unique across all packs; prefixing ids with the story name helps.

## Scene and choice fields

| Field | Meaning |
| --- | --- |
| `id` | Unique lowercase slug, such as `invoice-interview`. |
| `text` | What the player sees before choosing. Scene bodies require distinct `f`, `c`, `x` language versions. |
| `art` | Existing objective illustration to reuse. |
| `choices` | Two to five approaches, with at least one affordable, unconditional roll. |
| `next` | Optional list of conditional next scenes. No `next` means proceed to the finale. |
| `label` | Short action written as a verb. |
| `stat` | `STR`, `DEX`, `CON`, `INT`, `WIS` or `CHA`. Deals still need a stat for compatibility; it is not rolled. |
| `risk` | `safe`, `bold` or `reckless`. Sets normal check difficulty, gold and failure damage. |
| `win` / `lose` | The actual consequence. Name the prop or character; avoid generic success/failure lines. |
| `hint` | Optional visible preview of the consequence. |
| `deal` | Optional `{ "gold": 15 }`, with optional `"luck": 1`. Guaranteed, no dice and no normal roll prize. Costs apply when the player accepts the result. |
| `onWin` / `onLose` | Optional consequences: `flag`, `momentum`, `memory`. A deal uses `onWin`. |
| `requires` | Hide an option until this flag is earned. Useful for `finaleChoices`. |

Preparation (`momentum`) is -1, 0 or +1 per consequence, limited to -2 through +2 per quest. It changes only the final check. It resets for the next job. A flag is quest-local unless its name begins `season-`; those flags survive for this run. Nothing here permanently alters other runs.

A memory must report an event that actually happened, such as “You bought the dragon's emergency duplicate.” It should not be a command to the AI. Memories are committed after accepting the result, retained in the season log and supplied to the on-device narrator. Rejected rolls leave no memories.

## Branching

```json
"next": [
  { "when": "invoice-evidence", "scene": "invoice-hearing" },
  { "scene": "invoice-basement" }
]
```

The first matching condition wins. Always put exactly one unconditional fallback last. Every target must exist in the same story, every scene must be reachable, and routes must not loop. There is no special `finale` target: leave off `next` to reach the objective's climax. At quests three, six and nine, the game inserts the rival before the climax.

Use `finaleChoices` on the story for earned approaches. The template demonstrates a receipt flag unlocking an evidence-based ending. Keep at least one unconditional finale approach so every route remains playable.

## Language and violence

Settings offer two independent controls: Clean/Cheeky/Crude language and Cartoon/Gritty/Brutal violence descriptions. All 50 shipped quest and rival scene bodies have authored language alternatives. The scripted narrator also has alternatives for every event, including saved adventures and the final showdown.

Scene `text` must have distinct versions:

```json
{"f":"The clerk is deeply unhelpful.","c":"The clerk has made obstruction a remarkably confident career choice.","x":"The clerk is a professionally unhelpful bastard and knows it."}
```

Other fields (`label`, `win`, `lose`, `title`, `task`, `memory`) may still use a plain string for a fact or an action that does not need different language. `f` means Clean; the old key is retained for compatibility. Missing stronger variants on these optional fields fall back to gentler text. Do not add profanity to every label merely to make a button change.

When a passage itself describes blood or wounds, use `v` overrides. Each override can be plain text or its own `{ f, c, x }` object, so Clean + Brutal and Crude + Cartoon both work:

```json
{
  "f": "The clerk stamps your form. The stamp is ominously red.",
  "c": "The clerk stamps your form with enough force to suggest a personal grievance.",
  "x": "The bastard stamps your form like the desk owes him money.",
  "v": {
    "gritty": {
      "f": "The clerk presses a bleeding thumb to the form.",
      "c": "The clerk uses a bleeding thumbprint and calls this premium stationery.",
      "x": "The bastard signs in blood and still charges you for the ink."
    }
  }
}
```

Supported `v` keys are `cartoon`, `gritty` and `brutal`. The selected override is used first, then its language variant is selected. A missing violence override uses the base text. Keep the base Cartoon text non-graphic. No need to write nine identical versions of neutral dialogue.

The engine supplies level-specific injury descriptions after actual HP damage and level-specific defeat wording. Successes and paid deals do not acquire injuries. These controls change presentation, not hit points, dice, costs, rewards or quest flags. Settings include a live preview and apply immediately to an existing adventure; old saves default to Cartoon while keeping their selected language and all progress.

The on-device narrator gets both controls and the same rendered scene, consequence, injury and memory text the player receives. Obvious profanity and graphic-detail violations are rejected and leave the authored fallback in place. The local word guard is conservative and cannot guarantee every possible model sentence meets the requested tone; native model output still needs phone testing.

## A prompt for drafting another story

> Write a Side Quest Simulator story pack as JSON, using the complete attached TEMPLATE.json.example as the schema. Set the job to [YOUR IDEA]. Use a concrete ordinary problem inside an absurd fantasy situation. Write two distinct approaches and one meaningful bargain, never three synonyms for the same roll. Make one earlier decision change a later scene and unlock a finale option. Use one to three scenes per route, a final unconditional fallback in every `next` list, unique slug ids, and at least one unconditional roll in every scene. Reuse an existing art id. Every scene body needs distinct f/c/x versions: clean, cheeky and crude. Write specific win/lose consequences and factual memory callbacks. Keep base violence cartoon-like; use v.gritty and v.brutal for injury detail, with independent language variants where needed. Return JSON only; do not add unsupported fields, stats or effects.

You can also edit the on-device narrator's directions in `src/services/dmPrompt.ts`. It gets the current scene, actual selected action, resolved consequence and recent accepted decisions. It writes one short reaction, while the engine owns story branches, costs and rules. It cannot invent new playable mechanics. Model humour and speed still need testing on a phone.

## Troubleshooting

`npm run stories:build` names the source file and entry for duplicate ids, missing text, unsupported stats, negative prices, impossible branches, missing fallbacks and loops. `npm test` also checks objective coverage, art references, costs, branch transitions, old-save compatibility and balance across all eight classes. Fix these errors before building for phones.
