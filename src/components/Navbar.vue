<template>
  <c-box
    position="sticky"
    borderBottom="1px solid #ddd"
    width="100%"
    left="0"
    top="0"
    background="white"
  >
    <c-flex
      maxW="1500px"
      margin="0 auto"
      px="20px"
      py="10px"
      justifyContent="space-between"
      alignItems="center"
    >
      <c-flex>
        <sidebar-mobile />
        <c-heading marginLeft="10px" fontSize="20px" color="brand.green"
          >OpenBookmark</c-heading
        >
      </c-flex>
      <c-menu>
        <c-menu-button p="10px 5px" variant="solid" bg="brand.lightGreen">
          <c-avatar
            :name="user.user_metadata.full_name"
            :src="user.user_metadata.avatar_url"
            size="sm"
          />
          <c-text
            :display="['none', 'block']"
            mx="7px"
            fontWeight="400"
            fontSize="16px"
            >{{ user.user_metadata.full_name }}</c-text
          >
        </c-menu-button>
        <c-menu-list>
          <c-menu-group
            :display="['block', 'none']"
            :title="user.user_metadata.full_name"
          />
          <c-menu-item>My Profile</c-menu-item>
          <c-menu-item @click="signout()" color="red.300">Log out</c-menu-item>
        </c-menu-list>
      </c-menu>
    </c-flex>
  </c-box>
</template>

<script>
import { supabase } from "../lib/supabase";
import { removeTokenFromCookies } from "@/utils/cookies";
import { verifyToken } from "@/utils/jwt";
import SidebarMobile from "@/components/SidebarMobile.vue";

export default {
  data() {
    return {
      session: supabase.auth.session(),
    };
  },
  components: {
    SidebarMobile,
  },
  mounted() {
    if (!verifyToken(this.session?.access_token)) {
      this.$router.push("/");
    }
  },
  computed: {
    user() {
      console.log(this.session?.access_token);
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
