// === 冲动拦截器 — 核心引擎 ===

// ---- 关键词分类 ----
const CATEGORIES = {
  gaming: {
    name: '游戏',
    keywords: ['游戏', '开黑', '排位', '上分', '王者', 'LOL', '英雄联盟', '原神', '吃鸡',
      'steam', 'Switch', 'PS5', '网游', '手游', '打机', '电竞', '团战', '副本', 'rank'],
  },
  shortVideo: {
    name: '短视频',
    keywords: ['短视频', '抖音', '快手', 'B站', 'b站', 'bilibili', '刷视频', '刷手机',
      '小红书', '视频号', '直播', '看视频', '刷到', '滚动', '下滑'],
  },
  eating: {
    name: '暴食',
    keywords: ['吃', '暴食', '零食', '外卖', '奶茶', '炸鸡', '烧烤', '火锅', '甜食',
      '蛋糕', '巧克力', '薯片', '泡面', '夜宵', '饿了', '嘴馋', '馋', '大餐', '汉堡'],
  },
  stayUp: {
    name: '熬夜',
    keywords: ['熬夜', '睡觉', '不想睡', '睡不着', '晚睡', '通宵', '失眠', '困', '赖床',
      '不睡', '迟睡', '夜猫'],
  },
  procrastination: {
    name: '拖延/学习',
    keywords: ['学习', '作业', '考试', '复习', '论文', '拖延', '不想学', '不想做',
      '不想写', '不想读', '背单词', '刷题', 'deadline', 'ddl', '报告', '预习',
      '看书', '上课', '图书馆', '自习', '备考', '期末', '期中'],
  },
  socialMedia: {
    name: '社交媒体',
    keywords: ['朋友圈', '微博', '微信', 'QQ', '社交', '聊天', '八卦', '刷',
      'instagram', 'twitter', '知乎', '豆瓣', '贴吧', '论坛', '群聊'],
  },
  shopping: {
    name: '购物',
    keywords: ['买', '购物', '淘宝', '京东', '拼多多', '下单', '剁手', '快递', '折扣',
      '促销', '种草', '抢购', '秒杀', '直播间买'],
  },
};

// ---- 劝阻内容模板库 ----

// 叫停信号
const STOP_SIGNALS = {
  gentle: [
    '嘿，先停一下。注意到你现在有一个冲动在敲门——这已经很了不起了，你觉察到了它。',
    '等一下，给自己三秒钟深呼吸。你不需要马上行动，只需要先暂停一下。',
    '我们先停一停。你之所以输入这段话，是因为你内心有一部分知道什么才是真正重要的。',
    '好的，我听到你了。但在你做决定之前，先把这个冲动放在手心，观察它一会儿。',
  ],
  firm: [
    '停。你的大脑正在被多巴胺劫持。这不是你真正的需求，这是你大脑里的奖励系统在尖叫。',
    '等一下——你真的想做这件事吗？还是你的习惯在推着你走？认出这个模式，你就已经赢了一半。',
    '停在这里。冲动不是命令，它只是一个建议。你有权利拒绝它。',
    '拦住你的是你自己——那个输入这句话的你。那个你是清醒的。听他的。',
  ],
  strong: [
    '够了。停！你脑子里那个想要放纵的声音不是你的朋友，它是一个被训练出来的神经回路，正在对你撒谎。',
    '站住。你是不是又打算用「就这一次」骗自己？你比谁都清楚，从来没有「就这一次」。',
    '你给我停在这儿。你知道接下来会发生什么：短暂的快感、然后是更长久的空虚和自我厌恶。这个剧本你演过太多次了。',
    '停下！你现在感觉到的强烈冲动，恰恰证明了你最需要的不是放纵，而是夺回控制权。',
  ],
};

