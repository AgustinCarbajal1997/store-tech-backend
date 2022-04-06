const { productDao, userDao, purchaseDao } = require("./subClassesDAO");
const mongoose = require("mongoose");
const config = require("../config/config");
const { loggerConsole, loggerError } = require("../utils/loggers/settingsLogger");
class Factory {
  constructor() {
    this.connectDB();
  }
  models(model) {
    if (model === "product") return productDao;
    if (model === "user") return userDao;
    if (model === "purchase") return purchaseDao;
  }
  async connectDB() {
    try {
      await mongoose.connect(config.mongoDb.connectionStr);
      loggerConsole.info("Successful database connection");
    } catch (error) {
      loggerError.error("Ha ocurrido un error", error);
    }
  }
}
const factory = new Factory();
module.exports = factory;
