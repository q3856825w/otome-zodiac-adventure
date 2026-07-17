import { characters as baseCharacters } from "../data/characters";
import { routeProfiles } from "../data/routeProfiles";
import type {
  CharacterMetric,
  BloodType,
  Choice,
  GameState,
  PersonalityType,
  Player,
  RelationshipState,
  StatKey,
  ZodiacSign,
} from "../types";
import { findNewHiddenEvents } from "./hiddenEvents";

const clamp = (value: number) => Math.max(0, Math.min(100, value));

const personalityBoosts: Record<PersonalityType, Partial<Record<StatKey, number>>> = {
  溫柔型: { kindness: 10, social: 2 },
  毒舌型: { charm: 5, mystery: 5, courage: 2 },
  直球型: { courage: 10, charm: 2 },
  冷靜型: { intelligence: 10, mystery: 2 },
  社交型: { social: 10, charm: 3 },
};

const zodiacInfo: Record<string, { sign: ZodiacSign; element: "fire" | "earth" | "air" | "water" }> = {
  aries: { sign: "牡羊座", element: "fire" },
  taurus: { sign: "金牛座", element: "earth" },
  gemini: { sign: "雙子座", element: "air" },
  cancer: { sign: "巨蟹座", element: "water" },
  leo: { sign: "獅子座", element: "fire" },
  virgo: { sign: "處女座", element: "earth" },
  libra: { sign: "天秤座", element: "air" },
  scorpio: { sign: "天蠍座", element: "water" },
  sagittarius: { sign: "射手座", element: "fire" },
  capricorn: { sign: "摩羯座", element: "earth" },
  aquarius: { sign: "水瓶座", element: "air" },
  pisces: { sign: "雙魚座", element: "water" },
};

const signToId = Object.fromEntries(Object.entries(zodiacInfo).map(([id, info]) => [info.sign, id])) as Record<ZodiacSign, string>;

const compatibilityFor = (playerSign: ZodiacSign, characterId: string) => {
  const playerInfo = zodiacInfo[signToId[playerSign]];
  const characterInfo = zodiacInfo[characterId];
  if (!playerInfo || !characterInfo) return { affection: 2, trust: 1, jealousy: 0 };
  if (playerInfo.sign === characterInfo.sign) return { affection: 8, trust: 4, jealousy: 1 };
  if (playerInfo.element === characterInfo.element) return { affection: 6, trust: 3, jealousy: 0 };
  if (new Set(["fire-air", "air-fire", "earth-water", "water-earth"]).has(`${playerInfo.element}-${characterInfo.element}`)) {
    return { affection: 4, trust: 2, jealousy: 0 };
  }
  if (new Set(["fire-water", "water-fire", "earth-air", "air-earth"]).has(`${playerInfo.element}-${characterInfo.element}`)) {
    return { affection: 1, trust: 0, jealousy: 3 };
  }
  return { affection: 2, trust: 1, jealousy: 1 };
};

const statLabels: Record<StatKey, string> = {
  charm: "魅力",
  intelligence: "智慧",
  courage: "勇氣",
  kindness: "溫柔",
  social: "社交",
  mystery: "神秘感",
};

const metricLabels: Record<CharacterMetric, string> = {
  affection: "好感度",
  trust: "信任度",
  jealousy: "嫉妒值",
  professorComposure: "教授冷靜值",
  boundary: "界線感",
  selfAwareness: "自我覺察",
  overwhelm: "情緒淹沒值",
  pride: "面子值",
  impulse: "衝動值",
  accountability: "承擔值",
  honesty: "真誠度",
  avoidance: "逃避值",
  mask: "面具值",
  abandonmentFear: "被丟下恐懼",
  connection: "連結感",
  logicArmor: "邏輯防禦",
  alienation: "疏離值",
  emotionalAcceptance: "情緒接納度",
  rulePressure: "規則壓力",
  careExpression: "關心表達",
  selfCompassion: "自我接納",
  control: "控制感",
  stabilityNeed: "穩定需求",
  possessiveness: "細膩佔有慾",
  stubbornness: "固執值",
  expression: "表達心意",
  overthinking: "鑽牛角尖",
  spotlightNeed: "光環需求",
  vulnerability: "脆弱展露",
  authenticity: "真實度",
  balanceNeed: "平衡需求",
  decisiveness: "明確選擇",
  biasAcceptance: "偏心承認",
  socialMask: "社交面具",
  freedomNeed: "自由需求",
  commitmentFear: "承諾恐懼",
  returnDesire: "想回來",
  distanceRespect: "距離尊重",
  suspicion: "試探值",
  possessiveFear: "佔有恐懼",
  boundaryRespect: "界線尊重",
  vulnerableHonesty: "坦白脆弱",
};

