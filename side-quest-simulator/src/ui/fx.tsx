import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Art } from '../art/Art';
import { ART } from '../art/creatures';
import type { Outcome } from '../game/types';
import { C, serif, useAnimationValue } from './kit';

/** Native-driven animation everywhere except web, where the driver does not exist. */
export const ND = Platform.OS !== 'web';

/** Fades and lifts its children into place. Give siblings rising delays to stagger them. */
export const Enter = ({ children, delay = 0, from = 16, style }: { children: React.ReactNode; delay?: number; from?: number; style?: StyleProp<ViewStyle> }) => {
  const v = useAnimationValue(0);
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 280, delay, easing: Easing.out(Easing.cubic), useNativeDriver: ND }).start();
  }, [v, delay]);
  return (
    <Animated.View style={[style, { opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [from, 0] }) }] }]}>
      {children}
    </Animated.View>
  );
};

/** Springs in from small, for rewards and verdicts. */
export const Pop = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const v = useAnimationValue(0);
  useEffect(() => {
    Animated.sequence([Animated.delay(delay), Animated.spring(v, { toValue: 1, friction: 5, tension: 140, useNativeDriver: ND })]).start();
  }, [v, delay]);
  return <Animated.View style={{ opacity: v, transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) }] }}>{children}</Animated.View>;
};

/** Shakes its children whenever `trigger` changes (skipping the first render). */
export const Shake = ({ children, trigger }: { children: React.ReactNode; trigger: number }) => {
  const v = useAnimationValue(0);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    v.setValue(0);
    Animated.timing(v, { toValue: 1, duration: 420, easing: Easing.linear, useNativeDriver: ND }).start();
  }, [trigger, v]);
  const x = v.interpolate({ inputRange: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], outputRange: [0, -9, 8, -7, 6, -4, 2, 0] });
  return <Animated.View style={{ transform: [{ translateX: x }] }}>{children}</Animated.View>;
};

/** The Dungeon Master's speech, typed out. Tap to finish the line at once. */
export const DmSays = (props: { text: string; live?: boolean }) => <DmLine key={props.text} {...props} />;

const DmLine = ({ text, live = false }: { text: string; live?: boolean }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!text) return;
    const id = setInterval(() => setN((c) => (c >= text.length ? c : c + 2)), 16);
    return () => clearInterval(id);
  }, [text]);
  if (!text) return null;
  return (
    <Pressable onPress={() => setN(text.length)} accessibilityRole="text" accessibilityLabel={`Dungeon Master: ${text}`} style={st.dm}>
      <Art art={ART.dm} size={52} />
      <View style={{ flex: 1 }}>
        <Text style={st.dmCap}>THE DUNGEON MASTER{live ? '   IMPROVISING' : ''}</Text>
        <Text style={st.dmText}>
          {text.slice(0, n)}
          <Text style={{ color: 'transparent' }}>{text.slice(n)}</Text>
        </Text>
      </View>
    </Pressable>
  );
};

