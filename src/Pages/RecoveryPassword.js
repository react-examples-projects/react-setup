import { Text, Input, Button } from "@geist-ui/core";
import styles from "styles/RecoveryPassword.module.scss";
import useBody from "hooks/utils/useBody";

export default function RecoveryPassword() {
  useBody({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  });
  return (
    <div className={styles.container}>
      <Text className="fw-bolder" h2>
        Recuperar Contraseña
      </Text>
      <p>
        A continuación escriba su correo eléctronico el cual se usará para
        resetear y asignar una nueva contraseña
      </p>
      <form className="mt-4">
        <Input
          htmlType="email"
          scale={4 / 3}
          width="100%"
          placeholder="example@gmail.com"
          className="text-center mb-2"
        />
        <Button htmlType="submit" type="success-light">
          Resetear contraseña
        </Button>
      </form>
    </div>
  );
}
