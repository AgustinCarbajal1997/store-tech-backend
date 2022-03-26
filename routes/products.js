const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controllers");
const products = require("../controllers/products.controller");
const {
  validateGetById,
  validateGeneralSearch,
  validateGetSeveralIds,
  validateGetByCategory,
  validateGetByDiscount,
  validateGetComparison,
  validateSetFavorites,
} = require("../validators/products");
router
  .get("/getAll", products.getAll)
  .get("/getById/:id", validateGetById, products.getById)
  .get("/getSeveralIds", validateGetSeveralIds, products.getSeveralIds)
  .get(
    "/getByDiscount/:discount",
    validateGetByDiscount,
    products.getByDiscount
  )
  .get(
    "/getByCategory/:category",
    validateGetByCategory,
    products.getByCategory
  )
  .get("/generalSearch", validateGeneralSearch, products.generalSearch)
  .get("/getComparison", validateGetComparison, products.getComparison)
  .put(
    "/setFavorites",
    validateSetFavorites,
    auth.authVerification,
    products.setFavorites
  );

module.exports = router;
