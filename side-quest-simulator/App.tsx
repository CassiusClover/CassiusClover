import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  applyAiNarration, bribe, buyPotion, choose, clearAiNarration, dmMomentContext, narrationKey, newRun, pickBoon, pickQuest, proceed, reroll, revive, type HeroChoice,
} from './src/game/engine';
import { buyUpgrade, defaultMeta, finishRun, unlockClass } from './src/game/meta';
import type { Meta, RunState } from './src/game/types';
import type { Placement } from './src/services/adConfig';
import { adsAreSimulated, initAds, setAdTone, showRewarded } from './src/services/ads';
import { cancelMomentLine, generateMomentLine, isModelDownloaded, localDmSupported } from './src/services/localDm';
import { loadMeta, loadRun, saveMeta, saveRun } from './src/services/storage';
import { C } from './src/ui/kit';
import { CreateScreen, HomeScreen, JournalScreen, SettingsScreen, ShopScreen, ToneScreen } from './src/ui/menus';
import { BoardScreen, BoonScreen, CardScreen, DeadScreen, ResultScreen, SummaryScreen } from './src/ui/run';

type ScreenName = 'home' | 'create' | 'run' | 'summary' | 'shop' | 'journal' | 'settings';

const NO_AD = 'No sponsor could be found just now. Try again in a moment.';

export default function App() {
  const [meta, setMetaState] = useState<Meta | null>(null);
  const [run, setRunState] = useState<RunState | null>(null);
  const [screen, setScreen] = useState<ScreenName>('home');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    (async () => {
      const [m, r] = await Promise.all([loadMeta(), loadRun()]);
      setMetaState(m);
      setRunState(r);
      initAds(m.tone);
    })();
  }, []);

  const setMeta = useCallback((next: Meta) => {
    setMetaState(next);
    saveMeta(next);
  }, []);
  const setRun = useCallback((next: RunState | null) => {
    setRunState(next);
    saveRun(next);
  }, []);
  const go = useCallback((next: ScreenName) => {
    setNotice('');
    setScreen(next);
  }, []);

  const buzz = useCallback(
    (good: boolean) => {
      if (!meta?.haptics) return;
      Haptics.notificationAsync(good ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error).catch(() => {});
    },
    [meta?.haptics],
  );

  /** Shows a rewarded ad and runs `onReward` only if the reward was earned. */
  const withAd = useCallback(async (placement: Placement, onReward: () => void) => {
    setBusy(true);
    setNotice('');
    const earned = await showRewarded(placement).catch(() => false);
    setBusy(false);
    if (earned) onReward();
    else setNotice(NO_AD);
  }, []);

  useEffect(() => {
    if (!meta?.liveDm || !run?.quest || screen !== 'run' || !localDmSupported || !isModelDownloaded(meta.dmModel) ||
      !['card', 'result', 'boon'].includes(run.phase)) return;
    const key = narrationKey(run);
    if (run.liveNarrationKey === key) return;
    let cancelled = false;
    generateMomentLine(meta.dmModel, dmMomentContext(run, meta.tone)).then((line) => {
      if (cancelled || !line) return;
      setRunState((current) => {
        if (!current) return current;
        const merged = applyAiNarration(current, key, line);
        if (merged !== current) saveRun(merged);
        return merged;
      });
    });
    return () => { cancelled = true; cancelMomentLine(); };
  }, [run, meta?.liveDm, meta?.dmModel, meta?.tone, screen]);

  if (!meta) {
    return (
      <View style={{ flex: 1, backgroundColor: C.wood, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={C.parchment} />
      </View>
    );
  }

  const begin = (choice: HeroChoice, blessed: boolean) => {
    const start = () => {
      setRun(newRun(meta, choice, Math.floor(Math.random() * 2 ** 31), blessed));
      go('run');
    };
    if (blessed) withAd('blessing', start);
    else start();
  };

  /** The narration effect follows the actual scene and resolved choice. */
  const startQuest = (index: number) => {
    if (!run) return;
    setRun(pickQuest(run, index));
  };

  const bank = (doubled: boolean) => {
    if (!run) return;
    setMeta(finishRun(meta, run, doubled));
    setRun(null);
    go('home');
  };

  const body = () => {
    if (!meta.toneChosen) {
      const pick = (tone: Meta['tone']) => {
        setAdTone(tone);
        setMeta({ ...meta, tone, toneChosen: true });
      };
      return <ToneScreen onPick={pick} onSkip={() => pick(0)} />;
    }
    if (screen === 'create') {
      return <CreateScreen meta={meta} busy={busy} notice={notice} simulated={adsAreSimulated} onBegin={begin} onBack={() => go('home')} />;
    }
    if (screen === 'shop') {
      return <ShopScreen meta={meta} onUnlock={(id) => setMeta(unlockClass(meta, id))} onUpgrade={(id) => setMeta(buyUpgrade(meta, id))} onBack={() => go('home')} />;
    }
    if (screen === 'journal') return <JournalScreen meta={meta} onBack={() => go('home')} />;
    if (screen === 'settings') {
      return (
        <SettingsScreen
          meta={meta}
          onTone={(tone) => {
            setAdTone(tone);
            setMeta({ ...meta, tone });
            if (run) setRun(clearAiNarration(run));
          }}
          onHaptics={(haptics) => setMeta({ ...meta, haptics })}
          onDm={(patch) => {
            setMeta({ ...meta, ...patch });
            if (run) setRun(clearAiNarration(run));
          }}
          onReset={() => {
            setRun(null);
            setMeta({ ...defaultMeta(), tone: meta.tone, toneChosen: true, haptics: meta.haptics });
          }}
          onBack={() => go('home')}
        />
      );
    }
    if (run && (screen === 'summary' || (screen === 'run' && run.phase === 'victory'))) {
      return (
        <SummaryScreen
          run={run} meta={meta} busy={busy} notice={notice} simulated={adsAreSimulated}
          onCollect={() => bank(false)}
          onDouble={() => withAd('doubleTips', () => bank(true))}
        />
      );
    }
    if (run && screen === 'run') {
      switch (run.phase) {
        case 'board':
          return <BoardScreen run={run} tone={meta.tone} onPick={startQuest} onQuit={() => go('home')} />;
        case 'card':
          return <CardScreen run={run} tone={meta.tone} onChoose={(i) => setRun(choose(run, i))} onBribe={() => setRun(bribe(run))} onQuit={() => go('home')} />;
        case 'result':
          return <ResultScreen run={run} tone={meta.tone} onProceed={() => setRun(proceed(run))} onReroll={() => setRun(reroll(run))} onRevealed={buzz} />;
        case 'boon':
          return <BoonScreen run={run} tone={meta.tone} onPick={(i) => setRun(pickBoon(run, i))} onPotion={() => setRun(buyPotion(run))} />;
        case 'dead':
          return (
            <DeadScreen
              run={run} busy={busy} notice={notice} simulated={adsAreSimulated}
              onRevive={() => withAd('revive', () => setRun(revive(run)))}
              onAccept={() => go('summary')}
            />
          );
      }
    }
    return (
      <HomeScreen
        meta={meta}
        hasRun={!!run}
        onStart={() => go('create')}
        onContinue={() => go('run')}
        onGo={go}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: C.wood }}>{body()}</View>
    </SafeAreaProvider>
  );
}
