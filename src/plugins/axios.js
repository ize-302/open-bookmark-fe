import axios from "axios";
let httpSkip404, httpCancelRequest, httpSkip500, httpSilentError;

export default {
  install(Vue) {
    axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_VERSION}`;

    Vue.prototype.$http = axios;
    Vue.prototype.$httpSkip404 = httpSkip404;
    Vue.prototype.$httpSkip500 = httpSkip500;
    Vue.prototype.$httpSilentError = httpSilentError;
    Vue.prototype.$httpCancelRequest = httpCancelRequest;
  },
};
