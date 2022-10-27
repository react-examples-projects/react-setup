import jwtDecode from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function existsToken() {
  return getToken() !== null;
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function isValidToken() {
  if (!existsToken()) return false;
  try {
    const token = getToken();
    const decoded = jwtDecode(token);
    const isExpired = Date.now() >= decoded.exp * 1000;

    if (isExpired) {
      removeToken();
      return false;
    }
  } catch {
    removeToken();
    return false;
  }

  return true;
}
