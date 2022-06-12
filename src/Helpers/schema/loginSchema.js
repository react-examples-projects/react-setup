import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("El correo no tiene un formato válido")
    .required("El correo es obligatorio"),

  password: yup
    .string()
    .trim()
    .min(8, "La contraseña debe tener mínimo 8 carácteres")
    .max(20, "La contraseña sólo debe ser máximo 20 carácteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
      "La contraseña debe tener una letras mayúsculas y minúscula"
    )
    .required("La contraseña es obligatoria"),
});

export default loginSchema;
