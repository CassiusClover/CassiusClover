import type { Txt } from '../types';

/**
 * The Dungeon Master: a narrator with opinions. Every run has an arc (the race against a
 * rival for Hero of the Year, ending in a showdown) and the DM reacts to how it is going.
 * Tokens: {hero} {rival} {quest} {class} {choice}.
 */
export const RIVALS = [
  'Sir Gavin the Sponsored', 'Brenda Two-Swords', 'Lord Tarquin of Legal', 'Chadwick the Punctual',
  'Dame Ottoline the Verified', 'Big Kev of the North Car Park', 'Lady Prunella Standing-Ovation', 'Magnus the Recently Promoted',
];

/** The Dungeon Master is in one of these moods for a whole season. */
export const MOODS = [
  'theatrical', 'passive-aggressive', 'world-weary', 'suspiciously cheerful', 'pedantic', 'conspiratorial', 'hungover', 'competitive',
];

export type DmEvent =
  | 'intro' | 'board' | 'boardHurt' | 'rival1' | 'rival2' | 'rival3' | 'final'
  | 'questStart' | 'bridgeGood' | 'bridgeBad' | 'climaxGood' | 'climaxBad'
  | 'success' | 'fail' | 'crit' | 'fumble' | 'bribe' | 'deal' | 'rivalMeet' | 'momentum' | 'streakGood' | 'streakBad' | 'reroll' | 'lethal'
  | 'questDone' | 'questDoneBadly' | 'dead' | 'revived' | 'victory';

