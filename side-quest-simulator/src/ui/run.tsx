import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TIER_NAMES } from '../game/content/quests';
import {
  bribeCost, canBribe, canBuyPotion, canReroll, canRevive, cardOf, checkInfo, classOf, ancestryOf, currentCard,
  describeBoon, giverOf, isClimax, modOf, objectiveOf, potionCost, POTION_HEAL, questPay, QUESTS_TO_WIN, quirkOf,
  relicOf, t, twistOf,
} from '../game/engine';
import { Art, HeroArt } from '../art/Art';
import { artForCard, artForObjective } from '../art/creatures';
import { tipsFor } from '../game/meta';
import type { Meta, RunState, Tone } from '../game/types';
import { STATS } from '../game/types';
import { Bob, D20, DmSays, Enter, Pop, Shake } from './fx';
import { Tracker } from './tracker';
import { Bar, Button, C, CloseButton, H1, H2, OnWood, P, Paper, Pill, Row, Screen, Small, serif } from './kit';

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
          <HeroArt classId={run.hero.classId} ancestryId={run.hero.ancestryId} size={56} />
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

export const BoardScreen = ({ run, tone, onPick, onQuit }: { run: RunState; tone: Tone; onPick: (i: number) => void; onQuit: () => void }) => (
  <Screen>
    <Hud run={run} onClose={onQuit} />
    <Tracker run={run} tone={tone} />
    <DmSays text={run.narration} />
    <OnWood style={st.heading}>{run.board.length === 1 ? 'The Final Posting' : 'The Quest Board'}</OnWood>
    {run.board.map((offer, i) => {
      const obj = objectiveOf(offer.objectiveId);
      const twist = twistOf(offer.twistId);
      return (
        <Enter key={`${run.questIndex}-${offer.objectiveId}`} delay={120 + i * 110}>
          <Paper>
            <Row style={{ justifyContent: 'space-between' }}>
              <Small style={{ fontWeight: '700', color: offer.tier === 2 ? C.red : offer.tier === 0 ? C.green : C.inkSoft }}>
                {(run.board.length === 1 ? 'The Showdown' : TIER_NAMES[offer.tier]).toUpperCase()}
              </Small>
              <Small style={{ fontWeight: '700' }}>PAYS {questPay(run, offer)} GOLD</Small>
            </Row>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <Art art={artForObjective(offer.objectiveId)} size={72} />
              <H2 style={{ flex: 1 }}>{t(obj.title, tone)}</H2>
            </View>
            <P>{t(giverOf(offer.giverId).name, tone)} needs you to {t(obj.task, tone)}. {t(twist.text, tone)}</P>
            <Small>
              {twist.note}
              {offer.tier === 2 ? '  |  Harder rolls, guaranteed relic offer' : offer.tier === 0 ? '  |  Easier rolls' : ''}
            </Small>
            <Button testID={`quest-${i}`} label="Accept" kind="primary" onPress={() => onPick(i)} />
          </Paper>
        </Enter>
      );
    })}
  </Screen>
);

const riskName = { safe: 'Careful', bold: 'Bold', reckless: 'Reckless' } as const;
const riskColor = { safe: '#9ccf8c', bold: '#9cc4e0', reckless: '#eb9a88' } as const;

