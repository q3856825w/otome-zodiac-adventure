import type { Character, Ending } from "../types";

const endingImages: Record<string, string> = {
  "scorpio-bad": "./assets/ending-scorpio-bad.webp",
  "scorpio-normal": "./assets/ending-scorpio-normal.webp",
  "scorpio-good": "./assets/ending-scorpio-good.webp",
  "scorpio-true": "./assets/ending-scorpio-true.webp",
  "scorpio-career": "./assets/ending-scorpio-career.webp",
  "scorpio-hidden": "./assets/ending-scorpio-hidden.webp",
  "sagittarius-bad": "./assets/ending-sagittarius-bad.webp",
  "sagittarius-normal": "./assets/ending-sagittarius-normal.webp",
  "sagittarius-good": "./assets/ending-sagittarius-good.webp",
  "sagittarius-true": "./assets/ending-sagittarius-true.webp",
  "sagittarius-career": "./assets/ending-sagittarius-career.webp",
  "sagittarius-hidden": "./assets/ending-sagittarius-hidden.webp",
  "capricorn-bad": "./assets/ending-capricorn-bad.webp",
  "capricorn-normal": "./assets/ending-capricorn-normal.webp",
  "capricorn-good": "./assets/ending-capricorn-good.webp",
  "capricorn-true": "./assets/ending-capricorn-true.webp",
  "capricorn-career": "./assets/ending-capricorn-career.webp",
  "capricorn-hidden": "./assets/ending-capricorn-hidden.webp",
  "aquarius-bad": "./assets/ending-aquarius-bad.webp",
  "aquarius-normal": "./assets/ending-aquarius-normal.webp",
  "aquarius-good": "./assets/ending-aquarius-good.webp",
  "aquarius-true": "./assets/ending-aquarius-true.webp",
  "aquarius-career": "./assets/ending-aquarius-career.webp",
  "aquarius-hidden": "./assets/ending-aquarius-hidden.webp",
  "pisces-bad": "./assets/ending-pisces-bad.webp",
  "pisces-normal": "./assets/ending-pisces-normal.webp",
  "pisces-good": "./assets/ending-pisces-good.webp",
  "pisces-true": "./assets/ending-pisces-true.webp",
  "pisces-career": "./assets/ending-pisces-career.webp",
  "pisces-hidden": "./assets/ending-pisces-hidden.webp",
  "aries-normal": "./assets/ending-aries-normal.webp",
  "aries-bad": "./assets/ending-aries-bad.webp",
  "aries-good": "./assets/ending-aries-good.webp",
  "aries-true": "./assets/ending-aries-true.webp",
  "aries-career": "./assets/ending-aries-career.webp",
  "aries-hidden": "./assets/ending-aries-hidden.webp",
  "cancer-bad": "./assets/ending-cancer-bad.webp",
  "cancer-normal": "./assets/ending-cancer-normal.webp",
  "cancer-good": "./assets/ending-cancer-good.webp",
  "cancer-true": "./assets/ending-cancer-true.webp",
  "cancer-career": "./assets/ending-cancer-career.webp",
  "cancer-hidden": "./assets/ending-cancer-hidden.webp",
  "leo-bad": "./assets/ending-leo-bad.webp",
  "leo-normal": "./assets/ending-leo-normal.webp",
  "leo-good": "./assets/ending-leo-good.webp",
  "leo-true": "./assets/ending-leo-true.webp",
  "leo-career": "./assets/ending-leo-career.webp",
  "leo-hidden": "./assets/ending-leo-hidden.webp",
  "taurus-bad": "./assets/ending-taurus-bad.webp",
  "taurus-normal": "./assets/ending-taurus-normal.webp",
  "taurus-good": "./assets/ending-taurus-good.webp",
  "taurus-true": "./assets/ending-taurus-true.webp",
  "taurus-career": "./assets/ending-taurus-career.webp",
  "taurus-hidden": "./assets/ending-taurus-hidden.webp",
  "gemini-bad": "./assets/ending-gemini-bad.webp",
  "gemini-normal": "./assets/ending-gemini-normal.webp",
  "gemini-good": "./assets/ending-gemini-good.webp",
  "gemini-true": "./assets/ending-gemini-true.webp",
  "gemini-career": "./assets/ending-gemini-career.webp",
  "gemini-hidden": "./assets/ending-gemini-hidden.webp",
  "virgo-bad": "./assets/ending-virgo-bad.webp",
  "virgo-normal": "./assets/ending-virgo-normal.webp",
  "virgo-good": "./assets/ending-virgo-good.webp",
  "virgo-true": "./assets/ending-virgo-true.webp",
  "virgo-career": "./assets/ending-virgo-career.webp",
  "virgo-hidden": "./assets/ending-virgo-hidden.webp",
  "libra-bad": "./assets/ending-libra-bad.webp",
  "libra-normal": "./assets/ending-libra-normal.webp",
  "libra-good": "./assets/ending-libra-good.webp",
  "libra-true": "./assets/ending-libra-true.webp",
  "libra-career": "./assets/ending-libra-career.webp",
  "libra-hidden": "./assets/ending-libra-hidden.webp",
};

