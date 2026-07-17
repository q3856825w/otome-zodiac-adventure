import { Music, Music2, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Character, Choice, GameState, Scene } from "../types";
import { getRelationshipLabel } from "../utils/gameLogic";
import { playChoiceSound } from "../utils/audio";
import TaskDrawer from "./TaskDrawer";

export default function StoryPage({
  state,
  scene,
  character,
  onChoice,
  onSave,
  onReset,
  musicOn,
  onToggleMusic,
}: {
  state: GameState;
  scene: Scene;
  character?: Character;
  onChoice: (choice: Choice) => void;
  onSave: () => void;
  onReset: () => void;
  musicOn: boolean;
  onToggleMusic: () => void;
}) {
  const [pressedChoice, setPressedChoice] = useState<string | null>(null);
  const maxProgress =
    character?.id === "aries" ||
    character?.id === "aquarius" ||
    character?.id === "gemini" ||
    character?.id === "pisces" ||
    character?.id === "scorpio" ||
    character?.id === "sagittarius" ||
    character?.id === "taurus" ||
    character?.id === "virgo"
      ? 10
      : character?.id === "capricorn"
        ? 9
        : 6;
  const progress = state.completedScenes.filter((id) => id.startsWith(`${character?.id}-`)).length + 1;

  const quickMetric = (label: string, value: number, className = "") => (
    <div className={`quick-meter ${className}`} key={label}>
      <div>
        <span>{label}</span>
        <b>{value}</b>
      </div>
      <i><em style={{ width: `${value}%` }} /></i>
    </div>
  );

  const choose = (choice: Choice) => {
    setPressedChoice(choice.text);
    playChoiceSound();
    window.setTimeout(() => {
      onChoice(choice);
      setPressedChoice(null);
    }, 190);
  };

  return (
    <section className="screen story-screen">
      <header className="story-top">
        <span>Day {state.player.day}</span>
        <b>{scene.location}</b>
        <button title={musicOn ? "關閉音樂" : "播放音樂"} onClick={onToggleMusic}>
          {musicOn ? <Music2 size={16} /> : <Music size={16} />}
        </button>
        <button title="存檔" onClick={onSave}><Save size={16} /></button>
        <button title="重置" onClick={onReset}><Trash2 size={16} /></button>
      </header>

      <div
        className={`portrait-zone ${character?.imageUrl ? "has-character-art" : ""}`}
        style={character?.imageUrl ? { backgroundImage: `linear-gradient(180deg, rgba(25, 23, 38, 0.1), rgba(25, 23, 38, 0.82)), url(${character.imageUrl})` } : undefined}
      >
        <div className="portrait-orbit">{character?.zodiac ?? "星座"}</div>
        <div>
          <span className="tiny-label">{character?.ageGroup === "成年後" ? "成年後篇" : "主線"} {Math.min(progress, maxProgress)} / {maxProgress}</span>
          <h2>{scene.title}</h2>
          <p>{character?.name}｜{character?.schoolRole}</p>
        </div>
      </div>

      <article className="dialogue-box">
        {scene.text.split("\n").map((line) => <p key={line}>{line}</p>)}
      </article>

      {state.lastChanges.length > 0 && (
        <div className="change-panel">
          <b>剛剛的變化</b>
          <div>
            {state.lastChanges.map((change) => <span key={change}>{change}</span>)}
          </div>
          <p>{state.log[0]}</p>
        </div>
      )}

      <div className="choice-dock">
        <div className="choices">
          {scene.choices.map((choice) => (
            <button
              className={pressedChoice === choice.text ? "choice-pressed" : ""}
              disabled={pressedChoice !== null}
              key={choice.text}
              onClick={() => choose(choice)}
            >
              {choice.text}
            </button>
          ))}
        </div>

        {character && (
          <section className="story-metrics" aria-label="目前角色數值">
            <div className="story-metrics-title">
              <span>{character.name}</span>
              <b>{getRelationshipLabel(character.relationshipState)}</b>
            </div>
            <div className="quick-meter-grid">
              {quickMetric("喜愛", character.affection)}
              {quickMetric("信任", character.trust)}
              {quickMetric("嫉妒", character.jealousy, character.jealousy >= 60 ? "danger" : "")}
              {character.id === "aries" && quickMetric("面子", character.pride, character.pride >= 75 ? "danger" : "")}
              {character.id === "aries" && quickMetric("衝動", character.impulse, character.impulse >= 75 ? "danger" : "")}
              {character.id === "aries" && quickMetric("承擔", character.accountability)}
              {character.id === "leo" && quickMetric("光環", character.spotlightNeed, character.spotlightNeed >= 75 ? "danger" : "")}
              {character.id === "leo" && quickMetric("脆弱", character.vulnerability)}
              {character.id === "leo" && quickMetric("驕傲", character.pride, character.pride >= 75 ? "danger" : "")}
              {character.id === "leo" && quickMetric("真實", character.authenticity)}
              {character.id === "libra" && quickMetric("平衡", character.balanceNeed, character.balanceNeed >= 75 ? "danger" : "")}
              {character.id === "libra" && quickMetric("明確", character.decisiveness)}
              {character.id === "libra" && quickMetric("偏心", character.biasAcceptance)}
              {character.id === "libra" && quickMetric("面具", character.socialMask, character.socialMask >= 70 ? "danger" : "")}
              {character.id === "taurus" && quickMetric("穩定", character.stabilityNeed, character.stabilityNeed >= 75 ? "danger" : "")}
              {character.id === "taurus" && quickMetric("佔有", character.possessiveness, character.possessiveness >= 70 ? "danger" : "")}
              {character.id === "taurus" && quickMetric("固執", character.stubbornness, character.stubbornness >= 75 ? "danger" : "")}
              {character.id === "taurus" && quickMetric("表達", character.expression)}
              {character.id === "taurus" && quickMetric("鑽牛角尖", character.overthinking, character.overthinking >= 70 ? "danger" : "")}
              {character.id === "gemini" && quickMetric("真誠", character.honesty)}
              {character.id === "gemini" && quickMetric("逃避", character.avoidance, character.avoidance >= 70 ? "danger" : "")}
              {character.id === "gemini" && quickMetric("面具", character.mask, character.mask >= 70 ? "danger" : "")}
              {character.id === "gemini" && quickMetric("丟下恐懼", character.abandonmentFear, character.abandonmentFear >= 75 ? "danger" : "")}
              {character.id === "aquarius" && quickMetric("連結", character.connection)}
              {character.id === "aquarius" && quickMetric("邏輯防禦", character.logicArmor, character.logicArmor >= 70 ? "danger" : "")}
              {character.id === "aquarius" && quickMetric("疏離", character.alienation, character.alienation >= 70 ? "danger" : "")}
              {character.id === "aquarius" && quickMetric("情緒接納", character.emotionalAcceptance)}
              {character.id === "virgo" && quickMetric("規則壓力", character.rulePressure, character.rulePressure >= 70 ? "danger" : "")}
              {character.id === "virgo" && quickMetric("關心表達", character.careExpression)}
              {character.id === "virgo" && quickMetric("自我接納", character.selfCompassion)}
              {character.id === "virgo" && quickMetric("控制感", character.control, character.control >= 70 ? "danger" : "")}
              {character.id === "capricorn" && quickMetric("冷靜", character.professorComposure, character.professorComposure < 30 ? "danger inverse" : "inverse")}
              {character.id === "pisces" && quickMetric("界線", character.boundary)}
              {character.id === "pisces" && quickMetric("覺察", character.selfAwareness)}
              {character.id === "pisces" && quickMetric("淹沒", character.overwhelm, character.overwhelm >= 65 ? "danger" : "")}
            </div>
          </section>
        )}
      </div>

      <TaskDrawer state={state} character={character} />
    </section>
  );
}
