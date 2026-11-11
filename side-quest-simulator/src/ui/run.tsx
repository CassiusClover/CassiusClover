import React, { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TIER_NAMES } from '../game/content/quests';
import {
  bribeCost, canBribe, canBuyPotion, canReroll, canRevive, cardOf, checkInfo, classOf, ancestryOf, currentCard,
  describeBoon, giverOf, isClimax, modOf, objectiveOf, potionCost, POTION_HEAL, questPay, QUESTS_TO_WIN, quirkOf,
  relicOf, t, textFor, narrationFor, isLiveNarration, twistOf,
} from '../game/engine';
import { canChoose, choiceUnlocked } from '../game/stories';
import { deathDescription, deathHeading, injuryDescription } from '../game/contentSettings';
import { Art, ArtBanner, HeroArt } from '../art/Art';
import { artForCard, artForObjective } from '../art/creatures';
import { artForGiver } from '../art/cast';
import { panelForCard } from '../art/panels';
import { tipsFor } from '../game/meta';
import type { Meta, RunState, Tone, Violence } from '../game/types';
import { STATS } from '../game/types';
import { D20, DmSays, Pop, Shake } from './fx';
import { Tracker } from './tracker';
import { Bar, Button, C, CloseButton, H1, H2, OnWood, P, Paper, Pill, Row, PlayScreen, Small, serif } from './kit';

const signed = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

export const Hud = ({ run, onClose }: { run: RunState; onClose?: () => void }) => {
  // Shake the portrait whenever health drops.
  const prevHp = useRef(run.hero.hp);
  const [hits, setHits] = useState(0);
  useEffect(() => {
    if (run.hero.hp < prevHp.current) setHits((h) => h + 1);
    prevHp.current = run.hero.hp;
  }, [run.hero.hp]);
  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Shake trigger={hits}>
          <HeroArt classId={run.hero.classId} ancestryId={run.hero.ancestryId} size={56} mood={run.phase === 'result' ? 'neutral' : run.hero.hp <= run.hero.maxHp / 4 ? 'disaster' : 'neutral'} />
        </Shake>
        <View style={{ flex: 1, gap: 6 }}>
          <Row style={{ justifyContent: 'space-between', flexWrap: 'nowrap' }}>
            <OnWood style={{ fontWeight: '700', color: C.cream, flexShrink: 1 }}>{run.hero.name}</OnWood>
            <OnWood>Quest {Math.min(run.questIndex + 1, QUESTS_TO_WIN)}/{QUESTS_TO_WIN}</OnWood>
            {onClose ? <CloseButton onPress={onClose} label="Save and leave" size={30} /> : null}
          </Row>
          <Bar value={run.hero.hp} max={run.hero.maxHp} />
          <Row>
            <Pill label="HP" value={`${run.hero.hp}/${run.hero.maxHp}`} color={C.red} />
            <Pill label="GOLD" value={run.gold} color="#7a5a17" />
            <Pill label="LUCK" value={run.luck} color={C.green} />
          </Row>
        </View>
      </View>
      <Row style={{ gap: 4 }}>
        {STATS.map((stat) => (
          <View key={stat} style={st.stat}>
            <Text style={st.statName}>{stat}</Text>
            <Text style={st.statVal}>{signed(modOf(run.hero.stats[stat]))}</Text>
          </View>
        ))}
      </Row>
    </View>
  );
};

