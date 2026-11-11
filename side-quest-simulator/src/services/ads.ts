import type { Tone } from '../game/types';
import type { Placement } from './adConfig';

/**
 * Web and fallback implementation: there is no ad SDK here, so rewards are granted after a
 * short pause. The real implementation lives in ads.native.ts and is picked up automatically
 * on iOS and Android.
 */
export const adsAreSimulated = true;

export const initAds = async (_tone: Tone): Promise<void> => {};

export const setAdTone = (_tone: Tone): void => {};

/** Resolves true only if the player earned the reward. */
export const showRewarded = (_placement: Placement): Promise<boolean> =>
  new Promise((resolve) => setTimeout(() => resolve(true), 900));

/** No consent framework on web; nothing to revisit. */
export const privacyOptionsRequired = async (): Promise<boolean> => false;

export const showPrivacyOptions = async (): Promise<void> => {};
