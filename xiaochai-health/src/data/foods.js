export const ALL_FOODS = [
  { name: "香蕉", price: 3, category: "水果" },
  { name: "美式", price: 0, category: "饮品" },
  { name: "水煮鸡蛋", price: 1.5, category: "蛋白质" },
  { name: "鸡蛋羹", price: 1.5, category: "蛋白质" },
  { name: "食堂自选餐", price: 14, category: "正餐" },
  { name: "素冒菜", price: 12, category: "正餐" },
  { name: "酸奶燕麦", price: 3, category: "早餐" },
  { name: "木薯羹", price: 12, category: "小吃/主食" },
  { name: "面包", price: 12, category: "主食" },
  { name: "海鲜粥", price: 12, category: "正餐" },
  { name: "液断牛奶+茶", price: 4, category: "饮品" },
  { name: "拿铁", price: 3.5, category: "饮品" },
  { name: "肯德基全鸡", price: 20, category: "奖励餐" },
  { name: "水煮玉米", price: 5, category: "主食" },
]

export const BREAKFAST_POOL = [
  "香蕉", "水煮鸡蛋", "鸡蛋羹", "酸奶燕麦",
  "木薯羹", "面包", "水煮玉米",
  "美式", "拿铁", "液断牛奶+茶",
]

export const LUNCH_POOL = [
  "食堂自选餐", "素冒菜", "海鲜粥", "肯德基全鸡",
]

export const DINNER_POOL = [
  "食堂自选餐", "素冒菜", "海鲜粥", "水煮玉米", "鸡蛋羹",
]

export const SNACK_POOL = [
  "香蕉", "美式", "拿铁", "液断牛奶+茶", "酸奶燕麦",
]

export function getFoodByName(name) {
  return ALL_FOODS.find((f) => f.name === name)
}
