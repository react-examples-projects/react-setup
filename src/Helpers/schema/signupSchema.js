import * as yup from "yup";
import { emailSchema, nameSchema, passwordSchema } from "./helperSchemas";

const signupSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir"),
});

export default signupSchema;
