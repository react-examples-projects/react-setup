const { error } = require("../helpers/httpResponses");
const UserService = require("../services/userService");
const { isInvalidPassword } = require("../helpers/utils");

async function requirePassword(req, res, next) {
  try {
    const currentUser = await UserService.getUserByIdWithPass(req.user._id);
    if (!isInvalidPassword(req.body.password, currentUser.password)) {
      return next();
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

module.exports = requirePassword;
