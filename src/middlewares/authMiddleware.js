const { check } = require("express-validator");

const loginValidation = [
  check("email").isEmail(),
  check("password").isString(),
];

const signUpValidation = [
  check("firstName").isString(),
  check("lastName").isString(),
  check("email").isEmail(),
  check("password").isLength({ min: 3 }),
  check("country").isString(),
];

module.exports = {
  loginValidation,
  signUpValidation,
};
