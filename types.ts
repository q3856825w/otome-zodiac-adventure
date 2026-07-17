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

select {
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
  align-items: center;
  justify-content: center;
}

.phone-frame:has(.poster-home) {
  width: min(94vw, calc((100dvh - 56px) * 1.5), 1180px);
  min-height: calc(100dvh - 28px);
  background: rgba(24, 15, 53, 0.42);
  border-color: rgba(255, 226, 255, 0.5);
  border-radius: 24px;
  overflow: visible;
}

.poster-home {
  min-height: calc(100dvh - 28px);
  padding: 14px;
}

.home-poster-frame {
  position: relative;
  width: 100%;
  margin: auto;
}

.home-poster-image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 22px 60px rgba(18, 8, 45, 0.46);
}

.home-start-hotspot {
  position: absolute;
  left: 42.5%;
  top: 68%;
  width: 15%;
  height: 24%;
  min-height: 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  box-shadow: none;
  -webkit-tap-highlight-color: transparent;
  transition: filter 180ms ease;
}

.home-start-hotspot::before {
  content: "";
  position: absolute;
  inset: 8% 1%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 238, 255, 0.18), rgba(218, 153, 255, 0.05) 55%, transparent 72%);
  box-shadow: 0 0 0 rgba(246, 182, 255, 0);
  opacity: 0;
  transition: opacity 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.home-start-hotspot:hover::before {
  opacity: 1;
  transform: scale(1.05);
  box-shadow:
    0 0 22px 8px rgba(250, 205, 255, 0.62),
    0 0 46px 18px rgba(190, 121, 255, 0.34);
}

.home-start-hotspot:focus-visible {
  outline: 2px solid #fff1ff;
  outline-offset: 4px;
}

.home-start-hotspot:disabled {
  cursor: default;
  opacity: 1;
}

.home-start-hotspot.is-starting::before {
  animation: home-start-flash 260ms ease-out;
}

