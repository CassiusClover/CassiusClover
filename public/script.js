'use strict';
const classes = [
  ['fighter','HIT FIRST. THINK EVENTUALLY.','Solves problems by hitting them. Has not yet met a problem that minded.','Second Wind','Heal 2 HP whenever you finish a quest.'],
  ['wizard','ARCANE POWER. QUESTIONABLE JUDGMENT.','Seven years of arcane study. Mostly uses it to win arguments.','Prepared Spell','+4 to your first roll of every quest.'],
  ['rogue','YOUR GOLD LOOKED LONELY.','Insists the gold was already in their pocket when they arrived.','Sticky Fingers','Earn 40% more gold from everything.'],
  ['bard','THREE CHORDS. ZERO REMORSE.','Knows three chords and is not afraid to use them on civilians.','Inspiring Nonsense','Critical success on a natural 18, 19 or 20.'],
  ['cleric','DIVINE INTERVENTION. EVENTUALLY.','Their god is real, attentive, and mildly disappointed.','Thoughts and Prayers','Take 1 less damage from every failure.'],
  ['barbarian','ANGER IS A VALID STRATEGY.','Has two moods. You will be meeting the other one shortly.','Rage','+3 to every roll while at half HP or below.'],
  ['ranger','THE SQUIRREL IS IN CHARGE.','Technically it is the squirrel who is the ranger.','Animal Companion','Gain a luck token at the start of every quest.'],
  ['paladin','YES, WE HAVE HEARD ABOUT THE OATH.','Sworn an oath. Will tell you about the oath. At length.','Smite','+3 to the final roll of every quest.']
];
const tabs = document.querySelector('.class-tabs');
classes.forEach((hero,index) => {
  const button = document.createElement('button');
  button.type = 'button'; button.textContent = hero[0]; button.setAttribute('aria-pressed',String(index === 0));
  button.addEventListener('click',() => {
    tabs.querySelectorAll('button').forEach(tab => tab.setAttribute('aria-pressed',String(tab === button)));
    const art = document.getElementById('class-art');
    art.src = `assets/${hero[0]}.svg`; art.alt = `${hero[0]} character portrait`;
    document.getElementById('class-number').textContent = String(index + 1).padStart(2,'0');
    document.getElementById('class-role').textContent = hero[1];
    document.getElementById('class-name').textContent = `THE ${hero[0].toUpperCase()}.`;
    document.getElementById('class-description').textContent = hero[2];
    document.getElementById('class-perk').textContent = hero[3];
    document.getElementById('class-perk-text').textContent = hero[4];
  });
  tabs.append(button);
});
const outcomes = {
 INT:['Your decoy soup is so good the chef forgets the original. You escape with one grateful tureen.','Your decoy soup is a crime. The ladle finds you. Culinary school remains an option.'],
 STR:['The soup sloshes with joy. You do not spill a friend. Today, you are a hero.','You spill a little. The soup says it is fine. It is not fine.'],
 CHA:['The chef cries into the soup. The soup forgives him. You have invented group therapy.','The chef is unmoved. He seasons you, threateningly.']
};
const choices = document.getElementById('choices');
const result = document.getElementById('roll-result');
const again = document.getElementById('roll-again');
let rolling = false;
choices.querySelectorAll('button').forEach(button => button.addEventListener('click',() => {
  if (rolling) return;
  rolling = true;
  choices.hidden = true; result.hidden = false; result.setAttribute('aria-busy','true');
  result.innerHTML = '<strong>ROLLING FOR DIGNITY…</strong><p>The Dungeon Master is judging your decision.</p>';
  setTimeout(() => {
    const die = Math.floor(Math.random() * 20) + 1;
    const mod = Number(button.dataset.mod);
    const success = die === 20 || (die !== 1 && die + mod >= 12);
    const title = die === 20 ? 'NATURAL 20. SOUPERB.' : die === 1 ? 'NATURAL 1. OH, DEAR.' : success ? 'SUCCESS. SOMEHOW.' : 'A DIGNIFIED FAILURE.';
    result.replaceChildren();
    const heading = document.createElement('strong'); heading.textContent = title;
    const numbers = document.createElement('p'); numbers.textContent = `Rolled ${die} + ${mod} ${button.dataset.stat} = ${die + mod} · Difficulty 12`;
    const story = document.createElement('p'); story.textContent = outcomes[button.dataset.stat][success ? 0 : 1];
    result.append(heading,numbers,story); result.setAttribute('aria-busy','false'); again.hidden = false; rolling = false;
  },650);
}));
again.addEventListener('click',() => {result.hidden = true; again.hidden = true; choices.hidden = false; choices.querySelector('button').focus();});
document.getElementById('year').textContent = new Date().getFullYear();
