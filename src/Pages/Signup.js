import useBody from "hooks/useBody";
import useToast from "hooks/useToast";
import useSignup from "hooks/useSignup";
import ErrorText from "components/Text/ErrorText";
import useFormValidation from "hooks/useFormValidation";
import signupSchema from "helpers/schema/signupSchema";
import { Button, Input, Text } from "@geist-ui/core";
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
  const { error } = useToast();
  const { errors, handleSubmit, register } = useFormValidation(signupSchema, {
    defaultValues: { email: "", password: "", passwordConfirm: "", name: "" },
  });

  async function handleOnSubmit(data) {
    try {
      const res = await signup.mutateAsync(data);
      if (res?.name && res?.email) {
        navigate("/", { replace: true });
      }
    } catch {
      error("Error al registrar la cuenta");
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
            className="text-capitalize-input"
            placeholder="Nombre completo"
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
