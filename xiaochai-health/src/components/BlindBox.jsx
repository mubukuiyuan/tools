export default function BlindBox({ drawnFood, tip, onDraw, onAccept, onPass }) {
  return (
    <div className="card blindbox-card">
      <h2 className="card-title">🎁 吃饭盲盒</h2>

      {!drawnFood ? (
        <div className="blindbox-idle">
          <div className="blindbox-gift">🎀</div>
          <p className="blindbox-idle-text">还没打开今天的小盲盒哦</p>
          <button className="btn btn-draw" onClick={onDraw}>
            🎲 抽一个吃的
          </button>
        </div>
      ) : (
        <div className="blindbox-result">
          <div className="blindbox-reveal">
            <span className="blindbox-emoji">🍚</span>
            <p className="blindbox-reveal-text">这次抽到的是……</p>
          </div>

          <div className="blindbox-food-display">
            <span className="blindbox-food-name">{drawnFood.name}</span>
            <span className="blindbox-food-cat">{drawnFood.category}</span>
            <span className="blindbox-food-price">¥{drawnFood.price}</span>
          </div>

          <p className="blindbox-tip">{tip}</p>

          <div className="blindbox-actions">
            <button className="btn btn-primary" onClick={onAccept}>
              就吃这个
            </button>
            <button className="btn btn-outline" onClick={onDraw}>
              再换一个
            </button>
            <button className="btn btn-ghost" onClick={onPass}>
              不吃啦
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
