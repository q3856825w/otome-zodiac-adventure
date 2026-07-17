export type RouteProfile = {
  characterId: string;
  surfacePersona: string;
  innerConflict: string;
  growthArc: string;
  coreWound: string;
  loveLesson: string;
  branchChoices: string[];
  hiddenEvents: {
    id: string;
    title: string;
    unlockHint: string;
    text: string;
  }[];
  endingThemes: {
    bad: string;
    normal: string;
    good: string;
    true: string;
    career: string;
    hidden: string;
  };
};

const endings = {
  bad: "誤解沒有被說開，兩人錯過了最該坦白的時刻。",
  normal: "保持朋友，心動被留在校園日常裡。",
  good: "成功交往，學會用適合彼此的速度靠近。",
  true: "理解核心傷口後，命運感不再只是星盤，而是選擇。",
  career: "成年後重逢，感情成為可以並肩的力量。",
  hidden: "收集到那些不會寫進公開劇情的小秘密。",
};

export const routeProfiles: Record<string, RouteProfile> = {
  aries: {
    characterId: "aries",
    surfacePersona: "永遠第一個衝出去的籃球隊學長。",
    innerConflict: "他把害怕包進熱血裡，越受傷越想證明自己還能上場。",
    growthArc: "從只會燃燒自己，到學會把隊友與你一起放進計畫裡。",
    coreWound: "曾因一次退縮輸掉重要比賽，從此不允許自己停下。",
    loveLesson: "真正的勇敢不是硬撐，而是承認痛，然後一起面對。",
    branchChoices: ["直球並肩", "只安慰不行動", "冷處理", "尊重他但要求他檢查傷勢"],
    hiddenEvents: [
      { id: "aries-taped-wrist", title: "白色護腕", unlockHint: "好感 45 或完成第二章", text: "你發現他把護腕纏得比平常緊。夏燃笑著說沒事，卻在你低頭替他重綁時安靜下來。" },
      { id: "aries-empty-court", title: "空球場的低聲道歉", unlockHint: "信任 50 或完成第四章", text: "夜晚的球場只剩籃網晃動。他第一次承認，比起輸球，他更怕讓相信他的人失望。" },
    ],
    endingThemes: endings,
  },
  taurus: {
    characterId: "taurus",
    surfacePersona: "溫和慢熱的甜點社學長。",
    innerConflict: "他習慣用照顧代替告白，怕太快說出口會嚇跑你。",
    growthArc: "從默默準備，到學會把想要留下你的心情說清楚。",
    coreWound: "家中咖啡廳曾因承諾失信而受傷，他不相信快速的熱情。",
    loveLesson: "穩定不是沉默，陪伴也需要被說成心意。",
    branchChoices: ["記住細節", "催他表態", "珍惜食物與時間", "成年後一起經營品牌"],
    hiddenEvents: [
      { id: "taurus-dessert-card", title: "沒送出的甜點卡", unlockHint: "好感 45 或完成第二章", text: "限定甜點旁夾著一張卡，上面寫著：如果妳今天也累了，這個甜度剛好。" },
      { id: "taurus-closing-time", title: "打烊後的燈", unlockHint: "信任 50 或完成第四章", text: "咖啡廳打烊後，他留了一盞燈。那不是營業用，是等你回訊息用的。" },
    ],
    endingThemes: endings,
  },
  gemini: {
    characterId: "gemini",
    surfacePersona: "廣播社裡永遠有梗的人氣學弟。",
    innerConflict: "他太會轉移話題，所以沒人知道他真正害怕被丟下。",
    growthArc: "從把喜歡藏成玩笑，到敢在停播的空白裡說真話。",
    coreWound: "曾被重要的人用玩笑帶過離別，於是他先一步變得不認真。",
    loveLesson: "有趣不是逃跑的出口，認真也不等於失去自由。",
    branchChoices: ["跟上節奏", "要求他立刻定義關係", "用吐槽接住真心", "成年後一起做節目"],
    hiddenEvents: [
      { id: "gemini-dead-air", title: "三秒空白", unlockHint: "好感 45 或完成第二章", text: "直播裡出現三秒空白。言澈看著你，第一次忘了接梗。" },
      { id: "gemini-unused-script", title: "沒有播出的稿", unlockHint: "信任 50 或完成第四章", text: "你在稿紙背面看到一句：如果我認真，她會不會覺得無聊？" },
    ],
    endingThemes: endings,
  },
  cancer: {
    characterId: "cancer",
    surfacePersona: "像家一樣可靠的鄰家竹馬。",
    innerConflict: "他越吃醋越照顧你，因為害怕一開口就變成束縛。",
    growthArc: "從默默守在原地，到學會向你要求安全感。",
    coreWound: "太早習慣照顧別人，忘了自己也可以脆弱。",
    loveLesson: "安全感不是猜出來的，是彼此清楚給出的。",
    branchChoices: ["清楚報備心意", "把他當理所當然", "溫柔但設界線", "成年後重新定義家"],
    hiddenEvents: [
      { id: "cancer-lunchbox", title: "便當盒裡的字條", unlockHint: "好感 45 或完成第二章", text: "便當盒底有一張字條：今天也要好好吃飯。字很小，像不敢被你發現的喜歡。" },
      { id: "cancer-rain-call", title: "雨夜未接來電", unlockHint: "嫉妒 35 或完成第四章", text: "你看到三通未接來電。他只傳：雨很大，到家跟我說一聲。" },
    ],
    endingThemes: endings,
  },
  leo: {
    characterId: "leo",
    surfacePersona: "耀眼、驕傲、走到哪裡都像舞台中央。",
    innerConflict: "他害怕被看見失敗，所以把脆弱藏進更華麗的笑容。",
    growthArc: "從追求掌聲，到願意在你面前承認自己也會害怕。",
    coreWound: "從小被期待成為完美的人，失誤對他來說像失去資格。",
    loveLesson: "愛不是仰望光環，而是看見光環裂開後的人。",
    branchChoices: ["欣賞但不盲從", "只崇拜他", "在失誤後留下", "成年後一起製作舞台"],
    hiddenEvents: [
      { id: "leo-broken-spotlight", title: "壞掉的聚光燈", unlockHint: "好感 45 或完成第二章", text: "彩排時燈忽然熄滅。盛陽站在黑暗裡，聲音很低：如果沒有人看我，我還剩什麼？" },
      { id: "leo-practice-room", title: "練習室的第二遍", unlockHint: "信任 50 或完成第四章", text: "所有人離開後，他又把失誤的地方重來一遍。這次不是為掌聲，是為了不逃。" },
    ],
    endingThemes: endings,
  },
  virgo: {
    characterId: "virgo",
    surfacePersona: "理性、挑剔、嘴硬的年級第一。",
    innerConflict: "他相信規則能避免失控，卻無法用公式處理心動。",
    growthArc: "從用挑剔保持距離，到願意承認關心不是錯誤。",
    coreWound: "曾因一次小疏忽造成嚴重後果，從此對自己過度苛刻。",
    loveLesson: "努力不是為了完美，而是為了有餘裕靠近別人。",
    branchChoices: ["用行動證明", "只靠撒嬌", "冷靜分析", "成年後一起研究"],
    hiddenEvents: [
      { id: "virgo-red-pen", title: "紅筆旁的糖", unlockHint: "好感 45 或完成第二章", text: "你的講義被改得滿江紅，旁邊卻放著一顆喉糖。顧硯說是多買的，耳尖很紅。" },
      { id: "virgo-lost-answer", title: "找不到答案的題", unlockHint: "信任 50 或完成第四章", text: "他盯著白板很久，最後承認：不是所有事都有標準答案，尤其是妳。" },
    ],
    endingThemes: endings,
  },
  libra: {
    characterId: "libra",
    surfacePersona: "優雅、會社交、被很多人喜歡的美術社學長。",
    innerConflict: "他太會平衡所有人，所以總把自己的心意排到最後。",
    growthArc: "從照顧眾人的期待，到選擇自己的喜歡。",
    coreWound: "害怕拒絕別人後被討厭，於是把曖昧維持成禮貌。",
    loveLesson: "魅力不是追著誰跑，而是站穩自己的位置。",
    branchChoices: ["建立自我魅力", "情緒勒索", "坦白不安", "成年後共同策展"],
    hiddenEvents: [
      { id: "libra-unfinished-portrait", title: "沒畫完的肖像", unlockHint: "好感 45 或完成第二章", text: "畫布上只有你的眼睛被完成。白衡說還沒想好背景，其實是不敢想你會站在哪裡。" },
      { id: "libra-empty-gallery", title: "空展廳的選擇", unlockHint: "信任 50 或完成第四章", text: "他在空展廳裡問你：如果我不再討所有人喜歡，妳還會看我嗎？" },
    ],
    endingThemes: endings,
  },
  scorpio: {
    characterId: "scorpio",
    surfacePersona: "神秘、防備、像帶著秘密轉學而來。",
    innerConflict: "他想相信你，卻會本能地把試探當成保護。",
    growthArc: "從守著秘密觀察你，到願意把傷口交給你看。",
    coreWound: "曾被信任的人背叛，於是把忠誠看得近乎絕對。",
    loveLesson: "深情不是佔有，而是在界線裡仍選擇坦白。",
    branchChoices: ["尊重界線", "故意試探", "交換秘密", "成年後並肩處理真相"],
    hiddenEvents: [
      { id: "scorpio-old-badge", title: "舊校徽", unlockHint: "好感 45 或完成第二章", text: "你看見他書包深處的舊校徽。夜洵沒有搶回去，只說：不是所有過去都適合被問。" },
      { id: "scorpio-locked-roof", title: "鎖住的天台", unlockHint: "信任 50 或完成第四章", text: "天台門上有新的鎖。他把鑰匙放到你手裡，像把一部分過去也交給你。" },
    ],
    endingThemes: endings,
  },
  sagittarius: {
    characterId: "sagittarius",
    surfacePersona: "自由、開朗、像隨時會出發的旅行社團少年。",
    innerConflict: "他不是不想留下，是害怕有人因為他而等待。",
    growthArc: "從把離開當自由，到明白回來也是自己的選擇。",
    coreWound: "搬家與告別太多次，讓他不敢相信長久。",
    loveLesson: "不是抓住他，而是讓他想把遠方拍給你看。",
    branchChoices: ["一起冒險", "查勤束縛", "保持獨立", "成年後在旅途中重逢"],
    hiddenEvents: [
      { id: "sagittarius-map-mark", title: "地圖上的星號", unlockHint: "好感 45 或完成第二章", text: "他的地圖上多了一顆星號，標在學校旁邊。他說只是路線標記，卻沒有擦掉。" },
      { id: "sagittarius-airport-message", title: "尚未送出的訊息", unlockHint: "信任 50 或完成第四章", text: "訊息草稿停在：如果我走了，妳會不會希望我回來？" },
    ],
    endingThemes: endings,
  },
  capricorn: {
    characterId: "capricorn",
    surfacePersona: "冷漠、理性、距離感極強的物理教授。",
    innerConflict: "他覺得自己除了物理一無是處，越喜歡越怕你離開。",
    growthArc: "從只相信最佳解，到接受人生與感情都沒有標準答案。",
    coreWound: "年輕時因研究失敗失去重要夥伴，從此把情緒視為風險。",
    loveLesson: "依賴不是拖累，承認想念也不是失控。",
    branchChoices: ["尊重界線", "看見他的不安", "故意逗他", "成年後共同面對研究壓力"],
    hiddenEvents: [
      { id: "capricorn-note-margin", title: "實驗筆記邊角", unlockHint: "冷靜值 <= 60 或完成第三章", text: "筆記邊角寫著你的咖啡喜好、常坐的位置、最近壓力大的日期。他記得比你自己還清楚。" },
      { id: "capricorn-yesterday", title: "昨天", unlockHint: "好感 80 或完成第六章", text: "你收到一本想買很久的書，夾著便條：昨天。我不是故意不說話。" },
      { id: "capricorn-miss-you", title: "我很想妳", unlockHint: "冷靜值 <= 10 或核心選項", text: "他的冷靜終於裂開，不是生氣，而是低聲說：我很想妳。" },
    ],
    endingThemes: endings,
  },
  aquarius: {
    characterId: "aquarius",
    surfacePersona: "科學社怪才，像活在自己寫的反套路宇宙。",
    innerConflict: "他用怪保護孤獨，怕正常相處反而暴露自己很在意。",
    growthArc: "從用演算法預測戀愛，到承認心動不能被完全建模。",
    coreWound: "太常被說不合群，所以先把所有人歸類成無聊樣本。",
    loveLesson: "接受他的奇怪，也讓他學會不是所有情緒都要被解釋。",
    branchChoices: ["自由思考", "情緒勒索", "比他更會吐槽", "成年後共創 AI 專案"],
    hiddenEvents: [
      { id: "aquarius-debug-heart", title: "戀愛演算法 Debug Log", unlockHint: "好感 45 或完成第二章", text: "Log 裡寫著：她的變數太多，模型失準。結論：不是 bug，是我喜歡她。" },
      { id: "aquarius-broken-robot", title: "壞掉的小機器人", unlockHint: "信任 50 或完成第四章", text: "機器人只會重複說歡迎回來。藍祈說程式壞了，卻沒有修掉。" },
    ],
    endingThemes: endings,
  },
  pisces: {
    characterId: "pisces",
    surfacePersona: "夢幻、敏感、像從音樂室光裡走出來的少年。",
    innerConflict: "他怕夢想太不切實際，所以在別人否定前先否定自己。",
    growthArc: "從逃進幻想，到願意把夢想拆成能完成的一小步。",
    coreWound: "曾被重要的人說夢想沒有用，從此害怕被現實判死刑。",
    loveLesson: "溫柔不是縱容逃避，而是陪他把夢落地。",
    branchChoices: ["共感鼓勵", "現實打擊", "陪他練習", "成年後在舞台重逢"],
    hiddenEvents: [
      { id: "pisces-unfinished-song", title: "未完成的旋律", unlockHint: "好感 45 或完成第二章", text: "他把譜紙藏起來，卻在你離開後偷偷補上你的名字縮寫。" },
      { id: "pisces-stage-light", title: "舞台邊緣的手", unlockHint: "信任 50 或完成第四章", text: "彩排前他緊張到發抖。你伸手，他沒有逃，只把指尖放進你掌心。" },
    ],
    endingThemes: endings,
  },
};
