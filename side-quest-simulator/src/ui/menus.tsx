import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Art, HeroArt } from '../art/Art';
import { ART } from '../art/creatures';
import { CARDS } from '../game/content/cards';
import { ANCESTRIES, CLASSES, RELICS } from '../game/content/heroes';
import { OBJECTIVES } from '../game/content/quests';
import { LANGUAGE_OPTIONS, VIOLENCE_OPTIONS, languagePreview, violencePreview } from '../game/contentSettings';
import { classOf, quirkOf, relicOf, objectiveOf, rollName, rollQuirk, t, type HeroChoice } from '../game/engine';
import { privacyOptionsRequired, showPrivacyOptions } from '../services/ads';
import { DM_MODELS } from '../services/dmModels';
import { cancelDownload, deleteModel, downloadModel, isModelDownloaded, localDmSupported } from '../services/localDm';
import { UPGRADES, upgradeCost, upgradeLevel } from '../game/meta';
import type { Meta, Tone, Violence } from '../game/types';
import { STATS } from '../game/types';
import { Bob, Enter } from './fx';
import { Button, C, H1, H2, OnWood, P, Paper, Pill, Row, Screen, Small, TopBar } from './kit';

const TonePicker = ({ value, onPick }: { value: Tone | null; onPick: (tone: Tone) => void }) => (
  <>
    {LANGUAGE_OPTIONS.map((x) => (
      <Button
        key={x.value}
        testID={`tone-${x.value}`}
        label={value === x.value ? `${x.name}  (selected)` : x.name}
        sub={x.text}
        kind={value === x.value ? 'primary' : 'plain'}
        onPress={() => onPick(x.value)}
      />
    ))}
  </>
);

const ViolencePicker = ({ value, onPick }: { value: Violence; onPick: (value: Violence) => void }) => (
  <>{VIOLENCE_OPTIONS.map((x) => <Button key={x.value} testID={`violence-${x.value}`}
    label={`${x.name}${value === x.value ? '  (selected)' : ''}`} sub={x.text}
    kind={value === x.value ? 'primary' : 'plain'} onPress={() => onPick(x.value)} />)}</>
);

const ContentPreview = ({ tone, violence }: { tone: Tone; violence: Violence }) => (
  <View testID="content-preview"><Paper>
    <H2>A taste of your settings</H2>
    <P>{languagePreview(tone)}</P>
    <P>{violencePreview(violence)}</P>
    <Small>Applies immediately to this adventure. Violence changes descriptions; difficulty and rewards stay the same.</Small>
  </Paper></View>
);

export const ToneScreen = ({ onPick, onSkip }: { onPick: (tone: Tone, violence: Violence) => void; onSkip: () => void }) => {
  const [tone, setTone] = useState<Tone>(0);
  const [violence, setViolence] = useState<Violence>(0);
  return (
  <Screen>
    <Paper>
      <H1>Before we begin</H1>
      <P>Choose the language and the intensity of injury descriptions separately. You can change either in Settings.</P>
    </Paper>
    <OnWood>Language</OnWood>
    <TonePicker value={tone} onPick={setTone} />
    <OnWood>Violence descriptions</OnWood>
    <ViolencePicker value={violence} onPick={setViolence} />
    <ContentPreview tone={tone} violence={violence} />
    <Button testID="content-start" label="Use these settings" kind="primary" onPress={() => onPick(tone, violence)} />
    <Button testID="tone-skip" label="Use clean, cartoon defaults" kind="ghost" onPress={onSkip} />
  </Screen>
  );
};

