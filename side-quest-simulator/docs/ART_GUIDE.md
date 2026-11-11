# Comic ink artwork

Keep the original abstract look: angular silhouettes, thick black edges, large areas of solid shadow, slit eyes and flat colours. The existing home-screen figures are the style reference. Avoid gradients, realistic anatomy, elaborate scenery and surface rendering.

The extra art should tell a joke through scale, staging and one recognisable prop. A dragon faces a mountain of tax forms; a goose claims a judge's bench; an embarrassed kraken wears swimming aids. Keep the gag legible inside a 320-pixel-wide phone panel.

## Where it lives

- `src/art/ink.ts`: shared palette, angular shapes, shadows and SVG instance identifiers.
- `src/art/creatures.ts`: card illustrations and revised story actors. Each also exposes its actor without the surrounding card.
- `src/art/heroes.ts`: the original 56 class/ancestry portraits, with optional `triumphant` and `disaster` reactions. Neutral is still the default.
- `src/art/cast.ts`: all 14 quest givers and eight rivals. A rival keeps the same portrait in the season log, road encounters and showdown.
- `src/art/panels.ts`: 19 quest panels, ten additional scene variations, and three rival encounters. Panels use a 240 × 120 viewBox and the same original actors.
- `src/art/Art.tsx`: SVG rendering; panels scale to the available width without cropping or stretching.

## Adding a quest panel

Add an entry to `QUEST_PANELS` keyed by the objective ID. Use `panel(label, backdropColour, discColour, drawing)` and compose a few actors with `actor(...)` or `giver(...)`, plus one or two bold props. `label` describes the visual joke for screen readers; captions and story text stay outside the SVG.

Authored story scenes automatically inherit their objective's panel. Add an entry to `SCENE_PANELS` keyed by scene ID when a particular beat needs a different illustration. Ordinary road cards keep their original portrait art. New objectives without bespoke panels still fall back to their configured card art; the coverage test flags missing quest panels before release.

When repeating an actor inside one SVG, give each instance unique clip-path identifiers with `instance(...)`. The staging helper does this automatically. Reusing a rival in their own painted portrait must not redirect one character's shadow to another character's outline.

## Review

`artwork-preview.png` shows representative panels, recurring characters and reactions. `art-catalogue.png` shows every quest's main panel. `artwork-in-game.jpg` shows the actual mobile-width web UI.

Automated coverage checks include all quests, authored story routes, givers, rivals and clip-path references. The 56 neutral hero drawings preserve the original home-screen style. Six weaker creature drawings are replaced in `storyActors.ts`; the duck and courtroom goose have their own silhouettes. The chef and plumber use their own props. Scene variants show the curb, flooded street, goldfish, knight’s repair bill and pool noodle at the appropriate story beat. The 112 hero reaction variants and the new illustrations are rendered to check SVG validity. Phone-size browser checks verify the illustrations alongside the complete prose and fixed actions.

## Story and layout constraints

Quest prose and UI use American English. The Dungeon Master keeps a dry British voice. Artwork follows the actual obstacle described in the scene, rather than adding an unrelated joke. Keep silhouettes recognizable at a compact panel size; avoid square eye stalks, overlapping expressions and using a wizard goose as a courtroom client.
