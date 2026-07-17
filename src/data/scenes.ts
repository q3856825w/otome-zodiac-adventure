import type { Choice, ChoiceEffect, RelationshipState, Scene } from "../types";

type RouteStory = {
  id: string;
  name: string;
  sign: string;
  firstLocation: string;
  motif: string;
  object: string;
  daily: string;
  chapterHook: string;
  conflict: string;
  vulnerable: string;
  coreLine: string;
  futureLine: string;
  bestTone: "direct" | "gentle" | "witty" | "calm" | "space";
};

type Tone = "direct" | "gentle" | "witty" | "calm" | "space";

const routeStories: RouteStory[] = [
  { id: "aries", name: "夏燃", sign: "牡羊座", firstLocation: "放學後的籃球場", motif: "撞進夕陽的籃球", object: "白色護腕", daily: "他每天都說只是順路送你到校門口，但每次都剛好走在車道外側。", chapterHook: "校內賽前，你看見他偷偷按住手腕。", conflict: "比賽受傷後，他仍想上場，像只要停下就會輸掉全部。", vulnerable: "他承認自己不是不痛，是害怕一旦示弱，大家就不再相信他。", coreLine: "你可以想贏，但不能把自己當成燃料。", futureLine: "多年後，他把創業簡報改到凌晨，仍會等你一句『先吃飯』。", bestTone: "direct" },
  { id: "taurus", name: "陸雨田", sign: "金牛座", firstLocation: "咖啡廳後門", motif: "慢慢融化的奶油香", object: "限定甜點卡", daily: "他不太說想你，只會把你喜歡的座位留在窗邊。", chapterHook: "甜點社試作那天，他做了一份沒有放進菜單的蛋糕。", conflict: "你聽見有人說他太慢熱，他把圍裙摺好，笑得像沒聽見。", vulnerable: "他其實怕自己的喜歡太笨重，會變成你的負擔。", coreLine: "我不需要你立刻告白，但我想知道你有沒有把我放進明天。", futureLine: "多年後，咖啡廳新品牌的第一款甜點仍以你的生日命名。", bestTone: "gentle" },
  { id: "gemini", name: "言澈", sign: "雙子座", firstLocation: "廣播社錄音間", motif: "突然安靜的耳機", object: "沒播出的稿", daily: "他每天都能把你逗笑，卻總在你認真看他時轉開話題。", chapterHook: "午休廣播突然點名你，整個班級都開始起鬨。", conflict: "有人說他對誰都曖昧，他笑著接梗，卻把稿紙揉皺了。", vulnerable: "他說自己不花心，只是不敢讓任何人看見他真的在等。", coreLine: "你可以用玩笑開場，但不能用玩笑逃走。", futureLine: "多年後，他的節目第一集嘉賓是你，標題叫《我終於認真了》。", bestTone: "witty" },
  { id: "cancer", name: "沈泊安", sign: "巨蟹座", firstLocation: "你家樓下的便利商店", motif: "雨傘邊緣的距離", object: "便當盒", daily: "他記得你所有小習慣，卻不敢問自己在你心裡是不是也有位置。", chapterHook: "你開始認識其他男主後，他照常等你放學，只是話變少了。", conflict: "你晚回訊息，他說沒關係，隔天卻把便當做得比平常更豐盛。", vulnerable: "他低聲說，自己最怕的不是你拒絕，而是你根本沒發現他在難過。", coreLine: "我會給你安全感，但你也要告訴我，你不是只把我當家人。", futureLine: "多年後，他仍會在你加班時傳訊息：到家跟我說一聲。", bestTone: "gentle" },
  { id: "leo", name: "盛陽", sign: "獅子座", firstLocation: "學生會舞台彩排", motif: "聚光燈下的裂痕", object: "金色校徽", daily: "他總能把場面撐得漂亮，連失落都像排練過。", chapterHook: "校慶演出前，他邀你看彩排，像邀你見證一場勝利。", conflict: "正式演出時音響失誤，他站在台上，第一次沒有立刻笑出來。", vulnerable: "他問你，如果有一天他不耀眼了，你還會不會站在這裡。", coreLine: "我喜歡你的光，也喜歡燈熄掉以後還站著的你。", futureLine: "多年後，他製作的舞台會留一個最好的位置給你。", bestTone: "direct" },
  { id: "virgo", name: "顧硯", sign: "處女座", firstLocation: "圖書館靠窗座位", motif: "紅筆劃過的空白", object: "紅筆與喉糖", daily: "他嘴上嫌你粗心，卻會把你漏掉的重點整理成索引。", chapterHook: "期中考前，他主動留下來幫你補習，語氣像審判。", conflict: "你看見他因一次小錯把自己逼到凌晨，連呼吸都像在計算。", vulnerable: "他說如果不完美，事情就會失控；如果失控，就會有人受傷。", coreLine: "你可以嚴格，但不能把自己判成永遠有罪。", futureLine: "多年後，他在研究室仍會把你的筆記放在最順手的位置。", bestTone: "calm" },
  { id: "libra", name: "白衡", sign: "天秤座", firstLocation: "美術社午後畫室", motif: "未完成的肖像", object: "沾著紫色顏料的筆", daily: "他對每個人都溫柔，卻只有看你時會忘了回答別人的邀約。", chapterHook: "你成為他的模特兒，畫布上卻遲遲沒有背景。", conflict: "太多人喜歡他，你開始不安，他也因為不想傷人而沒有劃清界線。", vulnerable: "他承認自己一直在做最漂亮的選擇，卻不知道哪個才是真心。", coreLine: "不要只追著我跑，站在你自己的光裡，我才找得到你。", futureLine: "多年後，你們共同策展，展名叫《選擇》。", bestTone: "space" },
  { id: "scorpio", name: "夜洵", sign: "天蠍座", firstLocation: "轉學生空座位旁", motif: "鎖住的天台門", object: "舊校徽", daily: "他出現得很安靜，卻總能在你需要時剛好站在附近。", chapterHook: "你撿到他的舊校徽，他看見時眼神瞬間冷下來。", conflict: "有人提起他的轉學原因，他要求你不要問，氣氛像被鎖住。", vulnerable: "他說自己不是不想相信你，只是信任一旦碎過，就會割手。", coreLine: "我不會偷看你的秘密，但我也不會用謊言靠近你。", futureLine: "多年後，他把最難的案子交給你看，像交出最後一道防線。", bestTone: "space" },
  { id: "sagittarius", name: "原野", sign: "射手座", firstLocation: "旅行社團活動室", motif: "地圖上的星號", object: "相機記憶卡", daily: "他每天都有新的遠方要說，卻開始把校園角落也拍進相簿。", chapterHook: "他告訴你，畢業後可能會出國，語氣輕得像只是換座位。", conflict: "你忍不住問他會不會回來，他笑著說自由的人不做保證。", vulnerable: "他其實很怕有人等他，因為那會讓每一次離開都像背叛。", coreLine: "我不抓住你，但我希望你想回來時，知道我在。", futureLine: "多年後，你收到一張明信片：這次不是路過，是回程。", bestTone: "space" },
  { id: "aquarius", name: "藍祈", sign: "水瓶座", firstLocation: "科學社實驗桌", motif: "失準的戀愛演算法", object: "小型晶片", daily: "他把喜歡說成資料異常，把偷看說成觀測誤差。", chapterHook: "他做出星座戀愛演算法，第一個測試對象竟然是你。", conflict: "演算法給出高適配率，他卻立刻說模型需要重寫。", vulnerable: "他說自己太奇怪，正常人靠近一下就會發現不好玩。", coreLine: "我喜歡你的奇怪，也喜歡你不再用公式假裝沒感覺。", futureLine: "多年後，你們共同開發的 AI 仍保留一個彩蛋：心動不可預測。", bestTone: "witty" },
  { id: "pisces", name: "霧島凜", sign: "雙魚座", firstLocation: "音樂社練習室", motif: "未完成的旋律", object: "皺掉的譜紙", daily: "他把夢想說得很輕，像怕聲音太大就會碎掉。", chapterHook: "你聽見他在空教室彈琴，旋律在最溫柔的地方停住。", conflict: "有人說他的夢想不切實際，他笑著說自己只是玩玩。", vulnerable: "他承認自己不敢認真，因為認真以後被否定會很痛。", coreLine: "我會陪你做夢，也會陪你把第一步寫進行事曆。", futureLine: "多年後，他在舞台謝幕時看向你，像終於抵達現實的夢。", bestTone: "gentle" },
];

const toneLabel: Record<Tone, string> = {
  direct: "直球",
  gentle: "溫柔",
  witty: "吐槽",
  calm: "冷靜",
  space: "留白",
};

const toneState: Record<Tone, RelationshipState> = {
  direct: "honest",
  gentle: "comfortable",
  witty: "playful",
  calm: "curious",
  space: "unresolved",
};

const effect = (
  character: ChoiceEffect["character"],
  player: ChoiceEffect["player"],
  note: string,
  relationshipState?: RelationshipState,
  flags?: Record<string, boolean>
): ChoiceEffect => ({ character, player, note, relationshipState, flags });

const branchId = (id: string, stage: number, tone: Tone) => `${id}-${stage}-${tone}`;
const nextScene = (id: string, stage: number, tone: Tone) => (stage < 5 ? branchId(id, stage + 1, tone) : undefined);

const chapterTitles = ["日常初遇", "興趣堆疊", "情緒變化", "衝突裂縫", "核心傷口", "告白分歧"];
const chapterLocations = ["校門與走廊", "社團與午休", "放學後", "雨天校園", "夜晚教室", "命運星盤下"];

const chapterText = (route: RouteStory, stage: number, tone: Tone) => {
  const toneIntro = stage === 0 ? "" : `上一個選擇讓你們的距離帶著「${toneLabel[tone]}」的餘溫。\n\n`;
  const chapters = [
    `${route.firstLocation}，你第一次真正注意到${route.name}。\n\n${route.motif}像命運手冊翻開的第一頁。你以為這只是普通的一天，直到他抬眼看向你，彷彿早就知道你會出現在這裡。\n\n${route.daily}`,
    `${toneIntro}${route.chapterHook}\n\n這不是大事件，卻讓你開始在日常裡反覆遇見他：便利商店、社團教室、放學後的樓梯轉角。每一次短暫對話，都像在星盤上點亮一顆小星。`,
    `${toneIntro}你們的關係不再只是偶遇。\n\n${route.daily}\n\n他開始記住你的回答，你也開始分辨他表面性格底下真正的情緒。好感不是突然發生的，而是一次次被接住的小事。`,
    `${toneIntro}${route.conflict}\n\n這一次，選錯話不只是少一點好感，而可能改變他願不願意把真相交給你。空氣沉下來，命運感第一次有了重量。`,
    `${toneIntro}${route.vulnerable}\n\n他沒有立刻看你，像是說完這句話就會失去防守。你終於明白，攻略不是選最甜的答案，而是看懂他最害怕的地方。`,
    `${toneIntro}最後的分歧來到你面前。\n\n${route.coreLine}\n\n${route.object}被放在你們之間，像這條路線一路累積的證據。你知道，接下來的回答會決定你們只是心動、錯過，還是真的走進彼此的核心。`,
  ];
  return chapters[stage];
};

const choicesFor = (route: RouteStory, stage: number): Choice[] => {
  if (stage === 5) {
    return [
      {
        text: `核心理解：${route.coreLine}`,
        nextSceneId: undefined,
        resultText: "他沉默很久，終於露出不是防備、也不是表演的表情。",
        effect: effect(
          { affection: 18, trust: 18, jealousy: -8 },
          { courage: 3, kindness: 3 },
          "你選中了他的核心價值觀。命運手冊的字跡微微發亮。",
          "intimate",
          { [`${route.id}_core`]: true }
        ),
      },
      {
        text: "把話說得很浪漫，但避開真正的問題。",
        nextSceneId: undefined,
        resultText: "他笑了笑，卻把最深的那一部分重新收回去。",
        effect: effect({ affection: 8, trust: -4, jealousy: 4 }, { charm: 2 }, "浪漫讓氣氛變甜，卻沒有真正解開他的傷口。", "unresolved"),
      },
      {
        text: "先退一步，讓彼此都保留空間。",
        nextSceneId: undefined,
        resultText: "他點頭，像鬆了一口氣，又像有一點遺憾。",
        effect: effect({ affection: 4, trust: 8, jealousy: -3 }, { mystery: 2 }, "你們沒有立刻抵達答案，但至少沒有把彼此推遠。", "farewell"),
      },
    ];
  }

  return [
    {
      text: "直球回應：把你真正看到的情緒說出來。",
      nextSceneId: nextScene(route.id, stage, "direct"),
      resultText: route.bestTone === "direct" ? "他像被你點燃，眼神亮得藏不住。" : "他有些措手不及，但沒有逃開。",
      effect: effect(
        { affection: route.bestTone === "direct" ? 12 : 7, trust: 5, jealousy: 1 },
        { courage: 3 },
        "直球讓關係前進得很快，也讓彼此更難假裝沒事。",
        toneState.direct
      ),
    },
    {
      text: "溫柔陪伴：不急著逼問，只讓他知道你在。",
      nextSceneId: nextScene(route.id, stage, "gentle"),
      resultText: route.bestTone === "gentle" ? "他的防備慢慢放低，聲音也變柔了。" : "他沒有立刻回答，但情緒安定了一點。",
      effect: effect(
        { affection: route.bestTone === "gentle" ? 12 : 8, trust: 8 },
        { kindness: 3 },
        "溫柔增加信任，但推進速度較慢。",
        toneState.gentle
      ),
    },
    {
      text: "幽默吐槽：把沉重的氣氛敲出一道縫。",
      nextSceneId: nextScene(route.id, stage, "witty"),
      resultText: route.bestTone === "witty" ? "他笑出聲，像終於遇到聽得懂他頻率的人。" : "氣氛被你救回來，但有些真心也被暫時帶過。",
      effect: effect(
        { affection: route.bestTone === "witty" ? 12 : 6, trust: 3, jealousy: 1 },
        { charm: 2, social: 2 },
        "吐槽很有回饋感，但過度使用可能讓深層問題延後爆發。",
        toneState.witty
      ),
    },
    {
      text: "冷靜留白：先判斷局勢，不越過他的界線。",
      nextSceneId: nextScene(route.id, stage, route.bestTone === "space" ? "space" : "calm"),
      resultText: route.bestTone === "space" || route.bestTone === "calm" ? "他看向你，像是第一次確認你真的懂分寸。" : "你保住了界線，但心動的溫度稍微降了一點。",
      effect: effect(
        { affection: route.bestTone === "space" || route.bestTone === "calm" ? 10 : 4, trust: 10, jealousy: -2 },
        { intelligence: 2, mystery: 2 },
        "保持距離不等於冷漠。有些角色會因此更願意信任你。",
        route.bestTone === "space" ? toneState.space : toneState.calm
      ),
    },
  ];
};

const ariesChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 9 ? `aries-${stage + 1}-start` : undefined,
  resultText,
});

const ariesStages = [
  {
    title: "第一聲哨音",
    location: "放學後的籃球場",
    text:
      "夕陽把球場照得像一面橘色旗幟。夏燃在三分線外搶球，明明只是練習賽，卻像全校的命運都壓在他肩上。\n\n球砸到籃框彈開，他直接衝進人群補籃，膝蓋重重擦過地面。\n\n旁邊的人喊：『夏燃，你膝蓋流血了！』\n\n他只咧嘴：『小傷。輸了才比較痛。』\n\n你第一次明白，他的勇敢好像不是選擇，而是一種不准自己退後的習慣。",
  },
  {
    title: "嘴硬的傷口",
    location: "體育館走廊",
    text:
      "你把消毒棉遞給他，他卻像看到考卷一樣皺眉。\n\n『不用，這種程度自己會好。』\n\n可他伸手拿水瓶時，指節明顯停了一下。疼痛露出一秒，又被他硬生生收回去。\n\n他看起來像太陽，其實更像一根被點燃的火柴，亮得過頭，也燙得太快。",
  },
  {
    title: "替朋友出頭",
    location: "一年級教室外",
    text:
      "午休時，夏燃聽見有人嘲笑隊友失誤。他連便當都沒放下，直接站起來。\n\n『有本事你上場試試。』\n\n氣氛瞬間變硬。那個隊友拉住他，小聲說算了，但夏燃反而更火。\n\n他不是不懂後果，只是從小被教會：有人受欺負，就要第一個衝出去。",
  },
  {
    title: "說錯話的午後",
    location: "福利社前",
    text:
      "你提醒他剛才語氣太兇，他脫口而出：『那不然我要裝沒看見嗎？』\n\n話一出口，他自己也怔住。你沒有說話，空氣卻比吵架更安靜。\n\n他抓了抓頭髮，眼神躲開：『我不是那個意思。』\n\n可是那句真正的道歉，卡在他的喉嚨裡，像比賽最後一秒沒投出的球。",
  },
  {
    title: "被背叛的義氣",
    location: "舊器材室",
    text:
      "你無意間聽見他和前隊友爭執。原來曾經有人把責任推給他，讓他背了違規訓練的黑鍋。\n\n那個人說：『反正你不是最講義氣嗎？』\n\n夏燃笑了一下，笑意卻沒有到眼底。\n\n『對啊，所以我活該。』\n\n他把義氣穿成盔甲，也把背叛藏在盔甲裡。",
  },
  {
    title: "家裡的規矩",
    location: "便利商店外",
    text:
      "晚上你撞見他接家裡電話。\n\n電話那頭的聲音很嚴：『男孩子受點傷算什麼？你是學長，要帶好大家。不要讓人擔心。』\n\n夏燃低著頭，一直說知道了。\n\n掛掉後，他把手機塞進口袋，笑得很用力：『我家就這樣，沒什麼。』\n\n可是你看見他指尖在發抖。",
  },
  {
    title: "不能退的比賽",
    location: "校際賽前夕",
    text:
      "比賽前一天，隊醫建議他休息。他的膝蓋還沒好，硬上可能會傷得更久。\n\n隊友看著他，觀眾也看著他。所有期待都像燈光一樣落在他身上。\n\n夏燃把護膝拉緊：『我不上，誰上？』\n\n他不是想逞英雄。他只是太害怕，一停下來就會被看見自己其實也會怕。",
  },
  {
    title: "衝突爆發",
    location: "雨後操場",
    text:
      "他真的上場了，也真的再次摔倒。比賽結束後，你忍不住和他吵了起來。\n\n『你到底有沒有想過自己？』\n\n夏燃紅著眼眶，聲音比雨還急：『我退了，他們怎麼辦？妳要我當逃兵嗎？』\n\n他把受傷聽成指責，把關心聽成否定。你們第一次站在彼此對面，像隔著一整片球場。",
  },
  {
    title: "第一個低頭的人",
    location: "空教室",
    text:
      "隔天，他坐在空教室最後一排。桌上放著沒拆的藥布，旁邊是一張寫了一半又揉掉的紙。\n\n上面只有幾個字：『對不起，我昨天……』\n\n他看見你，立刻想把紙藏起來。\n\n『別看。超丟臉。』\n\n但這一次，他沒有跑走。",
  },
  {
    title: "最後一球",
    location: "黃昏球場",
    text:
      "復健後的第一場練習，他沒有第一個衝出去，而是在場邊確認每個人的位置。\n\n隊友問他：『學長，你今天不搶第一球？』\n\n夏燃看向你，像在確認自己真的可以慢一點。\n\n球落到他手裡。這一次，最後一球不是投向籃框，而是投向他想成為的人。",
  },
];

const ariesChoices = (stage: number): Choice[] => {
  const sets: Choice[][] = [
    [
      ariesChoice(0, "直接喊他停下來處理傷口：逞強不是加分題。", effect({ affection: 7, trust: 8, pride: 8, impulse: -4, accountability: 4 }, { courage: 3 }, "你沒有順著他的熱血，而是把現實放到他面前。", "tense"), "妳管得有點多。但……我聽見了。"),
      ariesChoice(0, "跟著替他歡呼，讓他先把這場練習打完。", effect({ affection: 12, trust: 3, pride: 10, impulse: 8, accountability: -2 }, { charm: 2, social: 2 }, "你讓他覺得被支持，但也加深了不能退的信念。", "playful"), "看到沒？我就說我可以。"),
      ariesChoice(0, "把水和藥放在場邊，不逼他，只說結束後我等你。", effect({ affection: 9, trust: 10, pride: -2, impulse: -3, accountability: 5 }, { kindness: 2, mystery: 1 }, "你沒有拆他的台，卻留下能照顧自己的出口。", "comfortable"), "……那妳別先走。"),
    ],
    [
      ariesChoice(1, "吐槽他：你膝蓋不是熱血漫畫道具。", effect({ affection: 10, trust: 5, pride: 3, impulse: -5, accountability: 5 }, { charm: 3 }, "幽默讓他卸下一點防備，但他還是嘴硬。", "playful"), "誰說不是？主角都這樣。好啦，棉花給我。"),
      ariesChoice(1, "溫柔幫他消毒，什麼都不問。", effect({ affection: 12, trust: 7, pride: -3, impulse: 2, accountability: -1 }, { kindness: 3 }, "他被照顧得很安心，卻沒有真正面對問題。", "comfortable"), "妳動作輕一點。不是痛，是酒精太冷。"),
      ariesChoice(1, "要他自己處理傷口，並在旁邊看著。", effect({ affection: 5, trust: 12, pride: -6, impulse: -6, accountability: 12 }, { courage: 2, intelligence: 1 }, "你把責任還給他，他不習慣，卻開始學。", "honest"), "自己來就自己來。這有什麼難……嘶。"),
    ],
    [
      ariesChoice(2, "站到他旁邊，和他一起替隊友說話。", effect({ affection: 13, trust: 5, pride: 8, impulse: 7, accountability: 2 }, { courage: 3, social: 1 }, "你們像同一陣火，但火勢也更難控制。", "playful"), "夠義氣！我就知道妳懂。"),
      ariesChoice(2, "拉住他的手腕，小聲提醒：保護人不一定要吵贏。", effect({ affection: 8, trust: 13, pride: -4, impulse: -10, accountability: 8 }, { kindness: 2, courage: 2 }, "你沒有否定他的義氣，只是讓它有了方向。", "honest"), "……我知道他們很過分。但我可以先閉嘴三秒。最多三秒。"),
      ariesChoice(2, "先安撫隊友，再請夏燃陪你離開現場。", effect({ affection: 6, trust: 10, pride: -2, impulse: -8, accountability: 10 }, { social: 3 }, "你讓被保護的人也能說話，而不是讓夏燃替所有人決定。", "comfortable"), "原來先問他本人也可以。好，我剛剛太急。"),
    ],
    [
      ariesChoice(3, "立刻反擊：你說話真的很傷人。", effect({ affection: -2, trust: 8, pride: 10, impulse: 5, accountability: 8 }, { courage: 4 }, "直接讓他痛，也讓他第一次意識到自己的話會傷人。", "tense"), "我不是故意的！……可我知道妳不是在亂說。"),
      ariesChoice(3, "裝作沒事，替他把氣氛圓回來。", effect({ affection: 9, trust: -3, pride: 6, impulse: 2, accountability: -6 }, { social: 3 }, "表面和平了，但他失去練習道歉的機會。", "unresolved"), "妳人真好。剛剛那句，忘掉吧。"),
      ariesChoice(3, "說：你可以慢一點講，我願意聽你重新說一次。", effect({ affection: 10, trust: 14, pride: -6, impulse: -5, accountability: 12 }, { kindness: 2, courage: 2 }, "你給他補救的機會，而不是替他補救。", "honest"), "我……剛剛講錯了。不是那個意思。"),
    ],
    [
      ariesChoice(4, "陪他一起罵前隊友，讓他把怒氣說出來。", effect({ affection: 12, trust: 6, pride: 6, impulse: 10, accountability: -2 }, { kindness: 2 }, "宣洩讓他痛快，卻也讓傷口繼續用憤怒包住。", "playful"), "對吧？超爛。可我還是覺得自己很蠢。"),
      ariesChoice(4, "問他：你氣的是他背叛，還是氣自己當時沒有說不？", effect({ affection: 5, trust: 15, pride: -8, impulse: -6, accountability: 15 }, { intelligence: 3, courage: 2 }, "這句話很刺，但把問題推到真正的位置。", "honest"), "……都有。最氣的是我還想裝沒事。"),
      ariesChoice(4, "先不分析，只把門關上，讓他不用在別人面前逞強。", effect({ affection: 10, trust: 13, pride: -6, impulse: -3, accountability: 6 }, { kindness: 3, mystery: 1 }, "你替他的脆弱留了空間。", "comfortable"), "謝了。我剛剛差點又笑出來裝沒事。"),
    ],
    [
      ariesChoice(5, "告訴他：你不用每次都像家裡期待的那樣勇敢。", effect({ affection: 10, trust: 14, pride: -10, impulse: -4, accountability: 8 }, { kindness: 3, courage: 2 }, "你拆開了勇敢和不能哭之間的綁定。", "honest"), "如果我真的不勇敢，他們會不會很失望？"),
      ariesChoice(5, "開玩笑轉移氣氛，說至少你保溫杯比他爸溫柔。", effect({ affection: 9, trust: 4, pride: 2, impulse: -2, accountability: -1 }, { charm: 3 }, "他笑了，但核心壓力仍留在原地。", "playful"), "妳這吐槽角度也太怪。可是有用。"),
      ariesChoice(5, "問他：你剛剛其實很難過吧？", effect({ affection: 3, trust: 12, pride: 5, impulse: -3, accountability: 10 }, { courage: 3 }, "他一開始會抗拒，但你沒有讓他把難過改名成沒事。", "tense"), "沒有。……好吧，有一點。只有一點。"),
    ],
    [
      ariesChoice(6, "支持他上場，但要求他先和隊友說清楚風險。", effect({ affection: 11, trust: 10, pride: 4, impulse: 2, accountability: 13 }, { courage: 3, social: 1 }, "你尊重他的選擇，也要求他承擔選擇的後果。", "honest"), "可以。我自己決定，也自己說清楚。"),
      ariesChoice(6, "堅決反對他上場：你不是隊伍唯一的答案。", effect({ affection: 2, trust: 14, pride: 12, impulse: -10, accountability: 10 }, { courage: 4 }, "這句話會刺痛他的面子，但也打破英雄劇本。", "tense"), "妳講得很狠。可是……我不是唯一的答案嗎？"),
      ariesChoice(6, "幫他綁好護膝，說你相信他一定能贏。", effect({ affection: 14, trust: 2, pride: 12, impulse: 12, accountability: -4 }, { kindness: 2, charm: 2 }, "他被你點燃，卻更難允許自己停下。", "dependent"), "我就知道妳會相信我。等著看。"),
    ],
    [
      ariesChoice(7, "吵回去：你不是逃兵，你只是受傷的人。", effect({ affection: -1, trust: 12, pride: 8, impulse: 3, accountability: 12 }, { courage: 4 }, "你們吵得很痛，但他聽見了自己一直逃避的事。", "tense"), "受傷的人……我最討厭這種說法。可是我現在好像就是。"),
      ariesChoice(7, "先抱住他，不追究比賽，只讓他冷靜下來。", effect({ affection: 13, trust: 8, pride: -4, impulse: -8, accountability: 1 }, { kindness: 4 }, "他被接住了，但問題還沒有被整理。", "comfortable"), "妳不要現在對我太好。我會不知道怎麼生氣。"),
      ariesChoice(7, "請他把剛剛最生氣的一句話，改成真正想說的話。", effect({ affection: 8, trust: 16, pride: -8, impulse: -9, accountability: 16 }, { intelligence: 2, kindness: 2 }, "你把爭吵變成一次表達練習。", "honest"), "我真正想說的是……我怕我一停下來，就沒人需要我。"),
    ],
    [
      ariesChoice(8, "假裝沒看到紙條，讓他保留面子。", effect({ affection: 8, trust: 4, pride: 8, impulse: -2, accountability: -4 }, { kindness: 2 }, "你保護了他的尷尬，也錯過了讓他前進一步的時機。", "unresolved"), "對，什麼都沒有。妳最好什麼都沒看到。"),
      ariesChoice(8, "坐下來說：道歉不是認輸，是你比昨天更強。", effect({ affection: 12, trust: 16, pride: -14, impulse: -8, accountability: 18 }, { courage: 3, kindness: 3 }, "你重新定義了他最害怕的低頭。", "intimate", { aries_apology_practice: true }), "……這句話我可以借用嗎？我可能真的需要。"),
      ariesChoice(8, "催他趕快道歉，不然大家都會更尷尬。", effect({ affection: 2, trust: 6, pride: 14, impulse: 5, accountability: 8 }, { social: 2 }, "你說的是事實，但壓力讓他又把面子豎起來。", "tense"), "我知道！妳不要逼我，我會去。只是……不是現在。"),
    ],
    [
      ariesChoice(9, "核心選擇：先去跟隊友道歉，再決定今天要不要上場。", effect({ affection: 16, trust: 18, pride: -16, impulse: -10, accountability: 22 }, { courage: 4, kindness: 2 }, "他第一次把承擔放在勝負前面。", "intimate", { aries_core: true, aries_first_apology: true }), "我去。不是因為我輸了，是因為我昨天真的傷到他。"),
      ariesChoice(9, "告訴他你喜歡他永遠往前衝的樣子。", effect({ affection: 18, trust: 4, pride: 16, impulse: 16, accountability: -6 }, { charm: 3 }, "這句喜歡很甜，卻也讓他把自己鎖回不能停下的角色裡。", "dependent"), "那我就不會讓妳看到我退後。一次都不會。"),
      ariesChoice(9, "說你會等他準備好，不要求他今天給答案。", effect({ affection: 8, trust: 12, pride: -4, impulse: -6, accountability: 8 }, { mystery: 3, kindness: 1 }, "你給了空間，但這份空間也可能變成未完成的抱歉。", "unresolved"), "謝了。我想說，可是我還差一點勇氣。"),
    ],
  ];
  return sets[stage];
};

