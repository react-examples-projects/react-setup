import * as yup from "yup";

const editUserSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("El nombre completo es obligatorio")
    .matches(
      /^[a-zA-Z][a-zA-Z\s]*$/,
      "El nombre sólo debe tener letras y espacios"
    ),
  email: yup
    .string()
    .trim()
    .email("El correo no tiene un formato válido")
    .required("El correo es obligatorio"),
  rank: yup.string().trim().oneOf(["user", "admin"], "El rango no es válido"),
  perfil_photo: yup.string(),
});

export default editUserSchema;