/** The full sheet is available on demand, without taking half of every scene. */
const PlayHeader = ({ run, onClose, tone = 0, violence = 0, tracker = false }: {
  run: RunState; onClose?: () => void; tone?: Tone; violence?: Violence; tracker?: boolean;
}) => {
  const [details, setDetails] = useState(false);
  return <>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Pressable testID="hero-details" accessibilityRole="button" accessibilityLabel="Hero stats and equipment" onPress={() => setDetails(true)} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <HeroArt classId={run.hero.classId} ancestryId={run.hero.ancestryId} size={32} />
        <View style={{ flex: 1, gap: 2 }}>
          <OnWood style={{ color: C.cream, fontWeight: '700', fontSize: 14, lineHeight: 18 }}>{run.hero.name}</OnWood>
          <Text style={{ color: C.parchmentDim, fontSize: 12 }}>HP {run.hero.hp}/{run.hero.maxHp}   ·   {run.gold} gold   ·   {run.luck} luck</Text>
          <Bar value={run.hero.hp} max={run.hero.maxHp} />
        </View>
      </Pressable>
      {onClose ? <CloseButton onPress={onClose} label="Save and leave" size={28} /> : null}
    </View>
    {tracker ? <Tracker compact run={run} tone={tone} violence={violence} /> : null}
    <Modal visible={details} transparent animationType="fade" onRequestClose={() => setDetails(false)}>
      <View style={st.overlay}><View style={st.detailSheet}>
        <Row><H2 style={{ flex: 1 }}>Your adventurer</H2><CloseButton onPress={() => setDetails(false)} size={32} /></Row>
        <ScrollView contentContainerStyle={{ gap: 12 }}><Hud run={run} />
          <P>{ancestryOf(run.hero.ancestryId).name} {classOf(run.hero.classId).name}</P>
          <Small>{quirkOf(run.hero.quirkId).name}</Small>
          <Small>{run.relics.length ? run.relics.map((id) => relicOf(id).name).join(', ') : 'No relics yet.'}</Small>
        </ScrollView>
      </View></View>
    </Modal>
  </>;
};

export const BoardScreen = ({ run, tone, violence = 0, onPick, onQuit }: { run: RunState; tone: Tone; violence?: Violence; onPick: (i: number) => void; onQuit: () => void }) => {
  const short = useWindowDimensions().height < 700;
  const [selected, setSelected] = useState(0);
  const index = Math.min(selected, run.board.length - 1);
  const offer = run.board[index];
  const obj = objectiveOf(offer.objectiveId);
  const twist = twistOf(offer.twistId);
  return <PlayScreen compact={short} contentKey={`board-${run.questIndex}`} header={<PlayHeader run={run} onClose={onQuit} tracker tone={tone} violence={violence} />} actions={
    <Button compact testID={`quest-${index}`} label={`Accept · ${questPay(run, offer)} gold reward`} kind="primary" onPress={() => onPick(index)} />
  }>
    <OnWood style={st.heading}>{run.board.length === 1 ? 'The final posting' : 'Choose a job'}</OnWood>
    <DmSays compact text={narrationFor(run, tone, violence)} />
    {run.board.map((job, i) => <Pressable key={job.objectiveId} testID={`offer-${i}`} accessibilityRole="button" accessibilityState={{ selected: i === index }} accessibilityLabel={t(objectiveOf(job.objectiveId).title, tone, violence)} onPress={() => setSelected(i)} style={[st.offer, short && { padding: 6 }, i === index && { borderColor: C.gold, borderWidth: 2 }]}>
      <Art art={artForObjective(job.objectiveId)} size={44} />
      <View style={{ flex: 1, gap: 2 }}><P style={{ fontSize: 15, lineHeight: 19, fontWeight: '700' }}>{t(objectiveOf(job.objectiveId).title, tone, violence)}</P>
        <Small style={{ fontSize: 11 }}>{TIER_NAMES[job.tier]} · {questPay(run, job)} gold</Small></View>
    </Pressable>)}
    <Paper style={{ padding: short ? 8 : 12 }}>
      <Row><Art art={artForGiver(offer.giverId)} size={30} /><Small style={{ flex: 1 }}>{t(giverOf(offer.giverId).name, tone, violence)}</Small></Row>
      <P style={{ fontSize: 16, lineHeight: 22 }}>Your job: {t(obj.task, tone, violence)}.</P>
      <Small>{t(twist.text, tone, violence)} {twist.note}{offer.tier === 2 ? '. Includes a relic offer.' : ''}</Small>
    </Paper>
  </PlayScreen>;
};

const riskName = { safe: 'Careful', bold: 'Bold', reckless: 'Reckless' } as const;

