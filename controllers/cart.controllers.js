const cart = require("../services/cart.services");
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
    res.status(error.status).json({ message: error.message });
  }
};
const deleteProductCart = async (req, res) => {
  const { productId } = req.body;
  const { id: userId } = req.user;
  try {
    const data = await cart.deleteProductCart(userId, productId);
    return res.status(data.status).json(data);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  postProductCart,
  deleteProductCart,
};
