import { getDateString } from "../utils/storage.js"

export default function TodayRecord({ records, onRemove, onClear }) {
  const total = records.reduce((sum, r) => sum + r.price, 0)
  const today = getDateString()

  const hasKFC = records.some((r) => r.name === "肯德基全鸡")

  let tip = ""
  if (records.length === 0) {
    tip = "今天还没有开始记录，没关系，想吃的时候再来～"
  } else if (records.length <= 2) {
    tip = "小拆已经开始好好吃饭啦，真棒。"
  } else if (hasKFC) {
    tip = "今天开到奖励餐啦，开心也很重要～"
  } else {
    tip = "今天记录得很认真，有在好好照顾自己哦。"
  }

  return (
    <div className="card record-card">
      <div className="record-header">
        <h2 className="card-title">今日记录</h2>
        <span className="record-date">{today}</span>
      </div>

      {records.length === 0 ? (
        <div className="record-empty">
          <span className="record-empty-icon">🍽️</span>
          <p>今天还没有记录哦，等小拆想吃的时候再来抽一个～</p>
        </div>
      ) : (
        <ul className="record-list">
          {records.map((r) => (
            <li key={r.id} className="record-item">
              <span className="record-item-cat">{r.category}</span>
              <span className="record-item-name">{r.name}</span>
              <span className="record-item-price">¥{r.price}</span>
              <span className="record-item-time">{r.time}</span>
              <button
                className="record-item-del"
                onClick={() => onRemove(r.id)}
                title="删除"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {records.length > 0 && (
        <div className="record-footer">
          <div className="record-total">
            今日饮食消费 <strong>¥{total}</strong>
          </div>
          <button className="btn btn-text" onClick={onClear}>
            清空记录
          </button>
        </div>
      )}

      <div className="tip-banner">{tip}</div>
    </div>
  )
}
