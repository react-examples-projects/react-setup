import useBody from "hooks/useBody";
import useSignup from "hooks/useSignup";
import ErrorText from "components/Text/ErrorText";
import { Button, Input, Text } from "@geist-ui/core";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BiUser, BiEnvelope, BiKey } from "react-icons/bi";

const cssBody = {
  backgroundSize: "cover",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Signup() {
  useBody(cssBody);
  const signup = useSignup();
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });

  function handleOnChange({ target }) {
    const { name, value } = target;
    setAuth((a) => ({ ...a, [name]: value }));
  }

  async function handleOnSubmit(e) {
    console.log(e);
    e.preventDefault();
    const res = await signup.mutateAsync(auth);
    if (res.ok) {
      navigate("/", { replace: true });
    }
  }

  return (
    <div style={{ maxWidth: "370px" }}>
      <Text className="mb-4" h3>
        Registrate
      </Text>

      <form onSubmit={handleOnSubmit}>
        <div className="mb-2">
          <Input
            iconRight={<BiUser />}
            name="name"
            id="name"
            placeholder="Name"
            onChange={handleOnChange}
            value={auth.name}
            autoComplete="on"
            width="100%"
            required
          />
        </div>

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

        <div className="mb-2">
          <Input.Password
            iconRight={<BiKey />}
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="Password Confirm"
            value={auth.passwordConfirm}
            onChange={handleOnChange}
            width="100%"
            required
          />
        </div>

        <Text className="text-muted" style={{ fontSize: "80%" }}>
          La clave debe tener letras mayúsculas, minúsculas y un número
        </Text>

        <ErrorText isVisible={signup.isError} text={signup} />

        <div className="mb-2">
          <Button
            htmlType="submit"
            disabled={signup.isLoading}
            loading={signup.isLoading}
            width="100%"
          >
            Registrarse
          </Button>
          <Text className="text-muted" style={{ fontSize: "80%" }}>
            Si ya tienes cuenta, entra <Link to="/">aca</Link>.
          </Text>
        </div>
      </form>
    </div>
  );
}
