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

const genericScenes = routeStories.flatMap((route) => {
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

export const scenes: Scene[] = [...genericScenes, capricornPrologueScene, ...capricornScenes];
