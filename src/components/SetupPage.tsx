import { ArrowLeft, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { zodiacSigns } from "../data/zodiac";
import type { BloodType, PersonalityType, PlayerProfile, ZodiacSign } from "../types";

const personalities: PersonalityType[] = ["溫柔型", "毒舌型", "直球型", "冷靜型", "社交型"];
const bloodTypes: BloodType[] = ["A型", "B型", "O型", "AB型"];

const bloodDescriptions: Record<BloodType, string> = {
  A型: "細膩、謹慎，安全感需求比較高，擅長記住小細節。",
  B型: "自由、直覺，行動力強，心動時很容易先出發再補劇本。",
  O型: "外向、直接，包容度高，攻略節奏通常推得比較順。",
  AB型: "神秘、理性，情緒反差大，看似冷靜，其實內心戲很會自己加配樂。",
};

const signDescriptions: Record<ZodiacSign, string> = {
  牡羊座: "你習慣直球破局，喜歡把心意說得明亮，但也容易太快衝進劇情核心。",
  金牛座: "你重視穩定與生活感，對日常陪伴很敏銳，也需要時間確認安全。",
  雙子座: "你反應快、會接梗，適合高節奏互動，但要小心用玩笑躲過真心。",
  巨蟹座: "你重視情緒安全，也容易把日常照顧看得比告白更重要。",
  獅子座: "你會被光芒吸引，也希望自己的存在被看見，適合明亮又真誠的路線。",
  處女座: "你擅長觀察細節，喜歡有秩序的靠近，但心動有時不照時間表走。",
  天秤座: "你重視氛圍、審美與互動平衡，容易被若即若離的曖昧牽動。",
  天蠍座: "你對深層情緒很敏銳，能讀懂防備，但也需要守住自己的界線。",
  射手座: "你喜歡遠方與可能性，適合自由感強的戀愛，但安全感要靠清楚溝通。",
  摩羯座: "你重視行動與承諾，慢熱但可靠，適合用時間證明的路線。",
  水瓶座: "你有獨特視角，不怕怪，也適合用吐槽拆掉那些太正經的防禦。",
  雙魚座: "你共感力強，容易聽見沒說出口的情緒，但也要記得先讓自己能呼吸。",
};

export default function SetupPage({
  onStart,
  onBack,
  initialProfile,
}: {
  onStart: (name: string, type: PersonalityType, zodiacSign: ZodiacSign, bloodType: BloodType) => void;
  onBack: () => void;
  initialProfile?: PlayerProfile | null;
}) {
  const [name, setName] = useState("林星澄");
  const [type, setType] = useState<PersonalityType>("溫柔型");
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign>(initialProfile?.heroineZodiac ?? "雙魚座");
  const [bloodType, setBloodType] = useState<BloodType>(initialProfile?.heroineBloodType ?? "O型");
  const nickname = name.trim() || "林星澄";

  const heroineDescription = useMemo(
    () => `${nickname}是${zodiacSign}${bloodType}女主。${signDescriptions[zodiacSign]}${bloodDescriptions[bloodType]}目前人格傾向偏${type}，戀愛雷達已啟動。`,
    [bloodType, nickname, type, zodiacSign]
  );

  return (
    <section className="screen setup-screen">
      <button className="icon-link" onClick={onBack}><ArrowLeft size={18} />返回</button>
      <div className="setup-title">
        <Sparkles size={22} />
        <div>
          <span className="tiny-label">Heroine Profile</span>
          <h2>建立女主角</h2>
        </div>
      </div>

      <label className="field-label">女主暱稱</label>
      <input value={name} onChange={(event) => setName(event.target.value)} maxLength={10} />

      <label className="field-label">性格傾向</label>
      <div className="segmented">
        {personalities.map((item) => (
          <button key={item} className={item === type ? "active" : ""} onClick={() => setType(item)}>{item}</button>
        ))}
      </div>

      <label className="field-label">女主星座</label>
      <select className="select-field" value={zodiacSign} onChange={(event) => setZodiacSign(event.target.value as ZodiacSign)}>
        {zodiacSigns.map((item) => (
          <option key={item.id} value={item.name}>{item.name}</option>
        ))}
      </select>

      <label className="field-label">女主血型</label>
      <div className="blood-picker">
        {bloodTypes.map((item) => (
          <button key={item} className={item === bloodType ? "active" : ""} onClick={() => setBloodType(item)}>{item}</button>
        ))}
      </div>

      <div className="info-panel heroine-profile">
        <b>女主角性格描述</b>
        <p>{heroineDescription}</p>
      </div>

      <button className="primary-button wide" onClick={() => onStart(nickname, type, zodiacSign, bloodType)}>
        儲存並查看星盤攻略表
      </button>
    </section>
  );
}
