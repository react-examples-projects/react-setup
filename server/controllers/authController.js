const UserService = require("../services/userService");
const { success, error } = require("../helpers/httpResponses");
const { sendVerificationEmail } = require("../helpers/requests");
const {
  hashPassword,
  createSessionToken,
  isInvalidPassword,
} = require("../helpers/utils");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserService.existsUser(email);
      if (!user) return error(res, "Usuario o clave incorrecta");

      if (user.isIdle) {
        return success(res, {
          message: "Tu cuenta se encuentra deshabilitada, contacta con un moderador.",
          isIdle: true,
        });
      }

      if(!user.isVerified){
        return success(res, {
          message: "Tu cuenta no está verificada, revisa tu correo electrónico.",
          isVerified: false,
        });
      }

      if (isInvalidPassword(password, user.password))
        return error(res, "Usuario o clave incorrecta");

      delete user.password;
      const token = createSessionToken(user);
      return success(res, { user, token });

    } catch (err) {
      next(err);
    }
  }

  async signup(req, res, next) {
    try {
      const { email, password, name } = req.body;
      await sendVerificationEmail({ email, name });

      const passwordHashed = hashPassword(password);
      const user = await UserService.createUser({
        name,
        email,
        password: passwordHashed,
      });
      success(
        res,
        {
          user,
          message: `Para continuar verifique su bandeja correo:\n ${email}, para continuar con el registro`,
        },
        201
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
