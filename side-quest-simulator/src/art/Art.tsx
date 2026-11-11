import React, { useMemo } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { HERO_H, heroSvg, type HeroMood } from './heroes';
import type { InkArt } from './ink';

const wrap = (inner: string, h = 120, w = 120) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${inner}</svg>`;

/** A square cartoon drawing on its tinted backdrop. */
export const Art = ({ art, size, style }: { art: InkArt | undefined; size: number; style?: StyleProp<ViewStyle> }) => {
  const xml = useMemo(() => (art ? wrap(art.svg, art.height, art.width) : null), [art]);
  if (!art || !xml) return null;
  return (
    <View accessible={!!art.label} accessibilityRole="image" accessibilityLabel={art.label} style={[{ width: size, height: size, borderRadius: 4, backgroundColor: art.bg, overflow: 'hidden' }, style]}>
      <SvgXml xml={xml} width={size} height={size} />
    </View>
  );
};

/** Full-width illustration panel for the top of an event card. */
export const ArtBanner = ({ art, height = 150 }: { art: InkArt | undefined; height?: number }) => {
  const xml = useMemo(() => (art ? wrap(art.svg, art.height, art.width) : null), [art]);
  if (!art || !xml) return null;
  return (
    <View testID="comic-panel" accessible={!!art.label} accessibilityRole="image" accessibilityLabel={art.label} style={{ ...(art.width ? { width: '100%', aspectRatio: art.width / (art.height ?? 120) } : { height }), backgroundColor: art.bg, borderRadius: 4, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <SvgXml xml={xml} width={art.width ? '100%' : height} height={art.width ? '100%' : height} />
    </View>
  );
};

/** Full-figure hero portrait, 4:5. `size` is the width. */
export const HeroArt = ({ classId, ancestryId, size, mood = 'neutral' }: { classId: string; ancestryId: string; size: number; mood?: HeroMood }) => {
  const xml = useMemo(() => wrap(heroSvg(classId, ancestryId, mood), HERO_H), [classId, ancestryId, mood]);
  const height = (size * HERO_H) / 120;
  return (
    <View style={{ width: size, height, borderRadius: 4, overflow: 'hidden', backgroundColor: '#15100b' }}>
      <SvgXml xml={xml} width={size} height={height} />
    </View>
  );
};
