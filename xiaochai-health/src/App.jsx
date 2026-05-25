import { useState, useEffect, useCallback } from "react"
import Header from "./components/Header.jsx"
import BlindBox from "./components/BlindBox.jsx"
import TodayRecord from "./components/TodayRecord.jsx"
import FoodSelector from "./components/FoodSelector.jsx"
import { drawOneFood } from "./utils/recommend.js"
import {
  getTodayRecords,
  addTodayRecord,
  removeRecord,
  clearTodayRecords,
} from "./utils/storage.js"
import "./App.css"

export default function App() {
  const [drawnFood, setDrawnFood] = useState(null)
  const [tip, setTip] = useState("")
  const [lastDrawn, setLastDrawn] = useState(null)
  const [records, setRecords] = useState([])
  const [toast, setToast] = useState(null)

  const refreshRecords = useCallback(() => {
    setRecords(getTodayRecords())
  }, [])

  useEffect(() => {
    refreshRecords()
  }, [refreshRecords])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  const handleDraw = () => {
    const { food, tip: newTip } = drawOneFood(lastDrawn)
    setDrawnFood(food)
    setTip(newTip)
    setLastDrawn(food.name)
  }

  const handleAccept = () => {
    if (!drawnFood) return
    addTodayRecord(drawnFood)
    refreshRecords()
    showToast("已经帮小拆记好啦～")
    setDrawnFood(null)
    setTip("")
  }

  const handlePass = () => {
    setDrawnFood(null)
    setTip("")
  }

  const handleSelect = (food) => {
    addTodayRecord(food)
    refreshRecords()
    showToast("记下啦～")
  }

  const handleRemove = (id) => {
    removeRecord(id)
    refreshRecords()
  }

  const handleClear = () => {
    clearTodayRecords()
    refreshRecords()
  }

  return (
    <div className="app">
      <div className="container">
        <Header />
        <BlindBox
          drawnFood={drawnFood}
          tip={tip}
          onDraw={handleDraw}
          onAccept={handleAccept}
          onPass={handlePass}
        />
        <TodayRecord
          records={records}
          onRemove={handleRemove}
          onClear={handleClear}
        />
        <FoodSelector onSelect={handleSelect} />
        <footer className="footer">
          <p>专为小拆而建 · 记得好好吃饭</p>
        </footer>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
