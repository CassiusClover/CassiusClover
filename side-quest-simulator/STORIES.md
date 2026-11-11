# Writing stories for Side Quest Simulator

Everything the player reads comes from plain text files in the `stories/` folder. You can add
quests, scenes, road events and rival encounters there without touching any code.

1. Copy `stories/TEMPLATE.txt` to a new file, for example `stories/my-stories.txt`.
2. Write. The rules are below, and the template shows one of everything.
3. Run this, which checks your writing and puts it in the game:

```bash
npm run stories
```

If something is wrong it tells you the file, the line and what to change, and leaves the game
untouched. Cloud builds run this step automatically.

## How a quest plays

Every quest is three scenes:

1. **An opener.** A road event, or your rival in person on the 3rd, 6th and 9th quest.
2. **The quest's own scene**, if it has one. Otherwise a second road event.
3. **The finale.**

Winning rolls in the first two scenes gives Momentum, a bonus on the finale. Losing them
leaves the hero Rattled, a penalty. So what happens early matters at the end.

## The four things you can write

| Start a block with | What it is | Needs |
| --- | --- | --- |
| `EVENT some-name` | A road event that can turn up in any quest | text, 2 to 4 choices |
| `QUEST some-name` with a `title:` | A brand new quest | `title:`, `task:`, `art:`, a `FINALE`; `SCENE`s are optional |
| `QUEST existing-name` without a title | Extra scenes for a quest that already exists | at least one `SCENE` |
| `RIVAL some-name` | A run-in with the season's rival | text, 2 to 4 choices |

Names are lowercase with hyphens, like `haunted-well`. Lines starting with `#` are notes.

## Writing a scene

A scene is a sentence or two of text, then the choices. Each choice starts with `>`.

```
EVENT haunted-well
art: fountain
A well. Something at the bottom is humming a tune you nearly recognise.
> Careful WIS: Listen until you place the tune
  win: It is a lullaby. You hum along. The well sends up a coin, touched.
  lose: It is the tune that plays just before something grabs you.
> Bold STR: Haul up the bucket
  win: A bucket of old wishes, some still shiny.
  lose: The bucket hauls back.
> Deal: Drop in 5 gold and walk on
  gives: -5 gold, +1 luck
  then: The humming changes key. You feel oddly fortunate.
```

**A roll** is `> Risk STAT: what the player does`, followed by a `win:` line and a `lose:` line.

- Risk is `Careful` (easy, small reward), `Bold` (fair) or `Reckless` (hard, big reward, hurts).
- STAT is one of `STR`, `DEX`, `CON`, `INT`, `WIS`, `CHA`.
- Each roll in a scene must use a different stat, so every kind of hero has an option.

**A deal** is `> Deal: what the player does`, followed by `gives:` and `then:`. There is no
dice roll: the player pays the price and gets the result.

- `gives:` lists amounts of `gold`, `hp` and `luck`, such as `-10 gold, +4 hp`.
- A deal the player cannot afford is greyed out. Every scene needs at least one choice that
  costs nothing, so nobody can get stuck.

## Extras

- **Names.** Write `{rival}` for the rival's name and `{hero}` for the player's.
- **Tone.** The game has family, cheeky and crude settings. Write the family version as
  normal. To give a ruder alternative, add a second line marked `(cheeky)` or `(crude)`:

```
  lose: The goose is unimpressed.
  lose (crude): The goose tells you where to shove it.
```

  This works on scene text (`text (cheeky): ...`), `win:`, `lose:` and `then:`.
- **Long text.** Scene text can run over several lines; they are joined together.

## Drawings

`art:` picks the picture. A quest's scenes use the quest's picture unless they name another.
Road events without one get the signpost; rival scenes get the black knight. The drawings:

bandit, blackknight, book, bridge, cat, cube, dm, door, dragon, fairy, fountain, ghost, giant,
goblin, goose, hedge, hellhound, horse, imp, knight, kraken, lich, lute, marrow, mimic, moon,
mug, mushroom, orb, portal, privy, sandwich, sign, skeleton, snail, sock, soup, statue, tower,
troll, vampire, wardrobe

## Existing quests you can add scenes to

dragon-tax, lich-eviction, kings-sock, sandwich, soup, goblin-union, hellhound, library-book,
giant-furniture, babysit, password, vampire-wedding, fountain, marrow, kraken, parade, showdown

If a quest has several scenes, each run picks one at random, so adding a second or third
scene to a quest is the quickest way to make it feel fresh.

## What makes a good scene

- One strange idea, stated plainly. "A troll demands a toll. The bridge spans a puddle."
- Three different ways in, for three different kinds of hero.
- A `win:` and `lose:` that are both funny. The player will see the `lose:` more than you think.
- Short. Two sentences of setup; one or two per result.
