import { useMutation } from "react-query";
import { sendRecoveryPassword } from "helpers/api";

export default function useResetPassword() {
  const obj = useMutation((data) => sendRecoveryPassword(data));
  return obj;
}
