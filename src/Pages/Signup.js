import useBody from "hooks/useBody";
import useSignup from "hooks/useSignup";
import ErrorText from "components/Text/ErrorText";
import useFormValidation from "hooks/useFormValidation";
import signupSchema from "helpers/schema/signupSchema";
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
  const { errors, handleSubmit, register } = useFormValidation(signupSchema);
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

  async function handleOnSubmit() {
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

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="mb-2">
          <Input
            {...register("name")}
            iconRight={<BiUser />}
            name="name"
            id="name"
            placeholder="Nombre completo"
            onChange={handleOnChange}
            value={auth.name}
            autoComplete="off"
            width="100%"
          />
          <ErrorText
            className="mt-2"
            text={errors.name?.message}
            isVisible={!!errors.name?.message}
          />
        </div>

        <div className="mb-2">
          <Input
            {...register("email")}
            iconRight={<BiEnvelope />}
            htmlType="email"
            name="email"
            id="email"
            placeholder="Correo Electrónico"
            onChange={handleOnChange}
            value={auth.user}
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
            placeholder="Contraseña"
            value={auth.password}
            onChange={handleOnChange}
            autoComplete="off"
            width="100%"
          />
          <ErrorText
            className="mt-2"
            text={errors.password?.message}
            isVisible={!!errors.password?.message}
          />
        </div>

        <div className="mb-2">
          <Input.Password
            {...register("passwordConfirm")}
            iconRight={<BiKey />}
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="Confirmar Contraseña"
            value={auth.passwordConfirm}
            onChange={handleOnChange}
            width="100%"
          />
          <ErrorText
            className="mt-2"
            text={errors.passwordConfirm?.message}
            isVisible={!!errors.passwordConfirm?.message}
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
