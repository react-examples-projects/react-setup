import * as yup from "yup";
import { emailSchema, rankUser } from "./helperSchemas";

const editUserSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("El nombre completo es obligatorio")
    .matches(
      /^[a-zA-Z][a-zA-Z\s]*$/,
      "El nombre sólo debe tener letras y espacios"
    ),
  email: emailSchema,
  rank: rankUser,
  perfil_photo: yup.string(),
});

export default editUserSchema;
