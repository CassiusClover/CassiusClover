import type { DmEvent } from './dm';

/** Full alternatives, not a swear-word suffix attached to a clean line. */
export const DM_LANGUAGE: Record<DmEvent, { c: string; x: string }[]> = {
  intro: [
    { c: 'Welcome, {hero}. {rival} has sponsorship, a fan club and cheekbones. You have a suspiciously affordable character sheet.', x: '{hero}, welcome to the shitshow. {rival} has already ordered the trophy. Ten quests to ruin the smug bastard\'s delivery.' },
    { c: 'The Guild calls this a fair contest. {rival} calls it a victory tour. I call your odds character-building.', x: 'Right, {hero}. {rival} gets a victory tour; you get the jobs nobody bloody wants. Let us make that embarrassing for them.' },
  ],
  board: [
    { c: 'Three vacancies. None offers dental cover, and the one with the neat handwriting is almost certainly a cult.', x: 'Fresh jobs. Shit pay, worse clients, and a suspicious number of waivers. Pick your preferred disaster.' },
    { c: 'New postings. The Guild has thoughtfully removed every mention of who last attempted them.', x: 'The Guild has found three more ways to fuck up your afternoon. At least one pays actual money.' },
  ],
  boardHurt: [
    { c: 'You are leaning on the board for professional support. The board has requested a transfer.', x: 'You look like shit, {hero}. Pick something manageable before the Guild starts measuring you for a commemorative plaque.' },
    { c: 'Your remaining health has entered the realm of optimistic accounting. Perhaps the easy job.', x: 'Those hit points are a bloody rounding error. Try a job with fewer opportunities to become an anecdote.' },
  ],
  rival1: [
    { c: '{rival} has published a memoir after three jobs. The acknowledgements thank absolutely everyone except you.', x: '{rival} has written a memoir. Three jobs, two hundred pages, and somehow the bastard has a sequel deal.' },
    { c: 'The good postings have gone. {rival} left you a motivational note. I have sensibly burned it.', x: '{rival} took the decent jobs and left a note saying believe in yourself. What a load of bollocks.' },
  ],
  rival2: [
    { c: '{rival} has started adding Hero of the Year to correspondence. The Guild is billing them for premature stationery.', x: '{rival} is signing autographs already. Apparently being a smug bastard counts as a full-time occupation.' },
    { c: 'Halfway through. Your rival has a publicist; you have a growing collection of awkward receipts.', x: 'Halfway, {hero}. {rival} has a publicist. You have a pile of receipts and a magnificent tolerance for bullshit.' },
  ],
  rival3: [
    { c: '{rival} booked the trophy ceremony and put you down as essential staff. Presumptuous, even by Guild standards.', x: '{rival} booked the victory party. You are listed as staff. Do make the arrogant bastard regret the seating plan.' },
    { c: 'Almost the showdown. Your rival is rehearsing modesty. Reports suggest it is their weakest discipline.', x: 'Nearly there. {rival} is practising a humble victory speech. Even the mirror thinks it is bullshit.' },
  ],
  final: [
    { c: 'One trophy, two egos, and a roomful of people hoping for something worth gossiping about.', x: 'Final posting. One trophy, one rival, and an audience that paid good money to watch this shit go sideways.' },
    { c: '{rival} brought an audience and a prepared speech. You brought an actual work record. Awfully vulgar of you.', x: '{rival} has a speech. You have nine jobs worth of evidence. Time to find out which one the Guild gives a shit about.' },
  ],
  questStart: [
    { c: '"{quest}". The client describes it as straightforward. The client has also declined to make eye contact.', x: '"{quest}". The client says there is no catch. That is generally where the bullshit starts.' },
    { c: 'You accept "{quest}". Somewhere a Guild clerk quietly moves a folder from pending to entertaining.', x: '"{quest}". Right. Let us see which bastard left the important part out of the job description.' },
    { c: '"{quest}". Your confidence has arrived ahead of your qualifications, as usual.', x: 'Off you go to "{quest}", {hero}. Your confidence has no evidence behind it, but fuck me, it is persistent.' },
  ],
  bridgeGood: [
    { c: 'Onward, buoyed by the dangerous belief that competence is a renewable resource.', x: 'That actually worked. Try not to let one good decision turn the next one into complete bollocks.' },
    { c: 'You press on. The next complication has been practising while you were feeling pleased with yourself.', x: 'You continue, looking indecently pleased. The next bit has had all afternoon to prepare some fresh bullshit.' },
  ],
  bridgeBad: [
    { c: 'You continue with the dignity of someone hoping nobody wrote that down. I did.', x: 'Well, that was a shit idea. Fortunately, the road has provided several more opportunities.' },
    { c: 'A brisk change of subject seems wise. The next scene has its own witnesses.', x: 'Moving on before anyone invoices you for that fuck-up. The next problem has already started charging.' },
  ],
  climaxGood: [
    { c: 'The finale. You have prepared, which is an unusually personal attack on my expectations.', x: 'The finale. You came prepared. That is going to make the inevitable bullshit feel almost unfair.' },
    { c: 'Here comes the important bit. Try to remember which part of your plan was supposed to be sensible.', x: 'Main event. Keep the useful bit of your plan and discard the rest of the bollocks.' },
  ],
  climaxBad: [
    { c: 'The finale arrives before your composure has finished getting dressed.', x: 'The finale. You arrive looking like shit and carrying a plan of comparable quality.' },
    { c: 'Here is the difficult part. Your expression suggests an unhelpful familiarity with that concept.', x: 'The hard part. Yes, that implies the earlier disasters were the easy shit. I admire your optimism.' },
  ],
  success: [
    { c: 'Competence, in public. Your reputation may take several witnesses to believe it.', x: 'Well, shit. That worked. Your confidence has finally produced one supporting document.' },
    { c: 'A clean success. I shall record it before you explain your reasoning and ruin the effect.', x: 'You pull it off. The bastard writing the incident report will have to find something else to complain about.' },
    { c: 'You succeed with just enough composure to pretend this was the plan all along.', x: 'For once, the result is better than the bollocks you said before attempting it. Savour the discrepancy.' },
  ],
  fail: [
    { c: 'An ambitious interpretation of the word solution. The witnesses have chosen incident instead.', x: 'A complete fuck-up, but at least it is specific enough for the paperwork.' },
    { c: 'The plan has lodged a formal complaint against the person who thought of it.', x: 'You tried to {choice}. The universe reviewed the proposal and replied: absolutely bloody not.' },
    { c: 'That result will require a careful choice of words on the invoice.', x: 'Shit. There goes the version of the story you were going to tell people.' },
  ],
  crit: [
    { c: 'An outrageous success. I shall now have to listen to you describe it as a natural talent.', x: 'Fuck me, you actually nailed it. Even the witnesses have run out of petty objections.' },
    { c: 'Flawless. Your rival is about to experience a deeply inconvenient feeling of professional insecurity.', x: 'Perfect. Somewhere, {rival} has just realised the trophy might go to the wrong bastard.' },
  ],
  fumble: [
    { c: 'A natural one. Your plan has requested that its name be removed from the credits.', x: 'A natural one. What a spectacular fucking way to find the only bad angle.' },
    { c: 'A critical failure with unusually strong testimonial value.', x: 'Critical failure. The Guild will dine out on this shit for years.' },
  ],
  bribe: [
    { c: 'A commercial solution. Your moral flexibility remains the most reliable tool in the bag.', x: 'You pay the bastard. Astonishing how many ancient obstacles accept exact change.' },
    { c: 'Gold changes hands. The problem has suddenly remembered a more pressing appointment.', x: 'Cash works. All that heroic posturing, and the answer was a sufficiently large pile of bloody coins.' },
  ],
  streakGood: [
    { c: 'Three successes. Your rival has begun describing you as suspiciously consistent.', x: 'Three in a row. Either you have learned something or the universe has misplaced the usual bullshit.' },
    { c: 'A streak. Do resist the urge to put it on a business card before the next scene.', x: 'Look at you, making good decisions like a smug bastard with a functioning plan.' },
  ],
  streakBad: [
    { c: 'A pattern is emerging. Unfortunately, the pattern has retained legal representation.', x: 'Another failure. At some point we must consider the possibility that the plan is shit.' },
    { c: 'The Guild calls this valuable experience. The Guild is not paying for the valuable experience.', x: 'You are collecting fuck-ups with the commitment most people reserve for hobbies.' },
  ],
  reroll: [
    { c: 'A second opinion from fate. Fate has asked whether this will be a regular arrangement.', x: 'A reroll. A respectable way to tell the universe its first answer was bullshit.' },
    { c: 'You spend luck to reopen the negotiations. An accountant somewhere winces.', x: 'Spending luck. Sensible, if you have finally accepted that confidence alone does fuck-all.' },
  ],
  lethal: [
    { c: 'That is your remaining health, itemised and accounted for. A deeply inconvenient total.', x: 'Shit. All your remaining hit points. I have checked the sum and it is still terrible.' },
    { c: 'A terminal administrative development. The next button is going to be rather significant.', x: 'That does it. Your hit points have collectively told this adventure to fuck off.' },
  ],
  questDone: [
    { c: 'Done. The client has signed the form before finding another thing to complain about.', x: 'Job finished. Take the money before the bastard remembers another bloody requirement.' },
    { c: 'Payment received. Professional respect remains subject to a frankly insulting cooling-off period.', x: 'You did the job. Paid, even. A rare break in the Guild\'s usual chain of bullshit.' },
  ],
  questDoneBadly: [
    { c: 'Complete, with qualifications. The client has written technically in very large letters.', x: 'Technically finished. Half pay. The client used the phrase absolute bloody shambles twice.' },
    { c: 'The contract is closed. The complaint file has a promising future.', x: 'The job is over, which is the kindest thing anyone can say about that shitshow.' },
  ],
  dead: [
    { c: 'The curtain falls on {hero}. The Guild will describe this as an opening for fresh talent.', x: 'That is it for {hero}. A shit end to a gloriously questionable set of professional choices.' },
    { c: '{rival} sends condolences. The card is signed in a hand suspiciously similar to their publicist\'s.', x: '{rival} sends flowers. The smug bastard kept the receipt, obviously.' },
  ],
  revived: [
    { c: 'Back again, courtesy of a sponsor with surprisingly flexible standards for brand ambassadors.', x: 'Alive again. The sponsors apparently believe you have one more profitable fuck-up in you.' },
    { c: 'A commercial miracle. Do try to look grateful without making any legally binding promises.', x: 'Back on your feet. Try to make the advertiser\'s money last longer than your last bloody plan.' },
  ],
  victory: [
    { c: 'Hero of the Year: {hero}. {rival} has requested a recount of the concept of heroism.', x: 'Hero of the Year: {hero}. {rival} is furious, the Guild is confused, and you actually bloody earned it.' },
    { c: 'The trophy is yours. I am prepared to admit competence under strictly limited circumstances.', x: 'You won, {hero}. Against all that bullshit, you won. Do not make me repeat the nice part.' },
  ],
};
