import type { Character, GameState, StatKey } from "../types";
import { getRelationshipLabel } from "../utils/gameLogic";

const statLabels: Record<StatKey, string> = {
  charm: "魅力",
  intelligence: "智慧",
  courage: "勇氣",
  kindness: "溫柔",
  social: "社交",
  mystery: "神秘感",
};

const meter = (label: string, value: number, danger = false, inverse = false) => (
  <div className={`meter ${danger ? "danger" : ""} ${inverse ? "inverse" : ""}`} key={label}>
    <span>{label}</span>
    <div><i style={{ width: `${value}%` }} /></div>
    <b>{value}</b>
  </div>
);

const composureHint = (value: number) => {
  if (value < 10) return "冷靜值崩到邊緣，他可能終於會把想念說出口。";
  if (value < 30) return "教授開始說錯話、推眼鏡、咖啡喝太快。";
  if (value < 60) return "他的理性還在，但已經很難假裝不在意。";
  return "教授看起來很冷靜，但這通常只是表面。";
};

export default function StatusPanel({ state, character }: { state: GameState; character?: Character }) {
  const routeScenes = character ? state.completedScenes.filter((scene) => scene.startsWith(`${character.id}-`)) : [];
  const isProfessor = character?.id === "capricorn";

  return (
    <aside className="status-panel">
      <h3>{state.player.name}｜{state.player.personalityType}</h3>
      <p className="player-zodiac-note">{state.player.zodiacSign}女主的星盤相性已影響初始適配度。</p>
      {Object.entries(statLabels).map(([key, label]) => meter(label, state.player[key as StatKey]))}

      {character && (
        <>
          <h3>目前路線：{character.name}</h3>
          <p className="player-zodiac-note">關係狀態：{getRelationshipLabel(character.relationshipState)}</p>
          {meter("好感度", character.affection)}
          {meter("信任度", character.trust)}
          {meter("嫉妒值", character.jealousy, character.jealousy >= 60)}
          {character.id === "leo" && meter("光環需求", character.spotlightNeed, character.spotlightNeed >= 75)}
          {character.id === "leo" && meter("脆弱展露", character.vulnerability)}
          {character.id === "leo" && meter("驕傲值", character.pride, character.pride >= 75)}
          {character.id === "leo" && meter("真實度", character.authenticity)}
          {character.id === "libra" && meter("平衡需求", character.balanceNeed, character.balanceNeed >= 75)}
          {character.id === "libra" && meter("明確選擇", character.decisiveness)}
          {character.id === "libra" && meter("偏心承認", character.biasAcceptance)}
          {character.id === "libra" && meter("社交面具", character.socialMask, character.socialMask >= 70)}
          {character.id === "scorpio" && meter("試探值", character.suspicion, character.suspicion >= 70)}
          {character.id === "scorpio" && meter("佔有恐懼", character.possessiveFear, character.possessiveFear >= 70)}
          {character.id === "scorpio" && meter("界線尊重", character.boundaryRespect)}
          {character.id === "scorpio" && meter("坦白脆弱", character.vulnerableHonesty)}
          {character.id === "sagittarius" && meter("自由需求", character.freedomNeed, character.freedomNeed >= 78)}
          {character.id === "sagittarius" && meter("承諾恐懼", character.commitmentFear, character.commitmentFear >= 70)}
          {character.id === "sagittarius" && meter("想回來", character.returnDesire)}
          {character.id === "sagittarius" && meter("距離尊重", character.distanceRespect)}
          {character.id === "taurus" && meter("穩定需求", character.stabilityNeed, character.stabilityNeed >= 75)}
          {character.id === "taurus" && meter("細膩佔有慾", character.possessiveness, character.possessiveness >= 70)}
          {character.id === "taurus" && meter("固執值", character.stubbornness, character.stubbornness >= 75)}
          {character.id === "taurus" && meter("表達心意", character.expression)}
          {character.id === "taurus" && meter("鑽牛角尖", character.overthinking, character.overthinking >= 70)}
          {character.id === "gemini" && meter("真誠度", character.honesty)}
          {character.id === "gemini" && meter("逃避值", character.avoidance, character.avoidance >= 70)}
          {character.id === "gemini" && meter("面具值", character.mask, character.mask >= 70)}
          {character.id === "gemini" && meter("被丟下恐懼", character.abandonmentFear, character.abandonmentFear >= 75)}
          {character.id === "aquarius" && meter("連結感", character.connection)}
          {character.id === "aquarius" && meter("邏輯防禦", character.logicArmor, character.logicArmor >= 70)}
          {character.id === "aquarius" && meter("疏離值", character.alienation, character.alienation >= 70)}
          {character.id === "aquarius" && meter("情緒接納度", character.emotionalAcceptance)}
          {character.id === "virgo" && meter("規則壓力", character.rulePressure, character.rulePressure >= 70)}
          {character.id === "virgo" && meter("關心表達", character.careExpression)}
          {character.id === "virgo" && meter("自我接納", character.selfCompassion)}
          {character.id === "virgo" && meter("控制感", character.control, character.control >= 70)}
          {character.id === "pisces" && meter("界線感", character.boundary)}
          {character.id === "pisces" && meter("自我覺察", character.selfAwareness)}
          {character.id === "pisces" && meter("情緒淹沒值", character.overwhelm, character.overwhelm >= 65)}
          {isProfessor && (
            <div className="professor-composure">
              {meter("冷靜值", character.professorComposure, character.professorComposure < 30, true)}
              <p>{composureHint(character.professorComposure)}</p>
            </div>
          )}
        </>
      )}

      <h3>已觸發事件</h3>
      <div className="event-list">
        {routeScenes.length ? routeScenes.map((scene) => <span key={scene}>{scene}</span>) : <span>尚未觸發主線事件</span>}
      </div>
    </aside>
  );
}
