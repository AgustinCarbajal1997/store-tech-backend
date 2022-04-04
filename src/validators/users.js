const { buildCheckFunction } = require("express-validator");
const check = buildCheckFunction(["body", "query", "params"]);
const { validateResult } = require("../utils/validateResult");

const validateSignUp = [
  check("mail")
    .exists()
    .not()
    .isEmpty()
    .isEmail({ blacklisted_chars: ["<", ">", "&", "'", '"', "/"] })
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Empty image file");
      }
      return true;
    }),
  check("name").exists().not().isEmpty().isString().trim().escape(),
  check("lastname").exists().not().isEmpty().isString().trim().escape(),
  check("address").exists().not().isEmpty().isString().trim().escape(),
  check("cellphone")
    .exists()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/),
  check(
    "password",
    "Validation error: Please, introduce a valid password. Minimum eight characters, at least one letter and one number"
  )
    .exists()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .isLength({ min: 8, max: 16 }),
  check("confirmPassword")
    .exists()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match.");
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateLogin = [
  check("mail")
    .exists()
    .not()
    .isEmpty()
    .isEmail({ blacklisted_chars: ["<", ">", "&", "'", '"', "/"] })
    .trim()
    .escape(),
  check(
    "password",
    "Validation error: Please, introduce a valid password. Minimum eight characters, at least one letter and one number"
  )
    .exists()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .isLength({ min: 8, max: 16 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateSignUp,
  validateLogin,
};
