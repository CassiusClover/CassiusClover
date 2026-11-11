// GENERATED from stories/*.txt by "npm run stories". Do not edit by hand: edit the story files.
import type { Card, Objective } from '../types';

/** New quests written in story files. */
export const PACK_QUESTS: Objective[] = [];

/** Scenes that belong to one quest, played before its finale. Keyed by quest id. */
export const PACK_SCENES: Record<string, Card[]> = {
  "dragon-tax": [
    {
      "id": "s-dragon-tax-1",
      "text": "The dragon's accountant is a kobold with ink to the elbows and nine years of receipts in a wheelbarrow. Several receipts are on fire.",
      "choices": [
        {
          "label": "Sort the receipts by year",
          "stat": "INT",
          "risk": "safe",
          "win": "A system emerges. The kobold weeps with gratitude and slips you the summary sheet.",
          "lose": "You file a burning receipt under \"misc\". The wheelbarrow goes up."
        },
        {
          "label": "Befriend the kobold",
          "stat": "CHA",
          "risk": "bold",
          "win": "He shows you which deductions are \"creative\". You know where the bodies are itemised.",
          "lose": "He reports the conversation to his employer, who is large and nearby."
        },
        {
          "label": "Stamp out the burning ones with your boot",
          "stat": "CON",
          "risk": "reckless",
          "win": "Every receipt saved, lightly toasted. Your boot is a hero.",
          "lose": "Your boot is now also a receipt, in the sense that it is on fire."
        }
      ]
    }
  ],
  "lich-eviction": [
    {
      "id": "s-lich-eviction-1",
      "text": "The crypt's doorman is a zombie with a clipboard. \"Name?\" he says. Then, after a long pause, \"Name?\" again. He has been saying it since Tuesday.",
      "choices": [
        {
          "label": "Wait for him to finish the thought",
          "stat": "WIS",
          "risk": "safe",
          "win": "On the ninth \"Name?\" he ticks a box and steps aside. Patience is a weapon.",
          "lose": "On the ninth \"Name?\" you snap. He writes that down, slowly, with his teeth."
        },
        {
          "label": "Claim to be the lich's mother",
          "stat": "CHA",
          "risk": "bold",
          "win": "He straightens what is left of his collar and waves you through.",
          "lose": "The lich's mother is on the list. She is also behind you."
        },
        {
          "label": "Tip him 8 gold",
          "stat": "CHA",
          "risk": "safe",
          "win": "He pockets it in a pocket that is mostly hole, and points at the stairs.",
          "lose": "He pockets it in a pocket that is mostly hole, and points at the stairs.",
          "deal": {
            "gold": -8
          }
        }
      ]
    }
  ],
  "kings-sock": [
    {
      "id": "s-kings-sock-1",
      "text": "The royal wardrobe is the size of a cathedral. A herald announces each garment as you pass it. He is on trousers. He has been on trousers for an hour.",
      "choices": [
        {
          "label": "Work out the filing system",
          "stat": "INT",
          "risk": "bold",
          "win": "Alphabetical by mood. Socks are under \"Tuesday, wistful\". You have a lead.",
          "lose": "You follow the system into hats. Nobody leaves hats quickly."
        },
        {
          "label": "Slip past during \"pantaloons\"",
          "stat": "DEX",
          "risk": "safe",
          "win": "The long vowel covers your footsteps. You are in the sock wing.",
          "lose": "He announces you. \"ONE INTRUDER, MEDIUM.\" Guards arrive."
        },
        {
          "label": "Shove the wardrobe rails apart and run",
          "stat": "STR",
          "risk": "reckless",
          "win": "A corridor opens through the tunics like a parted sea.",
          "lose": "The rails swing back. You are briefly a garment."
        }
      ]
    }
  ],
  "sandwich": [
    {
      "id": "s-sandwich-1",
      "text": "The customer's order slip says \"no crusts\". The sandwich has crusts. Behind you, the sandwich shop has just been taken by the eastern army.",
      "choices": [
        {
          "label": "Trim the crusts with your dagger",
          "stat": "DEX",
          "risk": "safe",
          "win": "Surgical. The crusts fall away in two perfect ribbons.",
          "lose": "You trim the sandwich into a much smaller sandwich, and your thumb."
        },
        {
          "label": "Decide the customer will love crusts",
          "stat": "CHA",
          "risk": "bold",
          "win": "You rehearse the pitch. \"Rustic.\" It is airtight.",
          "lose": "You rehearse the pitch out loud. A passing soldier disagrees, with a boot."
        },
        {
          "label": "Buy a crustless one from a camp cook for 12 gold",
          "stat": "CHA",
          "risk": "safe",
          "win": "He throws in the crusts from yours, toasted. You feel oddly restored.",
          "lose": "He throws in the crusts from yours, toasted. You feel oddly restored.",
          "deal": {
            "gold": -12,
            "hp": 2
          }
        }
      ]
    }
  ],
  "soup": [
    {
      "id": "s-soup-1",
      "text": "You are in the restaurant kitchen. The soup is in a locked larder, singing faintly. The sous-chef has the key on a chain and a knife in each hand, for speed.",
      "choices": [
        {
          "label": "Lift the key while she juliennes",
          "stat": "DEX",
          "risk": "bold",
          "win": "She never breaks rhythm. Neither do you. The key is yours.",
          "lose": "She juliennes in your direction without looking up."
        },
        {
          "label": "Wait for the dinner rush",
          "stat": "WIS",
          "risk": "safe",
          "win": "At eight o'clock nobody would notice a dragon. You stroll to the larder.",
          "lose": "At eight o'clock you are handed an apron and forty onions."
        },
        {
          "label": "Take the larder door off its hinges",
          "stat": "STR",
          "risk": "reckless",
          "win": "The door comes away like a lid. The singing gets louder and happier.",
          "lose": "The door comes away on top of you."
        }
      ]
    }
  ],
  "goblin-union": [
    {
      "id": "s-goblin-union-1",
      "text": "Before the talks, both sides want a word in private. The dark lord offers you a seat that is clearly a trap. The goblins offer you a sandwich that is clearly a bribe.",
      "choices": [
        {
          "label": "Read both sides' demands first",
          "stat": "INT",
          "risk": "safe",
          "win": "The demands overlap on one thing: nobody likes the moat. You have your opening.",
          "lose": "The goblin demands are written in bite marks. You misread a threat as a greeting."
        },
        {
          "label": "Take the sandwich and sit in the chair",
          "stat": "CHA",
          "risk": "bold",
          "win": "Accepting both insults everyone equally. Somehow this reads as fairness.",
          "lose": "The chair closes. The sandwich was also a trap. You admire the craftsmanship, upside down."
        },
        {
          "label": "Tell them both what they are really afraid of",
          "stat": "WIS",
          "risk": "reckless",
          "win": "A terrible silence, then nodding. You have skipped three hours of talks.",
          "lose": "A terrible silence, then everything else."
        }
      ]
    }
  ],
  "hellhound": [
    {
      "id": "s-hellhound-1",
      "text": "The duchess hands you the lead, a bag of biscuits, and a list titled \"Things He Must Not Eat\". The list is four pages. Page two is \"postmen\".",
      "choices": [
        {
          "label": "Memorise the list",
          "stat": "INT",
          "risk": "safe",
          "win": "Swans, bishops, the colour yellow. You are prepared for the park.",
          "lose": "You stop at page three. Page four was \"people reading lists\"."
        },
        {
          "label": "Let all three heads sniff your hand",
          "stat": "WIS",
          "risk": "bold",
          "win": "The left head licks you. The middle one nods. The right one is thinking about it.",
          "lose": "The right one has finished thinking about it."
        },
        {
          "label": "Feed him your own lunch",
          "stat": "CHA",
          "risk": "safe",
          "win": "You will be hungry later, but all three heads now regard you as a provider.",
          "lose": "You will be hungry later, but all three heads now regard you as a provider.",
          "deal": {
            "hp": -2,
            "luck": 1
          }
        }
      ]
    }
  ],
  "library-book": [
    {
      "id": "s-library-book-1",
      "text": "The library's entrance hall has a turnstile, a \"SILENCE\" sign in letters of fire, and a returns desk at the far end of a marble floor that squeaks.",
      "choices": [
        {
          "label": "Cross the floor in your socks",
          "stat": "DEX",
          "risk": "bold",
          "win": "You glide. A reader looks up, sees nothing, and returns to her index.",
          "lose": "Marble and socks. You arrive at the desk fast, horizontally, and loudly."
        },
        {
          "label": "Look up the borrower's rights",
          "stat": "INT",
          "risk": "safe",
          "win": "Section 12: fines are capped at \"one soul or equivalent\". That is a ceiling. You have a ceiling.",
          "lose": "The rule book is itself overdue. The fine transfers to you."
        },
        {
          "label": "Hold your breath the whole way",
          "stat": "CON",
          "risk": "reckless",
          "win": "Not a sound, not even breathing. You reach the desk purple and triumphant.",
          "lose": "You gasp at the halfway mark. The sign flares. So do you."
        }
      ]
    }
  ],
  "giant-furniture": [
    {
      "id": "s-giant-furniture-1",
      "text": "The flat-pack box is the size of a barn and labelled in Giant, a language with one vowel. The parts list says there should be forty dowels. You count thirty-nine, and a goat.",
      "choices": [
        {
          "label": "Find the missing dowel",
          "stat": "WIS",
          "risk": "safe",
          "win": "It was in the giant's ear, where he keeps things. He is delighted to have it back.",
          "lose": "You search the giant's pockets. The giant's pockets search back."
        },
        {
          "label": "Whittle a replacement from the box",
          "stat": "INT",
          "risk": "bold",
          "win": "Indistinguishable from the real thing, and slightly better made.",
          "lose": "You whittle it from a load-bearing part of the box. The box makes its feelings known."
        },
        {
          "label": "Persuade the goat to stand in",
          "stat": "CHA",
          "risk": "reckless",
          "win": "The goat braces. The goat holds. The goat is the best dowel in the wardrobe.",
          "lose": "The goat negotiates. The goat wins. The goat leaves with your purse and your dignity."
        }
      ]
    }
  ],
  "babysit": [
    {
      "id": "s-babysit-1",
      "text": "The dark lord leaves you a note. \"Bedtime is eight. He will say it is nine. He will say many things. Do NOT let him into the west wing.\" The child is already walking toward the west wing.",
      "choices": [
        {
          "label": "Catch him before the door",
          "stat": "DEX",
          "risk": "bold",
          "win": "You scoop him up mid-stride. He is furious and, crucially, portable.",
          "lose": "He is small and the corridor is trapped for adults."
        },
        {
          "label": "Make the east wing sound better",
          "stat": "CHA",
          "risk": "safe",
          "win": "\"There are biscuits in the east wing.\" There are now. You will have to find biscuits.",
          "lose": "\"What is in the west wing?\" he asks. You do not know. He takes that as a challenge."
        },
        {
          "label": "Reverse psychology",
          "stat": "INT",
          "risk": "reckless",
          "win": "\"Fine, go in, see if I care.\" He stops, suspicious, and goes to bed out of spite.",
          "lose": "He goes in. You follow. So that is what is in the west wing."
        }
      ]
    }
  ],
  "password": [
    {
      "id": "s-password-1",
      "text": "The wizard has left password hints on small notes all over his study. One says \"the usual\". One says \"NOT the usual\". One is just a drawing of a cat looking disappointed.",
      "choices": [
        {
          "label": "Cross-reference the notes",
          "stat": "INT",
          "risk": "safe",
          "win": "The notes are dated. The newest says \"cat plus the year I gave up\". You have a strong candidate.",
          "lose": "One of the notes was a spell. You read it aloud while cross-referencing."
        },
        {
          "label": "Ask the cat",
          "stat": "WIS",
          "risk": "bold",
          "win": "The cat walks across a specific sequence of flagstones and looks at you. Message received.",
          "lose": "The cat looks disappointed. Then it knocks an inkwell onto you from a height."
        },
        {
          "label": "Pay the wizard's apprentice 15 gold for a hint",
          "stat": "CHA",
          "risk": "safe",
          "win": "\"It rhymes with his ex-wife,\" she says, and takes a long lunch.",
          "lose": "\"It rhymes with his ex-wife,\" she says, and takes a long lunch.",
          "deal": {
            "gold": -15,
            "luck": 1
          }
        }
      ]
    }
  ],
  "vampire-wedding": [
    {
      "id": "s-vampire-wedding-1",
      "text": "The vampire wedding planner hands you the menu. Every dish is \"red\". The seating plan has two families who have been feuding since before forks. The cake is asleep.",
      "choices": [
        {
          "label": "Fix the seating plan",
          "stat": "WIS",
          "risk": "safe",
          "win": "You put a stone pillar between the two worst uncles. Peace through architecture.",
          "lose": "You seat the two worst uncles together. One of them is now a bat and in your hair."
        },
        {
          "label": "Taste-test the punch",
          "stat": "CON",
          "risk": "bold",
          "win": "Beetroot. It is beetroot. You declare it authentic and nobody argues.",
          "lose": "It is not beetroot."
        },
        {
          "label": "Wake the cake without it noticing",
          "stat": "DEX",
          "risk": "reckless",
          "win": "You ice it in its sleep. It will wake up at the reception, beautiful and confused.",
          "lose": "The cake wakes up. The cake is a morning person in the worst way."
        }
      ]
    }
  ],
  "fountain": [
    {
      "id": "s-fountain-1",
      "text": "To reach the blockage you must cross the fountain's forecourt, which is full of people who drank from it. A man of ninety is throwing a tantrum. A toddler is complaining about her knees.",
      "choices": [
        {
          "label": "Organise them into a queue",
          "stat": "CHA",
          "risk": "bold",
          "win": "Ages eight to eighty, single file, sharing sweets. You walk through like a headmaster.",
          "lose": "The ninety-year-old bites you. He has his milk teeth, and they are sharp."
        },
        {
          "label": "Wade through without swallowing any",
          "stat": "CON",
          "risk": "safe",
          "win": "Lips sealed, you arrive at the fountain exactly the age you set out.",
          "lose": "A splash gets you. You spend ten minutes aged six and furious about it."
        },
        {
          "label": "Carry the toddler; she knows the way",
          "stat": "STR",
          "risk": "reckless",
          "win": "She directs you to the valve like a tiny, bitter foreman.",
          "lose": "She weighs what a grown woman weighs. Your back files a complaint."
        }
      ]
    }
  ],
  "marrow": [
    {
      "id": "s-marrow-1",
      "text": "Before the judging, both finalists find you alone. One presses a jar of chutney into your hands and says \"for your family\". The other simply shows you her pitchfork, and smiles.",
      "choices": [
        {
          "label": "Accept nothing, admire everything",
          "stat": "WIS",
          "risk": "safe",
          "win": "You praise the chutney's jar and the pitchfork's balance. Both leave feeling ahead.",
          "lose": "You praise the pitchfork too much. She lets you hold it, by the wrong end."
        },
        {
          "label": "Promise each of them a \"special mention\"",
          "stat": "CHA",
          "risk": "bold",
          "win": "A special mention costs nothing and means nothing. They are thrilled.",
          "lose": "They compare notes behind the cake stall."
        },
        {
          "label": "Keep the chutney",
          "stat": "CHA",
          "risk": "safe",
          "win": "It is extremely good chutney. You are now, technically, compromised.",
          "lose": "It is extremely good chutney. You are now, technically, compromised.",
          "deal": {
            "hp": 3
          }
        }
      ]
    }
  ],
  "kraken": [
    {
      "id": "s-kraken-1",
      "text": "The kraken is hiding under the pier and will only talk through a snorkel. \"The others dive,\" it says. \"From a height. I just sort of... lower myself in.\"",
      "choices": [
        {
          "label": "Share an embarrassing story of your own",
          "stat": "CHA",
          "risk": "safe",
          "win": "You tell it about the incident with the horse. It laughs so hard the pier shakes. Trust achieved.",
          "lose": "Your story is too good. It is now embarrassed on your behalf as well."
        },
        {
          "label": "Start with breathing exercises",
          "stat": "WIS",
          "risk": "bold",
          "win": "In for four, out for eight. Eight arms uncurl from the pilings one at a time.",
          "lose": "It breathes in for four. The tide goes out. You go with it."
        },
        {
          "label": "Get in the water first",
          "stat": "CON",
          "risk": "reckless",
          "win": "It is freezing and you say it is lovely. The kraken believes you. Bless it.",
          "lose": "It is freezing and you say several things, none of them \"lovely\"."
        }
      ]
    }
  ],
  "parade": [
    {
      "id": "s-parade-1",
      "text": "Day four. The snails have reached a fork in the road and are holding a vote. Voting is by trail. Early results suggest \"left\", \"right\", and \"Gerald\".",
      "choices": [
        {
          "label": "Count the trails properly",
          "stat": "INT",
          "risk": "safe",
          "win": "Left wins by a clear smear. You announce the result and the parade moves, eventually.",
          "lose": "You step in the ballot. The election must be re-run. That is another day."
        },
        {
          "label": "Campaign for the short route",
          "stat": "CHA",
          "risk": "bold",
          "win": "Your slogan is \"Less Road\". It tests extremely well with snails.",
          "lose": "Gerald out-campaigns you. Gerald wants the scenic route. Gerald always does."
        },
        {
          "label": "Lay a trail of lettuce costing 10 gold",
          "stat": "CHA",
          "risk": "safe",
          "win": "Democracy is suspended in favour of lettuce. The parade turns as one.",
          "lose": "Democracy is suspended in favour of lettuce. The parade turns as one.",
          "deal": {
            "gold": -10
          }
        }
      ]
    }
  ],
  "showdown": [
    {
      "id": "s-showdown-1",
      "text": "Backstage at the Guild hall, {rival} is having a portrait painted \"for after\". The painter has already done the trophy. {rival} looks up. \"Oh, {hero}. They let you in. How modern.\"",
      "choices": [
        {
          "label": "Be gracious. Devastatingly gracious.",
          "stat": "CHA",
          "risk": "bold",
          "win": "\"I hope the trophy matches your curtains.\" The painter snorts. {rival} twitches.",
          "lose": "You say \"good luck\" and somehow it comes out as an apology."
        },
        {
          "label": "Say nothing and study the room",
          "stat": "WIS",
          "risk": "safe",
          "win": "The dais creaks on the left. The crowd favours underdogs. You know the ground now.",
          "lose": "You study the room so hard you walk into the portrait."
        },
        {
          "label": "Add a moustache to the portrait",
          "stat": "DEX",
          "risk": "reckless",
          "win": "One stroke, perfectly placed. The painter decides to keep it.",
          "lose": "{rival} catches your wrist. \"Assault on art,\" they announce, to several guards."
        }
      ]
    }
  ]
};

