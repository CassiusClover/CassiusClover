import React, { useMemo } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { heroSvg } from './heroes';

const wrap = (inner: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">${inner}</svg>`;

/** A square cartoon drawing on its tinted backdrop. */
export const Art = ({ art, size, style }: { art: { bg: string; svg: string } | undefined; size: number; style?: StyleProp<ViewStyle> }) => {
  const xml = useMemo(() => (art ? wrap(art.svg) : null), [art]);
  if (!art || !xml) return null;
  return (
    <View style={[{ width: size, height: size, borderRadius: size * 0.16, backgroundColor: art.bg, overflow: 'hidden', borderWidth: 2, borderColor: '#2b1a0d' }, style]}>
      <SvgXml xml={xml} width={size - 4} height={size - 4} />
    </View>
  );
};

/** Full-width illustration panel for the top of an event card. */
export const ArtBanner = ({ art, height = 150 }: { art: { bg: string; svg: string } | undefined; height?: number }) => {
  const xml = useMemo(() => (art ? wrap(art.svg) : null), [art]);
  if (!art || !xml) return null;
  return (
    <View style={{ height, backgroundColor: art.bg, borderRadius: 8, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderWidth: 2, borderColor: '#2b1a0d' }}>
      <SvgXml xml={xml} width={height} height={height} />
    </View>
  );
};

export const HeroArt = ({ classId, ancestryId, size, bg = '#e8dcc0' }: { classId: string; ancestryId: string; size: number; bg?: string }) => {
  const art = useMemo(() => ({ bg, svg: heroSvg(classId, ancestryId) }), [classId, ancestryId, bg]);
  return <Art art={art} size={size} />;
};
