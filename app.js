/* ==========================================================================
   重庆 6天5夜 家庭包车慢游指南 — 交互与数据脚本
   ========================================================================== */

const ITINERARY_DAYS = [
  {
    day: 1,
    shortTitle: "抵达与经典夜景",
    title: "Day 1｜抵达山城与经典夜景",
    route: ["抵达重庆", "酒店入住休整", "解放碑", "白象居", "洪崖洞夜景", "江滩公园看全景"],
    driverPins: [
      {
        spot: "解放碑",
        pin: "八一广场",
        reason: "避开外围主干道堵车禁停，下车即纪念碑与八一好吃街。"
      },
      {
        spot: "白象居",
        pin: "白象居3号楼",
        reason: "直达索道穿楼网红机位，免爬无电梯长台阶。"
      },
      {
        spot: "洪崖洞",
        pin: "嘉滨路洪崖洞（公交站）",
        reason: "在马路下层，直接看夜景全貌，免去景区内部挤电梯。"
      }
    ],
    timeline: [
      {
        time: "下午",
        title: "抵达重庆 · 酒店入住休整",
        desc: "包车接机/接站直达酒店，安顿行李后先休息养精蓄锐，轻松开启山城慢游。",
        tags: [{ text: "全程包车接送", type: "free" }]
      },
      {
        time: "傍晚",
        title: "解放碑 & 白象居",
        desc: "在「八一广场」下车打卡解放碑与八一好吃街；随后乘车至「白象居3号楼」拍索道穿楼经典机位。",
        tags: [{ text: "免费免预约", type: "free" }],
        tip: "省力贴士：务必让司机直接导航「白象居3号楼」，免爬无电梯长台阶。"
      },
      {
        time: "19:30–23:00",
        title: "洪崖洞夜景 & 江滩公园全景",
        desc: "洪崖洞亮灯时间为 19:30–23:00，在嘉滨路下层欣赏金碧辉煌的吊脚楼全貌，随后到江滩公园悠闲看两江全景。",
        tags: [
          { text: "免费无需预约", type: "free" },
          { text: "亮灯 19:30–23:00", type: "ticket" }
        ],
        tip: "避坑提醒：洪崖洞所有电梯和通道均免费，无需进景区挤电梯，也不要相信收费快速通道。"
      }
    ],
    dining: [
      {
        name: "尘香传统川菜馆（解放碑14年老店）",
        detail: "长辈友好温和川菜：推荐鸡豆花、宫保虾球、鱼香肉丝、手工汤圆。"
      },
      {
        name: "三条凳饭店（磨坊巷居民楼下）",
        detail: "暖胃家常菜：招牌软烂蹄花汤、红烧肘子，口感软糯不辣。"
      }
    ]
  },
  {
    day: 2,
    shortTitle: "古建索道与南岸",
    title: "Day 2｜巴渝古建、跨江索道与南岸江景",
    route: ["湖广会馆", "长江索道（过江）", "下浩里", "龙门浩老街", "弹子石老街／钟楼广场夜景"],
    driverPins: [
      {
        spot: "湖广会馆",
        pin: "湖广会馆东门",
        reason: "直接进古建筑群正门，避免绕外围马路。"
      },
      {
        spot: "长江索道",
        pin: "长江索道南站",
        reason: "风景好且排队人数比北站少一半，建议只买单程。"
      },
      {
        spot: "下浩里／龙门浩老街",
        pin: "上新街1号口",
        reason: "从上往下逛不废腿，园内览月台旁、比利时大使馆旧址旁、福门天桥等处设有便民直梯和扶梯。"
      },
      {
        spot: "弹子石老街",
        pin: "弹子石广场观景台",
        reason: "视野开阔，适合看两岸灯光夜景。"
      }
    ],
    timeline: [
      {
        time: "上午 09:00–12:00",
        title: "湖广会馆（巴渝古建筑群）",
        desc: "开放时间 09:00–18:00（17:00停止检票）。明黄色古建群非常出片，游览节奏舒缓。",
        tags: [
          { text: "需提前3天预约", type: "book" },
          { text: "门票 32元", type: "ticket" }
        ],
        tip: "省力路线：建议从移民博物馆出来后，直接去齐安公所看戏台喝茶歇脚，再逛广东公所和禹王宫。"
      },
      {
        time: "下午",
        title: "长江索道（过江体验）",
        desc: "运行时间 08:00–22:00（21:30停止入场）。体验山城特色跨江空中巴士，建议只买单程。",
        tags: [
          { text: "当天线上预约", type: "book" },
          { text: "单程 30元", type: "ticket" }
        ],
        tip: "天气提醒：大雾、暴雨、大风天气可能临时停运，出行前请先查看官方公告。"
      },
      {
        time: "傍晚至夜间",
        title: "下浩里 ➔ 龙门浩老街 ➔ 弹子石老街／钟楼广场夜景",
        desc: "从上新街1号口由上往下漫步老街，江景茶馆随时歇脚；天黑后到弹子石广场观景台欣赏两江交汇灯光夜景。",
        tags: [{ text: "免费免预约", type: "free" }],
        tip: "省力设施：园内览月台旁、比利时大使馆旧址旁、福门天桥等处均设有便民直梯和扶梯。"
      }
    ],
    dining: [
      {
        name: "老街江景茶馆歇脚 & 海关荤豆花",
        detail: "三鲜小锅约30元，含猪肝、瘦肉、豆芽、番茄、鹌鹑蛋等，汤鲜温润，长辈很爱吃。"
      },
      {
        name: "南大人烤肉（南滨路一线江景）",
        detail: "营业时间 16:00–24:00，边吃烤肉边赏南滨路一线夜景。"
      }
    ]
  },
  {
    day: 3,
    shortTitle: "乌江画廊与古镇",
    title: "Day 3｜千里乌江画廊与千年古镇",
    route: ["重庆包车出发", "（途经蚩尤九黎城，视时间停留）", "彭水万足码头乘船游乌江画廊", "龚滩古镇漫步", "前往武隆仙女山镇入住"],
    driverPins: [
      {
        spot: "乌江画廊登船点",
        pin: "彭水万足码头",
        reason: "长辈在此轻松登船游乌江画廊，无需背负大件行李。"
      },
      {
        spot: "司机载行李接应点",
        pin: "龚滩古镇停车场",
        reason: "包车司机载行李直接开到龚滩古镇停车场接应，全程不走回头路。"
      },
      {
        spot: "当晚入住区域",
        pin: "武隆仙女山镇",
        reason: "古镇游玩后直接包车前往仙女山镇入住休息，方便次日游武隆。"
      }
    ],
    timeline: [
      {
        time: "上午",
        title: "重庆包车出发（途经蚩尤九黎城）",
        desc: "全家轻松乘包车离开市区，沿途欣赏渝东南山水风光；途经蚩尤九黎城可视当日时间灵活停留。",
        isNature: true,
        tags: [{ text: "包车舒适直达", type: "free" }]
      },
      {
        time: "中午至下午",
        title: "彭水万足码头乘船游「乌江画廊」",
        desc: "在船上悠闲欣赏千里乌江百里画廊，坐着看山水完全不费腿。可选全景古镇线（单程约 2–2.5小时，票价约 180元/人）或 1小时原点往返短程线（约 150元/人）。",
        isNature: true,
        tags: [
          { text: "全景单程约180元", type: "ticket" },
          { text: "短程往返约150元", type: "ticket" }
        ],
        tip: "包车无缝衔接：长辈乘船游览时，包车司机载行李直接开至龚滩古镇停车场等候接应，不走回头路！"
      },
      {
        time: "下午至傍晚",
        title: "龚滩古镇漫步 ➔ 前往武隆仙女山镇入住",
        desc: "感受千年青石板古镇韵味，傍晚乘包车前往武隆仙女山镇酒店办理入住。",
        isNature: true,
        tags: [{ text: "慢行赏景", type: "free" }],
        tip: "省力贴士：龚滩古镇沿主街青石板路慢行即可，避开陡峭小巷台阶。"
      }
    ],
    dining: [
      {
        name: "龚滩古镇地方风味餐馆",
        detail: "推荐品尝鲜嫩的乌江鱼、土家老腊肉等地方特色菜（点单可嘱咐少辣或清汤）。"
      }
    ]
  },
  {
    day: 4,
    shortTitle: "武隆奇观与返城",
    title: "Day 4｜武隆喀斯特奇观与返程市区",
    route: ["武隆天生三桥", "仙女山国家森林公园（乘小火车）", "傍晚包车返回重庆市区"],
    driverPins: [
      {
        spot: "天生三桥统一换乘点",
        pin: "仙女山游客接待中心",
        reason: "在此统一换乘景区环保车与观光电梯下谷底，省力安全。"
      },
      {
        spot: "返程市区晚餐",
        pin: "德福火锅（七星岗店）",
        reason: "二十多年居民楼老店，返回重庆市区后吃一顿软烂适口的鸳鸯老火锅。"
      }
    ],
    timeline: [
      {
        time: "上午",
        title: "武隆天生三桥（世界自然遗产）",
        desc: "旺季 08:00–17:00、淡季 08:30–16:30，建议上午入园光线好、人少更舒适。由仙女山游客接待中心统一换乘环保车与观光电梯下谷底。",
        isNature: true,
        tags: [
          { text: "70岁以上通常免大门票", type: "free" },
          { text: "含环保车/电梯", type: "ticket" }
        ],
        tip: "长辈优待：70岁以上长辈凭有效身份证件通常免大门票（仅需购买中转车/观光电梯费），请务必随身带好身份证！"
      },
      {
        time: "下午",
        title: "仙女山国家森林公园（乘小火车）",
        desc: "乘坐景区观光小火车漫游高山草甸与林海，不用长距离步行也能饱览美景。",
        isNature: true,
        tags: [{ text: "小火车代步省力", type: "free" }]
      },
      {
        time: "傍晚（或备选夜游）",
        title: "包车返回重庆市区",
        desc: "傍晚乘包车返回重庆市区酒店与市区晚餐。",
        tags: [{ text: "备选：《印象武隆》", type: "ticket" }],
        tip: "备选夜游：若体力充沛且当晚续住武隆，可在镇上吃过晚饭后包车前往观看露天实景演出《印象武隆》（注意山谷夜间防风保暖）。"
      }
    ],
    dining: [
      {
        name: "午餐：仙女山镇 · 武隆碗碗羊肉",
        detail: "热乎鲜香的本地招牌羊肉，暖胃又补体力，非常适合山区微凉天气。"
      },
      {
        name: "晚餐：德福火锅（七星岗店）",
        detail: "二十多年居民楼老店，锅底免费！耙鸡脚、耙牛肉软烂入味很适合长辈，记得点鸳鸯锅。"
      }
    ]
  },
  {
    day: 5,
    shortTitle: "历史文化与商圈",
    title: "Day 5｜巴渝历史文化与现代商圈",
    route: ["鹅岭公园（瞰胜楼）", "李子坝轻轨穿楼", "三峡博物馆", "人民大礼堂", "观音桥商圈"],
    driverPins: [
      {
        spot: "李子坝轻轨穿楼",
        pin: "李子坝观景台",
        reason: "在马路下层，才是拍轻轨列车穿楼的最佳机位。"
      },
      {
        spot: "观音桥商圈",
        pin: "久悠茶坊",
        reason: "避开建新北路严重堵车，下车即北仓，步行5分钟到塔坪社区及「我在重庆」大屏，一路下坡不废腿。"
      }
    ],
    timeline: [
      {
        time: "上午",
        title: "鹅岭公园（瞰胜楼俯瞰全景）➔ 李子坝轻轨穿楼",
        desc: "先登鹅岭公园瞰胜楼俯瞰两江与城市全景，再顺路到马路下层的「李子坝观景台」打卡轻轨穿楼奇观。",
        tags: [{ text: "免费免预约", type: "free" }]
      },
      {
        time: "下午",
        title: "三峡博物馆 & 人民大礼堂",
        desc: "三峡博物馆（免费，09:00–17:00，16:30停止入馆）；对面即人民大礼堂（外观广场免费，内部门票 8元，08:00–18:00，17:30停止售票）。",
        tags: [
          { text: "均需提前1天预约", type: "book" },
          { text: "大礼堂内部 8元", type: "ticket" }
        ],
        tip: "馆内规定：三峡博物馆内严禁使用闪光灯、自拍杆和三脚架。"
      },
      {
        time: "傍晚至夜间",
        title: "观音桥商圈（北仓 ➔ 塔坪 ➔ 我在重庆大屏）",
        desc: "在「久悠茶坊」下车逛文艺北仓，步行5分钟可达塔坪社区与「我在重庆」网红大屏。",
        tags: [{ text: "一路下坡不废腿", type: "free" }]
      }
    ],
    dining: [
      {
        name: "午餐：李子坝梁山鸡（公园二鸡哥店）",
        detail: "看完轻轨穿楼步行可达！药膳江湖菜，芋儿一抿就化，可点微辣。"
      },
      {
        name: "晚餐：观音桥美食街 或 王胖娃面",
        detail: "王胖娃面推荐现炒番茄杂酱面、莲藕抄手，清爽不辣，长辈吃着很舒服。"
      }
    ]
  },
  {
    day: 6,
    shortTitle: "采买伴手礼返程",
    title: "Day 6｜悠闲采买与返程",
    route: ["酒店自然醒", "大型超市采买伴手礼", "包车送往重庆江北国际机场返程"],
    driverPins: [
      {
        spot: "伴手礼采买",
        pin: "酒店附近大型超市 / 本地菜市场",
        reason: "切勿在景区或特产店购买，大型超市或菜市场平价且正宗。"
      },
      {
        spot: "返程送机",
        pin: "重庆江北国际机场",
        reason: "务必提前确认航班在 T2 还是 T3 航站楼，避免走错航站楼需坐摆渡车转场。"
      }
    ],
    timeline: [
      {
        time: "上午",
        title: "酒店睡到自然醒 · 悠闲早餐",
        desc: "不赶早班行程，整理好行李，享受重庆最后一个轻松早晨。",
        tags: [{ text: "慢节奏收尾", type: "free" }]
      },
      {
        time: "中午前后",
        title: "大型超市 / 本地菜市场采买伴手礼",
        desc: "火锅底料、怪味胡豆、江津米花糖、陈麻花等重庆特产，直接在正规大超市或本地菜市场选购，明码标价又正宗。",
        tags: [{ text: "避开景区高价特产店", type: "free" }]
      },
      {
        time: "送机返程",
        title: "包车直达重庆江北国际机场",
        desc: "包车提前送达对应航站楼，顺顺利利踏上归途。",
        tags: [{ text: "核对 T2 / T3 航站楼", type: "book" }],
        tip: "重要提醒：出发去机场前请再三核对机票上是 T2 还是 T3 航站楼，避免走错后换乘摆渡车耽误时间。"
      }
    ],
    dining: [
      {
        name: "返程前推荐：鬼包子 / 范孃孃糯米团",
        detail: "早起顺路吃个酱肉包配热小米粥，或手工糯米裹黄豆粉白糖夹酥脆油条，暖心满足。"
      }
    ]
  }
];

