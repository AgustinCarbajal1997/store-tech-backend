const paymentServices = require("../services/payment.services");

const paymentController = async (req, res) => {
  const cartArr = req.cartArr;
  const updateUser = req.updateUser;
  const generateCartMp = cartArr.map((item) => ({
    title: item.title,
    description: item.title,
    picture_url: item.image,
    category_id: item.productId,
    quantity: item.quantity,
    unit_price: item.price,
  }));
  try {
    const data = await paymentServices(generateCartMp);
    res.status(200).json({ dataUser: updateUser, dataPayment: data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

module.exports = paymentController;
