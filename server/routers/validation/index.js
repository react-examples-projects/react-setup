const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const validate = require("../../helpers/validations/validate");
const {
  checkEmailInUseValidation,
} = require("../../helpers/validations/validations");

router.post(
  "/email",
  validate(checkEmailInUseValidation),
  userController.checkEmailInUse
);

module.exports = router;