export const CardScreen = ({ run, tone, violence = 0, onChoose, onBribe, onQuit }: {
  run: RunState; tone: Tone; violence?: Violence; onChoose: (i: number) => void; onBribe: () => void; onQuit: () => void;
}) => {
  const card = currentCard(run)!;
  const q = run.quest!;
  const { height } = useWindowDimensions();
  const denseChoices = height < 700 && card.choices.filter((c) => choiceUnlocked(run, c)).length > 3;
  const panel = panelForCard(card.id, run.rival);
  const art = card.art ? artForObjective(card.art) : artForCard(card.id);
  const key = `${run.questIndex}-${q.cardIdx}`;
  return <PlayScreen contentKey={key} header={<PlayHeader run={run} onClose={onQuit} tracker tone={tone} violence={violence} />} actions={<>
    <View style={{ gap: 6, ...(denseChoices ? { flexDirection: 'row', flexWrap: 'wrap' } as const : {}) }}>
    {card.choices.map((choice, i) => {
      if (!choiceUnlocked(run, choice)) return null;
      const info = checkInfo(run, choice);
      const sub = choice.deal
        ? `${choice.deal.gold} gold${choice.deal.luck ? ` + ${choice.deal.luck} luck` : ''} · Guaranteed · No roll prize`
        : `${denseChoices ? '' : riskName[choice.risk] + ' · '}${choice.stat} ${signed(info.mod + info.bonus)} · DC ${info.dc} · ${Math.round(info.chance * 100)}%`;
      return <View key={`${key}-${i}`} style={denseChoices ? { width: '49%' } : undefined}><Button compact testID={`choice-${i}`} label={t(choice.label, tone, violence)} sub={sub + (choice.hint ? `\n${choice.hint}` : '')} disabled={!canChoose(run, choice)} onPress={() => onChoose(i)} /></View>;
    })}
    </View>
    {!isClimax(run) ? <Pressable testID="bribe" accessibilityRole="button" accessibilityLabel={`Bribe your way past, ${bribeCost(run)} gold. No reward.`} disabled={!canBribe(run)} onPress={onBribe} style={{ minHeight: 32, alignItems: 'center', justifyContent: 'center', opacity: canBribe(run) ? 1 : .45 }}>
      <Text style={{ color: C.parchmentDim, fontSize: 12 }}>Pay to pass · {bribeCost(run)} gold · No reward</Text>
    </Pressable> : null}
  </>}>
    <OnWood style={[st.heading, { marginTop: 0, fontSize: 16, lineHeight: 21 }]}>{t(objectiveOf(q.offer.objectiveId).title, tone, violence)}{isClimax(run) ? ' · Finale' : ''}</OnWood>
    <Paper style={{ padding: height < 700 ? 8 : 10, gap: 8 }}>
      {height < 700 ? <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Art art={art} size={56} />
        <P style={{ flex: 1, fontSize: 16, lineHeight: 22 }}>{textFor(run, card.text, tone, violence)}</P>
      </View> : <>
        {panel ? <ArtBanner compact height={card.choices.length > 3 || height < 740 ? 88 : 130} art={panel} /> : <View style={{ alignItems: 'center', backgroundColor: art?.bg, borderRadius: 4 }}><Art art={art} size={104} /></View>}
        <P style={{ fontSize: 17, lineHeight: 23 }}>{textFor(run, card.text, tone, violence)}</P>
      </>}
      {q.momentum ? <Small style={{ color: q.momentum > 0 ? C.green : C.red, fontSize: 11 }}>Finale bonus: {signed(q.momentum)}</Small> : null}
    </Paper>
    <DmSays compact text={narrationFor(run, tone, violence)} live={isLiveNarration(run, tone, violence)} />
  </PlayScreen>;
};

const outcomeTitle = { crit: 'Critical success', success: 'Success', fail: 'Failure', fumble: 'Critical failure', bribe: 'Money talks', deal: 'Deal agreed' } as const;