const RESERVATION_GROUPS = [
  {
    id: "advance-3",
    title: "提前 3 天预约",
    badgeText: "最先安排",
    badgeClass: "timing-3d",
    offsetDaysFromStart: -2, // Day 2 游玩，提前3天 = 出发前1天 (dayOffset 2 - 1 - 3 = -2)
    items: [
      {
        id: "huguang",
        name: "湖广会馆（Day 2 游玩）",
        account: "重庆湖广会馆",
        detail: "门票 32元 · 09:00–18:00（17:00停止检票）",
        visitDayIndex: 2,
        advanceDays: 3
      }
    ]
  },
  {
    id: "advance-1",
    title: "提前 1 天预约",
    badgeText: "Day 4 晚记得约",
    badgeClass: "timing-1d",
    items: [
      {
        id: "sanxia",
        name: "三峡博物馆（Day 5 游玩）",
        account: "重庆中国三峡博物馆",
        detail: "免费 · 09:00–17:00（16:30停止入馆）",
        visitDayIndex: 5,
        advanceDays: 1
      },
      {
        id: "dalitang",
        name: "人民大礼堂（Day 5 游玩）",
        account: "重庆市人民大礼堂",
        detail: "外观免费 / 内部 8元 · 08:00–18:00（17:30停止售票）",
        visitDayIndex: 5,
        advanceDays: 1
      }
    ]
  },
  {
    id: "same-day",
    title: "当天线上预约",
    badgeText: "出行当日操作",
    badgeClass: "timing-0d",
    items: [
      {
        id: "suodao",
        name: "长江索道（Day 2 游玩）",
        account: "长江索道",
        detail: "单程 30元 · 08:00–22:00（21:30停止入场，大雾/暴雨/大风可能停运）",
        visitDayIndex: 2,
        advanceDays: 0
      },
      {
        id: "xiaodu",
        name: "两江小渡（灵活体验）",
        account: "两江小渡预约预订",
        detail: "票价 15元 · 09:00–17:30（乘轮渡吹江风看两江）",
        visitDayIndex: 2,
        advanceDays: 0
      }
    ]
  }
];

