import type { Choice, Giver, Objective, Risk, Stat, Twist, Txt } from '../types';
import { EXTRA_OBJECTIVES } from './stories.generated';

export const ch = (label: Txt, stat: Stat, risk: Risk, win: Txt, lose: Txt): Choice => ({ label, stat, risk, win, lose });

export const GIVERS: Giver[] = [
  { id: 'baker', name: 'A weeping baker' },
  { id: 'guild', name: 'The Guild of Guilds' },
  { id: 'cat', name: 'A cat wearing a small crown' },
  { id: 'landlord', name: { f: 'Your landlord', c: 'Your landlord, who is "between ethics"', x: 'Your absolute git of a landlord' } },
  { id: 'cloud', name: 'A cloud that only you can see' },
  { id: 'king', name: 'An extremely tired king' },
  { id: 'trenchcoat', name: 'Three children in a long coat ("One Adult")' },
  { id: 'board', name: 'The notice board itself, speaking' },
  { id: 'dentist', name: 'The village dentist-necromancer' },
  { id: 'intern', name: 'A knight on an unpaid internship' },
  { id: 'mother', name: 'Your mother' },
  { id: 'pigeon', name: 'A suspiciously wealthy pigeon' },
  { id: 'ghost', name: 'A ghost with unfinished admin' },
  { id: 'wizard', name: { f: 'A wizard who lost a bet', c: 'A wizard who lost a bet and his trousers', x: 'A hungover wizard who lost a bet and his trousers' } },
];

