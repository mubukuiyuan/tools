const STORAGE_KEY = "xiaochai_health_records"

export function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export function getTodayRecords() {
  const today = getDateString()
  const all = loadRecords()
  return all[today] || []
}

export function addTodayRecord(food) {
  const today = getDateString()
  const all = loadRecords()
  if (!all[today]) all[today] = []

  const record = {
    id: Date.now(),
    name: food.name,
    price: food.price,
    category: food.category,
    time: getTimeString(),
    date: today,
  }

  all[today].push(record)
  saveRecords(all)
  return record
}

export function removeRecord(recordId) {
  const today = getDateString()
  const all = loadRecords()
  if (!all[today]) return

  all[today] = all[today].filter((r) => r.id !== recordId)
  saveRecords(all)
}

export function clearTodayRecords() {
  const today = getDateString()
  const all = loadRecords()
  delete all[today]
  saveRecords(all)
}

export function getDateString() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function getTimeString() {
  const d = new Date()
  const h = String(d.getHours()).padStart(2, "0")
  const m = String(d.getMinutes()).padStart(2, "0")
  return `${h}:${m}`
}
