const purchase = require("../services/purchases.services");
const getPurchases = async (req, res) => {
  const { id: userId } = req.user;
  const { page, limit, pagination } = req.query;
  try {
    const data = await purchase.getPurchases(userId, page, limit, pagination);
    return res.status(data.status).json(data);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};
const confirmPurchase = async (req, res, next) => {
  const { id: userId } = req.user;
  const { mail, name, lastname, address, city, cellphone, province, zipCode } =
    req.body;
  try {
    const data = await purchase.confirmPurchase(userId, {
      mail,
      name,
      lastname,
      address,
      city,
      cellphone,
      province,
      zipCode,
    });
    req.updateUser = data.newData;
    req.cartArr = data.cartArr;
    next()
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ message: error.message });
  }
};
module.exports = {
  getPurchases,
  confirmPurchase,
};
