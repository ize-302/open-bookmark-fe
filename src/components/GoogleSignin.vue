<template>
  <c-button @click="signInWithGoogle()" size="lg"
    ><c-icon name="google" mr="5px" /> Sign in with Google</c-button
  >
</template>

<script>
import { supabase } from "../lib/supabase";
export default {
  methods: {
    async signInWithGoogle() {
      const session = supabase.auth.session();
      if (session) {
        this.$router.push({ name: "myBookmarks" });
      } else {
        await supabase.auth.signIn(
          { provider: "google" },
          { redirectTo: window.location.origin }
        );
      }
    },
  },
};
</script>