export const CardScreen = ({
  run, tone, onChoose, onBribe, onQuit,
}: { run: RunState; tone: Tone; onChoose: (i: number) => void; onBribe: () => void; onQuit: () => void }) => {
  const card = currentCard(run)!;
  const q = run.quest!;
  const key = `${run.questIndex}-${q.cardIdx}`;
  return (
    <Screen>
      <Hud run={run} onClose={onQuit} />
      <Tracker run={run} tone={tone} />
      <OnWood style={st.heading}>{t(objectiveOf(q.offer.objectiveId).title, tone)}</OnWood>
      <DmSays text={run.narration} live={run.ai?.questIndex === run.questIndex} />
      <Enter key={`card-${key}`} delay={80}>
        <Paper>
          <View style={{ height: 150, backgroundColor: artForCard(card.id)?.bg, borderRadius: 6, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderWidth: 2, borderColor: '#15100b' }}>
            <Bob><Art art={artForCard(card.id)} size={150} /></Bob>
          </View>
          {isClimax(run) ? <Small style={{ fontWeight: '700', color: C.red }}>THE FINALE</Small> : null}
          <P style={{ fontSize: 19, lineHeight: 27 }}>{t(card.text, tone)}</P>
        </Paper>
      </Enter>
      {card.choices.map((choice, i) => {
        const info = checkInfo(run, choice);
        return (
          <Enter key={`choice-${key}-${i}`} delay={220 + i * 90}>
            <Button
              testID={`choice-${i}`}
              label={t(choice.label, tone)}
              sub={`${riskName[choice.risk]}  |  ${choice.stat} ${signed(info.mod + info.bonus)} vs ${info.dc}  |  ${Math.round(info.chance * 100)}%`}
              onPress={() => onChoose(i)}
            />
          </Enter>
        );
      })}
      {!isClimax(run) ? (
        <Enter key={`bribe-${key}`} delay={220 + card.choices.length * 90}>
          <Button
            testID="bribe"
            label={`Bribe your way past (${bribeCost(run)} gold)`}
            sub="Guaranteed, but no reward"
            kind="ghost"
            disabled={!canBribe(run)}
            onPress={onBribe}
          />
        </Enter>
      ) : null}
      <Row style={{ justifyContent: 'center', gap: 14 }}>
        {(['safe', 'bold', 'reckless'] as const).map((r) => (
          <OnWood key={r} style={{ fontSize: 12, color: C.parchmentDim }}>
            <Text style={{ color: riskColor[r], fontWeight: '700' }}>{riskName[r]}</Text>
            {r === 'safe' ? ': easy, small prize' : r === 'bold' ? ': fair odds' : ': hard, big prize'}
          </OnWood>
        ))}
      </Row>
    </Screen>
  );
};

const outcomeTitle = { crit: 'Critical success', success: 'Success', fail: 'Failure', fumble: 'Critical failure', bribe: 'Money talks' } as const;

