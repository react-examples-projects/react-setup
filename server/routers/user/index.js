const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const validate = require("../../helpers/validations/validate");
const {
  createUserSchemaValidation,
  perfilPhotoSchemaValidation,
  passwordChangeValidation,
} = require("../../helpers/validations/validations");

router.get("/", userController.getInfo);

router.post(
  "/",
  validate(createUserSchemaValidation),
  userController.createUser
);

router.get("/users", userController.getAllUsers);

router.post(
  "/perfil-photo",
  validate(perfilPhotoSchemaValidation),
  userController.perfilPhoto
);

router.patch(
  "/password",
  validate(passwordChangeValidation),
  userController.password
);

module.exports = router;
