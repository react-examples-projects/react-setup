import { useMutation } from "react-query";
import { resendVerifyCode } from "helpers/api";

export default function useResendVerifyCode() {
  const obj = useMutation((data) => resendVerifyCode(data));
  return obj;
}
