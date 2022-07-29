import { QueryClient } from "react-query";

export const api = "http://localhost:5000/api/";
export const login = "auth/login";
export const signup = "auth/signup";
export const userInfo = "user/";
export const createUser = "user/";
export const editUser = (id) => "user/" + id;
export const deleteUser = (id) => "user/" + id;
export const toggleUserIdle = (id) => "user/idle/" + id;
export const getUsers = "user/users/";

export const USER_RANKS = {
  ADMIN: {
    name: "admin",
    label: "Administrador",
  },
  USER: {
    name: "user",
    label: "Usuario",
  },
};

export const USER_FILTERS = {
  BY_NAME: "byName",
  BY_RANK: "byRank",
  BY_DATE: "byDate",
  ALL: "all",
};

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
