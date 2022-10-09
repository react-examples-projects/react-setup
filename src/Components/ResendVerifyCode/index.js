import ErrorText from "components/Text/ErrorText";
import useFormValidation from "hooks/validations/useFormValidation";
import resendVerifyCodeSchema from "helpers/schema/resendVerifyCodeSchema";
import useResendVerifyCode from "hooks/auth/useResendVerifyCode";
import useToast from "hooks/utils/useToast";
import { Button, Input } from "@geist-ui/core";

export default function ResendVerifyCode() {
  const resendCodeMutation = useResendVerifyCode();
  const { error, success } = useToast();
  const { register, handleSubmit, errors } = useFormValidation(
    resendVerifyCodeSchema
  );
  const onSubmit = async (data) => {
    try {
      const res = await resendCodeMutation.mutateAsync(data);
      console.log(res);
      success("Se reenvió el código de confirmación");
    } catch (err) {
      console.log(err);
      error("Hubo un error al enviar el código de confirmación");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email")}
        htmlType="email"
        scale={4 / 3}
        width="100%"
        placeholder="example@gmail.com"
        className="text-center"
      />

      <ErrorText
        className="mt-2"
        text={errors.email?.message}
        isVisible={!!errors.email?.message}
      />

      <Button htmlType="submit" type="success" className="mt-2">
        Reenviar código nuevo
      </Button>
    </form>
  );
}
