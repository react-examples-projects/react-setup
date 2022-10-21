const express = require("express");
const router = express.Router();
const validationController = require("../../controllers/validationController");
const validate = require("../../helpers/validations/validate");
const checkVerificationToken = require("../../middlewares/checkVerificationToken");
const checkExistUser = require("../../middlewares/checkExistUser");
const {
  checkEmailInUseValidation,
  verifyAccountValidation,
} = require("../../helpers/validations/validations");

router.post(
  "/email",
  validate(checkEmailInUseValidation),
  validationController.checkEmailInUse
);

router.post(
  "/resend-verfication",
  checkExistUser,
  validationController.resendVerifyCode
);

//router.post("/recovery-token")

router.post(
  "/account",
  validate(verifyAccountValidation),
  checkVerificationToken,
  validationController.verifyAccount
);

module.exports = router;
