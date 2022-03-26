const { buildCheckFunction } = require("express-validator");
const check = buildCheckFunction(["body", "query", "params"]);
const { validateResult } = require("../utils/validateResult");

const validateGetById = [
  check("id", "Bad request. Insert an id.").exists().not().isEmpty().escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

const validateGeneralSearch = [
  check("q", "Bad request. Must be an array.").exists().isArray({ min: 1 }),
  check("limit").escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

const validateGetSeveralIds = [
  check("q", "Bad request. Must be an array.").exists().isArray({ min: 1 }),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

const validateGetByCategory = [
  check("category", "Bad request. Insert a category.").exists().not().isEmpty(),
  check("brandType"),
  check("orderBy").escape(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validateGetByDiscount = [
  check("discount", "Bad request. Insert a category discount.")
    .exists()
    .not()
    .isEmpty()
    .custom((value) => {
      if (value !== "saleoff" && value !== "highlighted") {
        throw new Error("Category discount invalid");
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];
const validateGetComparison = [
  check("q", "Bad request. Insert an array of ids.")
    .exists()
    .not()
    .isEmpty()
    .isArray({ min: 1 }),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

const validateSetFavorites = [
  check("productId", "Bad request. Insert a productId.")
    .exists()
    .not()
    .isEmpty()
    .isString(),
  (req, res, next) => {
    validateResult(req, res, next, 400);
  },
];

module.exports = {
  validateGetById,
  validateGeneralSearch,
  validateGetSeveralIds,
  validateGetByCategory,
  validateGetByDiscount,
  validateGetComparison,
  validateSetFavorites,
};