const endingSet = (id: string, name: string): Ending[] => {
  const common = [
    {
      id: `${id}-bad`,
      characterId: id,
      type: "bad" as const,
      title: `${name} Bad Ending：錯過的星光`,
      description: "你們不是沒有心動，而是太早把對方放進自己的想像裡。誤會累積成沉默，最後只剩星盤上一條沒有抵達的線。",
      requirements: ["好感過低", "信任不足", "嫉妒或誤解過高"],
      imageUrl: endingImages[`${id}-bad`],
    },
    {
      id: `${id}-normal`,
      characterId: id,
      type: "normal" as const,
      title: `${name} Normal Ending：剛好的距離`,
      description: "故事停在朋友的位置。你們仍會在校園裡打招呼，但那句更靠近的話，被留給了另一個平行宇宙。",
      requirements: ["完成主線", "好感或信任未達戀愛線"],
      imageUrl: endingImages[`${id}-normal`],
    },
    {
      id: `${id}-good`,
      characterId: id,
      type: "good" as const,
      title: `${name} Good Ending：把喜歡說出口`,
      description: "你們學會在日常裡靠近，不急著證明命運，只把今天的心意好好放進彼此手裡。",
      requirements: ["好感 >= 65", "信任 >= 45", "嫉妒 < 70"],
      imageUrl: endingImages[`${id}-good`],
    },
    {
      id: `${id}-true`,
      characterId: id,
      type: "true" as const,
      title: `${name} True Ending：命運不是答案`,
      description: "你們理解了彼此最不想被看見的傷口。星座不是結論，只是你們終於願意走向對方的起點。",
      requirements: ["好感 >= 85", "信任 >= 75", "完成核心價值選項"],
      imageUrl: endingImages[`${id}-true`],
    },
    {
      id: `${id}-career`,
      characterId: id,
      type: "career" as const,
      title: `${name} Career Ending：多年後的同行者`,
      description: "成年後，你們在各自道路上重逢。這一次，喜歡不再只是校園心動，也是一種能並肩前進的選擇。",
      requirements: ["成年後番外", "能力值與信任達標"],
      imageUrl: endingImages[`${id}-career`],
    },
    {
      id: `${id}-hidden`,
      characterId: id,
      type: "hidden" as const,
      title: `${name} Hidden Ending：沒被星盤寫下的頁面`,
      description: "你觸發了他藏得最深的日常。那些沒有說出口的在意，終於變成只屬於你們的秘密結局。",
      requirements: ["觸發隱藏事件", "信任達標"],
      imageUrl: endingImages[`${id}-hidden`],
    },
  ];
  return common;
};

type CharacterSeed = Omit<
  Character,
  | "affection"
  | "trust"
  | "jealousy"
  | "professorComposure"
  | "boundary"
  | "selfAwareness"
  | "overwhelm"
  | "pride"
  | "impulse"
  | "accountability"
  | "honesty"
  | "avoidance"
  | "mask"
  | "abandonmentFear"
  | "connection"
  | "logicArmor"
  | "alienation"
  | "emotionalAcceptance"
  | "rulePressure"
  | "careExpression"
  | "selfCompassion"
  | "control"
  | "stabilityNeed"
  | "possessiveness"
  | "stubbornness"
  | "expression"
  | "overthinking"
  | "spotlightNeed"
  | "vulnerability"
  | "authenticity"
  | "balanceNeed"
  | "decisiveness"
  | "biasAcceptance"
  | "socialMask"
  | "freedomNeed"
  | "commitmentFear"
  | "returnDesire"
  | "distanceRespect"
  | "suspicion"
  | "possessiveFear"
  | "boundaryRespect"
  | "vulnerableHonesty"
  | "relationshipState"
  | "routeUnlocked"
  | "endings"
>;

