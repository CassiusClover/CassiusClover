import { Directory, File, Paths, type DownloadTask } from 'expo-file-system';
import { dmModelOf } from './dmModels';
import { dmMessages, dmSchema, type DmContext } from './dmPrompt';

type Llama = typeof import('llama.rn');
type LlamaContext = Awaited<ReturnType<Llama['initLlama']>>;

// llama.rn is native code and is absent in Expo Go. Load it lazily so the game still runs
// there, with the scripted Dungeon Master.
let llama: Llama | null = null;
try {
  llama = require('llama.rn') as Llama;
} catch {
  llama = null;
}

export const localDmSupported = llama !== null;

const modelDir = () => new Directory(Paths.document, 'dm-models');
const modelFile = (id: string) => new File(modelDir(), dmModelOf(id).file);

/** A download counts only if the file is roughly the size it should be. */
export const isModelDownloaded = (id: string): boolean => {
  try {
    const f = modelFile(id);
    return f.exists && (f.size ?? 0) > dmModelOf(id).sizeMb * 1024 * 1024 * 0.95;
  } catch {
    return false;
  }
};

let task: DownloadTask | null = null;

export const downloadModel = async (id: string, onProgress: (fraction: number) => void): Promise<boolean> => {
  if (!localDmSupported) return false;
  if (isModelDownloaded(id)) return true;
  const model = dmModelOf(id);
  try {
    const dir = modelDir();
    if (!dir.exists) dir.create({ intermediates: true });
    const dest = modelFile(id);
    if (dest.exists) dest.delete();
    task = File.createDownloadTask(model.url, dest, {
      onProgress: ({ bytesWritten, totalBytes }) => {
        const total = totalBytes > 0 ? totalBytes : model.sizeMb * 1024 * 1024;
        onProgress(Math.min(1, bytesWritten / total));
      },
    });
    await task.downloadAsync();
    return isModelDownloaded(id);
  } catch {
    return false;
  } finally {
    task = null;
  }
};

export const cancelDownload = (): void => {
  try {
    task?.cancel();
  } catch {
    // Nothing to cancel.
  }
};

let loaded: { id: string; ctx: LlamaContext } | null = null;
let loading: Promise<LlamaContext | null> | null = null;

export const releaseModel = async (): Promise<void> => {
  const current = loaded;
  loaded = null;
  loading = null;
  await current?.ctx.release().catch(() => {});
};

export const deleteModel = (id: string): void => {
  if (loaded?.id === id) releaseModel();
  try {
    const f = modelFile(id);
    if (f.exists) f.delete();
  } catch {
    // Already gone.
  }
};

const load = async (id: string): Promise<LlamaContext | null> => {
  if (!llama || !isModelDownloaded(id)) return null;
  if (loaded?.id === id) return loaded.ctx;
  if (loaded) await releaseModel();
  loading ??= llama
    .initLlama({ model: modelFile(id).uri, n_ctx: 2048, n_gpu_layers: 99 })
    .then((ctx) => {
      loaded = { id, ctx };
      return ctx;
    })
    .catch(() => null)
    .finally(() => {
      loading = null;
    });
  return loading;
};

const STOP = ['</s>', '<|end|>', '<|eot_id|>', '<|end_of_text|>', '<|im_end|>', '<|endoftext|>'];
let busy = false;

/** Writes one quest's lines on the device, or resolves null if the model is unavailable or fails. */
export const generateQuestLines = async (id: string, ctx: DmContext): Promise<unknown | null> => {
  if (busy) return null;
  busy = true;
  try {
    const model = await load(id);
    if (!model) return null;
    const result = await model.completion({
      messages: dmMessages(ctx),
      response_format: { type: 'json_schema', json_schema: { strict: true, schema: dmSchema(ctx.quest.cards.length) } },
      n_predict: 700,
      temperature: 0.8,
      top_p: 0.9,
      stop: STOP,
    });
    return JSON.parse(result.text);
  } catch {
    return null;
  } finally {
    busy = false;
  }
};
