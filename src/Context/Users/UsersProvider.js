import UsersContext from "context/Users/UsersContext";
import useUserList from "hooks/users/useUserList";

export default function UsersProvider({children}) {
  const value = useUserList();
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}
