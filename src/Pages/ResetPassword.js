import useBody from "hooks/utils/useBody";
import styles from "styles/ResetPassword.module.scss";
import ResetPasswordImg from "assets/reset_password.svg";
import { useParams } from "react-router-dom";
import { Button, Input, Text, Image } from "@geist-ui/core";

export default function ResetPassword() {
  const { token } = useParams();
  console.log(token);
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

      <form>
        <div className="w-100 mb-4 d-flex flex-column justify-content-center">
          <label className="d-block mb-2" htmlFor="password">
            Escribe la nueva clave
          </label>
          <Input.Password
            width="100%"
            placeholder="Asegurate de usar una clave segura"
            id="password"
            scale={1.4}
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
            scale={1.4}
          />
        </div>

        <Button type="success-light" htmlType="submit" width="100%">
          Confirmar cambios
        </Button>
      </form>
    </div>
  );
}
