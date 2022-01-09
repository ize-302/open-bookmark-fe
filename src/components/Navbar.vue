<template>
  <c-box
    position="sticky"
    borderBottom="1px solid #ddd"
    width="100%"
    left="0"
    top="0"
    background="white"
    zIndex="1"
  >
    <c-flex
      maxW="1500px"
      margin="0 auto"
      px="20px"
      py="10px"
      justifyContent="space-between"
      alignItems="center"
    >
      <c-heading fontSize="20px" color="brand.green">Open Bookmark</c-heading>
      <c-menu>
        <c-menu-button
          p="20px 10px"
          right-icon="chevron-down"
          variant="solid"
          bg="brand.lightGreen"
        >
          <c-avatar
            :name="user.user_metadata.full_name"
            :src="user.user_metadata.avatar_url"
            size="sm"
          />
          <c-text mx="7px" fontWeight="400" fontSize="16px">{{
            user.user_metadata.full_name
          }}</c-text>
        </c-menu-button>
        <c-menu-list>
          <c-menu-item>My Profile</c-menu-item>
          <c-menu-divider />
          <c-menu-item>Trash</c-menu-item>
          <c-menu-divider />
          <c-menu-item @click="signout()" color="red.500">Log out</c-menu-item>
        </c-menu-list>
      </c-menu>
    </c-flex>
  </c-box>
</template>

<script>
import { supabase } from "../lib/supabase";
import { removeTokenFromCookies } from "@/utils/cookies";
import { verifyToken } from "@/utils/jwt";

export default {
  data() {
    return {
      session: supabase.auth.session(),
    };
  },
  mounted() {
    if (!verifyToken(this.session?.access_token)) {
      this.$router.push("/");
    }
  },
  computed: {
    user() {
      console.log(verifyToken(this.session?.access_token));
      return verifyToken(this.session?.access_token);
    },
  },
  methods: {
    signout() {
      supabase.auth.signOut();
      removeTokenFromCookies();
      this.$router.push("/");
    },
  },
};
</script>
