import UserContext from "context/User/UserContext";
import { useState, useCallback, useMemo } from "react";
import { removeToken } from "helpers/token";
import { useQueryClient } from "react-query";

export default function UserProvider({ children }) {
  const queryClient = useQueryClient();
  const [user, setUserInfo] = useState(null);
  const setUser = useCallback(
    (data) => setUserInfo((u) => ({ ...u, ...data })),
    []
  );

  const logout = useCallback(() => {
    removeToken();
    setUserInfo(null);
    queryClient.invalidateQueries("user");
    queryClient.removeQueries();
  }, [queryClient]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout,
    }),
    [user, logout, setUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
