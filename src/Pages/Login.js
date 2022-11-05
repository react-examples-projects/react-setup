import useBody from "hooks/utils/useBody";
import useLogin from "hooks/auth/useLogin";
import useToast from "hooks/utils/useToast";
import useCaptcha from "hooks/validations/useCaptcha";
import useFormValidation from "hooks/validations/useFormValidation";
import loginSchema from "helpers/schema/loginSchema";
import ErrorText from "components/Text/ErrorText";
import Alert from "components/Alerts/";
import Captcha from "components/Captcha";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Text } from "@geist-ui/core";
import { BiUser, BiKey } from "react-icons/bi";
import { useState } from "react";

const cssBody = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Login() {
  useBody(cssBody);
  const login = useLogin();
  const navigate = useNavigate();
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isIdle, setIdle] = useState(false);
  const [isVerified, setVerified] = useState(true);
  const { isValidCaptcha, reset, onChange, onExpired, onErrored, ref } = useCaptcha();
  const { error } = useToast();
  const { errors, handleSubmit, register } = useFormValidation(loginSchema, {
    defaultValues: { email: "", password: "" },
  });
  const isReachedLoginAttempts = loginAttempts > 2;
  const isInvalidForm = !isValidCaptcha && isReachedLoginAttempts;

  async function handleOnSubmit(data) {
    if (isInvalidForm) return;

    try {
      setIdle(false);
      const res = await login.mutateAsync(data);
      if (res?.isIdle) return setIdle(true);
      if ("isVerified" in res && !res.isVerified) return setVerified(false);

      if (res?.user && res?.token) {
        login.setSession(res.token, res.user);
        navigate("/dashboard", { replace: true });
      }
    } catch {
      error("Error al iniciar sesión");
      if (isReachedLoginAttempts) {
        reset();
      } else {
        setLoginAttempts((c) => c + 1);
      }
    }
  }

  return (
    <div style={{ maxWidth: "370px" }} className="mx-auto">
      <Text className="mb-4" h3>
        Inicia Sesión
      </Text>

      <Text className="text-muted">
        Necesitas tener una cuenta para acceder al contenido de esta página.
      </Text>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="mb-2">
          <Input
            {...register("email")}
            iconRight={<BiUser />}
            htmlType="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="off"
            width="100%"
          />
          <ErrorText
            className="mt-2"
            text={errors.email?.message}
            isVisible={!!errors.email?.message}
          />
        </div>

        <div className="mb-2">
          <Input.Password
            {...register("password")}
            iconRight={<BiKey />}
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            width="100%"
          />
          <ErrorText
            className="mt-2"
            text={errors.password?.message}
            isVisible={!!errors.password?.message}
          />
        </div>

        {isReachedLoginAttempts && (
          <div className="mt-2 d-flex justify-content-center">
            <Captcha {...{ onChange, onExpired, onErrored, ref }} />
          </div>
        )}
        <ErrorText isVisible={login.isError} text={login} />
        <ErrorText
          isVisible={isReachedLoginAttempts}
          text="Muchos intentos fallidos"
        />
        <Alert
          title="Error al inicia sesión"
          content="Tu cuenta se encuentra deshabilitada, contacta con un moderador."
          className="mb-2"
          visible={isIdle}
        />

        <Alert
          title="Error al inicia sesión"
          content="Tu cuenta no está verificada, revisa tu correo electrónico."
          className="mb-2"
          visible={!isVerified}
        />

        <div className="mb-2 mt-3">
          <div className="d-flex align-items-center w-100">
            <Button
              type="success-light"
              htmlType="submit"
              disabled={login.isLoading || isInvalidForm}
              loading={login.isLoading}
              className="w-100"
            >
              Iniciar
            </Button>
            <Link to="/" className="ms-2">
              <Button className="w-100">Regresar</Button>
            </Link>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <Link style={{ fontSize: "80%" }} to="/signup">
              Crea tu cuenta aquí
            </Link>

            <Link style={{ fontSize: "80%" }} to="/recovery">
              Recuperar clave
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
