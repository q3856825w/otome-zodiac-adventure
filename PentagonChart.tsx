import { ArrowLeft, LockKeyhole, Sparkle } from "lucide-react";
import { routeProfiles } from "../data/routeProfiles";
import type { Character } from "../types";

export default function CharacterSelect({
  characters,
  onSelect,
  onBack,
}: {
  characters: Character[];
  onSelect?: (id: string) => void;
  onBack: () => void;
}) {
  return (
    <section className="screen">
      <button className="icon-link" onClick={onBack}><ArrowLeft size={18} />返回</button>
      <h2>選擇攻略路線</h2>
      <div className="character-grid">
        {characters.map((character) => (
          <article className={`character-card ${character.ageGroup === "成年後" ? "adult-route" : ""}`} key={character.id}>
            {character.imageUrl && (
              <img className="character-thumb" src={character.imageUrl} alt={`${character.name}角色圖`} />
            )}
            <div className="zodiac-badge">{character.zodiac.slice(0, 2)}</div>
            <h3>{character.name}</h3>
            <p className="role">{character.schoolRole}</p>
            {character.title && <p className="title-line">{character.title}｜{character.age}</p>}
            <p>{character.personality}</p>
            {routeProfiles[character.id] && (
              <div className="route-depth">
                <b>內在矛盾</b>
                <p>{routeProfiles[character.id].innerConflict}</p>
                <b>戀愛課題</b>
                <p>{routeProfiles[character.id].loveLesson}</p>
              </div>
            )}
            <div className="chips">
              <span>{character.difficulty}</span>
              <span>{character.ageGroup}</span>
              {character.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
            </div>
            <small>成年後可能職業：{character.adultRole}</small>
            {onSelect ? (
              <button className="card-action" onClick={() => onSelect(character.id)}>
                <Sparkle size={16} />{character.ageGroup === "成年後" ? "進入成年篇" : "開始攻略"}
              </button>
            ) : (
              <div className="locked"><LockKeyhole size={14} />建立女主角後可攻略</div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
