import { createUser } from "helpers/api";
import { useMutation } from "react-query";

export default function useCreateUser() {
  const obj = useMutation((payload) => createUser(payload));
  return obj;
}