// 原因分析
const REASON_ANALYSES = {
  gaming: {
    gentle: [
      '想玩游戏是很正常的——游戏被设计成非常有吸引力。你可能感到累了、无聊了，或者想要一点掌控感和成就感。这些都是合理的需求。',
      '游戏给你的是即时反馈和快速成就感，这恰恰说明你内心渴望进步和被认可。这种渴望本身没有错。',
    ],
    firm: [
      '你想玩游戏，不是因为游戏有多好玩，而是因为现实中有你暂时不想面对的东西——可能是压力、无聊、或者对某个任务的逃避。游戏只是你选择的麻醉剂。',
      '游戏的成就感是虚幻的。你花了三个小时升了一级，关掉屏幕之后，现实世界什么都没变。你真正渴望的——成长、认可、进步——在游戏里是拿不到的。',
    ],
    strong: [
      '你以为你想玩游戏，其实你只是想逃避。逃避那个你明知道自己该做却一直在拖的事情。游戏是你的逃生舱，但逃生舱永远到不了你想去的地方。',
      '游戏公司花了几十亿美金研究怎么让你上瘾。你一个人对抗一个产业，勇气可嘉，但方法不能是靠意志力硬扛——你要靠策略。',
    ],
  },
  shortVideo: {
    gentle: [
      '短视频利用了人类大脑对新奇信息的天然好奇心。你并不是意志力薄弱，而是面对了一个被精心设计的、极其高效的注意力捕获系统。',
      '你可能只是想休息一下，大脑需要一点轻松的刺激来放松，这很正常。只是短视频给大脑的刺激太密集了，反而会让大脑更累。',
    ],
    firm: [
      '你打开短视频是想休息5分钟对吧？但数据显示，用户平均一刷就是47分钟。你的大脑正在被算法精准投喂——你不是在休息，你是在被消费。',
      '短视频的可怕之处在于它让你觉得「再看一个也没什么」。但每一个「一个」都在训练你的大脑变得无法忍受哪怕10秒的无聊。你正在毁掉自己的专注力。',
    ],
    strong: [
      '算法比你妈还了解你。它知道什么时候给你推什么内容能让你停不下来。你以为在娱乐，其实你是产品——你的时间和注意力被卖掉换广告费了。',
      '刷短视频不会让你放松，它会让你的多巴胺受体越来越麻木，让你对正常速度的生活失去耐心。你确定要为了几个15秒的刺激，牺牲你深度思考的能力吗？',
    ],
  },
  eating: {
    gentle: [
      '想吃东西可能有很多原因——真的饿了、情绪低落需要安慰、或者只是嘴巴想要一点刺激。先问问自己是哪一种，好吗？',
      '吃东西是身体在寻求安慰的方式之一。也许你现在需要的是休息、陪伴或者一个拥抱，而不是食物。',
    ],
    firm: [
      '你不是饿了，你是想用食物填满一个食物填不满的空洞——可能是压力、孤独、焦虑或者无聊。食物只能给你5分钟的满足，然后你还要面对剩下的所有东西，外加一份愧疚。',
      '暴食是身体在对你喊「我需要什么」。但你喂给它的从来不是它真正要的。休息、运动、和人聊聊——这些东西才是你的身体在要的。',
    ],
    strong: [
      '现在吃下去的东西，不会消失，会变成你明天早上的后悔和你身体里实实在在的脂肪。你每一次情绪化进食都是在训练自己一难受就找食物。这个模式你准备带到几岁？',
      '你不是肚子饿，你是心里空。食物填不了那个空洞。吃完了你会更难受——因为除了原来的问题，你还多了一层对自己的失望。别干这种赔本买卖。',
    ],
  },
  stayUp: {
    gentle: [
      '晚上总是很难放下手机或关掉电脑，因为这是一天中唯一完全属于自己的时间。但这种自由是从明天的你那里偷来的。',
      '不想睡觉可能是因为白天没有做让自己满意的事情，舍不得结束这一天。但明天还有一个你在等你给他一个好状态。',
    ],
    firm: [
      '你现在不睡，明天就会后悔。你明天的大脑会比现在笨30%，你的情绪会更不稳定，你的自控力会降到谷底——然后你会更容易放纵，形成一个恶行循环。',
      '熬夜的本质是用明天的精力换今晚的虚假自由。这笔买卖怎么算都是亏的。睡吧。',
    ],
    strong: [
      '你以为熬夜是多赚了几个小时，其实你是在透支你未来的认知能力、情绪稳定性和身体健康。你今天熬的每一个小时，都是在给未来的自己挖坑。',
      '你知道睡眠不足会让你第二天更容易冲动、更难以自控、工作效率更低吗？你这不是在放松，你是在系统性摧毁自己的自控力基础设施。',
    ],
  },
  procrastination: {
    gentle: [
      '不想学习的感觉太正常了。学习需要消耗大量能量，而大脑天生喜欢节能。这不是你的错，但你有办法应对它。',
      '你可能不是不想学，而是被任务的庞大吓到了，或者害怕自己学不好。你不需要做到完美，你只需要开始五分钟。',
    ],
    firm: [
      '你现在不想学习，不是因为你学不进去，而是因为你的大脑在逃避困难。但困难不会因为你拖延就消失——它只会变大，然后在截止日期前夜把你压垮。',
      '拖延的本质是情绪管理问题，不是时间管理问题。你在逃避的不是学习本身，而是学习带来的焦虑感。但每次拖延之后焦虑只会加倍奉还。',
    ],
    strong: [
      '你还要骗自己多少次？「明天一定开始」这句话你说过多少遍？你每一次拖延都是在跟自己说「没关系，反正明天再说」。但那个明天永远不会自己来。',
      '拖延是一种慢性自我伤害。你拖延的每一分钟，都是在把未来的自己往更深的焦虑和更差的成绩里推。别再对自己做这件事了。',
    ],
  },
  socialMedia: {
    gentle: [
      '想要看看别人的动态是很自然的——我们是社会性动物，渴望连接和归属感。但刷社交媒体往往让人觉得更孤独，因为它展示的都是别人生活的精选集。',
      '你可能只是想确认自己没有错过什么重要的事。但大多数时候，你刷到的都是你不需要知道的信息。',
    ],
    firm: [
      '社交媒体给你的不是连接，是连接的幻觉。你刷了半小时朋友圈，真正跟谁建立了有意义的联系吗？你只是在消费别人的生活碎片，自己的时间却被碎片化了。',
      '那些点赞和评论给你的多巴胺飙升是真实的，但也是廉价的。它不会让你更快乐，只会让你对现实中的社交越来越不适应。',
    ],
    strong: [
      '你刷的每一条动态都是别人精心包装过的表演。你在拿自己的真实生活跟别人的高光时刻比较，然后觉得自己不够好。然后你继续刷，继续觉得自己不够好。这个循环你还要继续多久？',
      '社交媒体是注意力经济最成功的产品——它免费，因为你就是商品。你花在上面的每一分钟，都在为别人创造财富，同时消耗你自己的生命。',
    ],
  },
  shopping: {
    gentle: [
      '想买东西的冲动可能来自情绪需求——不开心了、压力大了、或者想奖励自己。但买东西带来的快乐通常很短暂。',
      '下单那一瞬间的快乐是真实的，但快递拆完之后的空虚也是真实的。也许可以先等等，看看这个冲动会持续多久。',
    ],
    firm: [
      '你不是真的需要那个东西——你是被广告和算法说服了。你现在加进购物车的每一样东西，一星期后你回头看，有一半你根本不需要。',
      '冲动消费是商家最希望你做的事情。他们设计了一整套心理战术从「限时折扣」到「仅剩3件」，就是让你来不及思考。停下来，你已经识破了这个套路。',
    ],
    strong: [
      '你知道什么是「零售疗法」吗？就是用花钱来治疗情绪问题。它的问题是——钱花完了，问题还在。而且你还多了信用卡账单和一堆不用的东西。',
      '你现在的购物欲不是真正的需求，是你的大脑在找捷径获取多巴胺。花钱的快感撑不过24小时，但它的后果会持续影响你几个月。',
    ],
  },
};

