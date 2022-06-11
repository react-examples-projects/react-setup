import { signupUser } from "helpers/api";
import { useMutation } from "react-query";

export default function useSignup() {
  const obj = useMutation((auth) => signupUser(auth));
  return obj;
}