export const DM_LINES: Record<DmEvent, Txt[]> = {
  intro: [
    'Welcome, {hero}. The Guild crowns one Hero of the Year. The favourite is {rival}. You are listed under "also attending".',
    'Right. {hero}, {class}. The Guild has a Hero of the Year trophy and {rival} has already had it engraved. Ten quests to change the engraving.',
    'Here is the situation, {hero}: ten quests stand between you and Hero of the Year. Also between you and it: {rival}, who is better funded.',
  ],
  board: [
    'Three jobs on the board. All of them are beneath you. Pick one anyway.',
    'The board has been restocked. I use the word "stocked" loosely.',
    'Choose a quest. I have prepared all three, and I am proud of none of them.',
    'New postings. The handwriting gets worse as the pay gets better. Draw your own conclusions.',
    'Another day, another noticeboard. Somewhere, {rival} is being applauded.',
  ],
  boardHurt: [
    'You are bleeding on the noticeboard, {hero}. Perhaps something gentle this time.',
    'I am not saying take the easy one. I am saying I have seen your hit points.',
    'You look dreadful. The board does not care. I care slightly.',
  ],
  rival1: [
    'News from the Guild: {rival} has finished three quests and published a memoir about it. You are not mentioned.',
    '{rival} was seen leaving this very board with the good jobs. These are the others.',
  ],
  rival2: [
    'A note is pinned to the board in {rival}\'s handwriting. It says "Still here?" with a little drawing of you. It is not flattering.',
    'Halfway. {rival} has started signing autographs "Hero of the Year (pending)". The pending is very small.',
  ],
  rival3: [
    'Word is {rival} has leaned on the Guild: the last job of the year will be a showdown. Sharpen something, {hero}.',
    'Nearly there. {rival} has booked a venue for the victory party. You are on the list as staff.',
  ],
  final: [
    'This is it. One posting, one rival, one trophy. {rival} is waiting, and has brought an audience.',
    'The board holds a single notice, and it has your name on it. And {rival}\'s. Mostly {rival}\'s.',
  ],
  questStart: [
    'So: "{quest}". I wrote this one on a train. Off you go.',
    'You accept "{quest}". The client looks relieved, which should worry you.',
    '"{quest}". Simple, in the way that falling is simple.',
    'And so {hero} sets out on "{quest}", with confidence I can only describe as unearned.',
    'I will be honest, I did not expect anyone to take "{quest}". Give me a moment to find my notes.',
  ],
  bridgeGood: [
    'Emboldened, you press on. Then:',
    'That went well. I will fix that. Next:',
    'You stride onward like someone who has never met consequences.',
    'A good start. The road, however, has more road on it.',
  ],
  bridgeBad: [
    'Limping, but technically adventuring, you continue.',
    'You walk it off. It does not come off. Meanwhile:',
    'Dignity lightly dented, you carry on.',
    'Let us not dwell on that. I will, later. For now:',
  ],
  climaxGood: [
    'And now the main event. You arrive in good shape, which I intend to correct.',
    'The finale. Everything so far was the tutorial.',
  ],
  climaxBad: [
    'The finale. You arrive looking like a cautionary tale.',
    'Here is the hard part. You have, regrettably, already used your easy part.',
  ],
  success: [
    'Fine. That works. I am writing it down as "luck".',
    'It succeeds. I had a whole paragraph ready for the other outcome.',
    'Competence. Unexpected, but the dice allow it.',
    'Yes, all right. Well done. Do not look at me like that.',
    'A clean success. {rival} would have done it with a flourish, mind.',
  ],
  fail: [
    'No. And I want you to think about why.',
    'The dice have considered your proposal and declined.',
    'That is going in the campaign notes under "incidents".',
    'It goes wrong in the ordinary way. I had hoped for something more original.',
    'Ah. Well, you tried to {choice}. History will be the judge. History and I.',
  ],
  crit: [
    'A natural triumph. I am legally required to describe it as glorious. It was glorious.',
    'Critical success. Somewhere, {rival} feels a chill and does not know why.',
    'Oh, come ON. Fine. It is perfect. Everyone claps. I clap, slowly.',
  ],
  fumble: [
    { f: 'A natural one. I did not even need my notes for this.', c: 'A natural one. I am not angry, I am delighted.', x: 'A natural one. Absolutely bloody magnificent. Do it again.' },
    'Critical failure. I shall be telling the other Dungeon Masters about this.',
    'The die shows a one. The die is embarrassed for you.',
  ],
  bribe: [
    'Gold changes hands. A hero for the modern age.',
    'You pay it to go away. I wrote that encounter by candlelight, you know.',
    'Capitalism defeats another carefully designed obstacle.',
  ],
  deal: [
    'A transaction. No dice were harmed. I find that disappointing.',
    'You simply paid for it. I had prepared a whole encounter.',
    'Done, and nobody rolled anything. This is not what I trained for.',
    'A fair exchange. I will be auditing it later.',
  ],
  rivalMeet: [
    'Before the quest proper: an interruption, wearing better armour than you.',
    'Hold on. Someone is in your way, and they have been practising their smirk.',
    'You set out on "{quest}" and immediately meet the one person you hoped not to.',
  ],
  momentum: [
    'The finale. You arrive with the wind behind you, which is not something I arranged.',
    'And now the main event. You have momentum. I shall see what I can do about that.',
  ],
  streakGood: [
    'Three in a row. I am adjusting the difficulty. Out of spite.',
    'You are on a streak, {hero}. I have made a note to find out who is helping you.',
    'This is going suspiciously well. I am checking the dice for tampering.',
  ],
  streakBad: [
    'That is several failures running. I would offer advice but I am enjoying this.',
    'Again? At this point the monsters are pulling their punches.',
    'Somewhere {rival} has sensed your form and ordered more champagne.',
  ],
  reroll: [
    'Spending luck. Bold of you to assume it was yours to spend.',
    'A reroll. Fate sighs and reaches for the dice again.',
  ],
  lethal: [
    'I should mention this one is fatal. Take your time on the next button.',
    'Ah. That is all of your hit points. I counted twice.',
  ],
  questDone: [
    'Quest complete. The client is satisfied, or at least has stopped writing to me.',
    'Done. Payment is rendered. So is a small amount of respect, on loan.',
    '"{quest}": finished. I am as surprised as you are.',
  ],
  questDoneBadly: [
    'It is done, in the sense that it is over. Half pay. The client used the word "technically".',
    'Complete, with complaints. The client pays half and will be telling people.',
  ],
  dead: [
    'And there ends {hero}. I would say it was a noble end, but we both saw it.',
    'Dead. {rival} sends flowers. They are from a hotel lobby.',
    'That is the end of {hero}. I will keep the character sheet. As evidence.',
  ],
  revived: [
    'A sponsor has intervened. You are alive again, and contractually grateful.',
    'Back from the dead, courtesy of our advertisers. Try to make it worth their money.',
  ],
  victory: [
    'Hero of the Year: {hero}. {rival} has taken a job in accounts. I may have misjudged you. Do not quote me.',
    'It is over. The trophy is re-engraved, badly, with your name. {rival} is asking if the Guild is hiring bards.',
  ],
};
