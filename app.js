/* ==========================================================================
   重庆 6天5夜 家庭包车慢游指南 — 交互、地铁指引与每日高德实景路线图
   ========================================================================== */

function buildAmapUrl(keyword) {
  return `https://www.amap.com/ssr/search?query_type=TQUERY&query=${encodeURIComponent(keyword)}&city=500000`;
}

/* WGS-84 转 GCJ-02（让标准经纬度精准贴合高德中文底图） */
function wgs84ToGcj02(lat, lng) {
  const PI = Math.PI;
  const a = 6378245.0;
  const ee = 0.00669342162296594323;
  const transformLat = (x, y) => {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(y * PI) + 40.0 * Math.sin((y / 3.0) * PI)) * 2.0) / 3.0;
    ret += ((160.0 * Math.sin((y / 12.0) * PI) + 320 * Math.sin((y * PI) / 30.0)) * 2.0) / 3.0;
    return ret;
  };
  const transformLng = (x, y) => {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(x * PI) + 40.0 * Math.sin((x / 3.0) * PI)) * 2.0) / 3.0;
    ret += ((150.0 * Math.sin((x / 12.0) * PI) + 300.0 * Math.sin((x / 30.0) * PI)) * 2.0) / 3.0;
    return ret;
  };
  let dLat = transformLat(lng - 105.0, lat - 35.0);
  let dLng = transformLng(lng - 105.0, lat - 35.0);
  const radLat = (lat / 180.0) * PI;
  let magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * PI);
  dLng = (dLng * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * PI);
  return [lat + dLat, lng + dLng];
}

