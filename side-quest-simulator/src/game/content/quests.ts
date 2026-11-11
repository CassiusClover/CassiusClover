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
      text: "The tax inspector is a smaller, angrier dragon. It wants a final check of the return before the larger dragon signs. Smoke is curling over the form.",
      choices: [
        ch("Check every figure", 'INT', 'bold', "Every coin is accounted for. The inspector approves the return.", "You lose count. The dragon's impatient snort knocks you into the gold."),
        ch("Flatter the inspector", 'CHA', 'safe', "The inspector accepts your compliments and stamps the form.", "The inspector has heard enough about its scales. It shoves you away from the desk."),
        ch("Stamp the form through the smoke", 'CON', 'reckless', "You stamp the form before the dragon's next smoky breath. The return is filed.", "The dragon breathes out before you finish. You stumble away with singed sleeves."),
      ],
    },
  },
  {
    id: 'lich-eviction',
    title: 'Serve an Eviction Notice to a Lich',
    task: 'serve an eviction notice to a nine-hundred-year-old lich',
    climax: {
      id: 'x-lich-eviction',
      text: "The lich has packed, but will not surrender the keys until his deposit is settled. The landlord points out that several walls now contain skeletons.",
      choices: [
        ch("Cite the lease, clause by clause", 'INT', 'bold', "You settle the deductions. The landlord pays the deposit and the lich hands over the keys.", "The lich disputes every clause and jabs you with his staff whenever you interrupt."),
        ch("Offer him a better crypt", 'WIS', 'safe', "The lich accepts a quieter crypt. The landlord agrees to cover the move.", "The lich thinks you are insulting his current crypt. A curse sends you sprawling."),
        ch("Carry the lich and his coffin outside", 'STR', 'reckless', "You carry him out. He complains, but accepts the landlord's final offer.", "The coffin slips and pins your foot. The lich adds the delay to his claim."),
      ],
    },
  },
  {
    id: 'kings-sock',
    title: "Find the King's Left Sock",
    task: "recover the king's left sock, upon which the realm apparently depends",
    climax: {
      id: 'x-kings-sock',
      text: "The sock has returned to the palace, but refuses to be worn until the king washes his feet. The washerwoman says nobody has ever made this demand successfully.",
      choices: [
        ch("Sneak it onto the washing line", 'DEX', 'bold', "You get the sock clean and back into the royal laundry. The washerwoman promises to handle the feet.", "The washerwoman mistakes you for a laundry thief and pegs you to the line."),
        ch("Order a royal footbath", 'CHA', 'safe', "You announce a new palace hygiene rule. The king reluctantly washes, and the sock agrees to return.", "The king demands to know who authorized this. The guards remove you from the laundry."),
        ch("Endure the royal fitting", 'CON', 'reckless', "You hold the sock in place while the king finally washes and dresses. The realm can get on with its day.", "The smell defeats you before the fitting is finished. You collapse into a laundry basket."),
      ],
    },
  },
  {
    id: 'sandwich',
    title: 'Deliver a Sandwich Across a Battlefield',
    task: 'deliver one (1) sandwich across an active battlefield while it is still warm',
    climax: {
      id: 'x-sandwich',
      text: "The customer is in sight across the battlefield. The sandwich is cooling. Two armies are still arguing over which side should let you through first.",
      choices: [
        ch("Sprint through the middle", 'DEX', 'reckless', "You deliver the sandwich hot. Both armies pause to watch the customer leave a tip.", "You dodge into a ditch and land on the sandwich. The customer refuses the delivery."),
        ch("Shield the sandwich with your body", 'CON', 'bold', "You arrive bruised, but the sandwich is intact. The customer seems unclear about which is more impressive.", "You get knocked down. The sandwich does not survive the landing."),
        ch("Ask both armies to break for lunch", 'CHA', 'bold', "The commanders agree to a lunch break. You deliver the sandwich during the ceasefire.", "The commanders agree that you are wasting their time. Both guards shove you out."),
      ],
    },
  },
  {
    id: 'soup',
    title: 'Rescue the Sentient Soup',
    task: 'rescue a sentient soup from a restaurant that keeps trying to serve it',
    climax: {
      id: 'x-soup',
      text: "The chef catches you at the front door with Gregory. He insists that talking soup is still soup. Gregory would like to finish this discussion outside.",
      choices: [
        ch("Cook a replacement for the chef", 'INT', 'bold', "Your replacement is good enough to keep the lunch service running. The chef lets Gregory leave.", "The chef tastes your attempt and throws it back at you."),
        ch("Grab Gregory's bowl and run", 'STR', 'bold', "You reach the street without spilling Gregory. He asks whether you know any quiet ponds.", "You trip at the door. Hot soup splashes you as the chef grabs the bowl."),
        ch("Convince the chef to release Gregory", 'CHA', 'safe', "The chef admits he cannot serve a customer who keeps asking for help. Gregory is free.", "The chef calls it a culinary trick and bars the door with his ladle."),
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
      text: "The wardrobe stands upright. Now the giant wants to hang up his coat, and the last door will not close. He folds his arms and waits.",
      choices: [
        ch("Check the instructions one last time", 'INT', 'bold', "You reverse the final hinge. The door closes and the giant applauds.", "You read the diagram backward. The door swings into you."),
        ch("Force the door into place", 'STR', 'bold', "One determined shove seats the hinge. The giant promises not to ask how.", "The door comes loose and knocks you down."),
        ch("Hide the spare parts", 'DEX', 'safe', "You secure the door with the remaining parts, then quietly dispose of the surplus. The giant is satisfied.", "The giant spots a spare hinge rolling out of your bag and insists on a practical explanation."),
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
      text: "The tower will allow one last password attempt before locking for the night. The wizard says he has almost remembered it. He has said this six times.",
      choices: [
        ch("Guess the password", 'WIS', 'bold', "It is the wizard's cat's name and the year. The door opens reluctantly.", "Wrong again. The door shocks you and locks the wizard out."),
        ch("Finish the password reset", 'INT', 'safe', "The recovery instructions work. The wizard chooses a new password and immediately writes it on his sleeve.", "The recovery link has expired. The door enforces the lockout with a flash of lightning."),
        ch("Disconnect the lock's spell", 'DEX', 'reckless', "You disable the lock long enough to get the wizard inside. The door promises to report you.", "The spell snaps back through your fingers. The door remains locked."),
      ],
    },
  },
  {
    id: 'vampire-wedding',
    title: 'Cater a Vampire Wedding',
    task: 'cater a vampire wedding without becoming a canape',
    climax: {
      id: 'x-vampire-wedding',
      text: "The buffet is ready, but one bowl has no label. Two hundred vampires want proof that it contains no garlic. The newlyweds are waiting to eat.",
      choices: [
        ch("Ask the best man to endorse the dip", 'CHA', 'bold', "The best man confirms the recipe. The guests trust him enough to begin dinner.", "The best man points at you instead. The guests crowd you away from the buffet."),
        ch("Taste the entire bowl yourself", 'CON', 'reckless', "You finish the dip without finding garlic. The relieved guests begin dinner.", "You swallow too much at once and collapse coughing. The guests are unconvinced."),
        ch("Replace it with a labeled bowl", 'DEX', 'bold', "You make the swap before the bride reaches the buffet. Dinner begins peacefully.", "You drop the bowl on the bride's dress. The wedding party chases you out."),
      ],
    },
  },
  {
    id: 'fountain',
    title: 'Unclog the Fountain of Youth',
    task: 'unclog the Fountain of Youth, which is backing up into Tuesday',
    climax: {
      id: 'x-fountain',
      text: "The courtyard is drained, but the fountain's main valve is stuck. A final spray of enchanted water is keeping the plumber well below working age.",
      choices: [
        ch("Force the valve closed", 'STR', 'bold', "The spray stops. The plumber ages back to his normal self and sends you an invoice.", "The valve kicks back and sends you tumbling into the basin."),
        ch("Follow the young plumber's instructions", 'WIS', 'safe', "You turn the correct valve. The plumber returns to his proper age and demands a lunch break.", "You mishear the instructions. A fresh jet of water knocks you off the steps."),
        ch("Reach through the spray to the valve", 'CON', 'reckless', "You close the valve by hand. You emerge briefly younger, but the fountain works.", "The water shrinks you out of your boots. You fall into the basin before reaching the valve."),
      ],
    },
  },
  {
    id: 'marrow',
    title: 'Judge the Village Vegetable Contest',
    task: {"f": "judge a village vegetable contest that has ended in a spectacular brawl four years running", "v": {"gritty": "judge a village vegetable contest that has ended in bloodshed four years running", "brutal": "judge a village vegetable contest whose last four prize ceremonies ended with blood on the judging table"}},
    climax: {
      id: 'x-marrow',
      text: "Two giant squashes remain. Their farmers watch you with the patience of people who have brought pitchforks. The tiny first-prize trophy sits between them.",
      choices: [
        ch("Declare a tie with great ceremony", 'CHA', 'bold', "You award two ribbons and promise a second trophy. Both farmers accept.", "Neither farmer wants to share. Their argument knocks the judging table into you."),
        ch("Judge honestly on quality", 'WIS', 'reckless', "Your reasons are clear enough that the disappointed farmer accepts second place.", "The loser calls the contest rigged and tips your chair backward."),
        ch("Measure both entries properly", 'INT', 'safe', "The measurements settle the result. The loser demands a bigger trophy for second place.", "The farmers accuse your tape measure of bias and pull it out of your hands."),
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
      text: "The finish line is ten feet away. A hungry duck is waiting beside it. The marshal refuses to hurry because the parade has an official pace.",
      choices: [
        ch("Stare down the duck", 'CON', 'bold', "The duck abandons its lunch plans. The snails finish in their own time.", "The duck charges. You retreat into the gutter while protecting the parade."),
        ch("Carry the snails across the line", 'DEX', 'reckless', "You deliver every snail safely. The marshal records a suspiciously fast finish.", "You trip. The snails land safely on you, then continue their parade."),
        ch("Offer the duck some bread", 'CHA', 'bold', "The duck accepts lunch elsewhere. The parade crosses without a single missing marcher.", "The duck demands your entire lunch and chases you across the street."),
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
      text: 'The Guild hall is packed. Your rival stands on the dais in spotless armor, holding the trophy "for safekeeping", and has prepared remarks.',
      choices: [
        ch('Duel for the trophy', 'STR', 'bold', 'Three exchanges and the trophy is yours. The armor was mostly decorative.', 'The armor was not decorative. Neither was the sword.'),
        ch('Present your quest record', 'CHA', 'bold', 'Ten quests, itemised. The hall erupts. Your rival claps last, and quietly.', 'Your record includes the incidents. The hall remembers the incidents.'),
        ch('Check the trophy engraving', 'INT', 'safe', 'Rule 9: no pre-engraving. Disqualified on a technicality. Delicious.', 'There is a Rule 10 about pedants. It is enforced physically.'),
        ch('Take the trophy and leave', 'DEX', 'reckless', 'Gone before the gasp. It is on your mantelpiece by supper.', 'You get the trophy. The trophy is heavier than it looks. So is the dais.'),
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
