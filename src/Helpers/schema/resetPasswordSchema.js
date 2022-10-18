import * as yup from "yup";
import { emailSchema } from "./helperSchemas";

const resetPasswordSchema = yup
  .object({
    email: emailSchema,
  })
  .required();

export default resetPasswordSchema;
