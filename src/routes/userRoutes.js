const express = require("express");
const router = express.Router();
const { userController } = require("../controllers");
const {
  createUserValidation,
  getUserByIdValidation,
  deleteUserValidation,
  updateUserValidation,
} = require("../middlewares/userMiddleware");
const { jwtValidation } = require("../middlewares/jwtMiddleware");
const handleValidationErrors = require("../handlers/handleValidationErrors");

const generateMiddlewares = (validations) => [
  jwtValidation,
  ...validations,
  handleValidationErrors,
];

router.post(
  "/",
  generateMiddlewares([createUserValidation]),
  userController.createUser
);

router.put(
  "/:id",
  generateMiddlewares([updateUserValidation]),
  userController.updateUser
);

router.delete(
  "/:id",
  generateMiddlewares([deleteUserValidation]),
  userController.deleteUser
);

router.get(
  "/:id",
  generateMiddlewares([getUserByIdValidation]),
  userController.getUserById
);

router.get("/", [jwtValidation], userController.getAllUsers);

module.exports = router;
