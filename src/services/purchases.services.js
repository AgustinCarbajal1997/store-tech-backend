const Factory = require("../dao/factory");
const getPurchases = async (userId, page, limit, pagination) => {
  try {
    const options = {
      page,
      limit,
      pagination,
    };
    const dataUser = await Factory.models("user").getById(userId);
    if (!dataUser.data.purchases.length)
      return { status: 200, message: "No purchases yet", data: [] };
    const data = await Factory.models("purchase").getByQuery({
      _id: { $in: [...dataUser.data.purchases] },
      options,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
const confirmPurchase = async (userId, dataBuyer) => {
  try {
    const dataUser = await Factory.models("user").getById(userId);
    const total = dataUser.data.cart.reduce(
      (ac, item) => ac + item.quantity * item.price,
      0
    );
    const dataPurchase = await Factory.models("purchase").save({
      ...dataBuyer,
      products: dataUser.data.cart,
      total,
    });
    const queryUpdate = {
      $push: {
        purchases: dataPurchase.data.id,
      },
      $set: {
        cart: [],
      },
    };
    const newData = await Factory.models("user").updateById(
      userId,
      queryUpdate
    );
    return { newData, cartArr: dataUser.data.cart };
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getPurchases,
  confirmPurchase,
};
