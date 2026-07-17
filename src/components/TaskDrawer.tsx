import { ChevronRight, ClipboardList, X } from "lucide-react";
import { useMemo, useState } from "react";
import { routeProfiles } from "../data/routeProfiles";
import { getMissionForCharacter } from "../data/zodiac";
import type { Character, GameState } from "../types";

const meter = (label: string, value: number, danger = false) => (
  <div className={`task-mini-meter ${danger ? "danger" : ""}`} key={label}>
    <span>{label}</span>
    <i><em style={{ width: `${value}%` }} /></i>
    <b>{value}</b>
  </div>
);

const missionRow = (title: string, done: boolean, detail: string) => (
  <li className={done ? "done" : ""} key={title}>
    <span>{done ? "完成" : "進行中"}</span>
    <div>
      <b>{title}</b>
      <small>{detail}</small>
    </div>
  </li>
);

export default function TaskDrawer({ state, character }: { state: GameState; character?: Character }) {
  const [open, setOpen] = useState(false);
  const currentProfile = character ? routeProfiles[character.id] : undefined;
  const allHiddenEvents = Object.values(routeProfiles).flatMap((profile) => profile.hiddenEvents);
  const unlockedClues = allHiddenEvents.filter((event) => state.unlockedHiddenEvents.includes(event.id));
  const currentRouteScenes = character ? state.completedScenes.filter((id) => id.startsWith(`${character.id}-`)).length : 0;
  const totalEndings = state.characters.reduce((sum, item) => sum + item.endings.length, 0);
  const playerProfile = state.playerProfile ?? {
    heroineZodiac: state.player.zodiacSign,
    heroineBloodType: state.player.bloodType,
  };
  const zodiacMission = character ? getMissionForCharacter(playerProfile, character) : "選擇攻略角色後，星盤會依女主星座、血型與男主戀愛課題產生提示。";

  const missions = useMemo(() => {
    const cancerMeals = Math.min(3, state.completedScenes.filter((id) => id.startsWith("cancer-")).length);
    const sagittariusPhotos = Math.min(7, state.completedScenes.filter((id) => id.startsWith("sagittarius-")).length);
    const scorpioTruth = [
      state.player.flags.scorpio_refused_test,
      state.player.flags.scorpio_transfer_secret,
      state.player.flags.scorpio_no_more_tests,
    ].filter(Boolean).length;
    return [
      missionRow("和沈泊安一起吃過三次便當", cancerMeals >= 3, `${cancerMeals}/3 次日常陪伴`),
      missionRow("讓白衡展出《偏心》", Boolean(state.player.flags.libra_work_bias || state.player.flags.libra_clear_choice), "需要白衡路線中承認偏心"),
      missionRow("收到原野傳來的第七張照片", sagittariusPhotos >= 7, `${sagittariusPhotos}/7 張照片`),
      missionRow("沒有對夜洵說謊超過三次", scorpioTruth >= 3, `${scorpioTruth}/3 次坦白與界線選擇`),
      missionRow("解鎖任一角色 Normal Ending", state.unlockedEndings.some((id) => id.endsWith("-normal")), `${state.unlockedEndings.filter((id) => id.endsWith("-normal")).length} 個 Normal Ending`),
      missionRow("解鎖任一角色 Hidden Ending", state.unlockedEndings.some((id) => id.endsWith("-hidden")), `${state.unlockedEndings.filter((id) => id.endsWith("-hidden")).length} 個 Hidden Ending`),
    ];
  }, [state.completedScenes, state.player.flags, state.unlockedEndings]);

  return (
    <>
      <button className="task-toggle" onClick={() => setOpen(true)}>
        <ClipboardList size={16} />
        星盤任務
      </button>
      <div className={`task-scrim ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`task-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <header>
          <div>
            <span>Side Quest</span>
            <h3>星盤任務</h3>
          </div>
          <button onClick={() => setOpen(false)} aria-label="關閉任務欄"><X size={18} /></button>
        </header>

        <section>
          <h4>星盤任務</h4>
          <div className="zodiac-mission-card">
            <b>{character ? `${character.name}｜${character.zodiac}` : "尚未選擇路線"}</b>
            <p>{zodiacMission}</p>
            <small>{playerProfile.heroineZodiac} / {playerProfile.heroineBloodType} 的遊戲內相性提示</small>
          </div>
        </section>

        <section>
          <h4>隱藏任務</h4>
          <ul className="mission-list">{missions}</ul>
        </section>

        {character && (
          <section>
            <h4>目前角色</h4>
            <div className="task-character-card">
              <div>
                <b>{character.name}</b>
                <small>{character.schoolRole}</small>
              </div>
              <span>{currentRouteScenes} 章</span>
            </div>
            {meter("好感", character.affection)}
            {meter("信任", character.trust)}
            {meter("嫉妒", character.jealousy, character.jealousy >= 60)}
          </section>
        )}

        <section>
          <h4>已解鎖線索</h4>
          <div className="clue-list">
            {unlockedClues.length ? unlockedClues.map((event) => <span key={event.id}>{event.title}</span>) : <span>尚未解鎖線索</span>}
          </div>
          {currentProfile && <small>目前路線線索：{currentProfile.hiddenEvents.filter((event) => state.unlockedHiddenEvents.includes(event.id)).length}/{currentProfile.hiddenEvents.length}</small>}
        </section>

        <section>
          <h4>結局進度</h4>
          <div className="ending-progress">
            <i><em style={{ width: `${totalEndings ? (state.unlockedEndings.length / totalEndings) * 100 : 0}%` }} /></i>
            <span>{state.unlockedEndings.length}/{totalEndings}</span>
          </div>
        </section>

        <button className="drawer-close" onClick={() => setOpen(false)}>
          收合任務 <ChevronRight size={16} />
        </button>
      </aside>
    </>
  );
}
