import useCurrentUser from "hooks/users/useCurrentUser";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getUserInfo } from "helpers/api";
import { isValidToken } from "helpers/token";

export default function useUserInfo() {
  const isValidTokenSession = isValidToken();
  const { user, setUser, logout } = useCurrentUser();
  const { data, isError, ...args } = useQuery("user", getUserInfo, {
    enabled: isValidTokenSession,
  });

  useEffect(() => {
    if (isError) return logout();
    if (user || !data) return;

    setUser({
      ...data,
      isAdmin: data.rank === "admin",
    });
  }, [data, isError, setUser, logout, user]);

  return { user: data, isError, ...args };
}
