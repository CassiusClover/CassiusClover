import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TIER_NAMES } from '../game/content/quests';
import {
  bribeCost, canBribe, canBuyPotion, canReroll, canRevive, cardOf, checkInfo, classOf, ancestryOf, currentCard,
  describeBoon, giverOf, isClimax, modOf, objectiveOf, potionCost, POTION_HEAL, questPay, QUESTS_TO_WIN, quirkOf,
  relicOf, t, twistOf,
} from '../game/engine';
import { tipsFor } from '../game/meta';
import type { Meta, RunState, Tone } from '../game/types';
import { STATS } from '../game/types';
import { Bar, Button, C, H1, H2, OnWood, P, Paper, Pill, Row, Screen, Small, serif } from './kit';

const signed = (n: number) => (n >= 0 ? `+${n}` : `${n}`);

export const Hud = ({ run }: { run: RunState }) => (
  <View style={{ gap: 8 }}>
    <Row style={{ justifyContent: 'space-between' }}>
      <OnWood style={{ fontWeight: '700', color: C.cream, flexShrink: 1 }}>{run.hero.name}</OnWood>
      <OnWood>Quest {Math.min(run.questIndex + 1, QUESTS_TO_WIN)} of {QUESTS_TO_WIN}</OnWood>
    </Row>
    <Bar value={run.hero.hp} max={run.hero.maxHp} />
    <Row>
      <Pill label="HP" value={`${run.hero.hp}/${run.hero.maxHp}`} color={C.red} />
      <Pill label="GOLD" value={run.gold} color="#7a5a17" />
      <Pill label="LUCK" value={run.luck} color={C.green} />
    </Row>
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

export const BoardScreen = ({ run, tone, onPick, onQuit }: { run: RunState; tone: Tone; onPick: (i: number) => void; onQuit: () => void }) => (
  <Screen>
    <Hud run={run} />
    <OnWood style={st.heading}>The Quest Board</OnWood>
    {run.board.map((offer, i) => {
      const obj = objectiveOf(offer.objectiveId);
      const twist = twistOf(offer.twistId);
      return (
        <Paper key={offer.objectiveId}>
          <Row style={{ justifyContent: 'space-between' }}>
            <Small style={{ fontWeight: '700', color: offer.tier === 2 ? C.red : offer.tier === 0 ? C.green : C.inkSoft }}>
              {TIER_NAMES[offer.tier].toUpperCase()}
            </Small>
            <Small style={{ fontWeight: '700' }}>PAYS {questPay(run, offer)} GOLD</Small>
          </Row>
          <H2>{t(obj.title, tone)}</H2>
          <P>{t(giverOf(offer.giverId).name, tone)} needs you to {t(obj.task, tone)}. {t(twist.text, tone)}</P>
          <Small>
            {twist.note}
            {offer.tier === 2 ? '  |  Harder rolls, guaranteed relic offer' : offer.tier === 0 ? '  |  Easier rolls' : ''}
          </Small>
          <Button testID={`quest-${i}`} label="Accept" kind="primary" onPress={() => onPick(i)} />
        </Paper>
      );
    })}
    <Button label="Abandon run" kind="ghost" onPress={onQuit} />
  </Screen>
);

const riskName = { safe: 'Careful', bold: 'Bold', reckless: 'Reckless' } as const;
const riskColor = { safe: '#9ccf8c', bold: '#9cc4e0', reckless: '#eb9a88' } as const;

export const CardScreen = ({ run, tone, onChoose, onBribe }: { run: RunState; tone: Tone; onChoose: (i: number) => void; onBribe: () => void }) => {
  const card = currentCard(run)!;
  const q = run.quest!;
  return (
    <Screen>
      <Hud run={run} />
      <OnWood style={st.heading}>
        {t(objectiveOf(q.offer.objectiveId).title, tone)}  ({q.cardIdx + 1}/{q.cards.length})
      </OnWood>
      <Paper>
        {isClimax(run) ? <Small style={{ fontWeight: '700', color: C.red }}>THE FINALE</Small> : null}
        <P style={{ fontSize: 19, lineHeight: 27 }}>{t(card.text, tone)}</P>
      </Paper>
      {card.choices.map((choice, i) => {
        const info = checkInfo(run, choice);
        return (
          <Button
            key={i}
            testID={`choice-${i}`}
            label={t(choice.label, tone)}
            sub={`${riskName[choice.risk]}  |  ${choice.stat} ${signed(info.mod + info.bonus)} vs ${info.dc}  |  ${Math.round(info.chance * 100)}%`}
            onPress={() => onChoose(i)}
          />
        );
      })}
      {!isClimax(run) ? (
        <Button
          testID="bribe"
          label={`Bribe your way past (${bribeCost(run)} gold)`}
          sub="Guaranteed, but no reward"
          kind="ghost"
          disabled={!canBribe(run)}
          onPress={onBribe}
        />
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

const Die = ({ value, rolling, tint }: { value: number; rolling: boolean; tint: string }) => {
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (!rolling) {
      setShown(value);
      return;
    }
    const id = setInterval(() => setShown(1 + Math.floor(Math.random() * 20)), 60);
    return () => clearInterval(id);
  }, [rolling, value]);
  return (
    <View style={[st.die, { borderColor: rolling ? C.inkSoft : tint }]}>
      <Text style={[st.dieNum, { color: rolling ? C.inkSoft : tint }]}>{shown}</Text>
      <Text style={st.dieCap}>D20</Text>
    </View>
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
    if (res.outcome === 'bribe') {
      setRolling(false);
      return;
    }
    setRolling(true);
    const id = setTimeout(() => {
      setRolling(false);
      onRevealed(res.dmg === 0);
    }, 650);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rollKey]);

  const card = cardOf(res.cardId);
  const good = res.dmg === 0;
  const tint = good ? C.green : C.red;
  const choice = res.choiceIdx >= 0 ? card.choices[res.choiceIdx] : null;
  const lethal = res.dmg >= run.hero.hp;
  return (
    <Screen>
      <Hud run={run} />
      <Paper style={{ alignItems: 'center', gap: 12 }}>
        {choice ? (
          <>
            <Small style={{ fontWeight: '700' }}>{t(choice.label, tone).toUpperCase()}</Small>
            <Die value={res.d20} rolling={rolling} tint={tint} />
          </>
        ) : null}
        {rolling ? (
          <P style={{ color: C.inkSoft }}>Rolling...</P>
        ) : (
          <>
            <H2 style={{ color: tint }} >{outcomeTitle[res.outcome]}</H2>
            {choice ? (
              <Small>
                Rolled {res.d20} {signed(res.mod)} {res.stat}{res.bonus ? ` ${signed(res.bonus)} bonus` : ''} = {res.total} against {res.dc}
              </Small>
            ) : null}
            <P style={{ textAlign: 'center' }}>
              {choice ? t(good ? choice.win : choice.lose, tone) : 'A small bag changes hands. The problem remembers an appointment elsewhere.'}
            </P>
            <Row style={{ justifyContent: 'center' }}>
              {res.gold ? <Pill label="GOLD" value={`+${res.gold}`} color="#7a5a17" /> : null}
              {res.heal ? <Pill label="HP" value={`+${res.heal}`} color={C.green} /> : null}
              {res.dmg ? <Pill label="HP" value={`-${res.dmg}`} color={C.red} /> : null}
            </Row>
            {res.notes.map((n) => <Small key={n}>{n}</Small>)}
          </>
        )}
      </Paper>
      {!rolling ? (
        <>
          {canReroll(run) ? (
            <Button testID="reroll" label="Spend a luck token to reroll" sub={`${run.luck} remaining`} onPress={onReroll} />
          ) : null}
          <Button testID="proceed" label={lethal ? 'Face the consequences' : 'Onwards'} kind="primary" onPress={onProceed} />
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
      <Paper>
        <Small style={{ fontWeight: '700', color: C.green }}>QUEST COMPLETE</Small>
        <H2>{t(objectiveOf(q.offer.objectiveId).title, tone)}</H2>
        <P>
          {q.climaxFailed
            ? `It went badly, but it went. The client pays half: ${run.payout} gold.`
            : `A job well done, or at least done. The client pays ${run.payout} gold.`}
        </P>
      </Paper>
      <OnWood style={st.heading}>Choose one bonus</OnWood>
      {run.boons.map((boon, i) => {
        const d = describeBoon(boon);
        return <Button key={i} testID={`boon-${i}`} label={d.title} sub={d.text} onPress={() => onPick(i)} />;
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
      <H1 style={{ textAlign: 'center' }}>{run.hero.name}</H1>
      <P style={{ textAlign: 'center' }}>{run.epitaph}</P>
      <Small>Quests completed: {run.questsDone}</Small>
    </Paper>
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
        <H1>{run.hero.name}</H1>
        <Small>{ancestryOf(run.hero.ancestryId).name} {cls.name}, {quirkOf(run.hero.quirkId).name}</Small>
        <P>{run.epitaph}</P>
        <Row>
          <Pill label="QUESTS" value={run.questsDone} />
          <Pill label="GOLD EARNED" value={run.goldEarned} color="#7a5a17" />
        </Row>
        {run.relics.length ? <Small>Relics: {run.relics.map((id) => relicOf(id).name).join(', ')}</Small> : null}
        <View style={st.tipsBox}>
          <Text style={st.tipsNum}>{tips}</Text>
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
  die: {
    width: 104, height: 104, borderRadius: 22, borderWidth: 4, alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.cream, transform: [{ rotate: '-4deg' }],
  },
  dieNum: { fontFamily: serif, fontSize: 46, fontWeight: '700', lineHeight: 52 },
  dieCap: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: C.inkSoft },
  tipsBox: { alignItems: 'center', paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#bfa873' },
  tipsNum: { fontFamily: serif, fontSize: 44, fontWeight: '700', color: C.gold, lineHeight: 50 },
  tipsCap: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, color: C.inkSoft },
});
