const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const {
  loginValidation,
  signUpValidation,
} = require("../middlewares/authMiddleware");
const handleValidationErrors = require("../handlers/handleValidationErrors");

router.post(
  "/login",
  [loginValidation, handleValidationErrors],
  authController.login
);
router.post(
  "/signup",
  [signUpValidation, handleValidationErrors],
  authController.signUp
);

module.exports = router;
