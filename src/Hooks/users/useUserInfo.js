import useCurrentUser from "hooks/users/useCurrentUser";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getUserInfo } from "helpers/api";
import { isValidToken } from "helpers/token";

export default function useUserInfo() {
  const { user, setUser, logout } = useCurrentUser();
  const { data, isError, ...args } = useQuery("user", getUserInfo, {
    enabled: isValidToken() && !user,
  });
  
  useEffect(() => {
    if (isValidToken()) {
      if (!isError && data && !user) {
        setUser({
          ...data,
          isAdmin: data?.rank === "admin",
        });
      } else if (isError) {
        logout();
      }
    }
  }, [data, isError, setUser, logout, user]);

  return { user: data || user, isError, ...args };
}
