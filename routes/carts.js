const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controllers");
const cart = require("../controllers/cart.controllers");
const {
  validatePostProductCart,
  validateDeleteProductCart,
} = require("../validators/cart");
router
  .post(
    "/postProductCart",
    validatePostProductCart,
    auth.authVerification,
    cart.postProductCart
  )
  .delete(
    "/deleteProductCart",
    validateDeleteProductCart,
    auth.authVerification,
    cart.deleteProductCart
  );

module.exports = router;
