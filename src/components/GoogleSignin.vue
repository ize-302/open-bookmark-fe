<template>
  <div>
    <GoogleLogin
      v-if="!isLoggedIn"
      :params="params"
      :onSuccess="onSuccess"
      :onFailure="onFailure"
    >
      <c-button
        size="lg"
        rounded="10px"
        bg="transparent"
        color="green.700"
        fontWeight="500"
        padding="0"
        :_hover="{
          bg: 'transparent',
          textDecoration: 'underline',
        }"
        >Sign in</c-button
      >
    </GoogleLogin>
    <c-button @click="$router.push({ name: 'myBookmarks' })" v-else size="lg"
      >Continue to bookmarks 👉</c-button
    >
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
  computed: {
    isLoggedIn() {
      return getTokenFromCookies();
    },
  },
  methods: {
    onSuccess(googleUser) {
      const authResponse = googleUser.getAuthResponse();
      AuthService.verify(authResponse.id_token).then((data) => {
        saveTokenInCookies(data.access_token);
        localStorage.setItem(
          `${this.version()}_refresh_token`,
          data.refresh_token
        );
        const accessTokenExists = getTokenFromCookies();
        if (accessTokenExists) {
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