export const ResultScreen = ({ run, tone, violence = 0, onProceed, onReroll, onRevealed }: {
  run: RunState; tone: Tone; violence?: Violence; onProceed: () => void; onReroll: () => void; onRevealed: (good: boolean) => void;
}) => {
  const res = run.result!;
  const short = useWindowDimensions().height < 700;
  const rollKey = `${res.cardId}:${res.choiceIdx}:${res.d20}:${run.luck}`;
  const hasRoll = res.outcome !== 'bribe' && res.outcome !== 'deal';
  const [landedKey, setLandedKey] = useState('');
  const [details, setDetails] = useState(false);
  const rolling = hasRoll && landedKey !== rollKey;
  const card = cardOf(res.cardId, run.quest?.storyId);
  const good = res.outcome === 'crit' || res.outcome === 'success' || !hasRoll;
  const tint = res.outcome === 'crit' ? '#8a6410' : good ? C.green : C.red;
  const choice = res.choiceIdx >= 0 ? card.choices[res.choiceIdx] : null;
  const lethal = res.dmg >= run.hero.hp;
  return <PlayScreen contentKey={rollKey} header={<PlayHeader run={run} />} actions={rolling
    ? <Button compact label="Rolling…" disabled onPress={() => {}} />
    : <>
      {canReroll(run) ? <Button compact testID="reroll" label={`Try again · 1 luck (${run.luck} left)`} onPress={onReroll} /> : null}
      <Button compact testID="proceed" label={lethal ? 'Face the consequences' : 'Onwards'} kind="primary" onPress={onProceed} />
    </>}>
    <Paper style={{ alignItems: 'center', gap: 8, padding: short ? 10 : 12 }}>
      {choice && !short ? <Small style={{ fontWeight: '700', textAlign: 'center' }}>{t(choice.label, tone, violence)}</Small> : null}
      {hasRoll ? <D20 size={short ? 72 : 96} value={res.d20} rollKey={rollKey} outcome={res.outcome} onLanded={() => { setLandedKey(rollKey); onRevealed(good); }} />
        : <Art art={card.art ? artForObjective(card.art) : artForCard(res.cardId)} size={72} />}
      {rolling ? <P>The die is cast…</P> : <>
        <Row><HeroArt classId={run.hero.classId} ancestryId={run.hero.ancestryId} size={32} mood={!hasRoll ? 'neutral' : good ? 'triumphant' : 'disaster'} /><View><H2 style={{ color: tint }}>{outcomeTitle[res.outcome]}</H2>
          {hasRoll ? <Small>Rolled {res.d20} {signed(res.mod + res.bonus)} = {res.total} · DC {res.dc}</Small> : null}
        </View></Row>
        <P style={{ textAlign: 'center' }}>{choice ? textFor(run, good ? choice.win : choice.lose, tone, violence) : 'You pay the fee and are allowed through.'}</P>
        {res.dmg > 0 ? <View testID="injury-description"><Small style={{ textAlign: 'center' }}>{injuryDescription(res, violence)}</Small></View> : null}
        <Row style={{ justifyContent: 'center' }}>
          {res.gold ? <Pill label="GOLD" value={`+${res.gold}`} color="#7a5a17" /> : null}
          {res.heal ? <Pill label="HP" value={`+${res.heal}`} color={C.green} /> : null}
          {res.dmg ? <Pill label="HP" value={`-${res.dmg}`} color={C.red} /> : null}
          {res.cost ? <Pill label="GOLD" value={`-${res.cost}`} color="#7a5a17" /> : null}
          {res.luckCost ? <Pill label="LUCK" value={`-${res.luckCost}`} color={C.green} /> : null}
        </Row>
        <Pressable testID="result-details" accessibilityRole="button" onPress={() => setDetails(true)}><Small style={{ textDecorationLine: 'underline' }}>Details and story notes</Small></Pressable>
      </>}
    </Paper>
    {!rolling ? <DmSays compact text={narrationFor(run, tone, violence)} live={isLiveNarration(run, tone, violence)} /> : null}
    <Modal visible={details} transparent animationType="fade" onRequestClose={() => setDetails(false)}><View style={st.overlay}><View style={st.detailSheet}>
      <Row><H2 style={{ flex: 1 }}>What changed</H2><CloseButton onPress={() => setDetails(false)} size={32} /></Row>
      <ScrollView contentContainerStyle={{ gap: 8 }}>
        {choice ? <P>{t(choice.label, tone, violence)}</P> : null}
        {res.storyEffect?.memory ? <P>{t(res.storyEffect.memory, tone, violence)}</P> : null}
        {res.storyEffect?.momentum ? <Small>Finale bonus {signed(res.storyEffect.momentum)}. The total stays between -2 and +2.</Small> : null}
        {res.notes.map((note) => <Small key={note}>{note}</Small>)}
        {!res.storyEffect?.memory && !res.notes.length ? <Small>No additional effects.</Small> : null}
      </ScrollView>
    </View></View></Modal>
  </PlayScreen>;
};

