import { ArrowLeft, LockKeyhole, Sparkles } from "lucide-react";
import type { Character } from "../types";

export default function CollectionPage({
  characters,
  unlockedEndingIds,
  onBack,
}: {
  characters: Character[];
  unlockedEndingIds: string[];
  onBack: () => void;
}) {
  const endings = characters.flatMap((character) =>
    character.endings.map((ending) => ({
      ...ending,
      characterName: character.name,
      zodiac: character.zodiac,
      characterImageUrl: character.imageUrl,
    }))
  );
  const collectedCount = endings.filter((ending) => unlockedEndingIds.includes(ending.id)).length;

  return (
    <section className="screen collection-screen">
      <button className="icon-link" onClick={onBack}>
        <ArrowLeft size={18} />返回
      </button>
      <div className="collection-header">
        <span className="tiny-label">Ending Tarot Album</span>
        <h2>結局卡牌圖鑑</h2>
        <p>已收集 {collectedCount} / {endings.length}。每抵達一個結局，命運手冊就會翻開一張新的卡牌。</p>
      </div>

      <div className="ending-album">
        {endings.map((ending) => {
          const unlocked = unlockedEndingIds.includes(ending.id);
          const artUrl = ending.imageUrl ?? ending.characterImageUrl;
          return (
            <article className={`ending-collection-card ${unlocked ? "unlocked" : "locked-card"} ${ending.type}`} key={ending.id}>
              <div className="ending-card-art">
                {unlocked && artUrl ? (
                  <img src={artUrl} alt={ending.title} />
                ) : (
                  <div className="card-back">
                    <Sparkles size={24} />
                    <span>{ending.zodiac}</span>
                  </div>
                )}
                <span className="ending-type-badge">{ending.type.toUpperCase()}</span>
              </div>
              <div className="ending-card-copy">
                <span>{ending.characterName}</span>
                <b>{unlocked ? ending.title : "未解鎖結局"}</b>
                <p>{unlocked ? ending.description : ending.requirements.join(" / ")}</p>
              </div>
              {!unlocked && (
                <div className="card-lock">
                  <LockKeyhole size={15} />尚未收集
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
