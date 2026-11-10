import { Platform } from 'react-native';
import type { Tone } from '../game/types';
import { AD_UNITS, type Placement } from './adConfig';

type AdsModule = typeof import('react-native-google-mobile-ads');

// The native ad SDK is absent in Expo Go. Load it lazily so the game still runs there,
// with simulated rewards, and uses real ads in development and store builds.
let sdk: AdsModule | null = null;
try {
  sdk = require('react-native-google-mobile-ads') as AdsModule;
} catch {
  sdk = null;
}

export const adsAreSimulated = sdk === null;

const LOAD_TIMEOUT_MS = 10000;
let ready: Promise<void> | null = null;

const ratingFor = (tone: Tone) => {
  const r = sdk!.MaxAdContentRating;
  return tone === 0 ? r.PG : tone === 1 ? r.T : r.MA;
};

export const setAdTone = (tone: Tone): void => {
  if (!sdk) return;
  sdk.default().setRequestConfiguration({ maxAdContentRating: ratingFor(tone) }).catch(() => {});
};

export const initAds = (tone: Tone): Promise<void> => {
  if (!sdk) return Promise.resolve();
  const ads = sdk;
  ready ??= (async () => {
    try {
      // Shows the Google consent form where the law requires one (EEA, UK, some US states).
      await ads.AdsConsent.gatherConsent();
    } catch {
      // Consent could not be gathered (offline, for example); the SDK serves limited ads.
    }
    await ads.default().setRequestConfiguration({ maxAdContentRating: ratingFor(tone) }).catch(() => {});
    await ads.default().initialize();
  })().catch(() => {});
  return ready;
};

const unitFor = (placement: Placement): string => {
  const configured = AD_UNITS[Platform.OS === 'ios' ? 'ios' : 'android'][placement];
  return __DEV__ || !configured ? sdk!.TestIds.REWARDED : configured;
};

/** Loads and shows a rewarded ad. Resolves true only if the player earned the reward. */
export const showRewarded = async (placement: Placement): Promise<boolean> => {
  if (!sdk) return new Promise((resolve) => setTimeout(() => resolve(true), 900));
  const ads = sdk;
  await initAds(0);
  return new Promise<boolean>((resolve) => {
    const ad = ads.RewardedAd.createForAdRequest(unitFor(placement));
    let earned = false;
    let settled = false;
    const subs: (() => void)[] = [];
    const finish = (value: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      subs.forEach((off) => off());
      resolve(value);
    };
    const timer = setTimeout(() => finish(false), LOAD_TIMEOUT_MS);
    subs.push(
      ad.addAdEventListener(ads.RewardedAdEventType.LOADED, () => {
        clearTimeout(timer);
        ad.show().catch(() => finish(false));
      }),
      ad.addAdEventListener(ads.RewardedAdEventType.EARNED_REWARD, () => {
        earned = true;
      }),
      ad.addAdEventListener(ads.AdEventType.CLOSED, () => finish(earned)),
      ad.addAdEventListener(ads.AdEventType.ERROR, () => finish(false)),
    );
    ad.load();
  });
};