.home-music-toggle {
  position: absolute;
  top: 3.2%;
  right: 2.4%;
  z-index: 3;
  width: 34px;
  height: 34px;
  min-height: 0;
  padding: 0;
  display: grid;
  place-items: center;
  color: #fff7ff;
  border: 1px solid rgba(255, 226, 255, 0.62);
  border-radius: 50%;
  background: rgba(37, 23, 75, 0.62);
  box-shadow: 0 5px 16px rgba(20, 9, 47, 0.28), inset 0 0 12px rgba(255, 225, 255, 0.12);
  backdrop-filter: blur(6px);
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

.home-music-toggle:hover {
  transform: scale(1.08);
  background: rgba(112, 55, 135, 0.78);
  box-shadow: 0 0 16px rgba(241, 173, 255, 0.58);
}

.home-quick-actions {
  position: absolute;
  left: 50%;
  bottom: 3%;
  transform: translateX(-50%);
  width: min(76%, 620px);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.home-quick-actions button {
  min-width: 0;
  min-height: 36px;
  padding: 7px 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #fff8ff;
  font-size: 12px;
  font-weight: 800;
  border: 1px solid rgba(255, 225, 255, 0.52);
  border-radius: 999px;
  background: rgba(35, 20, 72, 0.66);
  box-shadow: 0 6px 18px rgba(18, 8, 45, 0.25);
  text-shadow: 0 1px 5px rgba(16, 5, 34, 0.9);
  backdrop-filter: blur(7px);
}

.home-quick-actions button:hover:not(:disabled) {
  background: rgba(111, 57, 132, 0.82);
  box-shadow: 0 0 14px rgba(239, 172, 255, 0.55);
}

@keyframes home-start-flash {
  0% {
    opacity: 0.35;
    transform: scale(1);
  }
  45% {
    opacity: 1;
    transform: scale(1.12);
    background: radial-gradient(circle, rgba(255, 247, 255, 0.8), rgba(222, 151, 255, 0.22) 55%, transparent 74%);
    box-shadow:
      0 0 28px 12px rgba(255, 238, 255, 1),
      0 0 60px 24px rgba(211, 130, 255, 0.78);
  }
  100% {
    opacity: 0;
    transform: scale(1.03);
  }
}

@media (max-width: 600px) {
  .app-shell {
    padding: 0;
  }

  .phone-frame:has(.poster-home) {
    width: 92vw;
    min-height: 100dvh;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }

  .poster-home {
    min-height: 100dvh;
    padding: 0;
  }

  .home-quick-actions {
    bottom: 2.5%;
    width: 88%;
    gap: 4px;
  }

  .home-quick-actions button {
    min-height: 30px;
    padding: 5px 4px;
    gap: 3px;
    font-size: 10px;
  }

  .home-quick-actions svg {
    width: 12px;
    height: 12px;
  }
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

.select-field {
  width: 100%;
  border: 1px solid #ead6ef;
  border-radius: 12px;
  padding: 14px;
  color: #4a3156;
  background: #fff;
  box-shadow: 0 8px 16px rgba(73, 43, 83, 0.08);
}

.setup-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  color: #4a3156;
}

.setup-title h2 {
  margin-bottom: 0;
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

.blood-picker {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.blood-picker button {
  min-height: 42px;
  border-radius: 999px;
  color: #5b4268;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid #ead6ef;
  box-shadow: 0 8px 16px rgba(73, 43, 83, 0.08);
}

.blood-picker .active {
  color: #fff;
  background: linear-gradient(135deg, #f37aa3, #7d62c9);
  border-color: transparent;
}

.setup-screen {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 246, 252, 0.96)),
    radial-gradient(circle at 85% 10%, rgba(222, 95, 143, 0.18), transparent 12rem);
}

.heroine-profile p {
  margin: 8px 0 0;
  color: #6b5873;
  line-height: 1.65;
}

.analysis-hero {
  margin-bottom: 16px;
  padding: 20px;
  border-radius: 22px;
  color: #fff;
  background:
    radial-gradient(circle at 16% 20%, rgba(255, 255, 255, 0.72) 0 2px, transparent 3px),
    linear-gradient(135deg, #7453bd, #de5f8f 64%, #f3b275);
  box-shadow: 0 16px 32px rgba(116, 83, 189, 0.24);
}

.analysis-hero h2 {
  margin: 10px 0 8px;
}

.analysis-hero p {
  margin-bottom: 0;
  line-height: 1.65;
}

.match-grid {
  display: grid;
  gap: 10px;
  margin-bottom: 16px;
}

.match-card {
  padding: 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(239, 220, 235, 0.95);
  box-shadow: 0 8px 18px rgba(73, 43, 83, 0.1);
}

.match-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.match-card h3 {
  margin-bottom: 2px;
}

.match-card p {
  margin: 6px 0 0;
  color: #6b5873;
  font-size: 13px;
  line-height: 1.55;
}

.match-card strong {
  color: #de5f8f;
  font-size: 24px;
}

.match-card span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 6px 9px;
  border-radius: 999px;
  color: #6a4077;
  background: #fff0f7;
  font-size: 12px;
  font-weight: 800;
}

.match-bar {
  height: 8px;
  margin-top: 10px;
  border-radius: 999px;
  overflow: hidden;
  background: #ecddeb;
}

.match-bar i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff80ad, #7453bd);
}

.zodiac-guide-screen {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(255, 247, 252, 0.96)),
    radial-gradient(circle at 92% 4%, rgba(116, 83, 189, 0.18), transparent 16rem);
}

.guide-hero {
  padding: 20px;
  border-radius: 22px;
  color: #fff;
  background:
    radial-gradient(circle at 16% 20%, rgba(255, 255, 255, 0.72) 0 2px, transparent 3px),
    linear-gradient(135deg, #7453bd, #de5f8f 64%, #f3b275);
  box-shadow: 0 16px 32px rgba(116, 83, 189, 0.24);
}

.guide-hero h2 {
  margin: 8px 0;
}

.guide-hero p {
  margin-bottom: 12px;
  line-height: 1.6;
}

.profile-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.profile-pills span {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.44);
  font-weight: 900;
}

.guide-grid {
  display: grid;
  gap: 12px;
  margin: 16px 0;
}

.guide-card {
  min-width: 0;
  padding: 16px;
  border-radius: 20px;
  background:
    radial-gradient(circle at 88% 12%, rgba(255, 255, 255, 0.9) 0 1px, transparent 2px),
    linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(247, 235, 251, 0.94));
  border: 1px solid rgba(222, 190, 229, 0.92);
  box-shadow: 0 12px 28px rgba(73, 43, 83, 0.13);
}

