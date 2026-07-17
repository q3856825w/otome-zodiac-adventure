import { useEffect, useRef, useState } from "react";
import { BookOpen, Heart, Music, Music2 } from "lucide-react";
import { playChoiceSound, shouldAutoStartMusic, startBgm } from "../utils/audio";

interface Props {
  onStart: () => void;
  onCharacters: () => void;
  onCollection: () => void;
  musicOn: boolean;
  onToggleMusic: () => void;
}

export default function HomePage({
  onStart,
  onCharacters,
  onCollection,
  musicOn,
  onToggleMusic,
}: Props) {
  const [isStarting, setIsStarting] = useState(false);
  const startTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (startTimer.current !== null) window.clearTimeout(startTimer.current);
  }, []);

  const handleStart = () => {
    if (isStarting) return;

    if (shouldAutoStartMusic()) void startBgm();
    void playChoiceSound();
    setIsStarting(true);
    startTimer.current = window.setTimeout(onStart, 260);
  };

  return (
    <section className="screen home-screen poster-home" aria-label="星座男友攻略手冊首頁">
      <div className="home-poster-frame">
        <img
          className="home-poster-image"
          src="/assets/home-start-screen.png"
          alt="星座男友攻略手冊主頁"
        />
        <button
          type="button"
          className="home-music-toggle"
          onClick={onToggleMusic}
          aria-label={musicOn ? "關閉背景音樂" : "開啟背景音樂"}
          title={musicOn ? "背景音樂：播放中" : "背景音樂：已靜音"}
        >
          {musicOn ? <Music2 size={17} /> : <Music size={17} />}
        </button>
        <button
          type="button"
          className={`home-start-hotspot${isStarting ? " is-starting" : ""}`}
          onClick={handleStart}
          disabled={isStarting}
          aria-label="Start new game"
        />
        <div className="home-quick-actions" aria-label="首頁選單">
          <button type="button" onClick={onCharacters}>
            <Heart size={16} />
            角色圖鑑
          </button>
          <button type="button" onClick={onCollection}>
            <BookOpen size={16} />
            結局收集
          </button>
        </div>
      </div>
    </section>
  );
}
