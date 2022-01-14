import axios from "axios";

export default {
  install(Vue) {
    axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_API_VERSION}`;
    Vue.http = axios;
  },
};
