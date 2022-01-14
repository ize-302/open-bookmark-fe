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
import {
  saveTokenInCookies,
  getTokenFromCookies,
  verifyToken,
} from "@/utils/cookies";
import { supabase } from "../lib/supabase";

export default {
  components: { GoogleSignin },
  name: "landing",
  mounted() {
    console.log("env", process.env.VUE_APP_PUBLIC_SUPBASE_JWT_SECRET);
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("session", verifyToken(session));
      saveTokenInCookies(session?.access_token);
      if (getTokenFromCookies()) location.href = "/my-bookmarks";
    });
  },
};
</script>
