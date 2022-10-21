const UserService = require("../services/userService");
const {
  getAccountFromVerifyToken,
  unescapeToken,
} = require("../helpers/utils");

async function checkVerificationToken(req, res, next) {
  try {
    const token = unescapeToken(req.body.token);
    const { email } = await getAccountFromVerifyToken(token);
    const user = await UserService.existsUser(email);

    if (user.isVerified) {
      return next("El correo de esta cuenta ya está verificada");
    }

    req.user = user;
    req.email = email;

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = checkVerificationToken;
