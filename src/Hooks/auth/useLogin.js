import useCurrentUser from "hooks/users/useCurrentUser";
import { setLogin } from "helpers/api";
import { useMutation } from "react-query";
import { setToken } from "helpers/token";

export default function useLogin() {
  const { setUser } = useCurrentUser();
  const obj = useMutation((auth) => setLogin(auth));
  const setSession = (token, user) => {
    setToken(token);
    setUser(user);
  };

  return {
    ...obj,
    setSession,
  };
}