import React, { useState } from 'react';
import { View } from 'react-native';
import { CARDS } from '../game/content/cards';
import { ANCESTRIES, CLASSES, RELICS } from '../game/content/heroes';
import { OBJECTIVES } from '../game/content/quests';
import { classOf, quirkOf, relicOf, objectiveOf, rollName, rollQuirk, t, type HeroChoice } from '../game/engine';
import { UPGRADES, upgradeCost, upgradeLevel } from '../game/meta';
import type { Meta, Tone } from '../game/types';
import { STATS } from '../game/types';
import { Button, C, H1, H2, OnWood, P, Paper, Pill, Row, Screen, Small } from './kit';

const TONES: { tone: Tone; name: string; text: string }[] = [
  { tone: 0, name: 'Family friendly', text: 'Cartoon peril, clean language. Safe to play next to your grandmother.' },
  { tone: 1, name: 'Cheeky', text: 'A little innuendo and the odd raised eyebrow.' },
  { tone: 2, name: 'Crude', text: 'Mild swearing and worse manners. For grown-ups.' },
];

const TonePicker = ({ value, onPick }: { value: Tone | null; onPick: (tone: Tone) => void }) => (
  <>
    {TONES.map((x) => (
      <Button
        key={x.tone}
        testID={`tone-${x.tone}`}
        label={value === x.tone ? `${x.name}  (selected)` : x.name}
        sub={x.text}
        kind={value === x.tone ? 'primary' : 'plain'}
        onPress={() => onPick(x.tone)}
      />
    ))}
  </>
);

export const ToneScreen = ({ onPick, onSkip }: { onPick: (tone: Tone) => void; onSkip: () => void }) => (
  <Screen>
    <Paper>
      <H1>Before we begin</H1>
      <P>How rude would you like your adventures? You can change this at any time in Settings.</P>
    </Paper>
    <TonePicker value={null} onPick={onPick} />
    <Button testID="tone-skip" label="Skip" sub="Starts family friendly" kind="ghost" onPress={onSkip} />
  </Screen>
);

export const HomeScreen = ({
  meta, hasRun, onStart, onContinue, onGo,
}: { meta: Meta; hasRun: boolean; onStart: () => void; onContinue: () => void; onGo: (s: 'shop' | 'journal' | 'settings') => void }) => (
  <Screen>
    <View style={{ alignItems: 'center', paddingVertical: 28, gap: 6 }}>
      <OnWood style={{ letterSpacing: 3, fontSize: 12, fontWeight: '700', textAlign: 'center' }}>HEROES WANTED. STANDARDS NEGOTIABLE.</OnWood>
      <H1 style={{ color: C.cream, fontSize: 40, lineHeight: 46, textAlign: 'center' }}>Side Quest{'\n'}Simulator</H1>
      <Row style={{ marginTop: 8 }}>
        <Pill label="TIPS" value={meta.tips} color="#7a5a17" />
        <Pill label="BEST" value={`${meta.journal.bestQuests} quests`} />
      </Row>
    </View>
    {hasRun ? <Button testID="continue" label="Continue adventure" kind="primary" onPress={onContinue} /> : null}
    <Button testID="start" label="New adventure" sub={hasRun ? 'Abandons the adventure in progress' : 'Two to ten minutes, depending on skill and luck'} kind={hasRun ? 'plain' : 'primary'} onPress={onStart} />
    <Button testID="shop" label="Guild Hall" sub="Unlock classes and permanent upgrades" onPress={() => onGo('shop')} />
    <Button testID="journal" label="Journal" sub="Discoveries, records and obituaries" onPress={() => onGo('journal')} />
    <Button testID="settings" label="Settings" onPress={() => onGo('settings')} />
  </Screen>
);

