import { toggleUserIdle } from "helpers/api";
import { useMutation } from "react-query";

export default function useToggleUserIdle() {
  const obj = useMutation((payload) => toggleUserIdle(payload));
  return obj;
}