.guide-character-summary {
  display: grid;
  grid-template-columns: 78px minmax(0, 1fr);
  gap: 13px;
  align-items: center;
}

.guide-character-art {
  width: 78px;
  height: 88px;
  display: grid;
  place-items: center;
  overflow: hidden;
  color: #86639a;
  border: 1px solid rgba(191, 145, 211, 0.68);
  border-radius: 16px;
  background:
    radial-gradient(circle at 50% 24%, rgba(255, 255, 255, 0.82), transparent 4rem),
    linear-gradient(145deg, #f7e8fb, #ded6f3);
  box-shadow: 0 6px 18px rgba(102, 65, 124, 0.15);
}

.guide-character-art img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.guide-card-copy {
  min-width: 0;
}

.guide-card-copy span {
  color: #8a658f;
  font-size: 12px;
  font-weight: 900;
}

.guide-card-copy h3 {
  margin: 2px 0;
}

.guide-card-copy p {
  margin-bottom: 7px;
  color: #6b5873;
  font-size: 13px;
}

.guide-card-copy b,
.guide-card-copy em {
  display: inline-flex;
  margin: 0 6px 6px 0;
  padding: 6px 9px;
  border-radius: 999px;
  color: #6a4077;
  background: #fff0f7;
  font-size: 12px;
  font-style: normal;
}

.guide-card-copy em {
  color: #5f5a82;
  background: #eef2ff;
}

.guide-mission {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 8px;
  align-items: start;
  margin-top: 10px;
  padding: 10px;
  border-radius: 14px;
  color: #5d4567;
  background: #fff8fc;
  border: 1px solid #f0d9ea;
  overflow-wrap: anywhere;
}

.guide-mission p {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
}

.guide-continue {
  margin-top: 4px;
}

.pentagon-chart {
  display: grid;
  place-items: center;
}

.pentagon-chart svg {
  width: min(100%, 220px);
  max-height: 190px;
}

.radar-grid {
  fill: none;
  stroke: rgba(116, 83, 189, 0.2);
  stroke-width: 1;
}

.radar-axis {
  stroke: rgba(116, 83, 189, 0.18);
  stroke-width: 1;
}

.radar-value {
  fill: rgba(222, 95, 143, 0.34);
  stroke: #de5f8f;
  stroke-width: 2;
}

.pentagon-chart circle {
  fill: rgba(255, 255, 255, 0.88);
  stroke: rgba(116, 83, 189, 0.38);
}

.pentagon-chart text {
  fill: #6a4077;
  font-size: 10px;
  font-weight: 900;
}

.pentagon-chart .radar-center {
  fill: #3f2b4e;
  font-size: 14px;
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

.task-toggle {
  position: absolute;
  right: 12px;
  top: 74px;
  z-index: 24;
  min-height: 38px;
  padding: 0 12px;
  border-radius: 999px;
  color: #fff;
  background: linear-gradient(135deg, #de5f8f, #7453bd);
  box-shadow: 0 10px 24px rgba(73, 43, 83, 0.22);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 900;
}

.task-scrim {
  position: absolute;
  inset: 0;
  z-index: 28;
  pointer-events: none;
  opacity: 0;
  background: rgba(30, 20, 42, 0.32);
  transition: opacity 180ms ease;
}

.task-scrim.open {
  pointer-events: auto;
  opacity: 1;
}

.task-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  width: min(86%, 360px);
  padding: 18px;
  overflow: auto;
  transform: translateX(104%);
  transition: transform 220ms ease;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(255, 246, 252, 0.98)),
    radial-gradient(circle at 95% 5%, rgba(222, 95, 143, 0.18), transparent 12rem);
  border-left: 1px solid rgba(239, 220, 235, 0.96);
  box-shadow: -18px 0 36px rgba(45, 24, 62, 0.22);
}

.task-drawer.open {
  transform: translateX(0);
}

.task-drawer header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.task-drawer header span {
  color: #9b6a9a;
  font-size: 12px;
  font-weight: 900;
}

.task-drawer header button,
.drawer-close {
  min-height: 36px;
  border-radius: 999px;
  color: #694279;
  background: #fff;
  box-shadow: 0 8px 18px rgba(73, 43, 83, 0.1);
}

.task-drawer section {
  margin: 0 0 14px;
  padding: 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(239, 220, 235, 0.92);
}

.zodiac-mission-card {
  padding: 12px;
  border-radius: 14px;
  background: linear-gradient(145deg, #fff8fc, #eef2ff);
  border: 1px solid rgba(222, 95, 143, 0.18);
}

.zodiac-mission-card b {
  display: block;
  color: #4a3156;
  margin-bottom: 6px;
}

.zodiac-mission-card p {
  margin: 0 0 8px;
  color: #5d4567;
  font-size: 13px;
  line-height: 1.55;
}

.task-drawer h4 {
  margin: 0 0 10px;
  color: #49305c;
}

.mission-list {
  display: grid;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.mission-list li {
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 8px;
  align-items: start;
}

.mission-list li > span {
  padding: 4px 6px;
  border-radius: 999px;
  text-align: center;
  color: #8b628b;
  background: #f4e7f2;
  font-size: 11px;
  font-weight: 900;
}

.mission-list li.done > span {
  color: #fff;
  background: linear-gradient(135deg, #de5f8f, #7453bd);
}

.mission-list b,
.task-character-card b {
  display: block;
  color: #4a3156;
  font-size: 13px;
}

.mission-list small,
.task-character-card small,
.task-drawer section > small {
  color: #806a86;
  font-size: 12px;
  line-height: 1.45;
}

.task-character-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.task-character-card span {
  flex: 0 0 auto;
  padding: 5px 8px;
  border-radius: 999px;
  color: #6a4077;
  background: #fff0f7;
  font-size: 12px;
  font-weight: 900;
}

.task-mini-meter {
  display: grid;
  grid-template-columns: 40px 1fr 30px;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
  color: #5f456b;
  font-size: 12px;
  font-weight: 800;
}

.task-mini-meter i,
.ending-progress i {
  display: block;
  height: 7px;
  border-radius: 999px;
  overflow: hidden;
  background: #ecddeb;
}

.task-mini-meter em,
.ending-progress em {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #de5f8f, #7453bd);
}

.task-mini-meter.danger em {
  background: linear-gradient(90deg, #e06a5f, #b92c56);
}

.clue-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;
}

.clue-list span {
  padding: 5px 8px;
  border-radius: 999px;
  background: #f7e8f2;
  color: #6a4077;
  font-size: 12px;
}

.ending-progress {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 10px;
  color: #694279;
  font-size: 13px;
  font-weight: 900;
}

.drawer-close {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
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

.ending-ritual-active {
  min-height: min(780px, calc(100vh - 34px));
  justify-content: center;
  background:
    radial-gradient(circle at 50% 42%, rgba(255, 219, 138, 0.28), transparent 17rem),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.32), transparent 8rem),
    linear-gradient(180deg, rgba(39, 29, 58, 0.96), rgba(93, 55, 86, 0.9));
  overflow: hidden;
}

.ending-reveal-stage {
  display: grid;
  place-items: center;
  padding: 28px 8px;
  perspective: 1100px;
}

.ending-reveal-card {
  position: relative;
  width: min(78vw, 310px);
  aspect-ratio: 9 / 14;
  border: 1px solid rgba(255, 232, 166, 0.95);
  border-radius: 22px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 12px;
  color: #fff9dd;
  background:
    linear-gradient(135deg, rgba(255, 247, 204, 0.2), transparent 26%),
    radial-gradient(circle at 50% 30%, rgba(255, 216, 120, 0.34), transparent 25%),
    linear-gradient(145deg, #2d2145, #7c466f 54%, #2a1b35);
  box-shadow:
    0 0 28px rgba(255, 216, 121, 0.66),
    0 0 76px rgba(255, 186, 73, 0.52),
    0 28px 60px rgba(28, 14, 35, 0.42);
  cursor: pointer;
  overflow: hidden;
  transform-style: preserve-3d;
  animation: ending-card-float 2.6s ease-in-out infinite, ending-card-glow 1.7s ease-in-out infinite alternate;
}

.ending-reveal-card::before,
.ending-reveal-card::after {
  content: "";
  position: absolute;
  inset: 16px;
  border: 1px solid rgba(255, 233, 175, 0.66);
  border-radius: 16px;
  pointer-events: none;
}

.ending-reveal-card::after {
  inset: 32px;
  border-color: rgba(255, 255, 255, 0.24);
}

.ending-reveal-card svg,
.ending-reveal-card b,
.ending-reveal-card small,
.ending-reveal-card em {
  position: relative;
  z-index: 2;
}

.ending-reveal-card b {
  font-size: 28px;
  letter-spacing: 0.12em;
}

.ending-reveal-card small {
  color: rgba(255, 246, 218, 0.82);
  font-weight: 800;
}

.ending-reveal-card em {
  margin-top: 16px;
  padding: 9px 18px;
  border-radius: 999px;
  color: #4b2a26;
  background: linear-gradient(135deg, #fff7ca, #f0a854);
  font-style: normal;
  font-weight: 900;
  box-shadow: 0 0 24px rgba(255, 226, 145, 0.68);
}

.card-shine {
  position: absolute;
  inset: -40%;
  background: linear-gradient(105deg, transparent 36%, rgba(255, 255, 255, 0.74) 48%, transparent 59%);
  transform: translateX(-45%) rotate(8deg);
  animation: ending-shine-sweep 2.2s ease-in-out infinite;
}

.card-orbit {
  position: absolute;
  width: 86%;
  aspect-ratio: 1;
  border: 1px solid rgba(255, 230, 170, 0.34);
  border-radius: 50%;
  pointer-events: none;
}

.card-orbit.one {
  transform: rotate(24deg) scaleY(0.38);
  animation: ending-orbit 5.6s linear infinite;
}

.card-orbit.two {
  transform: rotate(-42deg) scaleY(0.46);
  animation: ending-orbit 7.2s linear infinite reverse;
}

.ending-revealed > * {
  animation: ending-content-reveal 0.56s ease both;
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
  width: auto;
  max-width: 100%;
  max-height: min(78vh, 900px);
  object-fit: contain;
  object-position: center;
  display: block;
  border-radius: 18px;
  margin: 0 auto 18px;
  background:
    radial-gradient(circle at 50% 12%, rgba(255, 255, 255, 0.38), transparent 42%),
    linear-gradient(145deg, rgba(53, 41, 71, 0.95), rgba(247, 237, 246, 0.96));
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
  aspect-ratio: 9 / 16;
  border-radius: 10px;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 12%, rgba(255, 255, 255, 0.2), transparent 36%),
    linear-gradient(145deg, #352947, #f7edf6);
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.ending-card-art img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
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

.ending-review-meta {
  display: grid;
  gap: 6px;
  margin: 8px 0 0;
  padding: 8px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.72);
}

.ending-review-meta div {
  min-width: 0;
}

.ending-review-meta dt {
  color: #9b6a9a;
  font-size: 10px;
  font-weight: 900;
}

.ending-review-meta dd {
  margin: 2px 0 0;
  color: #4a3156;
  font-size: 11px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.ending-review-meta .asset-ready,
.ending-review-meta .asset-missing {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 900;
}

.ending-review-meta .asset-ready {
  color: #24765a;
}

.ending-review-meta .asset-missing {
  color: #9c596a;
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

.memory-collection-screen {
  background:
    radial-gradient(circle at 14% 8%, rgba(255, 187, 234, 0.34), transparent 18rem),
    radial-gradient(circle at 88% 18%, rgba(151, 132, 255, 0.3), transparent 20rem),
    radial-gradient(circle at 20% 35%, rgba(255, 255, 255, 0.8) 0 1px, transparent 2px),
    radial-gradient(circle at 76% 48%, rgba(255, 255, 255, 0.72) 0 1px, transparent 2px),
    linear-gradient(180deg, rgba(255, 251, 255, 0.97), rgba(244, 232, 252, 0.96));
}

.collection-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 16px;
}

.collection-toolbar .icon-link {
  margin: 0;
}

.collection-notice {
  position: sticky;
  top: 10px;
  z-index: 5;
  width: fit-content;
  margin: 0 auto 12px;
  padding: 9px 16px;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  border: 1px solid rgba(255, 230, 255, 0.72);
  border-radius: 999px;
  background: rgba(65, 39, 101, 0.9);
  box-shadow: 0 8px 24px rgba(64, 34, 88, 0.28);
}

.memory-collection-screen .collection-header {
  position: relative;
  margin-bottom: 22px;
  padding: 20px 22px;
  overflow: hidden;
  border: 1px solid rgba(232, 196, 235, 0.78);
  border-radius: 22px;
  background:
    radial-gradient(circle at 88% 28%, rgba(255, 255, 255, 0.92) 0 2px, transparent 3px),
    radial-gradient(circle at 77% 64%, rgba(255, 255, 255, 0.82) 0 1px, transparent 2px),
    linear-gradient(135deg, rgba(255, 249, 255, 0.88), rgba(233, 211, 246, 0.8));
  box-shadow: 0 12px 30px rgba(91, 57, 108, 0.13);
}

.memory-collection-screen .collection-header h2 {
  margin: 6px 0 8px;
  color: #563366;
  font-family: Georgia, "Noto Serif TC", serif;
  font-size: clamp(25px, 5vw, 34px);
  letter-spacing: 0.1em;
  text-shadow: 0 2px 12px rgba(188, 108, 180, 0.16);
}

.memory-collection-screen .collection-header p {
  max-width: 560px;
  margin: 0;
  color: #77617d;
  line-height: 1.7;
}

.memory-card-grid {
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  align-items: stretch;
  gap: 18px;
}

.memory-ending-card {
  position: relative;
  min-width: 0;
  height: 100%;
  padding: 9px;
  display: grid;
  grid-template-rows: auto 1fr;
  text-align: left;
  border: 1px solid rgba(223, 177, 226, 0.78);
  border-radius: 20px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.97), rgba(247, 230, 250, 0.95));
  box-shadow: 0 10px 24px rgba(67, 39, 84, 0.13);
  overflow: hidden;
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
}

.memory-ending-card.unlocked {
  border-color: rgba(225, 119, 185, 0.72);
  background: linear-gradient(145deg, #fff, #fbeafa 72%, #eee3ff);
  box-shadow:
    0 12px 26px rgba(106, 59, 130, 0.2),
    0 0 14px rgba(238, 154, 219, 0.16);
}

.memory-ending-card.unlocked:hover {
  transform: translateY(-5px) scale(1.025);
  box-shadow:
    0 18px 34px rgba(106, 59, 130, 0.28),
    0 0 24px rgba(236, 133, 214, 0.46);
}

.memory-ending-card.locked {
  border-color: rgba(177, 151, 197, 0.72);
  background:
    radial-gradient(circle at 16% 12%, rgba(255, 255, 255, 0.85) 0 1px, transparent 2px),
    radial-gradient(circle at 84% 22%, rgba(255, 255, 255, 0.7) 0 1px, transparent 2px),
    linear-gradient(145deg, rgba(245, 239, 249, 0.98), rgba(220, 207, 231, 0.96));
  box-shadow:
    0 10px 24px rgba(67, 52, 82, 0.14),
    inset 0 0 24px rgba(255, 255, 255, 0.28);
}

.memory-ending-card.locked:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 26px rgba(62, 50, 69, 0.18);
}

.memory-card-art {
  position: relative;
  aspect-ratio: 4 / 3;
  border: 1px solid rgba(255, 255, 255, 0.66);
  border-radius: 14px;
  overflow: hidden;
  background: #312542;
}

.memory-card-art img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
}

.memory-card-back {
  position: relative;
  height: 100%;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 8px;
  color: rgba(255, 249, 255, 0.88);
  background:
    radial-gradient(circle at 50% 50%, transparent 0 27%, rgba(240, 213, 255, 0.22) 28% 29%, transparent 30% 40%, rgba(240, 213, 255, 0.14) 41% 42%, transparent 43%),
    radial-gradient(circle at 22% 24%, rgba(255, 255, 255, 0.85) 0 1px, transparent 2px),
    radial-gradient(circle at 78% 66%, rgba(255, 255, 255, 0.72) 0 1px, transparent 2px),
    linear-gradient(145deg, #4b405f, #81738e 52%, #615370);
}

.memory-card-back::before,
.memory-card-back::after {
  content: "✦";
  position: absolute;
  color: rgba(255, 235, 255, 0.62);
  font-size: 12px;
  text-shadow: 0 0 8px rgba(240, 199, 255, 0.7);
}

.memory-card-back::before {
  top: 16%;
  left: 18%;
}

.memory-card-back::after {
  right: 18%;
  bottom: 17%;
}

.memory-card-back svg {
  width: 22px;
  height: 22px;
  padding: 4px;
  border: 1px solid rgba(255, 238, 255, 0.48);
  border-radius: 50%;
  filter: drop-shadow(0 0 8px rgba(242, 203, 255, 0.6));
}

.memory-card-back span {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.memory-card-copy {
  display: grid;
  grid-template-rows: auto minmax(38px, auto) auto;
  align-content: start;
  gap: 5px;
  min-height: 92px;
  padding: 11px 5px 5px;
}

.memory-card-copy small,
.memory-card-copy span {
  color: #89718d;
  font-size: 10px;
}

.memory-card-copy b {
  display: flex;
  align-items: center;
  color: #4a3156;
  font-size: 14px;
  line-height: 1.4;
}

.memory-ending-card.locked .memory-card-copy b {
  color: #6b5a73;
  letter-spacing: 0.16em;
}

.memory-ending-card.locked .memory-card-copy span {
  color: #8b7d91;
}

.ending-detail-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  padding: 20px;
  display: grid;
  place-items: center;
  background: rgba(24, 14, 38, 0.72);
  backdrop-filter: blur(8px);
}

.ending-detail-dialog {
  position: relative;
  width: min(92vw, 480px);
  max-height: 88vh;
  overflow: auto;
  border: 1px solid rgba(255, 222, 248, 0.8);
  border-radius: 24px;
  background: linear-gradient(160deg, #fffaff, #f1e1f5);
  box-shadow:
    0 26px 70px rgba(15, 7, 28, 0.52),
    0 0 30px rgba(221, 132, 218, 0.3);
}

.ending-detail-dialog > img {
  display: block;
  width: 100%;
  max-height: 58vh;
  object-fit: contain;
  background: #271c3a;
}

.ending-detail-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  background: rgba(35, 20, 66, 0.76);
}

.ending-detail-copy {
  padding: 20px;
}

.ending-detail-copy > span,
.ending-detail-copy small {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #9d6298;
  font-size: 12px;
  font-weight: 800;
}

.ending-detail-copy h3 {
  margin: 8px 0;
  color: #4a3156;
  font-size: 22px;
}

.ending-detail-copy p {
  color: #66546c;
  line-height: 1.7;
}

@media (min-width: 820px) {
  .phone-frame {
    width: min(100%, 680px);
  }

  .story-screen {
    display: grid;
    grid-template-columns: 1fr;
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

  .status-panel {
    margin: 0;
  }

  .character-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 819px) {
  .task-toggle {
    position: fixed;
    right: 18px;
    bottom: 18px;
    top: auto;
  }

  .task-drawer {
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-height: 82vh;
    border-left: 0;
    border-top: 1px solid rgba(239, 220, 235, 0.96);
    border-radius: 24px 24px 0 0;
    transform: translateY(104%);
    box-shadow: 0 -18px 36px rgba(45, 24, 62, 0.22);
  }

  .task-drawer.open {
    transform: translateY(0);
  }

  .blood-picker {
    grid-template-columns: repeat(2, 1fr);
  }

  .ending-album {
    grid-template-columns: 1fr;
  }

  .memory-card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 11px;
  }

  .memory-ending-card {
    padding: 7px;
    border-radius: 16px;
  }

  .memory-card-copy {
    min-height: 86px;
    padding-top: 9px;
  }

  .guide-card {
    padding: 12px;
  }

  .guide-character-summary {
    grid-template-columns: 60px minmax(0, 1fr);
    gap: 10px;
  }

  .guide-character-art {
    width: 60px;
    height: 68px;
    border-radius: 13px;
  }
}

@keyframes ending-card-float {
  0%,
  100% {
    transform: translateY(0) rotateX(0deg) rotateZ(-0.4deg);
  }
  50% {
    transform: translateY(-10px) rotateX(5deg) rotateZ(0.6deg);
  }
}

@keyframes ending-card-glow {
  from {
    filter: brightness(1);
  }
  to {
    filter: brightness(1.12);
  }
}

@keyframes ending-shine-sweep {
  0% {
    transform: translateX(-60%) rotate(8deg);
    opacity: 0;
  }
  35% {
    opacity: 0.9;
  }
  70%,
  100% {
    transform: translateX(60%) rotate(8deg);
    opacity: 0;
  }
}

@keyframes ending-orbit {
  to {
    rotate: 360deg;
  }
}

@keyframes ending-content-reveal {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
