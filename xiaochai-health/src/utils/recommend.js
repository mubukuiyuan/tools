import { ALL_FOODS, getFoodByName } from "../data/foods.js"

const GENTLE_TIPS = [
  "这个轻轻松松的，很适合现在吃～",
  "感觉这个现在吃刚刚好～",
  "这个看起来很不错呢，试试看？",
  "今天抽到它，也算一种小幸运～",
  "不想吃也没关系，我们再换一个。",
  "这次抽到的是……",
  "这个简单又舒服，很适合小拆～",
  "哇，这个搭配今天的心情正好。",
]

export function drawOneFood(excludeName = null) {
  // 肯德基全鸡 15% 概率，其余均分
  const kfc = getFoodByName("肯德基全鸡")
  const others = ALL_FOODS.filter((f) => f.name !== "肯德基全鸡")

  let pool = [...others]
  if (!excludeName || excludeName !== "肯德基全鸡") {
    // 15% 概率放入肯德基全鸡（即加入 pool 时给它 15/85 的相对权重）
    if (Math.random() < 0.15) {
      pool.push(kfc)
    }
  }

  // 排除上一次抽到的食物
  if (excludeName) {
    pool = pool.filter((f) => f.name !== excludeName)
  }

  // 如果排除后 pool 为空，回退到全量（去掉排除项）
  if (pool.length === 0) {
    pool = ALL_FOODS.filter((f) => f.name !== excludeName)
  }

  const food = pool[Math.floor(Math.random() * pool.length)]
  const tip = GENTLE_TIPS[Math.floor(Math.random() * GENTLE_TIPS.length)]

  return { food, tip }
}
