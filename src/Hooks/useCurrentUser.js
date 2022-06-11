import { useContext } from "react";
import UserContext from "context/UserContext";

export default function useCurrentUser() {
  const contextData = useContext(UserContext);
  if (!contextData)
    throw new Error("The user context must be in a `<UserContext.Provider>`");
  return contextData;
}
