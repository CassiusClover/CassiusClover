/**
 * AdMob rewarded ad unit ids.
 *
 * Leave these empty to use Google's official test units (safe to tap during development).
 * Before a store release, create one rewarded unit per placement in the AdMob console and
 * paste the ids here. Also replace the two app ids in app.json (react-native-google-mobile-ads
 * plugin). Never tap your own live ads: AdMob suspends accounts for it.
 */
export type Placement = 'revive' | 'blessing' | 'doubleTips';

export const AD_UNITS: Record<'ios' | 'android', Record<Placement, string>> = {
  ios: { revive: '', blessing: '', doubleTips: '' },
  android: { revive: '', blessing: '', doubleTips: '' },
};
