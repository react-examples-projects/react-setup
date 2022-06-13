const UserService = require("../services/userService");
const { uploadImages } = require("../helpers/requests");
const { success, error } = require("../helpers/httpResponses");
const { hashPassword } = require("../helpers/utils");
class UserController {
  async perfilPhoto(req, res, next) {
    try {
      const perfil_photo = req.files.perfil_photo.data;
      const data = await uploadImages(perfil_photo);
      await UserService.setPerfilPhoto({
        id: req.user._id,
        perfil_photo: data.url,
      });
      success(res, data);
    } catch (err) {
      next(err);
    }
  }

  async password(req, res, next) {
    try {
      const { password, passwordConfirm } = req.body;
      const id = req.user._id;
      if (password !== passwordConfirm) {
        return error(res, "Las contraseñas no coinciden", 400);
      }
      const userUpdated = await UserService.changePassword({ id, password });
      success(res, userUpdated);
    } catch (err) {
      next(err);
    }
  }

  async getInfo(req, res, next) {
    try {
      const user = await UserService.getUserById(req.user._id);
      success(res, user);
    } catch (err) {
      next(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const { email, password, rank, perfil_photo, name } = req.body;
      const user = await UserService.existsUser(email);
      if (user) return error(res, "El correo ya está en uso");

      const passwordHashed = hashPassword(password);
      const userCreated = await UserService.createUser({
        email,
        password: passwordHashed,
        rank,
        perfil_photo,
        name,
      });

      success(res, userCreated);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
