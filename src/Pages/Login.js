import useBody from "hooks/useBody";
import useLogin from "hooks/useLogin";
import useCurrentUser from "hooks/useCurrentUser";
import ErrorText from "components/Text/ErrorText";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Text } from "@geist-ui/core";
import { useState } from "react";
import { BiEnvelope, BiKey } from "react-icons/bi";
import { setToken } from "helpers/token";

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
  const { setUser } = useCurrentUser();
  const [auth, setAuth] = useState({ email: "", password: "" });

  function handleOnChange({ target }) {
    const { name, value } = target;
    setAuth((a) => ({ ...a, [name]: value }));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    const res = await login.mutateAsync(auth);
    if (res.ok) {
      setUser(res.data.user);
      setToken(res.data.token);
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

      <form onSubmit={handleOnSubmit}>
        <div className="mb-2">
          <Input
            iconRight={<BiEnvelope />}
            htmlType="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleOnChange}
            value={auth.user}
            autoComplete="on"
            width="100%"
            required
          />
        </div>

        <div className="mb-2">
          <Input.Password
            iconRight={<BiKey />}
            name="password"
            id="password"
            placeholder="Password"
            value={auth.password}
            onChange={handleOnChange}
            autoComplete="on"
            width="100%"
            required
          />
        </div>
        <ErrorText isVisible={login.isError} text={login} />

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
