import * as yup from "yup";
import { passwordSchema } from "./helperSchemas";

const deleteUserSchema = yup.object({
  password: passwordSchema,
});

export default deleteUserSchema;