export const BoonScreen = ({ run, tone, violence = 0, onPick, onPotion }: { run: RunState; tone: Tone; violence?: Violence; onPick: (i: number) => void; onPotion: () => void }) => {
  const q = run.quest!;
  return <PlayScreen header={<PlayHeader run={run} tracker tone={tone} violence={violence} />} actions={<>
    {run.boons.map((boon, i) => {
      const d = describeBoon(boon);
      return <Button compact key={`${run.questIndex}-${i}`} testID={`boon-${i}`} label={d.title} sub={d.text} onPress={() => onPick(i)} />;
    })}
    <Pressable testID="potion" accessibilityRole="button" accessibilityLabel={`Buy a healing potion for ${potionCost(run)} gold and heal ${POTION_HEAL} HP`} disabled={!canBuyPotion(run)} onPress={onPotion} style={{ minHeight: 32, alignItems: 'center', justifyContent: 'center', opacity: canBuyPotion(run) ? 1 : .45 }}><Text style={{ fontSize: 12, color: C.parchmentDim }}>Healing potion · +{POTION_HEAL} HP · {potionCost(run)} gold</Text></Pressable>
  </>}>
    <Paper style={{ padding: 12 }}>
      <Small style={{ fontWeight: '700', color: C.green }}>QUEST COMPLETE</Small>
      <Row><Art art={artForObjective(q.offer.objectiveId)} size={48} /><H2 style={{ flex: 1 }}>{t(objectiveOf(q.offer.objectiveId).title, tone, violence)}</H2></Row>
      <P>{q.climaxFailed ? `The job is finished, but the client has complaints. Half pay: ${run.payout} gold.` : `The client is satisfied. You collect ${run.payout} gold.`}</P>
    </Paper>
    <DmSays compact text={narrationFor(run, tone, violence)} live={isLiveNarration(run, tone, violence)} />
    <OnWood style={st.heading}>Choose your bonus</OnWood>
  </PlayScreen>;
};

export const DeadScreen = ({
  run, tone = 0, violence = 0, busy, notice, simulated, onRevive, onAccept,
}: { run: RunState; tone?: Tone; violence?: Violence; busy: boolean; notice: string; simulated: boolean; onRevive: () => void; onAccept: () => void }) => {
  const short = useWindowDimensions().height < 700;
  return (
  <PlayScreen actions={<>
    {canRevive(run) ? (
      <Button compact
        testID="revive"
        kind="ad"
        disabled={busy}
        label={busy ? 'Summoning a sponsor...' : 'Second chance: watch an ad'}
        sub={`Return at half health and carry on. Once per run.${simulated ? ' (Ad simulated in this build.)' : ''}`}
        onPress={onRevive}
      />
    ) : (
      <OnWood style={{ textAlign: 'center' }}>Your second chance has already been spent.</OnWood>
    )}
    {notice ? <OnWood style={{ textAlign: 'center', color: C.gold }}>{notice}</OnWood> : null}
    <Button compact testID="accept-fate" label="Accept fate" kind="primary" disabled={busy} onPress={onAccept} />
  </>}>
    <Paper style={{ alignItems: 'center', gap: short ? 5 : 10, padding: short ? 12 : 16 }}>
      <Small style={{ fontWeight: '700', color: C.red }}>{deathHeading(violence)}</Small>
      <View style={{ opacity: 0.8, transform: [{ rotate: '7deg' }] }}>
        <HeroArt classId={run.hero.classId} ancestryId={run.hero.ancestryId} size={short ? 52 : 80} mood="disaster" />
      </View>
      <H1 style={{ textAlign: 'center', ...(short ? { fontSize: 24, lineHeight: 30 } : {}) }}>{run.hero.name}</H1>
      <P style={{ textAlign: 'center' }}>{run.epitaph}</P>
      <View testID="death-description"><P style={{ textAlign: 'center' }}>{deathDescription(violence)}</P></View>
      <Small>Quests completed: {run.questsDone}</Small>
    </Paper>
    <DmSays compact text={narrationFor(run, tone, violence)} />
  </PlayScreen>
  );
};

