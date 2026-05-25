# 🎁 小拆吃饭盲盒

专为小拆而建的健康饮食小助手。想吃又纠结的时候，抽一个食物，记一笔花销，简简单单地照顾好自己。

## 功能

- **吃饭盲盒** — 点击「抽一个吃的」从食物库里随机推荐一个食物，支持换一个、就吃这个
- **今日记录** — 记录今天吃了什么、每项价格、今日饮食总消费，数据存 localStorage
- **直接记一笔** — 不抽盲盒也能从食物库直接选择记录
- **温柔提示** — 根据记录情况显示鼓励文案，没有批评，只有关心

## 技术栈

React 18 + Vite · 纯前端 · localStorage 持久化 · 移动端优先

## 本地运行

```bash
npm install
npm run dev
```

## 构建部署

```bash
npm run build     # 输出到 dist/
npm run preview   # 预览构建结果
```

## 食物库

香蕉、美式、水煮鸡蛋、鸡蛋羹、食堂自选餐、素冒菜、酸奶燕麦、木薯羹、面包、海鲜粥、液断牛奶+茶、拿铁、肯德基全鸡、水煮玉米

## 项目结构

```
src/
├── main.jsx
├── App.jsx / App.css
├── data/foods.js          # 食物数据
├── utils/
│   ├── storage.js         # localStorage 读写
│   └── recommend.js       # 随机推荐逻辑
└── components/
    ├── Header.jsx         # 顶部欢迎区
    ├── BlindBox.jsx       # 吃饭盲盒卡片
    ├── TodayRecord.jsx    # 今日记录
    └── FoodSelector.jsx   # 直接记一笔
```
