import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { PersonalityType, ZodiacSign } from "../types";

const personalities: PersonalityType[] = ["溫柔型", "毒舌型", "直球型", "冷靜型", "社交型"];
const zodiacSigns: ZodiacSign[] = ["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"];

export default function SetupPage({
  onStart,
  onBack,
}: {
  onStart: (name: string, type: PersonalityType, zodiacSign: ZodiacSign) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState("林星澄");
  const [type, setType] = useState<PersonalityType>("溫柔型");
  const [zodiacSign, setZodiacSign] = useState<ZodiacSign>("雙魚座");

  return (
    <section className="screen">
      <button className="icon-link" onClick={onBack}><ArrowLeft size={18} />返回</button>
      <h2>建立女主角</h2>
      <label className="field-label">姓名</label>
      <input value={name} onChange={(event) => setName(event.target.value)} maxLength={10} />
      <label className="field-label">性格傾向</label>
      <div className="segmented">
        {personalities.map((item) => (
          <button key={item} className={item === type ? "active" : ""} onClick={() => setType(item)}>{item}</button>
        ))}
      </div>
      <label className="field-label">女主星座</label>
      <div className="zodiac-picker">
        {zodiacSigns.map((item) => (
          <button key={item} className={item === zodiacSign ? "active" : ""} onClick={() => setZodiacSign(item)}>{item}</button>
        ))}
      </div>
      <div className="info-panel">
        <b>星座適配</b>
        <p>女主星座會影響十二位男主的初始好感、信任與嫉妒。這不是命運判決，只是故事開始時的第一陣風。</p>
      </div>
      <button className="primary-button wide" onClick={() => onStart(name, type, zodiacSign)}>進入星盤</button>
    </section>
  );
}