// 放纵后果
const CONSEQUENCES = {
  gentle: [
    '如果现在顺从了冲动，短期内可能会感到轻松或快乐，但这可能会让你离自己真正想要的目标又远了一小步。',
    '每一次顺从冲动，都在强化这个习惯回路。好消息是，每一次拒绝它，也在强化你自控的肌肉。',
  ],
  firm: [
    '如果现在放纵了，你可能会获得30分钟到2小时的短暂满足——然后是无尽的自责、焦虑和时间损失。这个模式你已经经历过很多次了，你知道结局是什么。',
    '放纵之后你会有什么感觉？短暂的快乐，然后是愧疚、后悔，还有那些被你推迟的重要事情带来的更大压力。这笔账，不划算。',
  ],
  strong: [
    '如果你现在做了这件事——你知道接下来会发生什么：先是几分钟的快感，然后是几小时甚至几天的自我厌恶。「你怎么又这样」「你太没用了」——这些话你对自己说过多少遍了？够了。',
    '放纵的唯一结果就是回到原点——不，比原点更差。因为你会带着更多的愧疚、更少的时间、更低的自我效能感，去面对那些本来就要面对的事情。',
  ],
};

// 10分钟替代行动
const ALTERNATIVES = {
  gaming: [
    '站起来，离开你现在坐的地方。去倒一杯水，走到窗边看外面3分钟。然后打开一个15分钟以内的 TED 演讲或者科普视频——用有营养的内容替代游戏。',
    '做20个深蹲 + 20个俯卧撑，让你的心率上来。生理状态改变之后，心理状态会自动改变。然后用纸笔写下「我现在最重要的三件事是什么」，挑一件做第一个5分钟。',
    '关闭所有电子屏幕，定一个10分钟的闹钟，然后拿出一张纸，画一个简单的思维导图：你未来三个月最想达成的是什么？中间有哪些障碍？不用完美，画就行。',
    '打开手机备忘录，给自己写一封信，开头是「亲爱的未来的我，现在是[时间]，我刚才差点又去打游戏了，但我选择了先写这封信……」一直写到闹钟响。',
    '把你最该做但一直在拖的那件事拿出来，对自己说：「我只做5分钟，做完5分钟如果还想打游戏我就去打。」——你知道一旦开始了，大概率会继续做下去。',
  ],
  shortVideo: [
    '立刻把手机屏幕朝下放在桌子另一边。站起来伸展身体30秒。然后找一本纸质书或一篇长文章（至少3000字），认真读10分钟。让你的大脑重新习惯慢节奏的信息。',
    '关掉手机通知，打开勿扰模式。用这10分钟收拾你房间里最乱的一个角落——当外部环境变整洁，你的内心也会跟着变清晰。',
    '打开一个空白文档或拿出纸笔，写「我今天想刷短视频是因为……」然后一直写，不删不改，写满10分钟。你会惊讶地发现自己原来有那么多话想说。',
    '打开一个学习类 App（比如得到、极客时间、Coursera），找一个你感兴趣的课程，只看一节课的前10分钟。用深度学习替代浅层刺激。',
    '做一组拉伸运动——颈部、肩部、背部。长时间刷手机让你的身体已经很紧张了。用这10分钟照顾你的身体，而不是继续虐待它。',
  ],
  eating: [
    '先喝一大杯水（很多时候渴了会被误判为饿了）。然后嚼一颗口香糖或者刷个牙——干净的嘴里再放食物会觉得浪费了那份清爽。',
    '离开厨房或放零食的地方，去另一个房间。写下「我现在的感受是什么」，列出3个描述情绪的词。如果还是饿，吃一个苹果或一根香蕉，而不是零食。',
    '给自己泡一杯茶——绿茶、红茶、花茶都行。慢慢喝，感受温度。喝完这杯茶大概需要8-10分钟。喝茶的过程就是一种冥想。',
    '做10分钟轻度运动——原地踏步、拉伸、或者出门快走一圈。运动能释放内啡肽，和吃东西激活的是不同的满足感通道。',
    '给你一个很久没联系的朋友发一条真诚的消息，问问他们最近怎么样。建立真实的连接，比用食物填满孤独感有效得多。',
  ],
  stayUp: [
    '现在立刻关掉所有屏幕——手机、电脑、平板全关。去洗个热水澡或者用热水泡脚5分钟。然后躺到床上，关灯，做5次深呼吸（每次吸气4秒，呼气6秒）。',
    '离开你现在待的地方，去刷个牙、洗把脸。做完晚间护肤流程。这个仪式会告诉你的身体：「今天结束了，该休息了」。',
    '躺在床上，打开一个无聊但温和的播客或有声书（不要看屏幕），定时10分钟自动关闭。把注意力从「要睡觉」转移到「听故事」上，你会发现自己很快就困了。',
    '拿出一张纸和一支笔，写下明天必须完成的三件事。写完之后，你的大脑就不需要一直记着它们了——这能显著减少让你睡不着的焦虑感。',
    '做渐进式肌肉放松：从脚趾开始，依次收紧再放松身体的每一个部位，一直到头顶。这个过程大约需要10分钟，而且几乎保证会让你犯困。',
  ],
  procrastination: [
    '把你要做的任务拆成你能想到的最小步骤——小到什么程度？小到你觉得「这也太简单了吧」。比如「打开书」「翻到第42页」「读第一段」。然后只做第一步。',
    '设置一个5分钟的倒计时，对自己说：「我只做5分钟，时间一到就可以停。」这个技巧叫「番茄钟入门版」——它绕过了你对「开始」的恐惧。',
    '站起来，把你的手机放到另一个房间。然后回到桌前，打开你要做的东西，只盯着第一行或第一段看。不做别的，就盯着看。你的大脑会自动想要开始。',
    '用「如果……就……」公式给自己下一个具体指令。例如：「如果我坐到书桌前，我就打开课本翻到上一次看的那一页。」具体到不需要任何思考——因为思考会给拖延可乘之机。',
    '先做一件跟学习无关但有益的小事——比如整理桌面、倒一杯水、拉开窗帘。这些小动作会给你一个小小的「完成感」和动量，然后趁势进入学习任务。',
  ],
  socialMedia: [
    '把手机调成灰度模式（设置→辅助功能→显示→色彩滤镜→灰度）。你会发现那个五颜六色的世界突然失去了吸引力。这是个极其有效的小技巧。',
    '关掉社交媒体的通知权限——不是免打扰，是直接关掉通知。未来10分钟，打开一本你一直想读但总是「没时间」的书，哪怕只读几页。',
    '给一个真实的、你关心的人打一个电话或发一条语音消息。不是文字，是声音。真实的对话比刷一百条朋友圈更能满足你对连接的需求。',
    '打开手机上某个创作类 App——备忘录、画图、录音都行。自己创造点什么出来，哪怕只是一段文字或一张涂鸦。创造比消费更能让你感受到自己的存在。',
    '走到户外（哪怕只是楼下小区里）走10分钟，不带耳机。听周围的声音，看经过的人、树、天空。然后用三句话在备忘录里写下你观察到的、让你感兴趣的一个细节。',
  ],
  shopping: [
    '把你购物车里的东西全部移到「收藏夹」或「稍后再买」，然后关掉App。设置一个规则：任何超过50元的非必需品，必须等24小时之后再决定。现在，先去做点别的。',
    '打开你的银行App或记账软件，看看这个月已经花了多少钱。然后问自己：这个东西你真的需要吗？一周后你还会想要它吗？把答案写下来。',
    '用这10分钟整理你已经拥有的东西——衣柜、书桌、或者手机App。你会发现你已经有太多「买了但没用」的东西了，这会让你对新的购物冲动产生自然的抵抗力。',
    '如果你是被某个博主或广告种草的，用10分钟去搜这个东西的负面评价。会给你一个更全面的视角，冲动的热度很快就会降下来。',
    '把这笔钱转到一个你不太容易动用的账户里（比如定期理财或另一个银行卡），就当已经花掉了。你会发现自己其实更在意「花钱」这个行为，而不是那个东西本身。',
  ],
};

