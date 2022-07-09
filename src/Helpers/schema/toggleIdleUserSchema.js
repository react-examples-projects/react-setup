import * as yup from "yup";

const toggleIdleUserSchema = yup.object({
  password: yup.string().required("La contraseña es obligatoria"),
});

export default toggleIdleUserSchema;
