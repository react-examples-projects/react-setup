const { uploadImages } = require("../helpers/requests");
const { message } = require("../helpers/utils");

async function uploadPerfilPhoto(req, res, next) {
  const perfil_photo = req.files?.perfil_photo?.data;
  if (perfil_photo) {
    try {
      const data = await uploadImages(perfil_photo);
      req.perfilPhoto = data?.url;
      req.perfilPhotoData = data;
    } catch (err) {
      message.error(err);
      return next("Ocurrió un error al subir la imágen");
    }
  }
  next();
}

module.exports = uploadPerfilPhoto;
