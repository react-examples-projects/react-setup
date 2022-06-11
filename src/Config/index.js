import { QueryClient } from "react-query";

export const api = "http://localhost:5000/api/";
export const login = "auth/login";
export const signup = "auth/signup";
export const userInfo = "user";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangePropsExclusions: ["isStale"],
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});
