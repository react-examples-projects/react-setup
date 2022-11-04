import * as yup from "yup";
import { passwordSchema, passwordConfirmSchema } from "./helperSchemas";

const recoveryPasswordSchema = yup
  .object({
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
  })
  .required();

export default recoveryPasswordSchema;
