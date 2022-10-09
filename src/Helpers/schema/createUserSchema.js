import * as yup from "yup";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  rankUser,
} from "./helperSchemas";

const createUserSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  rank: rankUser,
  password: passwordSchema,
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir"),

  perfil_photo: yup.string(),
});

export default createUserSchema;
