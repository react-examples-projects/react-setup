const express = require("express");
const router = express.Router();
const validationController = require("../../controllers/validationController");
const validate = require("../../helpers/validations/validate");
const checkVerifyAccountToken = require("../../middlewares/checkVerifyAccountToken");
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
  "/account",
  validate(verifyAccountValidation),
  checkVerifyAccountToken,
  validationController.verifyAccount
);

module.exports = router;
