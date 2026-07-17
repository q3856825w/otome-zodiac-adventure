import { BookOpen, Heart, Play, RotateCcw, Sparkles } from "lucide-react";

interface Props {
  onStart: () => void;
  onLoad: () => void;
  onCharacters: () => void;
  onCollection: () => void;
  hasSave: boolean;
}

export default function HomePage({ onStart, onLoad, onCharacters, onCollection, hasSave }: Props) {
  return (
    <section className="screen home-screen">
      <div className="constellation-card">
        <span className="tiny-label">Otome Zodiac Adventure</span>
        <h1>星座男友攻略手冊</h1>
        <p>高二少女林星澄的校園星盤今日開局。戀愛只發生在同齡青春線，成年職業線保留給多年後番外。</p>
      </div>
      <div className="menu-grid">
        <button className="primary-button" onClick={onStart}><Play size={18} />開始遊戲</button>
        <button onClick={onLoad} disabled={!hasSave}><RotateCcw size={18} />讀取進度</button>
        <button onClick={onCharacters}><Heart size={18} />角色圖鑑</button>
        <button onClick={onCollection}><BookOpen size={18} />結局收集</button>
      </div>
      <div className="sparkle-note"><Sparkles size={16} /> 今日吐槽運：高。請謹慎選擇嘴快程度。</div>
    </section>
  );
}