const FREE_SPOTS = ["洪崖洞", "龙门浩老街", "下浩里", "山城步道", "鹅岭二厂"];

const FOOD_ITEMS = [
  // 长辈友好 / 不辣温和系
  {
    category: "mild",
    badge: "🌿 不辣 · 温和家常",
    name: "三条凳饭店",
    area: "解放碑磨坊巷",
    dishes: "招牌软烂蹄花汤、红烧肘子。居民楼下的地道老店，软糯暖胃不辣。"
  },
  {
    category: "mild",
    badge: "🌿 不辣 · 传统川菜",
    name: "尘香传统川菜馆",
    area: "解放碑（14年老店）",
    dishes: "鸡豆花、宫保虾球、鱼香肉丝、手工汤圆。清淡与经典川味兼具。"
  },
  {
    category: "mild",
    badge: "🌿 清爽 · 不辣面食",
    name: "王胖娃面",
    area: "市区 / 观音桥可安排",
    dishes: "现炒番茄杂酱面、莲藕抄手。酸甜鲜香、清爽不辣，长辈吃着很舒服。"
  },
  {
    category: "mild",
    badge: "🌿 汤鲜 · 温润软嫩",
    name: "海关荤豆花",
    area: "南岸 / 市区",
    dishes: "三鲜小锅约30元，含猪肝、瘦肉、豆芽、番茄、鹌鹑蛋等，豆腐嫩滑、汤鲜温润。"
  },
  {
    category: "mild",
    badge: "🌿 早餐 / 夜宵暖胃",
    name: "鬼包子",
    area: "市区老字号",
    dishes: "酱肉包配热小米粥，热乎暄软，特别适合长辈当早餐或夜宵。"
  },
  {
    category: "mild",
    badge: "🌿 香甜 · 手工早餐",
    name: "范孃孃糯米团",
    area: "市区特色早点",
    dishes: "手工糯米裹黄豆粉白糖，夹酥脆油条，甜香软糯有嚼劲。"
  },
  // 地道火锅与解辣小吃
  {
    category: "spicy",
    badge: "🌶️ 地道老火锅",
    name: "德福火锅（七星岗店）",
    area: "七星岗（二十多年居民楼老店）",
    dishes: "锅底免费！耙鸡脚、耙牛肉软烂入味适合长辈，记得点鸳鸯锅。"
  },
  {
    category: "spicy",
    badge: "🌶️ 地道老火锅",
    name: "黄家码头老火锅 / 唐红英火锅 / 利火锅",
    area: "临江门 / 七星岗等",
    dishes: "本地人常去的老火锅备选：黄家码头老火锅、唐红英火锅（临江门）、利火锅（七星岗）。"
  },
  {
    category: "spicy",
    badge: "🌶️ 火锅 + 冰稀饭解辣",
    name: "王胖娃火锅",
    area: "市区老火锅",
    dishes: "地道重庆老火锅，店里有冰稀饭解辣，吃辣后喝一碗很舒服。"
  },
  {
    category: "spicy",
    badge: "🍧 冰爽解辣小吃",
    name: "眼镜凉虾凉糕 & 李凉虾",
    area: "街头老牌小吃",
    dishes: "眼镜凉虾凉糕（17:30后出摊）、李凉虾，红糖冰爽细腻，吃火锅绝佳解辣搭档。"
  },
  {
    category: "spicy",
    badge: "🍢 现炸与老式糕点",
    name: "肖炮现炸酥肉 & 熨斗糕",
    area: "街边人气小吃",
    dishes: "现炸酥肉外酥里嫩，老式熨斗糕米香浓郁、外脆内软，适合全家分着尝鲜。"
  },
  {
    category: "spicy",
    badge: "🥛 清甜解辣甜品",
    name: "李若桃（白糯米 + 手作酸奶）",
    area: "人气饮品甜品",
    dishes: "软糯白糯米搭配醇厚手作酸奶，清甜不腻，解辣又爽口。"
  }
];

