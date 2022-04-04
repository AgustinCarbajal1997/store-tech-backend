const Factory = require("../dao/factory");
const postProductCart = async (userId, dataProduct) => {
  try {
    const data = await Factory.models("user").getById(userId);
    let cart = [...data.data.cart];
    if (cart.length) {
      const findProduct = data.data.cart.findIndex(
        (item) => item.productId === dataProduct.productId
      );
      findProduct === -1
        ? (cart = [...cart, dataProduct])
        : (cart[findProduct] = dataProduct);
    } else {
      cart = [...cart, dataProduct];
    }
    const query = {
      $set: {
        cart,
      },
    };
    const newData = await Factory.models("user").updateById(userId, query);
    return newData;
  } catch (error) {
    throw error;
  }
};

const deleteProductCart = async (userId, productId) => {
  try {
    const queryDelete = {
      $pull: {
        cart: {
          productId,
        },
      },
    };
    const data = await Factory.models("user").updateById(userId, queryDelete);
    return data;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  postProductCart,
  deleteProductCart,
};
