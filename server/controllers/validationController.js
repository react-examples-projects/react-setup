const UserService = require("../services/userService");
const { success } = require("../helpers/httpResponses");
const { getAccountFromVerifyToken } = require("../helpers/utils");

class ValidationController {
  async checkEmailInUse(req, res, next) {
    try {
      const email = req.body.email;
      const user = await UserService.existsUser(email);
      success(res, !!user);
    } catch (err) {
      next(err);
    }
  }

  async verifyAccount(req, res, next) {
    try {
      const token = decodeURIComponent(req.body.token).replace(/\-/g, ".");
      const { email } = await getAccountFromVerifyToken(token);
      const user = await UserService.existsUser(email);

      if (!email || !user) {
        throw new Error(
          "El token es inválido o caducó, solicite un nuevo token para verificar su cuenta"
        );
      }
      await UserService.UserModel.findOneAndUpdate(
        { email },
        { isVerified: true }
      );

      success(res, {
        message: `El correo: ${email} fue verificado con exito, proceda a iniciar sesión.`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ValidationController();
