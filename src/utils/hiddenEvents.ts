import { routeProfiles } from "../data/routeProfiles";
import type { Character, GameState } from "../types";

const routeSceneCount = (state: GameState, character: Character) =>
  state.completedScenes.filter((scene) => scene.startsWith(`${character.id}-`)).length;

const qualifies = (state: GameState, character: Character, index: number) => {
  const scenes = routeSceneCount(state, character);
  if (character.id === "capricorn") {
    if (index === 0) return character.professorComposure <= 60 || scenes >= 3;
    if (index === 1) return character.affection >= 80 || scenes >= 6;
    if (index === 2) return character.professorComposure <= 10 || state.player.flags.capricorn_core;
  }
  if (character.id === "pisces") {
    if (index === 0) return character.selfAwareness >= 35 || scenes >= 1;
    if (index === 1) return character.boundary >= 45 && character.overwhelm < 65;
    if (index === 2) return character.selfAwareness >= 60 && character.trust >= 55;
  }
  if (index === 0) return character.affection >= 45 || scenes >= 2;
  if (index === 1) return character.trust >= 50 || scenes >= 4;
  return false;
};

export const findNewHiddenEvents = (state: GameState) => {
  const character = state.characters.find((item) => item.id === state.player.selectedRoute);
  if (!character) return [];
  const profile = routeProfiles[character.id];
  if (!profile) return [];

  return profile.hiddenEvents.filter((event, index) =>
    !state.unlockedHiddenEvents.includes(event.id) && qualifies(state, character, index)
  );
};
