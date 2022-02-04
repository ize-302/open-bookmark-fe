import Vue from "vue";
import { supabase } from "@/lib/supabase";
import { verifyToken } from "@/utils/jwt";

Vue.mixin({
  data() {
    return {
      session: supabase.auth.session(),
    };
  },
  methods: {
    isEmpty(val) {
      if (val !== null && typeof val === "object") {
        if (Object.keys(val).length === 0) return true;
      } else if (val == null || val === "") {
        return true;
      }
      return false;
    },
  },
  computed: {
    currentPage() {
      return this.$route.name;
    },
    isOwnProfile() {
      const user = verifyToken(this.session?.access_token);
      return user.sub === this.$route.params.id;
    },
    loggedUser() {
      return verifyToken(this.session?.access_token);
    },
  },
});
