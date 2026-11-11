/**
 * AdMob rewarded ad unit ids.
 *
 * Live units from the AdMob account symbioticsolutionsai@gmail.com (publisher
 * pub-7682672193157403). Development builds (__DEV__) and empty entries use Google's test
 * units instead. Release builds, including EAS `preview` installs, request LIVE ads: never
 * tap them on your own phones, or AdMob may suspend the account. Register test devices in
 * AdMob (Settings > Test devices) before installing a release build to play it yourself.
 */
export type Placement = 'revive' | 'blessing' | 'doubleTips';

export const AD_UNITS: Record<'ios' | 'android', Record<Placement, string>> = {
  ios: {
    revive: 'ca-app-pub-7682672193157403/3810079927',
    blessing: 'ca-app-pub-7682672193157403/2496998257',
    doubleTips: 'ca-app-pub-7682672193157403/1243626335',
  },
  android: {
    revive: 'ca-app-pub-7682672193157403/8519481121',
    blessing: 'ca-app-pub-7682672193157403/7206399456',
    doubleTips: 'ca-app-pub-7682672193157403/4580236110',
  },
};