// 行动提醒
const ACTION_REMINDERS = {
  gentle: [
    '你已经做得很好了——光是停下来问自己这个问题，就已经超越了大多数人。现在，选一个替代行动，温和地开始吧。',
    '冲动是一个波浪，它来了也会走。你不需要用力抵抗，只需要在上面漂浮一会儿。深呼吸，然后行动。',
  ],
  firm: [
    '你不是你的冲动。你是那个可以观察到冲动、并选择不按它行动的人。现在，去做那件你真正该做的事。就10分钟，没有借口。',
    '这一次，选不一样。你已经很清楚旧模式会通向哪里。试试一条新的路——只需要10分钟。',
  ],
  strong: [
    '记住你现在这种感觉——拒绝冲动之后的清醒和掌控感。这比你放纵之后的任何一个时刻都要好上一百倍。现在，去行动。',
    '你已经赢了。在你停下来输入那句话的那一刻，你就已经比那个只想放纵的自己强了。现在把这份力量用到行动上。立刻，马上。',
  ],
};

// 默认兜底内容
const DEFAULT_RESPONSES = {
  gentle: {
    stop: '先停一下。你不需要马上做决定，只需要给自己一个短暂的暂停。深呼吸，我们一起来看看发生了什么。',
    reason: '冲动通常不是凭空出现的——它可能来自压力、疲劳、无聊或者某种未被满足的需求。你能觉察到它，这本身就是一种力量。',
    consequence: '如果现在顺从了冲动，可能会获得短暂的轻松，但也可能会让你离自己真正想要的方向更远一点。',
  },
  firm: {
    stop: '停。注意到这个冲动了，很好。现在问自己：这真的是我想要的，还是只是习惯在推我？',
    reason: '你的大脑在寻求快速的多巴胺——这很人类，但不必被它控制。你比你的神经回路更有智慧。',
    consequence: '顺从冲动的后果你很清楚：短暂的满足，然后是无尽的后悔和更多拖延。这个模式你已经经历过太多次了。',
  },
  strong: {
    stop: '站住！你脑子里那个声音在骗你。它说「就这一次」，但你比谁都清楚——从来没有就这一次。',
    reason: '你的大脑被训练出了这条神经高速公路——一遇到压力或无聊就自动奔向放纵。但高速公路是可以被废弃的，只要你开始走另一条路。',
    consequence: '你知道放纵之后会怎样：快感→空虚→愧疚→更想放纵。这个循环你已经转了无数圈了。是时候踩刹车了，不是明天，不是下一次——就现在。',
  },
};

