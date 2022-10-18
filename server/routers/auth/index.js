const express = require("express");
const router = express.Router();
const validate = require("../../helpers/validations/validate");
const {
  loginSchemaValidation,
  signupSchemaValidation,
  recoveryPassSchemaValidation,
} = require("../../helpers/validations/validations");
const authController = require("../../controllers/authController");
const checkExistEmail = require("../../middlewares/checkExistEmail");
const checkExistUser = require("../../middlewares/checkExistUser");

router.post("/login", validate(loginSchemaValidation), authController.login);
router.post(
  "/signup",
  validate(signupSchemaValidation),
  checkExistEmail,
  authController.signup
);

router.post(
  "/recovery/password",
  validate(recoveryPassSchemaValidation),
  checkExistUser,
  authController.resetPassword
);

module.exports = router;
