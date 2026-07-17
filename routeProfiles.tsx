import { Music, Music2, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { routeProfiles } from "../data/routeProfiles";
import type { Character, Choice, GameState, Scene } from "../types";
import { getRelationshipLabel } from "../utils/gameLogic";
import { playChoiceSound, startBgm, stopBgm } from "../utils/audio";
import StatusPanel from "./StatusPanel";

export default function StoryPage({
  state,
  scene,
  character,
  onChoice,
  onSave,
  onReset,
}: {
  state: GameState;
  scene: Scene;
  character?: Character;
  onChoice: (choice: Choice) => void;
  onSave: () => void;
  onReset: () => void;
}) {
  const [musicOn, setMusicOn] = useState(false);
  const [pressedChoice, setPressedChoice] = useState<string | null>(null);
  const maxProgress = character?.id === "capricorn" ? 9 : 6;
  const progress = state.completedScenes.filter((id) => id.startsWith(`${character?.id}-`)).length + 1;
  const profile = character ? routeProfiles[character.id] : undefined;
  const hiddenCount = profile
    ? profile.hiddenEvents.filter((event) => state.unlockedHiddenEvents.includes(event.id)).length
    : 0;

  const quickMetric = (label: string, value: number, className = "") => (
    <div className={`quick-meter ${className}`} key={label}>
      <div>
        <span>{label}</span>
        <b>{value}</b>
      </div>
      <i><em style={{ width: `${value}%` }} /></i>
    </div>
  );

  useEffect(() => () => stopBgm(), []);

  const toggleMusic = async () => {
    if (musicOn) {
      stopBgm();
      setMusicOn(false);
      return;
    }
    await startBgm();
    setMusicOn(true);
  };

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
        <button title={musicOn ? "關閉音樂" : "播放音樂"} onClick={toggleMusic}>
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

      {profile && (
        <div className="route-arc-panel">
          <b>路線成長弧</b>
          <p>{profile.growthArc}</p>
          <span>隱藏事件 {hiddenCount} / {profile.hiddenEvents.length}</span>
        </div>
      )}

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
              {character.id === "capricorn" && quickMetric("冷靜", character.professorComposure, character.professorComposure < 30 ? "danger inverse" : "inverse")}
            </div>
          </section>
        )}
      </div>

      <aside className="story-side">
        <StatusPanel state={state} character={character} />
        {state.dialogueHistory.length > 0 && (
          <div className="memory-panel side-memory-panel">
            <b>最近對話</b>
            {state.dialogueHistory.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}
      </aside>
    </section>
  );
}
