import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Chakra, {
  CThemeProvider,
  CColorModeProvider,
  CReset,
  CBox,
} from "@chakra-ui/vue";
import Axios from "@/plugins/axios";
import customTheme from "./custom-theme.js";
import VueClipboard from "vue-clipboard2";
import customIcons from "./customIcons";

Vue.use(VueClipboard);

// global mixins
import "@/filters";
import "@/mixins";

// Import FontAwesome icons
import {
  faGlobeAfrica,
  faLock,
  faEllipsisV,
  faMoon,
  faSun,
  faArrowRight,
  faArrowLeft,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

Vue.use(Chakra, {
  icons: {
    // Here we state that we use `fa`
    // icons library for Chakra's
    // internal icon parser
    extend: {
      ...customIcons,
    },
    iconPack: "fa",
    iconSet: {
      faGlobeAfrica,
      faLock,
      faEllipsisV,
      faMoon,
      faSun,
      faArrowRight,
      faArrowLeft,
      faBars,
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
  render: (h) =>
    h(CThemeProvider, [h(CColorModeProvider, [h(CBox, [h(CReset), h(App)])])]),
}).$mount("#app");