const HEX = 'M60 16 L98 38 L98 82 L60 104 L22 82 L22 38z';
const dieXml = (edge: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><clipPath id="d"><path d="${HEX}"/></clipPath></defs>` +
  `<path d="${HEX}" fill="#eadfc4"/>` +
  `<g clip-path="url(#d)"><path d="M64 0 L57 22 L68 40 L55 58 L66 76 L56 94 L62 120 L130 120 L130 0z" fill="#15100b"/></g>` +
  `<path d="M60 34 L86 78 L34 78z" fill="#eadfc4" stroke="#15100b" stroke-width="2.6" stroke-linejoin="miter"/>` +
  `<path d="M22 38 L60 34 M22 82 L34 78 M22 38 L34 78 M60 16 L60 34" fill="none" stroke="#15100b" stroke-width="2.6"/>` +
  `<g clip-path="url(#d)"><path d="M98 38 L60 34 M98 82 L86 78 M98 38 L86 78 M60 104 L60 78" fill="none" stroke="#eadfc4" stroke-width="2" opacity="0.85"/></g>` +
  `<path d="${HEX}" fill="none" stroke="${edge}" stroke-width="5" stroke-linejoin="miter"/></svg>`;

const RAYS = Array.from({ length: 12 }, (_, i) => i * 30);

/**
 * The d20. It drops in, tumbles, rattles through numbers and lands on `value`; a critical
 * success throws off rays and a natural one makes it shudder. `rollKey` restarts the roll.
 */
export const D20 = ({
  value, rollKey, outcome, size = 136, onLanded,
}: { value: number; rollKey: string; outcome: Outcome; size?: number; onLanded: () => void }) => {
  const drop = useAnimationValue(0);
  const spin = useAnimationValue(0);
  const pop = useAnimationValue(1);
  const shake = useAnimationValue(0);
  const burst = useAnimationValue(0);
  const [shown, setShown] = useState(value);
  const [landedKey, setLandedKey] = useState('');
  const landed = landedKey === rollKey;
  const landedCb = useRef(onLanded);
  useEffect(() => { landedCb.current = onLanded; }, [onLanded]);

  useEffect(() => {
    drop.setValue(0);
    spin.setValue(0);
    pop.setValue(1);
    shake.setValue(0);
    burst.setValue(0);
    Animated.parallel([
      Animated.timing(drop, { toValue: 1, duration: 820, easing: Easing.bounce, useNativeDriver: ND }),
      Animated.timing(spin, { toValue: 1, duration: 1000, easing: Easing.out(Easing.cubic), useNativeDriver: ND }),
    ]).start();
    // Rattle through faces, slowing down as the die settles.
    const timers: ReturnType<typeof setTimeout>[] = [];
    let at = 0;
    for (let gap = 45; at < 940; gap *= 1.16) {
      at += gap;
      timers.push(setTimeout(() => setShown(1 + Math.floor(Math.random() * 20)), at));
    }
    timers.push(setTimeout(() => {
      setShown(value);
      setLandedKey(rollKey);
      Animated.sequence([
        Animated.timing(pop, { toValue: 1.26, duration: 110, useNativeDriver: ND }),
        Animated.spring(pop, { toValue: 1, friction: 4, tension: 160, useNativeDriver: ND }),
      ]).start();
      if (outcome === 'fumble' || outcome === 'fail') {
        Animated.timing(shake, { toValue: 1, duration: outcome === 'fumble' ? 620 : 320, easing: Easing.linear, useNativeDriver: ND }).start();
      }
      if (outcome === 'crit' || outcome === 'success') {
        Animated.timing(burst, { toValue: 1, duration: outcome === 'crit' ? 900 : 520, easing: Easing.out(Easing.quad), useNativeDriver: ND }).start();
      }
      landedCb.current();
    }, 1060));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rollKey]);

  const good = outcome === 'crit' || outcome === 'success';
  const tint = !landed ? '#15100b' : outcome === 'crit' ? C.gold : good ? C.green : C.red;
  const reach = outcome === 'crit' ? size * 0.95 : size * 0.62;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {good
        ? RAYS.map((deg) => (
            <Animated.View
              key={deg}
              pointerEvents="none"
              style={{
                position: 'absolute', width: outcome === 'crit' ? 5 : 3, height: size * 0.2, borderRadius: 3,
                backgroundColor: outcome === 'crit' ? C.gold : C.green,
                opacity: burst.interpolate({ inputRange: [0, 0.1, 0.7, 1], outputRange: [0, 1, 0.8, 0] }),
                transform: [{ rotate: `${deg}deg` }, { translateY: burst.interpolate({ inputRange: [0, 1], outputRange: [-size * 0.3, -reach] }) }],
              }}
            />
          ))
        : null}
      <Animated.View
        style={{
          transform: [
            { translateY: drop.interpolate({ inputRange: [0, 1], outputRange: [-size * 1.5, 0] }) },
            { translateX: Animated.add(
                drop.interpolate({ inputRange: [0, 0.5, 1], outputRange: [-size * 0.5, size * 0.16, 0] }),
                shake.interpolate({ inputRange: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1], outputRange: [0, -10, 9, -8, 6, -4, 2, 0] }),
              ) },
          ],
        }}
      >
        <Animated.View
          style={{
            width: size, height: size, alignItems: 'center', justifyContent: 'center',
            opacity: drop.interpolate({ inputRange: [0, 0.12, 1], outputRange: [0, 1, 1] }),
            transform: [{ rotate: spin.interpolate({ inputRange: [0, 1], outputRange: ['-1086deg', '-6deg'] }) }, { scale: pop }],
          }}
        >
          <SvgXml xml={dieXml(tint)} width={size} height={size} />
          <Text
            testID="die-value"
            style={{
              position: 'absolute', top: size * 0.4, width: size, textAlign: 'center', fontFamily: serif, fontWeight: '700',
              fontSize: size * 0.22, lineHeight: size * 0.25, color: !landed ? '#15100b' : good ? C.green : C.red,
            }}
          >
            {shown}
          </Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

/** A gentle idle bob, so illustrations feel alive. */
export const Bob = ({ children }: { children: React.ReactNode }) => {
  const v = useAnimationValue(0);
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration: 1300, easing: Easing.inOut(Easing.sin), useNativeDriver: ND }),
        Animated.timing(v, { toValue: 0, duration: 1300, easing: Easing.inOut(Easing.sin), useNativeDriver: ND }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v]);
  return (
    <Animated.View
      style={{
        transform: [
          { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [3, -4] }) },
          { rotate: v.interpolate({ inputRange: [0, 1], outputRange: ['-1.2deg', '1.2deg'] }) },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
};

const st = StyleSheet.create({
  dm: {
    flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: '#1c1622', borderRadius: 10, padding: 10,
    borderWidth: 1, borderColor: '#5a3b5e',
  },
  dmCap: { fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: C.gold, marginBottom: 2 },
  dmText: { fontFamily: serif, fontSize: 15, lineHeight: 21, color: C.cream, fontStyle: 'italic' },
});