export const ResultScreen = ({
  run, tone, onProceed, onReroll, onRevealed,
}: { run: RunState; tone: Tone; onProceed: () => void; onReroll: () => void; onRevealed: (good: boolean) => void }) => {
  const res = run.result!;
  const rollKey = `${res.cardId}:${res.choiceIdx}:${res.d20}:${run.luck}`;
  const [rolling, setRolling] = useState(res.outcome !== 'bribe');
  useEffect(() => {
    setRolling(res.outcome !== 'bribe');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rollKey]);

  const card = cardOf(res.cardId);
  const good = res.dmg === 0;
  const tint = res.outcome === 'crit' ? '#8a6410' : good ? C.green : C.red;
  const choice = res.choiceIdx >= 0 ? card.choices[res.choiceIdx] : null;
  const lethal = res.dmg >= run.hero.hp;
  return (
    <Screen>
      <Hud run={run} />
      <Paper style={{ alignItems: 'center', gap: 12 }}>
        {choice ? (
          <>
            <Small style={{ fontWeight: '700', textAlign: 'center' }}>{t(choice.label, tone).toUpperCase()}</Small>
            <Small>
              {choice.stat} {signed(res.mod + res.bonus)}  |  needs {res.dc}
            </Small>
            <View style={{ height: 150, justifyContent: 'center' }}>
              <D20
                value={res.d20}
                rollKey={rollKey}
                outcome={res.outcome}
                onLanded={() => {
                  setRolling(false);
                  onRevealed(good);
                }}
              />
            </View>
          </>
        ) : (
          <Pop><Art art={artForCard(res.cardId)} size={120} /></Pop>
        )}
        {rolling ? (
          <P style={{ color: C.inkSoft }}>The die is cast...</P>
        ) : (
          <>
            <Pop><H2 style={{ color: tint }}>{outcomeTitle[res.outcome]}</H2></Pop>
            {choice ? (
              <Small>
                Rolled {res.d20} {signed(res.mod)} {res.stat}{res.bonus ? ` ${signed(res.bonus)} bonus` : ''} = {res.total} against {res.dc}
              </Small>
            ) : null}
            <Enter delay={120}>
              <P style={{ textAlign: 'center' }}>
                {choice ? t(good ? choice.win : choice.lose, tone) : 'A small bag changes hands. The problem remembers an appointment elsewhere.'}
              </P>
            </Enter>
            <Row style={{ justifyContent: 'center' }}>
              {res.gold ? <Pop delay={260}><Pill label="GOLD" value={`+${res.gold}`} color="#7a5a17" /></Pop> : null}
              {res.heal ? <Pop delay={340}><Pill label="HP" value={`+${res.heal}`} color={C.green} /></Pop> : null}
              {res.dmg ? <Pop delay={260}><Pill label="HP" value={`-${res.dmg}`} color={C.red} /></Pop> : null}
            </Row>
            {res.notes.map((n) => <Small key={n}>{n}</Small>)}
          </>
        )}
      </Paper>
      {!rolling ? (
        <>
          <Enter delay={200}><DmSays text={run.narration} live={run.ai?.questIndex === run.questIndex} /></Enter>
          {canReroll(run) ? (
            <Enter delay={320}>
              <Button testID="reroll" label="Spend a luck token to reroll" sub={`${run.luck} remaining`} onPress={onReroll} />
            </Enter>
          ) : null}
          <Enter delay={380}>
            <Button testID="proceed" label={lethal ? 'Face the consequences' : 'Onwards'} kind="primary" onPress={onProceed} />
          </Enter>
        </>
      ) : null}
    </Screen>
  );
};

export const BoonScreen = ({ run, tone, onPick, onPotion }: { run: RunState; tone: Tone; onPick: (i: number) => void; onPotion: () => void }) => {
  const q = run.quest!;
  return (
    <Screen>
      <Hud run={run} />
      <Tracker run={run} tone={tone} />
      <DmSays text={run.narration} live={run.ai?.questIndex === run.questIndex} />
      <Paper>
        <Small style={{ fontWeight: '700', color: C.green }}>QUEST COMPLETE</Small>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <Art art={artForObjective(q.offer.objectiveId)} size={64} />
          <H2 style={{ flex: 1 }}>{t(objectiveOf(q.offer.objectiveId).title, tone)}</H2>
        </View>
        <P>
          {q.climaxFailed
            ? `It went badly, but it went. The client pays half: ${run.payout} gold.`
            : `A job well done, or at least done. The client pays ${run.payout} gold.`}
        </P>
      </Paper>
      <OnWood style={st.heading}>Choose one bonus</OnWood>
      {run.boons.map((boon, i) => {
        const d = describeBoon(boon);
        return (
          <Enter key={`${run.questIndex}-${i}`} delay={150 + i * 110}>
            <Button testID={`boon-${i}`} label={d.title} sub={d.text} onPress={() => onPick(i)} />
          </Enter>
        );
      })}
      <Button
        testID="potion"
        label={`Buy a healing potion (${potionCost(run)} gold)`}
        sub={`Heal ${POTION_HEAL} HP. Does not use up your bonus.`}
        kind="ghost"
        disabled={!canBuyPotion(run)}
        onPress={onPotion}
      />
    </Screen>
  );
};

