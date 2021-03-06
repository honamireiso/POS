const Shop7 = {}

Shop7.shop = {
  name: '早安! 美味堡',
  address: '金門縣金湖鎮漁村 107 號',
  tel: '(082)336-643',
  items: {  "紅茶": 15,
  "奶茶": 20,
  "鮮奶茶": 30,
  "豆漿": 15,
  "百香果汁": 25,
  "招牌咖啡": 40,
  "美式咖啡": 40,
  "拿鐵咖啡": 50
},
  addons: {"正常": 0,
  "飲品加大": 5,
  "咖啡加大": 10
},
  isComeToShop: true,
  isMailToYou: false,
  isGoForYou: false
}

Shop7.save = function () {
  const shop = Shop7.shop
  Db.save('Shop7', shop)
  if (!Fire.app) return
  if (shop.id == null || shop.id.length === 0) {
    shop.id = Fire.addByPath('/shops/', shop)
  } else {
    Fire.setByPath('/shops/'+shop.id+'/', shop)
  }
}

Shop7.load = function () {
  Shop7.shop = Db.load('Shop7') || Shop7.shop
}

Shop.mainPage = function () {
  Shop7.load()
  // Ui.html('#header', ShopMain.headerHtml)
  // Ui.html('#menu', ShopMain.menuHtml)
  Ui.show(`
  <div>
    <button onclick="Pos.start()">新增訂單</button>
    <button onclick="Setting.start()">商店設定</button>
    <button onclick="Shop.todayReport()">本日報表</button>
    <button onclick="Report.start()">全部報表</button>
    <button onclick="Storage.start()">資料處理</button>
  </div>
  `)
  Ui.title(Shop7.shop.name)
}

Shop7.todayReport = function () {
  Report.start({range: Lib.dayRange(new Date())})
}