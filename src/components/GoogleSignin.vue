<template>
  <div>
    <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">
      <c-button size="lg"
        ><c-icon name="google" mr="5px" /> Sign in with Google</c-button
      >
    </GoogleLogin>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
import AuthService from "@/services/auth";
import { saveTokenInCookies, getTokenFromCookies } from "@/utils/cookies";

export default {
  data() {
    return {
      params: {
        client_id: `${process.env.VUE_APP_PUBLIC_GOOGLE_CLIENT_ID}`,
      },
    };
  },
  components: {
    GoogleLogin,
  },
  methods: {
    onSuccess(googleUser) {
      AuthService.verify(googleUser.wc.id_token).then((data) => {
        saveTokenInCookies(data.access_token);
        localStorage.setItem(
          `${this.version()}_refresh_token`,
          data.refresh_token
        );
        if (getTokenFromCookies()) {
          window.location.href = "/my-bookmarks";
        }
      });
    },
    onFailure(googleUser) {
      console.log("error", googleUser);
    },
  },
};
</script>