export const DeadScreen = ({
  run, busy, notice, simulated, onRevive, onAccept,
}: { run: RunState; busy: boolean; notice: string; simulated: boolean; onRevive: () => void; onAccept: () => void }) => (
  <Screen>
    <Paper style={{ alignItems: 'center', gap: 10 }}>
      <Small style={{ fontWeight: '700', color: C.red }}>YOU HAVE DIED</Small>
      <View style={{ opacity: 0.8, transform: [{ rotate: '7deg' }] }}>
        <HeroArt classId={run.hero.classId} ancestryId={run.hero.ancestryId} size={120} />
      </View>
      <H1 style={{ textAlign: 'center' }}>{run.hero.name}</H1>
      <P style={{ textAlign: 'center' }}>{run.epitaph}</P>
      <Small>Quests completed: {run.questsDone}</Small>
    </Paper>
    <DmSays text={run.narration} />
    {canRevive(run) ? (
      <Button
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
    <Button testID="accept-fate" label="Accept fate" kind="primary" disabled={busy} onPress={onAccept} />
  </Screen>
);

export const SummaryScreen = ({
  run, meta, busy, notice, simulated, onCollect, onDouble,
}: { run: RunState; meta: Meta; busy: boolean; notice: string; simulated: boolean; onCollect: () => void; onDouble: () => void }) => {
  const won = run.phase === 'victory';
  const tips = tipsFor(meta, run);
  const cls = classOf(run.hero.classId);
  return (
    <Screen>
      <Paper style={{ gap: 10 }}>
        <Small style={{ fontWeight: '700', color: won ? C.green : C.red }}>{won ? 'A LEGEND RETIRES' : 'FINAL INVOICE'}</Small>
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <HeroArt classId={run.hero.classId} ancestryId={run.hero.ancestryId} size={80} />
          <H1 style={{ flex: 1 }}>{run.hero.name}</H1>
        </View>
        <Small>{ancestryOf(run.hero.ancestryId).name} {cls.name}, {quirkOf(run.hero.quirkId).name}</Small>
        <P>{run.epitaph}</P>
        {won ? <DmSays text={run.narration} /> : null}
        <Row>
          <Pill label="QUESTS" value={run.questsDone} />
          <Pill label="GOLD EARNED" value={run.goldEarned} color="#7a5a17" />
        </Row>
        {run.relics.length ? <Small>Relics: {run.relics.map((id) => relicOf(id).name).join(', ')}</Small> : null}
        <View style={st.tipsBox}>
          <Pop delay={200}><Text style={st.tipsNum}>{tips}</Text></Pop>
          <Text style={st.tipsCap}>TIPS EARNED</Text>
        </View>
        <Small style={{ textAlign: 'center' }}>Tips are kept forever. Spend them on new classes and permanent upgrades.</Small>
      </Paper>
      <Button
        testID="double-tips"
        kind="ad"
        disabled={busy}
        label={busy ? 'Summoning a sponsor...' : `Double it to ${tips * 2}: watch an ad`}
        sub={simulated ? 'Ad simulated in this build.' : undefined}
        onPress={onDouble}
      />
      {notice ? <OnWood style={{ textAlign: 'center', color: C.gold }}>{notice}</OnWood> : null}
      <Button testID="collect" label={`Collect ${tips} tips`} kind="primary" disabled={busy} onPress={onCollect} />
    </Screen>
  );
};

const st = StyleSheet.create({
  heading: { fontSize: 18, fontWeight: '700', color: C.cream, marginTop: 4 },
  stat: { flex: 1, minWidth: 44, alignItems: 'center', backgroundColor: C.woodLight, borderRadius: 6, paddingVertical: 4 },
  statName: { fontSize: 10, fontWeight: '700', letterSpacing: 0.6, color: C.parchmentDim },
  statVal: { fontSize: 14, fontWeight: '700', color: C.cream },
  tipsBox: { alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#bfa873' },
  tipsNum: { fontFamily: serif, fontSize: 44, fontWeight: '700', color: C.gold, lineHeight: 50 },
  tipsCap: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, color: C.inkSoft },
});
