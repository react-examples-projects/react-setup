import * as yup from "yup";

export const emailSchema = yup
  .string()
  .trim()
  .email("El correo no tiene un formato válido")
  .required("El correo es obligatorio");

export const nameSchema = yup
  .string()
  .trim()
  .required("El nombre completo es obligatorio")
  .matches(
    /^[a-zA-Z][a-zA-Z\s]*$/,
    "El nombre sólo debe tener letras y espacios"
  );

export const passwordSchema = yup
  .string()
  .trim()
  .min(8, "La contraseña debe tener mínimo 8 carácteres")
  .max(20, "La contraseña sólo debe ser máximo 20 carácteres")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
    "La contraseña debe tener una letras mayúsculas y minúscula"
  )
  .required("La contraseña es obligatoria");

export const rankUser = yup
  .string()
  .trim()
  .oneOf(["user", "admin"], "El rango no es válido");