const ariesScenes: Scene[] = ariesStages.map((stage, index) => ({
  id: `aries-${index}-start`,
  title: `${stage.title}：夏燃`,
  location: stage.location,
  characterId: "aries",
  text: stage.text,
  choices: ariesChoices(index),
}));

const genericScenes = routeStories
  .filter((route) => route.id !== "pisces" && route.id !== "aries" && route.id !== "gemini" && route.id !== "aquarius" && route.id !== "virgo" && route.id !== "taurus" && route.id !== "cancer" && route.id !== "leo" && route.id !== "libra")
  .flatMap((route) => {
  const scenes: Scene[] = [
    {
      id: `${route.id}-0-start`,
      title: `${chapterTitles[0]}：${route.name}`,
      location: route.firstLocation,
      characterId: route.id,
      text: chapterText(route, 0, route.bestTone),
      choices: choicesFor(route, 0),
    },
  ];

  for (let stage = 1; stage < chapterTitles.length; stage += 1) {
    (["direct", "gentle", "witty", "calm", "space"] as Tone[]).forEach((tone) => {
      scenes.push({
        id: branchId(route.id, stage, tone),
        title: `${chapterTitles[stage]}：${route.name}`,
        location: chapterLocations[stage],
        characterId: route.id,
        text: chapterText(route, stage, tone),
        choices: choicesFor(route, stage),
      });
    });
  }
  return scenes;
});

const leoDeepChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 9 ? `leo-deep-${stage + 1}-start` : undefined,
  resultText,
});

const leoDeepStages = [
  {
    title: "舞台初遇：掌聲後的手指",
    location: "校慶舞台後台",
    text:
      "校慶彩排結束，盛陽在掌聲裡完美鞠躬。\n\n他走進後台時仍笑得耀眼，像整個舞台的燈都追著他。\n\n可是你看見他垂在身側的手指正在發抖。\n\n他察覺你的視線，立刻把手插進口袋，笑著說：「怎麼，剛剛帥到妳忘記鼓掌？」",
  },
  {
    title: "完美解圍：保護者的位置",
    location: "學生會辦公室",
    text:
      "你被同學誤會弄丟活動資料，場面一度尷尬。\n\n盛陽走進來，三句話就讓所有人笑出來，也替你把責任化解得漂亮。\n\n他站在你前面，像天生知道如何讓人仰望。\n\n只是當所有人散開，他還是用那種閃亮的語氣說：「不用謝，會長出場就是要這麼有效率。」",
  },
  {
    title: "會長行程：沒有休息的光",
    location: "學生會會議桌",
    text:
      "你無意間看到盛陽的行程表。\n\n晨會、校慶確認、家族餐會、主持訓練、贊助簡報、晚自習。每一格都排得漂亮，連休息時間都像被刪掉。\n\n他把行程表抽回去，語氣輕鬆：「放心，我天生適合站在中心。」\n\n可你看見他的咖啡已經冷了三次。",
  },
  {
    title: "家庭電話：不能讓人看笑話",
    location: "禮堂外走廊",
    text:
      "彩排前，盛陽接到家裡電話。\n\n電話那端提醒他，這次校慶有家族朋友和校方代表會來看，盛家的人不能讓別人看笑話。\n\n他掛斷電話後，笑容比平常更漂亮。\n\n「沒事，」他說，「只是例行加油。」\n\n可你知道，那不是加油，是把他推回聚光燈中央的手。",
  },
  {
    title: "挑釁：家世與外表",
    location: "舞台側門",
    text:
      "競爭學生代表的人故意在他面前說，盛陽不過是靠家世、外表和會長光環。\n\n盛陽笑著回敬，語氣優雅得像一場公開表演。\n\n對方走後，他仍保持微笑。\n\n只有你看見，他把金色校徽握得很緊，指節微微泛白。",
  },
  {
    title: "彩排失誤：漂亮的玩笑",
    location: "禮堂舞台",
    text:
      "彩排中，盛陽突然忘了一句重要台詞。\n\n全場安靜半秒，他立刻用玩笑接回來，甚至讓工作人員都笑了。\n\n看起來完美救場。\n\n可下台後，他沒有立刻喝水，只是盯著舞台燈，像在確認裂縫有沒有被任何人看見。",
  },
  {
    title: "觀眾席：不讓你看見狼狽",
    location: "空禮堂",
    text:
      "你想幫忙整理後台，盛陽卻把你推到觀眾席最好的位置。\n\n「妳坐那裡就好。」他笑著說，「主角狼狽的樣子不能破壞觀眾體驗。」\n\n他說得像玩笑。\n\n但布幕後傳來東西掉落的聲音，他沒有讓你過去。",
  },
  {
    title: "空教室：練習笑容",
    location: "三樓空教室",
    text:
      "校慶前夕，你在空教室找到盛陽。\n\n他站在窗前，對著玻璃練習笑容，一次比一次標準。\n\n看見你後，他沒有立刻收起來，只是問：「這個笑，撐完整場可以嗎？」\n\n那句話比任何失誤都安靜。",
  },
  {
    title: "光環下的人：第一次承認害怕",
    location: "禮堂後門",
    text:
      "演出前一晚，舞台燈一盞一盞關掉。\n\n盛陽坐在後門台階上，終於沒有立刻微笑。\n\n「如果我失敗了，大家還會需要我嗎？」\n\n他說得很慢。\n\n「如果我不再耀眼，妳還會站在這裡嗎？」",
  },
  {
    title: "最終舞台：光環裂縫",
    location: "校慶主舞台",
    text:
      "正式演出時，舞台設備突然出錯，投影黑掉，音樂卡在第一小節。\n\n所有人都看向盛陽。\n\n他手裡有一份完美稿子，只要照著念，就能漂亮地把意外包成表演效果。\n\n但你知道，這也是他第一次有機會不用完美救場，而是讓真正的自己站上台。",
  },
];

const leoDeepChoices = (stage: number): Choice[] => {
  const sets: Choice[][] = [
    [
      leoDeepChoice(0, "走近一點，低聲問他的手是不是還在抖。", effect({ affection: 5, trust: 12, spotlightNeed: -3, vulnerability: 8, authenticity: 6, pride: 4 }, { kindness: 2, courage: 2 }, "你看見了掌聲後面的他，這讓他慌，也讓裂縫有了被接住的可能。", "honest"), "「妳看得太仔細了。這樣會讓會長很沒有面子。」"),
      leoDeepChoice(0, "順著他的玩笑稱讚：帥到後台燈都不敢暗。", effect({ affection: 10, trust: 3, spotlightNeed: 8, pride: 6, vulnerability: -2, authenticity: -1 }, { charm: 3 }, "稱讚讓他恢復光芒，但他也更確定自己必須永遠耀眼。", "playful"), "「有眼光。這句可以寫進校慶宣傳稿。」"),
      leoDeepChoice(0, "假裝沒看到，遞給他一瓶水。", effect({ affection: 7, trust: 6, spotlightNeed: 2, vulnerability: 2, authenticity: 2 }, { kindness: 2 }, "你保留了他的體面，也留下了溫柔的入口。", "comfortable"), "「謝啦。妳很懂後台禮儀。」"),
    ],
    [
      leoDeepChoice(1, "謝謝他，但說你也想自己說明，不想永遠被擋在身後。", effect({ affection: 7, trust: 12, spotlightNeed: -2, vulnerability: 4, authenticity: 8, pride: -2 }, { courage: 3 }, "你沒有否定他的保護，只是讓他知道親密不是單方面救場。", "honest"), "「原來妳不想只當被保護的公主。好，這點我記住。」"),
      leoDeepChoice(1, "笑著讓他收下所有掌聲。", effect({ affection: 11, trust: 2, spotlightNeed: 9, pride: 8, authenticity: -3 }, { charm: 2, social: 2 }, "他被仰望了，也更難從保護者的位置走下來。", "dependent"), "「沒辦法，英雄救場也是學生會長的職務之一。」"),
      leoDeepChoice(1, "事後指出他剛才太愛逞帥。", effect({ affection: 2, trust: 8, pride: 8, vulnerability: 3, authenticity: 5 }, { courage: 2 }, "這句刺到他的驕傲，卻也讓表演感短暫破功。", "tense"), "「逞帥也是帥。雖然……妳說得不算錯。」"),
    ],
    [
      leoDeepChoice(2, "把休息也排進他的行程表，說光也需要充電。", effect({ affection: 8, trust: 13, spotlightNeed: -5, vulnerability: 6, authenticity: 7, pride: -2 }, { intelligence: 2, kindness: 2 }, "你沒有要求他黯淡，只是提醒他不必燃燒自己。", "comfortable"), "「把休息寫進行程表？妳真敢命令會長。」"),
      leoDeepChoice(2, "稱讚他果然能把所有事情做到完美。", effect({ affection: 10, trust: 3, spotlightNeed: 10, pride: 8, vulnerability: -3, authenticity: -3 }, { charm: 3 }, "他笑得漂亮，但完美的重量又多了一層。", "playful"), "「當然。完美是基本款。」"),
      leoDeepChoice(2, "問他如果今天偷懶一次，世界會不會真的塌下來。", effect({ affection: 4, trust: 10, spotlightNeed: -4, pride: 6, vulnerability: 5, authenticity: 6 }, { courage: 2, intelligence: 2 }, "問題很直接，讓他第一次思考掌聲之外的自己。", "tense"), "「不會塌。但我會很不習慣。」"),
    ],
    [
      leoDeepChoice(3, "說：你不用每天都發光，也不會因此丟臉。", effect({ affection: 9, trust: 15, spotlightNeed: -8, vulnerability: 10, authenticity: 10, pride: -4 }, { kindness: 3, courage: 2 }, "你把他的存在和表現拆開，這句話落在他最深的壓力上。", "intimate", { leo_family_call: true, leo_no_need_to_shine: true }), "「妳知道這句話很危險嗎？我差點真的相信。」"),
      leoDeepChoice(3, "鼓勵他證明給家裡看，這場一定要贏。", effect({ affection: 10, trust: 2, spotlightNeed: 12, pride: 10, vulnerability: -4, authenticity: -4 }, { charm: 2, social: 2 }, "你的支持點燃了他，也把他推回不能黯淡的位置。", "dependent", { leo_family_call: true }), "「放心，我會讓所有人閉嘴。」"),
      leoDeepChoice(3, "先陪他沉默，問他想不想暫時把電話關掉。", effect({ affection: 7, trust: 12, spotlightNeed: -3, vulnerability: 8, authenticity: 7 }, { mystery: 2, kindness: 2 }, "你沒有替他反抗家庭，只讓他先從期待裡喘口氣。", "comfortable", { leo_family_call: true }), "「關十分鐘。就十分鐘，會長也需要叛逆一下。」"),
    ],
    [
      leoDeepChoice(4, "看著他說：剛剛那句話傷到你了，對嗎？", effect({ affection: 4, trust: 14, spotlightNeed: -4, vulnerability: 10, authenticity: 8, pride: 5 }, { courage: 3, kindness: 1 }, "你沒有被他的優雅騙過，讓受傷有了名字。", "honest"), "「妳真的很不會看氣氛。可是……對。」"),
      leoDeepChoice(4, "替他反擊，說會長就是有資格被仰望。", effect({ affection: 12, trust: 4, spotlightNeed: 10, pride: 10, vulnerability: -3, authenticity: -2 }, { courage: 3, social: 1 }, "你站在他這邊，但也讓他繼續用光環抵擋傷口。", "playful"), "「這句我喜歡。霸氣，適合當我的後援會宣言。」"),
      leoDeepChoice(4, "輕聲說外表和家世不是錯，但也不是他全部。", effect({ affection: 8, trust: 12, spotlightNeed: -5, vulnerability: 7, authenticity: 10, pride: -2 }, { intelligence: 2, kindness: 2 }, "你沒有否定他的光，只是看見光之外的人。", "intimate", { leo_seen_real_self: true }), "「不是全部嗎？那妳覺得還剩什麼？」"),
    ],
    [
      leoDeepChoice(5, "等笑聲散去後說：你不用把失誤也演得完美。", effect({ affection: 8, trust: 14, spotlightNeed: -8, vulnerability: 10, authenticity: 10, pride: -4 }, { courage: 3, kindness: 2 }, "你看見真正的他，而不是漂亮救場的技巧。", "honest", { leo_seen_real_self: true }), "「如果不演得漂亮，大家會記得我失誤。」"),
      leoDeepChoice(5, "稱讚他臨場反應超強，這才是會長。", effect({ affection: 11, trust: 3, spotlightNeed: 9, pride: 8, vulnerability: -4, authenticity: -4 }, { charm: 3 }, "他被你的稱讚托住，也更不敢承認剛剛其實害怕。", "dependent"), "「當然。舞台意外也要為我服務。」"),
      leoDeepChoice(5, "陪他重來一次，把失誤處慢慢排過。", effect({ affection: 7, trust: 12, spotlightNeed: -2, vulnerability: 5, authenticity: 6, pride: 1 }, { intelligence: 2, kindness: 2 }, "你沒有放大失誤，也沒有假裝它不存在，只陪他重新站穩。", "comfortable"), "「妳這個陪練比副會長嚴格。」"),
    ],
    [
      leoDeepChoice(6, "走到後台，說你想看的不是主角，是盛陽。", effect({ affection: 9, trust: 16, spotlightNeed: -9, vulnerability: 12, authenticity: 12, pride: -5 }, { courage: 3, kindness: 2 }, "你越過觀眾席，看見他不想展示的部分。", "intimate", { leo_seen_real_self: true }), "「這句話太犯規了。我會真的想讓妳看見。」"),
      leoDeepChoice(6, "坐到觀眾席，尊重他想維持舞台感。", effect({ affection: 8, trust: 6, spotlightNeed: 6, pride: 5, vulnerability: -1, authenticity: 1 }, { kindness: 2 }, "你尊重了他的界線，也讓他繼續把狼狽留在布幕後。", "comfortable"), "「乖。最佳觀眾就該坐最佳位置。」"),
      leoDeepChoice(6, "開玩笑說主角狼狽也算限定福利。", effect({ affection: 10, trust: 7, spotlightNeed: -1, vulnerability: 5, authenticity: 5, pride: 3 }, { charm: 3 }, "玩笑讓他放鬆，但真心仍只露出一點。", "playful"), "「限定福利很貴。妳欠我一張票。」"),
    ],
    [
      leoDeepChoice(7, "說：撐不住也沒關係，我會看見你不是笑容。", effect({ affection: 10, trust: 16, spotlightNeed: -10, vulnerability: 14, authenticity: 14, pride: -6 }, { kindness: 3, courage: 2 }, "你讓他的笑容不必承擔全部重量。", "intimate", { leo_no_need_to_shine: true }), "「那如果我真的笑不出來，妳不要移開眼睛。」"),
      leoDeepChoice(7, "幫他調整笑容角度，讓舞台效果更好。", effect({ affection: 9, trust: 4, spotlightNeed: 8, pride: 7, vulnerability: -3, authenticity: -2 }, { charm: 2, intelligence: 1 }, "你幫到了表演，卻沒有碰到他真正的求救。", "playful"), "「不錯。妳很有製作人潛力。」"),
      leoDeepChoice(7, "問他為什麼一定要用笑容撐完整場。", effect({ affection: 4, trust: 13, spotlightNeed: -5, vulnerability: 9, authenticity: 10, pride: 4 }, { intelligence: 3, courage: 1 }, "問題刺進核心，他會先防備，但也無法完全逃開。", "tense"), "「因為大家是來看盛陽的，不是來看我崩掉的。」"),
    ],
    [
      leoDeepChoice(8, "回答：我會站在這裡，尤其是你不耀眼的時候。", effect({ affection: 12, trust: 18, spotlightNeed: -12, vulnerability: 16, authenticity: 16, pride: -8 }, { kindness: 3, courage: 3 }, "你不是仰望他的光，而是選擇留在燈暗的地方。", "intimate", { leo_seen_real_self: true }), "「妳這樣說，我會變得很貪心。」"),
      leoDeepChoice(8, "說你相信他不會失敗，因為他是盛陽。", effect({ affection: 13, trust: 5, spotlightNeed: 12, pride: 10, vulnerability: -5, authenticity: -5 }, { charm: 3 }, "信任很甜，卻讓他更害怕不能符合你心中的盛陽。", "dependent"), "「對，我是盛陽。我不能失敗。」"),
      leoDeepChoice(8, "說失敗也要看情況，你會先看他怎麼面對。", effect({ affection: 4, trust: 10, spotlightNeed: -3, vulnerability: 5, authenticity: 8, pride: 3 }, { intelligence: 3 }, "這句務實，讓他知道愛不是無條件崇拜，而是一起面對。", "honest"), "「很嚴格。但至少不是假話。」"),
    ],
    [
      leoDeepChoice(9, "核心選擇：放下完美稿子，說你真正想說的話。", effect({ affection: 18, trust: 18, spotlightNeed: -16, vulnerability: 20, authenticity: 22, pride: -10 }, { courage: 3, kindness: 3 }, "他第一次不靠完美表演救場，而是真誠地讓自己被看見。", "intimate", { leo_authentic_stage: true }), "「各位，今天的舞台出錯了。其實我也會怕。但我想把這一刻，好好演完。」"),
      leoDeepChoice(9, "提醒他先救場，等演出結束再談真心。", effect({ affection: 9, trust: 8, spotlightNeed: 6, pride: 6, vulnerability: 2, authenticity: 3 }, { intelligence: 2, social: 2 }, "你幫他守住舞台，也讓真心晚了一步。", "unresolved"), "「會長職責優先。妳說得對。」"),
      leoDeepChoice(9, "告訴他觀眾都在等他的完美反應。", effect({ affection: 14, trust: 2, spotlightNeed: 16, pride: 14, vulnerability: -8, authenticity: -8 }, { charm: 3 }, "你把他重新送回光環裡，他依然耀眼，卻更難靠近。", "dependent"), "「那我就給他們想看的盛陽。」"),
    ],
  ];
  return sets[stage];
};

const leoDeepScenes: Scene[] = leoDeepStages.map((stage, index) => ({
  id: `leo-deep-${index}-start`,
  title: stage.title,
  location: stage.location,
  characterId: "leo",
  text: stage.text,
  choices: leoDeepChoices(index),
}));

const libraDeepChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 9 ? `libra-deep-${stage + 1}-start` : undefined,
  resultText,
});

const libraDeepStages = [
  {
    title: "午後畫室：校草的速寫",
    location: "美術社午後畫室",
    text:
      "午後的美術社安靜得像被陽光洗過。\n\n白衡坐在窗邊替同學畫速寫，筆尖很輕，幾句話就能讓緊張的人放鬆。\n\n輪到你時，他抬眼看了很久，紙上先出現的不是五官，而是你轉頭時的側臉線條。\n\n「抱歉，」他笑得優雅，「妳這個角度太適合入畫。」",
  },
  {
    title: "每個人都被重視",
    location: "美術社走廊",
    text:
      "白衡剛替你拿好畫具，就被另一位學妹叫住。\n\n他溫柔地記得對方上次喜歡的顏色，也記得你畫筆上的裂痕。\n\n每個人都像被他好好放在心上。\n\n可你忽然分不清，自己是特別，還是只是他溫柔名單裡的一行。",
  },
  {
    title: "未完成的側臉",
    location: "畫室角落",
    text:
      "你在畫架後方看見一張你的側臉速寫。\n\n線條完成得很細，背景卻空白一片。\n\n白衡走近時沒有否認，只是把畫紙輕輕壓住。\n\n「背景還沒想好。」\n\n他說得像在談構圖，卻像是在迴避你會站在他心裡哪裡。",
  },
  {
    title: "社交邀約：漂亮的平均分配",
    location: "校園中庭",
    text:
      "午休時，有人約白衡放學後一起看展，也有人請他幫忙看作品。\n\n他沒有答應，也沒有拒絕，只用溫柔的語氣把每個人都安撫得很好。\n\n你看著他在期待之間游刃有餘。\n\n那份優雅很好看，也讓你心裡有一點累。",
  },
  {
    title: "校草傳聞：若即若離",
    location: "公布欄前",
    text:
      "班上開始傳白衡對誰都很溫柔，說他讓每個人都以為自己有機會。\n\n白衡聽見時只是笑笑：「被討厭總比被期待難處理。」\n\n那句話太輕，卻讓你聽見他的疲憊。\n\n他不是享受曖昧，而是不知道怎麼讓期待落空。",
  },
  {
    title: "空展廳：不討所有人喜歡",
    location: "校內小展廳",
    text:
      "美術社佈展前，你們提前到空展廳確認動線。\n\n白衡站在一排空白牆前，忽然問你：「如果我不再討所有人喜歡，妳還會看我嗎？」\n\n他語氣仍然溫柔，像只是在討論展覽光線。\n\n但那一刻，他終於不像在照顧所有人的表情。",
  },
  {
    title: "背影畫：被放到最後的心意",
    location: "美術準備室",
    text:
      "你看見一幅未完成的背影畫。\n\n畫裡的人站在窗邊，校裙被光描出柔軟的邊。\n\n白衡說那只是練習作品。\n\n可你知道那是你。\n\n他畫得那麼偏心，嘴上卻仍把它說成普通練習。",
  },
  {
    title: "選擇困難：溫柔不是答案",
    location: "放學後畫室",
    text:
      "展覽分組名單需要最後確認。\n\n白衡把你和另一位很期待他的學妹都排進自己的組，說這樣最公平。\n\n你看著那份漂亮的名單，忽然明白他的公平有時不是體貼，而是逃避選擇。\n\n他也知道，所以遲遲沒有抬頭。",
  },
  {
    title: "畢業展作品：名字叫《偏心》",
    location: "美術社夜間畫室",
    text:
      "校內畢業展前夜，白衡終於讓你看那幅完成的作品。\n\n畫裡不是所有人的平衡構圖，而是一個人站在畫面中央。\n\n作品名被他用鉛筆淡淡寫在右下角：《偏心》。\n\n他看著那兩個字，像在等自己承認什麼。",
  },
  {
    title: "展覽開幕：明確選擇",
    location: "校內畢業展",
    text:
      "展覽開幕當天，許多人圍著白衡，問他《偏心》畫的是誰。\n\n他可以像往常一樣優雅地把答案說得漂亮又模糊，讓每個人都不受傷。\n\n也可以第一次承認：偏心不是失禮，而是他必須為自己的心意負責。\n\n他看向你，手裡還握著那支沾著紫色顏料的筆。",
  },
];

