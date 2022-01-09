<template>
  <c-grid bg="brand.green" height="100vh" width="100vw" placeItems="center">
    <c-box textAlign="center">
      <c-heading mb="100px" fontSize="54px" color="white"
        >Open Bookmark!</c-heading
      >
      <google-signin />
    </c-box>
  </c-grid>
</template>

<script>
import GoogleSignin from "../components/GoogleSignin.vue";
import { saveTokenInCookies } from "@/utils/cookies";
import { supabase } from "../lib/supabase";

export default {
  components: { GoogleSignin },
  name: "landing",
  mounted() {
    supabase.auth.onAuthStateChange((event, session) => {
      saveTokenInCookies(session?.access_token);
      this.$router.push({ name: "myBookmarks" });
    });
  },
};
</script>
