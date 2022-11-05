import * as yup from "yup";
import { emailSchema } from "./helperSchemas";

const recoveryPasswordSchema = yup
  .object({
    email: emailSchema,
  })
  .required();

export default recoveryPasswordSchema;