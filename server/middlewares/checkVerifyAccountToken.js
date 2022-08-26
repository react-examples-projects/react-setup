const UserService = require("../services/userService");
const { getAccountFromVerifyToken } = require("../helpers/utils");

async function checkVerifyAccountToken(req, res, next) {
  try {
    const token = decodeURIComponent(req.body.token).replace(/\$/g, ".");
    const { email } = await getAccountFromVerifyToken(token);
    if (!email) {
      return next("El token es inválido o caducó, solicite otro");
    }

    const user = await UserService.existsUser(email);

    if (!user) {
      return next("No se encontró una cuenta con el e-mail especificado");
    }

    if (user.isVerified) {
      return next("El correo de esta cuenta ya está verificada");
    }

    req.user = user;
    req.email = email;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = checkVerifyAccountToken;
