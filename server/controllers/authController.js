const UserService = require("../services/userService");
const { success, error } = require("../helpers/httpResponses");
const {
  sendRecoveryPasswordEmail,
  sendVerificationEmail,
} = require("../helpers/requests");
const {
  hashPassword,
  createSessionToken,
  isInvalidPassword,
  unescapeToken,
  getPayloadFromToken,
} = require("../helpers/utils");
const { SERVER } = require("../config/variables");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserService.existsUser(email);
      if (!user) return error(res, "Usuario o clave incorrecta");

      if (user.isIdle) {
        return success(res, {
          message:
            "Tu cuenta se encuentra deshabilitada, contacta con un moderador.",
          isIdle: true,
        });
      }

      if (!user.isVerified) {
        return success(res, {
          message:
            "Tu cuenta no está verificada, revisa tu correo electrónico.",
          isVerified: false,
        });
      }

      if (isInvalidPassword(password, user.password)) {
        return error(res, "Usuario o clave incorrecta");
      }

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

  async resetPassword(req, res, next) {
    try {
      await sendRecoveryPasswordEmail({
        email: req.user.email,
        name: req.user.name,
      });
      success(res, {
        message: "Reseteo de clave enviada",
      });
    } catch (err) {
      next(err);
    }
  }

  async changePassword(req, res, next) {
    try {
      const token = req.body.token;
      const password = hashPassword(req.body.password);

      const tokenUnescaped = unescapeToken(token);
      const userData = await getPayloadFromToken(
        tokenUnescaped,
        SERVER.SECRET_TOKEN_RECOVERY_PASSWORD
      );
      const fullUser = await UserService.UserModel.findOne({
        email: userData.email,
      });

      fullUser.password = password;
      await fullUser.save();

      success(res, {
        message: "La contraseña fue cambiada",
        fullUser,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new AuthController();
