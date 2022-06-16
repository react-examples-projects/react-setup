const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const validate = require("../../helpers/validations/validate");
const {
  createUserSchemaValidation,
  editUserSchemaValidation,
  perfilPhotoSchemaValidation,
  passwordChangeValidation,
} = require("../../helpers/validations/validations");
const requireAdmin = require("../../middlewares/requireAdmin");

router.get("/", userController.getInfo);

router.post(
  "/",
  requireAdmin,
  validate(createUserSchemaValidation),
  userController.createUser
);

router.put(
  "/:id",
  requireAdmin,
  validate(editUserSchemaValidation),
  userController.editUser
);

router.get("/users", requireAdmin, userController.getAllUsers);

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