const libraDeepChoices = (stage: number): Choice[] => {
  const sets: Choice[][] = [
    [
      libraDeepChoice(0, "坦然坐下，說你想看看他眼裡的自己。", effect({ affection: 9, trust: 9, balanceNeed: -2, decisiveness: 4, biasAcceptance: 5, socialMask: -2 }, { charm: 2, courage: 1 }, "你沒有追著他的魅力跑，而是穩穩接住那道視線。", "curious"), "「那我要畫得誠實一點，不能只畫好看的地方。」"),
      libraDeepChoice(0, "害羞稱讚他很會說話，難怪大家都喜歡他。", effect({ affection: 10, trust: 3, balanceNeed: 6, socialMask: 6, decisiveness: -1 }, { charm: 3 }, "他被稱讚得自然，卻也更躲回校草面具裡。", "playful"), "「大家喜歡我，聽起來像優點，也像麻煩。」"),
      libraDeepChoice(0, "開玩笑問：你是不是對每個模特兒都這麼說？", effect({ affection: 6, trust: 7, balanceNeed: 1, decisiveness: 3, biasAcceptance: 2, socialMask: -1 }, { charm: 2, intelligence: 1 }, "玩笑點到核心，讓他短暫不知道怎麼優雅回答。", "honest"), "「不是每個。至少不是這麼久才下筆。」"),
    ],
    [
      libraDeepChoice(1, "直接說你會在意，因為你不想只是他溫柔名單的一行。", effect({ affection: 4, trust: 13, balanceNeed: -4, decisiveness: 8, biasAcceptance: 6, socialMask: -4 }, { courage: 3 }, "你沒有爭寵，而是要求關係有清楚的位置。", "honest"), "「妳說得很準。準到我有點想逃。」"),
      libraDeepChoice(1, "裝作不在意，跟著稱讚他真的很受歡迎。", effect({ affection: 8, trust: 2, balanceNeed: 8, socialMask: 6, decisiveness: -3 }, { social: 2 }, "表面輕鬆了，但你的不安也被一起收進沉默。", "unresolved"), "「受歡迎有時候很吵。可是說出來會像炫耀。」"),
      libraDeepChoice(1, "把裂掉的畫筆拿回來，說你自己也能處理。", effect({ affection: 3, trust: 9, balanceNeed: -2, decisiveness: 5, biasAcceptance: 1 }, { mystery: 2, courage: 1 }, "你站穩自己的位置，不讓他的溫柔變成唯一答案。", "comfortable"), "「妳很會讓人沒辦法順手照顧。」"),
    ],
    [
      libraDeepChoice(2, "問他：背景沒想好，還是不敢決定我站哪裡？", effect({ affection: 5, trust: 15, balanceNeed: -6, decisiveness: 10, biasAcceptance: 8, socialMask: -5 }, { courage: 3, intelligence: 2 }, "你把畫裡的空白說出來，他無法再把逃避說成構圖。", "tense"), "「妳真的很不適合當安靜的模特兒。」"),
      libraDeepChoice(2, "說你喜歡留白，因為不用急著定義。", effect({ affection: 10, trust: 5, balanceNeed: 7, decisiveness: -4, socialMask: 3 }, { kindness: 2, mystery: 1 }, "你給了他空間，也可能讓他繼續把心意停在未完成。", "comfortable"), "「留白很美。也很安全。」"),
      libraDeepChoice(2, "請他把畫還你，等他想好再繼續。", effect({ affection: 2, trust: 10, balanceNeed: -3, decisiveness: 7, biasAcceptance: 3 }, { courage: 2, mystery: 2 }, "你沒有追問，卻讓他知道模糊不是免費的。", "honest"), "「原來妳也會把畫收回去。」"),
    ],
    [
      libraDeepChoice(3, "提醒他：不拒絕也是一種選擇，而且會讓人誤會。", effect({ affection: 4, trust: 14, balanceNeed: -8, decisiveness: 12, biasAcceptance: 6, socialMask: -5 }, { courage: 3, intelligence: 1 }, "這句不溫柔，但替他的溫柔補上責任。", "honest"), "「我知道。只是每次要讓誰失望，我就會先退一步。」"),
      libraDeepChoice(3, "幫他整理時間，讓所有邀約都被平均安排。", effect({ affection: 9, trust: 4, balanceNeed: 10, decisiveness: -4, socialMask: 5 }, { intelligence: 3, social: 1 }, "你幫他維持平衡，卻也讓逃避更有效率。", "dependent"), "「妳很適合當策展人。也很適合讓我繼續逃。」"),
      libraDeepChoice(3, "離開中庭，去做自己的事，不等他的答案。", effect({ affection: 3, trust: 8, balanceNeed: -4, decisiveness: 6, biasAcceptance: 2, socialMask: -2 }, { mystery: 3 }, "你沒有追著他的曖昧跑，讓他第一次發現你不會一直等。", "distant"), "「妳走得很乾脆。這樣反而讓我有點慌。」"),
    ],
    [
      libraDeepChoice(4, "說你知道他不是花心，但溫柔也要有邊界。", effect({ affection: 8, trust: 15, balanceNeed: -6, decisiveness: 10, biasAcceptance: 8, socialMask: -6 }, { kindness: 2, courage: 2 }, "你沒有把他定罪，而是讓他看見魅力需要負責。", "intimate"), "「謝謝妳沒有把我說成壞人。但妳說得對，我也不能一直當好人。」"),
      libraDeepChoice(4, "替他辯解，說大家只是太容易誤會。", effect({ affection: 10, trust: 3, balanceNeed: 8, socialMask: 7, decisiveness: -3 }, { kindness: 3 }, "你保護了他，也可能讓他繼續不用面對問題。", "comfortable"), "「妳太善良了。善良到我會想躲在裡面。」"),
      libraDeepChoice(4, "冷淡說這種傳聞確實容易讓人不安。", effect({ affection: -1, trust: 9, balanceNeed: -3, decisiveness: 6, socialMask: -3 }, { courage: 2 }, "語氣讓他受傷，但也讓他知道模糊真的會消耗人。", "tense"), "「我讓妳也這樣想了嗎？那就不是傳聞的問題了。」"),
    ],
    [
      libraDeepChoice(5, "回答：我想看的不是被所有人喜歡的你。", effect({ affection: 10, trust: 16, balanceNeed: -8, decisiveness: 8, biasAcceptance: 12, socialMask: -10 }, { kindness: 3, courage: 2 }, "你讓他知道失去普遍好感，不等於失去你的目光。", "intimate", { libra_empty_gallery: true }), "「那我可以不用那麼漂亮地說話嗎？只在這裡。」"),
      libraDeepChoice(5, "說你當然會看他，因為他本來就很有魅力。", effect({ affection: 12, trust: 5, balanceNeed: 7, socialMask: 6, biasAcceptance: 2 }, { charm: 3 }, "他被安慰了，卻也更困在魅力本身。", "playful", { libra_empty_gallery: true }), "「魅力是很方便的盾牌。妳不要太相信它。」"),
      libraDeepChoice(5, "說那要看他願不願意先看見自己。", effect({ affection: 5, trust: 13, balanceNeed: -5, decisiveness: 8, biasAcceptance: 7, socialMask: -5 }, { intelligence: 3 }, "這不是最甜的回答，卻把選擇權還給他。", "honest", { libra_empty_gallery: true }), "「很嚴格。但我好像需要這種嚴格。」"),
    ],
    [
      libraDeepChoice(6, "指著畫說：你已經很偏心了，只是不敢承認。", effect({ affection: 7, trust: 16, balanceNeed: -8, decisiveness: 12, biasAcceptance: 14, socialMask: -6 }, { courage: 3, charm: 1 }, "你把他的心意從普通練習裡叫出來。", "intimate", { libra_called_out_bias: true }), "「偏心這個詞，從妳嘴裡說出來好像沒那麼失禮。」"),
      libraDeepChoice(6, "假裝相信那只是練習，保留他的體面。", effect({ affection: 9, trust: 4, balanceNeed: 6, socialMask: 4, decisiveness: -2 }, { kindness: 2 }, "你沒有逼他，但也讓那幅畫繼續躲在安全距離裡。", "unresolved"), "「妳真的很會給人台階。讓我更不好意思下來。」"),
      libraDeepChoice(6, "說如果只是練習，那你也不需要當唯一模特兒。", effect({ affection: 2, trust: 12, balanceNeed: -4, decisiveness: 9, biasAcceptance: 5, socialMask: -3 }, { mystery: 3, courage: 1 }, "你站穩了自己的價值，不把特別感交給他的模糊決定。", "honest"), "「妳在提醒我，特別不是可以隨便借用的詞。」"),
    ],
    [
      libraDeepChoice(7, "說公平不是把所有人放在同一格，而是誠實面對誰最重要。", effect({ affection: 8, trust: 16, balanceNeed: -10, decisiveness: 14, biasAcceptance: 12, socialMask: -7 }, { courage: 3, intelligence: 2 }, "你拆掉了他最漂亮的藉口。", "honest"), "「這句話很不天秤。也很必要。」"),
      libraDeepChoice(7, "接受分組，說你不想讓他為難。", effect({ affection: 10, trust: 3, balanceNeed: 10, decisiveness: -5, socialMask: 4 }, { kindness: 3 }, "你替他保住平衡，也把自己的位置放到最後。", "dependent"), "「妳越體貼，我越覺得自己很糟。」"),
      libraDeepChoice(7, "退出他的組，改去完成自己的作品。", effect({ affection: 1, trust: 10, balanceNeed: -7, decisiveness: 8, biasAcceptance: 4, socialMask: -4 }, { mystery: 3, courage: 2 }, "你不追著曖昧跑，讓他必須面對選擇的空位。", "distant"), "「妳站得太穩了。穩到我不能再裝作沒看見。」"),
    ],
    [
      libraDeepChoice(8, "看著《偏心》說：這次不要把名字擦掉。", effect({ affection: 10, trust: 17, balanceNeed: -10, decisiveness: 15, biasAcceptance: 16, socialMask: -8 }, { kindness: 2, courage: 3 }, "你讓他的偏心成為作品，而不是錯誤。", "intimate", { libra_work_bias: true, libra_called_out_bias: true }), "「如果不擦掉，就等於我承認了。」"),
      libraDeepChoice(8, "稱讚作品很美，但不問畫的是誰。", effect({ affection: 9, trust: 5, balanceNeed: 5, socialMask: 5, decisiveness: -2 }, { charm: 2, kindness: 1 }, "美被保留下來，心意卻仍然沒有名字。", "comfortable"), "「妳又在給我退路。很溫柔，也很危險。」"),
      libraDeepChoice(8, "問他是不是準備把偏心也說成構圖需要。", effect({ affection: 5, trust: 14, balanceNeed: -6, decisiveness: 10, biasAcceptance: 9, socialMask: -5 }, { intelligence: 2, courage: 2 }, "你用吐槽逼他看見自己的逃跑路線。", "playful"), "「被妳搶先講掉了。那我只好換一個比較真誠的說法。」"),
    ],
    [
      libraDeepChoice(9, "核心選擇：承認偏心，明確說你選的是誰。", effect({ affection: 18, trust: 18, balanceNeed: -16, decisiveness: 22, biasAcceptance: 22, socialMask: -14 }, { courage: 3, kindness: 3 }, "他第一次讓自己的魅力和心意一起負責。", "intimate", { libra_clear_choice: true, libra_work_bias: true }), "「畫的是妳。我偏心的人也是妳。」"),
      libraDeepChoice(9, "讓他保留模糊答案，避免現場尷尬。", effect({ affection: 12, trust: 4, balanceNeed: 12, socialMask: 10, decisiveness: -6, biasAcceptance: -2 }, { social: 3 }, "場面很好看，但你又被放回若即若離的位置。", "dependent"), "「謝謝妳替我保住氣氛。可是我好像又讓妳失望了。」"),
      libraDeepChoice(9, "說不用現在回答，你會先站回自己的位置。", effect({ affection: 2, trust: 12, balanceNeed: -4, decisiveness: 8, biasAcceptance: 5, socialMask: -4 }, { mystery: 3, intelligence: 1 }, "你沒有逼他，也不替他的模糊買單。", "farewell"), "「妳沒有追上來，反而讓我更清楚看見妳。」"),
    ],
  ];
  return sets[stage];
};

const libraDeepScenes: Scene[] = libraDeepStages.map((stage, index) => ({
  id: `libra-deep-${index}-start`,
  title: stage.title,
  location: stage.location,
  characterId: "libra",
  text: stage.text,
  choices: libraDeepChoices(index),
}));

const taurusDeepChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 9 ? `taurus-deep-${stage + 1}-start` : undefined,
  resultText,
});

const taurusDeepStages = [
  {
    title: "雨天初遇：窗邊的熱拿鐵",
    location: "Cafe Etoile",
    text:
      "午後大雨把校門口變成一片灰色水霧。\n\n你躲進轉角那間咖啡廳，制服袖口還滴著水。\n\n吧台後的陸雨田抬頭看你一眼，沒有多問，只把一條乾毛巾和一杯熱拿鐵推過來。\n\n「先坐窗邊。那裡不會吹到冷氣。」\n\n他的聲音慢慢的，像雨聲落在木桌上。",
  },
  {
    title: "限定蛋糕：剛好多做的一份",
    location: "甜點社教室",
    text:
      "甜點社今天試作季節限定蛋糕，香草奶油和草莓的味道從門縫裡飄出來。\n\n大家排隊試吃時，陸雨田先把一小盤放到你面前。\n\n「剛好多做。」他說。\n\n可那份蛋糕上的果醬，剛好避開了你不太喜歡的酸味。",
  },
  {
    title: "熱可可：照顧不是告白",
    location: "咖啡廳窗邊",
    text:
      "你今天看起來有點累，陸雨田沒有問太多，只把熱可可放到你手邊。\n\n杯緣溫度剛好，旁邊還有一小塊不甜的餅乾。\n\n「喝完再回家。」\n\n你看著他，他卻移開視線：「只是店裡剩下的。」\n\n他總是把心意說得像庫存管理。",
  },
  {
    title: "咖啡廳家庭事件：熟悉的地方要改變",
    location: "Cafe Etoile 後門",
    text:
      "你聽見陸雨田和家人討論咖啡廳翻修。\n\n對方說舊桌椅、老菜單、手寫黑板都該換掉，才能吸引更多客人。\n\n陸雨田沉默很久，才說：「可是常來的人會找不到原本的位置。」\n\n那一刻你發現，他害怕的不是翻修，而是熟悉的東西忽然不再等人。",
  },
  {
    title: "糖放多了：細膩吃醋",
    location: "甜點社烘焙台",
    text:
      "你提到今天有同學陪你去買材料。\n\n陸雨田手上的打蛋器停了一秒。\n\n「很好。有人陪比較安全。」\n\n下一盤蛋糕出爐後，他嘗了一口，低聲說：「糖放多了。」\n\n其實配方沒有變，變的是他心裡那點悶悶的酸。",
  },
  {
    title: "自己想完又退後",
    location: "咖啡廳打烊後",
    text:
      "你發現陸雨田這幾天少了很多話。\n\n他仍替你留窗邊位置，仍記得你的飲料，但不再主動坐下。\n\n桌角放著一張沒送出的甜點券，上面寫到一半又被劃掉。\n\n他以為你喜歡別人，於是自己把故事想完，再默默退後。",
  },
  {
    title: "遞出的甜點：固執不告白",
    location: "放學後甜點社",
    text:
      "社團教室只剩你們兩個。\n\n陸雨田明明有話想說，卻只是把一盒小蛋糕推給你。\n\n「今天試作。妳帶回去。」\n\n他低頭整理圍裙，動作比平常慢。\n\n你知道他在等一個不需要開口也能被理解的奇蹟。",
  },
  {
    title: "怕嚇跑你：慢熱的真話",
    location: "咖啡廳倉庫",
    text:
      "你終於問他為什麼總是只照顧你，卻什麼都不說。\n\n陸雨田靠著貨架，手裡拿著一包咖啡豆。\n\n「如果太快說出口，妳會不會覺得有壓力。」\n\n他停了一下，又補充：「我不是不想說。只是怕一說，連現在這樣都沒有了。」",
  },
  {
    title: "專屬口味：一直調整的限定",
    location: "Cafe Etoile 廚房",
    text:
      "你無意間看到一本試作筆記。\n\n上面密密麻麻寫著：少酸、奶油減量、草莓切小一點、她好像比較喜歡柔和的甜。\n\n原來那款限定蛋糕不是偶然。\n\n陸雨田站在門口，耳尖慢慢紅起來。\n\n「妳看到了。那就不用猜了。」",
  },
  {
    title: "正式菜單：今日限定，長期供應",
    location: "Cafe Etoile 櫃台前",
    text:
      "新菜單印好前，陸雨田把那款限定蛋糕的名牌放在櫃台上。\n\n只差最後一步。\n\n如果放進正式菜單，就不再是偷偷為你留下的甜。\n\n如果親口說出心意，他也不能再用剛好多做、店裡剩下、順手而已來退回安全距離。\n\n他看著你，像在等你給他一點勇氣，也像終於準備好自己給自己勇氣。",
  },
];

const taurusDeepChoices = (stage: number): Choice[] => {
  const sets: Choice[][] = [
    [
      taurusDeepChoice(0, "收下毛巾，說你記住這個窗邊座位了。", effect({ affection: 8, trust: 8, stabilityNeed: 4, expression: 3, overthinking: -2 }, { kindness: 2 }, "你接受了他的生活照顧，也讓窗邊變成共享的小習慣。", "comfortable"), "「那下次下雨，妳知道坐哪裡。」"),
      taurusDeepChoice(0, "開玩笑問這是不是咖啡廳的避雨套餐。", effect({ affection: 10, trust: 4, stubbornness: -2, expression: 2, overthinking: -1 }, { charm: 3 }, "玩笑讓他放鬆，卻也讓心意暫時藏在服務裡。", "playful"), "「如果真有套餐，妳這杯要加價。」"),
      taurusDeepChoice(0, "不好意思接受，堅持只等雨小就走。", effect({ affection: 2, trust: 2, stabilityNeed: 8, overthinking: 6, expression: -2 }, { mystery: 2 }, "你的客氣讓他更不敢靠近，只好把照顧收回吧台後。", "unresolved"), "「嗯。雨小以前，至少別站門口吹風。」"),
    ],
    [
      taurusDeepChoice(1, "直接說：你明明是特地留給我的吧。", effect({ affection: 8, trust: 10, expression: 8, stubbornness: 4, overthinking: 2 }, { courage: 3 }, "直球讓他慌，但也逼心意露出一點形狀。", "honest"), "「……剛好妳在。這也是事實。」"),
      taurusDeepChoice(1, "慢慢吃完，記住蛋糕裡的小細節。", effect({ affection: 10, trust: 8, stabilityNeed: 5, expression: 4, overthinking: -3 }, { kindness: 2, intelligence: 1 }, "你用細節回應他的細節，讓他覺得陪伴有被接住。", "comfortable"), "「妳吃得很慢。不是不好吃吧？」"),
      taurusDeepChoice(1, "故意稱讚其他社員也很厲害。", effect({ affection: 5, trust: 2, possessiveness: 10, overthinking: 8, expression: -2 }, { social: 2 }, "你沒有惡意，卻讓他的細膩佔有慾悄悄冒頭。", "jealous"), "「嗯。他們都很厲害。這份只是普通。」"),
    ],
    [
      taurusDeepChoice(2, "說謝謝，但問他這份陪伴是不是只給你。", effect({ affection: 8, trust: 12, possessiveness: -2, expression: 10, overthinking: -3 }, { courage: 3, kindness: 1 }, "你沒有逼告白，只是讓照顧不再完全無名。", "honest"), "「我沒有到處給人熱可可。這樣回答可以嗎？」"),
      taurusDeepChoice(2, "安心喝完，讓他用自己的節奏陪你。", effect({ affection: 11, trust: 8, stabilityNeed: 6, expression: 3, overthinking: -4 }, { kindness: 3 }, "你給了他慢慢靠近的安全感，但表達仍然很慢。", "comfortable"), "「喝慢一點。太快會燙。」"),
      taurusDeepChoice(2, "說你不想欠人情，下次請他喝飲料。", effect({ affection: 4, trust: 5, stubbornness: 4, expression: 2, overthinking: 6 }, { social: 2 }, "你想保持平衡，他卻開始擔心自己的照顧太重。", "unresolved"), "「不是人情。算了，下次妳想請再說。」"),
    ],
    [
      taurusDeepChoice(3, "問他：你怕的不是裝潢，是有人找不到原本的位置嗎？", effect({ affection: 8, trust: 14, stabilityNeed: -6, expression: 7, overthinking: -5 }, { intelligence: 2, kindness: 2 }, "你說中他的核心，讓變動不再只是敵人。", "honest", { taurus_cafe_family_event: true }), "「妳怎麼連這個都看得出來。」"),
      taurusDeepChoice(3, "支持他保留舊咖啡廳，熟悉也很重要。", effect({ affection: 10, trust: 7, stabilityNeed: 8, stubbornness: 7, expression: 3 }, { kindness: 3 }, "你站在他這邊，但也可能讓他更固執地抗拒改變。", "comfortable", { taurus_cafe_family_event: true }), "「我就知道，妳也會喜歡原本的樣子。」"),
      taurusDeepChoice(3, "說改裝也不錯，人總要往前。", effect({ affection: 2, trust: 6, stabilityNeed: -3, stubbornness: 10, overthinking: 8 }, { courage: 2 }, "你說的是現實，卻讓他覺得熟悉的東西被輕易放下。", "tense", { taurus_cafe_family_event: true }), "「往前不是問題。問題是，留下來的人怎麼辦。」"),
    ],
    [
      taurusDeepChoice(4, "輕聲問：糖放多了，還是你在吃醋？", effect({ affection: 9, trust: 10, possessiveness: -4, expression: 10, overthinking: -4 }, { charm: 2, courage: 2 }, "你把醋意說成可以討論的情緒，而不是指責。", "jealous"), "「……蛋糕確實偏甜。其他的，我還在想。」"),
      taurusDeepChoice(4, "假裝沒發現，稱讚蛋糕還是很好吃。", effect({ affection: 8, trust: 3, possessiveness: 8, stabilityNeed: 4, expression: -2, overthinking: 5 }, { kindness: 2 }, "你保護了他的面子，也讓悶醋繼續悶著。", "comfortable"), "「妳覺得好吃就好。」"),
      taurusDeepChoice(4, "故意說下次也可以找那位同學一起試吃。", effect({ affection: 2, trust: -1, possessiveness: 14, stubbornness: 5, overthinking: 12 }, { social: 2 }, "你想讓氣氛自然，卻讓他把自己想得更遠。", "tense"), "「不用。試吃名額有限。」"),
    ],
    [
      taurusDeepChoice(5, "直接說：不要自己想完又退後，先問我。", effect({ affection: 8, trust: 15, possessiveness: -5, expression: 12, overthinking: -12, stubbornness: -5 }, { courage: 4 }, "你切斷他的鑽牛角尖，也給他一條回來的路。", "honest", { taurus_dont_retreat: true }), "「我以為問了會更難看。好，我問。」"),
      taurusDeepChoice(5, "給他空間，等他自己想通。", effect({ affection: 5, trust: 6, stabilityNeed: 4, overthinking: 8, expression: -3 }, { mystery: 2 }, "你很體貼，但他的慢熱可能慢到錯過。", "unresolved"), "「謝謝。只是我想太久，有時候會走偏。」"),
      taurusDeepChoice(5, "生氣問他是不是不想理你了。", effect({ affection: -2, trust: -4, possessiveness: 6, overthinking: 10, expression: 4 }, { courage: 2 }, "你的不安是真實的，但他會更怕自己造成負擔。", "tense"), "「不是。我只是……不知道怎麼待在妳旁邊才不奇怪。」"),
    ],
    [
      taurusDeepChoice(6, "接過甜點，但請他把想說的話也一起給你。", effect({ affection: 10, trust: 14, expression: 14, stubbornness: -8, overthinking: -6 }, { kindness: 2, courage: 2 }, "你接受他的方式，也要求他向前一步。", "intimate", { taurus_say_the_feeling: true }), "「我想說的是，這不是試作。是給妳的。」"),
      taurusDeepChoice(6, "收下甜點，不追問，讓他保留節奏。", effect({ affection: 9, trust: 6, stabilityNeed: 6, stubbornness: 4, expression: -2 }, { kindness: 3 }, "你保護他的慢熱，也可能讓他繼續不說。", "comfortable"), "「嗯。路上小心。盒子不要斜放。」"),
      taurusDeepChoice(6, "說你不想一直猜甜點背後的意思。", effect({ affection: 2, trust: 10, expression: 8, stubbornness: 5, overthinking: 4 }, { courage: 3 }, "你說中疲憊感，他會痛，但也會知道沉默不是溫柔的全部。", "tense"), "「對不起。我以為妳懂，就不用說。」"),
    ],
    [
      taurusDeepChoice(7, "告訴他：我不會因為你說喜歡就被嚇跑。", effect({ affection: 10, trust: 15, expression: 16, stabilityNeed: -4, overthinking: -8 }, { kindness: 3, courage: 2 }, "你給他安全感，也讓告白不再像破壞穩定。", "intimate"), "「妳這樣講，我會真的想相信。」"),
      taurusDeepChoice(7, "說那就慢慢來，不急著定義。", effect({ affection: 8, trust: 8, stabilityNeed: 8, expression: 3, overthinking: 2 }, { kindness: 2, mystery: 1 }, "你尊重節奏，但也可能讓他繼續停在照顧裡。", "comfortable"), "「慢慢來我很擅長。只是我怕太慢。」"),
      taurusDeepChoice(7, "問他是不是沒有把握，所以才一直拖。", effect({ affection: 3, trust: 10, stubbornness: 8, expression: 8, overthinking: 4 }, { courage: 3 }, "問題刺到他的固執，也讓他不得不看見自己在逃避。", "tense"), "「不是沒把握。是太有把握，反而怕失去。」"),
    ],
    [
      taurusDeepChoice(8, "看著筆記說：原來你一直把我放進明天。", effect({ affection: 12, trust: 16, expression: 14, stabilityNeed: -3, overthinking: -8 }, { kindness: 3, intelligence: 1 }, "你讀懂蛋糕背後的時間，也讓他願意承認。", "intimate", { taurus_say_the_feeling: true }), "「嗯。每一次調整，都有想到妳。」"),
      taurusDeepChoice(8, "害羞轉移話題，說蛋糕看起來很好吃。", effect({ affection: 9, trust: 5, stabilityNeed: 4, expression: -2, overthinking: 5 }, { charm: 2 }, "甜蜜留在甜點裡，心意還是沒完全說出口。", "playful"), "「妳想吃的話，我現在切。」"),
      taurusDeepChoice(8, "問他為什麼不早點告訴你。", effect({ affection: 5, trust: 12, expression: 10, stubbornness: 3, overthinking: -2 }, { courage: 3 }, "你讓他面對拖延的代價。", "honest"), "「因為我怕說出來以後，就不能假裝只是順手了。」"),
    ],
    [
      taurusDeepChoice(9, "核心選擇：放進菜單，也親口告訴我它代表什麼。", effect({ affection: 18, trust: 18, stabilityNeed: -8, possessiveness: -8, stubbornness: -10, expression: 22, overthinking: -14 }, { courage: 3, kindness: 3 }, "他把藏起來的心意分享出來，甜味不再只靠猜。", "intimate", { taurus_say_the_feeling: true }), "「這是我喜歡妳的方式。以前藏在甜點裡，現在我想說出來。」"),
      taurusDeepChoice(9, "讓它只當你的隱藏菜單，保留你們的小秘密。", effect({ affection: 14, trust: 6, stabilityNeed: 10, possessiveness: 10, expression: -4, overthinking: 8 }, { mystery: 3 }, "秘密很甜，卻也讓他的佔有和沉默更有理由留下。", "dependent"), "「只給妳也很好。只是……我又不用說了。」"),
      taurusDeepChoice(9, "說先不要放菜單，等他真的想清楚再說。", effect({ affection: 4, trust: 12, stabilityNeed: -2, possessiveness: -2, expression: 6, overthinking: -4 }, { intelligence: 2, mystery: 2 }, "你給了時間，也可能讓告白錯過溫度。", "farewell"), "「好。我會想清楚。這次不會想完就退後。」"),
    ],
  ];
  return sets[stage];
};

const taurusDeepScenes: Scene[] = taurusDeepStages.map((stage, index) => ({
  id: `taurus-deep-${index}-start`,
  title: stage.title,
  location: stage.location,
  characterId: "taurus",
  text: stage.text,
  choices: taurusDeepChoices(index),
}));

const cancerDeepChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 9 ? `cancer-deep-${stage + 1}-start` : undefined,
  resultText,
});

