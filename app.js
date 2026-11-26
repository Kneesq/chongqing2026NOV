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
    day: 0,
    dayTag: "出发日",
    dateLabel: "11月29日（周日）",
    shortTitle: "海口转机住宿",
    title: "出发日｜槟城飞海口 · 美兰机场 T2 转机",
    route: ["20:45 槟城机场 HU478 起飞", "次日 00:10 抵达海口美兰 T2", "行李直挂无需提取", "前往中转住宿柜台休息"],
    driverPins: [
      {
        spot: "去程出发机场",
        pin: "槟城国际机场 (PEN)",
        mapQuery: "槟城国际机场",
        reason: "海南航空 HU478 于 20:45 起飞，建议提前 2.5–3 小时抵达办理值机与行李直挂重庆。"
      },
      {
        spot: "海口中转机场",
        pin: "海口美兰国际机场T2航站楼",
        mapQuery: "海口美兰国际机场T2航站楼",
        reason: "次日 00:10 抵达 T2 航站楼，中转 11 小时 50 分，次日 12:00 搭 HU7271 飞重庆。"
      }
    ],
    timeline: [
      {
        time: "20:45 起飞",
        title: "槟城国际机场 (PEN) ➔ 海口美兰国际机场 T2 (HAK)",
        desc: "搭乘海南航空 HU478（波音 737 MAX 8，飞行 3h 25m）。值机时确认联程行李直挂重庆，海口中转无需提取及重新托运。",
        tags: [
          { text: "海南航空 HU478", type: "book" },
          { text: "行李直挂重庆", type: "free" }
        ]
      },
      {
        time: "次日 00:10 抵达",
        title: "海口美兰机场 T2 · 寻找中转住宿柜台路线",
        desc: "抵达海口美兰机场 T2 后，按机场中转指引前往中转住宿柜台办理休息住宿，好好睡一觉准备次日中午 12:00 搭乘 HU7271 飞往重庆。",
        tags: [
          { text: "中转 11小时50分", type: "ticket" },
          { text: "待上传路线截图", type: "book" }
        ],
        tip: "📌 预留位置：上传海口机场寻找中转住宿柜台的截图后，这里将更新完整图文路线指引！"
      }
    ],
    dining: {
      breakfast: [
        { name: "槟城家中 / 附近早餐", detail: "出发日白天在家轻松收拾行李、检查护照与充电宝。" }
      ],
      lunch: [
        { name: "槟城本地午餐", detail: "出发前吃顿舒服清淡的午餐，晚上搭红眼航班更轻松。" }
      ],
      dinner: [
        { name: "槟城机场候机简餐 & HU478 机餐", detail: "20:45 起飞前可在机场垫肚子，抵达海口后也可在航站楼便利店买热饮宵夜。" }
      ]
    },
    mapRoute: {
      color: "#0b7285",
      subtitle: "海口美兰国际机场 T2 航站楼中转",
      stops: [
        { name: "海口美兰国际机场 T2", lat: 19.9349, lng: 110.4590, note: "次日 00:10 抵达 T2，行李直挂重庆，前往中转住宿柜台休息", metro: "次日 12:00 T2 搭 HU7271 飞重庆", query: "海口美兰国际机场T2航站楼" }
      ],
      segments: []
    }
  },
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
    dining: {
      breakfast: [
        { name: "海口美兰机场 T2 候机简餐", detail: "11月30日中午 12:00 起飞前在 T2 航站楼轻松吃碗热汤粉或海南粉垫肚子。" }
      ],
      lunch: [
        { name: "航班机餐 / 抵达后轻食", detail: "14:15 抵达重庆江北机场 T3，放好行李后可在八一好吃街尝少量小吃垫胃。" }
      ],
      dinner: [
        { name: "尘香传统川菜馆（解放碑14年老店）", mapQuery: "尘香传统川菜馆 解放碑", detail: "长辈友好温和川菜：推荐鸡豆花、宫保虾球、鱼香肉丝、手工汤圆。" },
        { name: "三条凳饭店（磨坊巷居民楼下）", mapQuery: "三条凳饭店 解放碑", detail: "暖胃家常菜：招牌软烂蹄花汤、红烧肘子，口感软糯不辣。" }
      ]
    },
    mapRoute: {
      color: "#1d68c4",
      subtitle: "住宿出发 ➔ 小什字站 ➔ 1号线至较场口(解放碑) ➔ 白象居 ➔ 洪崖洞 ➔ 6号线过江至大剧院江滩公园",
      stops: [
        { name: "湖广·富山美宿", lat: 29.5612, lng: 106.5838, note: "从住宿出发，步行约 5 分钟到小什字地铁站", metro: "步行约 290 米至小什字站", query: "湖广·富山江景美宿(重庆解放碑店)" },
        { name: "小什字站（1号线）", isMetro: true, lat: 29.5603, lng: 106.5825, note: "进站乘 1 号线（坐 1 站）前往较场口站", metro: "1号线 上车站", query: "小什字地铁站" },
        { name: "较场口站 · 解放碑", isMetro: true, lat: 29.5574, lng: 106.5770, note: "1号线出站即达解放碑纪念碑 & 八一好吃街", metro: "1号线 下车站", query: "重庆八一广场" },
        { name: "白象居3号楼", lat: 29.5565, lng: 106.5831, note: "长江索道穿楼经典机位，直达免爬长台阶", metro: "近 1/6号线 小什字站", query: "白象居3号楼" },
        { name: "洪崖洞（嘉滨路）", lat: 29.5632, lng: 106.5790, note: "19:30–23:00 亮灯，嘉滨路马路下层看全貌", metro: "看完步行回小什字站乘6号线过江", query: "嘉滨路洪崖洞公交站" },
        { name: "小什字站（6号线）", isMetro: true, lat: 29.5603, lng: 106.5825, note: "晚高峰乘 6 号线（坐 1 站）3 分钟过江避开堵车", metro: "6号线 上车站", query: "小什字地铁站" },
        { name: "大剧院站 · 江滩公园", isMetro: true, lat: 29.5686, lng: 106.5804, note: "6号线大剧院站 2/3 号口出，隔江拍洪崖洞全景", metro: "6号线 下车站（看完坐1站回小什字）", query: "重庆大剧院江滩公园" }
      ],
      segments: [
        { mode: "walk" },
        { mode: "metro", lineColor: "#d92626" },
        { mode: "car" },
        { mode: "car" },
        { mode: "walk" },
        { mode: "metro", lineColor: "#d63d86" }
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
    dining: {
      breakfast: [
        { name: "鬼包子 / 范孃孃糯米团（解放碑片区）", mapQuery: "鬼包子", detail: "酱肉包配热小米粥，或手工糯米裹黄豆粉白糖夹油条，暖胃好消化。" }
      ],
      lunch: [
        { name: "海关荤豆花（南岸 / 市区）", mapQuery: "海关荤豆花", detail: "三鲜小锅约30元，含猪肝、瘦肉、豆芽、番茄、鹌鹑蛋等，汤鲜温润，长辈很爱吃。" },
        { name: "下浩里 / 龙门浩江景茶馆", mapQuery: "下浩里老街", detail: "逛老街累了随时进江景茶馆喝杯热茶歇脚吃点心。" }
      ],
      dinner: [
        { name: "南大人烤肉（南滨路一线江景）", mapQuery: "南大人烤肉 南滨路", detail: "营业时间 16:00–24:00，边吃烤肉边赏南滨路一线夜景。" },
        { name: "弹子石老街江湖菜 / 清汤鱼", mapQuery: "弹子石老街", detail: "老街内有多家川菜与清汤鱼馆，可按长辈口味点不辣或微辣。" }
      ]
    },
    mapRoute: {
      color: "#d95f24",
      subtitle: "住宿出发 ➔ 湖广会馆 ➔ 长江索道过江 ➔ 下浩里/龙门浩 ➔ 上新街站(环线) ➔ 弹子石老街",
      stops: [
        { name: "湖广·富山美宿", lat: 29.5612, lng: 106.5838, note: "从住宿出发，步行约 5 分钟即达湖广会馆东门", metro: "步行出发", query: "湖广·富山江景美宿(重庆解放碑店)" },
        { name: "湖广会馆东门", lat: 29.5608, lng: 106.5844, note: "清代明黄古建群，齐安公所喝茶看戏", metro: "逛完步行至小什字/索道北站", query: "湖广会馆东门" },
        { name: "长江索道北站", lat: 29.5596, lng: 106.5841, note: "近小什字 5B 口，乘空中索道跨长江（或包车去南站反向坐）", metro: "索道出发站", query: "长江索道北站" },
        { name: "长江索道南站", lat: 29.5554, lng: 106.5889, note: "抵达南岸，步行进入下浩里与龙门浩老街", metro: "近 6号线/环线 上新街站", query: "长江索道南站" },
        { name: "下浩里 / 龙门浩", lat: 29.5589, lng: 106.5936, note: "上新街1号口由上往下逛，多部直梯扶梯不废腿", metro: "紧邻上新街地铁站", query: "上新街地铁站1号口" },
        { name: "上新街站（环线）", isMetro: true, lat: 29.5579, lng: 106.5944, note: "进站乘 环线（坐 2 站）前往弹子石站", metro: "环线 上车站", query: "上新街地铁站" },
        { name: "弹子石站 · 弹子石老街", isMetro: true, lat: 29.5798, lng: 106.5924, note: "观景台赏两江交汇璀璨夜景（返程可乘6号线回小什字）", metro: "环线 下车站", query: "弹子石广场观景台" }
      ],
      segments: [
        { mode: "walk" },
        { mode: "walk" },
        { mode: "cable", lineColor: "#d95f24" },
        { mode: "walk" },
        { mode: "walk" },
        { mode: "metro", lineColor: "#c98600" }
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
    dining: {
      breakfast: [
        { name: "民宿附近早点打包上车", mapQuery: "小什字早餐", detail: "早起出发前买热包子、豆浆、鸡蛋，包车路上吃更轻松。" }
      ],
      lunch: [
        { name: "龚滩古镇 · 乌江鱼地方风味馆", mapQuery: "龚滩古镇乌江鱼", detail: "推荐品尝鲜嫩的乌江鱼、土家老腊肉与青菜豆腐汤（可嘱咐清汤或少辣）。" }
      ],
      dinner: [
        { name: "武隆仙女山镇 · 热汤羊肉 / 土家菜", mapQuery: "武隆仙女山镇", detail: "抵达仙女山镇后吃顿热乎乎的羊肉汤锅或清炒时蔬，暖身解乏。" }
      ]
    },
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
        { mode: "car" },
        { mode: "car" },
        { mode: "ferry", lineColor: "#1f8a5b" },
        { mode: "car" }
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
    dining: {
      breakfast: [
        { name: "仙女山镇酒店 / 镇上热粥面条", mapQuery: "武隆仙女山镇", detail: "进景区前吃饱热乎早餐，山区微凉多喝热水。" }
      ],
      lunch: [
        { name: "仙女山镇 · 武隆碗碗羊肉", mapQuery: "武隆碗碗羊肉 仙女山镇", detail: "热乎鲜香的本地招牌羊肉，暖胃又补体力，非常适合山区微凉天气。" }
      ],
      dinner: [
        { name: "德福火锅（七星岗店）", mapQuery: "德福火锅七星岗店", detail: "二十多年居民楼老店，锅底免费！耙鸡脚、耙牛肉软烂入味很适合长辈，记得点鸳鸯锅。" }
      ]
    },
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
        { mode: "car" },
        { mode: "car" },
        { mode: "car" },
        { mode: "metro", lineColor: "#d92626" }
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
    dining: {
      breakfast: [
        { name: "重庆素小面 / 豌杂面（民宿周边）", mapQuery: "小什字小面", detail: "素小面约 7–10 元，可嘱咐微辣或不辣，开启活力一天。" }
      ],
      lunch: [
        { name: "李子坝梁山鸡（公园二鸡哥店）", mapQuery: "李子坝梁山鸡", detail: "看完轻轨穿楼步行可达！药膳江湖菜，芋儿一抿就化，可点微辣。" }
      ],
      dinner: [
        { name: "王胖娃面（现炒番茄杂酱面 / 莲藕抄手）", mapQuery: "王胖娃面", detail: "酸甜鲜香、清爽不辣，长辈吃着很舒服。" },
        { name: "观音桥美食街 & 李若桃酸奶", mapQuery: "观音桥好吃街", detail: "逛商圈顺便尝鲜小吃，配一杯白糯米手作酸奶清爽解腻。" }
      ]
    },
    mapRoute: {
      color: "#c75a16",
      subtitle: "住宿出发 ➔ 小什字站(1号线) ➔ 鹅岭站 ➔ 李子坝站(2号线) ➔ 曾家岩站/三峡博物馆 ➔ 观音桥",
      stops: [
        { name: "湖广·富山美宿", lat: 29.5612, lng: 106.5838, note: "从住宿出发，步行约 5 分钟到小什字地铁站", metro: "步行至小什字站", query: "湖广·富山江景美宿(重庆解放碑店)" },
        { name: "小什字站（1号线）", isMetro: true, lat: 29.5603, lng: 106.5825, note: "乘 1 号线（坐 5 站）前往鹅岭站", metro: "1号线 上车站", query: "小什字地铁站" },
        { name: "鹅岭站 · 鹅岭公园", isMetro: true, lat: 29.5512, lng: 106.5356, note: "1号/2A口出登瞰胜楼俯瞰两江全景", metro: "1号线 下车站", query: "鹅岭公园" },
        { name: "李子坝站（2号线）", isMetro: true, lat: 29.5550, lng: 106.5387, note: "拍轻轨穿楼后直接进站乘 2 号线江景单轨（坐 2 站）", metro: "2号线 上车站", query: "李子坝观景台" },
        { name: "曾家岩站 · 三峡博物馆", isMetro: true, lat: 29.5619, lng: 106.5503, note: "A口出步行游三峡博物馆与对面人民大礼堂", metro: "2号线 下车站 / 近10号线大礼堂站", query: "重庆中国三峡博物馆" },
        { name: "观音桥站 · 久悠茶坊", isMetro: true, lat: 29.5754, lng: 106.5326, note: "10号线换9号线至观音桥（或包车直达），一路下坡逛北仓塔坪", metro: "3/9号线 观音桥站", query: "久悠茶坊" }
      ],
      segments: [
        { mode: "walk" },
        { mode: "metro", lineColor: "#d92626" },
        { mode: "walk" },
        { mode: "metro", lineColor: "#0f7b3e" },
        { mode: "metro", lineColor: "#6531a8" }
      ]
    }
  },
  {
    day: 6,
    dateLabel: "12月5日（周六）",
    shortTitle: "采买伴手礼休整",
    title: "Day 6｜悠闲采买伴手礼与自由逛街",
    route: ["自然醒休整", "大型超市 / 菜市场采买伴手礼", "解放碑周边漫步", "整理打包行李"],
    driverPins: [
      {
        spot: "伴手礼采买",
        pin: "大型超市 / 本地菜市场",
        mapQuery: "解放碑大型超市",
        reason: "切勿在景区或特产店购买，大型超市或菜市场平价且正宗。"
      },
      {
        spot: "民宿休息",
        pin: "湖广·富山江景美宿(重庆解放碑店)",
        mapQuery: "湖广·富山江景美宿(重庆解放碑店)",
        reason: "采买完回民宿整理行李，晚上早点休息迎接次日返程。"
      }
    ],
    timeline: [
      {
        time: "上午",
        title: "自然醒休整 & 解放碑附近悠闲吃早餐",
        desc: "前几天逛了山城夜景与武隆山水，今天安排轻松慢节奏，睡到自然醒，慢慢品尝重庆地道早点。",
        tags: [{ text: "轻松慢游", type: "free" }]
      },
      {
        time: "下午",
        title: "大型超市 / 本地菜市场采买伴手礼",
        desc: "火锅底料、怪味胡豆、江津米花糖、陈麻花等重庆特产，直接在正规大超市或本地菜市场选购，明码标价又正宗。",
        tags: [{ text: "避开景区高价特产店", type: "free" }],
        tip: "打包提示：液体或牛油火锅底料记得放入托运行李箱，切勿随身携带过安检。"
      },
      {
        time: "晚上",
        title: "告别山城晚餐 & 收拾行李早休息",
        desc: "回民宿前吃一顿全家都爱吃的重庆晚餐，整理好所有证件、充电宝（随身带）与托运行李。",
        tags: [{ text: "次日 08:00 出发机场", type: "book" }]
      }
    ],
    dining: {
      breakfast: [
        { name: "鬼包子 / 范孃孃糯米团", mapQuery: "鬼包子", detail: "自然醒后吃个酱肉包配热小米粥，或手工糯米团，暖心满足。" }
      ],
      lunch: [
        { name: "三条凳饭店 / 解放碑家常菜", mapQuery: "三条凳饭店 解放碑", detail: "采买特产前吃顿软烂蹄花汤与家常炒菜，轻松舒服。" }
      ],
      dinner: [
        { name: "尘香传统川菜馆 / 告别老火锅", mapQuery: "尘香传统川菜馆 解放碑", detail: "返程前一晚在解放碑老店聚餐，吃顿大家都爱吃的告别晚餐。" }
      ]
    },
    mapRoute: {
      color: "#1c7ed6",
      subtitle: "住宿出发 ➔ 小什字站(1号线) ➔ 较场口站/大型超市 ➔ 八一好吃街",
      stops: [
        { name: "湖广·富山美宿", lat: 29.5612, lng: 106.5838, note: "自然醒从住宿出发，步行约 5 分钟到小什字站", metro: "步行至小什字站", query: "湖广·富山江景美宿(重庆解放碑店)" },
        { name: "小什字站（1号线）", isMetro: true, lat: 29.5603, lng: 106.5825, note: "乘 1 号线坐 1 站至较场口站（或步行约12分钟）", metro: "1号线 上车站", query: "小什字地铁站" },
        { name: "较场口站 · 解放碑大超市", isMetro: true, lat: 29.5582, lng: 106.5762, note: "平价采买火锅底料、怪味胡豆、陈麻花等特产", metro: "1号线 下车站", query: "解放碑大型超市" },
        { name: "解放碑八一好吃街", lat: 29.5574, lng: 106.5770, note: "自由补打卡小吃或甜品，轻松逛回民宿打包", metro: "步行返回", query: "重庆八一广场" }
      ],
      segments: [
        { mode: "walk" },
        { mode: "metro", lineColor: "#d92626" },
        { mode: "walk" }
      ]
    }
  },
  {
    day: 7,
    dateLabel: "12月6日（周日）",
    shortTitle: "返程送机回槟城",
    title: "Day 7｜退房送机与平安返程回槟城",
    route: ["08:00 民宿退房出发", "重庆江北机场 T3 值机", "11:05 HU7172 飞海口", "16:30 HU477 返回槟城"],
    driverPins: [
      {
        spot: "返程送机（12月6日）",
        pin: "重庆江北国际机场T3航站楼",
        mapQuery: "重庆江北国际机场T3航站楼",
        reason: "海南航空 HU7172 于 11:05 从 T3 航站楼起飞，建议 08:00 出发，留足值机与安检时间。"
      }
    ],
    timeline: [
      {
        time: "08:00 出发",
        title: "民宿退房 ➔ 包车前往重庆江北国际机场 T3 航站楼",
        desc: "检查房间不遗漏护照、充电器、眼镜等物品，乘包车直达江北机场 T3 航站楼办理托运与值机。",
        tags: [
          { text: "T3 航站楼出发", type: "book" },
          { text: "行李直挂槟城", type: "free" }
        ],
        metro: {
          title: "机场备选地铁（行李较多首选包车直达）",
          detail: "如需搭地铁：<span class=\"line-chip line-6\">6号线</span> <strong>小什字站</strong> ➔ <strong>红土地站</strong> 换乘 <span class=\"line-chip line-10\">10号线</span> ➔ <strong>江北机场T3航站楼站</strong>（全程约 45 分钟，注意 10 号线直达 T3，3 号线仅到 T2）。"
        },
        tip: "重要提醒：12月6日航班在江北机场 T3 航站楼起飞（非 T2），切勿跑错航站楼！"
      },
      {
        time: "11:05 – 19:40",
        title: "HU7172 飞海口（T2 中转 3h15m）➔ HU477 返回槟城",
        desc: "11:05 起飞，13:15 抵达海口美兰 T2（行李直挂无需提取）；16:30 转乘 HU477，19:40 平安抵达槟城国际机场。",
        tags: [{ text: "19:40 抵达槟城", type: "ticket" }]
      }
    ],
    dining: {
      breakfast: [
        { name: "民宿附近早点 / 江北机场 T3 热汤面", mapQuery: "重庆江北国际机场T3航站楼", detail: "08:00 出发前买热包子豆浆，或到 T3 候机厅吃碗热汤面。" }
      ],
      lunch: [
        { name: "海口美兰机场 T2 中转午餐", detail: "13:15 抵达海口 T2 中转 3 小时，可在航站楼内悠闲吃顿海南鸡饭或汤粉。" }
      ],
      dinner: [
        { name: "航班机餐 / 19:40 返抵槟城晚餐", detail: "平安回到槟城后再吃顿熟悉的本地宵夜或回家休息。" }
      ]
    },
    mapRoute: {
      color: "#2e7350",
      subtitle: "返程送机路线（湖广·富山美宿 ➔ 重庆江北国际机场 T3 航站楼）",
      stops: [
        { name: "湖广·富山美宿", lat: 29.5612, lng: 106.5838, note: "12月6日早上 08:00 退房包车出发", metro: "近 1/6号线 小什字站", query: "湖广·富山江景美宿(重庆解放碑店)" },
        { name: "江北国际机场 T3", lat: 29.7100, lng: 106.6513, note: "11:05 海南航空 HU7172 起飞经海口返回槟城", metro: "10号线 江北机场T3航站楼站", query: "重庆江北国际机场T3航站楼" }
      ],
      segments: [
        { mode: "car" }
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
let currentDay = 0;
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
   渲染每日底部高德实景路线图（清晰编号起点 1 → 2 → 3 + 沿真实马路/轨交连线）
   ========================================================================== */
const roadRouteCache = {};

async function fetchRoadSegmentGcj(stopA, stopB, profile = "driving") {
  const key = `${profile}:${stopA.lng},${stopA.lat}->${stopB.lng},${stopB.lat}`;
  if (roadRouteCache[key]) return roadRouteCache[key];

  try {
    const url = `https://router.project-osrm.org/route/v1/${profile}/${stopA.lng},${stopA.lat};${stopB.lng},${stopB.lat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    const coords = json && json.routes && json.routes[0] && json.routes[0].geometry && json.routes[0].geometry.coordinates;
    if (!Array.isArray(coords) || coords.length < 2) return null;
    const gcjLine = coords.map(([lng, lat]) => wgs84ToGcj02(lat, lng));
    roadRouteCache[key] = gcjLine;
    return gcjLine;
  } catch {
    return null;
  }
}

const STORAGE_KEY_HIDDEN_STOPS = "cq2026_hidden_stops_v1";

function loadHiddenStopsMap() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_HIDDEN_STOPS) || "{}");
  } catch {
    return {};
  }
}

function saveHiddenStopsMap(map) {
  try {
    localStorage.setItem(STORAGE_KEY_HIDDEN_STOPS, JSON.stringify(map));
  } catch {
    // ignore
  }
}

function getHiddenStopsForDay(dayNum) {
  const map = loadHiddenStopsMap();
  const arr = map[String(dayNum)];
  return Array.isArray(arr) ? arr : [];
}

function hideStopForDay(dayNum, stopIdx) {
  const map = loadHiddenStopsMap();
  const key = String(dayNum);
  const current = Array.isArray(map[key]) ? map[key] : [];
  if (!current.includes(stopIdx)) {
    current.push(stopIdx);
    map[key] = current;
    saveHiddenStopsMap(map);
  }
}

function restoreLastStopForDay(dayNum) {
  const map = loadHiddenStopsMap();
  const key = String(dayNum);
  const current = Array.isArray(map[key]) ? map[key] : [];
  if (current.length > 0) {
    current.pop();
    map[key] = current;
    saveHiddenStopsMap(map);
  }
}

function restoreAllStopsForDay(dayNum) {
  const map = loadHiddenStopsMap();
  delete map[String(dayNum)];
  saveHiddenStopsMap(map);
}

function buildTeardropPinSvg(num, fillColor) {
  return `
    <svg class="map-teardrop-svg" viewBox="0 0 36 46" width="34" height="44" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 44 C18 44 4 28.5 4 17.5 C4 9.5 10.3 3 18 3 C25.7 3 32 9.5 32 17.5 C32 28.5 18 44 18 44 Z" fill="${fillColor}" stroke="#ffffff" stroke-width="2.6" stroke-linejoin="round" />
      <text x="18" y="22.5" text-anchor="middle" fill="#ffffff" font-size="15.5" font-weight="900" font-family="Noto Sans SC, PingFang SC, sans-serif">${num}</text>
    </svg>
  `;
}

function renderDayRouteMap(dayData) {
  if (activeDayMap) {
    activeDayMap.remove();
    activeDayMap = null;
  }

  const mapEl = document.getElementById("dayRouteMap");
  if (!mapEl || !dayData.mapRoute || typeof L === "undefined") return;

  const { color, stops, segments } = dayData.mapRoute;
  const gcjPoints = stops.map((s) => wgs84ToGcj02(s.lat, s.lng));

  // 鼠标在地图内滚轮缩放，移出地图外恢复页面正常上下滑动
  const map = L.map(mapEl, {
    scrollWheelZoom: true,
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

  // 根据已隐藏的站点筛选显示路线与倒立水滴数字标点
  const hiddenSet = new Set(getHiddenStopsForDay(dayData.day));

  // 分段绘制路线：仅显示未完全隐藏的路段（或两头均未隐藏的路段）
  for (let i = 0; i < gcjPoints.length - 1; i += 1) {
    if (hiddenSet.has(i) || hiddenSet.has(i + 1)) continue;
    const p1 = gcjPoints[i];
    const p2 = gcjPoints[i + 1];
    const seg = (segments && segments[i]) || { mode: "car" };
    const mode = seg.mode || "car";
    const isTransit = mode === "metro" || mode === "cable" || mode === "ferry";
    const segColor = seg.lineColor || (mode === "walk" ? "#2e7350" : color);

    const outlineLine = L.polyline([p1, p2], {
      color: "#ffffff",
      weight: isTransit ? 9 : 8,
      opacity: 0.92,
      lineCap: "round",
      lineJoin: "round"
    }).addTo(map);

    const routeLine = L.polyline([p1, p2], {
      color: segColor,
      weight: isTransit ? 5 : 4.5,
      opacity: 0.95,
      dashArray: mode === "metro" ? "10 6" : isTransit ? "6 7" : null,
      lineCap: "round",
      lineJoin: "round"
    }).addTo(map);

    if (mode === "walk" || mode === "car") {
      const osrmProfile = mode === "walk" ? "foot" : "driving";
      fetchRoadSegmentGcj(stops[i], stops[i + 1], osrmProfile).then((roadCoords) => {
        if (activeDayMap !== map || !roadCoords) return;
        outlineLine.setLatLngs(roadCoords);
        routeLine.setLatLngs(roadCoords);
      });
    }
  }

  // 地图上只放倒立水滴形数字标点（1、2、3、4...），清爽不遮挡路网
  const markers = {};
  const visiblePoints = [];
  stops.forEach((stop, idx) => {
    if (hiddenSet.has(idx)) return;
    const pos = gcjPoints[idx];
    visiblePoints.push(pos);
    const isFirstVisible = visiblePoints.length === 1;
    const pinColor = isFirstVisible ? "#d24d33" : stop.isMetro ? "#1f6feb" : color;

    const stopIcon = L.divIcon({
      className: "map-teardrop-wrap",
      html: buildTeardropPinSvg(idx + 1, pinColor),
      iconSize: [34, 44],
      iconAnchor: [17, 43],
      popupAnchor: [0, -38]
    });

    const popupHtml = `
      <div class="map-popup-title">${idx + 1}. ${stop.name}</div>
      <p class="map-popup-note">${stop.note}</p>
      ${stop.metro ? `<div class="map-popup-metro">🚇 ${stop.metro}</div>` : ""}
      <a class="map-popup-link" href="${buildAmapUrl(stop.query || stop.name)}" target="_blank" rel="noopener noreferrer">🗺️ 在高德地图打开</a>
    `;

    const marker = L.marker(pos, { icon: stopIcon, zIndexOffset: isFirstVisible ? 700 : 500 + idx })
      .addTo(map)
      .bindPopup(popupHtml);
    markers[idx] = { marker, pos };
  });

  const fitTargets = visiblePoints.length ? visiblePoints : gcjPoints;
  const bounds = L.latLngBounds(fitTargets);
  const fitAll = () => {
    if (fitTargets.length === 1) {
      map.setView(fitTargets[0], 15);
    } else {
      map.fitBounds(bounds, { padding: [52, 52], maxZoom: 15 });
    }
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
      map.flyTo(item.pos, Math.max(map.getZoom(), 15), { duration: 0.6 });
      item.marker.openPopup();
    });
  });
}

/* ==========================================================================
   渲染每日行程 Tabs 与内容
   ========================================================================== */
const STORAGE_KEY_HIDDEN_DAYS = "cq2026_hidden_days_v1";

function getHiddenDays() {
  try {
    const arr = JSON.parse(localStorage.getItem(STORAGE_KEY_HIDDEN_DAYS) || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveHiddenDays(arr) {
  try {
    localStorage.setItem(STORAGE_KEY_HIDDEN_DAYS, JSON.stringify(arr));
  } catch {
    // ignore
  }
}

function getVisibleDays() {
  const hiddenSet = new Set(getHiddenDays());
  return ITINERARY_DAYS.filter((d) => !hiddenSet.has(d.day));
}

function ensureValidCurrentDay() {
  const visible = getVisibleDays();
  if (visible.length === 0) {
    currentDay = null;
    return null;
  }
  if (!visible.some((d) => d.day === currentDay)) {
    currentDay = visible[0].day;
  }
  return currentDay;
}

function hideDayAndAdvance(dayId) {
  const hidden = getHiddenDays();
  if (!hidden.includes(dayId)) {
    hidden.push(dayId);
    saveHiddenDays(hidden);
  }
  ensureValidCurrentDay();
  renderDayTabs();
  renderDayPanel();
}

function restoreLastHiddenDay() {
  const hidden = getHiddenDays();
  if (!hidden.length) return;
  const restoredDay = hidden.pop();
  saveHiddenDays(hidden);
  currentDay = restoredDay;
  renderDayTabs();
  renderDayPanel();
}

function restoreAllHiddenDays() {
  saveHiddenDays([]);
  currentDay = ITINERARY_DAYS[0].day;
  renderDayTabs();
  renderDayPanel();
}

function splitDateLabel(label) {
  const m = label.match(/^(.+?)（(.+?)）$/);
  if (m) return { date: m[1], week: m[2] };
  return { date: label, week: "" };
}

function renderDayTabs() {
  ensureValidCurrentDay();
  const hidden = getHiddenDays();
  const visible = getVisibleDays();

  const restoreBar = document.getElementById("dayRestoreBar");
  if (restoreBar) {
    if (hidden.length > 0) {
      restoreBar.hidden = false;
      restoreBar.innerHTML = `
        <span>✓ 已隐藏 ${hidden.length} 天已结束行程（刷新后保持记住）</span>
        <div class="map-restore-actions">
          <button type="button" class="map-restore-btn" id="restoreLastDayBtn">↺ 恢复上一天</button>
          <button type="button" class="map-restore-btn is-all" id="restoreAllDaysBtn">恢复全部天数</button>
        </div>
      `;
      const lastBtn = document.getElementById("restoreLastDayBtn");
      const allBtn = document.getElementById("restoreAllDaysBtn");
      if (lastBtn) {
        lastBtn.addEventListener("click", () => {
          restoreLastHiddenDay();
          showToast("已恢复上一天行程");
        });
      }
      if (allBtn) {
        allBtn.addEventListener("click", () => {
          restoreAllHiddenDays();
          showToast("已恢复全部行程日期");
        });
      }
    } else {
      restoreBar.hidden = true;
      restoreBar.innerHTML = "";
    }
  }

  const container = document.getElementById("dayTabs");
  container.innerHTML = visible
    .map((item) => {
      const active = item.day === currentDay;
      const { date, week } = splitDateLabel(item.dateLabel);
      const subTag = item.dayTag ? `${week} · ${item.dayTag}` : `${week} · Day ${item.day}`;
      return `
        <button
          type="button"
          role="tab"
          id="dayTab-${item.day}"
          aria-selected="${active ? "true" : "false"}"
          class="day-tab ${active ? "is-active" : ""}"
          data-day="${item.day}"
        >
          <span class="day-tab-date">${date}</span>
          <span class="day-tab-week">${subTag}</span>
          <span class="day-tab-short">${item.shortTitle}</span>
        </button>
      `;
    })
    .join("");

  container.querySelectorAll(".day-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectDay(Number(btn.dataset.day));
    });
  });
}

function renderDayPanel() {
  ensureValidCurrentDay();
  const panel = document.getElementById("dayPanel");
  const pager = document.getElementById("dayPager");
  const visibleDays = getVisibleDays();

  if (visibleDays.length === 0) {
    if (activeDayMap) {
      activeDayMap.remove();
      activeDayMap = null;
    }
    if (pager) pager.hidden = true;
    panel.innerHTML = `
      <div class="all-days-done-card">
        <h3>🎉 本次重庆临时之旅的全部行程都已完成并隐藏啦！</h3>
        <p>如果想回顾任何一天的安排，随时可以一键恢复。</p>
        <button type="button" class="copy-btn" id="restoreAllFromEmptyBtn">↺ 恢复全部行程日期</button>
      </div>
    `;
    const btn = document.getElementById("restoreAllFromEmptyBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        restoreAllHiddenDays();
        showToast("已恢复全部行程日期");
      });
    }
    return;
  }

  if (pager) pager.hidden = false;
  const data = ITINERARY_DAYS.find((d) => d.day === currentDay);
  if (!data) return;

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

  const MEAL_DEFS = [
    { key: "breakfast", icon: "🌅", label: "早餐" },
    { key: "lunch", icon: "☀️", label: "午餐" },
    { key: "dinner", icon: "🌙", label: "晚餐" }
  ];

  const mealRowsHtml = MEAL_DEFS.map((m) => {
    const items = (data.dining && data.dining[m.key]) || [];
    const itemsHtml = items.length
      ? items
          .map(
            (d) => `
            <div class="dining-item">
              <div class="dining-item-head">
                <h4 class="dining-name">${m.icon} ${d.name}</h4>
                ${
                  d.mapQuery
                    ? `<a class="amap-btn amap-btn-sm" href="${buildAmapUrl(d.mapQuery)}" target="_blank" rel="noopener noreferrer">🗺️ 高德搜店</a>`
                    : ""
                }
              </div>
              <p class="dining-detail">${d.detail}</p>
            </div>
          `
          )
          .join("")
      : `<p class="ledger-empty">该餐暂无特别推荐</p>`;

    return `
      <details class="meal-row-details">
        <summary class="meal-row-summary">
          <span class="meal-row-left">
            <span class="meal-tile-icon" aria-hidden="true">${m.icon}</span>
            <span class="meal-tile-label">${m.label}</span>
          </span>
          <span class="meal-row-pill">${items.length} 项推荐 · 点击查看</span>
        </summary>
        <div class="meal-row-body">
          <div class="dining-list-single">${itemsHtml}</div>
        </div>
      </details>
    `;
  }).join("");

  const mapRoute = data.mapRoute;
  const hiddenList = mapRoute ? getHiddenStopsForDay(data.day) : [];
  const hiddenSet = new Set(hiddenList);

  const visibleStops = mapRoute
    ? mapRoute.stops
        .map((stop, idx) => ({ stop, idx }))
        .filter(({ idx }) => !hiddenSet.has(idx))
    : [];

  const restoreBarHtml =
    hiddenList.length > 0
      ? `
        <div class="map-restore-bar">
          <span>已划走隐藏 ${hiddenList.length} 站</span>
          <div class="map-restore-actions">
            <button type="button" class="map-restore-btn" id="restoreLastStopBtn">↺ 恢复上一站</button>
            <button type="button" class="map-restore-btn is-all" id="restoreAllStopsBtn">恢复全部</button>
          </div>
        </div>
      `
      : "";

  const legendHtml = mapRoute
    ? visibleStops.length > 0
      ? visibleStops
          .map(({ stop, idx }, visPos) => {
            const isCurrentTop = visPos === 0;
            const badgeBg = isCurrentTop ? "#d24d33" : stop.isMetro ? "#1f6feb" : mapRoute.color;
            return `
              <div class="map-legend-row" data-swipe-idx="${idx}">
                <div class="map-legend-card ${isCurrentTop ? "is-next-stop" : ""}">
                  <button type="button" class="map-legend-stop" data-stop-idx="${idx}">
                    <div class="legend-stop-main">
                      <span class="legend-num" style="background:${badgeBg};">${idx + 1}</span>
                      <div>
                        <span class="legend-name">${isCurrentTop ? "📍 当前/下一站 · " : ""}${stop.name}</span>
                        <span class="legend-sub">${stop.metro ? `🚇 ${stop.metro} · ` : ""}${stop.note}</span>
                      </div>
                    </div>
                  </button>
                  <button type="button" class="stop-hide-btn" data-hide-idx="${idx}" title="此站已完成，隐藏它">
                    ✓ 完成隐藏
                  </button>
                </div>
              </div>
            `;
          })
          .join("")
      : `<p class="ledger-empty">本日全部站点已完成并隐藏 🎉 点上方「恢复全部」可重新查看</p>`
    : "";

  const mapSectionHtml = mapRoute
    ? `
      <section class="day-map-section" aria-label="本日路线地图">
        <div class="day-map-head">
          <h4 class="day-map-title">🗺️ Day ${data.day} 实景路线图（剩余 ${visibleStops.length} / ${mapRoute.stops.length} 站）</h4>
          <div class="day-map-tools">
            <button type="button" class="map-reset-btn" id="resetMapBoundsBtn">🔄 恢复全景视野</button>
          </div>
        </div>
        <div id="dayRouteMap" class="day-map-canvas" role="region" aria-label="${mapRoute.subtitle}"></div>
        <div class="map-legend">
          <p class="map-legend-hint">💧 地图中倒立水滴仅标数字，详细站名见下方；某站结束后可<strong>点「完成隐藏」或向左划走</strong>，下一站会自动顶到最上方：</p>
          ${restoreBarHtml}
          <div class="map-legend-list">${legendHtml}</div>
        </div>
      </section>
    `
    : "";

  const dayBadgeLabel = data.dayTag ? `${data.dayTag} · ${data.dateLabel}` : `第 ${data.day} 天 · ${data.dateLabel}`;

  panel.innerHTML = `
    <div class="day-header">
      <div class="day-header-top">
        <span class="day-badge">${dayBadgeLabel}</span>
        <button type="button" class="hide-day-btn" id="hideCurrentDayBtn">✓ 隐藏今天（已结束）</button>
      </div>
      <h3 class="day-title">${data.title}</h3>
      <div class="route-trail" aria-label="当日路线">${routeHtml}</div>
    </div>

    <details class="driver-box-details" aria-label="司机精准导航定位">
      <summary class="driver-box-summary">
        <span class="driver-box-title"><span aria-hidden="true">🚐</span> 司机精准导航定位（高德地图 / 一键复制）</span>
        <span class="driver-summary-pill">共 ${data.driverPins.length} 个 · 点击展开</span>
      </summary>
      <div class="driver-box-body">
        <div class="driver-body-toolbar">
          <button type="button" class="copy-all-btn" data-copy-all="${allPinsSummary}">
            📋 一键复制本日全部定位
          </button>
        </div>
        <div class="driver-list">${driverHtml}</div>
      </div>
    </details>

    <h4 class="sub-heading"><span aria-hidden="true">🕒</span> 时间线、地铁站指引与景点亮点</h4>
    <div class="timeline">${timelineHtml}</div>

    <div class="day-dining">
      <h4 class="sub-heading"><span aria-hidden="true">🍲</span> 本日餐饮推荐（点击展开）</h4>
      <div class="meal-rows-stack">${mealRowsHtml}</div>
    </div>

    ${mapSectionHtml}
  `;

  const hideDayBtn = panel.querySelector("#hideCurrentDayBtn");
  if (hideDayBtn) {
    hideDayBtn.addEventListener("click", () => {
      const { date } = splitDateLabel(data.dateLabel);
      hideDayAndAdvance(data.day);
      showToast(`已隐藏 ${date}，下次打开会直接显示下一天`);
    });
  }

  panel.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => copyText(btn.dataset.copy, btn));
  });

  const copyAllBtn = panel.querySelector(".copy-all-btn");
  if (copyAllBtn) {
    copyAllBtn.addEventListener("click", () => copyText(copyAllBtn.dataset.copyAll));
  }

  // 站点隐藏（点击按钮或手机左滑）与恢复事件
  const handleHideStop = (idx) => {
    hideStopForDay(data.day, idx);
    renderDayPanel();
    showToast(`已隐藏第 ${idx + 1} 站，下一站已移至最上方`);
  };

  panel.querySelectorAll(".stop-hide-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleHideStop(Number(btn.dataset.hideIdx)));
  });

  panel.querySelectorAll(".map-legend-row[data-swipe-idx]").forEach((row) => {
    let startX = 0;
    let startY = 0;
    row.addEventListener(
      "touchstart",
      (e) => {
        if (!e.touches[0]) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );
    row.addEventListener(
      "touchend",
      (e) => {
        if (!e.changedTouches[0]) return;
        const dx = e.changedTouches[0].clientX - startX;
        const dy = Math.abs(e.changedTouches[0].clientY - startY);
        if (dx < -65 && dy < 45) {
          handleHideStop(Number(row.dataset.swipeIdx));
        }
      },
      { passive: true }
    );
  });

  const restoreLastBtn = panel.querySelector("#restoreLastStopBtn");
  if (restoreLastBtn) {
    restoreLastBtn.addEventListener("click", () => {
      restoreLastStopForDay(data.day);
      renderDayPanel();
      showToast("已恢复上一站");
    });
  }

  const restoreAllBtn = panel.querySelector("#restoreAllStopsBtn");
  if (restoreAllBtn) {
    restoreAllBtn.addEventListener("click", () => {
      restoreAllStopsForDay(data.day);
      renderDayPanel();
      showToast("已恢复本日全部站点");
    });
  }

  const prevBtn = document.getElementById("prevDayBtn");
  const nextBtn = document.getElementById("nextDayBtn");
  const indicator = document.getElementById("pagerIndicator");
  const visIdx = visibleDays.findIndex((d) => d.day === currentDay);
  prevBtn.disabled = visIdx <= 0;
  nextBtn.disabled = visIdx < 0 || visIdx >= visibleDays.length - 1;
  const { date } = splitDateLabel(data.dateLabel);
  indicator.textContent = `${date}（剩余第 ${visIdx + 1} / ${visibleDays.length} 天）`;

  // 仅当「行程」面板处于可见状态时渲染 Leaflet 地图，避免隐藏容器宽高为 0
  const itinPanel = document.getElementById("panel-itinerary");
  if (itinPanel && !itinPanel.hidden) {
    renderDayRouteMap(data);
  }
}

function selectDay(dayNum, shouldScroll = false) {
  if (!ITINERARY_DAYS.some((d) => d.day === dayNum)) return;
  currentDay = dayNum;
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
   一、底部 4 大类导航切换 & 左上角当前栏目指示（资讯 · 行程 · 行李 · 账本）
   ========================================================================== */
let currentMainTab = "info";
const VALID_TABS = ["info", "itinerary", "packing", "ledger"];
const TAB_LABELS = {
  info: "资讯",
  itinerary: "行程",
  packing: "行李",
  ledger: "账本"
};

function switchMainTab(tabName, updateHash = true) {
  if (!VALID_TABS.includes(tabName)) tabName = "info";
  currentMainTab = tabName;

  const pill = document.getElementById("currentTabPill");
  if (pill) {
    pill.textContent = TAB_LABELS[tabName] || "资讯";
    pill.className = `current-tab-pill tab-${tabName}`;
  }

  document.querySelectorAll(".mobile-nav-item").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.tab === tabName);
  });

  VALID_TABS.forEach((t) => {
    const panel = document.getElementById(`panel-${t}`);
    if (!panel) return;
    const isCurrent = t === tabName;
    panel.hidden = !isCurrent;
    panel.classList.toggle("is-active", isCurrent);
  });

  if (tabName === "itinerary") {
    const data = ITINERARY_DAYS.find((d) => d.day === currentDay);
    if (data) {
      setTimeout(() => {
        renderDayRouteMap(data);
        if (activeDayMap) activeDayMap.invalidateSize();
      }, 60);
    }
  }

  if (tabName === "ledger") {
    fetchCloudLedger({ silent: true });
  }

  if (updateHash && history.replaceState) {
    history.replaceState(null, "", `#${tabName}`);
  }
}

function initMainTabs() {
  document.querySelectorAll(".mobile-nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchMainTab(btn.dataset.tab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  const hashTab = window.location.hash.replace("#", "");
  if (VALID_TABS.includes(hashTab)) {
    switchMainTab(hashTab, false);
  } else {
    switchMainTab("info", false);
  }
}

/* ==========================================================================
   二、重庆旅行天气预报（一天一行，06:00–24:00 每2小时温度曲线 + 晴雨）
   ========================================================================== */
const WEATHER_HOURS = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "24:00"];

function getNextIsoDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d + 1);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}

function buildFallbackDay(iso, date, week, temps, codes) {
  return {
    iso,
    date,
    week,
    slots: WEATHER_HOURS.map((hour, i) => {
      const mapped = mapWmoWeather(codes[i], hour);
      return { hour, temp: temps[i], ...mapped };
    })
  };
}

function mapWmoWeather(code, hour = "12:00") {
  const hr = parseInt(hour.slice(0, 2), 10);
  const isNight = hr >= 20 || hr <= 6;
  if (code === 0) return { icon: isNight ? "🌙" : "☀️", cond: "晴", type: "sunny" };
  if (code <= 2) return { icon: isNight ? "☁️" : "⛅", cond: "多云", type: "cloudy" };
  if (code === 3 || code === 45 || code === 48) return { icon: "☁️", cond: "阴", type: "cloudy" };
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { icon: "🌧️", cond: "雨", type: "rain" };
  if (code >= 95) return { icon: "⛈️", cond: "雷雨", type: "rain" };
  return { icon: "☁️", cond: "阴", type: "cloudy" };
}

const TRIP_WEATHER_FALLBACK = [
  buildFallbackDay("2026-11-30", "11月30日", "周一", [10, 10, 12, 14, 15, 15, 13, 12, 11, 10], [3, 2, 2, 1, 1, 2, 3, 3, 3, 3]),
  buildFallbackDay("2026-12-01", "12月1日", "周二", [9, 9, 10, 12, 13, 12, 11, 10, 9, 8], [3, 3, 61, 61, 61, 61, 3, 3, 3, 3]),
  buildFallbackDay("2026-12-02", "12月2日", "周三", [8, 8, 10, 12, 13, 13, 11, 10, 9, 8], [3, 3, 2, 2, 2, 3, 3, 3, 3, 3]),
  buildFallbackDay("2026-12-03", "12月3日", "周四", [8, 9, 11, 13, 15, 14, 12, 10, 9, 8], [2, 2, 1, 0, 0, 1, 2, 3, 3, 3]),
  buildFallbackDay("2026-12-04", "12月4日", "周五", [9, 10, 12, 15, 17, 16, 14, 12, 10, 9], [2, 1, 0, 0, 0, 0, 1, 2, 2, 2]),
  buildFallbackDay("2026-12-05", "12月5日", "周六", [9, 9, 10, 12, 13, 12, 11, 10, 9, 8], [61, 61, 61, 61, 3, 3, 3, 3, 3, 3]),
  buildFallbackDay("2026-12-06", "12月6日", "周日", [8, 9, 11, 13, 15, 14, 12, 11, 9, 8], [2, 2, 1, 0, 0, 1, 2, 2, 3, 3])
];

function buildTempCurveSvg(slots, dotFillColor) {
  const width = 680;
  const height = 52;
  const colW = width / slots.length;
  const temps = slots.map((s) => s.temp);
  const minT = Math.min(...temps);
  const maxT = Math.max(...temps);
  const span = Math.max(maxT - minT, 4);

  const yTop = 24;
  const yBottom = 42;

  const pts = slots.map((s, idx) => {
    const x = colW * (idx + 0.5);
    const ratio = (s.temp - minT) / span;
    const y = yBottom - ratio * (yBottom - yTop);
    return { x, y, temp: s.temp };
  });

  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const cx = ((p0.x + p1.x) / 2).toFixed(1);
    d += ` C ${cx} ${p0.y.toFixed(1)}, ${cx} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }

  const dotsAndLabels = pts
    .map(
      (p) => `
      <text x="${p.x.toFixed(1)}" y="${(p.y - 10).toFixed(1)}" text-anchor="middle" fill="#ffffff" font-size="14.5" font-weight="800" font-family="Noto Sans SC, PingFang SC, sans-serif">${p.temp}°</text>
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.6" fill="${dotFillColor}" stroke="#ffffff" stroke-width="2" />
    `
    )
    .join("");

  return `
    <svg class="weather-curve-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="${d}" fill="none" stroke="rgba(255,255,255,0.68)" stroke-width="2" stroke-linecap="round" />
      ${dotsAndLabels}
    </svg>
  `;
}

function renderWeatherCards(list, badgeText) {
  const container = document.getElementById("weatherGrid");
  const badge = document.getElementById("weatherSourceBadge");
  if (!container) return;

  if (badge) badge.textContent = badgeText;

  container.innerHTML = list
    .map((day) => {
      const temps = day.slots.map((s) => s.temp);
      const minT = Math.min(...temps);
      const maxT = Math.max(...temps);
      const hasRain = day.slots.some((s) => s.type === "rain");
      const hasSunny = day.slots.some((s) => s.type === "sunny");
      const rowClass = hasRain ? "is-rain" : hasSunny ? "is-sunny" : "is-cloudy";
      const dotFill = hasRain ? "#4b5c72" : hasSunny ? "#4d739c" : "#5c708a";

      const hoursRow = day.slots
        .map((s) => `<span class="weather-hour-label">${s.hour}</span>`)
        .join("");

      const iconsRow = day.slots
        .map((s) => `<span class="weather-hour-icon" aria-label="${s.cond}">${s.icon}</span>`)
        .join("");

      const curveSvg = buildTempCurveSvg(day.slots, dotFill);

      const condRow = day.slots
        .map(
          (s) =>
            `<span class="weather-cond-cell"><span class="weather-cond-pill is-${s.type}">${s.cond}</span></span>`
        )
        .join("");

      return `
        <article class="weather-day-row ${rowClass}">
          <div class="weather-row-head">
            <div class="weather-row-date-wrap">
              <span class="weather-row-date">${day.date}</span>
              <span class="weather-row-week">${day.week}</span>
            </div>
            <div class="weather-row-meta">
              <span class="weather-row-range">${minT}° ~ ${maxT}°C</span>
            </div>
          </div>
          <div class="weather-scroll-wrap">
            <div class="weather-track">
              <div class="weather-grid-10">${hoursRow}</div>
              <div class="weather-grid-10">${iconsRow}</div>
              ${curveSvg}
              <div class="weather-grid-10">${condRow}</div>
            </div>
          </div>
          <span class="weather-scroll-hint">← 左右滑动查看 06:00 – 24:00 →</span>
        </article>
      `;
    })
    .join("");
}

async function loadChongqingWeather() {
  renderWeatherCards(TRIP_WEATHER_FALLBACK, "初冬参考天气");

  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=29.5630&longitude=106.5516&hourly=temperature_2m,weathercode&timezone=Asia%2FShanghai&forecast_days=16";
    const res = await fetch(url);
    if (!res.ok) return;
    const json = await res.json();
    if (!json.hourly || !json.hourly.time) return;

    const byTime = {};
    json.hourly.time.forEach((t, idx) => {
      byTime[t] = {
        temp: Math.round(json.hourly.temperature_2m[idx]),
        code: json.hourly.weathercode[idx]
      };
    });

    let matchedDays = 0;
    const merged = TRIP_WEATHER_FALLBACK.map((day) => {
      const nextIso = getNextIsoDate(day.iso);
      const liveSlots = WEATHER_HOURS.map((hour) => {
        const entry =
          hour === "24:00"
            ? byTime[`${nextIso}T00:00`] || byTime[`${day.iso}T23:00`]
            : byTime[`${day.iso}T${hour}`];
        if (!entry) return null;
        const mapped = mapWmoWeather(entry.code, hour);
        return {
          hour,
          temp: entry.temp,
          ...mapped
        };
      });

      if (liveSlots.every(Boolean)) {
        matchedDays += 1;
        return { ...day, slots: liveSlots };
      }
      return day;
    });

    if (matchedDays > 0) {
      const label = matchedDays === TRIP_WEATHER_FALLBACK.length ? "✨ 实时天气预报" : "✨ 部分已更新实时预报";
      renderWeatherCards(merged, label);
    }
  } catch {
    // 离线或接口不可达时静默保留参考天气
  }
}

/* ==========================================================================
   三、第三格：必带行李清单（带可爱物件 SVG 图案）
   ========================================================================== */
const STORAGE_KEY_PACKING_CHECKS = "cq2026_packing_checks_v1";
const STORAGE_KEY_PACKING_CUSTOM = "cq2026_packing_custom_v1";
let currentPackingFilter = "all";

const PACKING_SVGS = {
  passport: `<svg viewBox="0 0 48 48" fill="none"><rect x="10" y="6" width="28" height="36" rx="4" fill="#B5382A" stroke="#781E14" stroke-width="2.2"/><rect x="13" y="9" width="22" height="30" rx="2" stroke="#F6CF71" stroke-width="1.4" stroke-dasharray="2 2"/><circle cx="24" cy="21" r="6.5" stroke="#F6CF71" stroke-width="1.8"/><ellipse cx="24" cy="21" rx="3" ry="6.5" stroke="#F6CF71" stroke-width="1.4"/><path d="M17.5 21H30.5M18.5 32H29.5" stroke="#F6CF71" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  idcard: `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="11" width="36" height="26" rx="5" fill="#E9F4FF" stroke="#2D6FC4" stroke-width="2.2"/><circle cx="16.5" cy="21.5" r="4" fill="#F4A261"/><path d="M11 31C11.8 27.8 14 26.5 16.5 26.5C19 26.5 21.2 27.8 22 31" stroke="#2D6FC4" stroke-width="2" stroke-linecap="round"/><path d="M26 19H36M26 24H36M26 29H33" stroke="#2D6FC4" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  phone: `<svg viewBox="0 0 48 48" fill="none"><rect x="13" y="6" width="22" height="36" rx="5" fill="#3D405B" stroke="#232538" stroke-width="2"/><rect x="16" y="11" width="16" height="24" rx="2" fill="#9BD1FA"/><circle cx="24" cy="38.5" r="1.6" fill="#F4F1DE"/><path d="M21 8.5H27" stroke="#A8ABB8" stroke-width="1.6" stroke-linecap="round"/><circle cx="21" cy="18" r="2" fill="#FFF"/><path d="M19 27L23 23L26 26L29 21" stroke="#1F6FEB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  wallet: `<svg viewBox="0 0 48 48" fill="none"><rect x="7" y="13" width="34" height="24" rx="5" fill="#D9822B" stroke="#8C4E0E" stroke-width="2.2"/><path d="M7 19H41" stroke="#8C4E0E" stroke-width="2"/><rect x="28" y="22" width="13" height="8" rx="4" fill="#F7C97E" stroke="#8C4E0E" stroke-width="2"/><circle cx="33" cy="26" r="1.8" fill="#8C4E0E"/></svg>`,
  coat: `<svg viewBox="0 0 48 48" fill="none"><path d="M16 10L10 15L6 29L13 31L15 22V39H33V22L35 31L42 29L38 15L32 10L28 13H20L16 10Z" fill="#E06D53" stroke="#8F3420" stroke-width="2.2" stroke-linejoin="round"/><path d="M24 13V39" stroke="#8F3420" stroke-width="2"/><path d="M18 10C18 14 21 16 24 16C27 16 30 14 30 10" fill="#FFF3E0" stroke="#8F3420" stroke-width="2"/><circle cx="21" cy="22" r="1.4" fill="#FFF3E0"/><circle cx="21" cy="29" r="1.4" fill="#FFF3E0"/></svg>`,
  sweater: `<svg viewBox="0 0 48 48" fill="none"><path d="M15 11L9 17L7 30L13 31L15 22V38H33V22L35 31L41 30L39 17L33 11L29 14H19L15 11Z" fill="#63A375" stroke="#2D613D" stroke-width="2.2" stroke-linejoin="round"/><path d="M15 24H33M15 30H33" stroke="#DDF2E3" stroke-width="2.4" stroke-dasharray="4 3"/></svg>`,
  scarf: `<svg viewBox="0 0 48 48" fill="none"><rect x="10" y="13" width="28" height="11" rx="5.5" fill="#F2B84B" stroke="#9C5B00" stroke-width="2.2"/><path d="M27 23H35V38L31 35L27 38V23Z" fill="#E06D53" stroke="#8F3420" stroke-width="2.2" stroke-linejoin="round"/><path d="M16 13V24M22 13V24" stroke="#FFF4DC" stroke-width="2.2"/></svg>`,
  sneakers: `<svg viewBox="0 0 48 48" fill="none"><path d="M8 29C8 24 11 19 15 18L20 22C24 23 29 24 35 26C39 27.3 41 29.5 41 32.5V35H8V29Z" fill="#4D90FE" stroke="#1E4B94" stroke-width="2.2" stroke-linejoin="round"/><rect x="7" y="34" width="35" height="4.5" rx="2.2" fill="#FFFFFF" stroke="#1E4B94" stroke-width="2"/><path d="M20 23L22 26M25 24L27 27" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/></svg>`,
  socks: `<svg viewBox="0 0 48 48" fill="none"><path d="M17 9H28V24L35 29C37.5 31 37 35 34 37C31 39 27.5 38 25 36L17 29V9Z" fill="#F6BD60" stroke="#9C5B00" stroke-width="2.2" stroke-linejoin="round"/><path d="M17 14H28" stroke="#E06D53" stroke-width="3"/><circle cx="32" cy="33" r="3" fill="#FFF3D6"/></svg>`,
  powerbank: `<svg viewBox="0 0 48 48" fill="none"><rect x="12" y="9" width="24" height="31" rx="5" fill="#52B788" stroke="#1F5C3F" stroke-width="2.2"/><path d="M25 16L19 25H24L22 33L29 23H24L25 16Z" fill="#FFE066" stroke="#8C5B00" stroke-width="1.4" stroke-linejoin="round"/><circle cx="18" cy="13" r="1.4" fill="#FFF"/><circle cx="22" cy="13" r="1.4" fill="#FFF"/></svg>`,
  charger: `<svg viewBox="0 0 48 48" fill="none"><path d="M19 8V16M29 8V16" stroke="#534438" stroke-width="3" stroke-linecap="round"/><rect x="14" y="16" width="20" height="14" rx="4" fill="#FFFFFF" stroke="#534438" stroke-width="2.2"/><path d="M24 30V36C24 39 28 40 31 38" stroke="#D24D33" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  umbrella: `<svg viewBox="0 0 48 48" fill="none"><path d="M8 25C8 15.5 15.2 9 24 9C32.8 9 40 15.5 40 25H8Z" fill="#5EA3D6" stroke="#1E5280" stroke-width="2.2" stroke-linejoin="round"/><path d="M24 9V35C24 37.8 21.8 39.5 19.5 39.5C17.5 39.5 16 38 16 36" stroke="#8C4E0E" stroke-width="2.4" stroke-linecap="round"/><circle cx="17" cy="19" r="2" fill="#FFF"/><circle cx="29" cy="18" r="2" fill="#FFF"/><circle cx="23" cy="14" r="1.6" fill="#FFF"/></svg>`,
  medicine: `<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="13" width="32" height="25" rx="5" fill="#FFFFFF" stroke="#D24D33" stroke-width="2.4"/><path d="M18 13V10C18 8.9 18.9 8 20 8H28C29.1 8 30 8.9 30 10V13" stroke="#D24D33" stroke-width="2.4"/><path d="M24 19V31M18 25H30" stroke="#D24D33" stroke-width="3.4" stroke-linecap="round"/></svg>`,
  thermos: `<svg viewBox="0 0 48 48" fill="none"><rect x="18" y="8" width="12" height="6" rx="2" fill="#534438"/><rect x="15" y="14" width="18" height="26" rx="5" fill="#F29E74" stroke="#9E421B" stroke-width="2.2"/><path d="M15 22H33" stroke="#FFF4E4" stroke-width="3"/><circle cx="24" cy="30" r="3" fill="#FFF4E4"/></svg>`,
  toiletries: `<svg viewBox="0 0 48 48" fill="none"><rect x="13" y="16" width="14" height="23" rx="4" fill="#90D4F7" stroke="#226B94" stroke-width="2.2"/><path d="M20 16V11H26" stroke="#226B94" stroke-width="2.4" stroke-linecap="round"/><rect x="30" y="21" width="8" height="18" rx="3" fill="#F9B5AC" stroke="#A63F32" stroke-width="2"/></svg>`,
  backpack: `<svg viewBox="0 0 48 48" fill="none"><path d="M18 12C18 8.8 20.6 7 24 7C27.4 7 30 8.8 30 12" stroke="#2E7350" stroke-width="2.6" stroke-linecap="round"/><rect x="11" y="13" width="26" height="27" rx="7" fill="#4E9A74" stroke="#1E5238" stroke-width="2.2"/><rect x="16" y="24" width="16" height="11" rx="3.5" fill="#E7F6EC" stroke="#1E5238" stroke-width="2"/><path d="M20 28H28" stroke="#D24D33" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  custom: `<svg viewBox="0 0 48 48" fill="none"><rect x="11" y="12" width="26" height="24" rx="5" fill="#FFE8A3" stroke="#A36B00" stroke-width="2.2"/><path d="M19 24L22.5 27.5L30 19.5" stroke="#2E7350" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

const PACKING_CATEGORIES = [
  {
    id: "docs",
    title: "🛂 重要证件与随身财物",
    items: [
      { id: "p-passport", icon: "passport", name: "护照 & 往返机票行程单", note: "确认护照有效期超过 6 个月，建议打印纸质行程单备用" },
      { id: "p-idcard", icon: "idcard", name: "身份证 / 长辈优待证件", note: "70岁以上长辈游武隆等景点可享优待，务必随身带好" },
      { id: "p-phone", icon: "phone", name: "手机 & 漫游 / 中国流量卡", note: "提前开通漫游或备好 eSIM/流量卡，装好高德地图与微信" },
      { id: "p-wallet", icon: "wallet", name: "支付宝 / 微信支付 & 少量现金", note: "绑定好马来西亚银行卡，另备少量人民币现金应急" }
    ]
  },
  {
    id: "clothes",
    title: "🧥 保暖衣物与鞋袜（重庆 8–15℃）",
    items: [
      { id: "p-coat", icon: "coat", name: "保暖寒衣 / 防风羽绒服", note: "重庆初冬湿冷、武隆山区风大更冷，必须带厚外套" },
      { id: "p-sweater", icon: "sweater", name: "保暖内衣 & 针织毛衣", note: "洋葱式叠穿，室内有空调脱穿方便" },
      { id: "p-scarf", icon: "scarf", name: "围巾 & 保暖毛线帽", note: "夜游洪崖洞、南岸江边及武隆仙女山防风护颈" },
      { id: "p-sneakers", icon: "sneakers", name: "防滑舒适平底运动鞋", note: "山城坡道台阶多，切勿穿硬底鞋或易打滑的鞋子" },
      { id: "p-socks", icon: "socks", name: "换洗衣物 & 保暖厚袜子", note: "连住 6 晚，多备几双厚袜子防脚凉" }
    ]
  },
  {
    id: "tech",
    title: "🔋 电子设备与电源",
    items: [
      { id: "p-powerbank", icon: "powerbank", name: "充电宝（务必随身登机）", note: "拍照导航耗电快；充电宝不可托运，需随身携带" },
      { id: "p-charger", icon: "charger", name: "手机充电线 & 转换插头", note: "中国常用两脚扁插/三脚斜插，备好马来西亚转接头" }
    ]
  },
  {
    id: "daily",
    title: "☂️ 随身日用与常备药品",
    items: [
      { id: "p-umbrella", icon: "umbrella", name: "轻便折叠雨伞", note: "山城多雾偶有小雨，随身放包里最安心" },
      { id: "p-medicine", icon: "medicine", name: "肠胃药、消食片与个人常备药", note: "重庆偏麻辣，备好肠胃药、感冒药及长辈日常用药" },
      { id: "p-thermos", icon: "thermos", name: "轻便保温杯", note: "初冬随时喝口热水暖胃，机场安检前倒空即可" },
      { id: "p-toiletries", icon: "toiletries", name: "润唇膏、护手霜与纸巾湿巾", note: "冬天偏干护手保湿，随身带小包纸巾很实用" },
      { id: "p-backpack", icon: "backpack", name: "轻便双肩包 / 斜挎包", note: "解放双手方便搀扶长辈和随时拍照" }
    ]
  }
];

function loadPackingChecks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_PACKING_CHECKS) || "{}");
  } catch {
    return {};
  }
}

function savePackingChecks(map) {
  try {
    localStorage.setItem(STORAGE_KEY_PACKING_CHECKS, JSON.stringify(map));
  } catch {
    // ignore
  }
}

function loadCustomPackingItems() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_PACKING_CUSTOM) || "[]");
  } catch {
    return [];
  }
}

function saveCustomPackingItems(list) {
  try {
    localStorage.setItem(STORAGE_KEY_PACKING_CUSTOM, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderPackingList() {
  const container = document.getElementById("packingGroups");
  if (!container) return;

  const checks = loadPackingChecks();
  const customItems = loadCustomPackingItems();

  const allGroups = [
    ...PACKING_CATEGORIES,
    ...(customItems.length > 0
      ? [{ id: "custom", title: "✨ 家人自定义行李", items: customItems }]
      : [])
  ];

  let totalCount = 0;
  let packedCount = 0;
  allGroups.forEach((g) => {
    g.items.forEach((it) => {
      totalCount += 1;
      if (checks[it.id]) packedCount += 1;
    });
  });

  const pct = totalCount ? Math.round((packedCount / totalCount) * 100) : 0;
  const progressText = document.getElementById("packingProgressText");
  const progressFill = document.getElementById("packingProgressFill");
  const hubSub = document.getElementById("hubPackingSub");

  if (progressText) progressText.textContent = `已打包 ${packedCount} / ${totalCount} 件（${pct}%）`;
  if (progressFill) progressFill.style.width = `${pct}%`;
  if (hubSub) hubSub.textContent = `已打包 ${packedCount} / ${totalCount} 件`;

  const html = allGroups
    .map((group) => {
      const filtered = group.items.filter((it) => {
        const isDone = Boolean(checks[it.id]);
        if (currentPackingFilter === "todo") return !isDone;
        if (currentPackingFilter === "done") return isDone;
        return true;
      });
      if (filtered.length === 0) return "";

      const groupDone = group.items.filter((it) => Boolean(checks[it.id])).length;
      const itemsHtml = filtered
        .map((it) => {
          const isDone = Boolean(checks[it.id]);
          const svg = PACKING_SVGS[it.icon] || PACKING_SVGS.custom;
          const delBtn = it.isCustom
            ? `<button type="button" class="packing-del-btn" data-del-pack="${it.id}" aria-label="删除自定义行李">✕</button>`
            : "";
          return `
            <label class="packing-item ${isDone ? "is-packed" : ""}">
              <input type="checkbox" class="packing-checkbox" data-pack-id="${it.id}" ${isDone ? "checked" : ""} />
              <span class="packing-svg-wrap" aria-hidden="true">${svg}</span>
              <span class="packing-item-body">
                <div class="packing-item-name">${escapeHtml(it.name)}</div>
                ${it.note ? `<div class="packing-item-note">${escapeHtml(it.note)}</div>` : ""}
              </span>
              ${delBtn}
            </label>
          `;
        })
        .join("");

      return `
        <section class="packing-group">
          <div class="packing-group-head">
            <h3 class="packing-group-title">${group.title}</h3>
            <span class="packing-group-count">${groupDone} / ${group.items.length}</span>
          </div>
          <div class="packing-grid">${itemsHtml}</div>
        </section>
      `;
    })
    .join("");

  container.innerHTML =
    html ||
    `<div class="packing-group"><p class="ledger-empty">当前筛选下没有行李项目啦 🎉</p></div>`;

  container.querySelectorAll(".packing-checkbox").forEach((cb) => {
    cb.addEventListener("change", () => {
      const map = loadPackingChecks();
      map[cb.dataset.packId] = cb.checked;
      savePackingChecks(map);
      renderPackingList();
    });
  });

  container.querySelectorAll(".packing-del-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.delPack;
      const next = loadCustomPackingItems().filter((x) => x.id !== id);
      saveCustomPackingItems(next);
      const map = loadPackingChecks();
      delete map[id];
      savePackingChecks(map);
      renderPackingList();
      showToast("已删除该行李项目");
    });
  });
}

function initPackingChecklist() {
  document.querySelectorAll(".packing-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPackingFilter = btn.dataset.packFilter;
      document.querySelectorAll(".packing-filter-btn").forEach((b) => {
        b.classList.toggle("is-active", b.dataset.packFilter === currentPackingFilter);
      });
      renderPackingList();
    });
  });

  const form = document.getElementById("packingAddForm");
  const input = document.getElementById("packingNewInput");
  if (form && input) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = input.value.trim();
      if (!name) return;
      const list = loadCustomPackingItems();
      list.push({
        id: `custom-${Date.now()}`,
        icon: "custom",
        name,
        note: "自定义添加",
        isCustom: true
      });
      saveCustomPackingItems(list);
      input.value = "";
      renderPackingList();
      showToast(`已添加行李：「${name}」`);
    });
  }

  renderPackingList();
}

/* ==========================================================================
   四、第四格：云端共享旅行记账本（实时云端同步 + 总数/每位 + 拍照加入账单）
   ========================================================================== */
const CLOUD_LEDGER_URL = "https://api.npoint.io/03e4b7aaeec55fd80394";
const STORAGE_KEY_LEDGER = "cq2026_ledger_entries_v2";
const STORAGE_KEY_RATE = "cq2026_exchange_rate_v1";

const LEDGER_GROUPS = [
  { id: "pre", title: "📌 出发前费用（航班 · 住宿 · 保险及其他）", isPre: true },
  { id: "day0", title: "出发日 · 11月29日（周日）海口转机" },
  { id: "day1", title: "Day 1 · 11月30日（周一）抵达重庆" },
  { id: "day2", title: "Day 2 · 12月1日（周二）古建索道与南岸" },
  { id: "day3", title: "Day 3 · 12月2日（周三）乌江画廊与古镇" },
  { id: "day4", title: "Day 4 · 12月3日（周四）武隆奇观与返城" },
  { id: "day5", title: "Day 5 · 12月4日（周五）历史文化与商圈" },
  { id: "day6", title: "Day 6 · 12月5日（周六）采买伴手礼休整" },
  { id: "day7", title: "Day 7 · 12月6日（周日）返程送机回槟城" }
];

const EXPENSE_CAT_ICONS = {
  food: "🍜",
  transport: "🚐",
  ticket: "🎟️",
  shopping: "🛍️",
  stay: "🏠",
  flight: "✈️",
  insurance: "🛡️",
  other: "📦"
};

const DEFAULT_LEDGER_ENTRIES = [
  {
    id: "pre-flight",
    section: "pre",
    title: "往返航班（海南航空 PEN ⇄ CKG）",
    amount: 0,
    unitAmount: 0,
    splitMode: "total",
    headcount: 6,
    currency: "MYR",
    category: "flight",
    note: "点击右侧「编辑」填入实际机票金额，也可拍照存订单",
    photo: ""
  },
  {
    id: "pre-stay",
    section: "pre",
    title: "重庆住宿（湖广·富山江景美宿 6晚）",
    amount: 0,
    unitAmount: 0,
    splitMode: "total",
    headcount: 6,
    currency: "MYR",
    category: "stay",
    note: "三居室整套民宿 11/30–12/6，点击「编辑」填入房费",
    photo: ""
  },
  {
    id: "pre-insurance",
    section: "pre",
    title: "全家旅行保险",
    amount: 0,
    unitAmount: 0,
    splitMode: "total",
    headcount: 6,
    currency: "MYR",
    category: "insurance",
    note: "点击「编辑」填入保费金额，可附加保单照片",
    photo: ""
  }
];

let ledgerEntriesCache = [];
let pendingReceiptDataUrl = "";
let selectedExpenseCat = "food";
let selectedSplitMode = "total";
let isSyncingCloud = false;

function setCloudSyncStatus(state, message) {
  const bar = document.getElementById("cloudSyncBar");
  const text = document.getElementById("cloudSyncText");
  if (!bar || !text) return;
  bar.classList.remove("is-ok", "is-error");
  if (state === "ok") bar.classList.add("is-ok");
  if (state === "error") bar.classList.add("is-error");
  text.textContent = message;
}

function loadLocalLedgerCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEDGER);
    if (!raw) return [...DEFAULT_LEDGER_ENTRIES];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...DEFAULT_LEDGER_ENTRIES];
  } catch {
    return [...DEFAULT_LEDGER_ENTRIES];
  }
}

function saveLocalLedgerCache(entries) {
  ledgerEntriesCache = entries;
  try {
    localStorage.setItem(STORAGE_KEY_LEDGER, JSON.stringify(entries));
  } catch {
    // 忽略本机缓存容量限制，云端仍可正常保存
  }
}

function formatSyncTime() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

async function fetchCloudLedger({ silent = false } = {}) {
  if (!silent) {
    setCloudSyncStatus("syncing", "☁️ 正在从云端拉取最新共享账本...");
  }
  try {
    const res = await fetch(`${CLOUD_LEDGER_URL}?t=${Date.now()}`, {
      method: "GET",
      cache: "no-store"
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const entries = Array.isArray(data && data.entries) ? data.entries : [...DEFAULT_LEDGER_ENTRIES];

    if (data && Number.isFinite(Number(data.rate)) && Number(data.rate) > 0) {
      const rateInput = document.getElementById("exchangeRateInput");
      if (rateInput && document.activeElement !== rateInput) {
        rateInput.value = String(data.rate);
      }
    }

    saveLocalLedgerCache(entries);
    renderLedger();
    setCloudSyncStatus("ok", `☁️ 云端已同步（${formatSyncTime()} · 大家实时共看）`);
    return entries;
  } catch {
    if (!ledgerEntriesCache.length) {
      ledgerEntriesCache = loadLocalLedgerCache();
    }
    renderLedger();
    setCloudSyncStatus("error", "⚠️ 暂时无法连接云端，当前显示本机缓存（点右上角刷新重试）");
    return ledgerEntriesCache;
  }
}

async function mutateCloudLedger(mutatorFn, successToast) {
  if (isSyncingCloud) {
    showToast("正在同步云端，请稍候...");
    return false;
  }
  isSyncingCloud = true;
  setCloudSyncStatus("syncing", "☁️ 正在上传到云端共享账本...");

  try {
    // 先拉取最新云端数据，避免覆盖家人刚添加的记录
    let latestEntries = ledgerEntriesCache;
    try {
      const getRes = await fetch(`${CLOUD_LEDGER_URL}?t=${Date.now()}`, {
        method: "GET",
        cache: "no-store"
      });
      if (getRes.ok) {
        const latestData = await getRes.json();
        if (Array.isArray(latestData && latestData.entries)) {
          latestEntries = latestData.entries;
        }
      }
    } catch {
      // 拉取失败则基于当前缓存更新
    }

    const updatedEntries = mutatorFn([...latestEntries]);
    const payload = {
      version: 1,
      rate: getExchangeRate(),
      people: 6,
      updatedAt: new Date().toISOString(),
      entries: updatedEntries
    };

    const postRes = await fetch(CLOUD_LEDGER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!postRes.ok) throw new Error(`HTTP ${postRes.status}`);

    saveLocalLedgerCache(updatedEntries);
    renderLedger();
    setCloudSyncStatus("ok", `☁️ 已上传云端（${formatSyncTime()} · 大家实时共看）`);
    if (successToast) showToast(successToast);
    return true;
  } catch {
    setCloudSyncStatus("error", "⚠️ 云端上传失败，请检查网络或缩小照片后重试");
    showToast("云端上传失败，请检查网络后重试");
    return false;
  } finally {
    isSyncingCloud = false;
  }
}

function getExchangeRate() {
  const input = document.getElementById("exchangeRateInput");
  const val = parseFloat(input && input.value);
  return Number.isFinite(val) && val > 0 ? val : 1.65;
}

function formatMoney(currency, amount) {
  const n = Number(amount) || 0;
  const formatted = n.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return currency === "MYR" ? `RM ${formatted}` : `¥ ${formatted}`;
}

function renderLedger() {
  const entries = ledgerEntriesCache.length ? ledgerEntriesCache : loadLocalLedgerCache();
  const rate = getExchangeRate();

  let totalCny = 0;
  let totalMyr = 0;
  let preCny = 0;
  let preMyr = 0;
  let dailyCny = 0;
  let dailyMyr = 0;

  entries.forEach((e) => {
    const amt = Number(e.amount) || 0;
    if (e.currency === "MYR") {
      totalMyr += amt;
      if (e.section === "pre") preMyr += amt;
      else dailyMyr += amt;
    } else {
      totalCny += amt;
      if (e.section === "pre") preCny += amt;
      else dailyCny += amt;
    }
  });

  const combinedMyr = totalMyr + totalCny / rate;
  const perPersonMyr = combinedMyr / 6;

  const setElText = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  setElText("totalCnyVal", formatMoney("CNY", totalCny));
  setElText("totalMyrVal", formatMoney("MYR", totalMyr));
  setElText("totalCombinedVal", formatMoney("MYR", combinedMyr));
  setElText("totalPerPersonVal", `6 人人均约 ${formatMoney("MYR", perPersonMyr)}`);
  setElText("preTripSubStat", `¥${preCny.toFixed(0)} / RM${preMyr.toFixed(0)}`);
  setElText("dailySubStat", `¥${dailyCny.toFixed(0)} / RM${dailyMyr.toFixed(0)}`);

  const container = document.getElementById("ledgerSections");
  if (!container) return;

  container.innerHTML = LEDGER_GROUPS.map((group) => {
    const list = entries.filter((e) => e.section === group.id);
    let gCny = 0;
    let gMyr = 0;
    list.forEach((e) => {
      if (e.currency === "MYR") gMyr += Number(e.amount) || 0;
      else gCny += Number(e.amount) || 0;
    });

    const subParts = [];
    if (gCny > 0) subParts.push(formatMoney("CNY", gCny));
    if (gMyr > 0) subParts.push(formatMoney("MYR", gMyr));
    const subText = subParts.length ? `小计：${subParts.join(" + ")}` : "暂无已填金额";

    const itemsHtml = list.length
      ? list
          .map((item) => {
            const amt = Number(item.amount) || 0;
            const icon = EXPENSE_CAT_ICONS[item.category] || "📦";
            const photoBtn = item.photo
              ? `<button type="button" class="expense-thumb-btn" data-view-photo="${item.id}" title="点击查看账单照片"><img src="${item.photo}" alt="账单照片" /></button>`
              : "";

            let splitBadge = "";
            if (amt > 0) {
              if (item.splitMode === "per_person" && Number(item.unitAmount) > 0) {
                const hc = Number(item.headcount) || 6;
                splitBadge = `<span class="expense-split-badge">${formatMoney(item.currency, item.unitAmount)}/位 × ${hc}人</span>`;
              } else {
                splitBadge = `<span class="expense-split-badge">整笔总数</span>`;
              }
            }

            return `
              <div class="expense-item">
                <div class="expense-left">
                  <span class="expense-cat-icon" aria-hidden="true">${icon}</span>
                  <div class="expense-info">
                    <div class="expense-title">${escapeHtml(item.title)}</div>
                    ${item.note ? `<div class="expense-note">${escapeHtml(item.note)}</div>` : ""}
                  </div>
                </div>
                <div class="expense-right">
                  ${photoBtn}
                  <div class="expense-amount-wrap">
                    <span class="expense-amount ${amt === 0 ? "is-zero" : ""}">
                      ${amt === 0 ? "待填金额" : formatMoney(item.currency, amt)}
                    </span>
                    ${splitBadge}
                  </div>
                  <button type="button" class="expense-op-btn" data-edit-exp="${item.id}">编辑</button>
                  <button type="button" class="expense-op-btn is-del" data-del-exp="${item.id}">删</button>
                </div>
              </div>
            `;
          })
          .join("")
      : `<p class="ledger-empty">当天还没有记账，点右上角「＋ 加入开销」或「📷 拍照记账」即可上传共享</p>`;

    return `
      <section class="ledger-group ${group.isPre ? "is-pre" : ""}">
        <div class="ledger-group-head">
          <div class="ledger-group-title-wrap">
            <h3 class="ledger-group-title">${group.title}</h3>
            <span class="ledger-group-subtotal">${subText}</span>
          </div>
          <div class="ledger-group-actions">
            <button type="button" class="ledger-add-btn" data-add-sec="${group.id}">＋ 加入开销</button>
            <button type="button" class="ledger-cam-btn" data-cam-sec="${group.id}">📷 拍照记账</button>
          </div>
        </div>
        <div class="ledger-list">${itemsHtml}</div>
      </section>
    `;
  }).join("");

  container.querySelectorAll("[data-add-sec]").forEach((btn) => {
    btn.addEventListener("click", () => openExpenseModal({ section: btn.dataset.addSec }));
  });

  container.querySelectorAll("[data-cam-sec]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openExpenseModal({ section: btn.dataset.camSec, triggerCamera: true });
    });
  });

  container.querySelectorAll("[data-edit-exp]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = ledgerEntriesCache.find((x) => x.id === btn.dataset.editExp);
      if (target) openExpenseModal({ entry: target });
    });
  });

  container.querySelectorAll("[data-del-exp]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.delExp;
      await mutateCloudLedger(
        (list) => list.filter((x) => x.id !== id),
        "已从云端删除该笔记录 ✓"
      );
    });
  });

  container.querySelectorAll("[data-view-photo]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = ledgerEntriesCache.find((x) => x.id === btn.dataset.viewPhoto);
      if (target && target.photo) {
        openLightbox(target.photo, `${target.title}（${formatMoney(target.currency, target.amount)}）`);
      }
    });
  });
}

function setSelectedExpenseCat(cat) {
  selectedExpenseCat = cat || "food";
  document.querySelectorAll("#expenseCategoryGrid .cat-chip").forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.cat === selectedExpenseCat);
  });
}

function updateSplitModeUI() {
  document.querySelectorAll("#splitModeToggle .split-mode-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.split === selectedSplitMode);
  });

  const labelEl = document.getElementById("expenseAmountLabel");
  const perBox = document.getElementById("perPersonBox");
  const amtInput = document.getElementById("expenseAmountInput");
  const hcInput = document.getElementById("expenseHeadcountInput");
  const currSelect = document.getElementById("expenseCurrencySelect");
  const preview = document.getElementById("perPersonPreview");

  if (selectedSplitMode === "per_person") {
    if (labelEl) labelEl.textContent = "每位金额";
    if (perBox) perBox.hidden = false;
    const unit = parseFloat(amtInput && amtInput.value) || 0;
    const hc = Math.max(1, parseInt(hcInput && hcInput.value, 10) || 6);
    const curr = (currSelect && currSelect.value) || "CNY";
    const total = unit * hc;
    if (preview) {
      preview.textContent = `自动折算总金额：${formatMoney(curr, total)}（${formatMoney(curr, unit)} × ${hc} 位）`;
    }
  } else {
    if (labelEl) labelEl.textContent = "总金额";
    if (perBox) perBox.hidden = true;
  }
}

function updateReceiptPreview(dataUrl) {
  pendingReceiptDataUrl = dataUrl || "";
  const box = document.getElementById("receiptPreviewBox");
  const img = document.getElementById("receiptPreviewImg");
  if (!box || !img) return;
  if (pendingReceiptDataUrl) {
    img.src = pendingReceiptDataUrl;
    box.hidden = false;
  } else {
    img.removeAttribute("src");
    box.hidden = true;
  }
}

function openExpenseModal({ section = "day1", entry = null, triggerCamera = false } = {}) {
  const modal = document.getElementById("expenseModal");
  if (!modal) return;

  const titleEl = document.getElementById("expenseModalTitle");
  const idInput = document.getElementById("expenseIdInput");
  const secSelect = document.getElementById("expenseSectionSelect");
  const nameInput = document.getElementById("expenseTitleInput");
  const currSelect = document.getElementById("expenseCurrencySelect");
  const amtInput = document.getElementById("expenseAmountInput");
  const hcInput = document.getElementById("expenseHeadcountInput");
  const noteInput = document.getElementById("expenseNoteInput");

  if (entry) {
    titleEl.textContent = "✏️ 编辑开销记录";
    idInput.value = entry.id;
    secSelect.value = entry.section;
    nameInput.value = entry.title;
    currSelect.value = entry.currency || "CNY";
    selectedSplitMode = entry.splitMode === "per_person" ? "per_person" : "total";
    hcInput.value = String(entry.headcount || 6);
    if (selectedSplitMode === "per_person") {
      amtInput.value = entry.unitAmount ? String(entry.unitAmount) : "";
    } else {
      amtInput.value = entry.amount ? String(entry.amount) : "";
    }
    noteInput.value = entry.note || "";
    setSelectedExpenseCat(entry.category || "other");
    updateReceiptPreview(entry.photo || "");
  } else {
    titleEl.textContent = triggerCamera ? "📷 拍照加入账单" : "➕ 加入一笔开销";
    idInput.value = "";
    secSelect.value = section;
    nameInput.value = "";
    currSelect.value = section === "pre" ? "MYR" : "CNY";
    selectedSplitMode = "total";
    hcInput.value = "6";
    amtInput.value = "";
    noteInput.value = "";
    setSelectedExpenseCat(section === "pre" ? "other" : "food");
    updateReceiptPreview("");
  }

  updateSplitModeUI();
  modal.hidden = false;

  if (triggerCamera) {
    const camInput = document.getElementById("expenseCameraInput");
    if (camInput) {
      setTimeout(() => camInput.click(), 80);
    }
  } else {
    setTimeout(() => nameInput.focus(), 60);
  }
}

function closeExpenseModal() {
  const modal = document.getElementById("expenseModal");
  if (modal) modal.hidden = true;
  const camInput = document.getElementById("expenseCameraInput");
  const albInput = document.getElementById("expenseAlbumInput");
  if (camInput) camInput.value = "";
  if (albInput) albInput.value = "";
}

function compressImageFile(file, maxWidth = 640, quality = 0.62) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function handleReceiptFile(file) {
  if (!file) return;
  try {
    const dataUrl = await compressImageFile(file);
    updateReceiptPreview(dataUrl);
    showToast("账单照片已压缩准备好 ✓");
  } catch {
    showToast("图片读取失败，请重试");
  }
}

function openLightbox(src, caption) {
  const lb = document.getElementById("photoLightbox");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");
  if (!lb || !img) return;
  img.src = src;
  if (cap) cap.textContent = caption || "";
  lb.hidden = false;
}

function closeLightbox() {
  const lb = document.getElementById("photoLightbox");
  if (lb) lb.hidden = true;
}

function exportLedgerSummary() {
  const entries = ledgerEntriesCache.length ? ledgerEntriesCache : loadLocalLedgerCache();
  const rate = getExchangeRate();
  let totalCny = 0;
  let totalMyr = 0;

  const lines = ["【重庆临时之旅 · 共享账单汇总】"];
  LEDGER_GROUPS.forEach((group) => {
    const list = entries.filter((e) => e.section === group.id && (Number(e.amount) || 0) > 0);
    if (!list.length) return;
    lines.push(`\n${group.title}`);
    list.forEach((it) => {
      const amt = Number(it.amount) || 0;
      if (it.currency === "MYR") totalMyr += amt;
      else totalCny += amt;
      const splitPart =
        it.splitMode === "per_person" && Number(it.unitAmount) > 0
          ? ` [${formatMoney(it.currency, it.unitAmount)}/位 × ${it.headcount || 6}人]`
          : "";
      const notePart = it.note ? `（${it.note}）` : "";
      lines.push(`- ${it.title}：${formatMoney(it.currency, amt)}${splitPart}${notePart}`);
    });
  });

  const combinedMyr = totalMyr + totalCny / rate;
  lines.push(`\n人民币合计：${formatMoney("CNY", totalCny)}`);
  lines.push(`马币合计：${formatMoney("MYR", totalMyr)}`);
  lines.push(`按 1 RM = ${rate} ¥ 折合约：${formatMoney("MYR", combinedMyr)}（6人均约 ${formatMoney("MYR", combinedMyr / 6)}）`);

  copyText(lines.join("\n"));
}

function initLedger() {
  ledgerEntriesCache = loadLocalLedgerCache();

  const rateInput = document.getElementById("exchangeRateInput");
  if (rateInput) {
    const savedRate = localStorage.getItem(STORAGE_KEY_RATE);
    if (savedRate) rateInput.value = savedRate;
    rateInput.addEventListener("change", () => {
      try {
        localStorage.setItem(STORAGE_KEY_RATE, rateInput.value);
      } catch {
        // ignore
      }
      renderLedger();
      mutateCloudLedger((list) => list, "参考汇率已同步云端");
    });
  }

  document.querySelectorAll("#splitModeToggle .split-mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedSplitMode = btn.dataset.split;
      updateSplitModeUI();
    });
  });

  ["expenseAmountInput", "expenseHeadcountInput", "expenseCurrencySelect"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateSplitModeUI);
    if (el) el.addEventListener("change", updateSplitModeUI);
  });

  document.querySelectorAll("#expenseCategoryGrid .cat-chip").forEach((chip) => {
    chip.addEventListener("click", () => setSelectedExpenseCat(chip.dataset.cat));
  });

  const camInput = document.getElementById("expenseCameraInput");
  const albInput = document.getElementById("expenseAlbumInput");
  if (camInput) camInput.addEventListener("change", () => handleReceiptFile(camInput.files[0]));
  if (albInput) albInput.addEventListener("change", () => handleReceiptFile(albInput.files[0]));

  const removeReceiptBtn = document.getElementById("removeReceiptBtn");
  if (removeReceiptBtn) removeReceiptBtn.addEventListener("click", () => updateReceiptPreview(""));

  const closeBtn = document.getElementById("closeExpenseModalBtn");
  const cancelBtn = document.getElementById("cancelExpenseBtn");
  const modal = document.getElementById("expenseModal");
  if (closeBtn) closeBtn.addEventListener("click", closeExpenseModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeExpenseModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeExpenseModal();
    });
  }

  const form = document.getElementById("expenseForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = document.getElementById("expenseIdInput").value;
      const section = document.getElementById("expenseSectionSelect").value;
      const title = document.getElementById("expenseTitleInput").value.trim();
      const currency = document.getElementById("expenseCurrencySelect").value;
      const rawAmount = parseFloat(document.getElementById("expenseAmountInput").value);
      const headcount = Math.max(1, parseInt(document.getElementById("expenseHeadcountInput").value, 10) || 6);
      const note = document.getElementById("expenseNoteInput").value.trim();

      if (!title || !Number.isFinite(rawAmount) || rawAmount < 0) {
        showToast("请填写消费项目与有效金额");
        return;
      }

      const totalAmount =
        selectedSplitMode === "per_person"
          ? Math.round(rawAmount * headcount * 100) / 100
          : Math.round(rawAmount * 100) / 100;

      const record = {
        id: id || `exp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        section,
        title,
        amount: totalAmount,
        unitAmount: selectedSplitMode === "per_person" ? rawAmount : totalAmount,
        splitMode: selectedSplitMode,
        headcount,
        currency,
        category: selectedExpenseCat,
        note,
        photo: pendingReceiptDataUrl
      };

      const saveBtn = document.getElementById("saveExpenseBtn");
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = "☁️ 正在上传云端...";
      }

      const ok = await mutateCloudLedger((list) => {
        const idx = list.findIndex((x) => x.id === record.id);
        if (idx >= 0) list[idx] = record;
        else list.push(record);
        return list;
      }, id ? "已更新并同步云端 ✓" : "已记入共享账本 ✓");

      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.textContent = "☁️ 保存并上传云端";
      }

      if (ok) closeExpenseModal();
    });
  }

  const refreshBtn = document.getElementById("refreshCloudLedgerBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", async () => {
      await fetchCloudLedger({ silent: false });
      showToast("已同步云端最新账本 ✓");
    });
  }

  const exportBtn = document.getElementById("exportLedgerBtn");
  if (exportBtn) exportBtn.addEventListener("click", exportLedgerSummary);

  const closeLb = document.getElementById("closeLightboxBtn");
  const lb = document.getElementById("photoLightbox");
  if (closeLb) closeLb.addEventListener("click", closeLightbox);
  if (lb) {
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });
  }

  renderLedger();
  fetchCloudLedger({ silent: false });

  // 查看账本页面时每 30 秒静默刷新一次，方便大家看到彼此的新增记录
  setInterval(() => {
    if (currentMainTab === "ledger" && !isSyncingCloud) {
      fetchCloudLedger({ silent: true });
    }
  }, 30000);
}

/* ==========================================================================
   启动初始化
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initFontScale();
  renderDayTabs();
  renderDayPanel();
  initMainTabs();
  loadChongqingWeather();

  document.getElementById("prevDayBtn").addEventListener("click", () => {
    const visible = getVisibleDays();
    const idx = visible.findIndex((d) => d.day === currentDay);
    if (idx > 0) selectDay(visible[idx - 1].day, true);
  });
  document.getElementById("nextDayBtn").addEventListener("click", () => {
    const visible = getVisibleDays();
    const idx = visible.findIndex((d) => d.day === currentDay);
    if (idx >= 0 && idx < visible.length - 1) selectDay(visible[idx + 1].day, true);
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

  initPackingChecklist();
  initLedger();
});

