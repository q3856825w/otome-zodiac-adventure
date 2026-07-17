import { ArrowLeft, Sparkle } from "lucide-react";
import { calculateCompatibility } from "../data/zodiac";
import type { BloodType, Character, ZodiacSign } from "../types";
import PentagonChart from "./PentagonChart";

const difficultyLabels = {
  1: "很好攻略",
  2: "偏好攻略",
  3: "普通",
  4: "困難",
  5: "高壓修羅場",
};

export default function ZodiacGuidePage({
  characters,
  heroineZodiac,
  heroineBloodType,
  onBack,
  onContinue,
}: {
  characters: Character[];
  heroineZodiac: ZodiacSign;
  heroineBloodType: BloodType;
  onBack: () => void;
  onContinue: () => void;
}) {
  const rows = characters.map((character) => ({
    character,
    result: calculateCompatibility(heroineZodiac, heroineBloodType, character),
  }));

  return (
    <section className="screen zodiac-guide-screen">
      <button className="icon-link" onClick={onBack}><ArrowLeft size={18} />返回設定</button>
      <div className="guide-hero">
        <span className="tiny-label">Star Route Guide</span>
        <h2>星盤攻略表</h2>
        <p>
          這是遊戲內相性系統，會依女主星座、血型與男主戀愛課題產生攻略提示。
          它不是現實占星保證，只是今天命運手冊很會遞小抄。
        </p>
        <div className="profile-pills">
          <span>{heroineZodiac}</span>
          <span>{heroineBloodType}</span>
        </div>
      </div>

      <div className="guide-grid">
        {rows.map(({ character, result }) => (
          <article className="guide-card" key={character.id}>
            <div className="guide-character-summary">
              <div className="guide-character-art">
                {character.imageUrl ? <img src={character.imageUrl} alt={`${character.name}角色小圖`} /> : <Sparkle size={24} />}
              </div>
              <div className="guide-card-copy">
                <span>{character.zodiac}</span>
                <h3>{character.name}</h3>
                <p>{character.schoolRole}</p>
                <b>攻略難易度 {result.difficulty}｜{difficultyLabels[result.difficulty]}</b>
                <em>{result.keyword}</em>
              </div>
            </div>
            <PentagonChart
              centerLabel={`${result.score}`}
              values={{
                attraction: result.attraction,
                trust: result.trust,
                communication: result.communication,
                tension: result.tension,
                hiddenPotential: result.hiddenPotential,
              }}
            />
            <div className="guide-mission">
              <Sparkle size={15} />
              <p>{result.missionHint}</p>
            </div>
          </article>
        ))}
      </div>

      <button className="primary-button wide guide-continue" onClick={onContinue}>進入角色選擇</button>
    </section>
  );
}