// ---- 倒计时与统计 ----
const COUNTDOWN_MINUTES = 10;
const COUNTDOWN_SECONDS = COUNTDOWN_MINUTES * 60;
const CIRCUMFERENCE = 2 * Math.PI * 52; // r=52 from SVG

let countdownTimer = null;
let countdownRemaining = COUNTDOWN_SECONDS;
let countdownEndTime = null;
let currentImpulseText = '';

// ---- 干预任务 ----
const INTERVENTION_TASKS = [
  {
    title: '先让身体冷静下来',
    content: '放下手机，跟着呼吸节奏做 5 次深呼吸。吸气 4 秒，呼气 6 秒。',
  },
  {
    title: '离开冲动现场',
    content: '站起来，离开现在的位置，去倒一杯水，或者走到窗边待 30 秒。',
  },
  {
    title: '说出真正原因',
    content: '问自己：我现在是压力大、无聊、太累，还是在逃避某个任务？',
  },
  {
    title: '做一个最小行动',
    content: '只做 5 分钟你真正该做的事。不是完成它，只是开始它。',
  },
];

let currentTaskIndex = 0;

const TRIGGER_OPTIONS = ['压力太大', '太无聊', '太累了', '逃避任务', '情绪低落', '习惯性打开'];
const ACTION_OPTIONS = ['放下手机 10 分钟', '喝水洗脸', '离开当前位置', '打开任务只做 5 分钟', '出门走一圈', '给朋友发消息'];

let selectedTrigger = null;
let selectedAction = null;

function loadSuccessCount() {
  try {
    return parseInt(localStorage.getItem('impulse_success_count') || '0', 10);
  } catch {
    return 0;
  }
}

function saveSuccessCount(count) {
  try {
    localStorage.setItem('impulse_success_count', String(count));
  } catch { /* noop */ }
}

function incrementSuccessCount() {
  const count = loadSuccessCount() + 1;
  saveSuccessCount(count);
  const el = document.getElementById('success-count');
  el.textContent = count;
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

function saveCountdownState(endTime) {
  try {
    localStorage.setItem('impulse_countdown_end', String(endTime));
  } catch { /* noop */ }
}

function clearCountdownState() {
  try {
    localStorage.removeItem('impulse_countdown_end');
  } catch { /* noop */ }
}

function startCountdown() {
  console.log('[冲动拦截器] startCountdown 被调用');

  const section = document.getElementById('countdown-section');
  const progress = document.getElementById('countdown-progress');
  const doneBtn = document.getElementById('countdown-done-btn');
  const giveupBtn = document.getElementById('countdown-giveup-btn');
  const messageEl = document.querySelector('.countdown-message');

  if (!section || !progress || !doneBtn || !giveupBtn || !messageEl) {
    console.error('[冲动拦截器] 倒计时 DOM 元素缺失');
    return;
  }

  // 取消旧定时器
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }

  // 隐藏复盘内容（如果有的话）
  document.getElementById('review-section').classList.add('hidden');
  document.getElementById('review-result-card').classList.add('hidden');

  // 切换到激活状态
  section.classList.remove('hidden', 'standby', 'completed');
  doneBtn.classList.add('hidden');
  giveupBtn.classList.remove('hidden');
  messageEl.textContent = '冲动峰值通常只持续几分钟，撑过去就好了。';

  countdownRemaining = COUNTDOWN_SECONDS;
  countdownEndTime = Date.now() + countdownRemaining * 1000;
  saveCountdownState(countdownEndTime);

  updateCountdownDisplay();

  // 显示任务卡片，从第1步开始
  showTaskCard();

  countdownTimer = setInterval(() => {
    const now = Date.now();
    countdownRemaining = Math.max(0, Math.ceil((countdownEndTime - now) / 1000));
    updateCountdownDisplay();

    if (countdownRemaining <= 0) {
      completeCountdown();
    }
  }, 250);

  console.log('[冲动拦截器] 倒计时已启动，结束时间:', new Date(countdownEndTime).toLocaleTimeString());
}