const TIPS_ACCORDION = [
  {
    id: "tip-food",
    icon: "🍜",
    title: "饮食注意与小面参考价",
    defaultOpen: true,
    bullets: [
      "重庆美食偏麻辣，不吃辣务必提前告知服务员点<strong>微微辣或鸳鸯锅</strong>。",
      "全家出行建议<strong>随身备好肠胃药、消食片</strong>，饮食循序渐进更安心。",
      "重庆小面正常参考价：<strong>素小面约 7–10元 / 二两</strong>，<strong>豌杂面约 12–15元</strong>，心里有数不怕被宰。"
    ]
  },
  {
    id: "tip-scam",
    icon: "🛡️",
    title: "防骗防宰重点提醒（务必告知长辈）",
    defaultOpen: true,
    bullets: [
      "<strong>洪崖洞全免费：</strong>所有电梯和通道均免费，切勿轻信任何收费“快速通道”或“内部员工通道”。",
      "<strong>拒绝主动合影：</strong>街边主动要求合影的“网红摄影师”或卡通铜人会收取高额费用，切勿上前拍照。",
      "<strong>拒绝黄牛拉客：</strong>勿信长江索道黄牛“插队”（现场严格按预约时段叫号），也勿轻信景区门口拉客导游。",
      "<strong>避雷路边水果：</strong>颜色发亮的“金西梅”（多为色素泡制）与景区附近超大个“把把柑”（价格虚高、易诈称且水分不足）均不要购买。"
    ]
  },
  {
    id: "tip-safety",
    icon: "👟",
    title: "出行安全、特产采买与机场提醒",
    defaultOpen: false,
    bullets: [
      "<strong>穿对鞋子：</strong>山城坡道台阶多，全员务必穿舒适防滑的<strong>平底鞋或运动鞋</strong>。",
      "<strong>切勿骑行：</strong>重庆地形起伏大、坡陡弯急，<strong>切勿尝试共享电动车</strong>。",
      "<strong>伴手礼去哪买：</strong>特产切勿在景区或特产店购买，直接让包车司机载去<strong>大型超市或本地菜市场</strong>，平价且正宗。",
      "<strong>核对航站楼：</strong>返程务必提前确认航班在<strong>江北机场 T2 还是 T3 航站楼</strong>，避免走错航站楼需坐摆渡车转场。"
    ]
  }
];