const cancerDeepStages = [
  {
    title: "隔壁的早晨：多做的一份便當",
    location: "你家門口",
    text:
      "早自習前，門鈴響了一聲。\n\n沈泊安站在門外，手裡拎著兩個便當袋，像這件事從小到大都沒有改變過。\n\n「我媽今天煮太多。」他說。\n\n可是你知道，那個便當盒裡永遠沒有你不吃的青椒，也永遠會多一顆半熟蛋。\n\n他太熟悉你了，熟悉到你差點忘了，熟悉也可能是一種喜歡。",
  },
  {
    title: "下雨天：同一把傘的距離",
    location: "校門口",
    text:
      "放學時雨突然落下來，沈泊安照例把傘往你那邊偏。\n\n他的左肩很快濕了一片，卻只說：「我家近，沒差。」\n\n你們一起走過無數次這條路。\n\n今天不知道為什麼，傘下的距離比平常更安靜。",
  },
  {
    title: "便利商店：被忽略的習慣",
    location: "你家樓下便利商店",
    text:
      "你和新認識的同學聊到很晚，才想起沈泊安本來說要在便利商店等你一起回家。\n\n他坐在靠窗的位置，桌上有一瓶你常喝的牛奶。\n\n「沒關係，剛好我也想買東西。」\n\n他笑得很自然，自然到你差點相信他真的沒等很久。",
  },
  {
    title: "家庭晚餐：懂事的小孩",
    location: "沈家餐桌",
    text:
      "沈泊安家裡很熱鬧，飯菜香、電視聲、家人互相提醒明天的行程。\n\n他很自然地替弟弟夾菜，替媽媽收盤子，順手幫你把湯放涼。\n\n沒有人逼他，可每個人都習慣他可靠。\n\n你忽然明白，他不是受了多大的傷，只是太早學會把自己的需求排到最後。",
  },
  {
    title: "便當盒字條：沒說出口的在意",
    location: "教室午休",
    text:
      "你打開便當盒時，盒蓋裡貼著一張小字條。\n\n「今天社團會晚，記得先吃，不要等我。」\n\n字很小，像寫的人不希望被當成告白。\n\n你抬頭看他，他正低頭整理課本，耳尖卻紅得很誠實。",
  },
  {
    title: "吃醋的照顧：多一層外套",
    location: "放學走廊",
    text:
      "你提到今天有學長陪你去社團教室搬東西。\n\n沈泊安點點頭，說：「那很好，他比較高。」\n\n下一秒，他把外套塞進你手裡。\n\n「晚點會降溫。」\n\n他沒有問你和學長聊了什麼，只是把照顧做得比平常更密。",
  },
  {
    title: "不是家人：最熟悉的位置",
    location: "河堤旁",
    text:
      "你們坐在河堤邊吃冰。\n\n沈泊安忽然問：「如果有一天，你有喜歡的人，還會跟我說嗎？」\n\n他的聲音很輕，像只是隨口聊天。\n\n但你看見他沒有看你。\n\n他害怕自己只是你生命裡太方便、太熟悉、所以不會被選擇的人。",
  },
  {
    title: "第一次說想要",
    location: "便利商店後巷",
    text:
      "你問他是不是永遠都只會說沒關係。\n\n沈泊安沉默很久，手指捏著便當袋提把。\n\n「我怕我說想要，你會覺得被我綁住。」\n\n他終於看向你。\n\n「可是我也會想要。想要你不是因為習慣，才回頭找我。」",
  },
  {
    title: "未接來電：安全感不是猜出來的",
    location: "雨夜公車站",
    text:
      "社團結束後雨勢變大，你手機裡有沈泊安的三通未接來電。\n\n他趕到公車站時，校服袖口全濕了。\n\n「我不是要管你。」他先說。\n\n然後又低聲補了一句：「我只是會擔心。可是如果我不說，你也不會知道。」",
  },
  {
    title: "回家的路：清楚給出的選擇",
    location: "你們家之間的小巷",
    text:
      "雨停後，路燈把兩個人的影子拉得很長。\n\n沈泊安走在你旁邊，這一次沒有替你把話說完，也沒有把心意藏進便當或傘裡。\n\n他問：「如果不是因為住隔壁、不是因為從小一起長大，你還會選我嗎？」\n\n這不是逼問。\n\n是他第一次，把想被選擇的心情好好放到你面前。",
  },
];

const cancerDeepChoices = (stage: number): Choice[] => {
  const sets: Choice[][] = [
    [
      cancerDeepChoice(0, "接過便當，認真說你有發現他一直記得你的習慣。", effect({ affection: 8, trust: 10, jealousy: -2, selfAwareness: 4 }, { kindness: 3 }, "你把他的照顧從理所當然裡拿出來，好好看見。", "comfortable", { cancer_noticed_care: true }), "「有發現就好。我還以為妳只記得半熟蛋。」"),
      cancerDeepChoice(0, "開玩笑說他根本是鄰家保母。", effect({ affection: 7, trust: 3, jealousy: 3 }, { charm: 3 }, "玩笑很熟悉，卻也讓他把心意重新藏回日常。", "playful"), "「保母至少有薪水。我這個比較虧。」"),
      cancerDeepChoice(0, "說不用每次都替你準備，你自己也可以買。", effect({ affection: 2, trust: 6, jealousy: 2, selfAwareness: 6 }, { courage: 2 }, "你不是拒絕他，只是提醒照顧也需要被選擇。", "honest"), "「我知道妳可以。只是我想做。」"),
    ],
    [
      cancerDeepChoice(1, "把傘推回中間，說安全感不是讓他一個人淋濕。", effect({ affection: 9, trust: 12, jealousy: -3, selfAwareness: 6 }, { kindness: 3, courage: 1 }, "你讓照顧變成雙向，他有點不習慣，卻很安心。", "honest"), "「那妳走慢一點。這樣我比較好把傘拿正。」"),
      cancerDeepChoice(1, "自然靠近一點，像以前那樣讓他照顧。", effect({ affection: 10, trust: 4, jealousy: 4 }, { kindness: 2 }, "親近很甜，卻也可能讓他繼續只用照顧表達。", "comfortable"), "「小心積水。妳每次都不看路。」"),
      cancerDeepChoice(1, "說你等雨小再走，不想麻煩他。", effect({ affection: -1, trust: 3, jealousy: 7, selfAwareness: 4 }, { mystery: 2 }, "你的客氣讓他覺得自己正在從熟悉的位置退開。", "distant"), "「麻煩嗎？我以為我們不用這樣算。」"),
    ],
    [
      cancerDeepChoice(2, "向他道歉，承認你把他的等待想得太理所當然。", effect({ affection: 8, trust: 14, jealousy: -5, selfAwareness: 8 }, { kindness: 2, courage: 2 }, "你沒有只收下他的沒關係，而是看見沒關係背後的失落。", "honest", { cancer_not_taken_for_granted: true }), "「其實也沒有等很久。好吧，有一點。」"),
      cancerDeepChoice(2, "撒嬌說你就知道他一定會等你。", effect({ affection: 11, trust: 2, jealousy: 8 }, { charm: 3 }, "他被你依賴得很開心，也更怕自己只是你的習慣。", "dependent"), "「嗯。我會等。可是妳不要太放心。」"),
      cancerDeepChoice(2, "解釋同學有事才聊晚，請他別想太多。", effect({ affection: 4, trust: 6, jealousy: 6 }, { social: 2 }, "解釋有用，但他真正想聽的是你有沒有在意他的等待。", "unresolved"), "「我沒有想太多。只是牛奶快不冰了。」"),
    ],
    [
      cancerDeepChoice(3, "飯後陪他洗碗，問他今天有沒有哪件事是為自己做的。", effect({ affection: 9, trust: 13, jealousy: -2, selfAwareness: 10 }, { kindness: 3, intelligence: 1 }, "你沒有把他的可靠當背景，而是問到他本人。", "intimate", { cancer_family_responsibility: true }), "「為自己？我想想……好像真的沒有。」"),
      cancerDeepChoice(3, "稱讚他真的很會照顧家人。", effect({ affection: 10, trust: 5, selfAwareness: 1 }, { kindness: 2, social: 1 }, "稱讚讓他溫暖，也可能讓他更難從可靠角色裡下班。", "comfortable", { cancer_family_responsibility: true }), "「習慣了。大家方便就好。」"),
      cancerDeepChoice(3, "開玩笑說他以後一定很適合當兒科醫師。", effect({ affection: 8, trust: 6, selfAwareness: 4 }, { charm: 2, social: 1 }, "未來被輕輕點亮，但他的現在還在替所有人打點。", "playful", { cancer_family_responsibility: true }), "「如果小朋友比妳乖，應該不難。」"),
    ],
    [
      cancerDeepChoice(4, "把字條收好，對他說：這不是順手吧。", effect({ affection: 8, trust: 12, jealousy: -2, selfAwareness: 6 }, { courage: 2, kindness: 2 }, "你讓心意從便當盒底浮上來，他慌，卻沒有否認。", "honest", { cancer_noticed_care: true }), "「不是每件事都要拆穿。可是……也不是順手。」"),
      cancerDeepChoice(4, "假裝沒看到，照常吃完便當。", effect({ affection: 6, trust: 2, jealousy: 5 }, { kindness: 1 }, "你保護了他的害羞，也讓心意繼續無名。", "unresolved"), "「今天的玉子燒還可以嗎？」"),
      cancerDeepChoice(4, "回一張字條：下次你也要先吃。", effect({ affection: 10, trust: 10, jealousy: -3, selfAwareness: 8 }, { kindness: 3 }, "你把照顧還給他，讓他知道自己也可以被放在心上。", "comfortable"), "「妳字好醜。可是我會留著。」"),
    ],
    [
      cancerDeepChoice(5, "問他：你是不是吃醋，但不想讓我有壓力？", effect({ affection: 7, trust: 14, jealousy: -6, selfAwareness: 8 }, { courage: 3, kindness: 1 }, "你把他的醋意說成可以被理解的擔心，而不是束縛。", "jealous"), "「我不想變成那種會管妳的人。可是我確實會在意。」"),
      cancerDeepChoice(5, "收下外套，說他真的最可靠。", effect({ affection: 11, trust: 3, jealousy: 8 }, { kindness: 2 }, "可靠被肯定了，但他又站回最熟悉也最孤單的位置。", "dependent"), "「可靠就好。其他的……以後再說。」"),
      cancerDeepChoice(5, "把外套還給他，說你不想讓他誤會。", effect({ affection: -2, trust: 4, jealousy: 10, selfAwareness: 5 }, { mystery: 2 }, "你想清楚界線，但語氣讓他以為自己連照顧都越界了。", "distant"), "「我知道了。那妳回家路上小心。」"),
    ],
    [
      cancerDeepChoice(6, "清楚告訴他：如果我喜歡誰，我會第一個跟你說。", effect({ affection: 9, trust: 12, jealousy: -5 }, { kindness: 2, courage: 2 }, "你給了他安全感，但還沒有回答他真正想知道的位置。", "comfortable"), "「第一個嗎？這樣好像也不錯。」"),
      cancerDeepChoice(6, "反問他：那你希望自己在我心裡是什麼位置？", effect({ affection: 8, trust: 15, jealousy: -4, selfAwareness: 10 }, { courage: 3, intelligence: 1 }, "你沒有替他猜答案，而是讓他練習說出需求。", "honest", { cancer_asked_his_want: true }), "「我希望……不是只在妳需要人的時候才被想起。」"),
      cancerDeepChoice(6, "說你們不是早就像家人一樣了嗎？", effect({ affection: 2, trust: 1, jealousy: 12, selfAwareness: -2 }, { kindness: 1 }, "家人很溫暖，卻剛好刺到他最害怕的位置。", "tense"), "「像家人啊。嗯，聽起來很安全。」"),
    ],
    [
      cancerDeepChoice(7, "說：你可以想要我，這不等於束縛我。", effect({ affection: 12, trust: 16, jealousy: -7, selfAwareness: 12 }, { courage: 3, kindness: 3 }, "你把他的需求和控制分開，他終於能說得更靠近一點。", "intimate", { cancer_i_want: true }), "「那我想要妳選我。不是因為習慣，是因為妳真的想。」"),
      cancerDeepChoice(7, "溫柔說你知道他一直都對你很好。", effect({ affection: 10, trust: 6, jealousy: 3 }, { kindness: 3 }, "你感謝了他的好，卻還沒有碰到他想被選擇的心。", "comfortable"), "「嗯。妳知道就好。大概吧。」"),
      cancerDeepChoice(7, "說你現在還分不清依賴和喜歡。", effect({ affection: -2, trust: 10, jealousy: 4, selfAwareness: 10 }, { intelligence: 2, mystery: 2 }, "這句話會讓他難過，但至少你沒有用模糊的溫柔拖住他。", "unresolved"), "「謝謝妳說實話。我會有點難過，但我聽得懂。」"),
    ],
    [
      cancerDeepChoice(8, "告訴他：你可以擔心，但也要直接說你需要我回訊息。", effect({ affection: 9, trust: 15, jealousy: -6, selfAwareness: 10 }, { courage: 3, kindness: 2 }, "安全感被說清楚後，就不需要靠猜。", "honest", { cancer_clear_safety: true }), "「那我需要。至少到家跟我說一聲。」"),
      cancerDeepChoice(8, "抱歉讓他擔心，承諾以後都讓他知道行程。", effect({ affection: 12, trust: 5, jealousy: 4 }, { kindness: 3 }, "承諾很甜，但如果沒有互相說清楚，容易變成單方面報備。", "dependent"), "「不用全部都告訴我。我不是那個意思。」"),
      cancerDeepChoice(8, "說他不用這麼緊張，你又不是小孩。", effect({ affection: -3, trust: 2, jealousy: 8, selfAwareness: 3 }, { courage: 2 }, "你拒絕被管是合理的，但他聽見的是自己的擔心被推遠。", "tense"), "「我知道。對不起，我只是……算了。」"),
    ],
    [
      cancerDeepChoice(9, "核心選擇：我選你，不是因為習慣，是因為你是沈泊安。", effect({ affection: 18, trust: 18, jealousy: -12, selfAwareness: 14 }, { courage: 3, kindness: 3 }, "你把選擇清楚給出去，他也終於不必躲在順手和剛好後面。", "intimate", { cancer_clear_choice: true, cancer_i_want: true }), "「那我也想清楚說。我喜歡妳，也想被妳喜歡。」"),
      cancerDeepChoice(9, "說你很珍惜他，但希望先停在最重要的朋友。", effect({ affection: -2, trust: 12, jealousy: -4, selfAwareness: 8 }, { kindness: 2, mystery: 2 }, "這不是他最想要的答案，卻讓彼此不用靠猜維持溫柔。", "farewell"), "「嗯。至少這次，我知道自己不是被忽略。」"),
      cancerDeepChoice(9, "說不用問這麼明白，你們一直都會在彼此身邊。", effect({ affection: 10, trust: 4, jealousy: 8, selfAwareness: -2 }, { kindness: 2 }, "答案很溫暖，卻仍然模糊；他可能會繼續用照顧等你發現。", "dependent"), "「一直在很像答案，可是我好像還是會想聽妳說選我。」"),
    ],
  ];
  return sets[stage];
};

const cancerDeepScenes: Scene[] = cancerDeepStages.map((stage, index) => ({
  id: `cancer-deep-${index}-start`,
  title: stage.title,
  location: stage.location,
  characterId: "cancer",
  text: stage.text,
  choices: cancerDeepChoices(index),
}));

const piscesChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 4 ? `pisces-${stage + 1}-start` : undefined,
  resultText,
});

const piscesStages = [
  {
    title: "音樂社初遇：停在半拍前的歌",
    location: "音樂社練習室",
    text:
      "放學後的練習室只剩一盞燈。霧島凜坐在鋼琴前，旋律在最柔軟的地方忽然停住。\n\n他回頭看見你，先笑了一下，像怕自己的沉默害你尷尬。\n\n「抱歉，剛剛那段不好聽吧？」他把譜紙反扣，指尖卻還停在顫抖的位置。\n\n你感覺到他不是單純害羞，而是太習慣先照顧別人的感受。",
  },
  {
    title: "家庭語音：他不是誰的情緒容器",
    location: "走廊盡頭的窗邊",
    text:
      "午休時，他的手機震了又震。來電顯示是家人。\n\n凜看著螢幕，熟練地把笑容放回臉上：「沒事啦，我等等回。家裡只是又有點情緒。」\n\n他說得很輕，像這不是負擔，只是他每天固定要練的一首曲子。\n\n你第一次看見，所謂溫柔也可能是一種太早學會的求生方式。",
  },
  {
    title: "戀愛衝突：安慰不是無限承諾",
    location: "雨天校門口",
    text:
      "雨很大，凜站在校門口等你。你提到今天有點累，他立刻說可以陪你到很晚，甚至可以取消自己的練習。\n\n可是他眼底明明也很疲憊。\n\n你忽然明白，你們的衝突不是誰不夠喜歡誰，而是他一靠近就想把自己全部交出去，像只要照顧好你，他就不會被丟下。",
  },
  {
    title: "核心傷口：如果我不溫柔，還值得被愛嗎",
    location: "空教室的鋼琴旁",
    text:
      "練習到一半，他終於停下。\n\n「我有時候會想，如果我不安慰人、不體貼、不把大家的心情都接住……我還剩下什麼？」\n\n那句話沒有哭腔，卻比哭更像溺水。\n\n你站在他旁邊，知道這次不能只說『我會一直陪你』。因為愛不是把他拉上岸，也不是陪他一起沉下去。",
  },
  {
    title: "分歧：一起找到能呼吸的地方",
    location: "校園小劇場",
    text:
      "校內小演出前，凜把寫好的曲子交給你。\n\n標題是《岸》。\n\n他說：「我還是會害怕。怕我不夠好，怕我只會讓別人覺得沉重。」\n\n聚光燈還沒亮，你們站在舞台邊緣。這一次，你的回答會決定你們走向哪一種結局。",
  },
];

const piscesChoices = (stage: number): Choice[] => {
  const sets: Choice[][] = [
    [
      piscesChoice(0, "溫柔稱讚他的旋律，說你願意聽他彈到什麼時候都可以。", effect({ affection: 12, trust: 5, overwhelm: 10 }, { kindness: 3 }, "你給了他安心，但也讓他更容易把你當成唯一出口。", "dependent"), "真的嗎？那我是不是可以再任性一點點。"),
      piscesChoice(0, "問他：這首歌停住的地方，是不是你真正想說的地方？", effect({ affection: 8, trust: 10, selfAwareness: 12, overwhelm: 2 }, { intelligence: 2, kindness: 2 }, "你沒有急著安慰，而是看見旋律裡的真相。", "curious"), "妳聽得出來？我以為我藏得很好。"),
      piscesChoice(0, "開玩笑說旋律很美，但譜紙反扣的動作更可疑。", effect({ affection: 9, trust: 4, selfAwareness: 5, overwhelm: -2 }, { charm: 2, social: 2 }, "輕鬆讓他笑了，也留下一點能繼續談的空間。", "playful"), "被發現了。妳不要太會觀察好不好。"),
    ],
    [
      piscesChoice(1, "立刻說你可以陪他一起處理家裡所有事情。", effect({ affection: 12, trust: 3, boundary: -8, overwhelm: 18 }, { kindness: 4 }, "過度承諾讓他感動，也讓你們一起靠近情緒漩渦。", "dependent"), "妳這樣說，我會真的想依賴妳。這樣很糟吧。"),
      piscesChoice(1, "說：你可以晚一點回，但不代表你不愛他們。", effect({ affection: 8, trust: 12, boundary: 14, selfAwareness: 12, overwhelm: -8 }, { kindness: 2, courage: 2 }, "你替他打開一個不必立刻自責的空間。", "honest"), "原來……可以晚一點嗎？我一直以為不行。"),
      piscesChoice(1, "直接點破：你是不是把所有人的情緒都當成自己的責任？", effect({ affection: -2, trust: 8, selfAwareness: 16, overwhelm: 6 }, { courage: 3, intelligence: 2 }, "這句話很痛；信任夠時會成長，不夠時會退縮。", "tense"), "妳講話好直接。可是我……好像反駁不了。"),
    ],
    [
      piscesChoice(2, "接受他取消練習陪你，因為你也真的很需要他。", effect({ affection: 14, trust: 2, boundary: -10, overwhelm: 16 }, { kindness: 2 }, "心動變甜了，但他的自我照顧又往後退了一步。", "dependent"), "如果妳需要我，我就會在。一直都在。"),
      piscesChoice(2, "牽住他的袖口，說你想見他，但不想讓他放棄自己的練習。", effect({ affection: 10, trust: 12, boundary: 15, selfAwareness: 10, overwhelm: -8 }, { kindness: 3, courage: 2 }, "你沒有拒絕他的靠近，而是替關係留出呼吸。", "comfortable"), "這樣也算喜歡嗎？不是把所有時間都給對方，也可以嗎？"),
      piscesChoice(2, "冷靜排時間：先送你到車站，再讓他回去練最後半小時。", effect({ affection: 6, trust: 13, boundary: 10, selfAwareness: 8, overwhelm: -6 }, { intelligence: 3 }, "現實安排不浪漫，卻讓兩個人都沒有被犧牲。", "curious"), "妳連我逃避練習都算進去了。好可怕，但謝謝。"),
    ],
    [
      piscesChoice(3, "抱住他，承諾不管發生什麼你都永遠不會離開。", effect({ affection: 16, trust: 4, boundary: -12, overwhelm: 20 }, { kindness: 4 }, "承諾很甜，卻重到像另一種壓力。", "dependent"), "不要說永遠。可是我好想相信。"),
      piscesChoice(3, "告訴他：你值得被愛，不是因為你能接住所有人的情緒。", effect({ affection: 12, trust: 14, boundary: 10, selfAwareness: 16, overwhelm: -8 }, { kindness: 3, courage: 3 }, "你說中的不是表面，而是他最深的恐懼。", "honest"), "如果我真的不用一直溫柔……我可能會先哭一下。"),
      piscesChoice(3, "先沉默陪他坐一會，再問他今天想為自己做哪一件小事。", effect({ affection: 8, trust: 16, boundary: 12, selfAwareness: 14, overwhelm: -12 }, { mystery: 2, kindness: 2 }, "你沒有急著修好他，而是把選擇權還給他。", "intimate"), "我想把這首歌彈完。不是為了誰，只是為了我自己。"),
    ],
    [
      piscesChoice(4, "核心選擇：我會陪你，但我不會代替你呼吸。", effect({ affection: 18, trust: 18, boundary: 18, selfAwareness: 18, overwhelm: -16 }, { courage: 3, kindness: 3 }, "你選中的不是拯救，而是一起面對關係的方式。", "intimate", { pisces_core: true }), "那我可以慢慢學嗎？學著不把自己丟進每一場海裡。"),
      piscesChoice(4, "說你會一直當他的岸，只要他難過就可以來找你。", effect({ affection: 14, trust: 5, boundary: -8, selfAwareness: 2, overwhelm: 18 }, { kindness: 4 }, "他很感動，但也更難學會自己站穩。", "dependent"), "妳太好了。好到我會害怕沒有妳就不行。"),
      piscesChoice(4, "說先保持朋友距離，等他能分清依賴和喜歡再談。", effect({ affection: -2, trust: 12, boundary: 16, selfAwareness: 14, overwhelm: -10 }, { intelligence: 2, mystery: 3 }, "這不是甜蜜回答，卻可能是最負責任的溫柔。", "farewell"), "我會難過，但我知道妳不是不要我。妳是在讓我長大。"),
    ],
  ];
  return sets[stage];
};

const piscesScenes: Scene[] = piscesStages.map((stage, index) => ({
  id: `pisces-${index}-start`,
  title: `${stage.title}：霧島凜`,
  location: stage.location,
  characterId: "pisces",
  text: stage.text,
  choices: piscesChoices(index),
}));

const virgoDeepChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 9 ? `virgo-deep-${stage + 1}-start` : undefined,
  resultText,
});

const virgoDeepStages = [
  {
    title: "走廊初遇：違規奔跑",
    location: "二樓走廊",
    text:
      "午休鐘聲剛響，你抱著作業本衝過走廊，差點撞上一排風紀委員。\n\n顧硯抬手攔住你，白襯衫扣子扣到最上面，臂章端正得像教務處海報。\n\n『走廊奔跑，扣班級秩序分。』\n\n他低頭在紀錄板上寫字，又補了一句：『還有，妳鞋帶鬆了。這不是提醒，是避免二次違規。』",
  },
  {
    title: "補習班重逢：錯題比偶遇準時",
    location: "補習班自習室",
    text:
      "晚上補習班，你剛坐下，就發現顧硯坐在隔壁桌。\n\n他看了一眼你的數學卷，眉頭微不可察地皺起。\n\n『同一種題型錯第二次，表示妳不是不會，是沒有整理。』\n\n他把紅筆放到你桌上，語氣冷淡得像講義答案，卻把最亮的檯燈轉向你這邊。",
  },
  {
    title: "錯題本：只是受不了重複錯誤",
    location: "圖書館靠窗座位",
    text:
      "隔天，顧硯把一本貼滿索引標籤的錯題本放到你面前。\n\n每一頁都有題型、錯因、修正方法，甚至標了你最容易恍神的時間。\n\n你抬頭看他。\n\n他立刻移開視線：『不要誤會。我只是受不了同一個錯誤反覆出現。』\n\n可是錯題本最後一頁，夾著一顆喉糖。",
  },
  {
    title: "風紀衝突：照規定處理的誤會",
    location: "校門口",
    text:
      "你因為替同學拿外套，被誤會違反制服規定。\n\n顧硯看完現場狀況，仍依規定登記你的名字。\n\n『我會註明情況，但程序不能跳過。』\n\n你覺得胸口悶了一下。明明他知道你不是故意的，卻還是站在規則那邊。\n\n他握著筆的手指收緊，卻沒有解釋。",
  },
  {
    title: "家庭電話：不能出錯的人",
    location: "補習班樓梯間",
    text:
      "補習結束後，你在樓梯間聽見顧硯接電話。\n\n電話那頭的聲音不大，卻字字清楚：『你是年級第一，不要讓我們失望。一次失常都不應該。』\n\n顧硯回答：『我知道。』\n\n掛掉電話後，他把錯題本翻到空白頁，像準備把自己也列成待訂正項目。",
  },
  {
    title: "考試失常：年級第一被拿走",
    location: "公布欄前",
    text:
      "段考排名公布，顧硯站在公布欄前很久。\n\n第一名不是他。\n\n旁邊有人小聲說：『原來顧硯也會失手。』\n\n他表情沒有變，只把成績單折得很整齊。\n\n『錯在時間分配。我會修正。』\n\n但你看見他的指尖在發抖。",
  },
  {
    title: "時間表：替你安排所有可能",
    location: "圖書館討論室",
    text:
      "顧硯遞給你一張新的時間表。\n\n上面精確到五分鐘：補習、複習、社團、休息，連走到飲水機的時間都被估算進去。\n\n『照這個走，妳不會失敗。』\n\n他說得像在保護你，卻也像怕只要一個變數失控，你就會受傷。",
  },
  {
    title: "他的害怕：計畫之外怎麼保護你",
    location: "雨天校舍後門",
    text:
      "突然下雨，原本的放學計畫全亂了。\n\n顧硯拿著傘，卻遲遲沒有走。\n\n他低聲說：『如果事情沒有照計畫走，我不知道怎麼保護重要的人。』\n\n那句重要的人被雨聲蓋掉一半，卻還是落進你心裡。\n\n他立刻補充：『我的意思是，同學之間應有基本互助。』",
  },
  {
    title: "先聽再修正",
    location: "自習室角落",
    text:
      "你今天讀不下書，顧硯拿起紅筆又放下。\n\n他像在和自己的習慣拔河。\n\n『我現在有兩個選項。第一，指出妳進度落後。第二，先問妳需要建議還是陪伴。』\n\n他停了兩秒，耳尖微紅。\n\n『所以，妳需要哪一個？』",
  },
  {
    title: "期末前夕：留白的公式",
    location: "圖書館閉館前",
    text:
      "期末前夕，顧硯的複習計畫完美得沒有縫隙。\n\n你卻因為家裡臨時有事，錯過了最重要的一段複習。\n\n他看著時間表，沉默很久。\n\n只要照原計畫，他可以穩穩拿回第一名。\n\n可如果去陪你，他的計畫會第一次留下無法預測的空白。",
  },
];

