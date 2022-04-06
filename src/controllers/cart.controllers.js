const cart = require("../services/cart.services");
const errorHandle = require("../utils/functions/errorHandle");
const postProductCart = async (req, res) => {
  const { productId, title, image, unites, price, quantity } = req.body;
  const { id: userId } = req.user;
  try {
    const data = await cart.postProductCart(userId, {
      productId,
      title,
      image,
      unites,
      price,
      quantity,
    });
    return res.status(data.status).json(data);
  } catch (error) {
    console.log(error)
    errorHandle(res, error);
  }
};
const deleteProductCart = async (req, res) => {
  const { productId } = req.body;
  const { id: userId } = req.user;
  try {
    const data = await cart.deleteProductCart(userId, productId);
    return res.status(data.status).json(data);
  } catch (error) {
    errorHandle(res, error);
  }
};

module.exports = {
  postProductCart,
  deleteProductCart,
};
