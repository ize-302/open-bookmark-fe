import Vue from "vue";
import { verifyToken } from "@/utils/jwt";
import { getTokenFromCookies } from "@/utils/cookies";
const access_token = getTokenFromCookies();

Vue.mixin({
  methods: {
    isEmpty(val) {
      if (val !== null && typeof val === "object") {
        if (Object.keys(val).length === 0) return true;
      } else if (val == null || val === "") {
        return true;
      }
      return false;
    },
    version() {
      return process.env.VUE_APP_LS_VERSION.split(".").join("");
    },
  },
  computed: {
    currentPage() {
      return this.$route.name;
    },
    isOwnProfile() {
      const user = verifyToken(access_token);
      return user.sub === this.$route.params.id;
    },
    loggedUser() {
      return verifyToken(access_token);
    },
  },
});
