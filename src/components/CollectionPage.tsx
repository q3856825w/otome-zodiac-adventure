import { useState } from "react";
import { ArrowLeft, BookOpen, LockKeyhole, Sparkles, X } from "lucide-react";
import { getAllEndingReviewItems, type EndingReviewItem } from "../data/endings";
import { playChoiceSound } from "../utils/audio";
import type { Character, EndingType } from "../types";

const endingTypeLabels: Record<EndingType, string> = {
  bad: "Bad",
  normal: "Normal",
  good: "Good",
  true: "True",
  career: "Career",
  hidden: "Hidden",
  solo: "Solo",
  dead: "Dead End",
};

export default function CollectionPage({
  characters,
  unlockedEndingIds,
  onBack,
}: {
  characters: Character[];
  unlockedEndingIds: string[];
  onBack: () => void;
}) {
  const endings = getAllEndingReviewItems(characters);
  const collectedCount = endings.filter((ending) => unlockedEndingIds.includes(ending.id)).length;
  const [selectedEnding, setSelectedEnding] = useState<EndingReviewItem | null>(null);
  const [notice, setNotice] = useState("");

  const openEnding = (ending: EndingReviewItem, unlocked: boolean) => {
    if (!unlocked) {
      setNotice("這張回憶尚未解鎖");
      window.setTimeout(() => setNotice(""), 1800);
      return;
    }

    void playChoiceSound();
    setNotice("");
    setSelectedEnding(ending);
  };

  return (
    <section className="screen collection-screen memory-collection-screen">
      <div className="collection-toolbar">
        <button className="icon-link" onClick={onBack}>
          <ArrowLeft size={18} />返回首頁
        </button>
      </div>

      <div className="collection-header">
        <span className="tiny-label">Ending Memory Album</span>
        <h2>結局典藏</h2>
        <p>已收集 {collectedCount} / {endings.length}。每抵達一個結局，星盤就會點亮一張新的回憶卡。</p>
      </div>

      {notice && <div className="collection-notice" role="status">{notice}</div>}

      <div className="ending-album memory-card-grid">
        {endings.map((ending) => {
          const unlocked = unlockedEndingIds.includes(ending.id);
          return (
            <button
              type="button"
              className={`memory-ending-card ${unlocked ? "unlocked" : "locked"} ${ending.type}`}
              key={ending.id}
              onClick={() => openEnding(ending, unlocked)}
              aria-label={unlocked ? `查看結局：${ending.title}` : "未解鎖的結局"}
            >
              <div className="memory-card-art">
                {unlocked && ending.imageUrl ? (
                  <img src={ending.imageUrl} alt="" />
                ) : (
                  <div className="memory-card-back">
                    <LockKeyhole size={28} />
                    <span>未解鎖</span>
                  </div>
                )}
                <span className="ending-type-badge">{unlocked ? endingTypeLabels[ending.type] : "LOCKED"}</span>
              </div>
              <div className="memory-card-copy">
                <small>{unlocked ? ending.routeName : "命運尚未揭曉"}</small>
                <b>{unlocked ? ending.title : "？？？"}</b>
                <span>{unlocked ? "點擊查看回憶" : "尚未達成"}</span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedEnding && (
        <div className="ending-detail-backdrop" role="presentation" onClick={() => setSelectedEnding(null)}>
          <article
            className="ending-detail-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ending-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="ending-detail-close" onClick={() => setSelectedEnding(null)} aria-label="關閉">
              <X size={20} />
            </button>
            {selectedEnding.imageUrl && <img src={selectedEnding.imageUrl} alt={selectedEnding.title} />}
            <div className="ending-detail-copy">
              <span><Sparkles size={15} />{selectedEnding.routeName} · {endingTypeLabels[selectedEnding.type]}</span>
              <h3 id="ending-detail-title">{selectedEnding.title}</h3>
              <p>{selectedEnding.description}</p>
              <small><BookOpen size={14} />這段回憶已收入結局典藏</small>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
