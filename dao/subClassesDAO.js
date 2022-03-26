const ContainerDAO = require("./containerDAO");
const ProductModel = require("../models/product");
const UserModel = require("../models/user");
const PurchaseModel = require("../models/purchases");

class Product extends ContainerDAO {
  constructor() {
    if (Product.instance) {
      return Product.instance;
    }
    super(ProductModel);
    Product.instance = this;
  }
}

class User extends ContainerDAO {
  constructor() {
    if (User.instance) {
      return User.instance;
    }
    super(UserModel);
    User.instance = this;
  }
}

class Purchase extends ContainerDAO {
  constructor() {
    if (Purchase.instance) {
      return Purchase.instance;
    }
    super(PurchaseModel);
    Purchase.instance = this;
  }
}

const productDao = new Product();
const userDao = new User();
const purchaseDao = new Purchase();

module.exports = {
  productDao,
  userDao,
  purchaseDao,
};