import { getAllUsers } from "helpers/api";
import { useQuery } from "react-query";

export default function useUserList() {
  const obj = useQuery("users", getAllUsers);
  return obj;
}