/* ==========================================================================
   状态与工具函数
   ========================================================================== */
let currentDay = 1;
let currentFoodFilter = "all";
const STORAGE_KEY_CHECKS = "cq2026_reservation_checks_v1";
const STORAGE_KEY_DATE = "cq2026_departure_date_v1";
const STORAGE_KEY_FONT = "cq2026_font_scale_v1";

function loadCheckedMap() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_CHECKS) || "{}");
  } catch {
    return {};
  }
}

function saveCheckedMap(map) {
  try {
    localStorage.setItem(STORAGE_KEY_CHECKS, JSON.stringify(map));
  } catch {
    // ignore storage errors
  }
}

let toastTimer = null;
function showToast(message) {
  const toastEl = document.getElementById("toast");
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.hidden = true;
  }, 2400);
}

async function copyText(text, triggerBtn) {
  let success = false;
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      success = true;
    } catch {
      success = false;
    }
  }
  if (!success) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      success = document.execCommand("copy");
    } catch {
      success = false;
    }
    document.body.removeChild(textarea);
  }

  if (success) {
    showToast(`已复制：「${text}」`);
    if (triggerBtn && triggerBtn.classList.contains("copy-btn")) {
      const original = triggerBtn.dataset.label || "复制定位";
      triggerBtn.classList.add("is-copied");
      triggerBtn.textContent = "✓ 已复制";
      setTimeout(() => {
        triggerBtn.classList.remove("is-copied");
        triggerBtn.textContent = original;
      }, 1800);
    }
  } else {
    showToast("请长按文字手动复制");
  }
}