const virgoDeepChoices = (stage: number): Choice[] => {
  const sets: Choice[][] = [
    [
      virgoDeepChoice(0, "乖乖停下道歉，順手把鞋帶綁好。", effect({ affection: 6, trust: 8, rulePressure: -2, careExpression: 3, selfCompassion: 2, control: -2 }, { kindness: 2 }, "你沒有挑戰他的規則，也讓他看見你願意修正。", "comfortable"), "態度合格。下次請在違規前修正。"),
      virgoDeepChoice(0, "吐槽：風紀委員連鞋帶都要管嗎？", effect({ affection: 9, trust: 3, rulePressure: 4, careExpression: 4, selfCompassion: 1, control: 2 }, { charm: 3 }, "他被你噎住，關心卻還是藏在規則裡。", "playful"), "如果妳跌倒，我還要寫事故紀錄。麻煩。"),
      virgoDeepChoice(0, "覺得他太不近人情，直接說你又不是故意的。", effect({ affection: 2, trust: 2, rulePressure: 8, careExpression: -2, selfCompassion: -1, control: 6 }, { courage: 2 }, "你說出委屈，也讓他更用規則保護自己。", "tense"), "規則不判斷動機，只處理結果。"),
    ],
    [
      virgoDeepChoice(1, "承認自己沒整理錯題，請他教你方法。", effect({ affection: 8, trust: 10, rulePressure: -3, careExpression: 6, selfCompassion: 4, control: -2 }, { intelligence: 3 }, "你接受他的嚴格，也讓嚴格變成幫忙。", "comfortable"), "至少妳知道問題在哪。這比盲目努力有效。"),
      virgoDeepChoice(1, "嘴硬回他：你講話可以不要像批改機嗎？", effect({ affection: 7, trust: 5, rulePressure: 4, careExpression: 5, selfCompassion: 2, control: 1 }, { charm: 2, courage: 1 }, "你戳中他的嘴硬，他一時找不到更柔軟的說法。", "playful"), "批改機不會調檯燈。"),
      virgoDeepChoice(1, "把卷子收起來，說你不想被審判。", effect({ affection: -1, trust: -3, rulePressure: 7, careExpression: -3, selfCompassion: -2, control: 5 }, { mystery: 2 }, "你保護了自尊，也讓他誤以為靠近會造成壓力。", "distant"), "我不是審判。只是指出錯誤。算了。"),
    ],
    [
      virgoDeepChoice(2, "翻到最後一頁，笑著問喉糖也是錯因分析嗎？", effect({ affection: 10, trust: 7, rulePressure: -4, careExpression: 9, selfCompassion: 3, control: -3 }, { charm: 3 }, "你看見他笨拙的關心，沒有拆穿得太用力。", "playful"), "那是防止妳補習時咳嗽影響效率。不要笑。"),
      virgoDeepChoice(2, "認真說：謝謝你花時間幫我整理。", effect({ affection: 8, trust: 12, rulePressure: -5, careExpression: 8, selfCompassion: 5, control: -4 }, { kindness: 3 }, "你把他的行動命名成關心，而不是只看見挑剔。", "honest"), "不是花時間。只是剛好有空。……不准追問。"),
      virgoDeepChoice(2, "說錯題本太可怕，你壓力更大了。", effect({ affection: 1, trust: 4, rulePressure: 9, careExpression: -2, selfCompassion: -2, control: 6 }, { courage: 2 }, "你的壓力是真實的，但他會以為自己又做錯了。", "tense"), "我以為這樣能降低錯誤率。看來方法需要修正。"),
    ],
    [
      virgoDeepChoice(3, "冷靜問他：你相信我，還是只相信程序？", effect({ affection: 4, trust: 12, rulePressure: -6, careExpression: 5, selfCompassion: 7, control: -4 }, { courage: 3, intelligence: 1 }, "你讓他第一次看見規則之外還有信任。", "honest"), "我……相信妳。但程序是我能保護妳的方式。"),
      virgoDeepChoice(3, "生氣離開，覺得他根本不站在你這邊。", effect({ affection: -4, trust: -8, rulePressure: 8, careExpression: -4, selfCompassion: -3, control: 7 }, { courage: 2 }, "誤會變深，他也更不敢用自己的判斷靠近你。", "distant"), "我不是那個意思。……但紀錄已經寫了。"),
      virgoDeepChoice(3, "接受登記，但要求他之後聽你把事情說完。", effect({ affection: 7, trust: 10, rulePressure: -3, careExpression: 6, selfCompassion: 5, control: -2 }, { social: 2, courage: 2 }, "你沒有否定規則，也要求他學會聽見人。", "comfortable"), "可以。程序完成後，我聽妳說完。"),
    ],
    [
      virgoDeepChoice(4, "不急著安慰，只說：你不是考卷，不需要被訂正。", effect({ affection: 9, trust: 15, rulePressure: -10, careExpression: 8, selfCompassion: 15, control: -8 }, { kindness: 3, courage: 2 }, "你把他從待訂正項目裡拉出來。", "intimate", { virgo_family_call: true, virgo_not_test_paper: true }), "這句話不精確。可是……我現在不想反駁。"),
      virgoDeepChoice(4, "替他分析家人的期待，幫他列出應對策略。", effect({ affection: 7, trust: 8, rulePressure: 5, careExpression: 4, selfCompassion: 3, control: 8 }, { intelligence: 4 }, "你很有用，但也讓他繼續把痛苦變成任務。", "curious", { virgo_family_call: true }), "策略有效。情緒部分……暫時跳過。"),
      virgoDeepChoice(4, "說難怪他那麼嚴格，原來是家裡要求。", effect({ affection: 2, trust: 3, rulePressure: 8, careExpression: -2, selfCompassion: -3, control: 5 }, { social: 1 }, "你說中了原因，卻讓他覺得自己被簡化成問題。", "tense", { virgo_family_call: true }), "請不要把我歸因成家庭作業。"),
    ],
    [
      virgoDeepChoice(5, "陪他坐在公布欄前，先不討論分數。", effect({ affection: 9, trust: 14, rulePressure: -8, careExpression: 8, selfCompassion: 12, control: -7 }, { kindness: 3, mystery: 1 }, "你讓失常不是立刻要被修正的事故。", "intimate"), "妳不問我哪裡錯？很不合理。可是我鬆了一口氣。"),
      virgoDeepChoice(5, "幫他檢討時間分配，讓他重新振作。", effect({ affection: 8, trust: 7, rulePressure: 7, careExpression: 4, selfCompassion: 1, control: 8 }, { intelligence: 4 }, "你幫他找回秩序，也讓自責繼續藏在效率裡。", "curious"), "謝謝。這樣至少有下一步。"),
      virgoDeepChoice(5, "說一次失常又不會怎樣，不用那麼誇張。", effect({ affection: -2, trust: -3, rulePressure: 5, careExpression: -3, selfCompassion: -4, control: 4 }, { courage: 2 }, "你想讓事情變輕，卻讓他覺得自己的痛被判定為小題大作。", "tense"), "對妳來說不會怎樣。對我不是。"),
    ],
    [
      virgoDeepChoice(6, "告訴他你願意參考，但生活不能全部被排進格子。", effect({ affection: 6, trust: 12, rulePressure: -6, careExpression: 6, selfCompassion: 8, control: -8 }, { courage: 3 }, "你接受他的心意，也守住自己的自由。", "honest"), "格子不是問題，問題是我把它排太滿。知道了。"),
      virgoDeepChoice(6, "照著時間表走，因為他這麼安排一定有道理。", effect({ affection: 12, trust: 4, rulePressure: 10, careExpression: 3, selfCompassion: -2, control: 12 }, { intelligence: 2 }, "他被信任了，卻更相信控制能保護關係。", "dependent"), "照表執行會有效。至少我能確定這一點。"),
      virgoDeepChoice(6, "把休息時間加長，說你要他也一起休息。", effect({ affection: 9, trust: 10, rulePressure: -5, careExpression: 8, selfCompassion: 8, control: -6 }, { kindness: 3, charm: 1 }, "你把關心反過來放進他的時間表。", "comfortable"), "我沒有需要休息。……但五分鐘可以。"),
    ],
    [
      virgoDeepChoice(7, "說：你不用靠完美計畫才能保護我。", effect({ affection: 9, trust: 15, rulePressure: -10, careExpression: 10, selfCompassion: 14, control: -10 }, { kindness: 3, courage: 2 }, "你直接碰到他的核心恐懼，卻不是責備。", "intimate"), "如果不靠計畫，我還剩什麼？……也許還有我自己。"),
      virgoDeepChoice(7, "開玩笑說他連心動都想排進行事曆。", effect({ affection: 10, trust: 5, rulePressure: -2, careExpression: 5, selfCompassion: 4, control: 1 }, { charm: 3 }, "玩笑讓他放鬆，但核心問題只被輕輕碰過。", "playful"), "心動無法排程。這就是它最大的缺陷。"),
      virgoDeepChoice(7, "問他是不是覺得你沒有他的安排就會失敗。", effect({ affection: 2, trust: 10, rulePressure: 3, careExpression: 4, selfCompassion: 7, control: -3 }, { courage: 3 }, "問題很尖銳，讓他看見保護和控制只差一線。", "tense"), "不是。我只是……很怕妳受傷。"),
    ],
    [
      virgoDeepChoice(8, "回答：我現在需要陪伴，不需要被訂正。", effect({ affection: 9, trust: 16, rulePressure: -9, careExpression: 14, selfCompassion: 12, control: -8 }, { kindness: 2, courage: 2 }, "你讓他練習先聽，而不是先修正。", "intimate", { virgo_listen_first: true }), "好。我把紅筆收起來。妳可以慢慢說。"),
      virgoDeepChoice(8, "回答：給我建議，但先不要罵我。", effect({ affection: 8, trust: 12, rulePressure: -4, careExpression: 10, selfCompassion: 8, control: -3 }, { intelligence: 2, charm: 1 }, "你保留他的擅長，也要求更柔軟的表達。", "comfortable", { virgo_listen_first: true }), "我沒有罵。只是語氣需要修正。這次我會注意。"),
      virgoDeepChoice(8, "說你沒事，讓他照原本方式講就好。", effect({ affection: 5, trust: 2, rulePressure: 7, careExpression: -2, selfCompassion: -2, control: 6 }, { mystery: 2 }, "你減少衝突，也讓他錯過練習溫柔的機會。", "unresolved"), "那我開始。第一，妳今天的效率明顯下降。"),
    ],
    [
      virgoDeepChoice(9, "核心選擇：在時間表上留下空白，陪我把今天走完。", effect({ affection: 18, trust: 18, rulePressure: -18, careExpression: 20, selfCompassion: 22, control: -18 }, { courage: 3, kindness: 3 }, "他第一次把不確定排進人生裡。", "intimate", { virgo_blank_formula: true }), "空白不是錯誤。這句我會記住。現在，我陪妳。"),
      virgoDeepChoice(9, "請他先照原計畫複習，你不想害他失常。", effect({ affection: 8, trust: 8, rulePressure: 8, careExpression: 4, selfCompassion: 2, control: 10 }, { kindness: 3 }, "你很替他著想，但也把他推回最安全的秩序。", "unresolved"), "妳總是很懂事。可我好像……沒有比較安心。"),
      virgoDeepChoice(9, "說你不需要他陪，讓他不要把你排進計畫。", effect({ affection: -2, trust: 10, rulePressure: -2, careExpression: -4, selfCompassion: 4, control: -2 }, { mystery: 3 }, "你保護了他的計畫，也讓關係停在沒有越線的位置。", "farewell"), "明白。那我尊重妳的選擇。"),
    ],
  ];
  return sets[stage];
};

const virgoDeepScenes: Scene[] = virgoDeepStages.map((stage, index) => ({
  id: `virgo-deep-${index}-start`,
  title: stage.title,
  location: stage.location,
  characterId: "virgo",
  text: stage.text,
  choices: virgoDeepChoices(index),
}));

const aquariusDeepChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 9 ? `aquarius-deep-${stage + 1}-start` : undefined,
  resultText,
});

const aquariusDeepStages = [
  {
    title: "科學社初遇：失控的反常識裝置",
    location: "科學社實驗桌",
    text:
      "科學社門口掛著一張手寫紙條：正常人請先敲門，異常值可以直接進入。\n\n你剛推門，一台小型機械臂就遞來一張紙，上面寫著：歡迎被觀測。\n\n藍祈坐在堆滿晶片和線材的桌後，頭也不抬地說：『不用害怕，它只會攻擊無聊的人。』\n\n他看起來很怪，卻像早就計算好你會留下印象。",
  },
  {
    title: "怪方式關心：這不是關心，是風險控管",
    location: "自動販賣機旁",
    text:
      "你下課後有點低血糖，藍祈突然把一瓶溫熱飲料放到你手邊。\n\n『根據妳今天步速、眨眼頻率和表情延遲，妳需要糖分。』\n\n你看著他，他立刻補一句：『別誤會，這不是關心，是校園安全系統的民間測試。』\n\n他的耳機線纏成一團，像他不肯承認的在意。",
  },
  {
    title: "拒絕正常社交：怪咖保護色",
    location: "午休中庭",
    text:
      "班上同學邀藍祈一起吃午餐，他用三十秒列出群體用餐的七種低效率。\n\n大家笑著說他又怪又難懂，散開後，他把便當拿到角落。\n\n他說：『正常社交需要太多未定義變數。』\n\n但你看見他其實一直記得剛才每個人站的位置。",
  },
  {
    title: "家庭電話：太怪、不正常",
    location: "科學社走廊",
    text:
      "藍祈接到家裡電話，語氣比平常更平。\n\n你只聽見電話那頭說：『不要再弄那些奇怪東西了，像正常孩子一點。』\n\n他掛斷後立刻打開筆電：『噪音樣本已收集完畢。』\n\n可是他的手指停在鍵盤上，半天沒有敲下任何字。",
  },
  {
    title: "情緒預測程式：避免做錯反應",
    location: "科學社電腦前",
    text:
      "藍祈展示一個新程式，介面上寫著：Emotion Predictor v0.8。\n\n它會根據語氣、停頓和表情推測對方需要什麼反應。\n\n『這樣就不會在人類情緒題上答錯。』他說得很理性。\n\n你忽然明白，他不是不想靠近，只是太怕自己靠近的方式又被說成奇怪。",
  },
  {
    title: "突然疏離：過高的在意值",
    location: "放學後走廊",
    text:
      "連續三天，藍祈沒有主動找你。\n\n科學社的燈亮著，他卻把門鎖上，只從門縫塞出一張紙：系統維護中。\n\n你聽見裡面傳來鍵盤聲，停一下，又更快地響起。\n\n他不是討厭你，而是發現自己太在意你，於是開始把自己重新關回奇怪裡。",
  },
  {
    title: "異常數據：曖昧不在模型內",
    location: "天文社借用教室",
    text:
      "你們一起整理成果展投影片，他盯著相性曲線沉默很久。\n\n『最近的資料有異常。妳出現時，我的注意力分配會偏離原模型。』\n\n你問那是不是喜歡。\n\n他立刻推眼鏡：『請不要用缺乏定義的詞污染資料集。』",
  },
  {
    title: "被嘲笑的怪：他其實會痛",
    location: "樓梯轉角",
    text:
      "幾個同學模仿藍祈說話，笑他把戀愛也當實驗。\n\n藍祈站在轉角，面無表情地聽完。\n\n『樣本偏差很大，沒有參考價值。』他淡淡說。\n\n可是他手裡那張成果展邀請卡，被捏出一道很深的摺痕。",
  },
  {
    title: "不分析的陪伴：第一次關掉解釋器",
    location: "雨後校門",
    text:
      "你心情不好，藍祈打開筆電又合上。\n\n『我本來想分析妳現在需要什麼。』\n\n他站到你旁邊，把傘往你那邊偏了一點。\n\n『但我可以先不分析。也許只是站在這裡。』\n\n雨聲讓世界變得很安靜，他第一次沒有急著把情緒翻譯成公式。",
  },
  {
    title: "成果展：不用解釋也能被接收",
    location: "科學社成果展",
    text:
      "成果展當天，藍祈的裝置把星座、步頻、心率和校園路線投成一片藍色星軌。\n\n評審問：『這個模型想證明什麼？』\n\n藍祈看著你，沉默了很久。\n\n他原本準備了三頁理論，卻忽然像忘了怎麼解釋。\n\n這一次，他要不要承認自己不是想解釋情緒，而是想被你接收到？",
  },
];

const aquariusDeepChoices = (stage: number): Choice[] => {
  const sets: Choice[][] = [
    [
      aquariusDeepChoice(0, "認真研究那台裝置，問他設計邏輯。", effect({ affection: 7, trust: 8, connection: 6, logicArmor: 3, alienation: -3, emotionalAcceptance: 2 }, { intelligence: 3 }, "你尊重他的怪，也進入他的語言。", "curious"), "妳居然問邏輯，不是問它為什麼這麼怪。很好，妳通過第一關。"),
      aquariusDeepChoice(0, "吐槽：它如果攻擊無聊的人，那你自己安全嗎？", effect({ affection: 10, trust: 4, connection: 8, logicArmor: -2, alienation: -4, emotionalAcceptance: 2 }, { charm: 3 }, "你的吐槽沒有否定他的怪，反而讓他放鬆。", "playful"), "合理質疑。它目前還沒有弒主功能。"),
      aquariusDeepChoice(0, "保持距離，說你不太懂這些奇怪東西。", effect({ affection: 2, trust: 1, connection: -2, logicArmor: 8, alienation: 8, emotionalAcceptance: -2 }, { mystery: 1 }, "你保護了自己，也讓他更確定自己不容易被理解。", "distant"), "不懂很正常。多數人把未知叫奇怪。"),
    ],
    [
      aquariusDeepChoice(1, "收下飲料，說：謝謝你的風險控管。", effect({ affection: 9, trust: 9, connection: 8, logicArmor: -4, alienation: -4, emotionalAcceptance: 5 }, { kindness: 2, charm: 1 }, "你用他的語言接受關心，也讓他不必立刻承認。", "comfortable"), "精準用詞。這樣我可以不反駁。"),
      aquariusDeepChoice(1, "直接說：你這就是在關心我。", effect({ affection: 5, trust: 10, connection: 6, logicArmor: 6, alienation: -2, emotionalAcceptance: 8 }, { courage: 3 }, "直球讓他緊張，但也讓他聽見情緒不是錯誤。", "tense"), "定義過早。可是……不是完全錯。"),
      aquariusDeepChoice(1, "開玩笑說他像低血糖警報器。", effect({ affection: 8, trust: 3, connection: 4, logicArmor: 2, alienation: -1, emotionalAcceptance: 1 }, { charm: 2, social: 1 }, "你讓氣氛變輕，但他仍能躲在裝置後。", "playful"), "那我至少比警報器省電。"),
    ],
    [
      aquariusDeepChoice(2, "坐到他旁邊，不強迫他加入人群。", effect({ affection: 8, trust: 12, connection: 10, logicArmor: -5, alienation: -8, emotionalAcceptance: 6 }, { kindness: 3 }, "你沒有把正常社交當成唯一答案。", "comfortable"), "妳不問我為什麼不過去？這比過去還稀有。"),
      aquariusDeepChoice(2, "鼓勵他試著和大家吃一次飯。", effect({ affection: 4, trust: 7, connection: 5, logicArmor: 4, alienation: -3, emotionalAcceptance: 5 }, { social: 3 }, "你的建議有善意，但也讓他感到被修正。", "tense"), "我知道妳是好意。只是正常這件事，對我來說很吵。"),
      aquariusDeepChoice(2, "說那些人不懂他，怪一點也沒差。", effect({ affection: 10, trust: 4, connection: 7, logicArmor: 2, alienation: 6, emotionalAcceptance: 2 }, { kindness: 2 }, "你站在他這邊，卻也可能讓他更遠離人群。", "dependent"), "聽起來很舒服，也很危險。"),
    ],
    [
      aquariusDeepChoice(3, "不評論家人，只問他現在想不想先離開走廊。", effect({ affection: 8, trust: 14, connection: 10, logicArmor: -7, alienation: -6, emotionalAcceptance: 10 }, { kindness: 3, courage: 1 }, "你先照顧他的當下，而不是急著分析家庭。", "intimate", { aquarius_family_call: true }), "離開。現在。謝謝妳沒有問我是不是難過。"),
      aquariusDeepChoice(3, "替他生氣：他們怎麼可以那樣說你？", effect({ affection: 11, trust: 5, connection: 7, logicArmor: 3, alienation: 2, emotionalAcceptance: 4 }, { courage: 3 }, "你的憤怒接住了他，但也讓他急著把事情合理化。", "tense", { aquarius_family_call: true }), "統計上，他們不是第一次。妳不用比我生氣。"),
      aquariusDeepChoice(3, "說也許家人只是擔心他。", effect({ affection: -2, trust: -4, connection: -4, logicArmor: 10, alienation: 12, emotionalAcceptance: -4 }, { intelligence: 1 }, "你試著中立，卻讓他聽見熟悉的否定。", "distant", { aquarius_family_call: true }), "是。所有否定都可以被包裝成擔心。"),
    ],
    [
      aquariusDeepChoice(4, "問他：如果程式答對了，你就不會害怕了嗎？", effect({ affection: 5, trust: 13, connection: 8, logicArmor: -8, alienation: -3, emotionalAcceptance: 12 }, { intelligence: 2, courage: 2 }, "你看見程式背後的害怕，而不是只看技術。", "honest"), "不會。但至少錯的時候，我可以怪模型。"),
      aquariusDeepChoice(4, "稱讚程式很強，請他教你模型怎麼跑。", effect({ affection: 9, trust: 6, connection: 6, logicArmor: 6, alienation: -2, emotionalAcceptance: 2 }, { intelligence: 4 }, "你肯定了他的能力，但情緒仍躲在演算法後。", "curious"), "終於有人問到重點。這裡用了三層判斷。"),
      aquariusDeepChoice(4, "說人不是資料，別再算了。", effect({ affection: -1, trust: 6, connection: 2, logicArmor: 8, alienation: 4, emotionalAcceptance: 8 }, { courage: 3 }, "話很直接，可能刺痛他，也可能讓他開始動搖。", "tense"), "我知道人不是資料。只是資料比較不會嫌我怪。"),
    ],
    [
      aquariusDeepChoice(5, "在門外坐下，說系統維護可以，但你不用一個人。", effect({ affection: 9, trust: 15, connection: 14, logicArmor: -8, alienation: -10, emotionalAcceptance: 10 }, { kindness: 3, mystery: 1 }, "你沒有闖進去，卻讓他知道隔離不是唯一選項。", "intimate", { aquarius_sat_in_silence: true }), "妳坐在門外也算違反常規。很煩。也……不壞。"),
      aquariusDeepChoice(5, "傳訊息追問他是不是討厭你。", effect({ affection: 4, trust: 2, connection: 3, logicArmor: 7, alienation: 5, emotionalAcceptance: 3 }, { courage: 2 }, "你的不安讓他更慌，邏輯防禦立刻升級。", "tense"), "不是討厭。請不要把未知變成最壞假設。"),
      aquariusDeepChoice(5, "尊重紙條，直接離開。", effect({ affection: 1, trust: 5, connection: -2, logicArmor: 5, alienation: 10, emotionalAcceptance: 1 }, { mystery: 3 }, "你給了空間，但也讓他更容易把自己鎖起來。", "unresolved"), "她果然走了。合理，這是預期結果。"),
    ],
    [
      aquariusDeepChoice(6, "說：也許異常數據就是你在意我的證據。", effect({ affection: 8, trust: 12, connection: 12, logicArmor: -9, alienation: -5, emotionalAcceptance: 12 }, { courage: 3, charm: 1 }, "你把曖昧從故障改成訊號。", "honest"), "證據這個詞可以接受。雖然結論很危險。"),
      aquariusDeepChoice(6, "配合他，把心動一起改名成變數偏移。", effect({ affection: 10, trust: 5, connection: 7, logicArmor: 6, alienation: -2, emotionalAcceptance: 2 }, { intelligence: 2, charm: 2 }, "你進入他的語言，但他也能繼續躲在術語裡。", "playful"), "很好，妳正在污染我的變數命名規則。"),
      aquariusDeepChoice(6, "說你不想被當成實驗樣本。", effect({ affection: 2, trust: 10, connection: 4, logicArmor: -3, alienation: 3, emotionalAcceptance: 8 }, { courage: 3 }, "你設下界線，也迫使他看見人不是模型。", "tense"), "妳不是樣本。這句我應該更早說。"),
    ],
    [
      aquariusDeepChoice(7, "走到他身邊，只說：那句話很傷人。", effect({ affection: 8, trust: 14, connection: 12, logicArmor: -8, alienation: -8, emotionalAcceptance: 12 }, { kindness: 2, courage: 2 }, "你沒有替他辯護，而是承認他的痛是真實的。", "honest"), "是嗎。原來這個可以叫傷人，不只是低品質樣本。"),
      aquariusDeepChoice(7, "立刻反擊那些同學。", effect({ affection: 11, trust: 5, connection: 7, logicArmor: 2, alienation: 2, emotionalAcceptance: 4 }, { courage: 4 }, "你保護了他，但也讓他再次站到旁觀位置。", "tense"), "謝謝。但我不想讓妳替我打架。"),
      aquariusDeepChoice(7, "用玩笑說他們的智商才是異常值。", effect({ affection: 9, trust: 3, connection: 5, logicArmor: 4, alienation: 1, emotionalAcceptance: 2 }, { charm: 3 }, "他被逗笑了，但痛感還沒有被命名。", "playful"), "不嚴謹，但我承認有療效。"),
    ],
    [
      aquariusDeepChoice(8, "接受他的安靜陪伴，不要求他立刻說漂亮話。", effect({ affection: 10, trust: 16, connection: 16, logicArmor: -10, alienation: -10, emotionalAcceptance: 15 }, { kindness: 3, mystery: 1 }, "你讓陪伴不需要被翻譯成標準答案。", "intimate", { aquarius_sat_in_silence: true, aquarius_no_need_to_explain: true }), "原來不做反應，也可能是正確反應。"),
      aquariusDeepChoice(8, "問他分析結果是什麼。", effect({ affection: 6, trust: 4, connection: 5, logicArmor: 8, alienation: 2, emotionalAcceptance: 1 }, { intelligence: 2 }, "你熟悉他的方式，卻又把他推回解釋器。", "curious"), "分析結果是……我想陪妳。這算結果嗎？"),
      aquariusDeepChoice(8, "說你現在想一個人待著。", effect({ affection: -2, trust: 8, connection: -2, logicArmor: 3, alienation: 8, emotionalAcceptance: 5 }, { mystery: 3 }, "你誠實保留空間，但他的疏離感也被觸發。", "farewell"), "好。我會在五公尺外。這樣算一個人嗎？"),
    ],
    [
      aquariusDeepChoice(9, "核心選擇：不用解釋，我已經接收到你了。", effect({ affection: 18, trust: 18, connection: 22, logicArmor: -18, alienation: -16, emotionalAcceptance: 22 }, { kindness: 4, courage: 2 }, "你沒有要求他把情緒證明完，只讓他知道自己被接住。", "intimate", { aquarius_no_need_to_explain: true }), "那我可以……不說明原因地靠近妳嗎？"),
      aquariusDeepChoice(9, "請他用成果展把心動模型講完整。", effect({ affection: 12, trust: 6, connection: 8, logicArmor: 12, alienation: 4, emotionalAcceptance: 2 }, { intelligence: 4 }, "他被肯定了，但感情又被收進理論盒裡。", "curious"), "可以。模型很完整，只是我不確定我是不是也完整。"),
      aquariusDeepChoice(9, "說你喜歡他的奇怪，但不想靠太近。", effect({ affection: 4, trust: 10, connection: -2, logicArmor: 3, alienation: 12, emotionalAcceptance: 4 }, { mystery: 3 }, "你保留了欣賞，也把關係停在安全距離。", "farewell"), "理解。遠距離接收，也是一種接收。"),
    ],
  ];
  return sets[stage];
};