export const SummaryScreen = ({
  run, meta, busy, notice, simulated, onCollect, onDouble,
}: { run: RunState; meta: Meta; busy: boolean; notice: string; simulated: boolean; onCollect: () => void; onDouble: () => void }) => {
  const won = run.phase === 'victory';
  const short = useWindowDimensions().height < 700;
  const tips = tipsFor(meta, run);
  const cls = classOf(run.hero.classId);
  return (
    <PlayScreen actions={<>
      <Button compact
        testID="double-tips"
        kind="ad"
        disabled={busy}
        label={busy ? 'Summoning a sponsor...' : `Double it to ${tips * 2}: watch an ad`}
        sub={simulated ? 'Ad simulated in this build.' : undefined}
        onPress={onDouble}
      />
      {notice ? <OnWood style={{ textAlign: 'center', color: C.gold }}>{notice}</OnWood> : null}
      <Button compact testID="collect" label={`Collect ${tips} tips`} kind="primary" disabled={busy} onPress={onCollect} />
    </>}>
      <Paper style={{ gap: short ? 5 : 10, padding: short ? 12 : 16 }}>
        <Small style={{ fontWeight: '700', color: won ? C.green : C.red }}>{won ? 'A LEGEND RETIRES' : 'FINAL INVOICE'}</Small>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <HeroArt classId={run.hero.classId} ancestryId={run.hero.ancestryId} size={short ? 56 : 80} mood={won ? 'triumphant' : 'disaster'} />
          <H1 style={{ flex: 1, ...(short ? { fontSize: 24, lineHeight: 30 } : {}) }}>{run.hero.name}</H1>
        </View>
        <Small>{ancestryOf(run.hero.ancestryId).name} {cls.name}, {quirkOf(run.hero.quirkId).name}</Small>
        <P>{run.epitaph}</P>
        {won ? <DmSays compact text={narrationFor(run, meta.tone, meta.violence)} /> : null}
        <Row>
          <Pill label="QUESTS" value={run.questsDone} />
          <Pill label="GOLD EARNED" value={run.goldEarned} color="#7a5a17" />
        </Row>
        {run.relics.length ? <Small>Relics: {run.relics.map((id) => relicOf(id).name).join(', ')}</Small> : null}
        <View style={[st.tipsBox, short && { paddingVertical: 4 }]}>
          <Pop delay={200}><Text style={[st.tipsNum, short && { fontSize: 32, lineHeight: 38 }]}>{tips}</Text></Pop>
          <Text style={st.tipsCap}>TIPS EARNED</Text>
        </View>
        <Small style={{ textAlign: 'center' }}>Keep your tips. Spend them in the Guild Hall.</Small>
      </Paper>
    </PlayScreen>
  );
};

const st = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(10,6,3,.8)', justifyContent: 'center', padding: 20 },
  detailSheet: { backgroundColor: C.parchment, borderRadius: 10, padding: 16, gap: 12, maxHeight: '80%' },
  offer: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, backgroundColor: C.cream, borderColor: '#bfa873', borderWidth: 1, borderRadius: 8 },
  heading: { fontSize: 18, fontWeight: '700', color: C.cream, marginTop: 4 },
  stat: { flex: 1, minWidth: 44, alignItems: 'center', backgroundColor: C.woodLight, borderRadius: 6, paddingVertical: 4 },
  statName: { fontSize: 10, fontWeight: '700', letterSpacing: 0.6, color: C.parchmentDim },
  statVal: { fontSize: 14, fontWeight: '700', color: C.cream },
  tipsBox: { alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#bfa873' },
  tipsNum: { fontFamily: serif, fontSize: 44, fontWeight: '700', color: C.gold, lineHeight: 50 },
  tipsCap: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, color: C.inkSoft },
});
