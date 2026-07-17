export type PersonalityType = "溫柔型" | "毒舌型" | "直球型" | "冷靜型" | "社交型";
export type ZodiacSign =
  | "牡羊座"
  | "金牛座"
  | "雙子座"
  | "巨蟹座"
  | "獅子座"
  | "處女座"
  | "天秤座"
  | "天蠍座"
  | "射手座"
  | "摩羯座"
  | "水瓶座"
  | "雙魚座";
export type BloodType = "A型" | "B型" | "O型" | "AB型";
export type StatKey = "charm" | "intelligence" | "courage" | "kindness" | "social" | "mystery";
export type CharacterMetric =
  | "affection"
  | "trust"
  | "jealousy"
  | "professorComposure"
  | "boundary"
  | "selfAwareness"
  | "overwhelm"
  | "pride"
  | "impulse"
  | "accountability"
  | "honesty"
  | "avoidance"
  | "mask"
  | "abandonmentFear"
  | "connection"
  | "logicArmor"
  | "alienation"
  | "emotionalAcceptance"
  | "rulePressure"
  | "careExpression"
  | "selfCompassion"
  | "control"
  | "stabilityNeed"
  | "possessiveness"
  | "stubbornness"
  | "expression"
  | "overthinking"
  | "spotlightNeed"
  | "vulnerability"
  | "authenticity"
  | "balanceNeed"
  | "decisiveness"
  | "biasAcceptance"
  | "socialMask"
  | "freedomNeed"
  | "commitmentFear"
  | "returnDesire"
  | "distanceRespect"
  | "suspicion"
  | "possessiveFear"
  | "boundaryRespect"
  | "vulnerableHonesty";
export type EndingType = "bad" | "normal" | "good" | "true" | "career" | "hidden" | "solo" | "dead";
export type RelationshipState =
  | "stranger"
  | "curious"
  | "comfortable"
  | "playful"
  | "dependent"
  | "tense"
  | "misunderstanding"
  | "jealous"
  | "distant"
  | "honest"
  | "intimate"
  | "unresolved"
  | "farewell"
  | "reunion";

export interface Ending {
  id: string;
  characterId: string;
  type: EndingType;
  title: string;
  description: string;
  requirements: string[];
  imageUrl?: string;
}

export interface Character {
  id: string;
  name: string;
  zodiac: string;
  age?: string;
  ageGroup: "高中生" | "成年後";
  schoolRole: string;
  adultRole: string;
  title?: string;
  imageUrl?: string;
  personality: string;
  hiddenTrait: string;
  likes: string[];
  dislikes: string[];
  affection: number;
  trust: number;
  jealousy: number;
  professorComposure: number;
  boundary: number;
  selfAwareness: number;
  overwhelm: number;
  pride: number;
  impulse: number;
  accountability: number;
  honesty: number;
  avoidance: number;
  mask: number;
  abandonmentFear: number;
  connection: number;
  logicArmor: number;
  alienation: number;
  emotionalAcceptance: number;
  rulePressure: number;
  careExpression: number;
  selfCompassion: number;
  control: number;
  stabilityNeed: number;
  possessiveness: number;
  stubbornness: number;
  expression: number;
  overthinking: number;
  spotlightNeed: number;
  vulnerability: number;
  authenticity: number;
  balanceNeed: number;
  decisiveness: number;
  biasAcceptance: number;
  socialMask: number;
  freedomNeed: number;
  commitmentFear: number;
  returnDesire: number;
  distanceRespect: number;
  suspicion: number;
  possessiveFear: number;
  boundaryRespect: number;
  vulnerableHonesty: number;
  relationshipState: RelationshipState;
  routeUnlocked: boolean;
  endings: Ending[];
  difficulty: "★☆☆" | "★★☆" | "★★★";
  keywords: string[];
}

export interface Player {
  name: string;
  personalityType: PersonalityType;
  zodiacSign: ZodiacSign;
  bloodType: BloodType;
  charm: number;
  intelligence: number;
  courage: number;
  kindness: number;
  social: number;
  mystery: number;
  day: number;
  selectedRoute: string | null;
  flags: Record<string, boolean>;
}

export interface PlayerProfile {
  heroineZodiac: ZodiacSign;
  heroineBloodType: BloodType;
}

export interface ChoiceEffect {
  character?: Partial<Record<CharacterMetric, number>>;
  player?: Partial<Record<StatKey, number>>;
  flags?: Record<string, boolean>;
  relationshipState?: RelationshipState;
  note?: string;
}

export interface Choice {
  text: string;
  effect: ChoiceEffect;
  nextSceneId?: string;
  resultText?: string;
  requiredStats?: Partial<Record<StatKey, number>>;
  requiredFlags?: string[];
}

export interface Scene {
  id: string;
  title: string;
  location: string;
  characterId: string;
  text: string;
  choices: Choice[];
  conditions?: string[];
}

export interface GameState {
  player: Player;
  playerProfile?: PlayerProfile;
  characters: Character[];
  currentSceneId: string | null;
  currentEndingId: string | null;
  completedScenes: string[];
  unlockedEndings: string[];
  log: string[];
  lastChanges: string[];
  dialogueHistory: string[];
  unlockedHiddenEvents: string[];
}
