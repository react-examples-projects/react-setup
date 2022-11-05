const yup = require("yup");
const passwordSchema = yup
  .string()
  .min(6, "Mínimo 6 carácteres para la contraseña")
  .max(50, "Máximo 50 carácteres para la contraseña")
  .required("La contraseña es obligatoria");

const passwordConfirmSchema = passwordSchema.test(
  "passwordChangeValidation",
  "Las contraseñas no coinciden",
  function (value) {
    return this.parent.password === value;
  }
);

const emailSchema = yup
  .string()
  .email("El correo debe ser válido, ejemplo: example@domain.es")
  .required("El correo es obligatorio");

const idSchema = yup
  .string()
  .typeError("El indenficador debe ser un ObjectId")
  .required("El identificador es requerido");

const loginSchemaValidation = yup.object({
  body: yup.object({
    email: emailSchema,
    password: passwordSchema,
  }),
});

const signupSchemaValidation = yup.object({
  body: yup.object({
    name: yup
      .string()
      .min(4, "Mínimo 4 carácteres para el nombre")
      .max(100, "Máximo 100 carácteres para el nombre")
      .required("El nombre es obligatorio"),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
  }),
});

const createUserSchemaValidation = yup.object({
  body: yup.object({
    name: yup
      .string()
      .min(4, "Mínimo 4 carácteres para el nombre")
      .max(100, "Máximo 100 carácteres para el nombre")
      .required("El nombre es obligatorio"),
    email: emailSchema,
    rank: yup.string().trim().oneOf(["user", "admin"], "El rango no es válido"),
    perfil_photo: yup.string("La imágen de perfil debe ser una cadena"),
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
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
    email: emailSchema,
    lastEmail: yup
      .string()
      .email("El antiguo correo debe ser válido, ejemplo: example@domain.es")
      .required("El antiguo correo es un obligatorio"),
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
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
  }),
});

const checkEmailInUseValidation = yup.object({
  body: yup.object({
    email: emailSchema,
  }),
});

const verifyAccountValidation = yup.object({
  body: yup.object({
    token: yup.string().required("El token es obligatorio"),
  }),
});

const recoveryPassSchemaValidation = yup.object({
  body: yup.object({
    email: emailSchema,
  }),
});

const resetPassSchemaValidation = yup.object({
  body: yup.object({
    password: passwordSchema,
    token: yup.string().required("The user token is required"),
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
  checkEmailInUseValidation,
  verifyAccountValidation,
  recoveryPassSchemaValidation,
  resetPassSchemaValidation,
  requireIdValidation,
  passwordSchema,
  passwordConfirmSchema,
};
