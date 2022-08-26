import useValidateAccount from "hooks/validations/useValidateAccount";
import useBody from "hooks/utils/useBody";
import Loader from "components/Loaders/Loader";
import styles from "styles/VerifyAccount.module.scss";
import cls from "classnames"
import { Link } from "react-router-dom";
import { FiXCircle, FiCheckCircle } from "react-icons/fi";
import { Button } from "@geist-ui/core";

export default function VerifyAccount() {
  const { isLoading, isError, error, data } = useValidateAccount();
  const errorDesc = error?.response?.data.errorDescription || error?.code;

  useBody({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  });

  return (
    <div className={styles.container}>
      {isLoading && (
        <>
          <h2 className="mb-4">Verificando token</h2>
          <Loader />
        </>
      )}
      {isError && (
        <>
          <FiXCircle className={cls(styles.icon, styles.iconError)} />
          <h2 className="mt-2">Ocurrió un error</h2>
          <p className="text-muted mt-2">
            Ocurrio un error al activar tu cuenta, verifica que el link no esté
            expirado, error:
            <code className="d-block mt-1">{errorDesc}</code>
          </p>

          <Button type="success" className="mt-2">
            Reenviar código nuevo
          </Button>
        </>
      )}
      {data && (
        <>
          <FiCheckCircle className={cls(styles.icon, styles.iconSuccess)} />
          <h2 className="mt-2">Cuenta Activada</h2>
          <p className="text-muted mt-2">
            La cuenta ha sido activada con exito.
          </p>

          <Link to="/">
            <Button type="success" className="mt-2">
              Iniciar Sesión
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