/** Road events that can turn up in any quest. */
export const PACK_EVENTS: Card[] = [
  {
    "id": "dubious-merchant",
    "text": "A goblin has set up a stall in the middle of the road. The sign says \"LEGITIMATE GOODS\". The word \"legitimate\" has been added in a different hand.",
    "choices": [
      {
        "label": "Buy a \"healing\" pie for 12 gold",
        "stat": "CHA",
        "risk": "safe",
        "win": "It heals. You choose not to ask what the meat was. It was not meat.",
        "lose": "It heals. You choose not to ask what the meat was. It was not meat.",
        "deal": {
          "gold": -12,
          "hp": 5
        }
      },
      {
        "label": "Buy a lucky tooth for 18 gold",
        "stat": "CHA",
        "risk": "safe",
        "win": "Whose tooth is not specified. It feels lucky. It feels warm.",
        "lose": "Whose tooth is not specified. It feels lucky. It feels warm.",
        "deal": {
          "gold": -18,
          "luck": 1
        }
      },
      {
        "label": "Haggle him down to nothing",
        "stat": "CHA",
        "risk": "bold",
        "win": "You leave with a pie, his respect, and a small refund.",
        "lose": "You leave having somehow bought the stall's debts."
      }
    ]
  },
  {
    "id": "wishing-well",
    "text": "A wishing well. A brass plaque reads: \"Wishes granted. Results may vary. No refunds. Do not wish for refunds.\"",
    "choices": [
      {
        "label": "Toss in 10 gold and wish for health",
        "stat": "CHA",
        "risk": "safe",
        "win": "The well gurgles. You feel better. Somewhere a healer feels slightly worse.",
        "lose": "The well gurgles. You feel better. Somewhere a healer feels slightly worse.",
        "deal": {
          "gold": -10,
          "hp": 4
        }
      },
      {
        "label": "Wish very, very carefully",
        "stat": "WIS",
        "risk": "reckless",
        "win": "Your wording is flawless. The well grudgingly pays out in coin.",
        "lose": "You leave a loophole. The well takes it, and your eyebrows."
      },
      {
        "label": "Haul up the bucket and take the coins",
        "stat": "STR",
        "risk": "bold",
        "win": "Forty years of other people's wishes. They were not using them.",
        "lose": "The well hauls back."
      }
    ]
  },
  {
    "id": "roadside-shrine",
    "text": "A roadside shrine to a small god of \"getting there eventually\". The offering bowl holds two buttons and an apology.",
    "choices": [
      {
        "label": "Rest here a while",
        "stat": "CHA",
        "risk": "safe",
        "win": "Nothing happens, slowly. It is exactly what you needed.",
        "lose": "Nothing happens, slowly. It is exactly what you needed.",
        "deal": {
          "hp": 3
        }
      },
      {
        "label": "Leave an offering of 15 gold",
        "stat": "CHA",
        "risk": "safe",
        "win": "A warm sense that you will, at some point, get there.",
        "lose": "A warm sense that you will, at some point, get there.",
        "deal": {
          "gold": -15,
          "luck": 2
        }
      },
      {
        "label": "Read the inscription for hidden meaning",
        "stat": "INT",
        "risk": "bold",
        "win": "Behind the third stone: a previous pilgrim's emergency fund.",
        "lose": "The inscription is a curse on people who read inscriptions looking for money."
      }
    ]
  },
  {
    "id": "toll-of-blood",
    "text": "A very polite vampire runs a toll gate. \"Coin or a small donation,\" he says, holding up a teacup. \"For my condition.\"",
    "choices": [
      {
        "label": "Pay 14 gold",
        "stat": "CHA",
        "risk": "safe",
        "win": "He writes you a receipt in copperplate and wishes you a pleasant eternity.",
        "lose": "He writes you a receipt in copperplate and wishes you a pleasant eternity.",
        "deal": {
          "gold": -14
        }
      },
      {
        "label": "Donate a teacup's worth",
        "stat": "CHA",
        "risk": "safe",
        "win": "\"Notes of garlic,\" he says, wincing. He lets you through and gives you a biscuit.",
        "lose": "\"Notes of garlic,\" he says, wincing. He lets you through and gives you a biscuit.",
        "deal": {
          "hp": -3,
          "luck": 1
        }
      },
      {
        "label": "Vault the gate",
        "stat": "DEX",
        "risk": "reckless",
        "win": "You clear it. He applauds politely, which is somehow worse.",
        "lose": "He is faster than a gate. Most things are."
      }
    ]
  },
  {
    "id": "rope-or-ladder",
    "text": "A cliff. At the top, your destination. There is a ladder with a sign, \"LADDER: 10 GOLD\", and a rope with a sign, \"ROPE: FREE (frayed)\".",
    "choices": [
      {
        "label": "Take the ladder for 10 gold",
        "stat": "CHA",
        "risk": "safe",
        "win": "Rung by honest rung. Capitalism works when it is a ladder.",
        "lose": "Rung by honest rung. Capitalism works when it is a ladder.",
        "deal": {
          "gold": -10
        }
      },
      {
        "label": "Take the rope",
        "stat": "STR",
        "risk": "bold",
        "win": "It holds. Barely. You pocket the ladder-keeper's dropped change at the top.",
        "lose": "\"Frayed\" was generous."
      },
      {
        "label": "Free-climb next to both",
        "stat": "DEX",
        "risk": "safe",
        "win": "Slow, careful, free. The ladder-keeper glares the whole way up.",
        "lose": "A handhold turns out to be a nest. The owner objects."
      }
    ]
  },
  {
    "id": "fortune-teller",
    "text": "A fortune-teller's tent. \"I see great things in your future,\" she says. \"Also some terrible things. It is mostly things, to be honest.\"",
    "choices": [
      {
        "label": "Pay 8 gold for the short version",
        "stat": "CHA",
        "risk": "safe",
        "win": "\"Duck,\" she says. You do not know when, but you will be ready.",
        "lose": "\"Duck,\" she says. You do not know when, but you will be ready.",
        "deal": {
          "gold": -8,
          "luck": 1
        }
      },
      {
        "label": "Read her instead",
        "stat": "WIS",
        "risk": "bold",
        "win": "You tell her fortune. It is so accurate she pays you.",
        "lose": "You tell her fortune. It is so accurate she throws the orb."
      },
      {
        "label": "Spot how the trick works",
        "stat": "INT",
        "risk": "safe",
        "win": "The orb is a goldfish bowl. You keep the secret, for a consideration.",
        "lose": "The orb is not a goldfish bowl. Do not tap the glass."
      }
    ]
  },
  {
    "id": "lost-property",
    "text": "The Guild's lost property office. Unclaimed items after ninety days \"become available\". A chest in the corner is labelled \"day 89\". It is breathing.",
    "choices": [
      {
        "label": "Open the breathing chest",
        "stat": "STR",
        "risk": "reckless",
        "win": "Inside: gold, and a smaller chest that is also breathing. You take only the gold.",
        "lose": "It was not a chest for the first eighty-eight days either."
      },
      {
        "label": "Claim something plausible",
        "stat": "CHA",
        "risk": "safe",
        "win": "\"The brown cloak.\" There are nine. You are given the nicest, with coins in the pocket.",
        "lose": "\"The brown cloak.\" The clerk asks you to describe the curse on it."
      },
      {
        "label": "Hand in your own lost dignity",
        "stat": "CHA",
        "risk": "safe",
        "win": "The clerk files it under \"D\" and gives you a ticket. You feel lighter.",
        "lose": "The clerk files it under \"D\" and gives you a ticket. You feel lighter.",
        "deal": {
          "luck": 1
        }
      }
    ]
  }
];

