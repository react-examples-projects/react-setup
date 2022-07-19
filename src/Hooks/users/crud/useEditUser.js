import { editUser } from "helpers/api";
import { useMutation } from "react-query";

export default function useEditUser() {
  const obj = useMutation((payload) => editUser(payload));
  return obj;
}