export const CreateScreen = ({
  meta, busy, notice, simulated, onBegin, onBack,
}: { meta: Meta; busy: boolean; notice: string; simulated: boolean; onBegin: (choice: HeroChoice, blessed: boolean) => void; onBack: () => void }) => {
  const [classId, setClassId] = useState(meta.unlockedClasses[0]);
  const [ancestryId, setAncestryId] = useState(ANCESTRIES[0].id);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 2 ** 31));
  const [rerolled, setRerolled] = useState(false);
  const cls = classOf(classId);
  const quirk = quirkOf(rollQuirk(seed));
  const name = rollName(seed);
  const choice: HeroChoice = { classId, ancestryId, quirkId: quirk.id, name };
  return (
    <Screen>
      <OnWood style={{ fontSize: 22, fontWeight: '700', color: C.cream }}>Assemble a hero</OnWood>
      <Paper>
        <Small style={{ fontWeight: '700' }}>CLASS</Small>
        <Row>
          {CLASSES.filter((c) => meta.unlockedClasses.includes(c.id)).map((c) => (
            <Chip key={c.id} testID={`class-${c.id}`} label={c.name} on={c.id === classId} onPress={() => setClassId(c.id)} />
          ))}
        </Row>
        <P>{cls.blurb}</P>
        <Small><Small style={{ fontWeight: '700' }}>{cls.perkName}:</Small> {cls.perkText}</Small>
        <Small>{STATS.map((stat) => `${stat} ${cls.stats[stat]}`).join('   ')}   HP {cls.hp}</Small>
        {meta.unlockedClasses.length < CLASSES.length ? (
          <Small>{CLASSES.length - meta.unlockedClasses.length} more classes await in the Guild Hall.</Small>
        ) : null}
      </Paper>
      <Paper>
        <Small style={{ fontWeight: '700' }}>ANCESTRY</Small>
        <Row>
          {ANCESTRIES.map((a) => (
            <Chip key={a.id} testID={`ancestry-${a.id}`} label={a.name} on={a.id === ancestryId} onPress={() => setAncestryId(a.id)} />
          ))}
        </Row>
        <P>{ANCESTRIES.find((a) => a.id === ancestryId)!.blurb}</P>
      </Paper>
      <Paper>
        <Small style={{ fontWeight: '700' }}>FATE HAS DECIDED</Small>
        <H2>{name}</H2>
        <P><P style={{ fontWeight: '700' }}>{quirk.name}.</P> {quirk.text}</P>
        <Button
          testID="reroll-quirk"
          label={rerolled ? 'Fate has spoken' : 'Ask fate to reconsider'}
          sub={rerolled ? undefined : 'One reroll of name and quirk'}
          disabled={rerolled}
          onPress={() => {
            setSeed(Math.floor(Math.random() * 2 ** 31));
            setRerolled(true);
          }}
        />
      </Paper>
      <Button
        testID="begin-blessed"
        kind="ad"
        disabled={busy}
        label={busy ? 'Summoning a sponsor...' : "Set out with a Sponsor's Blessing: watch an ad"}
        sub={`Start with a random relic, a luck token and 20 gold.${simulated ? ' (Ad simulated in this build.)' : ''}`}
        onPress={() => onBegin(choice, true)}
      />
      {notice ? <OnWood style={{ textAlign: 'center', color: C.gold }}>{notice}</OnWood> : null}
      <Button testID="begin" label="Set out" kind="primary" disabled={busy} onPress={() => onBegin(choice, false)} />
      <Button label="Back" kind="ghost" disabled={busy} onPress={onBack} />
    </Screen>
  );
};

const Chip = ({ label, on, onPress, testID }: { label: string; on: boolean; onPress: () => void; testID?: string }) => (
  <View style={{ minWidth: 92 }}>
    <Button testID={testID} label={label} kind={on ? 'primary' : 'plain'} onPress={onPress} />
  </View>
);

export const ShopScreen = ({
  meta, onUnlock, onUpgrade, onBack,
}: { meta: Meta; onUnlock: (classId: string) => void; onUpgrade: (id: string) => void; onBack: () => void }) => (
  <Screen>
    <Row style={{ justifyContent: 'space-between' }}>
      <OnWood style={{ fontSize: 22, fontWeight: '700', color: C.cream }}>Guild Hall</OnWood>
      <Pill label="TIPS" value={meta.tips} color="#7a5a17" />
    </Row>
    <Paper>
      <H2>Classes</H2>
      {CLASSES.map((c) => {
        const owned = meta.unlockedClasses.includes(c.id);
        return (
          <View key={c.id} style={{ gap: 4, paddingVertical: 6, borderTopWidth: 1, borderColor: '#d6c398' }}>
            <P style={{ fontWeight: '700' }}>{c.name}</P>
            <Small>{c.blurb}</Small>
            <Small><Small style={{ fontWeight: '700' }}>{c.perkName}:</Small> {c.perkText}</Small>
            {owned ? (
              <Small style={{ color: C.green, fontWeight: '700' }}>UNLOCKED</Small>
            ) : (
              <Button testID={`unlock-${c.id}`} label={`Unlock for ${c.cost} tips`} kind="primary" disabled={meta.tips < c.cost} onPress={() => onUnlock(c.id)} />
            )}
          </View>
        );
      })}
    </Paper>
    <Paper>
      <H2>Permanent upgrades</H2>
      {UPGRADES.map((u) => {
        const cost = upgradeCost(meta, u);
        return (
          <View key={u.id} style={{ gap: 4, paddingVertical: 6, borderTopWidth: 1, borderColor: '#d6c398' }}>
            <P style={{ fontWeight: '700' }}>{u.name}  <Small>Level {upgradeLevel(meta, u.id)} of {u.costs.length}</Small></P>
            <Small>{u.text}</Small>
            {cost === null ? (
              <Small style={{ color: C.green, fontWeight: '700' }}>MAXED</Small>
            ) : (
              <Button testID={`upgrade-${u.id}`} label={`Buy for ${cost} tips`} kind="primary" disabled={meta.tips < cost} onPress={() => onUpgrade(u.id)} />
            )}
          </View>
        );
      })}
    </Paper>
    <Button testID="back" label="Back" kind="ghost" onPress={onBack} />
  </Screen>
);

