const UserService = require("../services/userService");
const { error } = require("../helpers/httpResponses");

async function checkExistUser(req, res, next) {
  const email = req.body.email;
  const user = await UserService.existsUser(email);
  if (!user) return error(res, "El usuario no existe");
  req.user = user;
  next();
}

module.exports = checkExistUser;
