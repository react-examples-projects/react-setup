import ErrorText from "components/Text/ErrorText";
import RecoveryPasswordImg from "assets/recovery_password.svg";
import styles from "styles/RecoveryPassword.module.scss";
import useBody from "hooks/utils/useBody";
import useToast from "hooks/utils/useToast";
import useResetPassword from "hooks/auth/useResetPassword";
import useFormValidation from "hooks/validations/useFormValidation";
import recoveryPasswordSchema from "helpers/schema/recoveryPasswordSchema";
import { getErrorValidation } from "helpers/utils";
import { Text, Input, Button, Image } from "@geist-ui/core";
 
export default function RecoveryPassword() {
  const { register, handleSubmit, errors } =
    useFormValidation(recoveryPasswordSchema);
  const { error, success } = useToast();
  const resetPasswordMutation = useResetPassword();

  const onSubmit = async (data) => {
    try {
      await resetPasswordMutation.mutateAsync(data);
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
      <Image src={RecoveryPasswordImg} className="mb-3" width="200px" />
      <Text className="fw-bolder" h2>
        Recuperar Contraseña
      </Text>
      <p>
        A continuación escriba su correo eléctronico el cual se usará para
        resetear y asignar una nueva contraseña
      </p>

      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email")}
          htmlType="email"
          scale={4 / 3}
          width="100%"
          placeholder="example@gmail.com"
          className="text-center mb-2"
        />

        <ErrorText
          className="mt-1 mb-2"
          text={errors.email?.message}
          isVisible={!!errors.email?.message}
        />
        <ErrorText
          className="mt-1 mb-2"
          text={getErrorValidation(resetPasswordMutation)}
          isVisible={resetPasswordMutation.isError}
        />
        <Button
          htmlType="submit"
          type="success-light"
          className="mt-3"
          loading={resetPasswordMutation.isLoading}
          disabled={resetPasswordMutation.isLoading}
        >
          Resetear contraseña
        </Button>
      </form>
    </div>
  );
}
