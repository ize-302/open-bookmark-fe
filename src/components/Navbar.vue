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
        <c-link as="router-link" :to="{ name: 'myBookmarks' }">
          <c-heading marginLeft="10px" fontSize="20px" color="brand.green"
            >OpenBookmark</c-heading
          >
        </c-link>
      </c-flex>
      <c-menu>
        <c-menu-button p="10px 5px" variant="solid" bg="brand.lightGreen">
          <c-avatar
            bg="brand.green"
            :name="user.full_name"
            :src="user.avatar_url"
            size="sm"
          />
          <c-text
            :display="['none', 'block']"
            mx="7px"
            fontWeight="400"
            fontSize="16px"
            >{{ user.full_name }}</c-text
          >
        </c-menu-button>
        <c-menu-list>
          <c-menu-group :display="['block', 'none']" :title="user.full_name" />
          <c-menu-item
            @click="$router.push({ name: 'profile', params: { id: user.sub } })"
            >My Profile</c-menu-item
          >
          <c-menu-item @click="signout()" color="red.300">Log out</c-menu-item>
        </c-menu-list>
      </c-menu>
    </c-flex>
  </c-box>
</template>

<script>
import { removeTokenFromCookies, getTokenFromCookies } from "@/utils/cookies";
import { verifyToken } from "@/utils/jwt";
import SidebarMobile from "@/components/SidebarMobile.vue";
import UserService from "@/services/users";

export default {
  data() {
    return {
      user: {},
    };
  },
  components: {
    SidebarMobile,
  },
  created() {
    const access_token = getTokenFromCookies();
    const data = verifyToken(access_token);
    UserService.getUser(data && data.sub).then((data) => {
      this.user = data;
    });
  },
  methods: {
    signout() {
      removeTokenFromCookies();
      localStorage.removeItem("refresh_token");
      window.location.href = "/";
    },
  },
};
</script>
