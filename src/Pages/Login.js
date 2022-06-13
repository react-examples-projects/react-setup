import useBody from "hooks/useBody";
import useLogin from "hooks/useLogin";
import useFormValidation from "hooks/useFormValidation";
import loginSchema from "helpers/schema/loginSchema";
import ErrorText from "components/Text/ErrorText";
import { getErrorValidation } from "helpers/utils";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Text } from "@geist-ui/core";
import { BiUser, BiKey } from "react-icons/bi";

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
  const { errors, handleSubmit, register } = useFormValidation(loginSchema, {
    defaultValues: { email: "", password: "" },
  });

  async function handleOnSubmit(data) {
    const res = await login.mutateAsync(data);
    if (res.ok) {
      login.setSession(res.data.token, res.data.user);
      navigate("/dashboard", { replace: true });
    }
  }

  return (
    <div style={{ maxWidth: "370px" }}>
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
        <ErrorText isVisible={login.isError} text={getErrorValidation(login)} />

        <div className="mb-2">
          <Button
            htmlType="submit"
            disabled={login.isLoading}
            loading={login.isLoading}
            width="100%"
          >
            Iniciar
          </Button>

          <Text className="text-muted" style={{ fontSize: "80%" }}>
            Si no tienes cuenta, puedes crearla <Link to="/signup">aca</Link>.
          </Text>
        </div>
      </form>
    </div>
  );
}
