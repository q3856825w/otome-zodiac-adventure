import { BookOpen, RotateCcw, Save } from "lucide-react";
import type { Character, Ending } from "../types";

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
  return (
    <section className="screen ending-screen">
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
    </section>
  );
}