const aquariusDeepScenes: Scene[] = aquariusDeepStages.map((stage, index) => ({
  id: `aquarius-deep-${index}-start`,
  title: stage.title,
  location: stage.location,
  characterId: "aquarius",
  text: stage.text,
  choices: aquariusDeepChoices(index),
}));

const geminiDeepChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 9 ? `gemini-deep-${stage + 1}-start` : undefined,
  resultText,
});

const geminiDeepStages = [
  {
    title: "午夜試播：他把沉默剪掉",
    location: "廣播社錄音室",
    text:
      "放學後的廣播社只剩一盞紅色 ON AIR 燈。\n\n言澈一邊調音，一邊把自己的笑聲剪進片頭，像整個世界只要夠熱鬧就不會有人發現他停頓的那一秒。\n\n他忽然摘下耳機看向你：『學姐今天的沉默有雜訊喔。要不要讓本台人氣 DJ 免費診斷？』\n\n他笑得很輕，卻把你的情緒聽得太準。",
  },
  {
    title: "聲音測試：玩笑太順手",
    location: "調音台前",
    text:
      "你們做聲音測試，言澈每回答一個問題，就順手把它變成梗。\n\n你問他為什麼喜歡廣播，他說因為關燈後不用整理表情。\n\n下一秒他又笑：『開玩笑的啦，我只是覺得聲音比較帥。』\n\n他越會轉場，你越聽見被藏起來的真心。",
  },
  {
    title: "聽眾來信：別丟下我",
    location: "廣播社信箱",
    text:
      "午休節目收到一封匿名來信。\n\n信上寫：『我每次先開玩笑，是因為如果對方要走，我可以假裝自己本來就沒認真。』\n\n言澈念到一半忽然停住，指尖敲著桌面。\n\n『現在的聽眾都這麼會寫嗎？害我差點要收版權費。』",
  },
  {
    title: "停電的十秒沉默",
    location: "校園廣播室",
    text:
      "晚間試播時全校短暫停電，錄音室陷入十秒黑暗。\n\n沒有背景音、沒有笑聲、沒有可以接上的梗。\n\n言澈的呼吸聲離你很近，他低聲說：『妳知道嗎，沉默比錯字還可怕。因為它會讓人開始想，自己是不是又被留下了。』\n\n電力恢復時，他已經重新戴上笑容。",
  },
  {
    title: "臨時搭檔：他把主 Key 丟給你",
    location: "午間節目直播",
    text:
      "主持人臨時缺席，老師請言澈接下整段直播。\n\n他立刻把麥克風推給你：『學姐救場！我負責在旁邊當吉祥物。』\n\n所有人都笑了，可你看見他的手在桌下攥緊。\n\n原來他不是不會負責，只是害怕一認真就會被期待，期待之後就是失望。",
  },
  {
    title: "未播出的錄音檔",
    location: "器材室",
    text:
      "你整理檔案時，聽見一段沒有標題的錄音。\n\n言澈的聲音不像平常那樣上揚。\n\n『如果有一天我不有趣了，還會有人留下來聽我說完嗎？』\n\n門口傳來腳步聲，他伸手按掉播放器，笑得像什麼都沒發生：『哇，學姐偷聽本台絕密黑歷史。』",
  },
  {
    title: "朋友轉學：被留下的人",
    location: "天台",
    text:
      "他告訴你，國中時最好的朋友轉學前還跟他開玩笑，說只是去隔壁宇宙出外景。\n\n後來那個人再也沒有回訊息。\n\n言澈靠著欄杆笑：『所以我學會一件事。告別如果包成笑話，就比較不丟臉。』\n\n風把他的聲音吹得很輕，像快要播不出去。",
  },
  {
    title: "吵架：不要用笑話逃走",
    location: "放學後走廊",
    text:
      "你問他那段錄音是不是寫給你的。\n\n言澈一秒接梗：『學姐要買版權嗎？學生價九折。』\n\n你沒有笑。\n\n他的表情也慢慢收起來，像被迫從主持人的位置走下來，只剩下一個不知道怎麼說真話的少年。",
  },
  {
    title: "停播前一分鐘",
    location: "廣播社直播間",
    text:
      "畢業季特別節目只剩最後一分鐘。\n\n言澈看著麥克風，手指停在推桿上。\n\n他準備了一整頁漂亮台詞，也準備了三個可以讓大家笑出來的結尾。\n\n可是他看向你時，忽然問：『如果我今天不講笑話，會不會很無聊？』",
  },
  {
    title: "最後頻率：沒有笑點的告白",
    location: "校園廣播室",
    text:
      "紅燈亮起。\n\n整個校園都聽得見言澈的聲音，但這一次，他沒有急著填滿空白。\n\n他說：『我以前以為，只要一直有趣，就沒有人會發現我害怕被丟下。』\n\n他看著你，像第一次把真正的自己交到麥克風前。\n\n這是最後的選擇。你要把這段頻率帶去哪裡？",
  },
];

const geminiDeepChoices = (stage: number): Choice[] => {
  const sets: Choice[][] = [
    [
      geminiDeepChoice(0, "接住他的梗，但問：那你真正想播的是什麼？", effect({ affection: 9, trust: 8, honesty: 8, avoidance: -4, mask: -5, abandonmentFear: 2 }, { intelligence: 2, charm: 1 }, "你接住了笑點，也沒有讓真心滑走。", "honest"), "真正想播的？學姐這題超綱。可是……我可能真的想過。"),
      geminiDeepChoice(0, "陪他把笑話加倍，讓節目更熱鬧。", effect({ affection: 12, trust: 3, honesty: -2, avoidance: 7, mask: 8, abandonmentFear: -1 }, { charm: 3, social: 2 }, "氣氛被你們炒熱，但他的防護牆也更亮了。", "playful"), "這才對嘛！本台需要妳這種共犯。"),
      geminiDeepChoice(0, "安靜等他說完，不急著填滿空白。", effect({ affection: 7, trust: 10, honesty: 6, avoidance: -5, mask: -3, abandonmentFear: 5 }, { kindness: 2, mystery: 2 }, "你讓沉默有位置，他反而更不習慣。", "comfortable"), "妳不接話，我會以為自己真的被聽見耶。很危險。"),
    ],
    [
      geminiDeepChoice(1, "直接說：你剛剛又把問題變成笑點了。", effect({ affection: 3, trust: 10, honesty: 12, avoidance: -8, mask: -8, abandonmentFear: 4 }, { courage: 3 }, "直球有點刺，但讓他看見自己的反射動作。", "tense"), "被抓包了。學姐今天是節目審查員嗎？"),
      geminiDeepChoice(1, "順著玩笑回擊，讓他先放鬆。", effect({ affection: 10, trust: 4, honesty: 2, avoidance: 3, mask: 4, abandonmentFear: -2 }, { charm: 3 }, "你沒有逼他下台，但真心暫時仍躲在布幕後。", "playful"), "漂亮，這句可以剪進精華。"),
      geminiDeepChoice(1, "問他是不是不習慣被認真聽。", effect({ affection: 8, trust: 12, honesty: 10, avoidance: -6, mask: -5, abandonmentFear: 6 }, { kindness: 2, intelligence: 2 }, "你沒有笑他的逃跑，而是指出那條路。", "honest"), "……妳這樣問，我很難假裝只是效果音。"),
    ],
    [
      geminiDeepChoice(2, "說這封信很像他，所以你想聽他的答案。", effect({ affection: 6, trust: 13, honesty: 12, avoidance: -5, mask: -8, abandonmentFear: 8 }, { courage: 3, kindness: 1 }, "你把聚光燈轉向他，他害怕，卻沒有完全退開。", "honest"), "像我？沒有啦，我比較貴一點。……好吧，有一點像。"),
      geminiDeepChoice(2, "用玩笑岔開，說聽眾比命運還會暈船。", effect({ affection: 10, trust: 2, honesty: -3, avoidance: 8, mask: 7, abandonmentFear: -2 }, { charm: 3, social: 1 }, "你救了場，也一起避開了那封信的核心。", "playful"), "懂節目效果！學姐可以考慮當固定班底。"),
      geminiDeepChoice(2, "陪他把回信寫成溫柔但不黏人的版本。", effect({ affection: 8, trust: 10, honesty: 7, avoidance: -3, mask: -2, abandonmentFear: -4 }, { kindness: 3, intelligence: 1 }, "你們把害怕寫成能被理解、但不必抓住誰的文字。", "comfortable"), "這句很好。像是有人留下，但不是被綁住。"),
    ],
    [
      geminiDeepChoice(3, "停電時陪他沉默，不急著說話。", effect({ affection: 8, trust: 14, honesty: 10, avoidance: -8, mask: -8, abandonmentFear: 6 }, { mystery: 3, kindness: 1 }, "你沒有替他修掉空白，讓他第一次在沉默裡沒那麼孤單。", "intimate", { gemini_stayed_in_silence: true }), "原來沉默不是斷訊。妳在的話，好像不是。"),
      geminiDeepChoice(3, "立刻講笑話救場。", effect({ affection: 12, trust: 3, honesty: -2, avoidance: 10, mask: 10, abandonmentFear: -2 }, { charm: 4 }, "他笑了，可那十秒沉默又被剪掉了。", "playful"), "謝啦，再沉默下去我可能會當機。"),
      geminiDeepChoice(3, "握住耳機線說：沉默也可以播出。", effect({ affection: 9, trust: 12, honesty: 11, avoidance: -6, mask: -6, abandonmentFear: 5 }, { courage: 2, kindness: 2 }, "你沒有把他的害怕當麻煩，而是給它一個頻道。", "honest", { gemini_stayed_in_silence: true }), "這句很作弊。害我真的想相信。"),
    ],
    [
      geminiDeepChoice(4, "提醒他不要把責任丟給玩笑，直播也可以慢一拍。", effect({ affection: 5, trust: 12, honesty: 12, avoidance: -10, mask: -6, abandonmentFear: 4 }, { courage: 3, intelligence: 1 }, "你沒有拆穿他，而是把麥克風推回他手裡。", "honest"), "慢一拍也可以？那我試試看，不保證帥。"),
      geminiDeepChoice(4, "接下主 Key，讓他繼續當氣氛王。", effect({ affection: 11, trust: 2, honesty: -4, avoidance: 10, mask: 8, abandonmentFear: -3 }, { social: 4 }, "你們成功救場，卻讓他再一次躲在旁白後面。", "playful"), "學姐太可靠了，我決定今天當裝飾品。"),
      geminiDeepChoice(4, "和他分工：你開場，他負責一段真心話。", effect({ affection: 9, trust: 12, honesty: 10, avoidance: -5, mask: -5, abandonmentFear: 2 }, { social: 2, kindness: 2 }, "責任被分成可承受的重量，他沒有被丟進舞台中央。", "comfortable"), "一段就好喔。太真心會影響本台形象。"),
    ],
    [
      geminiDeepChoice(5, "問他為什麼把真心錄下來又刪掉。", effect({ affection: 4, trust: 14, honesty: 15, avoidance: -8, mask: -10, abandonmentFear: 8 }, { courage: 3 }, "問題直達核心，他下意識想逃，但還是停住了。", "tense", { gemini_heard_unaired_truth: true }), "因為刪掉比較安全。沒播出，就沒有人能不回應。"),
      geminiDeepChoice(5, "假裝沒聽見，保護他的面子。", effect({ affection: 8, trust: 5, honesty: -2, avoidance: 6, mask: 6, abandonmentFear: -2 }, { kindness: 2, mystery: 1 }, "你保護了他的尷尬，也讓那段真心繼續被封存。", "unresolved"), "謝啦。學姐的裝傻能力值得加薪。"),
      geminiDeepChoice(5, "說：你不用立刻播出，但不要對自己消音。", effect({ affection: 10, trust: 15, honesty: 12, avoidance: -7, mask: -8, abandonmentFear: 5 }, { kindness: 3, courage: 2 }, "你尊重他的節奏，也沒有允許他把自己關掉。", "intimate", { gemini_heard_unaired_truth: true }), "不要對自己消音……這句我可能會偷偷記下。"),
    ],
    [
      geminiDeepChoice(6, "聽他說完朋友轉學，不急著安慰。", effect({ affection: 8, trust: 16, honesty: 12, avoidance: -8, mask: -8, abandonmentFear: -6 }, { kindness: 3, mystery: 1 }, "你沒有把傷口改寫成勵志故事，只陪他把它說完。", "intimate"), "妳真的很會讓人沒辦法開玩笑。很討厭，也很好。"),
      geminiDeepChoice(6, "說你不會丟下他，現在就給承諾。", effect({ affection: 14, trust: 5, honesty: 3, avoidance: -2, mask: -2, abandonmentFear: 14 }, { kindness: 4 }, "承諾很甜，卻也讓他的害怕把你抓得更緊。", "dependent"), "不要亂保證。可是……我好想相信。"),
      geminiDeepChoice(6, "提醒他：害怕被留下，不代表你要先跑。", effect({ affection: 7, trust: 14, honesty: 14, avoidance: -10, mask: -7, abandonmentFear: -4 }, { intelligence: 2, courage: 2 }, "你把他的逃跑和傷口分開，他第一次聽懂了。", "honest"), "所以我不是只能先開玩笑，對嗎？"),
    ],
    [
      geminiDeepChoice(7, "直接說：不要再用笑話逃走。", effect({ affection: 1, trust: 12, honesty: 16, avoidance: -12, mask: -10, abandonmentFear: 6 }, { courage: 4 }, "這句話很硬，卻讓你們終於吵到真正的地方。", "tense"), "妳以為我不知道嗎？我只是……不知道不逃還能怎樣。"),
      geminiDeepChoice(7, "被他逗笑，暫時不追問。", effect({ affection: 10, trust: 2, honesty: -4, avoidance: 10, mask: 8, abandonmentFear: -1 }, { charm: 3 }, "氣氛變好了，但他又成功逃離一次。", "playful"), "看吧，笑出來就沒事了。大概吧。"),
      geminiDeepChoice(7, "說你可以等，但不會追著他的玩笑跑。", effect({ affection: 8, trust: 14, honesty: 12, avoidance: -8, mask: -8, abandonmentFear: -3 }, { kindness: 2, courage: 2 }, "你留下了，也把追逐他的責任還給他。", "honest"), "妳這樣很犯規。沒有追我，卻讓我想回頭。"),
    ],
    [
      geminiDeepChoice(8, "把麥克風推回去：這一分鐘，說你自己的話。", effect({ affection: 9, trust: 15, honesty: 16, avoidance: -10, mask: -12, abandonmentFear: 5 }, { courage: 3, social: 1 }, "你相信他能承受真心，不替他念稿。", "honest"), "我自己的話……那可能會很不有趣。"),
      geminiDeepChoice(8, "幫他寫一段漂亮台詞。", effect({ affection: 10, trust: 4, honesty: -3, avoidance: 7, mask: 8, abandonmentFear: -2 }, { intelligence: 2, charm: 2 }, "台詞很漂亮，卻仍不是他的聲音。", "unresolved"), "妳寫得比我好。那就照這個吧。安全。"),
      geminiDeepChoice(8, "陪他關掉背景音樂，讓沉默留在直播裡。", effect({ affection: 8, trust: 16, honesty: 14, avoidance: -9, mask: -10, abandonmentFear: -4 }, { mystery: 3, kindness: 1 }, "你讓他知道空白不是事故，也可以是選擇。", "intimate"), "關掉音樂？本台第一次這麼勇。好，陪我。"),
    ],
    [
      geminiDeepChoice(9, "核心選擇：不要笑點，只說你害怕被丟下也沒關係。", effect({ affection: 18, trust: 18, honesty: 22, avoidance: -16, mask: -18, abandonmentFear: -12 }, { courage: 4, kindness: 2 }, "你沒有要求他永遠有趣，而是允許他沒有笑點也值得被聽見。", "intimate", { gemini_no_joke_confession: true }), "我很害怕。也很喜歡妳。這句沒有梗，但是真的。"),
      geminiDeepChoice(9, "說你喜歡他永遠有趣的樣子。", effect({ affection: 16, trust: 5, honesty: -5, avoidance: 12, mask: 14, abandonmentFear: 6 }, { charm: 3 }, "他被喜歡了，卻也更怕失去那個必須有趣的自己。", "dependent"), "那我會努力一直好笑。一直。"),
      geminiDeepChoice(9, "說先停在朋友頻率，等他真的想播出真心再說。", effect({ affection: -2, trust: 12, honesty: 12, avoidance: -6, mask: -8, abandonmentFear: -8 }, { intelligence: 2, mystery: 3 }, "這不是最甜的答案，卻讓真心不必被催促上線。", "farewell"), "朋友頻率也很好。至少這次，不是斷訊。"),
    ],
  ];
  return sets[stage];
};

const geminiDeepScenes: Scene[] = geminiDeepStages.map((stage, index) => ({
  id: `gemini-deep-${index}-start`,
  title: stage.title,
  location: stage.location,
  characterId: "gemini",
  text: stage.text,
  choices: geminiDeepChoices(index),
}));

const piscesDeepChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 9 ? `pisces-deep-${stage + 1}-start` : undefined,
  resultText,
});

const piscesDeepStages = [
  {
    title: "初遇：半拍前停住的歌",
    location: "音樂社練習室",
    text:
      "你推開音樂社的門時，鋼琴聲剛好停在最後一個和弦前。\n\n霧島凜坐在窗邊，指尖還停在琴鍵上。他抬頭看你，沒有問你為什麼來得這麼晚，只是很輕地說：『妳今天笑得有點用力。』\n\n那不是冒犯，更像他不小心聽見你心裡沒說出口的雜音。",
  },
  {
    title: "溫柔靠近：熱可可與安全距離",
    location: "音樂教室外走廊",
    text:
      "下課後，他把一杯熱可可放到你手裡。\n\n『甜一點會比較不容易掉進壞心情裡。』他笑得像午後的光，溫柔得讓人很難拒絕。\n\n但你也感覺到，他太熟練了。熟練到像照顧別人的情緒，是他每天都會自動完成的作業。",
  },
  {
    title: "失約：他又去接住別人的情緒",
    location: "校園小劇場",
    text:
      "你們約好一起看小劇場彩排。開演前五分鐘，他傳來訊息：『抱歉，朋友現在很崩潰，我不能丟下他。』\n\n你等到燈都暗了，他才匆匆跑來，氣喘吁吁，手裡還攥著別人的紙巾。\n\n『對不起，我知道我又失約了。可是如果我不去，他會不會更糟？』",
  },
  {
    title: "最後的位置：他總把自己排在最後",
    location: "學生餐廳角落",
    text:
      "午餐時間，他替社團學姊拿便當，幫同學修耳機，還把自己的布丁讓給心情不好的朋友。\n\n等你發現時，他的餐盤幾乎沒動。\n\n『我不餓。』他說。\n\n可是你明明聽見他肚子叫了。原來他的溫柔有時不是光，是一種把自己慢慢擦掉的習慣。",
  },
  {
    title: "家庭電話：你最懂事了吧",
    location: "校門旁的櫻花樹下",
    text:
      "手機震動時，凜的表情立刻變了。\n\n電話那頭的聲音斷斷續續傳出來：『你怎麼現在才接？你最懂事了吧？媽媽今天真的快撐不下去了。』\n\n他低著頭，一直說：『嗯，我知道。對不起。』\n\n掛掉後，他笑著說沒事，可是那個笑像一張被雨淋濕的譜紙。",
  },
  {
    title: "理想化：只有妳能理解我",
    location: "空教室的鋼琴旁",
    text:
      "他把新曲的第一版給你聽。旋律很美，卻像一個人站在水裡等誰回頭。\n\n『有時候我覺得，只有妳真的聽得懂。』他看著你，眼神太真，真到有點危險。\n\n『如果連妳都不懂我，我可能就不知道要怎麼辦了。』",
  },
  {
    title: "依賴分岔：安慰、界線或逃避",
    location: "雨天校門口",
    text:
      "雨下得很大，他沒有帶傘，卻先把外套披到你肩上。\n\n『我是不是很麻煩？』他問。\n\n你看見他眼裡的期待。只要你說一句『不麻煩』，他大概就能暫時安心。可是你也知道，安心不等於真正變好。",
  },
  {
    title: "情緒崩潰：海水漫上來",
    location: "音樂社儲藏室",
    text:
      "社團比賽前夕，家裡、朋友、老師的訊息同時湧進來。\n\n凜蹲在儲藏室角落，手指按著耳朵，聲音發抖：『我接不住了。可是我不接住，他們怎麼辦？』\n\n這是他第一次在你面前崩潰。不是漂亮的脆弱，而是很狼狽、很真實的求救。",
  },
  {
    title: "第一次拒絕：不合理的請求",
    location: "社團辦公室",
    text:
      "朋友拜託他臨時代替上台，理由是『反正凜你最會救場』。\n\n他下意識想答應，卻停住了。\n\n你看見他的手在發抖。他不是不想拒絕，而是太害怕拒絕後，別人就不再需要他、不再喜歡他。",
  },
  {
    title: "最終選擇：給自己的情書",
    location: "校園小劇場",
    text:
      "比賽結束後，舞台只剩一盞暖燈。\n\n凜把一封沒有署名的信放在鋼琴上。那不是給家人、朋友，也不是給你。\n\n『我想試著寫給自己。』他說。\n\n你知道，接下來的回答會決定你們是一起沉下去，停在岸邊，還是學會各自呼吸後再牽手。",
  },
];

const piscesDeepChoices = (stage: number): Choice[] => {
  const sets: Choice[][] = [
    [
      piscesDeepChoice(0, "承認自己今天確實不太好，問他怎麼聽出來的。", effect({ affection: 8, trust: 10, selfAwareness: 6, overwhelm: 2 }, { kindness: 2, mystery: 1 }, "你讓他靠近，但沒有把所有情緒交給他處理。", "curious"), "因為妳平常不會把笑聲收得那麼快。"),
      piscesDeepChoice(0, "故作輕鬆吐槽：你是音樂社還是讀心社？", effect({ affection: 9, trust: 4, boundary: 3, overwhelm: -2 }, { charm: 2, social: 2 }, "玩笑讓氣氛變輕，也讓他知道你不是一碰就碎。", "playful"), "讀心社聽起來很可疑。那我還是彈琴好了。"),
      piscesDeepChoice(0, "微笑說沒事，反過來稱讚他的鋼琴很好聽。", effect({ affection: 10, trust: 2, selfAwareness: -2, overwhelm: 6 }, { kindness: 2 }, "你們都很溫柔，也都避開了真正的情緒。", "comfortable"), "謝謝。可是妳剛剛把話題轉走了。"),
    ],
    [
      piscesDeepChoice(1, "接受熱可可，也坦白說：謝謝，但我不想讓你負責我的心情。", effect({ affection: 8, trust: 12, boundary: 12, selfAwareness: 8, overwhelm: -6 }, { kindness: 2, courage: 2 }, "你接住他的好意，也替彼此留下界線。", "honest"), "原來被拒絕一點點，也可以不是被討厭。"),
      piscesDeepChoice(1, "開玩笑說你收買人心的技術太熟練了。", effect({ affection: 10, trust: 5, boundary: 4, selfAwareness: 4, overwhelm: -2 }, { charm: 3 }, "吐槽讓他笑了，也輕輕點到他的習慣。", "playful"), "糟糕，被看出來了。下次換蜂蜜牛奶？"),
      piscesDeepChoice(1, "說你今天真的很需要他，請他多陪你一會。", effect({ affection: 13, trust: 3, boundary: -8, overwhelm: 14 }, { kindness: 2 }, "他很高興能被需要，但依賴的重量也悄悄變重。", "dependent"), "只要妳需要，我就會在。一直在也可以。"),
    ],
    [
      piscesDeepChoice(2, "說沒關係，下次你還是先照顧朋友。", effect({ affection: 10, trust: 2, boundary: -10, overwhelm: 14 }, { kindness: 3 }, "你很體貼，但也讓他繼續把失約合理化。", "dependent"), "妳太好了。好到我會更怕讓妳失望。"),
      piscesDeepChoice(2, "告訴他：我理解你擔心朋友，但失約也需要被討論。", effect({ affection: 7, trust: 13, boundary: 12, selfAwareness: 10, overwhelm: -5 }, { courage: 3, kindness: 1 }, "你沒有懲罰他的善良，而是讓關係回到雙向。", "honest"), "對不起。我不能把『擔心別人』當成每次的理由。"),
      piscesDeepChoice(2, "冷靜提議下次若臨時有事，要先傳清楚能不能赴約。", effect({ affection: 5, trust: 12, boundary: 10, selfAwareness: 6, overwhelm: -4 }, { intelligence: 3 }, "規則不浪漫，卻讓溫柔有地方站穩。", "curious"), "這樣好像比較像真的約定，而不是我單方面道歉。"),
    ],
    [
      piscesDeepChoice(3, "把你的布丁分給他，說：照顧人也要先吃飯。", effect({ affection: 10, trust: 8, boundary: 6, selfAwareness: 8, overwhelm: -3 }, { kindness: 3 }, "你用日常方式提醒他，他也有需求。", "comfortable"), "那我吃一半。另一半妳要陪我吃。"),
      piscesDeepChoice(3, "直接問：你是不是覺得自己的需求永遠可以排最後？", effect({ affection: 2, trust: 13, boundary: 8, selfAwareness: 16, overwhelm: 5 }, { courage: 3, intelligence: 2 }, "這句話刺痛他，卻讓他看見自己一直在消失。", "tense"), "妳講得好像很殘忍，可是我反駁不了。"),
      piscesDeepChoice(3, "稱讚他真的很溫柔，但沒有繼續追問。", effect({ affection: 12, trust: 4, boundary: -4, selfAwareness: 1, overwhelm: 8 }, { charm: 2, kindness: 1 }, "他被肯定了，卻也更容易把被需要當成價值。", "comfortable"), "如果溫柔能讓大家好一點，那也不壞吧。"),
    ],
    [
      piscesDeepChoice(4, "陪他等三分鐘再回電，先確認他現在能不能承受。", effect({ affection: 9, trust: 14, boundary: 14, selfAwareness: 12, overwhelm: -8 }, { kindness: 3, courage: 2 }, "你沒有要他丟下家人，只是讓他先回到自己身上。", "honest", { pisces_family_event: true }), "三分鐘……原來我可以先呼吸，再當懂事的人。"),
      piscesDeepChoice(4, "立刻說你可以陪他一起處理家裡所有事。", effect({ affection: 14, trust: 4, boundary: -12, selfAwareness: -2, overwhelm: 20 }, { kindness: 4 }, "承諾很甜，也讓你們一起被拖進家庭情緒裡。", "dependent", { pisces_family_event: true }), "妳這樣說，我會真的想抓住妳。這樣很糟吧。"),
      piscesDeepChoice(4, "提醒他：電話那頭的痛苦是真實的，但不全是你的責任。", effect({ affection: 6, trust: 15, boundary: 12, selfAwareness: 18, overwhelm: -4 }, { intelligence: 3, courage: 2 }, "這不是最甜的話，卻替他切開了責任的邊界。", "honest", { pisces_family_event: true }), "我一直以為，只要他們難過，就是我做得不夠好。"),
    ],
    [
      piscesDeepChoice(5, "說你會永遠懂他，無論發生什麼都不離開。", effect({ affection: 16, trust: 6, boundary: -14, selfAwareness: -4, overwhelm: 20 }, { kindness: 4 }, "他被安慰了，也把你放成唯一浮木。", "dependent"), "不要說永遠。可是我好想相信。"),
      piscesDeepChoice(5, "說：我想理解你，但我不能成為你唯一的答案。", effect({ affection: 10, trust: 16, boundary: 16, selfAwareness: 14, overwhelm: -8 }, { courage: 3, kindness: 2 }, "你沒有拒絕親密，而是拒絕被理想化。", "intimate", { pisces_companion_not_rescuer: true }), "妳沒有逃走，卻也沒有讓我躲進妳身後。"),
      piscesDeepChoice(5, "轉移話題，說這首曲子真的很好聽。", effect({ affection: 8, trust: -2, boundary: 2, selfAwareness: -2, overwhelm: 4 }, { charm: 2 }, "你避開了壓力，也讓他不知道該不該繼續說。", "unresolved"), "嗯……謝謝。那我們先說曲子吧。"),
    ],
    [
      piscesDeepChoice(6, "抱住他，反覆說你一點都不麻煩。", effect({ affection: 14, trust: 7, boundary: -10, selfAwareness: 2, overwhelm: 16 }, { kindness: 4 }, "擁抱很溫暖，但問題仍被泡在情緒裡。", "dependent"), "妳一這樣說，我就更想依賴妳了。"),
      piscesDeepChoice(6, "撐傘陪他走到車站，說：我陪你，但不替你決定。", effect({ affection: 10, trust: 16, boundary: 14, selfAwareness: 12, overwhelm: -10 }, { kindness: 2, courage: 2 }, "陪伴沒有變成拯救，讓他第一次自己站穩一小步。", "intimate", { pisces_companion_not_rescuer: true }), "這樣的陪伴……好安靜，但我好像比較能呼吸。"),
      piscesDeepChoice(6, "覺得太沉重，說你今天有事先離開。", effect({ affection: -6, trust: -8, boundary: 8, selfAwareness: 4, overwhelm: 8 }, { mystery: 2 }, "你保住了距離，卻留下沒有被說清的退縮。", "distant"), "嗯，沒關係。我本來就不該說太多。"),
    ],
    [
      piscesDeepChoice(7, "陪他一起深呼吸，請他只說出現在最需要的一件事。", effect({ affection: 10, trust: 18, boundary: 12, selfAwareness: 18, overwhelm: -14 }, { kindness: 3, intelligence: 2 }, "你沒有急著修好他，而是把混亂拆成可以面對的一件事。", "honest"), "我現在最需要……安靜。不是答案，是安靜。"),
      piscesDeepChoice(7, "立刻幫他回覆所有訊息，讓他先不要看手機。", effect({ affection: 13, trust: 5, boundary: -12, selfAwareness: -2, overwhelm: 10 }, { kindness: 4 }, "你替他擋下浪，卻也替他拿走練習面對的機會。", "dependent"), "謝謝。可是如果沒有妳，我是不是還是一樣不行？"),
      piscesDeepChoice(7, "直接說：你不能一直用崩潰逃避拒絕。", effect({ affection: -4, trust: 8, boundary: 8, selfAwareness: 16, overwhelm: 8 }, { courage: 4 }, "這句話很痛；如果前面信任夠，它會成為成長的開口。", "tense"), "我知道妳不是故意傷我。可是這句真的好痛。"),
    ],
    [
      piscesDeepChoice(8, "在旁邊陪他寫下拒絕句子：今天我沒有餘力代替你。", effect({ affection: 10, trust: 16, boundary: 16, selfAwareness: 16, overwhelm: -12 }, { intelligence: 2, kindness: 2 }, "你把拒絕變成可以練習的語言。", "honest"), "我手在抖，但我想自己按送出。"),
      piscesDeepChoice(8, "鼓勵他先答應，之後再慢慢學拒絕。", effect({ affection: 9, trust: 2, boundary: -10, selfAwareness: -3, overwhelm: 15 }, { kindness: 2 }, "你不想讓他痛，卻讓舊模式繼續發生。", "dependent"), "對，今天先這樣。下一次……也許下一次再說。"),
      piscesDeepChoice(8, "請他自己決定，你只負責陪他承受結果。", effect({ affection: 8, trust: 15, boundary: 12, selfAwareness: 14, overwhelm: -6 }, { courage: 2, mystery: 2 }, "你把選擇權還給他，連不完美的選擇也一起尊重。", "intimate", { pisces_companion_not_rescuer: true }), "那我想試試看。就算被討厭，也試一次。"),
    ],
    [
      piscesDeepChoice(9, "核心選擇：讀完那封信，陪他把第一句『我也會累』留下來。", effect({ affection: 18, trust: 18, boundary: 18, selfAwareness: 20, overwhelm: -16 }, { courage: 3, kindness: 3 }, "他不是被你拯救，而是第一次把自己也寫進愛裡。", "intimate", { pisces_core: true, pisces_companion_not_rescuer: true }), "我想把這封信留著。不是給誰看的，是提醒我自己也存在。"),
      piscesDeepChoice(9, "說你會一直當他的岸，只要他難過就可以來找你。", effect({ affection: 16, trust: 8, boundary: -12, selfAwareness: 2, overwhelm: 18 }, { kindness: 4 }, "這句話很甜，卻讓岸變成另一種依賴。", "dependent"), "妳太好了。好到我會害怕沒有妳就不行。"),
      piscesDeepChoice(9, "說先保持朋友距離，等他分清依賴與喜歡再談。", effect({ affection: -2, trust: 12, boundary: 16, selfAwareness: 14, overwhelm: -10 }, { intelligence: 2, mystery: 3 }, "這不是最浪漫的回答，卻可能是最負責任的溫柔。", "farewell"), "我會難過，但我知道妳不是不要我。妳是在讓我長大。"),
    ],
  ];
  return sets[stage];
};

