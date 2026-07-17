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
