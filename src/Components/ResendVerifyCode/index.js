import ErrorText from "components/Text/ErrorText";
import axios from "axios";
import { Button, Input } from "@geist-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function ResendVerifyCode() {
  const schema = yup
    .object({
      email: yup
        .string()
        .email("Debe ser un correo válido")
        .required("El correo es obligatorio"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const res = await axios.post(
      "http://localhost:5000/api/validation/resend-verfication",
      data
    );
    console.log(res);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email")}
        htmlType="email"
        scale={4 / 3}
        width="100%"
        placeholder="example@gmail.com"
        className="text-center"
      />

      <ErrorText
        className="mt-2"
        text={errors.email?.message}
        isVisible={!!errors.email?.message}
      />

      <Button htmlType="submit" type="success" className="mt-2">
        Reenviar código nuevo
      </Button>
    </form>
  );
}