function updateCountdownDisplay() {
  const mins = Math.floor(countdownRemaining / 60);
  const secs = countdownRemaining % 60;
  document.getElementById('countdown-time').textContent =
    `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  // fraction: 1 at start → 0 at end (ring empties as time passes)
  const fraction = countdownRemaining / COUNTDOWN_SECONDS;
  document.getElementById('countdown-progress').style.strokeDashoffset =
    CIRCUMFERENCE * (1 - fraction);
}

function completeCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
  clearCountdownState();

  const section = document.getElementById('countdown-section');
  const doneBtn = document.getElementById('countdown-done-btn');
  const giveupBtn = document.getElementById('countdown-giveup-btn');

  section.classList.add('completed');
  doneBtn.classList.remove('hidden');
  giveupBtn.classList.add('hidden');
  document.getElementById('countdown-time').textContent = '00:00';
  document.getElementById('countdown-progress').style.strokeDashoffset = String(CIRCUMFERENCE);
  document.querySelector('.countdown-message').textContent =
    '时间到！你撑过了最难的 10 分钟，冲动已经过去了。';

  // 任务卡片完成状态
  currentTaskIndex = INTERVENTION_TASKS.length;
  renderTask();

  incrementSuccessCount();
}

function cancelCountdown() {
  // 用户主动放弃 → 显示复盘表单
  showReviewForm();
}

// ---- 任务卡片 ----

function showTaskCard() {
  const card = document.getElementById('task-card');
  card.classList.remove('hidden');
  currentTaskIndex = 0;
  renderTask();
}

function hideTaskCard() {
  const card = document.getElementById('task-card');
  card.classList.add('hidden');
}

function resetTaskCard() {
  currentTaskIndex = 0;
  document.getElementById('task-card').classList.add('hidden');
}

function renderTask() {
  const task = INTERVENTION_TASKS[currentTaskIndex];
  const total = INTERVENTION_TASKS.length;
  const isLast = currentTaskIndex === total - 1;
  const isDone = currentTaskIndex >= total;

  document.getElementById('task-progress').textContent =
    isDone ? `全部完成` : `第 ${currentTaskIndex + 1} 步 / ${total} 步`;

  if (isDone) {
    document.getElementById('task-title').textContent = '你完成了这次拦截训练';
    document.getElementById('task-content').textContent = '冲动已经明显减弱，你比刚才更有掌控力了。继续撑住！';
    document.getElementById('breathing-guide').classList.add('hidden');
    const btn = document.getElementById('task-next-btn');
    btn.textContent = '任务完成，继续撑住';
    btn.classList.add('completed');
    return;
  }

  document.getElementById('task-title').textContent = task.title;
  document.getElementById('task-content').textContent = task.content;

  // 呼吸引导只在第1步显示
  const breathingGuide = document.getElementById('breathing-guide');
  if (currentTaskIndex === 0) {
    breathingGuide.classList.remove('hidden');
  } else {
    breathingGuide.classList.add('hidden');
  }

  const btn = document.getElementById('task-next-btn');
  btn.textContent = isLast ? '我完成了，最后一步' : '我完成了，下一步';
  btn.classList.remove('completed');
  btn.style.pointerEvents = '';
}

function handleTaskNext() {
  if (currentTaskIndex >= INTERVENTION_TASKS.length) {
    return; // 已完成，不处理
  }

  currentTaskIndex++;

  if (currentTaskIndex >= INTERVENTION_TASKS.length) {
    // 全部完成，显示完成状态
    renderTask();
  } else {
    renderTask();
  }
}

function resetCountdownToStandby() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
  clearCountdownState();

  const section = document.getElementById('countdown-section');
  const doneBtn = document.getElementById('countdown-done-btn');
  const giveupBtn = document.getElementById('countdown-giveup-btn');

  section.classList.add('standby');
  section.classList.remove('hidden', 'completed');
  doneBtn.classList.add('hidden');
  giveupBtn.classList.add('hidden');
  countdownRemaining = COUNTDOWN_SECONDS;
  document.getElementById('countdown-time').textContent = '10:00';
  document.getElementById('countdown-progress').style.strokeDashoffset = '0';
  document.querySelector('.countdown-message').textContent =
    '输入冲动内容，点击「拦截冲动」开始 10 分钟倒计时。';

  hideTaskCard();
}

function resumeCountdown(endTime) {
  countdownEndTime = endTime;
  countdownRemaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));

  if (countdownRemaining <= 0) {
    clearCountdownState();
    completeCountdown();
    return;
  }

  const section = document.getElementById('countdown-section');
  const doneBtn = document.getElementById('countdown-done-btn');
  const giveupBtn = document.getElementById('countdown-giveup-btn');

  section.classList.remove('hidden', 'standby', 'completed');
  doneBtn.classList.add('hidden');
  giveupBtn.classList.remove('hidden');
  updateCountdownDisplay();

  // 恢复倒计时时显示任务卡片，从第1步重新开始
  showTaskCard();

  countdownTimer = setInterval(() => {
    const now = Date.now();
    countdownRemaining = Math.max(0, Math.ceil((countdownEndTime - now) / 1000));
    updateCountdownDisplay();

    if (countdownRemaining <= 0) {
      completeCountdown();
    }
  }, 250);
}

// ---- 复盘功能 ----

function showReviewForm() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
  clearCountdownState();

  const countdownSection = document.getElementById('countdown-section');
  const reviewSection = document.getElementById('review-section');

  countdownSection.classList.add('hidden');
  reviewSection.classList.remove('hidden');

  // 用户进入复盘，隐藏任务卡片
  hideTaskCard();

  // 预填冲动内容
  document.getElementById('review-impulse').value = currentImpulseText;

  // 重置选择
  selectedTrigger = null;
  selectedAction = null;
  document.querySelectorAll('#trigger-options .review-option-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('#action-options .review-option-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('review-submit-btn').disabled = true;

  reviewSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderReviewOptions() {
  const triggerContainer = document.getElementById('trigger-options');
  const actionContainer = document.getElementById('action-options');

  triggerContainer.innerHTML = TRIGGER_OPTIONS.map(opt =>
    `<button class="review-option-btn" data-value="${opt}">${opt}</button>`
  ).join('');

  actionContainer.innerHTML = ACTION_OPTIONS.map(opt =>
    `<button class="review-option-btn" data-value="${opt}">${opt}</button>`
  ).join('');

  // 诱因选择
  triggerContainer.querySelectorAll('.review-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      triggerContainer.querySelectorAll('.review-option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTrigger = btn.dataset.value;
      checkReviewReady();
    });
  });

  // 行动选择
  actionContainer.querySelectorAll('.review-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      actionContainer.querySelectorAll('.review-option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAction = btn.dataset.value;
      checkReviewReady();
    });
  });
}

function checkReviewReady() {
  const submitBtn = document.getElementById('review-submit-btn');
  submitBtn.disabled = !(selectedTrigger && selectedAction);
}

function handleReviewSubmit() {
  const impulse = document.getElementById('review-impulse').value.trim() || currentImpulseText;
  const trigger = selectedTrigger;
  const action = selectedAction;

  if (!trigger || !action) return;

  const reviewText = `这次不是失败，是一次识别。

你刚才的冲动是：${impulse}
主要诱因是：${trigger}
下次预案是：当我再次${impulse}时，我${action}。`;

  const adviceText = `下次拦截建议：
不要等冲动变到 90 分才打开这个网站。
当冲动刚到 40 分时，就来拦截。`;

  document.getElementById('review-result-text').textContent = reviewText;
  document.getElementById('review-advice').innerHTML = `<p>${adviceText.replace(/\n/g, '<br>')}</p>`;

  // 隐藏表单，显示结果
  document.getElementById('review-section').classList.add('hidden');
  document.getElementById('review-result-card').classList.remove('hidden');
  document.getElementById('review-result-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // 保存复盘记录
  saveReview({ impulse, trigger, nextAction: action, time: Date.now() });
  renderRecentReviews();
}

function saveReview(entry) {
  try {
    const reviews = JSON.parse(localStorage.getItem('impulse_reviews') || '[]');
    reviews.unshift(entry);
    if (reviews.length > 50) reviews.length = 50;
    localStorage.setItem('impulse_reviews', JSON.stringify(reviews));
  } catch { /* noop */ }
}

function loadReviews() {
  try {
    return JSON.parse(localStorage.getItem('impulse_reviews') || '[]');
  } catch {
    return [];
  }
}

function renderRecentReviews() {
  const reviews = loadReviews().slice(0, 3);
  const list = document.getElementById('recent-reviews-list');
  const section = document.getElementById('recent-reviews-section');

  if (reviews.length === 0) {
    list.innerHTML = '<p class="recent-reviews-empty">暂无复盘记录</p>';
    return;
  }

  list.innerHTML = reviews.map((r, i) => {
    const time = new Date(r.time);
    const timeStr = `${time.getMonth() + 1}/${time.getDate()} ${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    return `
      <div class="review-item">
        <div class="review-item-header">
          <span class="review-item-index">#${i + 1}</span>
          <span class="review-item-time">${timeStr}</span>
        </div>
        <div class="review-item-body">
          <span>${escapeHTML(r.impulse)}</span>
          <span class="review-item-sep">|</span>
          诱因：<span>${escapeHTML(r.trigger)}</span>
          <span class="review-item-sep">|</span>
          下次：<span>${escapeHTML(r.nextAction)}</span>
        </div>
      </div>`;
  }).join('');
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---- 工具箱函数 ----