export const JournalScreen = ({ meta, onBack }: { meta: Meta; onBack: () => void }) => {
  const j = meta.journal;
  return (
    <Screen>
      <OnWood style={{ fontSize: 22, fontWeight: '700', color: C.cream }}>Journal</OnWood>
      <Paper>
        <H2>Records</H2>
        <Row>
          <Pill label="RUNS" value={j.runs} />
          <Pill label="VICTORIES" value={j.victories} color={C.green} />
          <Pill label="BEST" value={j.bestQuests} />
          <Pill label="QUESTS DONE" value={j.totalQuests} />
        </Row>
        <Small>Classes played: {j.classesPlayed.length} of {CLASSES.length}</Small>
        <Small>Road events encountered: {j.cardsSeen.filter((id) => !id.startsWith('x-')).length} of {CARDS.length}</Small>
      </Paper>
      <Paper>
        <H2>Quests completed ({j.objectivesDone.length} of {OBJECTIVES.length})</H2>
        {OBJECTIVES.map((o) => (
          <Small key={o.id} style={j.objectivesDone.includes(o.id) ? { color: C.ink } : undefined}>
            {j.objectivesDone.includes(o.id) ? t(objectiveOf(o.id).title, meta.tone) : '? ? ?'}
          </Small>
        ))}
      </Paper>
      <Paper>
        <H2>Relics found ({j.relicsFound.length} of {RELICS.length})</H2>
        {RELICS.map((r) =>
          j.relicsFound.includes(r.id) ? (
            <Small key={r.id} style={{ color: C.ink }}>{relicOf(r.id).name}: {r.text}</Small>
          ) : (
            <Small key={r.id}>? ? ?</Small>
          ),
        )}
      </Paper>
      <Paper>
        <H2>Obituaries</H2>
        {j.obituaries.length === 0 ? <Small>Nobody has died yet. Give it a minute.</Small> : null}
        {j.obituaries.map((o, i) => (
          <View key={i} style={{ paddingVertical: 4 }}>
            <P style={{ fontWeight: '700' }}>{o.name}  <Small>{o.quests} quests{o.won ? ', retired' : ''}</Small></P>
            <Small>{o.line}</Small>
          </View>
        ))}
      </Paper>
      <Button testID="back" label="Back" kind="ghost" onPress={onBack} />
    </Screen>
  );
};

export const SettingsScreen = ({
  meta, onTone, onHaptics, onReset, onBack,
}: { meta: Meta; onTone: (tone: Tone) => void; onHaptics: (on: boolean) => void; onReset: () => void; onBack: () => void }) => {
  const [confirm, setConfirm] = useState(false);
  return (
    <Screen>
      <OnWood style={{ fontSize: 22, fontWeight: '700', color: C.cream }}>Settings</OnWood>
      <OnWood>Tone of the writing</OnWood>
      <TonePicker value={meta.tone} onPick={onTone} />
      <Button testID="haptics" label={`Vibration: ${meta.haptics ? 'on' : 'off'}`} onPress={() => onHaptics(!meta.haptics)} />
      <Button
        testID="reset"
        label={confirm ? 'Really erase everything? Tap again' : 'Erase all progress'}
        sub="Tips, unlocks, upgrades and journal. Cannot be undone."
        kind={confirm ? 'primary' : 'plain'}
        onPress={() => {
          if (confirm) onReset();
          setConfirm(!confirm);
        }}
      />
      <Button testID="back" label="Back" kind="ghost" onPress={onBack} />
    </Screen>
  );
};
