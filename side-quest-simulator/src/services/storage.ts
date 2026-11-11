import AsyncStorage from '@react-native-async-storage/async-storage';
import { hydrateMeta } from '../game/meta';
import type { Meta, RunState } from '../game/types';

const META_KEY = 'sqs.meta.v1';
const RUN_KEY = 'sqs.run.v1';

export const loadMeta = async (): Promise<Meta> => {
  try {
    const raw = await AsyncStorage.getItem(META_KEY);
    return hydrateMeta(raw ? JSON.parse(raw) : null);
  } catch {
    return hydrateMeta(null);
  }
};

export const saveMeta = (meta: Meta): void => {
  AsyncStorage.setItem(META_KEY, JSON.stringify(meta)).catch(() => {});
};

export const loadRun = async (): Promise<RunState | null> => {
  try {
    const raw = await AsyncStorage.getItem(RUN_KEY);
    const run = raw ? (JSON.parse(raw) as RunState) : null;
    // Discard saves from before the Dungeon Master existed; they lack the story fields.
    return run && run.hero && run.phase && typeof run.rival === 'string' ? run : null;
  } catch {
    return null;
  }
};

export const saveRun = (run: RunState | null): void => {
  const op = run ? AsyncStorage.setItem(RUN_KEY, JSON.stringify(run)) : AsyncStorage.removeItem(RUN_KEY);
  op.catch(() => {});
};