function formatMonthDay(dateObj) {
  const m = dateObj.getMonth() + 1;
  const d = dateObj.getDate();
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return `${m}月${d}日（${weekdays[dateObj.getDay()]}）`;
}

function computeBookingDate(departureStr, visitDayIndex, advanceDays) {
  if (!departureStr) return "";
  const [y, m, d] = departureStr.split("-").map(Number);
  if (!y || !m || !d) return "";
  const date = new Date(y, m - 1, d);
  // Day 1 is departure date (offset 0), so visitDayIndex - 1 - advanceDays
  date.setDate(date.getDate() + (visitDayIndex - 1) - advanceDays);
  return formatMonthDay(date);
}

/* ==========================================================================
   字号切换初始化
   ========================================================================== */
function initFontScale() {
  const saved = localStorage.getItem(STORAGE_KEY_FONT) || "normal";
  applyFontScale(saved);

  document.querySelectorAll(".font-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const scale = btn.dataset.scale;
      applyFontScale(scale);
      try {
        localStorage.setItem(STORAGE_KEY_FONT, scale);
      } catch {
        // ignore
      }
      const names = { normal: "大字模式", large: "超大字模式", xlarge: "特大字模式" };
      showToast(`已切换为：${names[scale] || "大字模式"}`);
    });
  });
}

function applyFontScale(scale) {
  document.body.setAttribute("data-font-scale", scale);
  document.querySelectorAll(".font-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.scale === scale);
  });
}

/* ==========================================================================
   渲染每日行程 Tabs 与内容
   ========================================================================== */
function renderDayTabs() {
  const container = document.getElementById("dayTabs");
  container.innerHTML = ITINERARY_DAYS.map((item) => {
    const active = item.day === currentDay;
    return `
      <button
        type="button"
        role="tab"
        id="dayTab-${item.day}"
        aria-selected="${active ? "true" : "false"}"
        class="day-tab ${active ? "is-active" : ""}"
        data-day="${item.day}"
      >
        <span class="day-tab-num">DAY ${item.day}</span>
        <span class="day-tab-short">${item.shortTitle}</span>
      </button>
    `;
  }).join("");

  container.querySelectorAll(".day-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectDay(Number(btn.dataset.day));
    });
  });
}

