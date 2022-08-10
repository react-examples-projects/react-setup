const { error } = require("../helpers/httpResponses");

function requireAdmin(req, res, next) {
  if (req?.user?.rank === "admin") {
    return next();
  }
  error(res, "No tienes el rango para hacer esta acción", 403);
}

module.exports = requireAdmin;
