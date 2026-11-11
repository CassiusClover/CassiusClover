import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const C = {
  wood: '#2a1c12',
  woodLight: '#3d2a1b',
  parchment: '#f3e6c8',
  parchmentDim: '#e4d3ab',
  ink: '#2b1a0d',
  inkSoft: '#6b543a',
  red: '#a3321f',
  green: '#3f6b35',
  gold: '#c7922a',
  blue: '#2f5d7c',
  cream: '#fbf4e2',
};

export const serif = Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, "Times New Roman", serif' });

export const Screen = ({ children, scroll = true }: { children: React.ReactNode; scroll?: boolean }) => (
  <SafeAreaView style={s.screen}>
    <View style={s.column}>
      {scroll ? (
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        <View style={[s.scroll, { flex: 1 }]}>{children}</View>
      )}
    </View>
  </SafeAreaView>
);

export const Paper = ({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) => (
  <View style={[s.paper, style]}>{children}</View>
);

export const H1 = ({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) => (
  <Text style={[s.h1, style]}>{children}</Text>
);
export const H2 = ({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) => (
  <Text style={[s.h2, style]}>{children}</Text>
);
export const P = ({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) => (
  <Text style={[s.p, style]}>{children}</Text>
);
export const Small = ({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) => (
  <Text style={[s.small, style]}>{children}</Text>
);
/** Light text for use directly on the wooden background. */
export const OnWood = ({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) => (
  <Text style={[s.onWood, style]}>{children}</Text>
);

type Kind = 'primary' | 'plain' | 'ad' | 'ghost';

export const Button = ({
  label, sub, onPress, kind = 'plain', disabled, testID,
}: { label: string; sub?: string; onPress: () => void; kind?: Kind; disabled?: boolean; testID?: string }) => (
  <Pressable
    testID={testID}
    accessibilityRole="button"
    accessibilityLabel={sub ? `${label}. ${sub}` : label}
    disabled={disabled}
    onPress={onPress}
    style={({ pressed }) => [s.btn, s[`btn_${kind}`], pressed && s.pressed, disabled && s.disabled]}
  >
    <Text style={[s.btnLabel, kind !== 'plain' && { color: C.cream }, kind === 'ghost' && { color: C.parchment }]}>{label}</Text>
    {sub ? <Text style={[s.btnSub, kind !== 'plain' && { color: C.parchmentDim }]}>{sub}</Text> : null}
  </Pressable>
);

export const Pill = ({ label, value, color = C.woodLight }: { label: string; value: string | number; color?: string }) => (
  <View style={[s.pill, { backgroundColor: color }]}>
    <Text style={s.pillLabel}>{label}</Text>
    <Text style={s.pillValue}>{value}</Text>
  </View>
);

export const Row = ({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) => (
  <View style={[s.row, style]}>{children}</View>
);

/** A meter whose fill glides to its new value. */
export const Bar = ({ value, max, color = C.red }: { value: number; max: number; color?: string }) => {
  const pct = Math.max(0, Math.min(100, (value / Math.max(1, max)) * 100));
  const v = useRef(new Animated.Value(pct)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: pct, duration: 450, useNativeDriver: false }).start();
  }, [pct, v]);
  return (
    <View style={s.barOuter}>
      <Animated.View style={[s.barInner, { width: v.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }), backgroundColor: color }]} />
    </View>
  );
};

/** Round X button for the corner of a screen. */
export const CloseButton = ({ onPress, label = 'Close', size = 38 }: { onPress: () => void; label?: string; size?: number }) => (
  <Pressable
    testID="close"
    accessibilityRole="button"
    accessibilityLabel={label}
    hitSlop={10}
    onPress={onPress}
    style={({ pressed }) => [s.close, { width: size, height: size }, pressed && s.pressed]}
  >
    <View style={[s.closeBar, { width: size * 0.46, transform: [{ rotate: '45deg' }] }]} />
    <View style={[s.closeBar, { width: size * 0.46, transform: [{ rotate: '-45deg' }] }]} />
  </Pressable>
);

/** Screen title with an optional badge and the close button in the corner. */
export const TopBar = ({ title, onClose, right }: { title: string; onClose?: () => void; right?: React.ReactNode }) => (
  <View style={s.topBar}>
    <Text style={s.topTitle}>{title}</Text>
    {right}
    {onClose ? <CloseButton onPress={onClose} /> : null}
  </View>
);

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.wood },
  column: { flex: 1, width: '100%', maxWidth: 520, alignSelf: 'center' },
  scroll: { padding: 16, paddingBottom: 32, gap: 12 },
  paper: {
    backgroundColor: C.parchment, borderRadius: 10, padding: 16, gap: 8,
    borderWidth: 1, borderColor: '#bfa873',
    shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 4,
  },
  h1: { fontFamily: serif, fontSize: 30, lineHeight: 36, fontWeight: '700', color: C.ink },
  h2: { fontFamily: serif, fontSize: 20, lineHeight: 26, fontWeight: '700', color: C.ink },
  p: { fontFamily: serif, fontSize: 17, lineHeight: 24, color: C.ink },
  small: { fontSize: 13, lineHeight: 18, color: C.inkSoft },
  onWood: { fontFamily: serif, fontSize: 15, lineHeight: 21, color: C.parchmentDim },
  btn: { borderRadius: 10, paddingVertical: 12, paddingHorizontal: 16, minHeight: 50, justifyContent: 'center', borderWidth: 1 },
  btn_plain: { backgroundColor: C.cream, borderColor: '#bfa873' },
  btn_primary: { backgroundColor: C.red, borderColor: '#6e1f12' },
  btn_ad: { backgroundColor: C.blue, borderColor: '#1c3d54' },
  btn_ghost: { backgroundColor: 'transparent', borderColor: C.inkSoft },
  pressed: { opacity: 0.75, transform: [{ scale: 0.985 }] },
  disabled: { opacity: 0.4 },
  btnLabel: { fontFamily: serif, fontSize: 17, fontWeight: '700', color: C.ink },
  btnSub: { fontSize: 13, lineHeight: 18, color: C.inkSoft, marginTop: 2 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 999 },
  pillLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8, color: C.parchmentDim },
  pillValue: { fontSize: 15, fontWeight: '700', color: C.cream, fontVariant: ['tabular-nums'] },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  barOuter: { height: 8, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.35)', overflow: 'hidden' },
  barInner: { height: 8, borderRadius: 4 },
  close: { width: 38, height: 38, borderRadius: 19, backgroundColor: C.woodLight, borderWidth: 1, borderColor: C.inkSoft, alignItems: 'center', justifyContent: 'center' },
  closeBar: { position: 'absolute', width: 18, height: 2.5, borderRadius: 2, backgroundColor: C.parchment },
  topBar: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  topTitle: { flex: 1, fontFamily: serif, fontSize: 22, fontWeight: '700', color: C.cream },
});
