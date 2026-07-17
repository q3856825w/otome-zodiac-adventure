import { useEffect, useState } from "react";
import { BookOpen, RotateCcw, Save, Sparkles } from "lucide-react";
import type { Character, Ending } from "../types";
import { playRevealSound } from "../utils/audio";

export default function EndingPage({
  ending,
  character,
  unlocked,
  onSave,
  onRestart,
  onCollection,
}: {
  ending: Ending;
  character?: Character;
  unlocked: boolean;
  onSave: () => void;
  onRestart: () => void;
  onCollection: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
  }, [ending.id]);

  const handleReveal = () => {
    void playRevealSound();
    setRevealed(true);
  };

  return (
    <section className={`screen ending-screen ${revealed ? "ending-revealed" : "ending-ritual-active"}`}>
      {!revealed && (
        <div className="ending-reveal-stage">
          <button className="ending-reveal-card" onClick={handleReveal}>
            <span className="card-shine" />
            <span className="card-orbit one" />
            <span className="card-orbit two" />
            <Sparkles size={34} />
            <b>命運結局卡</b>
            <small>{character?.zodiac ?? "星盤"}正在發光</small>
            <em>點擊翻開</em>
          </button>
        </div>
      )}
      {revealed && (
        <>
      <div className={`ending-medal ${ending.type}`}>{ending.type.toUpperCase()}</div>
      {ending.imageUrl && (
        <img className="ending-illustration" src={ending.imageUrl} alt={ending.title} />
      )}
      <h2>{ending.title}</h2>
      <p>{ending.description}</p>
      <div className="info-panel">
        <b>{character?.name}的隱藏性格</b>
        <p>{character?.hiddenTrait}</p>
        <small>{unlocked ? "已解鎖圖鑑" : "尚未收藏"}</small>
      </div>
      <div className="menu-grid">
        <button onClick={onSave}><Save size={18} />存檔</button>
        <button onClick={onRestart}><RotateCcw size={18} />回到角色選擇</button>
        <button onClick={onCollection}><BookOpen size={18} />結局收集</button>
      </div>
        </>
      )}
    </section>
  );
}
