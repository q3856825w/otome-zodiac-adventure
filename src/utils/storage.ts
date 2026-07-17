import type { GameState, PlayerProfile } from "../types";

const SAVE_KEY = "zodiac-otome-save-v1";
const COLLECTION_KEY = "zodiac-otome-collection-v1";
const PLAYER_PROFILE_KEY = "zodiac-otome-player-profile-v1";

export const saveGame = (state: GameState) => {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
};

export const loadGame = (): GameState | null => {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
};

export const clearSave = () => {
  localStorage.removeItem(SAVE_KEY);
};

export const saveCollection = (endingIds: string[]) => {
  const existing = loadCollection();
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(Array.from(new Set([...existing, ...endingIds]))));
};

export const loadCollection = (): string[] => {
  const raw = localStorage.getItem(COLLECTION_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
};

export const savePlayerProfile = (profile: PlayerProfile) => {
  localStorage.setItem(PLAYER_PROFILE_KEY, JSON.stringify(profile));
};

export const loadPlayerProfile = (): PlayerProfile | null => {
  const raw = localStorage.getItem(PLAYER_PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PlayerProfile;
  } catch {
    return null;
  }
};
