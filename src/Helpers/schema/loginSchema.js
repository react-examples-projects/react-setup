import * as yup from "yup";
import { emailSchema, passwordSchema } from "./helperSchemas";

const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export default loginSchema;