function renderDayPanel() {
  const data = ITINERARY_DAYS.find((d) => d.day === currentDay);
  if (!data) return;

  const panel = document.getElementById("dayPanel");

  const routeHtml = data.route
    .map((step, idx) => {
      const arrow = idx < data.route.length - 1 ? `<span class="route-arrow" aria-hidden="true">➔</span>` : "";
      return `<span class="route-step">${step}</span>${arrow}`;
    })
    .join("");

  const driverHtml = data.driverPins
    .map(
      (pin, idx) => `
      <div class="driver-item">
        <div class="driver-item-content">
          <span class="driver-spot">${pin.spot}</span>
          <div class="driver-pin">📍 定位「${pin.pin}」</div>
          <p class="driver-reason">${pin.reason}</p>
        </div>
        <button
          type="button"
          class="copy-btn"
          id="copyPin-${data.day}-${idx}"
          data-copy="${pin.pin}"
          data-label="复制定位"
        >
          复制定位
        </button>
      </div>
    `
    )
    .join("");

  const allPinsSummary = data.driverPins.map((p) => `${p.spot}：${p.pin}`).join("；");

  const timelineHtml = data.timeline
    .map((step) => {
      const tagsHtml = (step.tags || [])
        .map((t) => `<span class="tag tag-${t.type}">${t.text}</span>`)
        .join("");
      const tipHtml = step.tip ? `<div class="timeline-tip">💡 ${step.tip}</div>` : "";
      return `
        <article class="timeline-card ${step.isNature ? "is-nature" : ""}">
          <div class="timeline-top">
            <span class="timeline-time">${step.time}</span>
            <div class="timeline-tags">${tagsHtml}</div>
          </div>
          <h4 class="timeline-title">${step.title}</h4>
          <p class="timeline-desc">${step.desc}</p>
          ${tipHtml}
        </article>
      `;
    })
    .join("");

  const diningHtml = data.dining
    .map(
      (d) => `
      <div class="dining-item">
        <h4 class="dining-name">🍽️ ${d.name}</h4>
        <p class="dining-detail">${d.detail}</p>
      </div>
    `
    )
    .join("");

  panel.innerHTML = `
    <div class="day-header">
      <span class="day-badge">第 ${data.day} 天行程</span>
      <h3 class="day-title">${data.title}</h3>
      <div class="route-trail" aria-label="当日路线">${routeHtml}</div>
    </div>

    <div class="driver-box" aria-label="司机精准导航定位">
      <div class="driver-box-header">
        <h4 class="driver-box-title"><span aria-hidden="true">🚐</span> 司机精准导航定位（直接发给师傅）</h4>
        <button type="button" class="copy-all-btn" data-copy-all="${allPinsSummary}">
          一键复制本日全部定位
        </button>
      </div>
      <div class="driver-list">${driverHtml}</div>
    </div>

    <h4 class="sub-heading"><span aria-hidden="true">🕒</span> 时间线与景点亮点</h4>
    <div class="timeline">${timelineHtml}</div>

    <div class="day-dining">
      <h4 class="sub-heading"><span aria-hidden="true">🍲</span> 本日餐饮推荐</h4>
      <div class="dining-list">${diningHtml}</div>
    </div>
  `;

  panel.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => copyText(btn.dataset.copy, btn));
  });

  const copyAllBtn = panel.querySelector(".copy-all-btn");
  if (copyAllBtn) {
    copyAllBtn.addEventListener("click", () => copyText(copyAllBtn.dataset.copyAll));
  }

  // 更新底部分页状态
  const prevBtn = document.getElementById("prevDayBtn");
  const nextBtn = document.getElementById("nextDayBtn");
  const indicator = document.getElementById("pagerIndicator");
  prevBtn.disabled = currentDay === 1;
  nextBtn.disabled = currentDay === ITINERARY_DAYS.length;
  indicator.textContent = `第 ${currentDay} / ${ITINERARY_DAYS.length} 天`;
}

function selectDay(dayNum, shouldScroll = false) {
  currentDay = Math.max(1, Math.min(ITINERARY_DAYS.length, dayNum));
  renderDayTabs();
  renderDayPanel();
  if (shouldScroll) {
    document.getElementById("itinerary").scrollIntoView({ behavior: "smooth" });
  }
}

/* ==========================================================================
   渲染预约清单与出发日倒计时计算
   ========================================================================== */
function renderReservations() {
  const container = document.getElementById("reservationGroups");
  const checkedMap = loadCheckedMap();
  const departureDate = document.getElementById("departureDateInput").value;

  let totalItems = 0;
  let checkedCount = 0;

  const groupsHtml = RESERVATION_GROUPS.map((group) => {
    const itemsHtml = group.items
      .map((item) => {
        totalItems += 1;
        const isChecked = Boolean(checkedMap[item.id]);
        if (isChecked) checkedCount += 1;
        const calcDate = computeBookingDate(departureDate, item.visitDayIndex, item.advanceDays);
        const calcHtml = calcDate
          ? `<span class="res-calc-date">⏰ 建议预约日：${calcDate}</span>`
          : "";

        return `
          <div class="res-item ${isChecked ? "is-checked" : ""}">
            <label class="res-check-label">
              <input
                type="checkbox"
                class="res-checkbox"
                data-res-id="${item.id}"
                ${isChecked ? "checked" : ""}
              />
              <div>
                <div class="res-item-name">${item.name}</div>
                <div class="res-item-meta">微信公众号：「${item.account}」 · ${item.detail}</div>
                ${calcHtml}
              </div>
            </label>
            <button
              type="button"
              class="copy-account-btn"
              data-copy="${item.account}"
            >
              复制公众号名
            </button>
          </div>
        `;
      })
      .join("");

    return `
      <div class="res-group">
        <div class="res-group-header">
          <h3 class="res-group-title">${group.title}</h3>
          <span class="res-timing-pill ${group.badgeClass}">${group.badgeText}</span>
        </div>
        <div class="res-items">${itemsHtml}</div>
      </div>
    `;
  }).join("");

  const freeGroupHtml = `
    <div class="res-group">
      <div class="res-group-header">
        <h3 class="res-group-title">无需预约（免费直接逛）</h3>
        <span class="res-timing-pill timing-free">随到随逛</span>
      </div>
      <div class="free-spot-chips">
        ${FREE_SPOTS.map((spot) => `<span class="free-chip">✓ ${spot}</span>`).join("")}
      </div>
    </div>
  `;

  container.innerHTML = groupsHtml + freeGroupHtml;

  document.getElementById("reservationProgress").textContent = `已预约 ${checkedCount} / ${totalItems} 项`;

  container.querySelectorAll(".res-checkbox").forEach((cb) => {
    cb.addEventListener("change", () => {
      const map = loadCheckedMap();
      map[cb.dataset.resId] = cb.checked;
      saveCheckedMap(map);
      renderReservations();
    });
  });

  container.querySelectorAll(".copy-account-btn").forEach((btn) => {
    btn.addEventListener("click", () => copyText(btn.dataset.copy));
  });
}

