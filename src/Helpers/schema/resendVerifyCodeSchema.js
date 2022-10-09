import * as yup from "yup";
import { emailSchema } from "./helperSchemas";

const resendVerifyCodeSchema = yup
  .object({
    email: emailSchema,
  })
  .required();

export default resendVerifyCodeSchema;
