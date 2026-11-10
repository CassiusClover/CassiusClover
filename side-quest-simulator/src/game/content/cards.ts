import type { Card } from '../types';
import { ch } from './quests';

/** Road events: two are drawn for each quest before its climax. */
export const CARDS: Card[] = [
  {
    id: 'toll-troll',
    text: 'A troll demands a toll. The bridge he guards spans a puddle.',
    choices: [
      ch('Pay him in compliments', 'CHA', 'safe', 'He blushes moss-green and waves you through.', 'He has heard "nice bridge" before. He bills you in bruises.'),
      ch('Jump the puddle', 'DEX', 'bold', 'A graceful hop. The troll reconsiders his business model.', 'It was deeper than it looked. So was the troll.'),
      ch('Arm-wrestle him for it', 'STR', 'reckless', 'You win. He pays YOU a toll. He seems relieved.', 'Your arm now bends in a new and exciting place.'),
    ],
  },
  {
    id: 'mimic-queue',
    text: 'Every chest in this room is a mimic. They have formed an orderly queue.',
    choices: [
      ch('Join the queue', 'WIS', 'safe', 'You wait your turn. The mimics respect this deeply.', 'You are not a chest. They can tell. They tut, with teeth.'),
      ch('Check what they are queueing for', 'INT', 'bold', 'It is a job fair. You leave with a pamphlet and a tip.', 'It is lunch. It is you.'),
      ch('Cut in line', 'CHA', 'reckless', 'Sheer nerve. They assume you are management.', 'Nothing unites a queue like a queue-jumper.'),
    ],
  },
  {
    id: 'goose-wizard',
    text: 'A wizard blocks the road. On closer inspection, the wizard is three geese in a robe.',
    choices: [
      ch('Honk respectfully', 'CHA', 'bold', 'They honk back. You have been granted passage, and a title.', 'Your accent is offensive. They attack as one.'),
      ch('Tackle the robe', 'STR', 'bold', 'Three geese scatter. The robe has coins in it.', 'The top goose was the dangerous one.'),
      ch('Challenge them to a spell duel', 'INT', 'reckless', 'They do not know magic. They are geese. You win by default.', 'They do know magic. Nobody is more surprised than you.'),
    ],
  },
  {
    id: 'salty-soup',
    text: 'A roadside cauldron of soup asks whether you think it is "too salty, as a person".',
    choices: [
      ch('Reassure it', 'CHA', 'safe', 'The soup feels seen. It gives you its lucky crouton.', 'It can tell you are lying. It simmers at you.'),
      ch('Taste it and find out', 'CON', 'bold', 'Perfectly seasoned. You tell it so. It glows.', 'It IS too salty. Your tongue files a complaint.'),
      ch('Explore why it feels that way', 'WIS', 'reckless', 'A breakthrough. The soup forgives its creator. It tips well.', 'You open something you cannot close. The soup boils over.'),
    ],
  },
  {
    id: 'skeleton-strike',
    text: 'The local skeletons are on strike. The picket line rattles ominously.',
    choices: [
      ch('Negotiate your way across', 'CHA', 'bold', 'You promise to mention calcium to management. They part.', 'They chant about you now. It is catchy and it hurts.'),
      ch('Sneak past', 'DEX', 'bold', 'Not a bone disturbed.', 'You step on a foot. It was somebody\'s. They want it back.'),
      ch('Read their 400-page collective agreement', 'INT', 'safe', 'Clause 9 permits "one (1) adventurer". That is you.', 'You fall asleep on page 12 and wake up as a picket sign.'),
    ],
  },
  {
    id: 'forgetful-door',
    text: 'A door asks you a riddle. It has clearly forgotten the answer.',
    choices: [
      ch('Bluff an answer with confidence', 'CHA', 'bold', '"Yes, that sounds right," says the door, relieved.', 'The door suspects it is being patronised. It slams. On you.'),
      ch('Actually solve the riddle', 'INT', 'reckless', 'You solve it. The door weeps. It has waited so long.', 'There was no answer. The door is embarrassed and violent.'),
      ch('Kick it open', 'STR', 'bold', 'The door respects directness.', 'The door kicks back. Doors can do that here.'),
    ],
  },
  {
    id: 'ghost-form',
    text: 'A ghostly innkeeper insists you complete Form 27-B before you may be haunted.',
    choices: [
      ch('Fill it in properly', 'INT', 'safe', 'Flawless paperwork. The ghost upgrades you to a nicer haunting.', 'You ticked "deceased" by mistake. Processing begins.'),
      ch('Forge a signature and move on', 'DEX', 'bold', 'A perfect forgery of a man dead two hundred years.', 'He recognises his own handwriting. Awkward. Then cold.'),
      ch('Endure an unlicensed haunting', 'CON', 'reckless', 'You sleep through it. The ghost leaves a tip out of pity.', 'Unlicensed hauntings have no safety limits.'),
    ],
  },
  {
    id: 'survey-bandits',
    text: 'Bandits leap from the bushes. They would like two minutes of your time for a customer satisfaction survey.',
    choices: [
      ch('Answer honestly', 'WIS', 'safe', 'Your feedback is "actionable". They give you a voucher.', 'You rate the ambush 2 out of 5. They take it personally.'),
      ch('Run while they find a quill', 'DEX', 'bold', 'Gone before question one.', 'They are bandits. Chasing is the one thing they trained for.'),
      ch('Demand to speak to their manager', 'CHA', 'reckless', 'The manager apologises and refunds a robbery you never had.', 'The manager is larger. Much larger.'),
    ],
  },
  {
    id: 'sleeping-dragon',
    text: 'A dragon sleeps across the path, snoring gently, one eye not quite shut.',
    choices: [
      ch('Tiptoe over its tail', 'DEX', 'bold', 'Silent as a rumour. You pocket a loose scale.', 'You step on the one squeaky bit of dragon.'),
      ch('Sing it a lullaby', 'CHA', 'safe', 'The eye closes. A small puff of contented smoke.', 'It is a critic. It wakes to give notes.'),
      ch('Hold your breath through the smoke', 'CON', 'reckless', 'You stride through like a legend, slightly smoked.', 'You inhale. You should not have inhaled.'),
    ],
  },
  {
    id: 'cursed-lunch',
    text: 'Your packed lunch has become cursed. It is whispering your secrets.',
    choices: [
      ch('Eat it anyway', 'CON', 'bold', 'The curse is no match for your stomach. Tasty, too.', 'The curse is a match for your stomach. A rematch is scheduled hourly.'),
      ch('Exorcise the sandwich', 'WIS', 'bold', 'The spirit departs. The sandwich is now merely stale.', 'The spirit moves into your boots. They whisper now.'),
      ch('Sell it to a passer-by', 'CHA', 'reckless', '"Artisanal," you say. They pay triple.', 'The lunch tells them everything. Everything.'),
    ],
  },
  {
    id: 'opinion-bridge',
    text: 'A rope bridge. Each plank loudly holds a different opinion about the monarchy.',
    choices: [
      ch('Agree with every plank', 'CHA', 'bold', 'You cross on a wave of approval.', 'Plank nine catches you agreeing with plank eight. It drops you.'),
      ch('Run before they finish their sentences', 'DEX', 'safe', 'You are across before the first "well, actually".', 'One plank had a very short opinion.'),
      ch('Win the debate', 'INT', 'reckless', 'The bridge forms a republic in your honour. And pays you.', 'You are ratioed by a bridge.'),
    ],
  },
  {
    id: 'endless-stairs',
    text: 'The shortcut is a tower with four thousand stairs. A sign says "Lift out of order since the First Age".',
    choices: [
      ch('Climb them all', 'CON', 'bold', 'Your calves are now legendary artefacts.', 'You make it to stair 3,999. Then your knees unionise.'),
      ch('Fix the lift', 'INT', 'bold', 'It only needed a new hamster. You ride in style.', 'The lift works. Downwards. Enthusiastically.'),
      ch('Scale the outside', 'DEX', 'reckless', 'Quicker, and you find a nest full of coins.', 'The nest has an owner. With a wingspan.'),
    ],
  },
  {
    id: 'cube-seminar',
    text: 'A gelatinous cube is running a mandatory workplace seminar. Attendance is absorbing.',
    choices: [
      ch('Sit through it attentively', 'WIS', 'safe', 'You get a certificate. It is slightly digested.', 'You nod off and wake up inside the presentation.'),
      ch('Slip out the back', 'DEX', 'bold', 'You are marked "present" and are not.', 'You slip. Into the cube. It is also the back.'),
      ch('Ask a question that derails everything', 'INT', 'reckless', 'The cube cannot answer. It dismisses everyone early. Hero.', 'The cube says "great question" and takes it offline. With you.'),
    ],
  },
  {
    id: 'tavern-brawl',
    text: 'A tavern brawl has broken out over whether fruit belongs on flatbread.',
    choices: [
      ch('Join in on the correct side', 'STR', 'bold', 'Your side wins. Whichever side that was. Free drinks.', 'Both sides agree you are wrong.'),
      ch('Mediate', 'CHA', 'reckless', 'You propose half-and-half. A new era of peace. They tip.', 'Now they are fighting about halves.'),
      ch('Leave by the window', 'DEX', 'safe', 'A clean exit. You take a pie for the road.', 'It was a painting of a window.'),
    ],
  },
  {
    id: 'fairy-contract',
    text: 'A fairy offers you a deal. The contract is forty feet long and smells of lavender.',
    choices: [
      ch('Read the fine print', 'INT', 'bold', 'You find the clause about firstborns and strike it. She pays up, sulking.', 'You miss the clause about elbows. You will miss your elbows.'),
      ch('Decline politely', 'WIS', 'safe', 'So politely that she tips you for the manners.', 'There is no polite way. She takes offence, and a tooth.'),
      ch('Renegotiate in your favour', 'CHA', 'reckless', 'She leaves owing YOU a favour. Unprecedented.', 'You now owe her your name. People call you "Hey".'),
    ],
  },
  {
    id: 'lost-paladin',
    text: 'A paladin has been asking for directions for three days. He refuses to consult the map he is holding.',
    choices: [
      ch('Give clear directions', 'WIS', 'safe', 'He listens. He leaves. A miracle. He tosses you a coin.', 'He hears "left" as "smite". Old habit.'),
      ch('Convince him he has already arrived', 'CHA', 'bold', 'He plants his banner in a turnip field, content.', 'He realises. Paladins hate lies. It is sort of their thing.'),
      ch('Carry him there yourself', 'STR', 'reckless', 'In full plate. He tips like a man with a guilty conscience.', 'In full plate. Your spine writes a resignation letter.'),
    ],
  },
  {
    id: 'mushroom-mayor',
    text: 'You step into a mushroom ring. By ancient law, you are now Mayor of Mushrooms.',
    choices: [
      ch('Govern wisely', 'WIS', 'bold', 'Your reign is brief and beloved. The treasury thanks you.', 'A scandal. Something about spores. You are impeached, forcibly.'),
      ch('Give a stirring inaugural speech', 'CHA', 'bold', 'Not a dry cap in the house.', 'Fungi have no ears. They do have a militia.'),
      ch('Abdicate by leaping out', 'DEX', 'safe', 'A clean leap. The mushrooms elect a snail.', 'You trip on a constituent.'),
    ],
  },
  {
    id: 'new-knight',
    text: 'A black knight bars the way. "None shall pass," he says, then checks his notes. It is his first day.',
    choices: [
      ch('Offer encouragement', 'CHA', 'safe', 'He is so grateful he passes you himself.', 'He thinks you are mocking him. He has a sword and feelings.'),
      ch('Duel him', 'STR', 'bold', 'A fair fight. He thanks you for the feedback.', 'Beginner\'s luck is real and it is heavy.'),
      ch('Point out his sword is backwards', 'INT', 'bold', 'While he checks, you stroll past.', 'It was not backwards. Now he doubts you, pointedly.'),
    ],
  },
  {
    id: 'cat-avalanche',
    text: 'A wagon overturns ahead. It was carrying cats. All of the cats.',
    choices: [
      ch('Herd them', 'DEX', 'reckless', 'You herd cats. Bards will not believe it. The owner pays double.', 'You cannot herd cats. This was known.'),
      ch('Wade through', 'CON', 'bold', 'Scratched but unbowed, you emerge wearing two.', 'So many claws. So little skin left.'),
      ch('Become very still and uninteresting', 'WIS', 'safe', 'The cats lose interest. As is their way.', 'A still, warm object. They sit on you. All of them.'),
    ],
  },
  {
    id: 'lich-scheme',
    text: 'A lich corners you to explain his exciting new business opportunity. It is shaped like a pyramid. He calls it a "phylactery scheme".',
    choices: [
      ch('Nod without investing', 'WIS', 'bold', 'You escape with your gold and a free brochure.', 'You are now a Bronze Tier Associate. It costs you.'),
      ch('Explain why it cannot work', 'INT', 'bold', 'He is devastated. He pays you a consulting fee.', 'He has a counter-argument. It is necromancy.'),
      ch('Outlast the presentation', 'CON', 'safe', 'Six hours. You are still alive. He is technically not. You win.', 'Slide 340 breaks you.'),
    ],
  },
  {
    id: 'not-a-trap',
    text: 'A corridor. A sign reads "DEFINITELY NOT A TRAP". Below it, smaller: "(it is, though)".',
    choices: [
      ch('Dance through the pressure plates', 'DEX', 'bold', 'Flawless. One plate dispenses coins, as an apology.', 'You find all of them. Alphabetically.'),
      ch('Work out the pattern', 'INT', 'safe', 'The safe tiles spell "WELL DONE". Smug, but fair.', 'The safe tiles spelled something else.'),
      ch('Carry a door as a shield and charge', 'STR', 'reckless', 'Darts thud harmlessly. You keep the door. Nice door.', 'The trap was underneath.'),
    ],
  },
  {
    id: 'bard-off',
    text: 'A rival adventurer challenges you to a bard-off. Neither of you is a bard.',
    choices: [
      ch('Sing from the heart', 'CHA', 'bold', 'Rough, but honest. The crowd throws coins, kindly.', 'The crowd throws other things.'),
      ch('Interpretive dance', 'DEX', 'reckless', 'Nobody understands it. Everybody is moved. Big tips.', 'You pull something. Several things.'),
      ch('Simply be louder', 'CON', 'safe', 'Volume is a kind of music.', 'You lose your voice and the contest.'),
    ],
  },
  {
    id: 'oracle-hold',
    text: 'You consult the Oracle. The Oracle has placed you on hold. The hold music is one lute note.',
    choices: [
      ch('Wait patiently', 'WIS', 'bold', 'Eventually: "Your quest is important to us." And a real hint.', 'You are number 4,012 in the queue. The note continues.'),
      ch('Rewire the crystal ball', 'INT', 'reckless', 'You skip the queue and get a refund from fate itself.', 'You are connected to a different Oracle. A rude one.'),
      ch('Charm the receptionist', 'CHA', 'safe', 'She puts you straight through.', 'She puts you straight back to the start.'),
    ],
  },
  {
    id: 'giant-lens',
    text: 'A giant has lost a contact lens. It is the size of a shield and, he says, "around here somewhere".',
    choices: [
      ch('Search methodically', 'WIS', 'safe', 'It was on his head. It usually is. He is grateful.', 'You find it by walking into it, face first.'),
      ch('Climb his face to help put it in', 'DEX', 'reckless', 'A terrifying success. He can see! He sees you! He tips!', 'He blinks.'),
      ch('Carry the lens to him', 'STR', 'bold', 'Heavy, slippery, delivered.', 'You drop it. On you.'),
    ],
  },
  {
    id: 'goblin-samples',
    text: 'A goblin market is offering free samples. Of what, nobody will say.',
    choices: [
      ch('Try everything', 'CON', 'reckless', 'You develop three new immunities and win a prize.', 'Sample six is still alive.'),
      ch('Spot the scam', 'INT', 'bold', 'The "free" samples cost a soul each. You expose it and collect a reward.', 'You are so busy spotting the scam you miss the pickpocket. And the mallet.'),
      ch('Haggle for the sport of it', 'CHA', 'bold', 'You sell a goblin his own hat. Legendary.', 'You buy your own boots. At a markup. After a scuffle.'),
    ],
  },
  {
    id: 'blinking-statue',
    text: 'A statue. You are fairly sure it blinked. It seems fairly sure that you blinked.',
    choices: [
      ch('Staring contest', 'CON', 'bold', 'After an hour it concedes and coughs up a gem.', 'It is made of stone. You are made of eyes.'),
      ch('Sneak past when it sneezes', 'DEX', 'safe', 'Statues sneeze dust. You are through.', 'It was faking the sneeze.'),
      ch('Ask what is bothering it', 'WIS', 'reckless', 'Pigeons. You shoo them. It rewards you with centuries of savings.', 'It tells you. For nine hours. Then it gets angry again.'),
    ],
  },
  {
    id: 'inconvenience-portal',
    text: 'A pothole in the road is a portal to the Dimension of Mild Inconvenience.',
    choices: [
      ch('Leap over it', 'STR', 'bold', 'Cleared. Behind you, someone\'s shoelace comes undone forever.', 'You fall in. Everything there is slightly sticky.'),
      ch('Seal it with arcane theory', 'INT', 'reckless', 'Closed. The road authority pays a bounty.', 'You widen it. Your socks are wet now. Permanently.'),
      ch('Wade through and endure', 'CON', 'safe', 'A stubbed toe, a wobbly chair, and you are out.', 'There is a queue inside. And a form.'),
    ],
  },
  {
    id: 'horse-review',
    text: 'Your rented horse has left you a one-star review and is reading it aloud to other horses.',
    choices: [
      ch('Apologise sincerely', 'CHA', 'bold', 'It amends the review to three stars and returns your deposit.', 'It adds a paragraph. And a hoof.'),
      ch('Speak to it horse-to-horse', 'WIS', 'reckless', 'A deep understanding is reached. It carries you for free.', 'You have said something unforgivable in Horse.'),
      ch('Carry the horse for a while', 'STR', 'bold', 'Fair is fair. It appreciates the gesture.', 'It is a large horse and it does not hold still.'),
    ],
  },
  {
    id: 'cheese-moon',
    text: { f: 'A cult believes the moon is cheese. They are building a very tall cracker.', c: 'A cult believes the moon is cheese. They are building a very tall cracker and have had some wine.', x: 'A cult believes the moon is cheese. They are building a very tall cracker and are absolutely plastered.' },
    choices: [
      ch('Help with the engineering', 'INT', 'bold', 'Your load calculations are flawless. They pay in cheese futures.', 'The cracker collapses. On the engineer.'),
      ch('Pose as their prophet', 'CHA', 'reckless', 'They shower you in offerings. Mostly cheese. Some gold.', 'The real prophet arrives. He is cross and well-armed.'),
      ch('Carry cracker segments', 'STR', 'safe', 'Honest labour, honest pay.', 'You carry one segment too many.'),
    ],
  },
  {
    id: 'wizard-neighbours',
    text: 'Two wizards are feuding over a hedge. The hedge has been turned into, and back from, most things.',
    choices: [
      ch('Survey the property line', 'INT', 'safe', 'The hedge belongs to a third wizard. They unite in outrage, and pay you.', 'You are standing on the line. Both fire.'),
      ch('Trim the hedge while they argue', 'DEX', 'bold', 'Problem removed. Neither can remember what it was.', 'The hedge is currently a bear.'),
      ch('Stand between them and absorb a spell', 'CON', 'reckless', 'You are briefly a teapot, then a hero.', 'You are a teapot for most of the afternoon. A cracked one.'),
    ],
  },
  {
    id: 'haunted-privy',
    text: { f: 'The only outhouse for miles is haunted. The ghost wants a chat.', c: 'The only privy for miles is haunted. The ghost has no concept of privacy.', x: 'The only bog for miles is haunted. The ghost has no concept of privacy and plenty of opinions.' },
    choices: [
      ch('Make polite conversation', 'CHA', 'safe', 'He just wanted company. He tells you where he buried his savings.', 'He wants to talk about his death. It is a long story and it is contagious.'),
      ch('Hold it until the next village', 'CON', 'bold', 'Iron will. Iron bladder.', 'The next village is far. You arrive a broken person.'),
      ch('Perform a quick exorcism', 'WIS', 'bold', 'He departs in peace. The seat is still cold.', 'You exorcise the outhouse instead. The ghost remains, now outdoors, and furious.'),
    ],
  },
  {
    id: 'barbarian-book-club',
    text: 'A horde of barbarians surrounds you. They need one more member for their book club or it "does not count".',
    choices: [
      ch('Offer a thoughtful reading of chapter three', 'INT', 'bold', 'Stunned silence. Then applause. Then snacks and a stipend.', 'You spoil the ending. Axes are drawn.'),
      ch('Out-shout them about the themes', 'STR', 'bold', 'Loudest take wins. This is how criticism works.', 'Their take was louder. And had a fist in it.'),
      ch('Admit you have not read it', 'WIS', 'reckless', 'Neither have they. A bond is forged. They chip in for your trouble.', 'They HAVE read it. All of them. Twice.'),
    ],
  },
];
