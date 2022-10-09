const UserService = require("../services/userService");
const { error } = require("../helpers/httpResponses");

async function checkExistEmail(req, res, next) {
  const email = req.body.email;
  const lastEmail = req.body.lastEmail;

  // if the email is the same then allow the put request
  if (email === lastEmail) return next();

  const user = await UserService.existsUser(email);
  if (user) return error(res, "El correo ya está en uso");

  next();
}

module.exports = checkExistEmail;
