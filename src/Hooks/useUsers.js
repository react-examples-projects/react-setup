import { useContext } from "react";
import UsersContext from "context/Users/UsersContext";

export default function useUsers() {
  const contextData = useContext(UsersContext);
  if (!contextData)
    throw new Error("The users context must be in a `<UsersContext.Provider>`");
  return contextData;
}
