import type { BloodType, Character, PlayerProfile, ZodiacSign } from "../types";
import { routeProfiles } from "./routeProfiles";

export type ZodiacElement = "fire" | "earth" | "air" | "water";
export type ZodiacMode = "cardinal" | "fixed" | "mutable";
export type RelationshipType = "same" | "trine" | "sextile" | "opposition" | "square" | "adjacent" | "neutral";

export interface ZodiacInfo {
  id: string;
  name: ZodiacSign;
  element: ZodiacElement;
  mode: ZodiacMode;
}

export interface CompatibilityResult {
  attraction: number;
  trust: number;
  communication: number;
  tension: number;
  hiddenPotential: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  keyword: string;
  missionHint: string;
  relationshipType: RelationshipType;
  score: number;
}

export const zodiacSigns: ZodiacInfo[] = [
  { id: "aries", name: "牡羊座", element: "fire", mode: "cardinal" },
  { id: "taurus", name: "金牛座", element: "earth", mode: "fixed" },
  { id: "gemini", name: "雙子座", element: "air", mode: "mutable" },
  { id: "cancer", name: "巨蟹座", element: "water", mode: "cardinal" },
  { id: "leo", name: "獅子座", element: "fire", mode: "fixed" },
  { id: "virgo", name: "處女座", element: "earth", mode: "mutable" },
  { id: "libra", name: "天秤座", element: "air", mode: "cardinal" },
  { id: "scorpio", name: "天蠍座", element: "water", mode: "fixed" },
  { id: "sagittarius", name: "射手座", element: "fire", mode: "mutable" },
  { id: "capricorn", name: "摩羯座", element: "earth", mode: "cardinal" },
  { id: "aquarius", name: "水瓶座", element: "air", mode: "fixed" },
  { id: "pisces", name: "雙魚座", element: "water", mode: "mutable" },
];

export const zodiacByName = Object.fromEntries(zodiacSigns.map((sign) => [sign.name, sign])) as Record<ZodiacSign, ZodiacInfo>;

export const zodiacByCharacterId = Object.fromEntries(zodiacSigns.map((sign) => [sign.id, sign])) as Record<string, ZodiacInfo>;

const clamp = (value: number) => Math.max(0, Math.min(100, value));

const positivePair = (a: ZodiacElement, b: ZodiacElement) =>
  (a === "fire" && b === "air") ||
  (a === "air" && b === "fire") ||
  (a === "water" && b === "earth") ||
  (a === "earth" && b === "water");

export const getRelationshipType = (heroineZodiac: ZodiacSign, maleZodiac: ZodiacSign): RelationshipType => {
  const heroineIndex = zodiacSigns.findIndex((sign) => sign.name === heroineZodiac);
  const maleIndex = zodiacSigns.findIndex((sign) => sign.name === maleZodiac);
  if (heroineIndex < 0 || maleIndex < 0) return "neutral";
  const distance = Math.abs(heroineIndex - maleIndex);
  const aspect = Math.min(distance, 12 - distance);
  if (aspect === 0) return "same";
  if (aspect === 4) return "trine";
  if (aspect === 2) return "sextile";
  if (aspect === 6) return "opposition";
  if (aspect === 3) return "square";
  if (aspect === 1) return "adjacent";
  return "neutral";
};

const keywordFor = (relationshipType: RelationshipType, bloodType: BloodType) => {
  if (bloodType === "AB型" && ["opposition", "square", "adjacent"].includes(relationshipType)) return "適合 Hidden Ending";
  if (relationshipType === "same" || relationshipType === "trine") return "命定吸引";
  if (relationshipType === "sextile") return "慢熱安全牌";
  if (relationshipType === "opposition") return "高甜高爆雷";
  if (relationshipType === "square") return "互相折磨但很有戲";
  if (relationshipType === "adjacent") return "理解成本高但可推進";
  return "普通但有變數";
};

const applyBloodType = (base: Omit<CompatibilityResult, "difficulty" | "keyword" | "missionHint" | "relationshipType" | "score">, bloodType: BloodType) => {
  const next = { ...base };
  if (bloodType === "A型") {
    next.trust += 10;
    next.tension -= 5;
    next.attraction -= 2;
  }
  if (bloodType === "B型") {
    next.attraction += 10;
    next.communication += 4;
    next.tension += 8;
  }
  if (bloodType === "O型") {
    next.communication += 10;
    next.trust += 4;
    next.tension -= 2;
  }
  if (bloodType === "AB型") {
    next.hiddenPotential += 14;
    next.attraction += 4;
    next.communication -= 4;
    next.tension += 5;
  }
  return {
    attraction: clamp(next.attraction),
    trust: clamp(next.trust),
    communication: clamp(next.communication),
    tension: clamp(next.tension),
    hiddenPotential: clamp(next.hiddenPotential),
  };
};

