const express = require("express");
const router = express.Router();
const validationController = require("../../controllers/validationController");
const validate = require("../../helpers/validations/validate");
const {
  checkEmailInUseValidation,
} = require("../../helpers/validations/validations");

router.post(
  "/email",
  validate(checkEmailInUseValidation),
  validationController.checkEmailInUse
);

router.post("/account", validationController.verifyAccount);

module.exports = router;
