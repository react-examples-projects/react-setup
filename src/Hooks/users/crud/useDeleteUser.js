import { deleteUser } from "helpers/api";
import { useMutation } from "react-query";

export default function useDeleteUser() {
  const obj = useMutation((payload) => deleteUser(payload));
  return obj;
}
