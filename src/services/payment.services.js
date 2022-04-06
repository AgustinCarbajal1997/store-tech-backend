const axios = require("axios");
const config = require("../config/config");

const paymentService = async (cartArr) => {
    try {
        const url = "https://api.mercadopago.com/checkout/preferences";
        const body = {
          payer_email: "test_user_17211738@testuser.com",
          items: cartArr,
          back_urls: {
            failure: "/failure",
            pending: "/pending",
            success: "http://localhost:3001/",
          },
        };
        const payment = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.mp.mp_test_user_seller}`,
          },
        });
        return payment.data
    } catch (error) {
        console.log(error);
    }
};

module.exports = paymentService;
