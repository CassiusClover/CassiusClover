import type { DmContext } from './dmPrompt';

/**
 * Web and fallback implementation: there is no on-device model here, so the scripted
 * Dungeon Master is used. The real implementation is localDm.native.ts.
 */
export const localDmSupported = false;

export const isModelDownloaded = (_id: string): boolean => false;

export const downloadModel = async (_id: string, _onProgress: (fraction: number) => void): Promise<boolean> => false;

export const cancelDownload = (): void => {};

export const deleteModel = (_id: string): void => {};

/** Writes one quest's lines, or resolves null if the model is unavailable or fails. */
export const generateQuestLines = async (_id: string, _ctx: DmContext): Promise<unknown | null> => null;

export const releaseModel = async (): Promise<void> => {};
