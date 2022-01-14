import Cookies from "js-cookie";

export function saveTokenInCookies(token) {
  return Cookies.set("access_token", token);
}

export function getTokenFromCookies() {
  return Cookies.get("access_token");
}

export function removeTokenFromCookies() {
  return Cookies.remove("access_token");
}
