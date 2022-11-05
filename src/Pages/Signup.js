import useBody from "hooks/utils/useBody";
import useToast from "hooks/utils/useToast";
import useSignup from "hooks/auth/useSignup";
import useCaptcha from "hooks/validations/useCaptcha";
import useEmailInUse from "hooks/validations/useEmailInUse";
import ErrorText from "components/Text/ErrorText";
import useFormValidation from "hooks/validations/useFormValidation";
import signupSchema from "helpers/schema/signupSchema";
import InputLoader from "components/Loaders/InputLoader";
import Captcha from "components/Captcha";
import { Button, Input, Text, Tooltip } from "@geist-ui/core";
import { useNavigate, Link } from "react-router-dom";
import { BiUser, BiEnvelope, BiKey } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";
import { BsHandIndexThumb } from "react-icons/bs";

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
  const { isValidCaptcha, onChange, onExpired, onErrored, ref } = useCaptcha();
  const { inUse, check, ...emailInUse } = useEmailInUse();
  const { error, success } = useToast({ delay: 6000 });
  const { errors, handleSubmit, register } = useFormValidation(signupSchema, {
    defaultValues: { email: "", password: "", passwordConfirm: "", name: "" },
  });

  async function handleOnSubmit(data) {
    if (inUse || !isValidCaptcha) return;
    try {
      const res = await signup.mutateAsync(data);
      success(res.message);
      navigate("/", { replace: true });
    } catch {
      error("Error al registrar la cuenta");
    }
  }
  const checkEmail = (e) => check(e.target.value);

  return (
    <div style={{ maxWidth: "370px" }} className="mx-auto">
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
            onBlur={checkEmail}
            iconRight={emailInUse.isLoading ? <InputLoader /> : <BiEnvelope />}
            disabled={emailInUse.isLoading}
            htmlType="email"
            name="email"
            id="email"
            placeholder="Correo Electrónico"
            autoComplete="off"
            width="100%"
          />
          <ErrorText isVisible={inUse} text="El correo está en uso" />
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

        <Tooltip
          text={
            <Text
              className="text-muted d-flex align-items-center"
              style={{ fontSize: "80%" }}
            >
              <FiAlertTriangle className="me-1" />
              La contraseña debe tener letras
              <span className="fw-bold ms-1">mayúsculas</span>,
              <span className="fw-bold mx-1">minúsculas</span> y un
              <span className="fw-bold mx-1">número</span>
            </Text>
          }
        >
          <Text
            className="text-muted d-flex align-items-center"
            style={{ fontSize: "80%" }}
          >
            <BsHandIndexThumb className="me-1" />
            Maten tu contraseña segura (
            <span className="fw-bold me-1">click</span>
            para más información)
          </Text>
        </Tooltip>

        <div className="mt-2 d-flex justify-content-center mb-3">
          <Captcha {...{ onChange, onExpired, onErrored, ref }} />
        </div>

        <ErrorText isVisible={signup.isError} text={signup} />

        <div className="mb-2 mt-1">
          <div className="d-flex align-items-center w-100">
            <Button
              type="success-light"
              htmlType="submit"
              disabled={
                signup.isLoading ||
                emailInUse.isLoading ||
                inUse ||
                !isValidCaptcha
              }
              loading={signup.isLoading || emailInUse.isLoading}
              className="w-100"
            >
              Registrarse
            </Button>
            <Link to="/" className="ms-2">
              <Button className="w-100">Regresar</Button>
            </Link>
          </div>

          <Link
            style={{ fontSize: "80%" }}
            className="d-block mt-3"
            to="/login"
          >
            Si ya tienes cuenta, entra aquí.
          </Link>
        </div>
      </form>
    </div>
  );
}
