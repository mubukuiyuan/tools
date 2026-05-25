import { ALL_FOODS } from "../data/foods.js"

const categoryColors = {
  "水果": "#FFF1E6",
  "饮品": "#E8F4FD",
  "蛋白质": "#FFF0F0",
  "正餐": "#F0F9F0",
  "早餐": "#FFF7E6",
  "小吃/主食": "#FDF2E9",
  "主食": "#FFF5E6",
  "奖励餐": "#FFE8F0",
}

export default function FoodSelector({ onSelect }) {
  return (
    <div className="card food-selector-card" id="food-selector">
      <h2 className="card-title">或者直接记一笔</h2>
      <p className="card-subtitle">不抽盲盒也能直接记录哦</p>
      <div className="food-grid">
        {ALL_FOODS.map((food) => (
          <button
            key={food.name}
            className="food-btn"
            style={{ backgroundColor: categoryColors[food.category] || "#F5F5F5" }}
            onClick={() => onSelect(food)}
          >
            <span className="food-btn-name">{food.name}</span>
            <span className="food-btn-price">¥{food.price}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
