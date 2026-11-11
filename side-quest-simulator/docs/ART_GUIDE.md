# Comic ink artwork

Keep the original abstract look: angular silhouettes, thick black edges, large areas of solid shadow, slit eyes and flat colours. The existing home-screen figures are the style reference. Avoid gradients, realistic anatomy, elaborate scenery and surface rendering.

The extra art should tell a joke through scale, staging and one recognisable prop. A dragon faces a mountain of tax forms; a goose claims a judge's bench; an embarrassed kraken wears swimming aids. Keep the gag legible inside a 320-pixel-wide phone panel.

## Where it lives

- `src/art/ink.ts`: shared palette, angular shapes, shadows and SVG instance identifiers.
- `src/art/creatures.ts`: the original 42 card illustrations. Each also exposes its actor without the surrounding card.
- `src/art/heroes.ts`: the original 56 class/ancestry portraits, with optional `triumphant` and `disaster` reactions. Neutral is still the default.
- `src/art/cast.ts`: all 14 quest givers and eight rivals. A rival keeps the same portrait in the season log, road encounters and showdown.
- `src/art/panels.ts`: 19 quest panels, six additional scene variations, and three rival encounters. Panels use a 240 × 120 viewBox and the same original actors.
- `src/art/Art.tsx`: SVG rendering; panels scale to the available width without cropping or stretching.

## Adding a quest panel

Add an entry to `QUEST_PANELS` keyed by the objective ID. Use `panel(label, backdropColour, discColour, drawing)` and compose a few actors with `actor(...)` or `giver(...)`, plus one or two bold props. `label` describes the visual joke for screen readers; captions and story text stay outside the SVG.

Authored story scenes automatically inherit their objective's panel. Add an entry to `SCENE_PANELS` keyed by scene ID when a particular beat needs a different illustration. Ordinary road cards keep their original portrait art. New objectives without bespoke panels still fall back to their configured card art; the coverage test flags missing quest panels before release.

When repeating an actor inside one SVG, give each instance unique clip-path identifiers with `instance(...)`. The staging helper does this automatically. Reusing a rival in their own painted portrait must not redirect one character's shadow to another character's outline.

## Review

`artwork-preview.png` shows representative panels, recurring characters and reactions. `art-catalogue.png` shows every quest's main panel. `artwork-in-game.jpg` shows the actual mobile-width web UI.

Automated coverage checks include all quests, authored story routes, givers, rivals and clip-path references. The original 56 neutral heroes and all 42 original card illustrations were compared with the previous commit after normalising generated clip IDs; their SVG drawing content is unchanged. All 112 new hero reactions and the new illustrations were rendered to check SVG validity. Browser checks cover the new quest panel, a success reaction and a rival portrait in the season log. Phone-native rendering still requires the updated app build.
