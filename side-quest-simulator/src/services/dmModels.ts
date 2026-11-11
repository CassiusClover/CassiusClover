/**
 * Language models the live Dungeon Master can run on the phone itself. They are GGUF files
 * downloaded once, on request, and kept in the app's documents folder. Nothing is sent to a
 * server and no account or API key is involved.
 */
export interface DmModel {
  id: 'small' | 'better';
  name: string;
  /** File name on disk. */
  file: string;
  url: string;
  sizeMb: number;
  blurb: string;
}

export const DM_MODELS: DmModel[] = [
  {
    id: 'small',
    name: 'Apprentice',
    file: 'qwen2.5-0.5b-instruct-q4_k_m.gguf',
    url: 'https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/qwen2.5-0.5b-instruct-q4_k_m.gguf',
    sizeMb: 469,
    blurb: 'Runs on almost any phone. Quick, occasionally odd.',
  },
  {
    id: 'better',
    name: 'Archmage',
    file: 'qwen2.5-1.5b-instruct-q4_k_m.gguf',
    url: 'https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/resolve/main/qwen2.5-1.5b-instruct-q4_k_m.gguf',
    sizeMb: 1066,
    blurb: 'Noticeably wittier. Wants a recent phone with 6 GB of memory or more.',
  },
];

export const dmModelOf = (id: string) => DM_MODELS.find((m) => m.id === id) ?? DM_MODELS[0];