const relationshipLabels: Record<RelationshipState, string> = {
  stranger: "陌生",
  curious: "在意",
  comfortable: "安心",
  playful: "玩笑曖昧",
  dependent: "依賴",
  tense: "緊繃",
  misunderstanding: "誤會",
  jealous: "吃醋",
  distant: "疏遠",
  honest: "坦白",
  intimate: "深層信任",
  unresolved: "未解",
  farewell: "離別前",
  reunion: "重逢",
};

const describeDelta = (label: string, value: number) => `${label} ${value > 0 ? "+" : ""}${value}`;

export const getRelationshipLabel = (state: RelationshipState) => relationshipLabels[state];

export const createPlayer = (
  name: string,
  personalityType: PersonalityType,
  zodiacSign: ZodiacSign = "雙魚座",
  bloodType: BloodType = "O型"
): Player => {
  const base: Player = {
    name: name.trim() || "林星澄",
    personalityType,
    zodiacSign,
    bloodType,
    charm: 20,
    intelligence: 20,
    courage: 20,
    kindness: 20,
    social: 20,
    mystery: 20,
    day: 1,
    selectedRoute: null,
    flags: {},
  };

  Object.entries(personalityBoosts[personalityType]).forEach(([key, value]) => {
    base[key as StatKey] += value ?? 0;
  });

  return base;
};

export const createInitialState = (player: Player): GameState => ({
  player,
  playerProfile: {
    heroineZodiac: player.zodiacSign,
    heroineBloodType: player.bloodType,
  },
  characters: baseCharacters.map((character) => {
    const compatibility = compatibilityFor(player.zodiacSign, character.id);
    return {
      ...character,
      affection: clamp(character.affection + compatibility.affection),
      trust: clamp(character.trust + compatibility.trust),
      jealousy: clamp(character.jealousy + compatibility.jealousy),
      relationshipState: compatibility.affection >= 6 ? "curious" : "stranger",
      endings: character.endings.map((ending) => ({ ...ending })),
    };
  }),
  currentSceneId: null,
  currentEndingId: null,
  completedScenes: [],
  unlockedEndings: [],
  lastChanges: [],
  dialogueHistory: [],
  unlockedHiddenEvents: [],
  log: [`星座男友攻略手冊啟動。女主星座：${player.zodiacSign}，初始適配度已套用。`],
});

export const selectRoute = (state: GameState, characterId: string, sceneId: string): GameState => ({
  ...state,
  player: { ...state.player, selectedRoute: characterId },
  characters: state.characters.map((character) =>
    character.id === characterId ? { ...character, routeUnlocked: true } : character
  ),
  currentSceneId: sceneId,
  currentEndingId: null,
  lastChanges: [],
  dialogueHistory: [],
});