const ITINERARY_DAYS = [
  {
    day: 1,
    dateLabel: "11月30日（周一）",
    shortTitle: "抵达与经典夜景",
    title: "Day 1｜抵达山城与经典夜景",
    route: ["14:15 抵达江北机场 T3", "湖广·富山江景美宿入住", "解放碑", "白象居", "洪崖洞夜景", "江滩公园看全景"],
    driverPins: [
      {
        spot: "民宿入住",
        pin: "湖广·富山江景美宿(重庆解放碑店)",
        mapQuery: "湖广·富山江景美宿(重庆解放碑店)",
        reason: "14:15 抵达江北机场 T3 后包车直达解放东路湖广印巷1号办理入住休整。"
      },
      {
        spot: "解放碑",
        pin: "八一广场",
        mapQuery: "重庆八一广场",
        reason: "避开外围主干道堵车禁停，下车即纪念碑与八一好吃街。"
      },
      {
        spot: "白象居",
        pin: "白象居3号楼",
        mapQuery: "白象居3号楼",
        reason: "直达索道穿楼网红机位，免爬无电梯长台阶。"
      },
      {
        spot: "洪崖洞",
        pin: "嘉滨路洪崖洞（公交站）",
        mapQuery: "嘉滨路洪崖洞公交站",
        reason: "在马路下层，直接看夜景全貌，免去景区内部挤电梯。"
      }
    ],
    timeline: [
      {
        time: "14:15 抵达",
        title: "重庆江北机场 T3 接机 ➔ 湖广·富山江景美宿入住休整",
        desc: "HU7271 预计 14:15 抵达江北国际机场 T3 航站楼，包车接机直达民宿安顿行李、稍作休息。",
        tags: [{ text: "全程包车接送", type: "free" }],
        metro: {
          title: "备选地铁接驳（如需乘轨道交通）",
          detail: "<span class=\"line-chip line-10\">10号线</span> <strong>江北机场T3航站楼站</strong> ➔ <strong>红土地站</strong> 换乘 <span class=\"line-chip line-6\">6号线</span> ➔ <strong>小什字站</strong>（步行约 5 分钟到民宿）。"
        }
      },
      {
        time: "傍晚",
        title: "解放碑 & 白象居",
        desc: "在「八一广场」下车打卡解放碑与八一好吃街；随后乘车至「白象居3号楼」拍索道穿楼经典机位。",
        tags: [{ text: "免费免预约", type: "free" }],
        metro: {
          title: "周边地铁站参考",
          detail: "解放碑近 <span class=\"line-chip line-2\">2号线</span> <strong>临江门站</strong> / <span class=\"line-chip line-1\">1号线</span> <strong>较场口站</strong>；白象居近 <span class=\"line-chip line-1\">1号线</span> <span class=\"line-chip line-6\">6号线</span> <strong>小什字站</strong>（8号口）。"
        },
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
        metro: {
          title: "洪崖洞 ➔ 江滩公园（晚高峰强烈推荐搭地铁过江！）",
          detail: "千厮门大桥晚高峰极易堵车！推荐在 <strong>小什字站</strong> 乘 <span class=\"line-chip line-6\">6号线</span> 坐 <strong>1 站</strong> 至 <strong>大剧院站</strong>（2号/3号口出，3 分钟过江直达江滩公园看洪崖洞全景）；看完再坐 <span class=\"line-chip line-6\">6号线</span> 1 站回 <strong>小什字站</strong> 步行 5 分钟回民宿！"
        },
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
    ],
    mapRoute: {
      color: "#1d68c4",
      subtitle: "渝中核心夜景环线（江北机场 T3 接机 ➔ 民宿 ➔ 解放碑 ➔ 白象居 ➔ 洪崖洞 ➔ 江滩公园）",
      stops: [
        { name: "湖广·富山美宿", lat: 29.5612, lng: 106.5838, note: "14:15 从江北机场 T3 包车直达民宿入住休整", metro: "近 1/6号线 小什字站（步行5分钟）", query: "湖广·富山江景美宿(重庆解放碑店)" },
        { name: "解放碑(八一广场)", lat: 29.5574, lng: 106.5770, note: "重庆城市地标纪念碑 & 八一好吃街", metro: "近 2号线 临江门站 / 1号线 较场口站", query: "重庆八一广场" },
        { name: "白象居3号楼", lat: 29.5565, lng: 106.5831, note: "长江索道穿楼经典机位，直达免爬长台阶", metro: "近 1/6号线 小什字站", query: "白象居3号楼" },
        { name: "洪崖洞", lat: 29.5632, lng: 106.5790, note: "19:30–23:00 亮灯，嘉滨路马路下层看全貌", metro: "近 1/6号线 小什字站", query: "嘉滨路洪崖洞公交站" },
        { name: "江滩公园(大剧院)", lat: 29.5686, lng: 106.5804, note: "隔江拍洪崖洞与千厮门大桥全景最佳免费机位", metro: "6号线 大剧院站（2/3号口）", query: "重庆大剧院江滩公园" }
      ],
      segments: [
        { label: "🚐 包车约8分钟", dashed: false },
        { label: "🚐 包车约8分钟", dashed: false },
        { label: "🚐 包车约10分钟", dashed: false },
        { label: "🚇 6号线1站(3分钟)", dashed: true }
      ]
    }
  },
  {
    day: 2,
    dateLabel: "12月1日（周二）",
    shortTitle: "古建索道与南岸",
    title: "Day 2｜巴渝古建、跨江索道与南岸江景",
    route: ["湖广会馆", "长江索道（过江）", "下浩里", "龙门浩老街", "弹子石老街／钟楼广场夜景"],
    driverPins: [
      {
        spot: "湖广会馆",
        pin: "湖广会馆东门",
        mapQuery: "湖广会馆东门",
        reason: "直接进古建筑群正门，避免绕外围马路（就在我们民宿附近）。"
      },
      {
        spot: "长江索道",
        pin: "长江索道南站",
        mapQuery: "长江索道南站",
        reason: "风景好且排队人数比北站少一半，建议只买单程。"
      },
      {
        spot: "下浩里／龙门浩老街",
        pin: "上新街1号口",
        mapQuery: "上新街地铁站1号口",
        reason: "从上往下逛不废腿，园内览月台旁、比利时大使馆旧址旁、福门天桥等处设有便民直梯和扶梯。"
      },
      {
        spot: "弹子石老街",
        pin: "弹子石广场观景台",
        mapQuery: "弹子石广场观景台",
        reason: "视野开阔，适合看两岸灯光夜景。"
      }
    ],
    timeline: [
      {
        time: "上午 09:00–12:00",
        title: "湖广会馆（巴渝古建筑群）",
        desc: "开放时间 09:00–18:00（17:00停止检票）。就在民宿附近，明黄色古建群非常出片，游览节奏舒缓。",
        tags: [
          { text: "需提前3天预约", type: "book" },
          { text: "门票 32元", type: "ticket" }
        ],
        metro: {
          title: "步行 / 地铁参考",
          detail: "距离我们民宿非常近，也可从 <span class=\"line-chip line-1\">1号线</span> <span class=\"line-chip line-6\">6号线</span> <strong>小什字站</strong>（7/8号口）步行约 8 分钟或包车直达东门。"
        },
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
        metro: {
          title: "长江索道两端地铁站",
          detail: "索道北站近 <span class=\"line-chip line-1\">1号线</span> <span class=\"line-chip line-6\">6号线</span> <strong>小什字站</strong>（5B口）；索道南站近 <span class=\"line-chip line-6\">6号线</span> <span class=\"line-chip line-loop\">环线</span> <strong>上新街站</strong>。"
        },
        tip: "天气提醒：大雾、暴雨、大风天气可能临时停运，出行前请先查看官方公告。"
      },
      {
        time: "傍晚至夜间",
        title: "下浩里 ➔ 龙门浩老街 ➔ 弹子石老街／钟楼广场夜景",
        desc: "从上新街1号口由上往下漫步老街，江景茶馆随时歇脚；天黑后到弹子石广场观景台欣赏两江交汇灯光夜景。",
        tags: [{ text: "免费免预约", type: "free" }],
        metro: {
          title: "南岸老街串游 & 晚高峰回民宿地铁指引",
          detail: "下浩里/龙门浩紧邻 <span class=\"line-chip line-6\">6号线</span> <span class=\"line-chip line-loop\">环线</span> <strong>上新街站</strong>（1号/2号口）；前往弹子石可包车或乘 <span class=\"line-chip line-loop\">环线</span> <strong>上新街站</strong> ➔ 2 站至 <strong>弹子石站</strong>。若晚高峰回民宿堵车，从 <strong>上新街站</strong> 乘 <span class=\"line-chip line-6\">6号线</span> 仅 <strong>1 站</strong> 即达 <strong>小什字站</strong>！"
        },
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
    ],
    mapRoute: {
      color: "#d95f24",
      subtitle: "渝中跨江南岸线（湖广会馆 ➔ 长江索道 ➔ 下浩里/龙门浩 ➔ 弹子石老街夜景）",
      stops: [
        { name: "湖广会馆东门", lat: 29.5608, lng: 106.5844, note: "清代明黄古建群，齐安公所喝茶看戏", metro: "近 1/6号线 小什字站（7/8号口）", query: "湖广会馆东门" },
        { name: "长江索道南站", lat: 29.5554, lng: 106.5889, note: "跨长江空中索道，南站排队少一半", metro: "近 6号线/环线 上新街站", query: "长江索道南站" },
        { name: "下浩里/龙门浩", lat: 29.5589, lng: 106.5936, note: "上新街1号口由上往下逛，多部直梯扶梯不废腿", metro: "6号线/环线 上新街站（1/2号口）", query: "上新街地铁站1号口" },
        { name: "弹子石老街", lat: 29.5798, lng: 106.5924, note: "弹子石广场观景台赏两江交汇璀璨夜景", metro: "近 环线 弹子石站", query: "弹子石广场观景台" }
      ],
      segments: [
        { label: "🚡 索道/包车约10分钟", dashed: true },
        { label: "🚐 包车/步行约6分钟", dashed: false },
        { label: "🚐 包车12分钟 / 🚇 环线2站", dashed: false }
      ]
    }
  },
  {
    day: 3,
    dateLabel: "12月2日（周三）",
    shortTitle: "乌江画廊与古镇",
    title: "Day 3｜千里乌江画廊与千年古镇",
    route: ["重庆包车出发", "（途经蚩尤九黎城，视时间停留）", "彭水万足码头乘船游乌江画廊", "龚滩古镇漫步", "前往武隆仙女山镇入住"],
    driverPins: [
      {
        spot: "乌江画廊登船点",
        pin: "彭水万足码头",
        mapQuery: "彭水万足码头",
        reason: "长辈在此轻松登船游乌江画廊，无需背负大件行李。"
      },
      {
        spot: "司机载行李接应点",
        pin: "龚滩古镇停车场",
        mapQuery: "龚滩古镇停车场",
        reason: "包车司机载行李直接开到龚滩古镇停车场接应，全程不走回头路。"
      },
      {
        spot: "武隆方向",
        pin: "武隆仙女山镇",
        mapQuery: "武隆仙女山镇",
        reason: "古镇游玩后直接包车前往仙女山镇休息，方便次日游武隆。"
      }
    ],
    timeline: [
      {
        time: "上午",
        title: "重庆包车出发（途经蚩尤九黎城）",
        desc: "全家轻松乘包车离开市区，沿途欣赏渝东南山水风光；途经蚩尤九黎城可视当日时间灵活停留。",
        isNature: true,
        tags: [{ text: "全程包车·无地铁", type: "free" }]
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
        title: "龚滩古镇漫步 ➔ 前往武隆仙女山镇",
        desc: "感受千年青石板古镇韵味，傍晚乘包车前往武隆仙女山镇休整。",
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
    ],
    mapRoute: {
      color: "#1f8a5b",
      subtitle: "渝东南乌江山水包车+游船线（解放碑出发 ➔ 彭水万足码头 ➔ 乘船至龚滩古镇 ➔ 武隆仙女山镇）",
      stops: [
        { name: "重庆解放碑出发", lat: 29.5612, lng: 106.5838, note: "包车从湖广·富山美宿舒适出发", metro: "本日为长途山水线，全程包车", query: "湖广·富山江景美宿(重庆解放碑店)" },
        { name: "蚩尤九黎城(途经)", lat: 29.2975, lng: 108.1850, note: "视当日时间灵活决定是否停留打卡", metro: "包车途经点", query: "蚩尤九黎城" },
        { name: "彭水万足码头", lat: 29.1930, lng: 108.2100, note: "长辈在此登船游览百里乌江画廊", metro: "游船登船点", query: "彭水万足码头" },
        { name: "龚滩古镇", lat: 28.9028, lng: 108.3489, note: "沿青石板主街慢逛，司机载行李在停车场接应", metro: "不走回头路", query: "龚滩古镇停车场" },
        { name: "武隆仙女山镇", lat: 29.4295, lng: 107.7525, note: "抵达武隆仙女山镇休息，次日游天生三桥", metro: "包车直达", query: "武隆仙女山镇" }
      ],
      segments: [
        { label: "🚐 包车高速约2.5h", dashed: false },
        { label: "🚐 包车约20分钟", dashed: false },
        { label: "⛴️ 乌江游船2–2.5h", dashed: true },
        { label: "🚐 包车约1.5–2h", dashed: false }
      ]
    }
  },
  {
    day: 4,
    dateLabel: "12月3日（周四）",
    shortTitle: "武隆奇观与返城",
    title: "Day 4｜武隆喀斯特奇观与返程市区",
    route: ["武隆天生三桥", "仙女山国家森林公园（乘小火车）", "傍晚包车返回重庆市区"],
    driverPins: [
      {
        spot: "天生三桥统一换乘点",
        pin: "仙女山游客接待中心",
        mapQuery: "仙女山游客接待中心",
        reason: "在此统一换乘景区环保车与观光电梯下谷底，省力安全。"
      },
      {
        spot: "返程市区晚餐",
        pin: "德福火锅（七星岗店）",
        mapQuery: "德福火锅七星岗店",
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
        tip: "长辈优待：70岁以上长辈凭有效身份证件通常免大门票（仅需购买中转车/观光电梯费），请务必随身带好证件！"
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
        title: "包车返回重庆市区 ➔ 七星岗德福火锅",
        desc: "傍晚乘包车返回重庆市区吃德福火锅，饭后回解放碑民宿休息。",
        tags: [{ text: "备选：《印象武隆》", type: "ticket" }],
        metro: {
          title: "吃完火锅回民宿地铁备选",
          detail: "德福火锅近 <span class=\"line-chip line-1\">1号线</span> <span class=\"line-chip line-10\">10号线</span> <strong>七星岗站</strong>，饭后若不想等车，乘 <span class=\"line-chip line-1\">1号线</span> 坐 <strong>2 站</strong> 至 <strong>小什字站</strong> 即可回民宿！"
        },
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
    ],
    mapRoute: {
      color: "#6c3ec7",
      subtitle: "武隆喀斯特奇观 ➔ 返程重庆市区（游客中心 ➔ 天生三桥 ➔ 仙女山小火车 ➔ 德福火锅 ➔ 民宿）",
      stops: [
        { name: "仙女山游客中心", lat: 29.4295, lng: 107.7525, note: "统一换乘景区环保车进入天生三桥", metro: "景区统一换乘枢纽", query: "仙女山游客接待中心" },
        { name: "武隆天生三桥", lat: 29.4318, lng: 107.7980, note: "乘观光电梯下谷底，游览天龙/青龙/黑龙三桥", metro: "70岁以上免大门票", query: "武隆天生三桥" },
        { name: "仙女山森林公园", lat: 29.4905, lng: 107.7410, note: "乘观光小火车漫游高山草甸林海", metro: "小火车代步不累", query: "仙女山国家森林公园" },
        { name: "德福火锅(七星岗)", lat: 29.5562, lng: 106.5635, note: "返渝晚餐，耙鸡脚/耙牛肉软烂适合长辈", metro: "近 1/10号线 七星岗站", query: "德福火锅七星岗店" },
        { name: "湖广·富山美宿", lat: 29.5612, lng: 106.5838, note: "返回解放碑民宿休息", metro: "1号线 七星岗 ➔ 小什字(2站)", query: "湖广·富山江景美宿(重庆解放碑店)" }
      ],
      segments: [
        { label: "🚌 环保车约15分钟", dashed: true },
        { label: "🚐 包车约25分钟", dashed: false },
        { label: "🚐 包车返城约2.5h", dashed: false },
        { label: "🚐 包车8分钟 / 🚇 1号线2站", dashed: false }
      ]
    }
  },
  {
    day: 5,
    dateLabel: "12月4日（周五）",
    shortTitle: "历史文化与商圈",
    title: "Day 5｜巴渝历史文化与现代商圈",
    route: ["鹅岭公园（瞰胜楼）", "李子坝轻轨穿楼", "三峡博物馆", "人民大礼堂", "观音桥商圈"],
    driverPins: [
      {
        spot: "李子坝轻轨穿楼",
        pin: "李子坝观景台",
        mapQuery: "李子坝观景台",
        reason: "在马路下层，才是拍轻轨列车穿楼的最佳机位。"
      },
      {
        spot: "观音桥商圈",
        pin: "久悠茶坊",
        mapQuery: "久悠茶坊",
        reason: "避开建新北路严重堵车，下车即北仓，步行5分钟到塔坪社区及「我在重庆」大屏，一路下坡不废腿。"
      }
    ],
    timeline: [
      {
        time: "上午",
        title: "鹅岭公园（瞰胜楼俯瞰全景）➔ 李子坝轻轨穿楼",
        desc: "先登鹅岭公园瞰胜楼俯瞰两江与城市全景，再顺路到马路下层的「李子坝观景台」打卡轻轨穿楼奇观。",
        tags: [{ text: "免费免预约", type: "free" }],
        metro: {
          title: "上午地铁站参考",
          detail: "民宿出发可包车或乘 <span class=\"line-chip line-1\">1号线</span> <strong>小什字站</strong> ➔ 5 站至 <strong>鹅岭站</strong>（1号/2A口出）；李子坝轻轨穿楼打卡点即 <span class=\"line-chip line-2\">2号线</span> <strong>李子坝站</strong>！"
        }
      },
      {
        time: "下午",
        title: "三峡博物馆 & 人民大礼堂",
        desc: "三峡博物馆（免费，09:00–17:00，16:30停止入馆）；对面即人民大礼堂（外观广场免费，内部门票 8元，08:00–18:00，17:30停止售票）。",
        tags: [
          { text: "均需提前1天预约", type: "book" },
          { text: "大礼堂内部 8元", type: "ticket" }
        ],
        metro: {
          title: "李子坝 ➔ 三峡博物馆（推荐亲身体验 2 号线江景单轨！）",
          detail: "从 <span class=\"line-chip line-2\">2号线</span> <strong>李子坝站</strong> 上车，坐 <strong>2 站</strong> 至 <strong>曾家岩站</strong>（A口出步行约 8 分钟即达人民大礼堂与三峡博物馆，一路欣赏嘉陵江风景）；两馆正对面还设有 <span class=\"line-chip line-10\">10号线</span> <strong>大礼堂站</strong>。三峡博物馆与人民大礼堂隔广场相对，<strong>步行 3–5 分钟</strong>即可！"
        },
        tip: "馆内规定：三峡博物馆内严禁使用闪光灯、自拍杆和三脚架。"
      },
      {
        time: "傍晚至夜间",
        title: "观音桥商圈（北仓 ➔ 塔坪 ➔ 我在重庆大屏）",
        desc: "在「久悠茶坊」下车逛文艺北仓，步行5分钟可达塔坪社区与「我在重庆」网红大屏。",
        tags: [{ text: "一路下坡不废腿", type: "free" }],
        metro: {
          title: "晚高峰前往观音桥 & 返回民宿地铁指引",
          detail: "晚高峰建新北路极易堵车！可从 <span class=\"line-chip line-10\">10号线</span> <strong>大礼堂站</strong> ➔ <strong>鲤鱼池站</strong> 换 <span class=\"line-chip line-9\">9号线</span> ➔ <strong>观音桥站</strong>（或包车导航「久悠茶坊」）。逛完回民宿乘 <span class=\"line-chip line-3\">3号线</span> <strong>观音桥站</strong> ➔ <strong>两路口站</strong> 换 <span class=\"line-chip line-1\">1号线</span> ➔ <strong>小什字站</strong>。"
        }
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
    ],
    mapRoute: {
      color: "#c75a16",
      subtitle: "渝中文化+网红单轨+观音桥（鹅岭公园 ➔ 李子坝 ➔ 2号线单轨 ➔ 三峡博物馆/大礼堂 ➔ 观音桥）",
      stops: [
        { name: "鹅岭公园(瞰胜楼)", lat: 29.5512, lng: 106.5356, note: "登高俯瞰两江与渝中半岛全景", metro: "近 1号线 鹅岭站（1/2A口）", query: "鹅岭公园" },
        { name: "李子坝观景台", lat: 29.5550, lng: 106.5387, note: "马路下层拍 2 号线轻轨穿楼奇观", metro: "2号线 李子坝站", query: "李子坝观景台" },
        { name: "三峡博物馆", lat: 29.5619, lng: 106.5503, note: "了解三峡与巴渝历史文化（需提前1天预约）", metro: "2号线 曾家岩站 / 10号线 大礼堂站", query: "重庆中国三峡博物馆" },
        { name: "人民大礼堂", lat: 29.5620, lng: 106.5535, note: "重庆地标宫殿建筑，外观广场出片", metro: "10号线 大礼堂站", query: "重庆市人民大礼堂" },
        { name: "观音桥(久悠茶坊)", lat: 29.5754, lng: 106.5326, note: "北仓 ➔ 塔坪社区 ➔「我在重庆」大屏，一路下坡", metro: "3/9号线 观音桥站", query: "久悠茶坊" }
      ],
      segments: [
        { label: "🚐 包车6分钟", dashed: false },
        { label: "🚇 2号线2站至曾家岩", dashed: true },
        { label: "🚶 步行4分钟", dashed: false },
        { label: "🚐 包车15分钟 / 🚇 10换9号线", dashed: true }
      ]
    }
  },
  {
    day: 6,
    dateLabel: "12月5日–6日（周六/周日）",
    shortTitle: "采买伴手礼与返程",
    title: "Day 6｜悠闲采买与 12月6日返程送机",
    route: ["自然醒休整", "大型超市采买伴手礼", "12月6日 11:05 江北机场 T3 飞往槟城"],
    driverPins: [
      {
        spot: "伴手礼采买",
        pin: "大型超市 / 本地菜市场",
        mapQuery: "解放碑大型超市",
        reason: "切勿在景区或特产店购买，大型超市或菜市场平价且正宗。"
      },
      {
        spot: "返程送机（12月6日）",
        pin: "重庆江北国际机场T3航站楼",
        mapQuery: "重庆江北国际机场T3航站楼",
        reason: "海南航空 HU7172 于 11:05 从 T3 航站楼起飞，请提前 2.5–3 小时出发送机。"
      }
    ],
    timeline: [
      {
        time: "12月5日 悠闲采买",
        title: "大型超市 / 本地菜市场采买伴手礼",
        desc: "火锅底料、怪味胡豆、江津米花糖、陈麻花等重庆特产，直接在正规大超市或本地菜市场选购，明码标价又正宗；晚上打包好行李早点休息。",
        tags: [{ text: "避开景区高价特产店", type: "free" }]
      },
      {
        time: "12月6日 上午",
        title: "民宿退房 ➔ 包车前往重庆江北国际机场 T3 航站楼",
        desc: "11:05 搭乘海南航空 HU7172 飞往海口（T2 中转 3h15m，行李直挂），16:30 转乘 HU477 返回槟城。",
        tags: [
          { text: "T3 航站楼出发", type: "book" },
          { text: "11:05 起飞", type: "ticket" }
        ],
        metro: {
          title: "机场备选地铁（行李较多首选包车直达）",
          detail: "如需搭地铁：<span class=\"line-chip line-6\">6号线</span> <strong>小什字站</strong> ➔ <strong>红土地站</strong> 换乘 <span class=\"line-chip line-10\">10号线</span> ➔ <strong>江北机场T3航站楼站</strong>（全程约 45 分钟，注意 10 号线直达 T3，3 号线仅到 T2）。"
        },
        tip: "重要提醒：12月6日航班在江北机场 T3 航站楼起飞（非 T2），建议早上 08:00 左右从解放碑民宿出发，留足值机与安检时间。"
      }
    ],
    dining: [
      {
        name: "返程前推荐：鬼包子 / 范孃孃糯米团",
        detail: "早起顺路吃个酱肉包配热小米粥，或手工糯米裹黄豆粉白糖夹酥脆油条，暖心满足。"
      }
    ],
    mapRoute: {
      color: "#1c7ed6",
      subtitle: "采买与送机返程线（湖广·富山美宿 ➔ 解放碑大型超市 ➔ 重庆江北国际机场 T3 航站楼）",
      stops: [
        { name: "湖广·富山美宿", lat: 29.5612, lng: 106.5838, note: "12月6日早上退房出发，建议 08:00 启程", metro: "近 1/6号线 小什字站", query: "湖广·富山江景美宿(重庆解放碑店)" },
        { name: "解放碑大型超市", lat: 29.5582, lng: 106.5762, note: "12月5日平价采买火锅底料、怪味胡豆等特产", metro: "近 2号线 临江门站", query: "解放碑大型超市" },
        { name: "江北国际机场 T3", lat: 29.7100, lng: 106.6513, note: "12月6日 11:05 海南航空 HU7172 起飞返回槟城", metro: "10号线 江北机场T3航站楼站", query: "重庆江北国际机场T3航站楼" }
      ],
      segments: [
        { label: "🚐 包车/步行约8分钟", dashed: false },
        { label: "🚐 送机约40分钟 / 🚇 6换10号线", dashed: false }
      ]
    }
  }
];

const RESERVATION_GROUPS = [
  {
    id: "advance-3",
    title: "提前 3 天预约",
    badgeText: "最先安排",
    badgeClass: "timing-3d",
    items: [
      {
        id: "huguang",
        name: "湖广会馆（Day 2 · 12月1日游玩）",
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
        name: "三峡博物馆（Day 5 · 12月4日游玩）",
        account: "重庆中国三峡博物馆",
        detail: "免费 · 09:00–17:00（16:30停止入馆）",
        visitDayIndex: 5,
        advanceDays: 1
      },
      {
        id: "dalitang",
        name: "人民大礼堂（Day 5 · 12月4日游玩）",
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
        name: "长江索道（Day 2 · 12月1日游玩）",
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
  {
    category: "mild",
    badge: "🌿 不辣 · 温和家常",
    name: "三条凳饭店",
    area: "解放碑磨坊巷",
    mapQuery: "三条凳饭店 解放碑",
    dishes: "招牌软烂蹄花汤、红烧肘子。居民楼下的地道老店，软糯暖胃不辣。"
  },
  {
    category: "mild",
    badge: "🌿 不辣 · 传统川菜",
    name: "尘香传统川菜馆",
    area: "解放碑（14年老店）",
    mapQuery: "尘香传统川菜馆 解放碑",
    dishes: "鸡豆花、宫保虾球、鱼香肉丝、手工汤圆。清淡与经典川味兼具。"
  },
  {
    category: "mild",
    badge: "🌿 清爽 · 不辣面食",
    name: "王胖娃面",
    area: "市区 / 观音桥可安排",
    mapQuery: "王胖娃面",
    dishes: "现炒番茄杂酱面、莲藕抄手。酸甜鲜香、清爽不辣，长辈吃着很舒服。"
  },
  {
    category: "mild",
    badge: "🌿 汤鲜 · 温润软嫩",
    name: "海关荤豆花",
    area: "南岸 / 市区",
    mapQuery: "海关荤豆花",
    dishes: "三鲜小锅约30元，含猪肝、瘦肉、豆芽、番茄、鹌鹑蛋等，豆腐嫩滑、汤鲜温润。"
  },
  {
    category: "mild",
    badge: "🌿 早餐 / 夜宵暖胃",
    name: "鬼包子",
    area: "市区老字号",
    mapQuery: "鬼包子",
    dishes: "酱肉包配热小米粥，热乎暄软，特别适合长辈当早餐或夜宵。"
  },
  {
    category: "mild",
    badge: "🌿 香甜 · 手工早餐",
    name: "范孃孃糯米团",
    area: "市区特色早点",
    mapQuery: "范孃孃糯米团",
    dishes: "手工糯米裹黄豆粉白糖，夹酥脆油条，甜香软糯有嚼劲。"
  },
  {
    category: "spicy",
    badge: "🌶️ 地道老火锅",
    name: "德福火锅（七星岗店）",
    area: "七星岗（二十多年居民楼老店）",
    mapQuery: "德福火锅 七星岗店",
    dishes: "锅底免费！耙鸡脚、耙牛肉软烂入味适合长辈，记得点鸳鸯锅。"
  },
  {
    category: "spicy",
    badge: "🌶️ 地道老火锅",
    name: "黄家码头老火锅 / 唐红英火锅 / 利火锅",
    area: "临江门 / 七星岗等",
    mapQuery: "唐红英火锅 临江门",
    dishes: "本地人常去的老火锅备选：黄家码头老火锅、唐红英火锅（临江门）、利火锅（七星岗）。"
  },
  {
    category: "spicy",
    badge: "🌶️ 火锅 + 冰稀饭解辣",
    name: "王胖娃火锅",
    area: "市区老火锅",
    mapQuery: "王胖娃火锅",
    dishes: "地道重庆老火锅，店里有冰稀饭解辣，吃辣后喝一碗很舒服。"
  },
  {
    category: "spicy",
    badge: "🍧 冰爽解辣小吃",
    name: "眼镜凉虾凉糕 & 李凉虾",
    area: "街头老牌小吃",
    mapQuery: "眼镜凉虾凉糕",
    dishes: "眼镜凉虾凉糕（17:30后出摊）、李凉虾，红糖冰爽细腻，吃火锅绝佳解辣搭档。"
  },
  {
    category: "spicy",
    badge: "🍢 现炸与老式糕点",
    name: "肖炮现炸酥肉 & 熨斗糕",
    area: "街边人气小吃",
    mapQuery: "肖炮现炸酥肉",
    dishes: "现炸酥肉外酥里嫩，老式熨斗糕米香浓郁、外脆内软，适合全家分着尝鲜。"
  },
  {
    category: "spicy",
    badge: "🥛 清甜解辣甜品",
    name: "李若桃（白糯米 + 手作酸奶）",
    area: "人气饮品甜品",
    mapQuery: "李若桃",
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
    title: "出行安全、地铁换乘、采买与机场提醒",
    defaultOpen: false,
    bullets: [
      "<strong>穿对鞋子：</strong>山城坡道台阶多，全员务必穿舒适防滑的<strong>平底鞋或运动鞋</strong>；切勿尝试共享电动车。",
      "<strong>晚高峰换乘地铁：</strong>若市区包车遇晚高峰拥堵，可灵活换乘地铁，打开支付宝/微信搜索 <button type=\"button\" class=\"inline-copy-chip\" data-copy=\"重庆轨道交通乘车码\">「重庆轨道交通乘车码」<span class=\"chip-copy-tag\">复制</span></button> 扫码进站。",
      "<strong>伴手礼去哪买：</strong>特产切勿在景区或特产店购买，直接让包车司机载去<strong>大型超市或本地菜市场</strong>，平价且正宗。",
      "<strong>航站楼确认：</strong>我们往返重庆均在<strong>江北国际机场 T3 航站楼</strong>（12月6日 HU7172 11:05 起飞），切勿跑错到 T2 航站楼。"
    ]
  }
];

/* ==========================================================================
   状态与工具函数
   ========================================================================== */
let currentDay = 1;
let currentFoodFilter = "all";
let activeDayMap = null;
const DEFAULT_ARRIVAL_DATE = "2026-11-30";
const STORAGE_KEY_CHECKS = "cq2026_reservation_checks_v1";
const STORAGE_KEY_DATE = "cq2026_departure_date_v2";
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
    // ignore
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
   渲染每日底部高德实景路线图（小红书风标号站点 + 黄色交通耗时标签）
   ========================================================================== */
function renderDayRouteMap(dayData) {
  if (activeDayMap) {
    activeDayMap.remove();
    activeDayMap = null;
  }

  const mapEl = document.getElementById("dayRouteMap");
  if (!mapEl || !dayData.mapRoute || typeof L === "undefined") return;

  const { color, stops, segments } = dayData.mapRoute;
  const gcjPoints = stops.map((s) => wgs84ToGcj02(s.lat, s.lng));

  const map = L.map(mapEl, {
    scrollWheelZoom: false,
    zoomControl: true
  });
  activeDayMap = map;

  // 高德地图中文矢量底图（清晰展示重庆两江、路网与轨道交通站点）
  const amapTile = L.tileLayer(
    "https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=2&style=8&x={x}&y={y}&z={z}",
    {
      subdomains: ["1", "2", "3", "4"],
      maxZoom: 18,
      minZoom: 7,
      attribution: "地图底图 © 高德地图"
    }
  );

  let fallbackAdded = false;
  amapTile.on("tileerror", () => {
    if (!fallbackAdded) {
      fallbackAdded = true;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap"
      }).addTo(map);
    }
  });
  amapTile.addTo(map);

  // 分段绘制路线折线 & 路段中点黄色耗时标签
  for (let i = 0; i < gcjPoints.length - 1; i += 1) {
    const p1 = gcjPoints[i];
    const p2 = gcjPoints[i + 1];
    const seg = (segments && segments[i]) || { label: "", dashed: false };

    // 白色外描边增强在底图上的清晰度
    L.polyline([p1, p2], {
      color: "#ffffff",
      weight: 9,
      opacity: 0.9,
      lineCap: "round"
    }).addTo(map);

    L.polyline([p1, p2], {
      color,
      weight: 5,
      opacity: 0.95,
      dashArray: seg.dashed ? "10 8" : null,
      lineCap: "round"
    }).addTo(map);

    if (seg.label) {
      const midLat = (p1[0] + p2[0]) / 2;
      const midLng = (p1[1] + p2[1]) / 2;
      const segIcon = L.divIcon({
        className: "map-seg-icon-wrap",
        html: `<div class="map-seg-badge">${seg.label}</div>`,
        iconSize: [0, 0]
      });
      L.marker([midLat, midLng], { icon: segIcon, interactive: false, zIndexOffset: 200 }).addTo(map);
    }
  }

  // 绘制带编号的彩色站点标签
  const markers = [];
  stops.forEach((stop, idx) => {
    const pos = gcjPoints[idx];
    const stopIcon = L.divIcon({
      className: "map-stop-icon-wrap",
      html: `<div class="map-stop-pill" style="background:${color};"><span class="map-stop-num" style="color:${color};">${idx + 1}</span><span>${stop.name}</span></div>`,
      iconSize: [0, 0]
    });

    const popupHtml = `
      <div class="map-popup-title">${idx + 1}. ${stop.name}</div>
      <p class="map-popup-note">${stop.note}</p>
      ${stop.metro ? `<div class="map-popup-metro">🚇 ${stop.metro}</div>` : ""}
      <a class="map-popup-link" href="${buildAmapUrl(stop.query || stop.name)}" target="_blank" rel="noopener noreferrer">🗺️ 在高德地图打开</a>
    `;

    const marker = L.marker(pos, { icon: stopIcon, zIndexOffset: 500 + idx })
      .addTo(map)
      .bindPopup(popupHtml);
    markers.push({ marker, pos });
  });

  const bounds = L.latLngBounds(gcjPoints);
  const fitAll = () => {
    map.fitBounds(bounds, { padding: [52, 52], maxZoom: 15 });
  };
  fitAll();

  // 恢复全景视野按钮
  const resetBtn = document.getElementById("resetMapBoundsBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      map.closePopup();
      fitAll();
    });
  }

  // 点击下方图例快速定位到对应站点
  document.querySelectorAll(".map-legend-stop").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.stopIdx);
      const item = markers[idx];
      if (!item) return;
      map.flyTo(item.pos, Math.max(map.getZoom(), 14), { duration: 0.6 });
      item.marker.openPopup();
    });
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
        <div class="driver-btn-group">
          <a
            class="amap-btn"
            href="${buildAmapUrl(pin.mapQuery || pin.pin)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            🗺️ 高德地图
          </a>
          <button
            type="button"
            class="copy-btn"
            id="copyPin-${data.day}-${idx}"
            data-copy="${pin.pin}"
            data-label="📋 复制定位"
          >
            📋 复制定位
          </button>
        </div>
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
      const metroHtml = step.metro
        ? `
          <div class="metro-box">
            <div class="metro-box-title">🚇 ${step.metro.title}</div>
            <p class="metro-box-detail">${step.metro.detail}</p>
          </div>
        `
        : "";
      const tipHtml = step.tip ? `<div class="timeline-tip">💡 ${step.tip}</div>` : "";
      return `
        <article class="timeline-card ${step.isNature ? "is-nature" : ""}">
          <div class="timeline-top">
            <span class="timeline-time">${step.time}</span>
            <div class="timeline-tags">${tagsHtml}</div>
          </div>
          <h4 class="timeline-title">${step.title}</h4>
          <p class="timeline-desc">${step.desc}</p>
          ${metroHtml}
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

  const mapRoute = data.mapRoute;
  const legendHtml = mapRoute
    ? mapRoute.stops
        .map((stop, idx) => {
          const seg = mapRoute.segments && mapRoute.segments[idx];
          const segHtml = seg ? `<div class="legend-seg-arrow">↓ ${seg.label}</div>` : "";
          return `
            <div class="map-legend-row">
              <button type="button" class="map-legend-stop" data-stop-idx="${idx}">
                <div class="legend-stop-main">
                  <span class="legend-num" style="background:${mapRoute.color};">${idx + 1}</span>
                  <div>
                    <span class="legend-name">${stop.name}</span>
                    <span class="legend-sub">${stop.metro ? `🚇 ${stop.metro} · ` : ""}${stop.note}</span>
                  </div>
                </div>
                <span class="amap-btn amap-btn-sm">定位查看</span>
              </button>
              ${segHtml}
            </div>
          `;
        })
        .join("")
    : "";

  const mapSectionHtml = mapRoute
    ? `
      <section class="day-map-section" aria-label="本日路线地图">
        <div class="day-map-head">
          <h4 class="day-map-title">🗺️ Day ${data.day} 实景路线图（高德底图）</h4>
          <div class="day-map-tools">
            <button type="button" class="map-reset-btn" id="resetMapBoundsBtn">🔄 恢复全景视野</button>
          </div>
        </div>
        <div id="dayRouteMap" class="day-map-canvas" role="region" aria-label="${mapRoute.subtitle}"></div>
        <div class="map-legend">
          <p class="map-legend-hint">👆 点击下方任意站点，地图将自动居中放大并显示详情与高德导航入口：</p>
          <div class="map-legend-list">${legendHtml}</div>
        </div>
      </section>
    `
    : "";

  panel.innerHTML = `
    <div class="day-header">
      <span class="day-badge">第 ${data.day} 天 · ${data.dateLabel}</span>
      <h3 class="day-title">${data.title}</h3>
      <div class="route-trail" aria-label="当日路线">${routeHtml}</div>
    </div>

    <div class="driver-box" aria-label="司机精准导航定位">
      <div class="driver-box-header">
        <h4 class="driver-box-title"><span aria-hidden="true">🚐</span> 司机精准导航定位（高德地图 / 一键复制）</h4>
        <button type="button" class="copy-all-btn" data-copy-all="${allPinsSummary}">
          一键复制本日全部定位
        </button>
      </div>
      <div class="driver-list">${driverHtml}</div>
    </div>

    <h4 class="sub-heading"><span aria-hidden="true">🕒</span> 时间线、地铁站指引与景点亮点</h4>
    <div class="timeline">${timelineHtml}</div>

    <div class="day-dining">
      <h4 class="sub-heading"><span aria-hidden="true">🍲</span> 本日餐饮推荐</h4>
      <div class="dining-list">${diningHtml}</div>
    </div>

    ${mapSectionHtml}
  `;

  panel.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => copyText(btn.dataset.copy, btn));
  });

  const copyAllBtn = panel.querySelector(".copy-all-btn");
  if (copyAllBtn) {
    copyAllBtn.addEventListener("click", () => copyText(copyAllBtn.dataset.copyAll));
  }

  const prevBtn = document.getElementById("prevDayBtn");
  const nextBtn = document.getElementById("nextDayBtn");
  const indicator = document.getElementById("pagerIndicator");
  prevBtn.disabled = currentDay === 1;
  nextBtn.disabled = currentDay === ITINERARY_DAYS.length;
  indicator.textContent = `第 ${currentDay} / ${ITINERARY_DAYS.length} 天`;

  // 初始化本日高德实景路线图
  renderDayRouteMap(data);
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
  const resetBtn = document.getElementById("clearDateBtn");
  const saved = localStorage.getItem(STORAGE_KEY_DATE) || DEFAULT_ARRIVAL_DATE;
  input.value = saved;
  resetBtn.hidden = input.value === DEFAULT_ARRIVAL_DATE;

  input.addEventListener("change", () => {
    try {
      localStorage.setItem(STORAGE_KEY_DATE, input.value);
    } catch {
      // ignore
    }
    resetBtn.hidden = input.value === DEFAULT_ARRIVAL_DATE;
    renderReservations();
  });

  resetBtn.addEventListener("click", () => {
    input.value = DEFAULT_ARRIVAL_DATE;
    resetBtn.hidden = true;
    try {
      localStorage.setItem(STORAGE_KEY_DATE, DEFAULT_ARRIVAL_DATE);
    } catch {
      // ignore
    }
    renderReservations();
  });
}

/* ==========================================================================
   渲染长辈友好美食指南（带高德地图链接）
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
          <div class="food-card-footer">
            <a
              class="amap-btn amap-btn-sm"
              href="${buildAmapUrl(item.mapQuery || item.name)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              🗺️ 高德地图搜店
            </a>
          </div>
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

  container.querySelectorAll(".inline-copy-chip").forEach((chip) => {
    chip.addEventListener("click", () => copyText(chip.dataset.copy));
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

  // 航班与住宿区复制按钮
  document.querySelectorAll("#flights [data-copy], #stay [data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => copyText(btn.dataset.copy, btn));
  });

  initDepartureDate();
  renderReservations();
  initFoodFilters();
  renderFoodGuide();
  renderTipsAccordion();
});
