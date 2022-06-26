import {
  api,
  login,
  signup,
  userInfo,
  getUsers,
  createUser as _createUser,
  editUser as _editUser,
  deleteUser as _deleteUser,
} from "config/";
import { getToken, removeToken, isValidToken } from "helpers/token";
import axios from "axios";

const instance = axios.create({
  baseURL: api,
  headers: {
    "X-Requested-With": "XMLHttpRequest", // agregar a mern-template
  },
});

instance.interceptors.request.use((req) => {
  if (isValidToken()) {
    req.headers.authorization = "Bearer " + getToken();
  }
  return req;
});

instance.interceptors.response.use(
  (res) => res?.data?.data,
  (err) => {
    if (err.code === "ERR_NETWORK") return Promise.reject(err.message);

    if (
      err.response.data.statusCode === 401 &&
      err.response.config.url !== userInfo // The private router check this
    ) {
      isValidToken() && removeToken();
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export async function setLogin(auth) {
  const res = await instance.post(login, auth);
  return res;
}

export async function signupUser(payload) {
  const res = await instance.post(signup, payload);
  return res;
}

export async function getUserInfo() {
  const res = await instance.get(userInfo);
  return res;
}

export async function createUser(payload) {
  const res = await instance.post(_createUser, payload);
  return res;
}

export async function editUser(payload) {
  const res = await instance.put(_editUser(payload.get("_id")), payload);
  return res;
}

export async function deleteUser(payload) {
  const res = await instance.delete(_deleteUser(payload.get("_id")), {
    data: payload,
  });
  return res;
}

export async function getAllUsers() {
  const res = await instance.get(getUsers);
  return res;
}
