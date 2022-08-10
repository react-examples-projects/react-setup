const UserService = require("../services/userService");
const { success, error } = require("../helpers/httpResponses");
const { hashPassword } = require("../helpers/utils");
class UserController {
  async perfilPhoto(req, res, next) {
    try {
      await UserService.setPerfilPhoto({
        id: req.user._id,
        perfil_photo: req.perfilPhoto,
      });
      success(res, req.perfilPhotoData);
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
      const { email, password, rank, name } = req.body;
      const newData = {
        email,
        password: hashPassword(password),
        rank,
        name,
      };
      if (req.perfilPhoto) newData.perfil_photo = req.perfilPhoto;
      const userCreated = await UserService.createUser(newData);

      success(res, userCreated, 201);
    } catch (err) {
      next(err);
    }
  }

  async editUser(req, res, next) {
    try {
      const { email, rank, name, isIdle } = req.body;
      const newData = {
        email,
        rank,
        name,
        isIdle,
      };
      if (req.perfilPhoto) newData.perfil_photo = req.perfilPhoto;
      const result = await UserService.editUser(req.params.id, newData);
      success(res, result);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const user = await UserService.deleteUser(req.params.id);
      return success(res, user);
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getUsers();
      success(res, users);
    } catch (err) {
      next(err);
    }
  }

  async toggleUserIdle(req, res, next) {
    try {
      const result = await UserService.toggleIdle(req.params.id);
      success(res, result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
