import React, { useMemo } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { HERO_H, heroSvg } from './heroes';

const wrap = (inner: string, h = 120) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 ${h}">${inner}</svg>`;

/** A square cartoon drawing on its tinted backdrop. */
export const Art = ({ art, size, style }: { art: { bg: string; svg: string } | undefined; size: number; style?: StyleProp<ViewStyle> }) => {
  const xml = useMemo(() => (art ? wrap(art.svg) : null), [art]);
  if (!art || !xml) return null;
  return (
    <View style={[{ width: size, height: size, borderRadius: 4, backgroundColor: art.bg, overflow: 'hidden' }, style]}>
      <SvgXml xml={xml} width={size} height={size} />
    </View>
  );
};

/** Full-width illustration panel for the top of an event card. */
export const ArtBanner = ({ art, height = 150 }: { art: { bg: string; svg: string } | undefined; height?: number }) => {
  const xml = useMemo(() => (art ? wrap(art.svg) : null), [art]);
  if (!art || !xml) return null;
  return (
    <View style={{ height, backgroundColor: art.bg, borderRadius: 6, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderWidth: 2, borderColor: '#15100b' }}>
      <SvgXml xml={xml} width={height} height={height} />
    </View>
  );
};

/** Full-figure hero portrait, 4:5. `size` is the width. */
export const HeroArt = ({ classId, ancestryId, size }: { classId: string; ancestryId: string; size: number }) => {
  const xml = useMemo(() => wrap(heroSvg(classId, ancestryId), HERO_H), [classId, ancestryId]);
  const height = (size * HERO_H) / 120;
  return (
    <View style={{ width: size, height, borderRadius: 4, overflow: 'hidden', backgroundColor: '#15100b' }}>
      <SvgXml xml={xml} width={size} height={height} />
    </View>
  );
};