const seeds: CharacterSeed[] = [
  {
    id: "aries",
    name: "夏燃",
    zodiac: "牡羊座",
    ageGroup: "高中生",
    schoolRole: "熱血籃球隊學長",
    adultRole: "創業公司 CEO",
    imageUrl: "./assets/aries-xia-ran.webp",
    personality: "直接、衝動、保護慾強",
    hiddenTrait: "害怕自己只會往前衝，卻保護不了重要的人",
    likes: ["直球", "勇敢", "陪他挑戰"],
    dislikes: ["冷處理", "拐彎抹角"],
    difficulty: "★☆☆",
    keywords: ["籃球", "挑戰", "受傷"],
  },
  {
    id: "taurus",
    name: "陸雨田",
    zodiac: "金牛座",
    ageGroup: "高中生",
    schoolRole: "甜點社學長 / 家裡開咖啡廳",
    adultRole: "餐飲品牌老闆",
    imageUrl: "./assets/taurus-lu-yutian.webp",
    personality: "慢熱、穩定、佔有慾細膩",
    hiddenTrait: "越重視越不敢開口，怕自己的心意變成壓力",
    likes: ["真誠", "陪伴", "記得小細節"],
    dislikes: ["忽冷忽熱", "浪費"],
    difficulty: "★☆☆",
    keywords: ["甜點", "陪伴", "限定蛋糕"],
  },
  {
    id: "gemini",
    name: "言澈",
    zodiac: "雙子座",
    ageGroup: "高中生",
    schoolRole: "廣播社人氣學弟",
    adultRole: "主持人 / 自媒體創作者",
    imageUrl: "./assets/gemini-yan-che.webp",
    personality: "幽默、多話、難捉摸",
    hiddenTrait: "怕認真後被丟下，所以先把自己變成玩笑",
    likes: ["機智對話", "反差感", "有趣靈魂"],
    dislikes: ["無聊", "控制欲太強"],
    difficulty: "★★☆",
    keywords: ["廣播", "節奏", "玩笑背後"],
  },
  {
    id: "cancer",
    name: "沈泊安",
    zodiac: "巨蟹座",
    ageGroup: "高中生",
    schoolRole: "鄰家竹馬",
    adultRole: "兒科醫師 / 心理諮商師",
    imageUrl: "./assets/cancer-shen-boan.webp",
    personality: "溫柔、顧家、情緒敏銳",
    hiddenTrait: "把吃醋藏進照顧裡，越難過越像沒事",
    likes: ["被依賴", "溫暖互動"],
    dislikes: ["被忽視", "尖銳拒絕"],
    difficulty: "★☆☆",
    keywords: ["竹馬", "安全感", "便當"],
  },
  {
    id: "leo",
    name: "盛陽",
    zodiac: "獅子座",
    ageGroup: "高中生",
    schoolRole: "學生會長 / 校園風雲人物",
    adultRole: "企業接班人 / 演藝圈製作人",
    imageUrl: "./assets/leo-sheng-yang.webp",
    personality: "驕傲、華麗、需要被看見",
    hiddenTrait: "掌聲停下時會慌張，怕自己其實不值得被期待",
    likes: ["欣賞但不盲從", "舞台感"],
    dislikes: ["敷衍", "讓他丟臉"],
    difficulty: "★★☆",
    keywords: ["會長", "舞台", "光環裂縫"],
  },
  {
    id: "virgo",
    name: "顧硯",
    zodiac: "處女座",
    ageGroup: "高中生",
    schoolRole: "風紀委員 / 年級第一",
    adultRole: "研究員",
    imageUrl: "./assets/virgo-gu-yan.webp",
    personality: "理性、挑剔、嘴硬",
    hiddenTrait: "嚴格其實是笨拙關心，怕鬆手就會失控",
    likes: ["努力", "守時", "細節控"],
    dislikes: ["混亂", "沒責任感"],
    difficulty: "★★★",
    keywords: ["補習", "規則", "嘴硬"],
  },
  {
    id: "libra",
    name: "白衡",
    zodiac: "天秤座",
    ageGroup: "高中生",
    schoolRole: "美術社學長 / 校草",
    adultRole: "設計師 / 藝術總監",
    imageUrl: "./assets/libra-su-lan.webp",
    personality: "優雅、會社交、選擇困難",
    hiddenTrait: "總是照顧所有人的期待，卻不知道自己真正想要什麼",
    likes: ["審美", "氣質", "平衡感"],
    dislikes: ["粗魯", "情緒勒索"],
    difficulty: "★★☆",
    keywords: ["美術", "校草", "自我魅力"],
  },
  {
    id: "scorpio",
    name: "夜洵",
    zodiac: "天蠍座",
    ageGroup: "高中生",
    schoolRole: "神秘轉學生",
    adultRole: "律師 / 投資人",
    imageUrl: "./assets/scorpio-ling-shuo.webp",
    personality: "深情、防備、佔有慾強",
    hiddenTrait: "轉學原因是一道傷口，他把信任看得比喜歡更重",
    likes: ["忠誠", "深度對話", "秘密交換"],
    dislikes: ["背叛", "試探"],
    difficulty: "★★★",
    keywords: ["秘密", "界線", "不能騙"],
  },
  {
    id: "sagittarius",
    name: "原野",
    zodiac: "射手座",
    ageGroup: "高中生",
    schoolRole: "交換學生 / 旅行社團成員",
    adultRole: "旅遊作家 / 攝影師",
    imageUrl: "./assets/sagittarius-jiang-ye.webp",
    personality: "自由、開朗、不愛被綁住",
    hiddenTrait: "離開前最怕有人等他，因為那會讓自由變得很痛",
    likes: ["冒險", "幽默", "獨立"],
    dislikes: ["束縛", "查勤"],
    difficulty: "★★☆",
    keywords: ["旅行", "自由", "想回來"],
  },
  {
    id: "capricorn",
    name: "沈知衡",
    zodiac: "摩羯座",
    age: "32歲",
    ageGroup: "成年後",
    schoolRole: "成年後篇限定：國立大學物理系教授",
    adultRole: "凝態物理 / 量子材料實驗室 PI",
    title: "全校最難預約的教授",
    imageUrl: "./assets/capricorn-shen-zhiheng.webp",
    personality: "冷靜、自律、外冷內熱",
    hiddenTrait: "全遊戲最容易吃醋、最沒有安全感，也最深情的人",
    likes: ["聰明", "有目標", "不黏人", "願意思考"],
    dislikes: ["說謊", "不守承諾", "浪費時間"],
    difficulty: "★★★",
    keywords: ["成年後", "物理教授", "冷靜值", "沒說出口的吃醋"],
  },
  {
    id: "aquarius",
    name: "藍祈",
    zodiac: "水瓶座",
    ageGroup: "高中生",
    schoolRole: "科學社怪才 / 程式天才",
    adultRole: "AI 工程師 / 發明家",
    imageUrl: "./assets/aquarius-lan-xu.webp",
    personality: "怪、聰明、反套路",
    hiddenTrait: "用演算法包裝孤獨，怕被說奇怪所以先吐槽世界",
    likes: ["自由思考", "獨特觀點"],
    dislikes: ["從眾", "情緒勒索"],
    difficulty: "★★☆",
    keywords: ["演算法", "怪才", "吐槽"],
  },
  {
    id: "pisces",
    name: "霧島凜",
    zodiac: "雙魚座",
    ageGroup: "高中生",
    schoolRole: "音樂社學弟 / 夢幻系少年",
    adultRole: "音樂劇演員 / 作曲家",
    imageUrl: "./assets/pisces-yu-lan.webp",
    personality: "溫柔、敏感、藝術感強，總像能聽見別人沒說出口的情緒",
    hiddenTrait: "從小習慣照顧家人的情緒，太早學會當別人的情緒容器，卻不懂得照顧自己",
    likes: ["共感", "藝術", "溫柔界線", "一起把夢想落地"],
    dislikes: ["冷漠", "過度打擊", "把安慰變成承諾", "逃避真正的問題"],
    difficulty: "★★☆",
    keywords: ["音樂", "情緒容器", "界線", "自我覺察"],
  },
];

