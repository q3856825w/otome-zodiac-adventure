:root {
  color: #33253b;
  background: #1c1830;
  font-family: "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 12%, rgba(255, 223, 245, 0.34), transparent 24rem),
    radial-gradient(circle at 78% 4%, rgba(151, 220, 255, 0.28), transparent 22rem),
    linear-gradient(145deg, #24193d 0%, #59365f 46%, #f3a7b7 100%);
}

button,
input {
  font: inherit;
}

button {
  border: 0;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 14px;
}

.phone-frame {
  width: min(100%, 430px);
  min-height: calc(100vh - 28px);
  background: rgba(255, 250, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 28px;
  box-shadow: 0 24px 70px rgba(34, 18, 54, 0.45);
  overflow: hidden;
}

.screen {
  min-height: calc(100vh - 28px);
  padding: 22px;
  position: relative;
}

.home-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
}

.constellation-card {
  min-height: 320px;
  color: #fff;
  padding: 28px 22px;
  border-radius: 24px;
  background:
    radial-gradient(circle at 22% 22%, rgba(255, 255, 255, 0.9) 0 2px, transparent 3px),
    radial-gradient(circle at 72% 20%, rgba(255, 255, 255, 0.8) 0 2px, transparent 3px),
    radial-gradient(circle at 46% 56%, rgba(255, 255, 255, 0.82) 0 2px, transparent 3px),
    linear-gradient(155deg, #4e3276, #cc6f97 58%, #f7b36a);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.tiny-label,
.sparkle-note,
small {
  font-size: 12px;
  letter-spacing: 0;
  opacity: 0.82;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  font-size: 42px;
  line-height: 1.08;
  margin-bottom: 12px;
}

h2 {
  font-size: 26px;
  margin-bottom: 16px;
}

h3 {
  font-size: 17px;
  margin-bottom: 8px;
}

.menu-grid {
  display: grid;
  gap: 10px;
}

.menu-grid button,
.primary-button,
.choices button,
.card-action,
.segmented button,
.icon-link {
  min-height: 46px;
  border-radius: 12px;
  color: #4a3156;
  background: #fff;
  box-shadow: 0 8px 18px rgba(73, 43, 83, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.primary-button {
  color: #fff;
  background: linear-gradient(135deg, #de5f8f, #7453bd);
}

.wide {
  width: 100%;
}

.icon-link {
  min-height: 36px;
  padding: 0 12px;
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.72);
}

.field-label {
  display: block;
  margin: 14px 0 8px;
  font-weight: 700;
}

input {
  width: 100%;
  border: 1px solid #ead6ef;
  border-radius: 12px;
  padding: 14px;
  background: #fff;
  color: #33253b;
}

.segmented {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.segmented .active {
  color: #fff;
  background: #7453bd;
}

.zodiac-picker {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.zodiac-picker button {
  min-height: 42px;
  border-radius: 12px;
  color: #5b4268;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid #ead6ef;
  box-shadow: 0 8px 16px rgba(73, 43, 83, 0.08);
}

.zodiac-picker .active {
  color: #fff;
  background: linear-gradient(135deg, #de5f8f, #7453bd);
  border-color: transparent;
}

.info-panel,
.dialogue-box,
.status-panel,
.change-panel {
  margin: 16px 0;
  padding: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(221, 194, 232, 0.86);
}

.character-grid,
.collection-list {
  display: grid;
  gap: 12px;
}

.character-card,
.ending-card {
  position: relative;
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #efdceb;
  box-shadow: 0 8px 18px rgba(73, 43, 83, 0.1);
}

.character-thumb {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center 24%;
  border-radius: 12px;
  margin-bottom: 12px;
  border: 1px solid rgba(174, 183, 207, 0.72);
  box-shadow: inset 0 -40px 80px rgba(20, 25, 38, 0.22);
}

.character-card.adult-route {
  border-color: #aeb7cf;
  background: linear-gradient(145deg, #ffffff, #eef2f8);
}

.title-line {
  color: #24324d;
  font-weight: 800;
  font-size: 13px;
  margin-bottom: 8px;
}

.route-depth {
  margin: 12px 0;
  padding: 12px;
  border-radius: 12px;
  background: #f6f1fb;
  border: 1px solid #e6d7ef;
}

.route-depth b,
.route-arc-panel b {
  display: block;
  margin-bottom: 4px;
  color: #49305c;
  font-size: 12px;
}

.route-depth p {
  margin-bottom: 8px;
  color: #6b5873;
  font-size: 13px;
  line-height: 1.45;
}

.zodiac-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(135deg, #7453bd, #de5f8f);
  font-weight: 800;
}

.role {
  max-width: calc(100% - 60px);
  color: #7a647f;
  font-size: 14px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 10px 0;
}

.chips span,
.event-list span {
  padding: 5px 8px;
  border-radius: 999px;
  background: #f7e8f2;
  color: #6a4077;
  font-size: 12px;
}

.card-action {
  width: 100%;
  margin-top: 12px;
  background: #fff2f7;
}

.locked {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #806a86;
  font-size: 13px;
  margin-top: 12px;
}

.story-top {
  display: grid;
  grid-template-columns: auto 1fr 36px 36px 36px;
  align-items: center;
  gap: 8px;
}

.story-top button {
  height: 36px;
  border-radius: 10px;
  background: #fff;
  color: #694279;
}

.portrait-zone {
  min-height: 150px;
  margin: 18px 0;
  padding: 16px;
  border-radius: 22px;
  color: #fff;
  display: flex;
  align-items: end;
  gap: 14px;
  background:
    linear-gradient(130deg, rgba(255, 255, 255, 0.16) 0 1px, transparent 1px 16px),
    linear-gradient(135deg, #3c2d71, #d96793 60%, #efaa62);
}

.portrait-zone.has-character-art {
  min-height: 360px;
  align-items: flex-end;
  background-size: cover;
  background-position: center 24%;
  border: 1px solid rgba(174, 183, 207, 0.82);
  box-shadow: 0 14px 30px rgba(23, 28, 43, 0.22);
}

.portrait-zone.has-character-art h2,
.portrait-zone.has-character-art p,
.portrait-zone.has-character-art .tiny-label {
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.72);
}

.portrait-orbit {
  flex: 0 0 82px;
  height: 82px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.5);
  font-weight: 800;
}

.story-metrics {
  align-self: start;
  margin: 0;
  padding: 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(221, 194, 232, 0.9);
  box-shadow: 0 8px 18px rgba(73, 43, 83, 0.12);
  backdrop-filter: blur(10px);
}

.story-metrics-title {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
}

.story-metrics-title span {
  color: #49305c;
  font-weight: 900;
}

.story-metrics-title b {
  color: #8a658f;
  font-size: 12px;
}

.quick-meter-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.quick-meter-grid:has(.quick-meter:nth-child(4)) {
  grid-template-columns: repeat(2, 1fr);
}

.quick-meter {
  min-width: 0;
  padding: 8px;
  border-radius: 12px;
  background: #fff8fc;
  border: 1px solid #f0d9ea;
}

.quick-meter div {
  display: flex;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 6px;
  color: #5f456b;
  font-size: 12px;
  font-weight: 800;
}

.quick-meter b {
  color: #3f2b4e;
}

.quick-meter i {
  display: block;
  height: 7px;
  border-radius: 999px;
  overflow: hidden;
  background: #ecddeb;
}

.quick-meter em {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #de5f8f, #7453bd);
}

.quick-meter.danger em {
  background: linear-gradient(90deg, #e06a5f, #b92c56);
}

.quick-meter.inverse em {
  background: linear-gradient(90deg, #2e3b5f, #8794aa);
}

.player-zodiac-note {
  margin: -2px 0 12px;
  color: #806a86;
  font-size: 12px;
  line-height: 1.45;
}

.dialogue-box {
  font-size: 17px;
  line-height: 1.75;
}

.dialogue-box p {
  margin-bottom: 12px;
}

.choices {
  display: grid;
  gap: 10px;
}

.choice-dock {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-top: 14px;
}

.choices button {
  min-height: 58px;
  padding: 12px 14px;
  justify-content: flex-start;
  text-align: left;
  position: relative;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

.choices button:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(222, 95, 143, 0.24);
}

.choices button.choice-pressed {
  color: #fff;
  background: linear-gradient(135deg, #ff77a8, #7c59d1);
  box-shadow: 0 0 0 4px rgba(255, 182, 213, 0.55), 0 0 28px rgba(222, 95, 143, 0.66);
  transform: scale(1.02);
}

.choices button.choice-pressed::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  animation: choiceGlow 520ms ease-out;
}

@keyframes choiceGlow {
  from {
    opacity: 0.95;
    transform: scale(0.98);
  }
  to {
    opacity: 0;
    transform: scale(1.08);
  }
}

.meter {
  display: grid;
  grid-template-columns: 56px 1fr 34px;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  margin: 8px 0;
}

.meter div {
  height: 8px;
  border-radius: 999px;
  background: #ecddeb;
  overflow: hidden;
}

.meter i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #de5f8f, #7453bd);
}

.meter.danger i {
  background: linear-gradient(90deg, #e06a5f, #b92c56);
}

.meter.inverse i {
  background: linear-gradient(90deg, #2e3b5f, #8794aa);
}

.meter.inverse.danger i {
  background: linear-gradient(90deg, #b92c56, #2e3b5f);
}

.professor-composure {
  margin-top: 10px;
  padding: 10px;
  border-radius: 12px;
  background: #eef2f8;
  border: 1px solid #c9d1df;
}

.professor-composure p {
  margin: 8px 0 0;
  color: #536074;
  font-size: 12px;
  line-height: 1.45;
}

.change-panel,
.memory-panel {
  background: #fff8df;
  border-color: #efd68b;
}

.route-arc-panel {
  margin: 16px 0;
  padding: 14px;
  border-radius: 16px;
  background: #eef2f8;
  border: 1px solid #c9d1df;
}

.route-arc-panel p {
  margin-bottom: 8px;
  color: #4f5a6e;
  font-size: 13px;
  line-height: 1.55;
}

.route-arc-panel span {
  display: inline-flex;
  padding: 5px 8px;
  border-radius: 999px;
  background: #ffffff;
  color: #536074;
  font-size: 12px;
  font-weight: 800;
}

.change-panel div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;
}

.change-panel span {
  padding: 6px 9px;
  border-radius: 999px;
  color: #6d4a00;
  background: #ffe7a8;
  font-size: 13px;
  font-weight: 800;
}

.change-panel p {
  margin-bottom: 0;
  color: #7a647f;
  font-size: 13px;
}

.memory-panel {
  margin: 16px 0;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 240, 249, 0.9));
  border: 1px solid #efc8dd;
}

.memory-panel p {
  white-space: pre-line;
  margin: 10px 0 0;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.72);
  color: #5d4567;
  font-size: 13px;
  line-height: 1.55;
}

.story-side {
  display: grid;
  gap: 12px;
}

.story-side .status-panel {
  margin-bottom: 0;
}

.side-memory-panel {
  margin: 0;
  max-height: 360px;
  overflow: auto;
}

.side-memory-panel b {
  display: block;
  color: #49305c;
  margin-bottom: 8px;
}

.side-memory-panel p {
  font-size: 12px;
  line-height: 1.5;
}

.event-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.log-strip {
  margin-top: 14px;
  color: #806a86;
  font-size: 13px;
}

.ending-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ending-medal {
  width: 108px;
  height: 108px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 auto 20px;
  color: #fff;
  font-weight: 900;
  background: linear-gradient(135deg, #7453bd, #de5f8f);
}

.ending-illustration {
  width: 100%;
  max-height: 520px;
  object-fit: cover;
  object-position: center 18%;
  border-radius: 18px;
  margin: 0 0 18px;
  border: 1px solid rgba(174, 183, 207, 0.82);
  box-shadow: 0 18px 36px rgba(23, 28, 43, 0.28);
}

.ending-medal.bad {
  background: linear-gradient(135deg, #5b6470, #9c596a);
}

.ending-medal.true {
  background: linear-gradient(135deg, #1d8f9a, #7453bd, #f0a854);
}

.ending-card.seen {
  border-color: #de5f8f;
}

.collection-screen {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 241, 253, 0.94)),
    radial-gradient(circle at 50% 0%, rgba(222, 95, 143, 0.22), transparent 18rem);
}

.collection-header {
  margin-bottom: 16px;
}

.collection-header p {
  color: #6b5873;
  font-size: 14px;
  line-height: 1.6;
}

.ending-album {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.ending-collection-card {
  position: relative;
  min-width: 0;
  border-radius: 14px;
  padding: 8px;
  background: linear-gradient(145deg, #fff, #f7edf6);
  border: 1px solid rgba(222, 95, 143, 0.22);
  box-shadow: 0 10px 24px rgba(73, 43, 83, 0.12);
  overflow: hidden;
}

.ending-collection-card.unlocked {
  border-color: rgba(222, 95, 143, 0.64);
}

.ending-collection-card.true,
.ending-collection-card.hidden {
  background: linear-gradient(145deg, #ffffff, #eef2f8 48%, #fff2f7);
}

.ending-card-art {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
  overflow: hidden;
  background: #352947;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.ending-card-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
  display: block;
}

.card-back {
  height: 100%;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 10px;
  color: #fff;
  text-align: center;
  padding: 16px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0 1px, transparent 1px 14px),
    linear-gradient(145deg, #34294f, #7453bd 55%, #de5f8f);
}

.card-back span {
  font-weight: 900;
  font-size: 14px;
}

.ending-type-badge {
  position: absolute;
  left: 8px;
  bottom: 8px;
  padding: 4px 7px;
  border-radius: 999px;
  color: #fff;
  background: rgba(35, 28, 48, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.44);
  font-size: 10px;
  font-weight: 900;
}

.ending-card-copy {
  padding: 9px 2px 3px;
}

.ending-card-copy span {
  display: block;
  color: #8a658f;
  font-size: 12px;
  font-weight: 800;
}

.ending-card-copy b {
  display: block;
  margin-top: 3px;
  color: #3f2b4e;
  font-size: 14px;
  line-height: 1.3;
}

.ending-card-copy p {
  margin: 6px 0 0;
  color: #6b5873;
  font-size: 12px;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-lock {
  margin-top: 8px;
  padding: 7px 8px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #806a86;
  background: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  font-weight: 800;
}

@media (min-width: 820px) {
  .phone-frame {
    width: min(100%, 760px);
  }

  .story-screen {
    display: grid;
    grid-template-columns: 1fr 250px;
    gap: 14px;
  }

  .story-top,
  .portrait-zone,
  .dialogue-box,
  .route-arc-panel,
  .change-panel,
  .choice-dock,
  .log-strip {
    grid-column: 1;
  }

  .choice-dock {
    grid-template-columns: minmax(0, 1fr) 220px;
    align-items: start;
  }

  .choice-dock .story-metrics {
    position: sticky;
    top: 14px;
  }

  .story-side {
    grid-column: 2;
    grid-row: 1 / span 5;
    align-self: start;
    position: sticky;
    top: 14px;
  }

  .status-panel {
    margin: 0;
  }

  .character-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
