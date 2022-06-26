import * as yup from "yup";

const deleteUserSchema = yup.object({
  password: yup.string().required("La contraseña es obligatoria"),
});

export default deleteUserSchema;
