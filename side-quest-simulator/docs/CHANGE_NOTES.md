# Story and Dungeon Master update

Based on `claude/epic-franklin-cttqyz` at `b74bc97`. The linked branch contained the tracker and on-device narrator; the later story pack described in the handoff was not present in that branch.

## Behaviour

- 19 jobs, 22 story versions, 47 authored quest scenes and three in-person rival encounters. All original objectives have their own story. Three jobs also have alternate versions.
- Early choices select later scenes and unlock approaches to the finale. Paid bargains are guaranteed, display their cost before choosing, award no roll prize, and cannot use a reroll.
- Accepted decisions leave factual callbacks in the season log. Quest preparation changes the final roll, with a strict -2 to +2 limit. A road truce can unlock a joint-trophy ending.
- The AI receives the current scene, selected action, resolved consequence and recent accepted memories. It writes one short JSON line rather than a speculative batch for the entire quest. Native inference requests are serialised; stale queued requests and stale replies are discarded. A 20-second inference stop preserves the scripted fallback.
- Tone/model changes clear stored AI replies. Existing meta-progress and pre-update active saves are supported. New story scenes are used on newly accepted quests; an already-active old quest keeps its existing cards.
- Language and violence now have separate, persistent controls and a live preview. All 50 scene bodies and every narrator event have real language alternatives. Current saved narration is rendered from source text; changing preferences does not keep an old family-only or adult AI line. Violence controls injury and defeat descriptions and existing blood-specific passages without changing rules. Older saves retain their progress and default to Cartoon violence.
- Artwork expands the original angular SVG style: 19 quest comic panels, six scene variations, 14 giver portraits and eight recurring rivals. Rival portraits match across the season log, road encounters and finale. Heroes have triumph and disaster reactions. The original neutral hero portraits remain; weaker creature silhouettes have been revised. See [ART_GUIDE.md](ART_GUIDE.md) for the style and extension format.
- Checks are slightly harder, including a later-season increase, to offset preparation and guaranteed bargains. The existing 6,400-run balance simulation remains within its original bounds for all eight classes.

## Write more

Use [STORY_GUIDE.md](STORY_GUIDE.md) and `stories/TEMPLATE.json.example`. New jobs and story variants are JSON content. Run `npm run stories:build` and commit the generated TypeScript along with the source JSON. Tests reject stale generated content.

## Verification and limits

- 54 automated tests pass, including all nine language/violence combinations, full scene/narrator/art coverage, content validation, branching, affordability, one-time costs, deterministic runs, revive behaviour, old-save compatibility, model request serialisation, AI content guards and balance.
- TypeScript passes. Expo lint passes with two warnings for the intentional optional native SDK `require` calls (the same pattern allows the game to open without those SDKs in Expo Go).
- Web, iOS and Android JavaScript/Hermes bundle exports pass. These exports are not signed phone installers and do not update the existing installed builds.
- Browser interaction evidence is in `browser-check.json`; screenshots show the actual mobile-width web preview with synthetic test saves and the scripted narrator.
- Model download, native inference, generation speed and humour still need a physical phone test. No new model or AI writing quality is claimed to have been tested on hardware.

## Readability and pacing revision

- Rewrote all 50 authored scene bodies in three language levels, their choice outcomes and stored callbacks. Revised 13 finales for continuity. The goose’s theft case stays about campaign hats; the checkout stays about an unpaid receipt; the snail parade deals with a curb, a flooded route and a duck at the finish.
- Quest prose and UI use American spelling. The Dungeon Master retains British voice and phrasing; arrival remarks are shorter and no longer repeat the quest title. The model prompt discourages invented jargon and unrelated events. Fragments, repetition and unfinished replies fall back to scripted text, including on saved AI replies.
- Gameplay now has a compact hero header and a fixed action area on quest, roll, reward, death and summary screens. Full stats, notes and callbacks remain available in sheets. The quest board selects one posting at a time instead of stacking three complete descriptions. Short screens use compact illustrations and a grid for crowded finales. Large text can scroll in the reading area while actions remain available.
- Replaced six weak creature drawings, added separate duck and courtroom-goose silhouettes, and gave the chef and plumber appropriate props. Added scene-specific art for the curb, rain, undead goldfish, scorched knight and kraken’s pool noodle.
- Web, iOS and Android exports, 54 automated tests, TypeScript and lint pass. Lint retains the two existing optional-native-import warnings. Device-size browser measurements and screenshots are recorded in `compact-layout-check.json` and `parade-revised.jpg`.

## Visible gameplay stats

- STR, DEX, CON, INT, WIS and CHA modifiers now stay visible in one compact row below the health bar on quest, board, roll and reward screens. Values use the current hero stats, including equipment and upgrades; situational roll bonuses remain on each choice.
- Trimmed spacing on short screens to preserve the fixed choice area. Reviewed ten scenarios at 390×756 and 375×580 with default text size; all fit without scrolling. Larger accessibility text can still scroll in the reading area. Evidence is in `compact-layout-check.json` and `stats-visible.jpg`.
