const { check } = require("express-validator");

const createUserValidation = [
  check("firstName").isString(),
  check("lastName").isString(),
  check("email").isEmail(),
  check("password").isLength({ min: 3 }),
  check("country").isString(),
];

const updateUserValidation = [
  check("id").isInt(),
  check("firstName").isString(),
  check("lastName").isString(),
  check("email").isEmail(),
  check("country").isString(),
];

const deleteUserValidation = [check("id").isInt()];

const getUserByIdValidation = [check("id").isInt()];

module.exports = {
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
  getUserByIdValidation,
};
