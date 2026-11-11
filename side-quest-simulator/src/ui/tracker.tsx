import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TIER_NAMES } from '../game/content/quests';
import { objectiveOf, QUESTS_TO_WIN, rivalProgress, t } from '../game/engine';
import type { RunState, Tone } from '../game/types';
import { C, CloseButton, H2, P, Small, serif } from './kit';

const GOLD_DARK = '#7a5a17';

/**
 * The season at a glance: ten quest markers, where the rival has got to, and the step you
 * are on within the current quest. Tap it for the full season log.
 */
export const Tracker = ({ run, tone }: { run: RunState; tone: Tone }) => {
  const [open, setOpen] = useState(false);
  const rival = rivalProgress(run);
  const q = run.quest;
  const nodes = Array.from({ length: QUESTS_TO_WIN }, (_, i) => i);
  return (
    <>
      <Pressable
        testID="tracker"
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`Quest tracker. You have finished ${run.questsDone} of ${QUESTS_TO_WIN} quests. ${run.rival} has finished ${rival}. Opens the season log.`}
        style={({ pressed }) => [st.wrap, pressed && { opacity: 0.8 }]}
      >
        <View style={st.track}>
          <View style={st.rail} />
          {nodes.map((i) => {
            const rec = run.history[i];
            const current = i === run.questIndex && !rec;
            const final = i === QUESTS_TO_WIN - 1;
            return (
              <View key={i} style={st.slot}>
                {i === rival - 1 ? <View style={st.rivalFlag} /> : null}
                <View
                  style={[
                    st.node,
                    final && st.final,
                    rec ? { backgroundColor: rec.clean ? C.green : C.gold, borderColor: C.cream } : null,
                    current ? { borderColor: C.cream, borderWidth: 3, backgroundColor: C.red } : null,
                  ]}
                />
              </View>
            );
          })}
        </View>
        <View style={st.captionRow}>
          <Text style={st.caption} numberOfLines={1}>
            You {run.questsDone}/{QUESTS_TO_WIN}   <Text style={{ color: '#eb9a88' }}>{run.rival} {rival}/{QUESTS_TO_WIN}</Text>
          </Text>
          {q ? (
            <View style={st.steps}>
              {q.cards.map((_, i) => (
                <View key={i} style={[st.step, i < q.cardIdx && { backgroundColor: C.green }, i === q.cardIdx && { backgroundColor: C.cream }]} />
              ))}
            </View>
          ) : (
            <Text style={st.caption}>Season log</Text>
          )}
        </View>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={st.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={st.sheet} onPress={() => {}}>
            <View style={st.sheetHead}>
              <H2 style={{ flex: 1 }}>Season log</H2>
              <CloseButton onPress={() => setOpen(false)} size={32} />
            </View>
            <Small>
              Hero of the Year goes to whoever wins the showdown at quest {QUESTS_TO_WIN}. {run.rival} has finished {rival} quests to your {run.questsDone}.
            </Small>
            <ScrollView style={{ marginTop: 8 }} showsVerticalScrollIndicator={false}>
              {nodes.map((i) => {
                const rec = run.history[i];
                const current = i === run.questIndex && !rec;
                const final = i === QUESTS_TO_WIN - 1;
                let title = final ? `The Hero of the Year Showdown, against ${run.rival}` : 'Not yet posted';
                let detail = final ? 'The season always ends here.' : '';
                let color: string = C.inkSoft;
                if (rec) {
                  title = t(objectiveOf(rec.objectiveId).title, tone);
                  detail = `${TIER_NAMES[rec.tier]}  |  ${rec.clean ? 'Done cleanly' : 'Botched the finale, half pay'}  |  ${rec.pay} gold`;
                  color = rec.clean ? C.green : GOLD_DARK;
                } else if (current && q) {
                  title = t(objectiveOf(q.offer.objectiveId).title, tone);
                  detail = `In progress: step ${q.cardIdx + 1} of ${q.cards.length}${q.cardIdx === q.cards.length - 1 ? ' (the finale)' : ''}`;
                  color = C.red;
                } else if (current) {
                  title = final ? title : 'Choosing from the quest board';
                  color = C.red;
                }
                return (
                  <View key={i} style={st.row}>
                    <Text style={[st.num, { color }]}>{i + 1}</Text>
                    <View style={{ flex: 1 }}>
                      <P style={{ fontSize: 15, lineHeight: 20, fontWeight: rec || current ? '700' : '400', color: rec || current ? C.ink : C.inkSoft }}>{title}</P>
                      {detail ? <Small style={{ color }}>{detail}</Small> : null}
                      {rec?.memories?.map((memory, m) => <Small key={m}>{t(memory, tone)}</Small>)}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const st = StyleSheet.create({
  wrap: { backgroundColor: C.woodLight, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 10, gap: 6, borderWidth: 1, borderColor: '#5a4330' },
  track: { flexDirection: 'row', alignItems: 'flex-end', height: 26 },
  rail: { position: 'absolute', left: 12, right: 12, bottom: 7, height: 2, backgroundColor: '#6b543a' },
  slot: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: 26 },
  node: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#8a6f52', backgroundColor: C.wood },
  final: { borderRadius: 2, transform: [{ rotate: '45deg' }], borderColor: C.gold },
  rivalFlag: { width: 8, height: 8, backgroundColor: '#d9503c', transform: [{ rotate: '45deg' }], marginBottom: 3, borderWidth: 1, borderColor: C.wood },
  captionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  caption: { fontSize: 11, fontWeight: '700', letterSpacing: 0.4, color: C.parchmentDim, flexShrink: 1 },
  steps: { flexDirection: 'row', gap: 4 },
  step: { width: 22, height: 5, borderRadius: 3, backgroundColor: '#6b543a' },
  backdrop: { flex: 1, backgroundColor: 'rgba(10,6,3,0.72)', justifyContent: 'center', padding: 18 },
  sheet: { backgroundColor: C.parchment, borderRadius: 12, padding: 16, maxHeight: '82%', width: '100%', maxWidth: 480, alignSelf: 'center', borderWidth: 1, borderColor: '#bfa873' },
  sheetHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  row: { flexDirection: 'row', gap: 10, paddingVertical: 7, borderTopWidth: 1, borderColor: '#d6c398', alignItems: 'flex-start' },
  num: { fontFamily: serif, fontSize: 18, fontWeight: '700', width: 24, textAlign: 'center' },
});