const piscesDeepScenes: Scene[] = piscesDeepStages.map((stage, index) => ({
  id: `pisces-deep-${index}-start`,
  title: `${stage.title}：霧島凜`,
  location: stage.location,
  characterId: "pisces",
  text: stage.text,
  choices: piscesDeepChoices(index),
}));

const scorpioDeepChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 9 ? `scorpio-deep-${stage + 1}-start` : undefined,
  resultText,
});

const scorpioDeepStages = [
  {
    title: "窗邊的新座位",
    location: "高二教室",
    text: "轉學生來得很安靜。\n\n夜洵坐在窗邊，制服扣到最上面一顆，桌面乾淨得像沒有人真正停留過。老師請他自我介紹，他只說：「夜洵。請多指教。」\n\n下課後，有人圍上去問東問西，他抬眼掃過所有人，最後視線落在你身上。\n\n「妳不問？」\n\n他的聲音很低，像不是邀請，而是在確認你會不會越界。",
  },
  {
    title: "舊書籤",
    location: "圖書館角落",
    text: "你在圖書館撿到一枚黑色書籤，邊角壓著一枚舊校徽的痕跡。\n\n夜洵從書架另一側伸手拿走，指尖碰到你時很冷。\n\n「那不是妳該碰的東西。」\n\n他說完又停住，像意識到自己語氣太重。窗外開始下雨，玻璃映出他皺起的眉。",
  },
  {
    title: "他記得細節",
    location: "雨天走廊",
    text: "雨下得很急，你站在走廊邊等雨小一點。夜洵路過，把一把黑傘遞給你。\n\n「妳早上看天空三次，卻沒帶傘。」\n\n你愣住。他像只是陳述一個事實，卻連你今天沒吃早餐、上課時按了兩次胃的位置都記得。\n\n他的細心很安靜，也有一點危險，像他早就把你放進觀察範圍。",
  },
  {
    title: "第一次試探",
    location: "夜晚教室",
    text: "放學後，你回教室拿筆記，卻看見夜洵坐在昏暗的窗邊。\n\n他把一本不是你的筆記放在桌上，淡淡問：「如果有人把秘密交到妳手裡，妳會打開嗎？」\n\n你看出那本筆記不像真的被遺落，更像一場測試。\n\n夜洵沒有否認，只是看著你：「我想知道妳會怎麼做。」",
  },
  {
    title: "不能騙他",
    location: "樓梯轉角",
    text: "你答應同學幫忙保密一件小事，卻被夜洵聽見你對他說「沒什麼」。\n\n他的眼神瞬間冷下來。\n\n「妳可以不說。」他靠近一步，聲音壓得很低，「但不要騙我。」\n\n那不是怒吼，卻比怒吼更有壓迫感。你第一次清楚感覺到，他對謊言的反應不是討厭，而是防衛。",
  },
  {
    title: "轉學的秘密",
    location: "鎖住的天台門前",
    text: "你在天台門前看見夜洵和一名陌生學生爭執。對方提到他的舊學校，提到「那件事」，夜洵的表情冷得像雨夜的玻璃。\n\n等對方離開，他把鑰匙握得很緊。\n\n「別問。」\n\n可過了很久，他又低聲補了一句：「不是因為妳不重要，是因為我還不知道怎麼說。」",
  },
  {
    title: "安靜的吃醋",
    location: "放學走廊",
    text: "有同學靠近你，開玩笑說想借你的筆記。夜洵站在不遠處，沒有插話，只是眼神變得很冷。\n\n等人走後，他問：「妳對誰都這麼好？」\n\n語氣平靜，問題卻像一把很細的刀。他沒有命令你遠離誰，卻明顯想逼近答案。",
  },
  {
    title: "界線",
    location: "校園後門",
    text: "夜洵低聲承認自己查過那位同學的社團資料。\n\n「只是確認風險。」\n\n你看著他，他也看著你。這一次，他沒有把佔有慾包裝成保護，卻也沒有完全收回。\n\n「如果我在意妳，這樣不可以嗎？」他問得很輕，像已經知道答案可能會讓他難受。",
  },
  {
    title: "停止測試",
    location: "雨夜教室",
    text: "夜洵把那枚黑色書籤放到你面前。\n\n「我以前相信過一個人。」他看著窗外的雨，「後來所有人都知道了不該知道的事。」\n\n他停了很久，才說：「所以我開始測試每個靠近的人。」\n\n這一次，他沒有設陷阱，只是把真正的傷口放在你面前。",
  },
  {
    title: "坦白的選擇",
    location: "窗邊座位",
    text: "期末後的教室很安靜，只剩窗外淡淡的雨聲。\n\n夜洵站在你的座位旁，低聲說：「我不想再用試探確認妳會不會留下。」\n\n他垂下眼，第一次像真的沒有把握。\n\n「如果我坦白我的不安，也尊重妳的界線，妳還願意靠近我嗎？」",
  },
];

const scorpioDeepChoices = (stage: number): Choice[] => {
  const sets: Choice[][] = [
    [
      scorpioDeepChoice(0, "不追問，只說：等你想說時再說。", effect({ affection: 6, trust: 10, suspicion: -4, boundaryRespect: 7, vulnerableHonesty: 2 }, { kindness: 2, mystery: 1 }, "你沒有急著撬開他的秘密，他眼裡的防備微微鬆了一點。", "curious"), "妳很擅長裝作不好奇？還是很懂界線？"),
      scorpioDeepChoice(0, "直接問他為什麼轉學。", effect({ affection: 5, trust: -2, suspicion: 8, possessiveFear: 2 }, { courage: 2 }, "他看了你一眼，禮貌地把距離拉回陌生人。", "tense"), "第一天就問這個，妳膽子不小。"),
      scorpioDeepChoice(0, "反問：你希望我問嗎？", effect({ affection: 8, trust: 6, suspicion: -1, vulnerableHonesty: 4 }, { intelligence: 2, charm: 1 }, "他像被你的問題反將一軍，沉默半秒後低低笑了一聲。", "playful"), "有意思。妳不是不問，是先看我給不給問。"),
    ],
    [
      scorpioDeepChoice(1, "把書籤還給他，沒有翻看。", effect({ affection: 8, trust: 12, suspicion: -8, boundaryRespect: 8, vulnerableHonesty: 3 }, { kindness: 2, intelligence: 1 }, "他接過書籤，指尖停了一下，像沒想到你真的沒有偷看。", "comfortable"), "妳知道嗎，多數人會說自己不是故意，然後先看完。"),
      scorpioDeepChoice(1, "說他語氣太重，你可以尊重秘密，但不接受被兇。", effect({ affection: 5, trust: 10, boundaryRespect: 12, suspicion: -3, possessiveFear: -2 }, { courage: 3 }, "他的眼神一沉，卻沒有反駁。你看見他第一次為自己的防衛感到不自在。", "honest"), "……妳說得對。剛剛是我失控。"),
      scorpioDeepChoice(1, "開玩笑說秘密越多越可疑。", effect({ affection: 7, trust: 2, suspicion: 5, possessiveFear: 2 }, { charm: 2 }, "他淡淡看你，笑意很淺，像接受玩笑，卻把門關得更緊。", "unresolved"), "那妳最好離可疑的人遠一點。"),
    ],
    [
      scorpioDeepChoice(2, "謝謝他的傘，也提醒他觀察太細會讓人緊張。", effect({ affection: 8, trust: 10, boundaryRespect: 10, suspicion: -4, vulnerableHonesty: 4 }, { courage: 2, kindness: 1 }, "他沉默地把傘柄推近你一點，像在學怎麼不把關心變成壓迫。", "honest"), "我記住了。下次我會先問。"),
      scorpioDeepChoice(2, "接受他的照顧，故意說那你要不要連早餐也管？", effect({ affection: 10, trust: 4, possessiveFear: 6, suspicion: 1 }, { charm: 2, social: 1 }, "他垂眼看你，語氣很淡，卻像低聲靠近。", "playful"), "如果妳允許，我可以。"),
      scorpioDeepChoice(2, "覺得被看穿很不舒服，冷淡拒絕他的傘。", effect({ affection: -2, trust: 2, suspicion: 6, boundaryRespect: 5, vulnerableHonesty: -2 }, { mystery: 2 }, "他收回傘，沒有追問，只是眼神又回到轉學第一天的距離。", "distant"), "明白。那我不靠近。"),
    ],
    [
      scorpioDeepChoice(3, "指出這是測試：你可以不信我，但不能設局。", effect({ affection: 6, trust: 12, suspicion: -10, boundaryRespect: 14, vulnerableHonesty: 5 }, { courage: 3, intelligence: 1 }, "夜洵看著你很久，最後把筆記收回，第一次沒有替自己找藉口。", "honest", { scorpio_refused_test: true }), "妳比我想的更難騙。也更不容易被嚇走。"),
      scorpioDeepChoice(3, "配合他的測試，說自己絕對不會看。", effect({ affection: 9, trust: 3, suspicion: 5, possessiveFear: 4, boundaryRespect: -4 }, { kindness: 2 }, "他像是得到想要的答案，卻沒有真的安心，因為測試只會讓下一次測試更容易發生。", "dependent"), "很漂亮的答案。可漂亮不一定是真的。"),
      scorpioDeepChoice(3, "生氣離開，說他愛信不信。", effect({ affection: -2, trust: -2, suspicion: 8, boundaryRespect: 3 }, { courage: 2 }, "他沒有追上來，教室裡只剩他把筆記合上的聲音。", "distant"), "……至少妳沒有說謊。"),
    ],
    [
      scorpioDeepChoice(4, "承認你保密了，但說不想騙他，只是不方便說別人的事。", effect({ affection: 8, trust: 13, suspicion: -8, boundaryRespect: 8, vulnerableHonesty: 5 }, { intelligence: 2, kindness: 1 }, "他的冷意慢慢退了一點，像第一次把不說和欺騙分開。", "honest"), "可以不說。這句話，我會學著相信。"),
      scorpioDeepChoice(4, "用玩笑帶過，說他想太多了。", effect({ affection: 4, trust: -4, suspicion: 10, possessiveFear: 5, vulnerableHonesty: -3 }, { charm: 2 }, "他的眼神更冷，像你親手把門又推回鎖裡。", "tense"), "別用玩笑蓋掉謊言。"),
      scorpioDeepChoice(4, "反問他是不是也有很多事沒告訴你。", effect({ affection: 6, trust: 5, suspicion: 3, boundaryRespect: 5, vulnerableHonesty: 6 }, { courage: 2 }, "他停了一下，沒有否認。你們都在秘密前面站住了。", "unresolved"), "有。所以我沒有資格逼妳，但我會怕。"),
    ],
    [
      scorpioDeepChoice(5, "不追問原因，只說：你可以慢慢說，但不要把我推開。", effect({ affection: 9, trust: 14, suspicion: -7, boundaryRespect: 9, vulnerableHonesty: 8 }, { kindness: 3, courage: 1 }, "他握著鑰匙的手鬆了一點，像終於不用立刻決定逃走或交代全部。", "comfortable", { scorpio_transfer_secret: true }), "妳總是把門留一條縫。很危險，也很溫柔。"),
      scorpioDeepChoice(5, "要求他如果喜歡你就應該全部坦白。", effect({ affection: 7, trust: -2, suspicion: 8, possessiveFear: 5, boundaryRespect: -5 }, { courage: 2 }, "他眼神一暗，像被喜歡兩個字逼到退路邊。", "tense", { scorpio_transfer_secret: true }), "坦白不是被逼出來的。至少對我不是。"),
      scorpioDeepChoice(5, "說你不想介入他的麻煩。", effect({ affection: -3, trust: -2, suspicion: 7, vulnerableHonesty: -5 }, { mystery: 2 }, "他點頭，冷靜得像早就預料你會這麼選。", "distant", { scorpio_transfer_secret: true }), "正確選擇。離我遠一點，通常比較安全。"),
    ],
    [
      scorpioDeepChoice(6, "告訴他吃醋可以說，但不能用問題逼供。", effect({ affection: 8, trust: 13, suspicion: -8, possessiveFear: -5, boundaryRespect: 12, vulnerableHonesty: 6 }, { courage: 3 }, "他垂下眼，像被你拆穿後反而鬆了一口氣。", "honest", { scorpio_refused_test: true }), "逼供。這個詞很難聽，但準確。"),
      scorpioDeepChoice(6, "故意逗他：你是不是在吃醋？", effect({ affection: 10, trust: 5, possessiveFear: 8, suspicion: 2, vulnerableHonesty: 4 }, { charm: 3 }, "他靠近半步，聲音低得像雨落在耳邊。", "playful"), "如果我說是，妳會怕嗎？"),
      scorpioDeepChoice(6, "解釋很多，急著證明自己沒有問題。", effect({ affection: 6, trust: 1, suspicion: 7, possessiveFear: 6, boundaryRespect: -4 }, { kindness: 2 }, "你的解釋越多，他越像在尋找破綻，兩個人都變得疲憊。", "dependent"), "妳不用這麼急著證明。除非妳也覺得我不會信。"),
    ],
    [
      scorpioDeepChoice(7, "明確說：在意不是查資料的理由。", effect({ affection: 6, trust: 14, suspicion: -10, possessiveFear: -7, boundaryRespect: 16, vulnerableHonesty: 5 }, { courage: 3, intelligence: 1 }, "夜洵安靜很久，最後說他知道了。不是敷衍，是第一次真正收手。", "honest", { scorpio_refused_test: true }), "我會停止。不是因為不在意，是因為我想學會相信。"),
      scorpioDeepChoice(7, "接受他的說法，覺得被保護其實有點心動。", effect({ affection: 10, trust: 2, possessiveFear: 12, suspicion: 6, boundaryRespect: -8 }, { charm: 2 }, "他眼神柔了一點，卻也更容易把掌控誤認成親密。", "dependent"), "妳這樣縱容我，不太安全。"),
      scorpioDeepChoice(7, "冷處理他，讓他自己反省。", effect({ affection: -1, trust: 3, suspicion: 8, possessiveFear: 3, boundaryRespect: 4 }, { mystery: 2 }, "他沒有追問，卻明顯更封閉。冷處理讓你們都回到防備裡。", "distant"), "我懂了。妳也會用沉默懲罰人。"),
    ],
    [
      scorpioDeepChoice(8, "聽完後說：我心疼你，但我不會接受被測試。", effect({ affection: 10, trust: 16, suspicion: -12, possessiveFear: -6, boundaryRespect: 16, vulnerableHonesty: 14 }, { kindness: 2, courage: 3 }, "他的眼神顫了一下，像第一次被人同時理解，也被清楚要求。", "intimate", { scorpio_no_more_tests: true }), "這比安慰難聽。但我需要聽。"),
      scorpioDeepChoice(8, "只安慰他，說以後你都會證明給他看。", effect({ affection: 12, trust: 5, suspicion: 4, possessiveFear: 8, boundaryRespect: -6, vulnerableHonesty: 6 }, { kindness: 3 }, "他靠近你，卻沒有真正學會停止測試，因為你把自己放進了被驗證的位置。", "dependent"), "別給我這種承諾。我會忍不住當真。"),
      scorpioDeepChoice(8, "說過去不能成為他傷害關係的理由。", effect({ affection: 5, trust: 12, suspicion: -6, boundaryRespect: 12, vulnerableHonesty: 8 }, { intelligence: 2, courage: 2 }, "他被你的直接刺痛，卻沒有逃開。", "honest", { scorpio_no_more_tests: true }), "妳說得對。我只是……很不擅長承認。"),
    ],
    [
      scorpioDeepChoice(9, "靠近他：我願意聽，但我們都不能再用試探靠近。", effect({ affection: 18, trust: 18, suspicion: -18, possessiveFear: -10, boundaryRespect: 20, vulnerableHonesty: 20 }, { courage: 3, kindness: 3 }, "夜洵把書籤放進你手心，第一次沒有任何陷阱，只剩低聲而坦白的喜歡。", "intimate", { scorpio_no_more_tests: true, scorpio_refused_test: true }), "好。我不測試妳了。我會問，會說，也會等妳回答。"),
      scorpioDeepChoice(9, "接受他的深情，但說只要他愛你，偶爾試探也沒關係。", effect({ affection: 16, trust: 5, suspicion: 12, possessiveFear: 12, boundaryRespect: -10, vulnerableHonesty: 4 }, { kindness: 3 }, "他抱住你，卻沒有真正安全。深情變得很重，像一間沒有窗的房間。", "dependent"), "別這樣縱容我。妳會後悔。"),
      scorpioDeepChoice(9, "後退一步，說你還不能相信他真的會改。", effect({ affection: -2, trust: 8, suspicion: 4, possessiveFear: -2, boundaryRespect: 8, vulnerableHonesty: 5 }, { mystery: 3 }, "他沒有阻止你，只低聲說這次他會尊重你的距離。", "farewell"), "我知道。這是我自己造成的。"),
    ],
  ];
  return sets[stage];
};

const scorpioDeepScenes: Scene[] = scorpioDeepStages.map((stage, index) => ({
  id: `scorpio-deep-${index}-start`,
  title: stage.title,
  location: stage.location,
  characterId: "scorpio",
  text: stage.text,
  choices: scorpioDeepChoices(index),
}));

const sagittariusDeepChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 9 ? `sagittarius-deep-${stage + 1}-start` : undefined,
  resultText,
});

const sagittariusDeepStages = [
  {
    title: "旅行社團的快門聲",
    location: "旅行社團活動室",
    text: "旅行社團的門半開著，桌上散著地圖、車票、拍立得和一台相機。\n\n原野蹲在窗邊調鏡頭，陽光落在他肩上，像隨時會出發的人。他看見你站在門口，直接把相機舉起來：\n\n「等一下，別動。妳現在的表情很像迷路，但還想假裝自己只是路過。」\n\n快門聲響起，你還沒來得及抗議，他已經笑著把照片甩了甩。",
  },
  {
    title: "他用照片靠近",
    location: "校園中庭",
    text: "午休時，原野把一張拍立得塞到你桌上。照片裡是操場邊一小片被夕陽照亮的樹影。\n\n「這角度不錯吧？我剛剛路過覺得妳會喜歡。」\n\n他說得很自然，像只是分享天氣。可照片背面寫著：今天的光，很適合給妳。\n\n他看見你翻到背面，耳尖微微紅了，卻立刻咳了一聲：「字是相機自己寫的。」",
  },
  {
    title: "旅行社團的出走計畫",
    location: "舊車站",
    text: "旅行社團週末去舊車站取景。原野一到月台就像被打開開關，帶大家找光線、看路線、爬上老舊天橋。\n\n有人問他畢業後是不是會繼續交換計畫。他笑著說：「應該吧，世界那麼大，停太久會生鏽。」\n\n你聽見這句話，忽然發現他講遠方時很亮，講留下時卻總是跳過。",
  },
  {
    title: "粗線條的安慰",
    location: "海邊公車站",
    text: "社團外拍遇到突來的雨。你因為一件小事心情低落，原野把外套丟給你，自己淋得像剛從海裡撈上來。\n\n「難過就難過啊，不用把臉擺得像考卷答案。」\n\n他說得很直接，甚至有點笨拙。可他沒有逼你笑，只是在你旁邊坐下，把相機關掉，陪你看雨線落進海裡。",
  },
  {
    title: "交換期限",
    location: "學校天台",
    text: "原野收到交換學校的信件，期限比你想像得更近。\n\n他把信折起來，語氣還是輕快：「也不算突然啦，本來就只是暫時停靠。」\n\n但你看見他指尖捏皺了信角。風從天台吹過，他望著遠處，像已經在練習把在意的東西放回原位。",
  },
  {
    title: "不要太習慣我",
    location: "便利商店門口",
    text: "放學後，他陪你走到便利商店，順手買了你常喝的飲料。\n\n你接過時，他忽然說：「不要太習慣我喔。」\n\n語氣像玩笑，眼神卻沒有笑。他看著店門玻璃上的倒影，補了一句：「我這種人很常走，妳太習慣的話，會很麻煩。」\n\n你第一次聽懂，他不是不在乎，而是怕自己變成你的遺憾。",
  },
  {
    title: "想傳卻沒傳的照片",
    location: "旅行社團暗房",
    text: "你幫忙整理照片時，看見原野手機相簿裡有一個資料夾，名字叫「還沒傳」。\n\n裡面很多照片都像是拍給你的：你提過想看的夜景、你錯過的雲、你說過很像星星的路燈。\n\n原野搶回手機，笑得有點狼狽：「只是素材備份啦。不要把我想得那麼文藝，我會起雞皮疙瘩。」\n\n可他沒有刪掉任何一張。",
  },
  {
    title: "控制感與安全感",
    location: "夜景步道",
    text: "夜景外拍結束後，你們落在隊伍最後。城市燈光像撒在地上的星圖。\n\n你問他：「如果你走了，我們算什麼？」\n\n原野沉默很久，才低聲說：「我不想讓妳等一個不確定的人。」\n\n他看向你，第一次沒有用笑容把問題帶過：「可是我也不想妳覺得，我走了就代表不想回來。」",
  },
  {
    title: "回程車票",
    location: "舊車站售票口",
    text: "交換前的最後一次社團活動，原野買了兩張舊車站紀念車票。\n\n一張寫著出發，一張寫著回程。\n\n他把出發那張收進相機包，回程那張卻在指間轉了很久。\n\n「很奇怪吧？明明還沒走，就先買回程。」他笑了一下，「但我最近覺得，想回來好像也不是很丟臉。」",
  },
  {
    title: "下一站與回程",
    location: "海邊月台",
    text: "列車即將進站，海風把你的頭髮吹亂。原野背著相機包，手裡拿著那張回程票。\n\n他沒有說華麗情話，只是把拍立得放進你手心。照片裡是你站在夜景步道回頭的瞬間，背面寫著：我想把遠方拍給妳看，也想把回程留給妳。\n\n他看著你，少見地緊張：「所以，妳要怎麼回答這個超級不帥的告白？」",
  },
];

