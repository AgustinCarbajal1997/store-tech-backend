const express = require("express");
const router = express.Router();
const purchase = require("../controllers/purchases.controller");
const auth = require("../controllers/auth.controllers");
const { validateConfirmPurchase } = require("../validators/cart");
const paymentController = require("../controllers/payment.controllers");

router
  .get("/getPurchases", auth.authVerification, purchase.getPurchases)
  .post(
    "/confirmPurchase",
    validateConfirmPurchase,
    auth.authVerification,
    purchase.confirmPurchase,
    paymentController
  )

module.exports = router;