const missionByCharacter = (character: Character, heroine: ZodiacInfo, male: ZodiacInfo, bloodType: BloodType, relation: RelationshipType) => {
  const easyFireAir = positivePair(heroine.element, male.element) && ["fire", "air"].includes(male.element);
  const steadyEarthWater = positivePair(heroine.element, male.element) && ["earth", "water"].includes(male.element);
  const highConflict = relation === "opposition" || relation === "square";
  const routeLesson = routeProfiles[character.id]?.loveLesson;

  if (character.id === "sagittarius") {
    if (easyFireAir) return "任務：用邀約和行動靠近原野，給他自由感，也清楚說出你想一起看遠方。";
    return "任務：不要把等待變成壓力；問期限可以，但避免查勤式追問，讓他知道想回來不等於被綁住。";
  }
  if (character.id === "scorpio") {
    if (highConflict) return "任務：對夜洵保持誠實與界線，不用試探回試探；被逼近時也要清楚說出不舒服。";
    return "任務：慢慢累積信任、揭開秘密，同時降低佔有慾；坦白比猜測更能靠近他。";
  }
  if (character.id === "capricorn") {
    return "任務：用穩定行動與守約累積沈知衡的信任；不要只靠撒嬌或情緒勒索攻略，讓他看見你也能並肩。";
  }
  if (character.id === "cancer" || steadyEarthWater) {
    return `任務：把安全感說清楚，也別把他的照顧當成理所當然。${routeLesson ? `課題提示：${routeLesson}` : ""}`;
  }
  if (character.id === "libra") {
    return "任務：不要追著曖昧跑；觀察他是否願意明確選擇，也讓自己站穩位置。";
  }
  if (character.id === "pisces") {
    return "任務：溫柔陪伴但不過度承諾；界線感與自我覺察越高，越容易走向完整結局。";
  }
  if (character.id === "aries") {
    return "任務：陪他面對問題，不只安慰；讓他知道承認痛不等於認輸。";
  }
  if (character.id === "leo") {
    return "任務：欣賞他的光，也看見光環裂開後的人；不要只把他放在舞台上仰望。";
  }
  if (character.id === "virgo") {
    return "任務：用行動證明可靠，也提醒他不是所有心動都能被公式訂正。";
  }
  if (character.id === "gemini") {
    return "任務：跟上他的節奏，但在玩笑停下時，願意聽見沒有播出的真心。";
  }
  if (character.id === "aquarius") {
    return "任務：接受他的奇怪，也讓他知道情緒不用全部解釋完才值得被接住。";
  }
  return routeLesson ? `任務：圍繞他的戀愛課題推進。${routeLesson}` : "任務：觀察他的核心課題，選擇能增加信任又保留界線的回答。";
};

export const calculateCompatibility = (heroineZodiac: ZodiacSign, bloodType: BloodType, character: Character): CompatibilityResult => {
  const heroine = zodiacByName[heroineZodiac];
  const male = zodiacByName[character.zodiac as ZodiacSign] ?? zodiacByCharacterId[character.id];
  const relation = heroine && male ? getRelationshipType(heroine.name, male.name) : "neutral";
  const base = {
    attraction: 58,
    trust: 54,
    communication: 54,
    tension: 42,
    hiddenPotential: 48,
  };

  if (relation === "same") {
    base.attraction += 12;
    base.trust += 8;
    base.tension += 4;
  }
  if (relation === "trine") {
    base.attraction += 14;
    base.trust += 12;
    base.communication += 8;
    base.tension -= 8;
  }
  if (relation === "sextile") {
    base.attraction += 10;
    base.communication += 12;
    base.trust += 4;
    base.tension -= 5;
  }
  if (relation === "opposition") {
    base.attraction += 16;
    base.tension += 18;
    base.hiddenPotential += 7;
    base.trust -= 4;
  }
  if (relation === "square") {
    base.attraction += 7;
    base.tension += 22;
    base.communication -= 8;
    base.hiddenPotential += 8;
  }
  if (relation === "adjacent") {
    base.trust -= 4;
    base.communication -= 8;
    base.tension += 9;
    base.hiddenPotential += 4;
  }
  if (heroine && male && positivePair(heroine.element, male.element)) {
    base.attraction += 8;
    base.trust += 5;
    base.communication += 4;
  }

  const bloodAdjusted = applyBloodType(base, bloodType);
  const score = Math.round(
    bloodAdjusted.attraction * 0.25 +
      bloodAdjusted.trust * 0.25 +
      bloodAdjusted.communication * 0.2 +
      bloodAdjusted.hiddenPotential * 0.15 +
      (100 - bloodAdjusted.tension) * 0.15
  );
  const pressure = bloodAdjusted.tension - bloodAdjusted.trust * 0.18 - bloodAdjusted.communication * 0.12;
  const difficulty = Math.max(1, Math.min(5, Math.round(pressure / 18) + 2)) as 1 | 2 | 3 | 4 | 5;

  return {
    ...bloodAdjusted,
    difficulty,
    keyword: keywordFor(relation, bloodType),
    missionHint: missionByCharacter(character, heroine, male, bloodType, relation),
    relationshipType: relation,
    score,
  };
};

export const getMissionForCharacter = (profile: PlayerProfile, character: Character) =>
  calculateCompatibility(profile.heroineZodiac, profile.heroineBloodType, character).missionHint;
