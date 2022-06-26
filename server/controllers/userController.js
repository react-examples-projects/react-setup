const UserService = require("../services/userService");
const { uploadImages } = require("../helpers/requests");
const { success, error } = require("../helpers/httpResponses");
const { hashPassword, isInvalidPassword } = require("../helpers/utils");
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
      const { email, password, rank, name } = req.body;

      const user = await UserService.existsUser(email);
      if (user) return error(res, "El correo ya está en uso");

      const passwordHashed = hashPassword(password);
      const newData = {
        email,
        password: passwordHashed,
        rank,
        name,
      };
      if (req.files?.perfil_photo?.data) {
        const img = await uploadImages(req.files?.perfil_photo?.data);
        newData.perfil_photo = img?.url;
      }
      const userCreated = await UserService.createUser(newData);

      success(res, userCreated, 201);
    } catch (err) {
      next(err);
    }
  }

  async editUser(req, res, next) {
    try {
      const { email, rank, name } = req.body;
      const newData = {
        email,
        rank,
        name,
      };

      if (req.files?.perfil_photo?.data) {
        const img = await uploadImages(req.files?.perfil_photo?.data);
        newData.perfil_photo = img?.url;
      }

      const result = await UserService.editUser(req.params.id, newData);
      success(res, result);
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const currentUser = await UserService.getUserByIdWithPass(req.user._id);
      if (!isInvalidPassword(req.body.password, currentUser.password)) {
        const user = await UserService.deleteUser(req.params.id);
        return success(res, user);
      }

      error(
        res,
        "La contraseña es incorrecta o no tienes privilegios para hacer esta acción",
        400
      );
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
}

module.exports = new UserController();
