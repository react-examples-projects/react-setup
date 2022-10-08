const UserService = require("../services/userService");
const { success, sendVerificationEmail } = require("../helpers/httpResponses");

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
      await UserService.UserModel.findOneAndUpdate(
        { email: req.email },
        { isVerified: true }
      );

      success(res, {
        message: `El correo: ${req.email} fue verificado con exito, proceda a iniciar sesión.`,
      });
    } catch (err) {
      next(err);
    }
  }

  async resendVerifyCode(req, res, next) {
    try {
      if (req.user.isVerified) {
        return next("El correo de esta cuenta ya está verificada");
      }

      await sendVerificationEmail({
        email: req.user.email,
        name: req.user.name,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ValidationController();
