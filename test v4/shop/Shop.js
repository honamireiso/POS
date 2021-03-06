const Shop = {}

Shop.shop = {
  name: '早安! 美味堡',
  address: '金門縣金湖鎮漁村 107 號',
  tel: '(082)336-643',
  items: {  '乳酪豬排蛋': 60,
  '卡拉雞腿蛋': 55,
  '鐵路豬排蛋': 50,
  '勳雞蛋': 45,
  '肉排蛋(漢堡肉)': 45,
  '鮪魚蛋': 40,
  '鐵路豬排': 45 },
  addons: {'漢堡': 0 },
  isComeToShop: true,
  isMailToYou: false,
  isGoForYou: false
}

Shop.save = function () {
  const shop = Shop.shop
  Db.save('Shop', shop)
  if (!Fire.app) return
  if (shop.id == null || shop.id.length === 0) {
    shop.id = Fire.addByPath('/shops/', shop)
  } else {
    Fire.setByPath('/shops/'+shop.id+'/', shop)
  }
}

Shop.load = function () {
  Shop.shop = Db.load('Shop') || Shop.shop
}

Shop.mainPage = function () {
  Shop.load()
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
  Ui.title(Shop.shop.name)
}

Shop.todayReport = function () {
  Report.start({range: Lib.dayRange(new Date())})
}