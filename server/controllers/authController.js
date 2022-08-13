const UserService = require("../services/userService");
const { success, error } = require("../helpers/httpResponses");
const { sendVerificationEmail } = require("../helpers/requests");
const {
  hashPassword,
  createSessionToken,
  createEmailVerifyToken,
  isInvalidPassword,
  compileTemplate,
} = require("../helpers/utils");

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserService.existsUser(email);
      if (user) {
        if (isInvalidPassword(password, user.password))
          return error(res, "Usuario o clave incorrecta");

        delete user.password;
        const token = createSessionToken(user);
        return success(res, { user, token });
      }
      error(res, "Usuario o clave incorrecta");
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
          message: `Para continuar verifique su bandeja correo ${email} para continuar con el registro`,
          user,
        },
        201
      );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