/** 检测冲动类别 */
function detectCategory(text) {
  const lower = text.toLowerCase();
  const scores = {};

  for (const [key, cat] of Object.entries(CATEGORIES)) {
    let score = 0;
    for (const kw of cat.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        score += kw.length >= 3 ? 2 : 1; // 长关键词权重更高
      }
    }
    if (score > 0) scores[key] = score;
  }

  if (Object.keys(scores).length === 0) return null; // 无匹配，使用默认

  // 返回得分最高的类别
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

/** 随机选取数组元素 */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** 根据强度获取色调 */
function intensityColor(intensity) {
  return { gentle: 'gentle', firm: 'firm', strong: 'strong' }[intensity];
}

/** 强度中文名 */
function intensityLabel(intensity) {
  return { gentle: '温和模式', firm: '坚定模式', strong: '强力模式' }[intensity];
}

// ---- 核心生成函数 ----

function generateResponse(text, intensity) {
  const category = detectCategory(text);

  // 叫停
  let stop;
  if (category && REASON_ANALYSES[category]) {
    stop = pick(STOP_SIGNALS[intensity]);
  } else {
    stop = DEFAULT_RESPONSES[intensity].stop;
  }

  // 原因分析
  let reason;
  if (category && REASON_ANALYSES[category]) {
    reason = pick(REASON_ANALYSES[category][intensity]);
  } else {
    reason = DEFAULT_RESPONSES[intensity].reason;
  }

  // 后果
  let consequence;
  if (intensity in CONSEQUENCES) {
    consequence = pick(CONSEQUENCES[intensity]);
  } else {
    consequence = DEFAULT_RESPONSES[intensity].consequence;
  }

  // 替代行动
  let alternative;
  if (category && ALTERNATIVES[category]) {
    alternative = pick(ALTERNATIVES[category]);
  } else {
    // 没有匹配类别时，混合所有替代行动随机选
    const all = Object.values(ALTERNATIVES).flat();
    alternative = pick(all);
  }

  // 行动提醒
  const reminder = pick(ACTION_REMINDERS[intensity]);

  return {
    stop,
    reason,
    consequence,
    alternative,
    reminder,
    intensity,
    category,
  };
}