export const HomeScreen = ({
  meta, hasRun, onStart, onContinue, onGo,
}: { meta: Meta; hasRun: boolean; onStart: () => void; onContinue: () => void; onGo: (s: 'shop' | 'journal' | 'settings') => void }) => (
  <Screen>
    <View style={{ alignItems: 'center', paddingVertical: 28, gap: 6 }}>
      <OnWood style={{ letterSpacing: 3, fontSize: 12, fontWeight: '700', textAlign: 'center' }}>HEROES WANTED. STANDARDS NEGOTIABLE.</OnWood>
      <H1 style={{ color: C.cream, fontSize: 40, lineHeight: 46, textAlign: 'center' }}>Side Quest{'\n'}Simulator</H1>
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 12, alignItems: 'center' }}>
        <View style={{ transform: [{ rotate: '-6deg' }] }}><Art art={ART.lich} size={84} /></View>
        <Bob><HeroArt classId="barbarian" ancestryId="orc" size={104} /></Bob>
        <View style={{ transform: [{ rotate: '6deg' }] }}><Art art={ART.dragon} size={84} /></View>
      </View>
      <Row style={{ marginTop: 8 }}>
        <Pill label="TIPS" value={meta.tips} color="#7a5a17" />
        <Pill label="BEST" value={`${meta.journal.bestQuests} quests`} />
      </Row>
    </View>
    {hasRun ? <Enter delay={60}><Button testID="continue" label="Continue adventure" kind="primary" onPress={onContinue} /></Enter> : null}
    <Enter delay={120}><Button testID="start" label="New adventure" sub={hasRun ? 'Abandons the adventure in progress' : 'Two to ten minutes, depending on skill and luck'} kind={hasRun ? 'plain' : 'primary'} onPress={onStart} /></Enter>
    <Enter delay={200}><Button testID="shop" label="Guild Hall" sub="Unlock classes and permanent upgrades" onPress={() => onGo('shop')} /></Enter>
    <Enter delay={280}><Button testID="journal" label="Journal" sub="Discoveries, records and obituaries" onPress={() => onGo('journal')} /></Enter>
    <Enter delay={360}><Button testID="settings" label="Settings" onPress={() => onGo('settings')} /></Enter>
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
      <TopBar title="Assemble a hero" onClose={onBack} />
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
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
          <HeroArt classId={classId} ancestryId={ancestryId} size={96} />
          <H2 style={{ flex: 1 }}>{name}</H2>
        </View>
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
    <TopBar title="Guild Hall" onClose={onBack} right={<Pill label="TIPS" value={meta.tips} color="#7a5a17" />} />
    <Paper>
      <H2>Classes</H2>
      {CLASSES.map((c) => {
        const owned = meta.unlockedClasses.includes(c.id);
        return (
          <View key={c.id} style={{ gap: 4, paddingVertical: 6, borderTopWidth: 1, borderColor: '#d6c398' }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <View style={{ opacity: owned ? 1 : 0.55 }}><HeroArt classId={c.id} ancestryId="human" size={56} /></View>
              <View style={{ flex: 1 }}>
                <P style={{ fontWeight: '700' }}>{c.name}</P>
                <Small>{c.blurb}</Small>
              </View>
            </View>
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
  </Screen>
);

export const JournalScreen = ({ meta, onBack }: { meta: Meta; onBack: () => void }) => {
  const j = meta.journal;
  return (
    <Screen>
      <TopBar title="Journal" onClose={onBack} />
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
            {j.objectivesDone.includes(o.id) ? t(objectiveOf(o.id).title, meta.tone, meta.violence) : '? ? ?'}
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
      </Screen>
  );
};

/** Download, choose and switch on the on-device AI Dungeon Master. */
const DmSettings = ({ meta, onChange }: { meta: Meta; onChange: (patch: Partial<Meta>) => void }) => {
  const [have, setHave] = useState<Record<string, boolean>>(() => Object.fromEntries(DM_MODELS.map((m) => [m.id, isModelDownloaded(m.id)])));
  const [busyId, setBusyId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const refresh = () => setHave(Object.fromEntries(DM_MODELS.map((m) => [m.id, isModelDownloaded(m.id)])));

  if (!localDmSupported) {
    return (
      <Paper>
        <H2>AI Dungeon Master</H2>
        <Small>
          The AI Dungeon Master runs on the phone itself, so it is only available in the installed app, not in this preview.
          The scripted Dungeon Master is being used.
        </Small>
      </Paper>
    );
  }
  const ready = !!have[meta.dmModel];
  return (
    <Paper>
      <H2>AI Dungeon Master</H2>
      <Small>
        Lets the Dungeon Master improvise fresh lines for every quest. The model runs entirely on this phone: nothing is sent
        anywhere and it works offline. It is a one-off download, best done on Wi-Fi.
      </Small>
      <Button
        testID="live-dm"
        label={`AI Dungeon Master: ${meta.liveDm && ready ? 'on' : 'off'}`}
        sub={ready ? undefined : 'Download a model below to switch this on'}
        kind={meta.liveDm && ready ? 'primary' : 'plain'}
        disabled={!ready}
        onPress={() => onChange({ liveDm: !meta.liveDm })}
      />
      {DM_MODELS.map((m) => {
        const downloading = busyId === m.id;
        return (
          <View key={m.id} style={{ gap: 4, paddingVertical: 6, borderTopWidth: 1, borderColor: '#d6c398' }}>
            <P style={{ fontWeight: '700' }}>{m.name}  <Small>{m.sizeMb >= 1000 ? `${(m.sizeMb / 1000).toFixed(1)} GB` : `${m.sizeMb} MB`}</Small></P>
            <Small>{m.blurb}</Small>
            {have[m.id] ? (
              <Row>
                <View style={{ flex: 1 }}>
                  <Button
                    testID={`dm-use-${m.id}`}
                    label={meta.dmModel === m.id ? 'In use' : 'Use this one'}
                    kind={meta.dmModel === m.id ? 'primary' : 'plain'}
                    onPress={() => onChange({ dmModel: m.id, liveDm: true })}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Button
                    label="Delete"
                    onPress={() => {
                      deleteModel(m.id);
                      if (meta.dmModel === m.id) onChange({ liveDm: false });
                      refresh();
                    }}
                  />
                </View>
              </Row>
            ) : downloading ? (
              <Button label={`Downloading... ${Math.round(progress * 100)}%`} sub="Tap to cancel" onPress={cancelDownload} />
            ) : (
              <Button
                testID={`dm-get-${m.id}`}
                label={`Download ${m.name}`}
                disabled={busyId !== null}
                onPress={async () => {
                  setBusyId(m.id);
                  setProgress(0);
                  setFailed(false);
                  const ok = await downloadModel(m.id, setProgress);
                  setBusyId(null);
                  setFailed(!ok);
                  refresh();
                  if (ok) onChange({ dmModel: m.id, liveDm: true });
                }}
              />
            )}
          </View>
        );
      })}
      {failed ? <Small style={{ color: C.red }}>The download did not finish. Check the connection and free space, then try again.</Small> : null}
    </Paper>
  );
};

export const SettingsScreen = ({
  meta, onTone, onViolence, onHaptics, onDm, onReset, onBack,
}: { meta: Meta; onTone: (tone: Tone) => void; onViolence: (violence: Violence) => void; onHaptics: (on: boolean) => void; onDm: (patch: Partial<Meta>) => void; onReset: () => void; onBack: () => void }) => {
  const [confirm, setConfirm] = useState(false);
  const [privacyChoices, setPrivacyChoices] = useState(false);
  useEffect(() => {
    let live = true;
    privacyOptionsRequired().then((required) => { if (live) setPrivacyChoices(required); });
    return () => { live = false; };
  }, []);
  return (
    <Screen>
      <TopBar title="Settings" onClose={onBack} />
      <OnWood>Language</OnWood>
      <TonePicker value={meta.tone} onPick={onTone} />
      <OnWood>Violence descriptions</OnWood>
      <ViolencePicker value={meta.violence} onPick={onViolence} />
      <ContentPreview tone={meta.tone} violence={meta.violence} />
      <DmSettings meta={meta} onChange={onDm} />
      <Button testID="haptics" label={`Vibration: ${meta.haptics ? 'on' : 'off'}`} onPress={() => onHaptics(!meta.haptics)} />
      {privacyChoices ? (
        <Button testID="privacy-choices" label="Privacy choices" sub="Review or change how ads may use your data."
          onPress={() => { showPrivacyOptions(); }} />
      ) : null}
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
      </Screen>
  );
};
