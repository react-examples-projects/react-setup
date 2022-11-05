function checkVerifiedAccount(req, res, next) {
  if (!req.user.isVerified) {
    return next("El correo de esta cuenta no está verificado");
  }
  next();
}

module.exports = checkVerifiedAccount;
