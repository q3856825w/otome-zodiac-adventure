import { characters } from "./characters";
import type { Character, Ending } from "../types";

export const ART_REVIEW_MODE = false;

export interface EndingReviewItem extends Ending {
  characterName: string;
  characterZodiac: string;
  routeName: string;
  cgKey: string;
  cgFileName: string;
  hasImageAsset: boolean;
}

const fileNameFrom = (imageUrl?: string) => imageUrl?.split("/").pop() ?? "未指定";

const cgKeyFrom = (ending: Ending, character: Character) => ending.imageUrl ? fileNameFrom(ending.imageUrl).replace(/\.[^.]+$/, "") : `${character.id}-${ending.type}`;

export const getAllEndingReviewItems = (sourceCharacters: Character[] = characters): EndingReviewItem[] =>
  sourceCharacters.flatMap((character) =>
    character.endings.map((ending) => {
      const cgFileName = fileNameFrom(ending.imageUrl);
      return {
        ...ending,
        characterName: character.name,
        characterZodiac: character.zodiac,
        routeName: `${character.name}｜${character.zodiac}`,
        cgKey: cgKeyFrom(ending, character),
        cgFileName,
        hasImageAsset: Boolean(ending.imageUrl),
      };
    })
  );