function initDepartureDate() {
  const input = document.getElementById("departureDateInput");
  const clearBtn = document.getElementById("clearDateBtn");
  const saved = localStorage.getItem(STORAGE_KEY_DATE) || "";
  if (saved) {
    input.value = saved;
    clearBtn.hidden = false;
  }

  input.addEventListener("change", () => {
    try {
      localStorage.setItem(STORAGE_KEY_DATE, input.value);
    } catch {
      // ignore
    }
    clearBtn.hidden = !input.value;
    renderReservations();
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.hidden = true;
    try {
      localStorage.removeItem(STORAGE_KEY_DATE);
    } catch {
      // ignore
    }
    renderReservations();
  });
}

/* ==========================================================================
   渲染长辈友好美食指南
   ========================================================================== */
function renderFoodGuide() {
  const grid = document.getElementById("foodGrid");
  const filtered =
    currentFoodFilter === "all"
      ? FOOD_ITEMS
      : FOOD_ITEMS.filter((item) => item.category === currentFoodFilter);

  grid.innerHTML = filtered
    .map((item) => {
      const isMild = item.category === "mild";
      return `
        <article class="food-card ${isMild ? "is-mild" : "is-spicy"}">
          <div class="food-card-top">
            <span class="food-badge ${isMild ? "badge-mild" : "badge-spicy"}">${item.badge}</span>
            <span class="food-area">📍 ${item.area}</span>
          </div>
          <h3 class="food-name">${item.name}</h3>
          <p class="food-dishes">${item.dishes}</p>
        </article>
      `;
    })
    .join("");
}

function initFoodFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFoodFilter = btn.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.toggle("is-active", b.dataset.filter === currentFoodFilter);
      });
      renderFoodGuide();
    });
  });
}

/* ==========================================================================
   渲染避坑与出行贴士折叠面板
   ========================================================================== */
function renderTipsAccordion() {
  const container = document.getElementById("tipsAccordion");
  container.innerHTML = TIPS_ACCORDION.map(
    (tip) => `
      <div class="accordion-item ${tip.defaultOpen ? "is-open" : ""}" data-tip-id="${tip.id}">
        <button
          type="button"
          class="accordion-trigger"
          aria-expanded="${tip.defaultOpen ? "true" : "false"}"
        >
          <span class="accordion-title-wrap">
            <span aria-hidden="true">${tip.icon}</span>
            <span>${tip.title}</span>
          </span>
          <span class="accordion-chevron" aria-hidden="true">▼</span>
        </button>
        <div class="accordion-content">
          <ul class="tip-bullet-list">
            ${tip.bullets.map((b) => `<li>${b}</li>`).join("")}
          </ul>
        </div>
      </div>
    `
  ).join("");

  container.querySelectorAll(".accordion-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const item = trigger.closest(".accordion-item");
      const willOpen = !item.classList.contains("is-open");
      item.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
      syncToggleAllTipsBtn();
    });
  });

  const toggleAllBtn = document.getElementById("toggleAllTipsBtn");
  toggleAllBtn.addEventListener("click", () => {
    const items = [...container.querySelectorAll(".accordion-item")];
    const allOpen = items.every((el) => el.classList.contains("is-open"));
    items.forEach((el) => {
      el.classList.toggle("is-open", !allOpen);
      el.querySelector(".accordion-trigger").setAttribute("aria-expanded", String(!allOpen));
    });
    syncToggleAllTipsBtn();
  });

  syncToggleAllTipsBtn();
}

function syncToggleAllTipsBtn() {
  const container = document.getElementById("tipsAccordion");
  const toggleAllBtn = document.getElementById("toggleAllTipsBtn");
  const items = [...container.querySelectorAll(".accordion-item")];
  const allOpen = items.every((el) => el.classList.contains("is-open"));
  toggleAllBtn.textContent = allOpen ? "全部收起" : "全部展开";
}

/* ==========================================================================
   启动初始化
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initFontScale();
  renderDayTabs();
  renderDayPanel();

  document.getElementById("prevDayBtn").addEventListener("click", () => {
    selectDay(currentDay - 1, true);
  });
  document.getElementById("nextDayBtn").addEventListener("click", () => {
    selectDay(currentDay + 1, true);
  });

  // 概览区乘车码一键复制
  document.querySelectorAll(".inline-copy-chip").forEach((chip) => {
    chip.addEventListener("click", () => copyText(chip.dataset.copy));
  });

  initDepartureDate();
  renderReservations();
  initFoodFilters();
  renderFoodGuide();
  renderTipsAccordion();
});