export const applyChoice = (state: GameState, choice: Choice): GameState => {
  const selectedId = state.player.selectedRoute;
  const characterName = state.characters.find((character) => character.id === selectedId)?.name ?? "他";
  const changes: string[] = [];
  const nextPlayer = {
    ...state.player,
    day: state.player.day + 1,
    flags: { ...state.player.flags, ...choice.effect.flags },
  };

  Object.entries(choice.effect.player ?? {}).forEach(([key, value]) => {
    const delta = value ?? 0;
    nextPlayer[key as StatKey] = clamp(nextPlayer[key as StatKey] + delta);
    if (delta !== 0) changes.push(describeDelta(statLabels[key as StatKey], delta));
  });

  const activeRoutes = state.characters.filter((character) => character.affection >= 35).length;
  const jealousyPressure = activeRoutes > 1 ? activeRoutes * 2 : 0;

  const nextCharacters = state.characters.map((character) => {
    if (character.id !== selectedId) {
      return activeRoutes > 1 && character.affection >= 35
        ? { ...character, jealousy: clamp(character.jealousy + jealousyPressure), relationshipState: "jealous" as const }
        : character;
    }

    const nextCharacter = { ...character };
    Object.entries(choice.effect.character ?? {}).forEach(([key, value]) => {
      const metric = key as CharacterMetric;
      const delta = value ?? 0;
      nextCharacter[metric] = clamp(nextCharacter[metric] + delta);
      if (delta !== 0) changes.push(describeDelta(metricLabels[metric], delta));
    });
    if (choice.effect.relationshipState) {
      nextCharacter.relationshipState = choice.effect.relationshipState;
      changes.push(`關係狀態：${relationshipLabels[choice.effect.relationshipState]}`);
    }
    return nextCharacter;
  });

  const completedScenes = state.currentSceneId && !state.completedScenes.includes(state.currentSceneId)
    ? [...state.completedScenes, state.currentSceneId]
    : state.completedScenes;

  const dialogueLine = choice.resultText
    ? `${state.player.name}：「${choice.text}」\n${characterName}：「${choice.resultText}」`
    : `${state.player.name}選擇了：${choice.text}`;

  const nextState: GameState = {
    ...state,
    player: nextPlayer,
    characters: nextCharacters,
    currentSceneId: choice.nextSceneId ?? null,
    completedScenes,
    lastChanges: changes,
    dialogueHistory: [dialogueLine, ...state.dialogueHistory].slice(0, 8),
    log: [choice.effect.note ?? "命運手冊翻過一頁。", ...state.log].slice(0, 8),
  };

  const newHiddenEvents = findNewHiddenEvents(nextState);
  if (!newHiddenEvents.length) return nextState;

  const hiddenLines = newHiddenEvents.map((event) => `隱藏事件解鎖：${event.title}\n${event.text}`);
  return {
    ...nextState,
    unlockedHiddenEvents: [...nextState.unlockedHiddenEvents, ...newHiddenEvents.map((event) => event.id)],
    dialogueHistory: [...hiddenLines, ...nextState.dialogueHistory].slice(0, 8),
    log: [`解鎖隱藏事件：${newHiddenEvents.map((event) => event.title).join("、")}`, ...nextState.log].slice(0, 8),
  };
};