const BASE_OBJECTIVES: Objective[] = [
  {
    id: 'dragon-tax',
    title: "File the Dragon's Tax Return",
    task: "file a dragon's tax return before the deadline",
    climax: {
      id: 'x-dragon-tax',
      text: 'The dragon insists its entire hoard is a "home office". The tax inspector is a smaller, angrier dragon.',
      choices: [
        ch('Audit the hoard, coin by coin', 'INT', 'bold', 'Every coin is itemised. The dragon weeps at your thoroughness.', 'You lose count at four million. The dragon exhales, disappointed and on fire.'),
        ch('Flatter the inspector', 'CHA', 'safe', 'The inspector preens and stamps the form unread.', 'The inspector has heard "nice scales" before. It bites.'),
        ch('Stamp the form mid-inferno', 'CON', 'reckless', 'You emerge crispy, with a legally binding stamp.', 'The form survives. Your eyebrows are now a memory.'),
      ],
    },
  },
  {
    id: 'lich-eviction',
    title: 'Serve an Eviction Notice to a Lich',
    task: 'serve an eviction notice to a nine-hundred-year-old lich',
    climax: {
      id: 'x-lich-eviction',
      text: 'The lich answers the crypt door in a dressing gown. He claims he has "tenant rights" and "never dies".',
      choices: [
        ch('Cite the lease, clause by clause', 'INT', 'bold', 'Clause 14: "No phylacteries in communal areas." He packs.', 'He wrote the lease. In 1204. In blood. He reads you his clauses.'),
        ch('Appeal to his better nature', 'WIS', 'safe', 'You suggest a nice seaside tomb. His eye sockets light up.', 'He has no better nature. He checked. He hexes your knees.'),
        ch('Carry him out bodily', 'STR', 'reckless', 'He is mostly robe. You deposit him on the kerb with his urns.', 'He is mostly curses. Several of them land.'),
      ],
    },
  },
  {
    id: 'kings-sock',
    title: "Find the King's Left Sock",
    task: "recover the king's left sock, upon which the realm apparently depends",
    climax: {
      id: 'x-kings-sock',
      text: 'The sock is in the royal laundry, guarded by the Washerwoman General and her elite pegs.',
      choices: [
        ch('Sneak through the steam', 'DEX', 'bold', 'You pluck the sock from the line like a ripe, damp fruit.', 'You are pegged. Thoroughly. To a line. For some time.'),
        ch('Requisition it with confidence', 'CHA', 'safe', 'You say "royal business" and nobody can prove otherwise.', 'She demands form S-0CK. You do not have form S-0CK.'),
        ch('Smell your way to it', 'CON', 'reckless', 'Your nose survives. Barely. The sock is unmistakable.', 'You find it. You wish you had not. You need a sit down.'),
      ],
    },
  },
  {
    id: 'sandwich',
    title: 'Deliver a Sandwich Across a Battlefield',
    task: 'deliver one (1) sandwich across an active battlefield while it is still warm',
    climax: {
      id: 'x-sandwich',
      text: 'Two armies clash between you and the customer. The sandwich is cooling. The customer has ordered "no arrows".',
      choices: [
        ch('Sprint through the middle', 'DEX', 'reckless', 'Both armies pause to applaud. Delivered hot. Five stars.', 'You arrive with a sandwich and several arrows. No tip.'),
        ch('Shield the sandwich with your body', 'CON', 'bold', 'You are dented. The sandwich is pristine. Priorities.', 'You are dented and so is the sandwich. Everyone loses.'),
        ch('Ask both armies to break for lunch', 'CHA', 'bold', 'A ceasefire is declared. You have invented the picnic.', 'They agree on one thing only: you are annoying.'),
      ],
    },
  },
  {
    id: 'soup',
    title: 'Rescue the Sentient Soup',
    task: 'rescue a sentient soup from a restaurant that keeps trying to serve it',
    climax: {
      id: 'x-soup',
      text: 'The chef stands between you and the tureen, ladle raised. The soup is screaming, politely.',
      choices: [
        ch('Out-cook the chef', 'INT', 'bold', 'Your decoy soup is so good he forgets the original.', 'Your decoy soup is a crime. The ladle finds you.'),
        ch('Grab the tureen and run', 'STR', 'bold', 'The soup sloshes with joy. You do not spill a friend.', 'You spill a little. The soup says it is fine. It is not fine.'),
        ch('Convince the chef soup has feelings', 'CHA', 'safe', 'The chef cries into the soup. The soup forgives him.', 'The chef is unmoved. He seasons you, threateningly.'),
      ],
    },
  },
  {
    id: 'goblin-union',
    title: 'Mediate the Goblin Union Dispute',
    task: 'mediate a labour dispute between a dark lord and his goblins',
    climax: {
      id: 'x-goblin-union',
      text: 'The goblins want dental. The dark lord wants "loyalty unto death". The negotiating table is on fire.',
      choices: [
        ch('Draft a fair compromise', 'WIS', 'bold', 'Dental, plus death only on weekdays. Everyone signs.', 'Both sides unite at last: against you.'),
        ch('Give a rousing speech', 'CHA', 'bold', 'The goblins cheer. The dark lord claps slowly, then sincerely.', 'You say "synergy". The room turns.'),
        ch('Put the table out first', 'CON', 'safe', 'You stamp out the fire. Respect is earned.', 'You are now also on fire. Negotiations pause.'),
      ],
    },
  },
  {
    id: 'hellhound',
    title: "Walk the Duchess's Hellhound",
    task: "take a duchess's three-headed hellhound for its afternoon walk",
    climax: {
      id: 'x-hellhound',
      text: 'The hellhound has seen a squirrel. All three heads have seen different squirrels.',
      choices: [
        ch('Hold the lead', 'STR', 'bold', 'You plough a furrow through the park but you hold on.', 'You are briefly a kite.'),
        ch('Distract it with treats', 'WIS', 'safe', 'One biscuit per head. Order is restored.', 'You brought two biscuits. Grave error.'),
        ch('Out-bark it', 'CHA', 'reckless', 'It sits. All three heads look impressed.', 'It barks back. In fire.'),
      ],
    },
  },
  {
    id: 'library-book',
    title: 'Return a Library Book (300 Years Overdue)',
    task: 'return a library book that is three hundred years overdue, and survive the fine',
    climax: {
      id: 'x-library-book',
      text: 'The Librarian looms. The fine has been compounding since before your kingdom existed. She says "shh" and the windows crack.',
      choices: [
        ch('Dispute the fine on a technicality', 'INT', 'bold', 'The library moved in 1450. Different jurisdiction. She seethes.', 'She has a degree in technicalities. Two, in fact.'),
        ch('Slide the book into the returns slot unseen', 'DEX', 'bold', 'A perfect, silent return. You were never here.', 'The slot bites. It is also a librarian.'),
        ch('Apologise in complete silence', 'WIS', 'safe', 'Your mimed remorse moves her. Fine waived.', 'Your mime is read as sarcasm.'),
      ],
    },
  },
  {
    id: 'giant-furniture',
    title: 'Assemble Flat-Pack Furniture for a Giant',
    task: 'assemble a flat-pack wardrobe for a giant, with only the tiny key provided',
    climax: {
      id: 'x-giant-furniture',
      text: 'There are nine screws left over, each the size of a goat. The giant is watching. The instructions are a single smug drawing.',
      choices: [
        ch('Decode the instructions', 'INT', 'bold', 'The drawing was upside down. So was the wardrobe. Fixed.', 'You have built a very large chair. He wanted a wardrobe.'),
        ch('Force it together', 'STR', 'bold', 'It fits now. It will always fit. It has no choice.', 'A door the size of a barn falls on you.'),
        ch('Hide the spare screws', 'DEX', 'safe', 'What screws? The giant is delighted.', 'A goat-sized screw rolls out of your tunic.'),
      ],
    },
  },
  {
    id: 'babysit',
    title: "Babysit the Dark Lord's Nephew",
    task: "babysit a dark lord's nephew until bedtime",
    climax: {
      id: 'x-babysit',
      text: 'It is bedtime. The child has summoned something with too many elbows and says it is "his friend Gerald".',
      choices: [
        ch('Read a bedtime story to both of them', 'CHA', 'safe', 'Gerald falls asleep first. The child follows.', 'They heckle. Gerald has notes on your voices.'),
        ch('Banish Gerald', 'INT', 'reckless', 'Gerald leaves with dignity and a packed lunch.', 'You banish the wrong thing. It was load-bearing.'),
        ch('Tire them out with a pillow fight', 'CON', 'bold', 'You lose, heroically, for forty minutes. Silence at last.', 'Gerald does not understand "play". Or "pillow".'),
      ],
    },
  },
  {
    id: 'password',
    title: "Recover a Wizard's Password",
    task: 'recover the password to a wizard\'s tower, which he has "definitely not forgotten"',
    climax: {
      id: 'x-password',
      text: 'The tower door speaks: "Password must contain one rune, one number, and the true name of a minor demon."',
      choices: [
        ch('Guess it', 'WIS', 'bold', 'It was his cat\'s name and the year. It always is.', 'Three wrong guesses. The door locks you out, with lightning.'),
        ch('Click "Forgot Password"', 'INT', 'safe', 'A raven arrives with a reset scroll. Civilised.', 'The raven goes to his old address. In a volcano.'),
        ch('Climb in through the window', 'DEX', 'reckless', 'You bypass security entirely. The door is furious.', 'The window also wants a password. You fall, thinking about this.'),
      ],
    },
  },
  {
    id: 'vampire-wedding',
    title: 'Cater a Vampire Wedding',
    task: 'cater a vampire wedding without becoming a canape',
    climax: {
      id: 'x-vampire-wedding',
      text: 'The buffet is out. Somebody put garlic in the dip. Two hundred vampires turn to look at you.',
      choices: [
        ch('Blame the best man', 'CHA', 'bold', 'He looked shifty anyway. The wedding continues without him.', 'The best man is the bride\'s brother. You are now the dip.'),
        ch('Eat all the dip yourself, fast', 'CON', 'reckless', 'Evidence destroyed. You will never be bitten again.', 'You manage half. The breath alone starts a stampede.'),
        ch('Swap the dip unseen', 'DEX', 'bold', 'A flawless switch. The vampires rate it "to die for".', 'You drop it on the bride. The dress was nine hundred years old.'),
      ],
    },
  },
  {
    id: 'fountain',
    title: 'Unclog the Fountain of Youth',
    task: 'unclog the Fountain of Youth, which is backing up into Tuesday',
    climax: {
      id: 'x-fountain',
      text: 'The blockage is a wad of regrets and one very old adventurer who has been there since he was forty.',
      choices: [
        ch('Plunge it', 'STR', 'bold', 'A mighty heave. Time flows again. So does the adventurer.', 'The splash-back makes you eleven for an hour. Embarrassing.'),
        ch('Talk the adventurer out', 'WIS', 'safe', 'He admits he is ready to turn forty-one. He climbs out.', 'He likes it in there. He pulls you in for company.'),
        ch('Dive in and clear it by hand', 'CON', 'reckless', 'You emerge triumphant and, briefly, a toddler.', 'You emerge a toddler and stay one through the walk home.'),
      ],
    },
  },
  {
    id: 'marrow',
    title: 'Judge the Village Vegetable Contest',
    task: 'judge a village vegetable contest that has ended in bloodshed four years running',
    climax: {
      id: 'x-marrow',
      text: 'Two marrows remain. Their growers stare at you with the calm of people who own pitchforks.',
      choices: [
        ch('Declare a tie with great ceremony', 'CHA', 'bold', 'Two rosettes. Nobody dies. The village will speak of it.', 'A tie. A TIE. The pitchforks rise as one.'),
        ch('Judge honestly, on the merits', 'WIS', 'reckless', 'Your reasoning is so sound the loser shakes your hand.', 'Honesty was a mistake. You leave via a hedge.'),
        ch('Measure them with actual instruments', 'INT', 'safe', 'Science is hard to argue with. They try anyway, briefly.', 'Your tape measure is "biased". So, soon, is your nose.'),
      ],
    },
  },
  {
    id: 'kraken',
    title: 'Teach a Kraken to Swim',
    task: 'teach an embarrassed kraken to swim before the other krakens find out',
    climax: {
      id: 'x-kraken',
      text: 'The kraken clings to the pier with all eight arms and refuses to let go. It is wearing armbands. Eight of them.',
      choices: [
        ch('Demonstrate, confidently', 'DEX', 'bold', 'It copies you. It is doing a breaststroke. It is so proud.', 'You demonstrate drowning. It takes notes.'),
        ch('Gentle encouragement', 'WIS', 'safe', 'One arm at a time, it lets go. You both cry a bit.', 'It hugs you for reassurance. With all of them.'),
        ch('Push it in', 'STR', 'reckless', 'Tough love works. It surfaces, thrilled, and waves.', 'It takes the pier with it. And you.'),
      ],
    },
  },
  {
    id: 'parade',
    title: 'Escort a Very Slow Parade',
    task: 'escort the annual Parade of Snails safely across the kingdom',
    climax: {
      id: 'x-parade',
      text: 'Day nine. The finish line is in sight. So is a flock of very interested ducks.',
      choices: [
        ch('Stare down the ducks', 'CON', 'bold', 'You do not blink for an hour. The ducks withdraw.', 'The ducks do not blink either. Then they charge.'),
        ch('Carry all the snails the last ten feet', 'DEX', 'reckless', 'Four hundred snails, two hands, zero casualties.', 'You trip. The snails are fine. They land on you.'),
        ch('Negotiate with the head duck', 'CHA', 'bold', 'Bread changes hands. The parade passes unpecked.', 'The duck wants more bread than exists. Talks collapse.'),
      ],
    },
  },
  {
    id: 'showdown',
    title: 'The Hero of the Year Showdown',
    task: 'settle, in front of the entire Guild, who is actually Hero of the Year',
    final: true,
    climax: {
      id: 'x-showdown',
      text: 'The Guild hall is packed. Your rival stands on the dais in spotless armour, holding the trophy "for safekeeping", and has prepared remarks.',
      choices: [
        ch('Duel for it, properly', 'STR', 'bold', 'Three exchanges and the trophy is yours. The armour was mostly decorative.', 'The armour was not decorative. Neither was the sword.'),
        ch('Read out your actual record', 'CHA', 'bold', 'Ten quests, itemised. The hall erupts. Your rival claps last, and quietly.', 'Your record includes the incidents. The hall remembers the incidents.'),
        ch('Check the trophy engraving against the rules', 'INT', 'safe', 'Rule 9: no pre-engraving. Disqualified on a technicality. Delicious.', 'There is a Rule 10 about pedants. It is enforced physically.'),
        ch('Simply take the trophy and leave', 'DEX', 'reckless', 'Gone before the gasp. It is on your mantelpiece by supper.', 'You get the trophy. The trophy is heavier than it looks. So is the dais.'),
      ],
    },
  },
];

