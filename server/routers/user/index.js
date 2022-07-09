const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const validate = require("../../helpers/validations/validate");
const requireAdmin = require("../../middlewares/requireAdmin");
const requirePassword = require("../../middlewares/requirePassword");
const {
  createUserSchemaValidation,
  editUserSchemaValidation,
  deleteUserSchemaValidation,
  perfilPhotoSchemaValidation,
  passwordChangeValidation,
} = require("../../helpers/validations/validations");

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

router.delete(
  "/:id",
  requireAdmin,
  requirePassword,
  validate(deleteUserSchemaValidation),
  userController.deleteUser
);

router.put(
  "/idle/:id",
  requireAdmin,
  requirePassword,
  userController.toggleUserIdle
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
