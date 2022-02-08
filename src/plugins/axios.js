import axios from "axios";
import { verifyToken } from "@/utils/jwt";
import AuthService from "@/services/auth";
import { removeTokenFromCookies, saveTokenInCookies } from "../utils/cookies";

let httpDefault;

const version = process.env.VUE_APP_LS_VERSION.split(".").join("");

export default {
  install(Vue) {
    axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_VERSION}`;
    httpDefault = axios.create();

    Vue.prototype.$http = httpDefault;
    httpDefault.interceptors.request.use(
      this.requestInterceptor(Vue, httpDefault)
    );
  },
  requestInterceptor(Vue, http) {
    http.interceptors.request.use(
      async (config) => {
        const accessToken = config.headers.Authorization;
        const isValidToken = verifyToken(accessToken);
        const refreshToken = window.localStorage.getItem(
          `${version}_refresh_token`
        );
        if (!accessToken) {
          //
        } else if (accessToken) {
          if (!isValidToken) {
            AuthService.refreshToken(refreshToken)
              .then((data) => {
                config.headers.Authorization = "Bearer " + data.access_token;
                saveTokenInCookies(data.access_token);
                window.location.reload();
              })
              .catch((err) => {
                console.log("error: ", err);
                removeTokenFromCookies();
                window.localStorage.removeItem(`${version}_refresh_token`);
                window.location.href = "/";
              });
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
};