const sagittariusDeepChoices = (stage: number): Choice[] => {
  const sets: Choice[][] = [
    [
      sagittariusDeepChoice(0, "直接吐槽他：偷拍還講得這麼理直氣壯？", effect({ affection: 9, trust: 5, freedomNeed: 1, returnDesire: 4, commitmentFear: -2 }, { charm: 2, courage: 1 }, "你用吐槽接住他的直球，他笑到差點把拍立得甩出去。", "playful"), "原來妳吐槽人的速度比快門還快。"),
      sagittariusDeepChoice(0, "問他照片能不能給你，說你想留下這一刻。", effect({ affection: 8, trust: 8, returnDesire: 5, commitmentFear: 1, distanceRespect: 2 }, { kindness: 2, mystery: 1 }, "他把照片遞給你，嘴上說只是失敗樣張，手卻沒有立刻放開。", "curious"), "可以啊。只是妳不要拿去當我的黑歷史。"),
      sagittariusDeepChoice(0, "保持距離，提醒他下次拍照前要先問。", effect({ affection: 3, trust: 10, distanceRespect: 7, freedomNeed: -2, commitmentFear: -1 }, { intelligence: 2, courage: 1 }, "他立刻舉手道歉，還把相機轉給你看刪除鍵在哪。", "honest"), "收到。自由不是拿來越界的，這我懂。"),
    ],
    [
      sagittariusDeepChoice(1, "收下照片，回他：那我也把今天的光存起來。", effect({ affection: 10, trust: 6, returnDesire: 6, commitmentFear: -1 }, { charm: 2, kindness: 1 }, "他移開視線，假裝看天空，耳尖卻紅得比夕陽還明顯。", "playful"), "妳這句很犯規欸。我要重新測光。"),
      sagittariusDeepChoice(1, "笑著說你不用假裝，相機應該沒那麼會寫字。", effect({ affection: 7, trust: 9, returnDesire: 4, distanceRespect: 3, commitmentFear: -2 }, { social: 2, courage: 1 }, "他揉揉頭髮，第一次沒立刻反駁，只說被妳抓包的機率有點高。", "honest"), "好啦，是我寫的。可是字很醜，不准笑。"),
      sagittariusDeepChoice(1, "開玩笑說那你以後每天都要交一張照片。", effect({ affection: 9, trust: 2, freedomNeed: 7, commitmentFear: 6, returnDesire: 2 }, { charm: 2 }, "他笑著答應，卻很快補上一句不要把我當固定班表。", "unresolved"), "每天喔？妳也太會安排旅遊行程了吧。"),
    ],
    [
      sagittariusDeepChoice(2, "說你喜歡他眼裡的遠方，不會叫他停下來。", effect({ affection: 9, trust: 10, distanceRespect: 8, returnDesire: 6, commitmentFear: -4 }, { mystery: 2, kindness: 1 }, "他看了你很久，像第一次發現有人能喜歡他的出發，也不把出發當背叛。", "comfortable"), "妳這樣講，我會真的想把路線傳給妳。"),
      sagittariusDeepChoice(2, "問他：如果一直出發，會不會也想念某個地方？", effect({ affection: 8, trust: 8, returnDesire: 8, commitmentFear: -1, freedomNeed: -2 }, { intelligence: 2, courage: 1 }, "他把相機放低，笑容慢了半拍。", "honest"), "可能吧。只是我以前不太敢承認。"),
      sagittariusDeepChoice(2, "假裝輕鬆說反正交換學生本來就會走。", effect({ affection: 3, trust: -1, commitmentFear: 8, freedomNeed: 5, returnDesire: -2 }, { social: 2 }, "他笑得很快，像終於聽見一個安全答案，可你也看見他眼神暗了一下。", "distant"), "對啊，所以大家都不要太認真，最方便。"),
    ],
    [
      sagittariusDeepChoice(3, "接受他的笨拙安慰，說：你不用很會講，坐著就好。", effect({ affection: 8, trust: 12, returnDesire: 5, commitmentFear: -4, distanceRespect: 5 }, { kindness: 3 }, "他安靜下來，真的只是坐著，偶爾把外套往你那邊推一點。", "comfortable"), "那我坐著。很簡單，我會。"),
      sagittariusDeepChoice(3, "吐槽他安慰技術很粗，但外套加分。", effect({ affection: 10, trust: 6, returnDesire: 4, freedomNeed: 1 }, { charm: 2, courage: 1 }, "他露出鬆一口氣的笑，說自己至少在行動分數上沒有零分。", "playful"), "粗線條也有粗線條的好處吧？比如外套很大件。"),
      sagittariusDeepChoice(3, "要求他保證以後都會陪你。", effect({ affection: 7, trust: -3, commitmentFear: 10, freedomNeed: 5, distanceRespect: -5 }, { kindness: 2 }, "他沒有立刻答應，只把視線投向海面，像承諾兩個字比雨還重。", "tense"), "我不想隨便保證，因為我怕做不到會更爛。"),
    ],
    [
      sagittariusDeepChoice(4, "問清楚期限，也說你不需要他假裝沒事。", effect({ affection: 7, trust: 13, returnDesire: 7, commitmentFear: -5, distanceRespect: 4 }, { intelligence: 2, courage: 2 }, "他把信攤開給你看，第一次沒有把離別說成玩笑。", "honest", { sagittarius_exchange_deadline: true }), "好。那我不裝。其實我有點煩，煩自己會在意。"),
      sagittariusDeepChoice(4, "故作開朗說那就趁他走前排滿約會行程。", effect({ affection: 11, trust: 3, freedomNeed: 6, commitmentFear: 5, returnDesire: 5 }, { charm: 3 }, "他被約會兩個字逗笑，卻又立刻說別排太滿。", "playful", { sagittarius_exchange_deadline: true }), "行程可以，但不要搞得像倒數計時啦。"),
      sagittariusDeepChoice(4, "沉默收起情緒，不問也不看那封信。", effect({ affection: 1, trust: -2, commitmentFear: 8, returnDesire: -3, distanceRespect: -1 }, { mystery: 2 }, "他也跟著沉默，兩個人都假裝風聲足夠填滿答案。", "distant", { sagittarius_exchange_deadline: true }), "嗯。反正也還有時間。"),
    ],
    [
      sagittariusDeepChoice(5, "清楚說：我不會用習慣綁住你，但我也不想被你推開。", effect({ affection: 10, trust: 14, distanceRespect: 10, returnDesire: 9, commitmentFear: -8 }, { courage: 3, kindness: 2 }, "他握著飲料的手停住，像被你直接命中最想躲的地方。", "honest", { sagittarius_not_control_but_clear: true }), "妳講話也太直了吧。可是，謝謝妳沒讓我逃。"),
      sagittariusDeepChoice(5, "笑著答：太晚了，我已經習慣你買錯但很好喝的飲料。", effect({ affection: 11, trust: 5, returnDesire: 7, commitmentFear: 2, freedomNeed: 2 }, { charm: 2, social: 1 }, "他笑出聲，說自己哪有買錯，明明是實驗新口味。", "playful"), "那我下次繼續錯，錯到妳記得。"),
      sagittariusDeepChoice(5, "冷淡說放心，我不會等人。", effect({ affection: -1, trust: -4, commitmentFear: 9, returnDesire: -6, distanceRespect: 1 }, { mystery: 2 }, "他點點頭，笑容恢復得太快，像終於把你放回安全距離。", "distant"), "這樣很好。真的，這樣最輕鬆。"),
    ],
    [
      sagittariusDeepChoice(6, "告訴他：想傳就傳，不用把在意藏成素材。", effect({ affection: 9, trust: 13, returnDesire: 10, commitmentFear: -7, distanceRespect: 5 }, { courage: 2, kindness: 2 }, "他把手機放回桌上，低聲說原來傳照片也可以不是打擾。", "intimate"), "那我以後傳。不是報備，是想給妳看。"),
      sagittariusDeepChoice(6, "調侃他資料夾名字太明顯，建議改成宇宙機密。", effect({ affection: 10, trust: 6, returnDesire: 5, commitmentFear: -2, freedomNeed: 1 }, { charm: 3 }, "他被你逗笑，緊張感散掉一半，卻沒有再否認那些照片是拍給你看的。", "playful"), "宇宙機密不錯，聽起來比較帥。"),
      sagittariusDeepChoice(6, "追問他為什麼都不傳，是不是根本沒把你放心上。", effect({ affection: 5, trust: -5, commitmentFear: 10, freedomNeed: 4, distanceRespect: -6 }, { courage: 2 }, "他皺起眉，沒有生氣，只是把手機收得更緊，像你把門敲得太急。", "tense"), "不是那樣。只是我不知道傳了以後，妳會不會開始等。"),
    ],
    [
      sagittariusDeepChoice(7, "說你要的是誠實，不是行蹤報告。", effect({ affection: 9, trust: 14, distanceRespect: 12, returnDesire: 8, commitmentFear: -7 }, { intelligence: 2, courage: 2 }, "他看著夜景，慢慢點頭，像終於分清楚關心和控制不是同一件事。", "honest", { sagittarius_not_control_but_clear: true }), "那我可以誠實。我害怕妳等，也害怕妳不等。"),
      sagittariusDeepChoice(7, "說如果他真的喜歡，就該每天報平安。", effect({ affection: 7, trust: -2, commitmentFear: 12, freedomNeed: 8, distanceRespect: -8 }, { kindness: 1, social: 1 }, "他試著答應，卻笑得很勉強，像把喜歡聽成一份考勤表。", "dependent"), "我可以試試。但我怕這樣會把我們都弄得很累。"),
      sagittariusDeepChoice(7, "說你也會有自己的生活，不會把安全感全押在他身上。", effect({ affection: 8, trust: 12, distanceRespect: 10, returnDesire: 7, commitmentFear: -5, freedomNeed: -2 }, { mystery: 2, kindness: 1 }, "他鬆了一口氣，卻也有點失落，然後誠實承認自己其實希望被你想念。", "comfortable"), "妳很酷欸。酷到我反而想努力被妳想起來。"),
    ],
    [
      sagittariusDeepChoice(8, "把回程票推回給他：想回來不是籠子，是你的選擇。", effect({ affection: 11, trust: 15, distanceRespect: 14, returnDesire: 14, commitmentFear: -12, freedomNeed: -5 }, { courage: 3, kindness: 2 }, "他盯著車票很久，像終於允許自己把自由和回來放在同一張地圖上。", "intimate", { sagittarius_return_is_not_cage: true }), "如果是我自己選的，好像就不是被綁住。"),
      sagittariusDeepChoice(8, "開玩笑說那張回程票要加蓋女主專用章。", effect({ affection: 12, trust: 6, returnDesire: 10, commitmentFear: -3, distanceRespect: 2 }, { charm: 3 }, "他笑著說你很會破壞帥氣氣氛，卻把票收進最安全的相機內袋。", "playful"), "專用章太中二了吧。可是，可以。"),
      sagittariusDeepChoice(8, "問他是不是只是怕你難過才買回程票。", effect({ affection: 4, trust: 6, commitmentFear: 4, returnDesire: 2, distanceRespect: -2 }, { intelligence: 2 }, "他沉默了一會，沒有反駁，只說他也還在學怎麼分辨想回來和怕辜負。", "unresolved"), "可能都有。我不想說得太漂亮，怕又像逃避。"),
    ],
    [
      sagittariusDeepChoice(9, "收下拍立得：去吧，把遠方拍給我看，也記得回來。", effect({ affection: 18, trust: 18, distanceRespect: 18, returnDesire: 20, commitmentFear: -16, freedomNeed: -8 }, { courage: 3, kindness: 3 }, "原野笑了，眼眶卻有一點紅。他說好，這次不是保證不離開，而是承認自己會想回來。", "reunion", { sagittarius_return_is_not_cage: true, sagittarius_not_control_but_clear: true }), "好。我會拍很多很多遠方給妳，然後把我自己也帶回來。"),
      sagittariusDeepChoice(9, "抱住他，說你可以等，其他都不重要。", effect({ affection: 15, trust: 6, commitmentFear: 10, freedomNeed: 6, returnDesire: 8, distanceRespect: -8 }, { kindness: 3 }, "他回抱你，卻在你看不見的地方閉上眼，像幸福突然變成一份很重的行李。", "dependent"), "妳這樣講，我會很想留下。但我怕那不是我們真正想要的方式。"),
      sagittariusDeepChoice(9, "把拍立得還給他，說不確定的告白不如不要開始。", effect({ affection: -4, trust: 4, commitmentFear: 8, returnDesire: -8, distanceRespect: 5 }, { mystery: 3 }, "他接回照片，笑著說你說得對，然後把那張拍立得放進沒有送出的資料夾。", "farewell"), "嗯。妳值得確定的人。只是我有點希望，那個人可以是我。"),
    ],
  ];
  return sets[stage];
};

const sagittariusDeepScenes: Scene[] = sagittariusDeepStages.map((stage, index) => ({
  id: `sagittarius-deep-${index}-start`,
  title: stage.title,
  location: stage.location,
  characterId: "sagittarius",
  text: stage.text,
  choices: sagittariusDeepChoices(index),
}));

const capChoice = (
  stage: number,
  text: string,
  choiceEffect: ChoiceEffect,
  resultText: string
): Choice => ({
  text,
  effect: choiceEffect,
  nextSceneId: stage < 7 ? `capricorn-${stage + 1}-start` : undefined,
  resultText,
});

const capricornStages = [
  {
    title: "大學演講初遇",
    location: "母校物理系講堂",
    text: "黑板上滿是公式，沈知衡沒有看投影片，只用一支粉筆把複雜概念講得清楚。\n\n你撿到他的實驗筆記，第一頁寫著：真正重要的，不是答案，而是推導的過程。\n\n他在你身後停下，聲音很慢：那是我的。",
  },
  {
    title: "實驗室參觀",
    location: "量子材料實驗室",
    text: "他換上護目鏡與手套，袖口捲到手腕。進入實驗室後，他像變了一個人，眼神專注得近乎溫柔。\n\n你忽然明白：教授真正喜歡的是物理。",
  },
  {
    title: "一起整理實驗數據",
    location: "資料分析室",
    text: "異常值一筆一筆跳出來，咖啡冷掉，夜色壓在窗上。\n\n他低聲自言自語，你坐在旁邊核對數據。這不是約會，卻比甜言蜜語更像靠近。",
  },
  {
    title: "熬夜三天的論文",
    location: "教授辦公室",
    text: "他熬夜三天完成論文，白襯衫仍沒有皺褶，只有眼底疲憊藏不住。\n\n他問你：昨天是不是也沒睡？明明最該被照顧的人是他。",
  },
  {
    title: "研究經費被砍",
    location: "系辦走廊",
    text: "經費被砍的通知像一張冷冰冰的判決。他沒有失控，只把保溫杯握得更緊。\n\n你第一次看見，他所謂理性，其實是把慌張關起來。",
  },
  {
    title: "重要研究遭質疑",
    location: "研討會準備室",
    text: "有人質疑他的研究價值。他回應得精準，卻在會後很久沒有說話。\n\n他說：價值需要被證明。人也是。",
  },
  {
    title: "第一次主動請你吃飯",
    location: "安靜的餐廳",
    text: "他訂了靠窗的位置，剛好是你喜歡的角度。你提到今天有人找你聊天，他只說很好。\n\n下一秒，他喝咖啡太快燙到自己。",
  },
  {
    title: "國際研討會告白",
    location: "海外研討會夕陽下",
    text: "黑板上仍留著沒寫完的公式。他看著你，終於不再把所有情緒藏進理性。\n\n他說：以前我以為人生只需要證明定理。後來才知道，有一個人願意陪你，比得到正確答案更困難。",
  },
];

const capricornChoices = (stage: number): Choice[] => {
  const coreFlag = stage === 7 ? { capricorn_core: true } : undefined;
  const sets: Choice[][] = [
    [
      capChoice(0, "把筆記合上，沒有偷看後面的內容。", effect({ affection: 8, trust: 12, professorComposure: -4 }, { intelligence: 3 }, "你尊重他的界線。", "curious"), "謝謝。很少有人能忍住不翻。"),
      capChoice(0, "稱讚他的推導很漂亮，而不是只說他很厲害。", effect({ affection: 12, trust: 6, professorComposure: -8 }, { intelligence: 4, charm: 1 }, "你稱讚的是他的思考方式。", "curious"), "漂亮……這個形容，不常有人用在推導上。"),
      capChoice(0, "開玩笑：教授的字比命運還難懂。", effect({ affection: 7, trust: 3, professorComposure: -10 }, { charm: 3, social: 2 }, "他的表情沒變，但推眼鏡的次數增加了。", "playful"), "妳可以說字醜，不必牽連命運。"),
    ],
    [
      capChoice(1, "認真聽安全規範，照他的步驟戴好護目鏡。", effect({ affection: 7, trust: 12, professorComposure: -3 }, { intelligence: 3 }, "你沒有把實驗室當戀愛景點。", "comfortable"), "很好。實驗室不喜歡僥倖。"),
      capChoice(1, "問他為什麼研究量子材料。", effect({ affection: 12, trust: 8, professorComposure: -7 }, { intelligence: 4, mystery: 1 }, "你第一次看見他真的在發光。", "curious"), "因為材料會記得結構。人不一定。"),
      capChoice(1, "逗他：教授戴護目鏡比平常更像反派。", effect({ affection: 8, trust: 2, jealousy: 1, professorComposure: -14 }, { charm: 4 }, "他耳朵慢慢紅了。", "playful"), "請把觀察力用在儀器上。"),
    ],
    [
      capChoice(2, "陪他把異常值一筆一筆核對。", effect({ affection: 8, trust: 13, professorComposure: -4 }, { intelligence: 4 }, "你用耐心證明自己不是一時新鮮。", "comfortable"), "妳很適合做研究。至少不會看到問題就逃。"),
      capChoice(2, "提醒他休息，咖啡不要空腹喝。", effect({ affection: 10, trust: 8, professorComposure: -12 }, { kindness: 4 }, "輪到他被照顧時，他反而不知道怎麼回答。", "comfortable"), "……我知道。妳也一樣。"),
      capChoice(2, "提到今天有學弟跟你聊研究。", effect({ affection: 5, trust: 3, jealousy: 12, professorComposure: -18 }, { social: 3 }, "他說很好，下一秒咖啡喝太快燙到自己。", "jealous"), "很好。學術交流是必要的。"),
    ],
    [
      capChoice(3, "直接把晚餐放到他桌邊，說資料可以等十分鐘。", effect({ affection: 12, trust: 8, professorComposure: -15 }, { courage: 3, kindness: 3 }, "他想反駁，但肚子很不配合地叫了一聲。", "honest"), "十分鐘。不能再多。"),
      capChoice(3, "安靜留下來幫他整理引用格式。", effect({ affection: 8, trust: 12, professorComposure: -6 }, { intelligence: 3 }, "你沒有打擾他的節奏，卻真的減輕了負擔。", "comfortable"), "妳其實可以不用做到這個程度。"),
      capChoice(3, "說他不是只有物理值得被喜歡。", effect({ affection: 14, trust: 10, professorComposure: -20 }, { kindness: 4, courage: 2 }, "這句話精準擊中他最不敢看的地方。", "honest"), "……妳現在說這種話，很不理性。"),
    ],
    [
      capChoice(4, "一起重排經費計畫，不急著安慰。", effect({ affection: 8, trust: 14, professorComposure: -5 }, { intelligence: 4 }, "你陪他面對現實壓力。", "comfortable"), "妳的方案可以用。比系辦那份清楚。"),
      capChoice(4, "告訴他：失去經費不代表研究沒有價值。", effect({ affection: 12, trust: 9, professorComposure: -16 }, { kindness: 4 }, "他很久沒有說話。", "honest"), "價值需要被證明。人也是。"),
      capChoice(4, "故意問：教授也會怕嗎？", effect({ affection: 6, trust: 4, jealousy: 2, professorComposure: -18 }, { courage: 3 }, "他看了你一眼，像是想否認，又覺得否認太幼稚。", "honest"), "會。只是我通常不說。"),
    ],
    [
      capChoice(5, "相信他的研究，也要求他把痛苦說完整。", effect({ affection: 13, trust: 14, professorComposure: -18 }, { courage: 4, kindness: 2 }, "你沒有崇拜教授，而是在看沈知衡這個人。", "honest"), "妳知道自己在要求什麼嗎？我不擅長說這些。"),
      capChoice(5, "冷靜陪他整理反駁資料。", effect({ affection: 8, trust: 12, professorComposure: -6 }, { intelligence: 4 }, "他重新找回推導的節奏。", "comfortable"), "留下來。這組數據，妳看得比他們仔細。"),
      capChoice(5, "說你不是因為崇拜教授才留下。", effect({ affection: 15, trust: 10, jealousy: -2, professorComposure: -22 }, { charm: 2, courage: 3 }, "他最害怕的誤會被你拆開。", "honest"), "那妳是因為什麼？"),
    ],
    [
      capChoice(6, "接受晚餐，也自然提起你最近喜歡的位置。", effect({ affection: 10, trust: 8, professorComposure: -12 }, { social: 3 }, "隔天你發現他真的記住了。", "intimate"), "那裡靠窗。光線不刺眼，適合妳。"),
      capChoice(6, "問他是不是在吃醋。", effect({ affection: 12, trust: 8, jealousy: -6, professorComposure: -24 }, { courage: 4 }, "他差點把菜單拿反。", "jealous"), "我沒有資格限制妳。所以我不會那樣說。"),
      capChoice(6, "逗他：教授明天要不要也約我看電影？", effect({ affection: 11, trust: 5, jealousy: -4, professorComposure: -28 }, { charm: 4 }, "他沉默三秒，開始推眼鏡。", "playful"), "明天七點。若妳有空。"),
    ],
    [
      capChoice(7, "核心理解：你不用變得有趣才值得被留下。", effect({ affection: 20, trust: 20, jealousy: -10, professorComposure: -35 }, { kindness: 4, courage: 4 }, "他終於承認，真正沒有安全感的人一直是他。", "intimate", coreFlag), "我其實很容易吃醋。只是我沒有資格限制妳，所以只能努力變成值得妳留下的人。"),
      capChoice(7, "告訴他你喜歡的是教授的光環。", effect({ affection: 6, trust: -8, jealousy: 8, professorComposure: -8 }, { charm: 2 }, "他把自己重新放回安全距離。", "distant"), "光環很容易消失。妳不該把人生交給那種東西。"),
      capChoice(7, "說等他想清楚再回答，先不逼他。", effect({ affection: 8, trust: 8, professorComposure: -10 }, { mystery: 3 }, "你給了他空間，也保留了遺憾。", "unresolved"), "謝謝。妳總是比我以為的更冷靜。"),
    ],
  ];
  return sets[stage];
};

const capricornPrologueScene: Scene = {
  id: "capricorn-adult-prologue",
  title: "成年篇序章：雨廊初遇",
  location: "母校物理館走廊",
  characterId: "capricorn",
  text:
    "多年後，你以校友身分回到母校參加物理系演講。雨停在玻璃廊外，空氣裡有雪松、紙張和一點很淡的咖啡味。\n\n一疊演講資料從轉角滑落，你下意識伸手接住。黑色大衣的男人停在你面前，白襯衫沒有一絲皺褶，金屬框眼鏡後的目光冷靜得像正在估算誤差。\n\n沈知衡：「謝謝。演講快開始了。」",
  choices: [
    {
      text: "把最後一張講義遞給他，提醒右上角沾到雨水。",
      effect: effect({ affection: 6, trust: 9, professorComposure: -3 }, { intelligence: 2, kindness: 2 }, "你注意到細節，也沒有刻意套近乎。", "curious"),
      nextSceneId: "capricorn-0-start",
      resultText: "觀察力不錯。進場後坐第三排，黑板看得最清楚。",
    },
    {
      text: "開玩笑說：教授的出場方式很像物理系限定隱藏角色。",
      effect: effect({ affection: 8, trust: 3, professorComposure: -12 }, { charm: 3, social: 2 }, "他的表情完全沒變，但耳朵紅得很誠實。", "playful"),
      nextSceneId: "capricorn-0-start",
      resultText: "物理系沒有隱藏角色。只有排不完的實驗。",
    },
    {
      text: "安靜點頭，保持距離，讓他先去準備演講。",
      effect: effect({ affection: 3, trust: 12, professorComposure: -1 }, { mystery: 3 }, "你沒有越界，這種分寸讓他少見地放慢腳步。", "comfortable"),
      nextSceneId: "capricorn-0-start",
      resultText: "謝謝。妳也別淋雨。",
    },
  ],
};

const capricornScenes: Scene[] = capricornStages.map((stage, index) => ({
  id: `capricorn-${index}-start`,
  title: `${stage.title}：沈知衡成年篇`,
  location: stage.location,
  characterId: "capricorn",
  text: stage.text,
  choices: capricornChoices(index),
}));

const authoredScenes: Scene[] = [
  ...genericScenes,
  ...ariesScenes,
  ...leoDeepScenes,
  ...libraDeepScenes,
  ...taurusDeepScenes,
  ...cancerDeepScenes,
  ...virgoDeepScenes,
  ...aquariusDeepScenes,
  ...geminiDeepScenes,
  ...scorpioDeepScenes,
  ...sagittariusDeepScenes,
  ...piscesDeepScenes,
  capricornPrologueScene,
  ...capricornScenes,
];

const relationshipScore: Partial<Record<RelationshipState, number>> = {
  intimate: 36,
  honest: 22,
  comfortable: 14,
  curious: 10,
  playful: 8,
  unresolved: -4,
  tense: -6,
  distant: -12,
  dependent: -16,
  farewell: -18,
  stranger: 0,
  misunderstanding: -8,
  jealous: -3,
  reunion: 18,
};

const choiceOutcomeScore = (choice: Choice) => {
  const character = choice.effect.character ?? {};
  const player = choice.effect.player ?? {};
  const coreFlagBonus = Object.values(choice.effect.flags ?? {}).some(Boolean) ? 45 : 0;
  const characterGrowth = Object.entries(character).reduce((total, [metric, value]) => {
    const amount = value ?? 0;
    if (metric === "affection") return total + amount * 1.5;
    if (metric === "trust") return total + amount * 1.25;
    if (["jealousy", "impulse", "avoidance", "overwhelm", "possessiveness", "stubbornness", "commitmentFear", "suspicion", "control", "rulePressure", "socialMask", "logicArmor", "alienation", "pride"].includes(metric)) {
      return total - amount * 0.45;
    }
    return total + amount * 0.3;
  }, 0);
  const playerGrowth = Object.values(player).reduce((total, value) => total + (value ?? 0), 0);
  return characterGrowth + playerGrowth + coreFlagBonus + (relationshipScore[choice.effect.relationshipState ?? "stranger"] ?? 0);
};

const spreadBestChoice = (scene: Scene, sceneIndex: number): Scene => {
  if (scene.choices.length < 2) return scene;

  const ranked = scene.choices.map((choice, index) => ({ index, score: choiceOutcomeScore(choice) }));
  const bestIndex = ranked.reduce((best, current) => current.score > best.score ? current : best).index;
  const targetIndex = sceneIndex % scene.choices.length;
  const reordered = [...scene.choices];
  const [bestChoice] = reordered.splice(bestIndex, 1);
  reordered.splice(targetIndex, 0, bestChoice);
  return { ...scene, choices: reordered };
};

// 每個場景使用固定索引分配最佳選項位置；重新整理與讀檔時順序保持一致。
export const scenes: Scene[] = authoredScenes.map(spreadBestChoice);
