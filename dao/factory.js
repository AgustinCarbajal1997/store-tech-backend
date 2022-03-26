const { productDao, userDao, purchaseDao } = require("./subClassesDAO");
class Factory {
  models(model) {
    if (model === "product") return productDao;
    if (model === "user") return userDao;
    if (model === "purchase") return purchaseDao;
  }
}
const factory = new Factory();
module.exports = factory;
