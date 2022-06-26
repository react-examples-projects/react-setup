const yup = require("yup");
const passwordScheme = yup
  .string()
  .min(6, "Mínimo 6 carácteres para la contraseña")
  .max(50, "Máximo 50 carácteres para la contraseña")
  .required("La contraseña es obligatoria");

const idSchema = yup
  .string()
  .typeError("El indenficador debe ser un ObjectId")
  .required("El identificador es requerido");

const loginSchemaValidation = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email("El correo debe ser válido, ejemplo: example@domain.es")
      .required("El correo es obligatorio"),
    password: yup
      .string()
      .min(8, "Mínimo 8 carácteres para la contraseña")
      .max(20, "Máximo 20 carácteres para la contraseña")
      .required("La contraseña es obligatoria"),
  }),
});

const signupSchemaValidation = yup.object({
  body: yup.object({
    name: yup
      .string()
      .min(4, "Mínimo 4 carácteres para el nombre")
      .max(100, "Máximo 100 carácteres para el nombre")
      .required("El nombre es obligatorio"),
    email: yup
      .string()
      .email("El correo debe ser válido, ejemplo: example@domain.es")
      .required("El correo es obligatorio"),
    password: yup
      .string()
      .min(8, "Mínimo 8 carácteres para la contraseña")
      .max(20, "Máximo 20 carácteres para la contraseña")
      .required("La contraseña es obligatoria"),
    passwordConfirm: passwordScheme.test(
      "passwordChangeValidation",
      "Las contraseñas no coinciden",
      function (value) {
        return this.parent.password === value;
      }
    ),
  }),
});

const createUserSchemaValidation = yup.object({
  body: yup.object({
    name: yup
      .string()
      .min(4, "Mínimo 4 carácteres para el nombre")
      .max(100, "Máximo 100 carácteres para el nombre")
      .required("El nombre es obligatorio"),
    email: yup
      .string()
      .email("El correo debe ser válido, ejemplo: example@domain.es")
      .required("El correo es obligatorio"),
    rank: yup.string().trim().oneOf(["user", "admin"], "El rango no es válido"),
    perfil_photo: yup.string("La imágen de perfil debe ser una cadena"),
    password: yup
      .string()
      .min(8, "Mínimo 8 carácteres para la contraseña")
      .max(20, "Máximo 20 carácteres para la contraseña")
      .required("La contraseña es obligatoria"),
    passwordConfirm: passwordScheme.test(
      "passwordChangeValidation",
      "Las contraseñas no coinciden",
      function (value) {
        return this.parent.password === value;
      }
    ),
  }),
});

const editUserSchemaValidation = yup.object({
  params: yup.object({
    id: idSchema,
  }),
  body: yup.object({
    name: yup
      .string()
      .min(4, "Mínimo 4 carácteres para el nombre")
      .max(100, "Máximo 100 carácteres para el nombre")
      .required("El nombre es obligatorio"),
    email: yup
      .string()
      .email("El correo debe ser válido, ejemplo: example@domain.es")
      .required("El correo es obligatorio"),
    rank: yup.string().trim().oneOf(["user", "admin"], "El rango no es válido"),
    perfil_photo: yup.string("La imágen de perfil debe ser una cadena"),
  }),
});

const deleteUserSchemaValidation = yup.object({
  params: yup.object({
    id: idSchema,
  }),
  body: yup.object({
    password: yup.string().required("La contraseña es obligatoria"),
  }),
});

const perfilPhotoSchemaValidation = yup.object({
  files: yup.object({
    perfil_photo: yup
      .object({
        data: yup.string().required(),
      })
      .required("La imágen debe ser obligatoria"),
  }),
});

const passwordChangeValidation = yup.object({
  body: yup.object({
    password: passwordScheme,
    passwordConfirm: passwordScheme.test(
      "passwordChangeValidation",
      "Las contraseñas no coinciden",
      function (value) {
        return this.parent.password === value;
      }
    ),
  }),
});

const requireIdValidation = yup.object({
  params: yup.object({
    id: idSchema,
  }),
});

module.exports = {
  loginSchemaValidation,
  signupSchemaValidation,
  createUserSchemaValidation,
  editUserSchemaValidation,
  deleteUserSchemaValidation,
  perfilPhotoSchemaValidation,
  passwordChangeValidation,
  requireIdValidation,
};
