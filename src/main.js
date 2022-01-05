import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Chakra, { CThemeProvider, CReset } from "@chakra-ui/vue";
import Axios from "@/plugins/axios";
import customTheme from "./custom-theme.js";

// Import FontAwesome icons
import {
  faGlobeAfrica,
  faLock,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";

Vue.use(Chakra, {
  icons: {
    // Here we state that we use `fa`
    // icons library for Chakra's
    // internal icon parser
    iconPack: "fa",
    iconSet: {
      faGlobeAfrica,
      faLock,
      faEllipsisV,
    },
  },
  extendTheme: customTheme,
});
// custom axios plugin
Vue.use(Axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(CThemeProvider, [h(CReset), h(App)]),
}).$mount("#app");
