import useBody from "hooks/utils/useBody";
import styles from "styles/ResetPassword.module.scss";
import ResetPasswordImg from "assets/reset_password.svg";
import useFormValidation from "hooks/validations/useFormValidation";
import resetPasswordSchema from "helpers/schema/resetPasswordSchema";
import useToast from "hooks/utils/useToast";
import ErrorText from "components/Text/ErrorText";
import { useParams } from "react-router-dom";
import { Button, Input, Text, Image } from "@geist-ui/core";

export default function ResetPassword() {
  const { register, handleSubmit, errors } =
    useFormValidation(resetPasswordSchema);
  const { error, success } = useToast();
  const { token } = useParams();

  const onSubmit = async (data) => {
    try {
      success("Se envio el reseteo de su contraseña");
    } catch (err) {
      error("Hubo un error al enviar el email");
    }
  };
  useBody({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  });

  return (
    <div className={styles.container}>
      <Image src={ResetPasswordImg} className="mb-3" width="200px" />
      <Text className="mb-4 fw-bolder text-center" h2>
        Cambiar Contraseña
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-100 mb-4 d-flex flex-column justify-content-center">
          <label className="d-block mb-2" htmlFor="password">
            Escribe la nueva clave
          </label>
          <Input.Password
            width="100%"
            placeholder="Asegurate de usar una clave segura"
            id="password"
            scale={1.4}
            {...register("password")}
          />

          <ErrorText
            className="mt-1 mb-2"
            text={errors.password?.message}
            isVisible={!!errors.password?.message}
          />
        </div>

        <div className="w-100 mb-4 d-flex flex-column justify-content-center">
          <label className="d-block mb-2" htmlFor="password-confirm">
            Confirmar la clave
          </label>
          <Input.Password
            width="100%"
            placeholder="Asegurate de usar una clave segura"
            id="password-confirm"
            {...register("passwordConfirm")}
            scale={1.4}
          />
          <ErrorText
            className="mt-1 mb-2"
            text={errors.passwordConfirm?.message}
            isVisible={!!errors.passwordConfirm?.message}
          />
        </div>

        <Button type="success-light" htmlType="submit" width="100%">
          Confirmar cambios
        </Button>
      </form>
    </div>
  );
}