export const resolveEnding = (state: GameState): string | null => {
  const character = state.characters.find((item) => item.id === state.player.selectedRoute);
  if (!character) return null;

  if (character.id === "capricorn") {
    if (character.trust < 35 || character.jealousy >= 85) return "capricorn-bad";
    if (routeProfiles.capricorn.hiddenEvents.every((event) => state.unlockedHiddenEvents.includes(event.id))) return "capricorn-hidden";
    if (character.affection >= 85 && character.trust >= 75 && character.professorComposure < 30 && state.player.flags.capricorn_core) {
      return "capricorn-true";
    }
    if (state.player.intelligence >= 42 && character.trust >= 65) return "capricorn-career";
    if (character.affection >= 65 && character.trust >= 45) return "capricorn-good";
    return "capricorn-normal";
  }

  if (character.id === "aries") {
    const completedAriesScenes = state.completedScenes.filter((scene) => scene.startsWith("aries-")).length;
    if (completedAriesScenes < 10) return null;
    if (
      state.player.flags.aries_first_apology &&
      character.affection >= 70 &&
      character.trust >= 65 &&
      character.accountability >= 70 &&
      character.pride <= 65 &&
      character.impulse <= 65
    ) {
      return "aries-hidden";
    }
    if (
      character.affection >= 65 &&
      character.trust >= 55 &&
      character.accountability >= 55 &&
      character.impulse < 75 &&
      character.pride < 78
    ) {
      return "aries-good";
    }
    if (character.pride >= 80 || character.impulse >= 82 || character.accountability < 25 || character.relationshipState === "dependent") {
      return "aries-bad";
    }
    return "aries-normal";
  }

  if (character.id === "taurus") {
    const completedTaurusScenes = state.completedScenes.filter((scene) => scene.startsWith("taurus-")).length;
    if (completedTaurusScenes < 10) return null;
    if (
      state.player.flags.taurus_cafe_family_event &&
      state.player.flags.taurus_dont_retreat &&
      state.player.flags.taurus_say_the_feeling &&
      character.affection >= 70 &&
      character.trust >= 65 &&
      character.expression >= 72 &&
      character.stabilityNeed >= 35 &&
      character.stabilityNeed <= 68 &&
      character.overthinking <= 45 &&
      character.possessiveness <= 55
    ) {
      return "taurus-hidden";
    }
    if (
      character.affection >= 65 &&
      character.trust >= 55 &&
      character.expression >= 55 &&
      character.stabilityNeed >= 35 &&
      character.stabilityNeed <= 75 &&
      character.overthinking < 70 &&
      character.possessiveness < 65
    ) {
      return "taurus-good";
    }
    if (
      character.affection >= 60 &&
      character.possessiveness >= 72 &&
      character.stabilityNeed >= 72 &&
      character.expression < 45 &&
      character.overthinking >= 68
    ) {
      return "taurus-bad";
    }
    if (character.relationshipState === "dependent" && character.expression < 45 && character.overthinking >= 65) return "taurus-bad";
    return "taurus-normal";
  }

  if (character.id === "cancer") {
    const completedCancerScenes = state.completedScenes.filter((scene) => scene.startsWith("cancer-")).length;
    if (completedCancerScenes < 10) return null;
    if (
      state.player.flags.cancer_clear_choice &&
      state.player.flags.cancer_i_want &&
      state.player.flags.cancer_not_taken_for_granted &&
      character.affection >= 68 &&
      character.trust >= 65 &&
      character.jealousy <= 55
    ) {
      return "cancer-hidden";
    }
    if (
      character.affection >= 64 &&
      character.trust >= 55 &&
      state.player.flags.cancer_clear_safety &&
      state.player.flags.cancer_asked_his_want &&
      character.jealousy < 68
    ) {
      return "cancer-good";
    }
    if (character.relationshipState === "dependent" || character.jealousy >= 78 || (character.affection >= 60 && character.trust < 38)) {
      return "cancer-bad";
    }
    return "cancer-normal";
  }

  if (character.id === "leo") {
    const completedLeoScenes = state.completedScenes.filter((scene) => scene.startsWith("leo-")).length;
    if (completedLeoScenes < 10) return null;
    if (
      state.player.flags.leo_family_call &&
      state.player.flags.leo_no_need_to_shine &&
      state.player.flags.leo_seen_real_self &&
      state.player.flags.leo_authentic_stage &&
      character.affection >= 70 &&
      character.trust >= 65 &&
      character.authenticity >= 72 &&
      character.vulnerability >= 70 &&
      character.spotlightNeed <= 55
    ) {
      return "leo-hidden";
    }
    if (
      character.affection >= 65 &&
      character.trust >= 55 &&
      character.authenticity >= 55 &&
      character.vulnerability >= 55 &&
      character.spotlightNeed < 72
    ) {
      return "leo-good";
    }
    if (
      character.affection >= 60 &&
      character.spotlightNeed >= 78 &&
      character.pride >= 72 &&
      character.authenticity < 45 &&
      character.vulnerability < 45
    ) {
      return "leo-bad";
    }
    if (character.relationshipState === "dependent" && character.spotlightNeed >= 70) return "leo-bad";
    return "leo-normal";
  }

  if (character.id === "libra") {
    const completedLibraScenes = state.completedScenes.filter((scene) => scene.startsWith("libra-")).length;
    if (completedLibraScenes < 10) return null;
    if (
      state.player.flags.libra_empty_gallery &&
      state.player.flags.libra_called_out_bias &&
      state.player.flags.libra_work_bias &&
      state.player.flags.libra_clear_choice &&
      character.affection >= 70 &&
      character.trust >= 65 &&
      character.decisiveness >= 70 &&
      character.biasAcceptance >= 72 &&
      character.balanceNeed <= 55 &&
      character.socialMask <= 55
    ) {
      return "libra-hidden";
    }
    if (
      character.affection >= 65 &&
      character.trust >= 55 &&
      character.decisiveness >= 55 &&
      character.biasAcceptance >= 55 &&
      character.balanceNeed < 72 &&
      character.socialMask < 70
    ) {
      return "libra-good";
    }
    if (
      character.affection >= 60 &&
      character.balanceNeed >= 78 &&
      character.socialMask >= 72 &&
      character.decisiveness < 45 &&
      character.biasAcceptance < 45
    ) {
      return "libra-bad";
    }
    if (character.relationshipState === "dependent" && character.balanceNeed >= 70) return "libra-bad";
    return "libra-normal";
  }

  if (character.id === "scorpio") {
    const completedScorpioScenes = state.completedScenes.filter((scene) => scene.startsWith("scorpio-")).length;
    if (completedScorpioScenes < 10) return null;
    if (
      state.player.flags.scorpio_transfer_secret &&
      state.player.flags.scorpio_refused_test &&
      state.player.flags.scorpio_no_more_tests &&
      character.affection >= 70 &&
      character.trust >= 65 &&
      character.boundaryRespect >= 70 &&
      character.vulnerableHonesty >= 70 &&
      character.suspicion <= 55 &&
      character.possessiveFear <= 65
    ) {
      return "scorpio-hidden";
    }
    if (
      character.affection >= 65 &&
      character.trust >= 55 &&
      character.boundaryRespect >= 55 &&
      character.vulnerableHonesty >= 55 &&
      character.suspicion < 72 &&
      character.possessiveFear < 75
    ) {
      return "scorpio-good";
    }
    if (
      character.affection >= 60 &&
      character.suspicion >= 75 &&
      character.possessiveFear >= 70 &&
      character.boundaryRespect < 45
    ) {
      return "scorpio-bad";
    }
    if (character.relationshipState === "distant" && character.suspicion >= 68) return "scorpio-bad";
    return "scorpio-normal";
  }

  if (character.id === "sagittarius") {
    const completedSagittariusScenes = state.completedScenes.filter((scene) => scene.startsWith("sagittarius-")).length;
    if (completedSagittariusScenes < 10) return null;
    if (
      state.player.flags.sagittarius_exchange_deadline &&
      state.player.flags.sagittarius_not_control_but_clear &&
      state.player.flags.sagittarius_return_is_not_cage &&
      character.affection >= 70 &&
      character.trust >= 65 &&
      character.distanceRespect >= 70 &&
      character.returnDesire >= 72 &&
      character.commitmentFear <= 55 &&
      character.freedomNeed <= 75
    ) {
      return "sagittarius-hidden";
    }
    if (
      character.affection >= 65 &&
      character.trust >= 55 &&
      character.distanceRespect >= 55 &&
      character.returnDesire >= 55 &&
      character.commitmentFear < 72
    ) {
      return "sagittarius-good";
    }
    if (
      character.affection >= 60 &&
      character.commitmentFear >= 75 &&
      character.returnDesire < 45 &&
      character.distanceRespect < 50
    ) {
      return "sagittarius-bad";
    }
    if (character.relationshipState === "distant" && character.commitmentFear >= 70) return "sagittarius-bad";
    return "sagittarius-normal";
  }

  if (character.id === "gemini") {
    const completedGeminiScenes = state.completedScenes.filter((scene) => scene.startsWith("gemini-")).length;
    if (completedGeminiScenes < 10) return null;
    if (
      state.player.flags.gemini_no_joke_confession &&
      character.affection >= 70 &&
      character.trust >= 65 &&
      character.honesty >= 70 &&
      character.avoidance <= 55 &&
      character.mask <= 55 &&
      character.abandonmentFear <= 65
    ) {
      return "gemini-hidden";
    }
    if (
      character.affection >= 65 &&
      character.trust >= 55 &&
      character.honesty >= 55 &&
      character.avoidance < 70 &&
      character.mask < 70 &&
      character.abandonmentFear < 78
    ) {
      return "gemini-good";
    }
    if (
      (character.avoidance >= 78 && character.mask >= 75) ||
      (character.abandonmentFear >= 82 && character.honesty < 45) ||
      character.relationshipState === "distant"
    ) {
      return "gemini-bad";
    }
    return "gemini-normal";
  }

  if (character.id === "aquarius") {
    const completedAquariusScenes = state.completedScenes.filter((scene) => scene.startsWith("aquarius-")).length;
    if (completedAquariusScenes < 10) return null;
    if (
      state.player.flags.aquarius_family_call &&
      state.player.flags.aquarius_sat_in_silence &&
      state.player.flags.aquarius_no_need_to_explain &&
      character.affection >= 70 &&
      character.trust >= 65 &&
      character.connection >= 70 &&
      character.logicArmor <= 45 &&
      character.emotionalAcceptance >= 70 &&
      character.alienation <= 45
    ) {
      return "aquarius-hidden";
    }
    if (
      character.affection >= 65 &&
      character.trust >= 55 &&
      character.connection >= 58 &&
      character.logicArmor <= 65 &&
      character.emotionalAcceptance >= 55 &&
      character.alienation < 70
    ) {
      return "aquarius-good";
    }
    if (
      character.affection >= 60 &&
      character.logicArmor >= 75 &&
      character.alienation >= 70 &&
      character.emotionalAcceptance < 45
    ) {
      return "aquarius-bad";
    }
    if (character.relationshipState === "distant" && character.alienation >= 65) return "aquarius-bad";
    return "aquarius-normal";
  }

  if (character.id === "virgo") {
    const completedVirgoScenes = state.completedScenes.filter((scene) => scene.startsWith("virgo-")).length;
    if (completedVirgoScenes < 10) return null;
    if (
      state.player.flags.virgo_family_call &&
      state.player.flags.virgo_not_test_paper &&
      state.player.flags.virgo_listen_first &&
      character.affection >= 70 &&
      character.trust >= 65 &&
      character.careExpression >= 68 &&
      character.selfCompassion >= 70 &&
      character.rulePressure <= 45 &&
      character.control <= 60
    ) {
      return "virgo-hidden";
    }
    if (
      character.affection >= 65 &&
      character.trust >= 55 &&
      character.careExpression >= 55 &&
      character.rulePressure <= 65 &&
      character.selfCompassion >= 55 &&
      character.control < 72
    ) {
      return "virgo-good";
    }
    if (
      character.affection >= 60 &&
      character.rulePressure >= 78 &&
      character.control >= 75 &&
      character.selfCompassion < 45
    ) {
      return "virgo-bad";
    }
    if (character.relationshipState === "dependent" && character.rulePressure >= 70 && character.control >= 70) return "virgo-bad";
    return "virgo-normal";
  }

  if (character.id === "pisces") {
    const completedPiscesScenes = state.completedScenes.filter((scene) => scene.startsWith("pisces-")).length;
    if (completedPiscesScenes < 10) return null;
    if (
      character.affection >= 70 &&
      character.trust >= 65 &&
      character.boundary >= 70 &&
      character.selfAwareness >= 70 &&
      character.overwhelm <= 60 &&
      state.player.flags.pisces_family_event &&
      state.player.flags.pisces_companion_not_rescuer
    ) {
      return "pisces-hidden";
    }
    if (
      character.affection >= 65 &&
      character.trust >= 55 &&
      character.boundary >= 50 &&
      character.selfAwareness >= 50 &&
      character.overwhelm < 75
    ) {
      return "pisces-good";
    }
    if (
      character.affection >= 65 &&
      character.overwhelm >= 70 &&
      character.boundary < 45 &&
      character.selfAwareness < 50
    ) {
      return "pisces-bad";
    }
    if (character.relationshipState === "dependent" && character.overwhelm >= 65 && character.boundary < 50) return "pisces-bad";
    return "pisces-normal";
  }

  if (character.jealousy >= 80 || character.affection < 25 || character.relationshipState === "distant") return `${character.id}-bad`;
  const profile = routeProfiles[character.id];
  if (profile?.hiddenEvents.some((event) => state.unlockedHiddenEvents.includes(event.id)) && character.trust >= 55) {
    return `${character.id}-hidden`;
  }
  if (character.affection >= 85 && character.trust >= 75 && state.player.flags[`${character.id}_core`]) {
    return `${character.id}-true`;
  }
  if (state.player.intelligence + state.player.courage >= 70 && character.trust >= 60) return `${character.id}-career`;
  if (character.affection >= 65 && character.trust >= 45 && character.jealousy < 70) return `${character.id}-good`;
  return `${character.id}-normal`;
};

export const getActiveCharacter = (state: GameState) =>
  state.characters.find((character) => character.id === state.player.selectedRoute);