/** Encounters with the season's rival. */
export const PACK_RIVALS: Card[] = [
  {
    "id": "r-the-autograph",
    "text": "{rival} is signing autographs at the crossroads, and there is a queue. \"{hero}! Come to see how it is done? Stand there. No, further back. In the shade.\"",
    "choices": [
      {
        "label": "Work the queue yourself",
        "stat": "CHA",
        "risk": "bold",
        "win": "By the end, half of them want your signature too. One asks {rival} to hold her quill.",
        "lose": "You sign one autograph. It is for {rival}, who frames it ironically."
      },
      {
        "label": "Let it go and keep walking",
        "stat": "WIS",
        "risk": "safe",
        "win": "You do not rise to it. {rival} watches you leave and, for a moment, looks unsure.",
        "lose": "You almost let it go. Then you say something. It was not good."
      },
      {
        "label": "Swap the quill for a trick one",
        "stat": "DEX",
        "risk": "reckless",
        "win": "It squirts. The queue howls. {rival}'s tunic may never recover.",
        "lose": "{rival} hands it straight back to you. \"You first.\""
      }
    ]
  },
  {
    "id": "r-the-shortcut",
    "text": "{rival} is leaning on a signpost that has been turned to face the wrong way. \"Oh, are you doing this quest too? It is that way. Definitely. I would never lie about directions.\"",
    "choices": [
      {
        "label": "Check the signpost's shadow",
        "stat": "INT",
        "risk": "safe",
        "win": "The post was turned within the hour. You take the other road and arrive first.",
        "lose": "You overthink it and take a third road that nobody mentioned. It was nobody's for a reason."
      },
      {
        "label": "Read {rival}'s face",
        "stat": "WIS",
        "risk": "bold",
        "win": "The left eye twitches on \"definitely\". You go the other way, whistling.",
        "lose": "{rival} has practised in a mirror. You walk confidently into a bog."
      },
      {
        "label": "Turn the signpost back, with {rival} still leaning on it",
        "stat": "STR",
        "risk": "reckless",
        "win": "The post swings. So does {rival}, into the ditch, with a very satisfying sound.",
        "lose": "The post is deeper than it looks. Your back is not."
      }
    ]
  },
  {
    "id": "r-the-sponsor",
    "text": "A banner across the road reads \"THIS QUEST BROUGHT TO YOU BY {rival}\". Beneath it, {rival} is handing out pamphlets. \"It is only fair. I did do most of the last one.\"",
    "choices": [
      {
        "label": "Give a rival speech from a barrel",
        "stat": "CHA",
        "risk": "bold",
        "win": "You have no pamphlets, only charm. The crowd drifts over. Coins follow.",
        "lose": "The barrel was not empty. It was not strong, either."
      },
      {
        "label": "Quietly edit the banner",
        "stat": "DEX",
        "risk": "safe",
        "win": "It now reads \"THIS QUEST BROUGHT TO YOU, BY {rival}, LATE\". Nobody saw a thing.",
        "lose": "You are halfway up the pole when the crowd turns round."
      },
      {
        "label": "Take a pamphlet and move on",
        "stat": "CHA",
        "risk": "safe",
        "win": "On the back is a map {rival} did not mean to print. You fold it away, smiling.",
        "lose": "On the back is a map {rival} did not mean to print. You fold it away, smiling.",
        "deal": {
          "luck": 1
        }
      }
    ]
  },
  {
    "id": "r-the-wager",
    "text": "{rival} blocks the path, tossing a coin. \"A little wager, {hero}. Whoever finishes this quest first. Unless you are worried.\" The coin, you notice, has two heads.",
    "choices": [
      {
        "label": "Take the bet for 15 gold",
        "stat": "CHA",
        "risk": "safe",
        "win": "\"Brave,\" says {rival}, slightly too surprised. You now have something to prove, and the nerve to prove it.",
        "lose": "\"Brave,\" says {rival}, slightly too surprised. You now have something to prove, and the nerve to prove it.",
        "deal": {
          "gold": -15,
          "luck": 2
        }
      },
      {
        "label": "Point out the coin",
        "stat": "INT",
        "risk": "bold",
        "win": "\"Interesting coin.\" {rival} pockets it, flushed, and pays you to stop talking.",
        "lose": "\"What coin?\" It has gone. You look like the one making accusations."
      },
      {
        "label": "Stare until {rival} looks away",
        "stat": "CON",
        "risk": "reckless",
        "win": "A full minute. {rival} blinks first and pretends to have seen a bird.",
        "lose": "A full minute. Your eyes water. {rival} offers you a handkerchief, monogrammed."
      }
    ]
  }
];

/** Which drawing illustrates each story card. */
export const PACK_ART: Record<string, string> = {
  "r-the-autograph": "blackknight",
  "r-the-shortcut": "blackknight",
  "r-the-sponsor": "blackknight",
  "r-the-wager": "blackknight",
  "dubious-merchant": "goblin",
  "wishing-well": "fountain",
  "roadside-shrine": "statue",
  "toll-of-blood": "vampire",
  "rope-or-ladder": "tower",
  "fortune-teller": "orb",
  "lost-property": "mimic"
};