export const OBJECTIVES: Objective[] = [...BASE_OBJECTIVES, ...EXTRA_OBJECTIVES];

export const TWISTS: Twist[] = [
  { id: 'none', text: 'There is no catch. This is suspicious in itself.', note: 'No modifier' },
  { id: 'damp', text: 'Everything is slightly damp.', note: 'DEX rolls are harder', statDc: { DEX: 2 } },
  { id: 'exposure', text: 'The client pays partly in "exposure".', note: 'Easier, half gold', dcMod: -1, goldMult: 0.5 },
  { id: 'lunch', text: 'It must be done before lunch.', note: 'Failures hurt more, +40% gold', dmgMod: 1, goldMult: 1.4 },
  { id: 'narrator', text: 'A bard will narrate everything you do.', note: 'CHA rolls are easier', statDc: { CHA: -2 } },
  { id: 'mime', text: 'A mime has been assigned to supervise.', note: 'WIS rolls are harder', statDc: { WIS: 2 } },
  { id: 'safety', text: 'Health and Safety have been informed.', note: 'Failures hurt less', dmgMod: -1 },
  { id: 'audit', text: 'The whole thing is being audited.', note: 'INT rolls are harder, +30% gold', statDc: { INT: 2 }, goldMult: 1.3 },
  { id: 'birthday', text: "It is somebody's birthday. There is cake.", note: 'Heal 3 HP on completion', heal: 3 },
  { id: 'rival', text: 'Your rival has taken the same job.', note: 'Harder, +50% gold', dcMod: 1, goldMult: 1.5 },
  { id: 'moon', text: 'The moon is in the wrong place.', note: 'STR rolls are easier', statDc: { STR: -2 } },
  { id: 'gravity', text: 'Gravity is taking a personal day.', note: 'CON rolls are harder, DEX easier', statDc: { CON: 2, DEX: -1 } },
  { id: 'inlaws', text: { f: "The client's in-laws are watching.", c: "The client's in-laws are watching, and judging.", x: "The client's in-laws are watching, the miserable sods." }, note: 'CHA rolls are harder, +30% gold', statDc: { CHA: 2 }, goldMult: 1.3 },
];

export const TIER_NAMES = ['Suspiciously Easy', 'Standard Nonsense', 'Clearly a Trap'] as const;