// ---- 界面逻辑 ----

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('impulse-input');
  const charCount = document.getElementById('char-count');
  const interceptBtn = document.getElementById('intercept-btn');
  const resultCard = document.getElementById('result-card');
  const newInterceptBtn = document.getElementById('new-intercept-btn');
  const intensityBtns = document.querySelectorAll('.intensity-btn');

  let currentIntensity = 'firm';

  // 字符计数
  input.addEventListener('input', () => {
    const len = input.value.length;
    charCount.textContent = len;
    charCount.style.color = len > 180 ? 'var(--danger)' : 'var(--text-muted)';
  });

  // 强度选择
  intensityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      intensityBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      currentIntensity = btn.dataset.intensity;
    });
  });

  // 键盘提交 (Ctrl+Enter)
  input.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleIntercept();
    }
  });

  // 拦截按钮
  interceptBtn.addEventListener('click', handleIntercept);

  // 重新拦截
  newInterceptBtn.addEventListener('click', resetForm);

  function handleIntercept() {
    const text = input.value.trim();
    currentImpulseText = text;
    console.log('[冲动拦截器] handleIntercept 被调用, 输入:', text || '(空)');

    if (!text) {
      input.focus();
      input.style.borderColor = 'var(--danger)';
      input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
      setTimeout(() => {
        input.style.borderColor = 'var(--border)';
        input.style.boxShadow = 'none';
      }, 1500);
      return;
    }

    // 按钮加载状态
    interceptBtn.disabled = true;
    interceptBtn.classList.add('loading');
    interceptBtn.querySelector('.btn-text').textContent = '正在生成';

    // 模拟短暂延迟，让用户感觉到「正在处理」
    setTimeout(() => {
      const response = generateResponse(text, currentIntensity);
      startCountdown();
      renderResult(response, text);
    }, 600);
  }

  function renderResult(response, userText) {
    // 设置徽章
    const badge = document.getElementById('result-badge');
    badge.textContent = intensityLabel(response.intensity);
    badge.className = `result-badge ${intensityColor(response.intensity)}`;

    // 时间戳
    const now = new Date();
    document.getElementById('result-timestamp').textContent =
      now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

    // 填充各区块
    const blocks = resultCard.querySelectorAll('.result-block');
    blocks[0].querySelector('.block-content').textContent = response.stop;
    blocks[1].querySelector('.block-content').textContent = response.reason;
    blocks[2].querySelector('.block-content').textContent = response.consequence;
    blocks[3].querySelector('.block-content').textContent = response.alternative;
    blocks[4].querySelector('.cta-text').textContent = response.reminder;

    // 显示结果
    resultCard.classList.remove('hidden');
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // 恢复按钮
    interceptBtn.disabled = false;
    interceptBtn.classList.remove('loading');
    interceptBtn.querySelector('.btn-text').textContent = '拦截冲动';

    // 保存到历史
    saveToHistory({
      userText,
      intensity: response.intensity,
      category: response.category,
      time: Date.now(),
    });
  }

  function resetForm() {
    resetCountdownToStandby();
    // 隐藏复盘相关内容
    document.getElementById('review-section').classList.add('hidden');
    document.getElementById('review-result-card').classList.add('hidden');
    resultCard.classList.add('hidden');
    input.value = '';
    charCount.textContent = '0';
    currentImpulseText = '';
    selectedTrigger = null;
    selectedAction = null;
    input.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---- 倒计时按钮 ----
  document.getElementById('countdown-giveup-btn').addEventListener('click', () => {
    cancelCountdown();
  });

  document.getElementById('countdown-done-btn').addEventListener('click', () => {
    document.getElementById('countdown-section').classList.add('hidden');
  });

  // 任务卡片按钮
  document.getElementById('task-next-btn').addEventListener('click', handleTaskNext);

  // ---- 复盘按钮 ----
  renderReviewOptions();

  document.getElementById('review-submit-btn').addEventListener('click', handleReviewSubmit);

  document.getElementById('review-dismiss-btn').addEventListener('click', () => {
    document.getElementById('review-result-card').classList.add('hidden');
    resetCountdownToStandby();
  });

  // ---- 初始化统计 ----
  document.getElementById('success-count').textContent = loadSuccessCount();
  renderRecentReviews();

  // ---- 检查并恢复/清理倒计时状态 ----
  try {
    const savedEnd = localStorage.getItem('impulse_countdown_end');
    console.log('[冲动拦截器] 初始化, 检查保存的倒计时:', savedEnd);
    if (savedEnd) {
      const endTime = parseInt(savedEnd, 10);
      if (Number.isNaN(endTime)) {
        clearCountdownState();
      } else if (Date.now() < endTime) {
        console.log('[冲动拦截器] 恢复倒计时, 剩余:', Math.ceil((endTime - Date.now()) / 1000), '秒');
        resumeCountdown(endTime);
      } else {
        console.log('[冲动拦截器] 倒计时已过期, 自动记录成功');
        clearCountdownState();
        incrementSuccessCount();
      }
    }
  } catch (e) {
    console.error('[冲动拦截器] 恢复倒计时失败:', e);
    clearCountdownState();
  }

  // ---- 本地历史记录 ----
  function saveToHistory(entry) {
    try {
      const history = JSON.parse(localStorage.getItem('impulse_history') || '[]');
      history.unshift(entry);
      if (history.length > 50) history.length = 50;
      localStorage.setItem('impulse_history', JSON.stringify(history));
    } catch {
      // localStorage 不可用时静默失败
    }
  }
});