export const characters: Character[] = seeds.map((item) => ({
  ...item,
  affection: 0,
  trust: 0,
  jealousy: 0,
  professorComposure: 100,
  boundary: item.id === "pisces" ? 18 : 0,
  selfAwareness: item.id === "pisces" ? 12 : 0,
  overwhelm: item.id === "pisces" ? 25 : 0,
  pride: item.id === "aries" ? 50 : item.id === "leo" ? 58 : 0,
  impulse: item.id === "aries" ? 48 : 0,
  accountability: item.id === "aries" ? 18 : 0,
  honesty: item.id === "gemini" ? 18 : 0,
  avoidance: item.id === "gemini" ? 52 : 0,
  mask: item.id === "gemini" ? 58 : 0,
  abandonmentFear: item.id === "gemini" ? 46 : 0,
  connection: item.id === "aquarius" ? 12 : 0,
  logicArmor: item.id === "aquarius" ? 62 : 0,
  alienation: item.id === "aquarius" ? 48 : 0,
  emotionalAcceptance: item.id === "aquarius" ? 10 : 0,
  rulePressure: item.id === "virgo" ? 58 : 0,
  careExpression: item.id === "virgo" ? 14 : 0,
  selfCompassion: item.id === "virgo" ? 10 : 0,
  control: item.id === "virgo" ? 55 : 0,
  stabilityNeed: item.id === "taurus" ? 54 : 0,
  possessiveness: item.id === "taurus" ? 32 : 0,
  stubbornness: item.id === "taurus" ? 50 : 0,
  expression: item.id === "taurus" ? 10 : 0,
  overthinking: item.id === "taurus" ? 36 : 0,
  spotlightNeed: item.id === "leo" ? 62 : 0,
  vulnerability: item.id === "leo" ? 8 : 0,
  authenticity: item.id === "leo" ? 14 : 0,
  balanceNeed: item.id === "libra" ? 62 : 0,
  decisiveness: item.id === "libra" ? 10 : 0,
  biasAcceptance: item.id === "libra" ? 8 : 0,
  socialMask: item.id === "libra" ? 58 : 0,
  freedomNeed: item.id === "sagittarius" ? 62 : 0,
  commitmentFear: item.id === "sagittarius" ? 52 : 0,
  returnDesire: item.id === "sagittarius" ? 12 : 0,
  distanceRespect: item.id === "sagittarius" ? 18 : 0,
  suspicion: item.id === "scorpio" ? 58 : 0,
  possessiveFear: item.id === "scorpio" ? 44 : 0,
  boundaryRespect: item.id === "scorpio" ? 12 : 0,
  vulnerableHonesty: item.id === "scorpio" ? 8 : 0,
  relationshipState: "stranger",
  routeUnlocked: false,
  endings:
    item.id === "aries"
      ? endingSet(item.id, item.name).map((ending) => {
          const ariesEndingOverrides: Partial<Record<Ending["type"], Partial<Ending>>> = {
            bad: {
              title: "夏燃 Bad Ending：燃盡的戰旗",
              description:
                "他仍然衝在所有人前面，把痛說成沒事，把道歉當成認輸。你追上了他的背影，卻沒能讓他停下來看見自己也在受傷。",
              requirements: ["面子值過高", "衝動值過高", "承擔值不足"],
            },
            normal: {
              title: "夏燃 Normal Ending：沒說出口的抱歉",
              description:
                "你們都知道那句抱歉差一點就說出口。可他還沒學會把低頭和失敗分開，只能把心意留在球場邊的晚風裡。",
              requirements: ["好感中等", "信任或承擔不足", "沒有完成核心道歉選項"],
              imageUrl: endingImages["aries-normal"],
            },
            good: {
              title: "夏燃 Good Ending：慢下來的勇氣",
              description:
                "他終於明白，勇敢不是每次都第一個衝出去，而是願意在受傷時停下來，承認自己也需要被接住。",
              requirements: ["好感度高", "信任度高", "承擔值中高", "衝動值不可過高"],
              imageUrl: endingImages["aries-good"],
            },
            true: {
              imageUrl: endingImages["aries-true"],
            },
            career: {
              imageUrl: endingImages["aries-career"],
            },
            hidden: {
              title: "夏燃 Hidden Ending：第一個道歉的人",
              description:
                "他第一次在朋友、隊友與你面前低下頭，不是認輸，而是選擇承擔。那天他才真正成為自己想保護的那種人。",
              requirements: ["承擔值高", "面子值不過高", "完成第一個道歉的人選項"],
              imageUrl: endingImages["aries-hidden"],
            },
          };
          const overrides = ariesEndingOverrides[ending.type];
          return overrides ? { ...ending, ...overrides } : ending;
        })
      : item.id === "taurus"
      ? endingSet(item.id, item.name).map((ending) => {
          const taurusEndingOverrides: Partial<Record<Ending["type"], Partial<Ending>>> = {
            bad: {
              title: "陸雨田 Bad Ending：只屬於你的甜",
              description:
                "他仍然替你留座、替你溫杯、替你做只屬於你的甜點。只是那些溫柔越來越像不能說出口的重量，甜味被藏得太久，最後變成了沉默的佔有。",
              requirements: ["好感高", "細膩佔有慾高", "穩定需求高", "表達心意低", "鑽牛角尖高"],
              imageUrl: endingImages["taurus-bad"],
            },
            normal: {
              title: "陸雨田 Normal Ending：過期的告白",
              description:
                "那張告白卡被他夾在菜單背面太久。等他終於想說出口，你已經把那份照顧當成學長一貫的溫柔，而不是只給你的心意。",
              requirements: ["好感中高", "信任不足", "表達心意不足", "鑽牛角尖中高"],
              imageUrl: endingImages["taurus-normal"],
            },
            good: {
              title: "陸雨田 Good Ending：剛好甜度",
              description:
                "他仍然慢熱，仍然會先遞上甜點才開口。但這一次，他學會把陪伴說成心意，把穩定變成讓人安心，而不是讓人猜測。",
              requirements: ["好感高", "信任高", "表達心意中高", "穩定需求中等", "鑽牛角尖不可過高", "細膩佔有慾中低"],
              imageUrl: endingImages["taurus-good"],
            },
            true: {
              imageUrl: endingImages["taurus-true"],
            },
            career: {
              imageUrl: endingImages["taurus-career"],
            },
            hidden: {
              title: "陸雨田 Hidden Ending：今日限定，長期供應",
              description:
                "限定蛋糕被放進正式菜單，旁邊多了一行手寫字：不是只有今天，也不是只敢偷偷留下。陸雨田終於明白，心意不是藏起來才特別。",
              requirements: ["好感高", "信任高", "表達心意高", "穩定需求健康", "鑽牛角尖低", "細膩佔有慾低或中", "觸發咖啡廳家庭事件"],
              imageUrl: endingImages["taurus-hidden"],
            },
          };
          const overrides = taurusEndingOverrides[ending.type];
          return overrides ? { ...ending, ...overrides } : ending;
        })
      : item.id === "cancer"
      ? endingSet(item.id, item.name).map((ending) => {
          const cancerEndingOverrides: Partial<Record<Ending["type"], Partial<Ending>>> = {
            bad: {
              title: "沈泊安 Bad Ending：太習慣的溫柔",
              description:
                "他還是會替你準備便當、提醒天氣、等你回家。只是那些溫柔越來越像沒有被回答的問題。你們太熟悉彼此，熟悉到誰都沒有勇氣把真正想要的話說清楚。",
              requirements: ["好感偏高但信任不足", "嫉妒值過高", "關係停在依賴與照顧裡"],
              imageUrl: endingImages["cancer-bad"],
            },
            normal: {
              title: "沈泊安 Normal Ending：隔壁的燈還亮著",
              description:
                "你們仍然一起回家，仍然在便利商店門口分享熱飲。只是那句更靠近的話，被放回便當盒底。不是不喜歡，只是誰都還沒有學會清楚給出安全感。",
              requirements: ["走完竹馬主線", "好感或信任未達穩定交往", "沒有完成清楚選擇"],
              imageUrl: endingImages["cancer-normal"],
            },
            good: {
              title: "沈泊安 Good Ending：同一把傘下",
              description:
                "他開始練習說出擔心，也開始說出想要。你也學會不把他的溫柔當作背景。回家的路還是那條路，只是這一次，你們都知道彼此是被選擇的。",
              requirements: ["好感高", "信任高", "觸發清楚安全感", "曾詢問他的真正需求", "嫉妒值不可過高"],
              imageUrl: endingImages["cancer-good"],
            },
            true: {
              imageUrl: endingImages["cancer-true"],
            },
            career: {
              imageUrl: endingImages["cancer-career"],
            },
            hidden: {
              title: "沈泊安 Hidden Ending：便當盒裡的告白",
              description:
                "他不再只把喜歡藏進半熟蛋和天氣提醒裡。便當盒底的字條終於寫上完整的一句話：我想被妳選擇。你也清楚回答：我選你，不是因為習慣，是因為你是沈泊安。",
              requirements: ["好感高", "信任高", "看見他的照顧", "沒有把等待視為理所當然", "最後清楚選擇沈泊安"],
              imageUrl: endingImages["cancer-hidden"],
            },
          };
          const overrides = cancerEndingOverrides[ending.type];
          return overrides ? { ...ending, ...overrides } : ending;
        })
      : item.id === "leo"
      ? endingSet(item.id, item.name).map((ending) => {
          const leoEndingOverrides: Partial<Record<Ending["type"], Partial<Ending>>> = {
            bad: {
              title: "盛陽 Bad Ending：永不熄燈的舞台",
              description:
                "他依然完美耀眼，每一次登場都能換來掌聲。可是你只能坐在觀眾席，看著他把脆弱藏進更華麗的笑容裡。舞台沒有熄燈，你們也沒有真正靠近。",
              requirements: ["好感高", "光環需求高", "驕傲值高", "真實度低", "脆弱展露低"],
              imageUrl: endingImages["leo-bad"],
            },
            normal: {
              title: "盛陽 Normal Ending：掌聲之後",
              description:
                "他知道你看見了笑容後面的裂縫，也開始在掌聲結束後回頭找你。只是他還不敢完全交出那個不完美的自己，於是你們停在光與影的邊界。",
              requirements: ["好感中高", "信任不足", "真實度不足", "光環需求中高"],
              imageUrl: endingImages["leo-normal"],
            },
            good: {
              title: "盛陽 Good Ending：光落在身邊",
              description:
                "他仍然耀眼，仍然會在舞台上漂亮地鞠躬。但下台後，他開始允許自己在你面前沉默、失誤、疲倦。你喜歡他的光，也喜歡光落下後站在身邊的人。",
              requirements: ["好感高", "信任高", "真實度中高", "脆弱展露中高", "光環需求不可過高"],
              imageUrl: endingImages["leo-good"],
            },
            true: {
              imageUrl: endingImages["leo-true"],
            },
            career: {
              imageUrl: endingImages["leo-career"],
            },
            hidden: {
              title: "盛陽 Hidden Ending：光環裂縫",
              description:
                "設備出錯的舞台上，盛陽第一次放下完美稿子。他承認自己也會害怕，也會不確定，也想被看見。那一刻掌聲不再只屬於光環，而是屬於終於真實站在台上的他。",
              requirements: ["好感高", "信任高", "真實度高", "脆弱展露高", "觸發家庭電話事件", "曾選擇你不用每天都發光", "曾在失誤時看見真正的他"],
              imageUrl: endingImages["leo-hidden"],
            },
          };
          const overrides = leoEndingOverrides[ending.type];
          return overrides ? { ...ending, ...overrides } : ending;
        })
      : item.id === "libra"
      ? endingSet(item.id, item.name).map((ending) => {
          const libraEndingOverrides: Partial<Record<Ending["type"], Partial<Ending>>> = {
            bad: {
              title: "白衡 Bad Ending：最優雅的模糊",
              description:
                "他依然溫柔、優雅，讓每個人都覺得自己被重視。你也曾覺得自己很特別，直到發現特別如果沒有被明確選擇，就只是另一種漂亮的距離。",
              requirements: ["好感高", "平衡需求高", "社交面具高", "明確選擇低", "偏心承認低"],
              imageUrl: endingImages["libra-bad"],
            },
            normal: {
              title: "白衡 Normal Ending：未完成的肖像",
              description:
                "畫布上你的側臉完成得很美，背景仍然留白。白衡知道你曾看見他的心意，卻還沒學會把選擇說出口。你們停在若即若離的位置，像一幅還沒題名的畫。",
              requirements: ["好感中高", "信任不足", "明確選擇不足", "平衡需求中高"],
              imageUrl: endingImages["libra-normal"],
            },
            good: {
              title: "白衡 Good Ending：偏心",
              description:
                "畢業展上，他終於把作品名寫清楚：《偏心》。他不再把溫柔平均分給所有期待，也不再讓你追著曖昧跑。魅力仍在，但這一次，他站穩自己的位置選擇你。",
              requirements: ["好感高", "信任高", "明確選擇中高", "偏心承認中高", "平衡需求不可過高"],
              imageUrl: endingImages["libra-good"],
            },
            true: {
              imageUrl: endingImages["libra-true"],
            },
            career: {
              imageUrl: endingImages["libra-career"],
            },
            hidden: {
              title: "白衡 Hidden Ending：被選擇的側臉",
              description:
                "他在展覽開幕時承認，畫裡的人是你，偏心的人也是你。那不是傷害別人的宣言，而是他第一次為自己的魅力與心意負責。你沒有追著他跑，卻被他明確選擇。",
              requirements: ["好感高", "信任高", "觸發空展廳事件", "指出他的偏心", "完成作品《偏心》", "最後明確選擇"],
              imageUrl: endingImages["libra-hidden"],
            },
          };
          const overrides = libraEndingOverrides[ending.type];
          return overrides ? { ...ending, ...overrides } : ending;
        })
      : item.id === "gemini"
      ? endingSet(item.id, item.name).map((ending) => {
          const geminiEndingOverrides: Partial<Record<Ending["type"], Partial<Ending>>> = {
            bad: {
              title: "言澈 Bad Ending：永不斷訊的玩笑",
              description:
                "你們的聊天從來沒有冷場，卻也從來沒有真正抵達。言澈把害怕藏進每一次玩笑，訊息永遠秒回，真心卻像被調成靜音的頻道。",
              requirements: ["逃避值與面具值過高", "真誠度不足", "被丟下恐懼沒有被好好面對"],
              imageUrl: endingImages["gemini-bad"],
            },
            normal: {
              title: "言澈 Normal Ending：沒有播出的真心話",
              description:
                "那段未播出的錄音仍留在器材室。你們會在校園裡互相打招呼，他也還是會笑，只是有些認真話最後沒有被任何人聽見。",
              requirements: ["完成雙子座 10 題主線", "好感或信任不足以支撐坦白", "真誠度或自我揭露不夠"],
              imageUrl: endingImages["gemini-normal"],
            },
            good: {
              title: "言澈 Good Ending：停在你的頻率",
              description:
                "他仍然幽默，仍然喜歡把氣氛點亮。但這一次，當世界安靜下來，他沒有急著逃走，而是把真正的聲音停在你的頻率裡。",
              requirements: ["好感度高", "信任度高", "真誠度中高", "逃避、面具與被丟下恐懼未失控"],
              imageUrl: endingImages["gemini-good"],
            },
            true: {
              imageUrl: endingImages["gemini-true"],
            },
            career: {
              imageUrl: endingImages["gemini-career"],
            },
            hidden: {
              title: "言澈 Hidden Ending：沒有笑點的告白",
              description:
                "停播後的廣播室只剩你們的呼吸聲。言澈第一次沒有準備梗、沒有轉場，只把害怕、喜歡與想留下來的心情全部說完。",
              requirements: ["好感度高", "信任度高", "真誠度高", "面具與逃避下降", "最終選擇沒有笑點的告白"],
              imageUrl: endingImages["gemini-hidden"],
            },
          };
          const overrides = geminiEndingOverrides[ending.type];
          return overrides ? { ...ending, ...overrides } : ending;
        })
      : item.id === "virgo"
      ? endingSet(item.id, item.name).map((ending) => {
          const virgoEndingOverrides: Partial<Record<Ending["type"], Partial<Ending>>> = {
            bad: {
              title: "顧硯 Bad Ending：滿分規則",
              description:
                "你們的關係像一份被整理得很漂亮的規則表，穩定、正確、沒有錯字。只是沒有人敢越線，也沒有人敢承認，心動不是考卷，不能永遠靠訂正活著。",
              requirements: ["好感度高", "規則壓力高", "控制感高", "自我接納低"],
              imageUrl: endingImages["virgo-bad"],
            },
            normal: {
              title: "顧硯 Normal Ending：擦掉的答案",
              description:
                "他把告白寫在筆記本角落，又用橡皮擦慢慢擦掉。你們仍在補習班偶遇，他仍會提醒你錯題，只是最想說的答案被留在最安全的空白裡。",
              requirements: ["好感中高", "信任不足", "自我接納不足", "規則壓力中高"],
              imageUrl: endingImages["virgo-normal"],
            },
            good: {
              title: "顧硯 Good Ending：例外條款",
              description:
                "顧硯仍然守規矩，仍然會把時間表排得工整。但他開始學會在計畫旁邊留一個位置，給你，也給那個不必完美才值得靠近的自己。",
              requirements: ["好感高", "信任高", "關心表達高", "規則壓力中低", "自我接納中高", "控制感不可過高"],
              imageUrl: endingImages["virgo-good"],
            },
            true: {
              imageUrl: endingImages["virgo-true"],
            },
            career: {
              imageUrl: endingImages["virgo-career"],
            },
            hidden: {
              title: "顧硯 Hidden Ending：留白的公式",
              description:
                "期末前夕，他第一次在時間表上留下空白。沒有標準答案，沒有訂正符號，只有一段不確定但真實的心動，安靜地寫在你們中間。",
              requirements: ["好感高", "信任高", "關心表達高", "自我接納高", "規則壓力低", "控制感低或中", "觸發家庭電話事件", "曾讓他先聽再修正"],
              imageUrl: endingImages["virgo-hidden"],
            },
          };
          const overrides = virgoEndingOverrides[ending.type];
          return overrides ? { ...ending, ...overrides } : ending;
        })
      : item.id === "aquarius"
      ? endingSet(item.id, item.name).map((ending) => {
          const aquariusEndingOverrides: Partial<Record<Ending["type"], Partial<Ending>>> = {
            bad: {
              title: "藍祈 Bad Ending：無人接收的訊號",
              description:
                "藍祈把喜歡寫成模型、把想念改成參數、把靠近包裝成實驗備註。訊號其實一直存在，只是你再也找不到那句沒有公式的我想你。",
              requirements: ["好感度高", "邏輯防禦高", "疏離值高", "情緒接納度低"],
            },
            normal: {
              title: "藍祈 Normal Ending：未完成的實驗",
              description:
                "他開始理解自己很在意你，卻還不知道怎麼正常靠近。那份未完成的實驗報告留在科學社，像一段還沒學會命名的心動。",
              requirements: ["好感中高", "信任不足", "情緒接納度不足", "疏離值中高"],
            },
            good: {
              title: "藍祈 Good Ending：同頻的星軌",
              description:
                "他仍然很怪，仍然會用奇怪方式關心你。但這一次，他不再急著解釋每一種情緒，只學著讓它被你接收到。",
              requirements: ["好感高", "信任高", "連結感高", "邏輯防禦中低", "情緒接納度中高", "疏離值不可過高"],
            },
            hidden: {
              title: "藍祈 Hidden Ending：不用解釋的擁抱",
              description:
                "成果展結束後，藍祈第一次沒有拿出理論、程式或實驗來證明什麼。他只是靠近你，安靜地抱住你，像終於相信自己不用解釋也會被接住。",
              requirements: ["好感高", "信任高", "連結感高", "邏輯防禦低", "情緒接納度高", "疏離值低", "觸發家庭電話事件", "曾陪他安靜"],
            },
          };
          const overrides = aquariusEndingOverrides[ending.type];
          return overrides ? { ...ending, ...overrides } : ending;
        })
      : item.id === "scorpio"
      ? endingSet(item.id, item.name).map((ending) => {
          const scorpioEndingOverrides: Partial<Record<Ending["type"], Partial<Ending>>> = {
            bad: {
              title: "夜洵 Bad Ending：試探到最後",
              description:
                "他不是不愛你，只是每一次靠近都先設下陷阱。你們都累了，雨夜走廊只剩他沒問出口的道歉，和你終於不再回頭的腳步。",
              requirements: ["好感高", "試探值高", "佔有恐懼高", "界線尊重低", "坦白脆弱低"],
              imageUrl: endingImages["scorpio-bad"],
            },
            normal: {
              title: "夜洵 Normal Ending：差一點坦白",
              description:
                "他差一點就把轉學的真正原因告訴你，也差一點相信你不會離開。可那句話最後停在夜晚教室的窗邊，你們只成為彼此曾經最接近秘密的人。",
              requirements: ["好感中高", "信任不足", "坦白脆弱不足", "試探值仍高"],
              imageUrl: endingImages["scorpio-normal"],
            },
            good: {
              title: "夜洵 Good Ending：界線裡的深情",
              description:
                "他學會在不安時直接說出口，而不是用冷處理逼近真相。你也守住自己的界線，讓他的深情不再變成佔有，而是在坦白裡慢慢安定。",
              requirements: ["好感高", "信任高", "界線尊重中高", "坦白脆弱中高", "試探值不可過高"],
              imageUrl: endingImages["scorpio-good"],
            },
            true: {
              imageUrl: endingImages["scorpio-true"],
            },
            career: {
              imageUrl: endingImages["scorpio-career"],
            },
            hidden: {
              title: "夜洵 Hidden Ending：不再測試你",
              description:
                "夜晚教室裡，他把那枚舊書籤放進你手心，低聲承認自己害怕信錯人。這一次他沒有試探，也沒有掌控，只是問：如果我坦白，你願不願意留下來聽？",
              requirements: ["好感高", "信任高", "界線尊重高", "坦白脆弱高", "試探值低或中", "觸發轉學秘密事件", "玩家曾明確拒絕被測試"],
              imageUrl: endingImages["scorpio-hidden"],
            },
          };
          const overrides = scorpioEndingOverrides[ending.type];
          return overrides ? { ...ending, ...overrides } : ending;
        })
      : item.id === "sagittarius"
      ? endingSet(item.id, item.name).map((ending) => {
          const sagittariusEndingOverrides: Partial<Record<Ending["type"], Partial<Ending>>> = {
            bad: {
              title: "原野 Bad Ending：沒有送出的遠方",
              description:
                "手機裡存著很多想傳給你的照片：海邊、舊車站、夜景，還有一張模糊的回程車票。他不是不想念你，只是把「不要等我」說得太用力，最後連想回來的路都沒有說出口。",
              requirements: ["好感高", "承諾恐懼高", "想回來低", "距離尊重低或控制感過強"],
            },
            normal: {
              title: "原野 Normal Ending：偶爾寄來的明信片",
              description:
                "他真的去了很遠的地方。你們偶爾交換明信片，字句依然開朗，像午後陽光落在信箱口。只是那句「我會回來」，被留在沒有寫滿的背面。",
              requirements: ["好感中高", "信任不足", "想回來不足", "承諾恐懼仍高"],
            },
            good: {
              title: "原野 Good Ending：把遠方拍給你看",
              description:
                "他離開後仍持續傳照片給你，不是報備，也不是要你停在原地等待，而是想讓你一起看見他走過的世界。某天傍晚，車站月台傳來訊息：這次不是路過，我真的回來了。",
              requirements: ["好感高", "信任高", "距離尊重中高", "想回來中高", "承諾恐懼不可過高"],
            },
            hidden: {
              title: "原野 Hidden Ending：回程不是束縛",
              description:
                "他終於承認，想回來不代表失去自由。你沒有用等待綁住他，他也沒有用遠方逃開你。那張拍立得背面寫著：下一站很遠，但我想把回程留給妳。",
              requirements: ["好感高", "信任高", "距離尊重高", "想回來高", "承諾恐懼低或中", "觸發交換期限事件", "玩家曾選擇不控制但清楚表達心意"],
            },
          };
          const overrides = sagittariusEndingOverrides[ending.type];
          return overrides ? { ...ending, ...overrides } : ending;
        })
      : item.id === "pisces"
      ? endingSet(item.id, item.name).map((ending) => {
          const piscesEndingOverrides: Partial<Record<Ending["type"], Partial<Ending>>> = {
            bad: {
              title: "霧島凜 Bad Ending：溺水的月光",
              description:
                "你們互相依賴，看似很愛，卻把安慰誤認成救命繩。月光落在水面上很美，但你們都忘了先學會呼吸。",
              requirements: ["好感高", "情緒淹沒值高", "界線感低", "自我覺察低"],
            },
            normal: {
              title: "霧島凜 Normal Ending：夢醒以後",
              description:
                "彼此喜歡是真的，但凜還沒準備好面對自己。你們把那段心動留在音樂室，像夢醒後仍記得旋律，卻不急著重來。",
              requirements: ["完成 10 題主線", "好感中等或信任不足", "自我覺察不足"],
            },
            good: {
              title: "霧島凜 Good Ending：靠岸的人",
              description:
                "他開始學會表達需求，也學會拒絕過度情緒索取。你沒有把他拉上岸，而是陪他找到能自己踩穩的地方。",
              requirements: ["好感高", "信任高", "界線感中高", "自我覺察中高", "情緒淹沒值不可過高"],
            },
            hidden: {
              title: "霧島凜 Hidden Ending：給自己的情書",
              description:
                "他不是只依賴你，而是第一次真正面對自己的家庭課題。那封寫給自己的信，成了他學會愛人以前，先接住自己的證明。",
              requirements: ["好感高", "信任高", "界線感高", "自我覺察高", "情緒淹沒值低或中", "觸發家庭事件", "選過不拯救但陪伴"],
            },
          };
          const overrides = piscesEndingOverrides[ending.type];
          return overrides ? { ...ending, ...overrides } : ending;
        })
      : endingSet(item.id, item.name),
}));
