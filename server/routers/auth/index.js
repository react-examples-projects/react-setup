const express = require("express");
const router = express.Router();
const validate = require("../../helpers/validations/validate");
const {
  loginSchemaValidation,
  signupSchemaValidation,
  recoveryPassSchemaValidation,
  resetPassSchemaValidation,
} = require("../../helpers/validations/validations");
const authController = require("../../controllers/authController");
const checkExistEmail = require("../../middlewares/checkExistEmail");
const checkExistUser = require("../../middlewares/checkExistUser");
const checkVerifiedAccount = require("../../middlewares/checkVerifiedAccount");

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
  checkVerifiedAccount,
  authController.resetPassword
);

router.post(
  "/reset/password",
  validate(resetPassSchemaValidation),
  authController.changePassword
);

module.exports = router;
