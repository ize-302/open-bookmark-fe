<template>
  <div>
    <nav-bar />
    <c-flex
      py="30px"
      px="20px"
      width="100%"
      maxW="1500px"
      justifyContent="space-between"
      margin="0 auto"
    >
      <c-box
        :display="['none', 'none', 'block']"
        :width="['', '', '25%', '20%']"
        :mr="['10px', '20px', '0']"
        position="relative"
        top="0"
      >
      </c-box>
      <c-box :width="['100%', '100%', '73%', '55%']">
        <c-flex :flexDirection="['column', 'row']">
          <c-avatar
            mr="30px"
            bg="brand.green"
            :name="user.full_name"
            :src="user.avatar_url"
            fontSize="35px"
            :height="['100px', '150px']"
            :width="['100px', '150px']"
          />
          <c-box mt="20px">
            <c-text fontSize="26px">{{ user.full_name }}</c-text>
            <c-text
              >Hi there, I'm a Software Developer excited about developing
              intuitive User Interfaces with awesome User Experiences</c-text
            >
          </c-box>
        </c-flex>
        <c-box mt="20px" pt="20px" borderTop="1px solid #eee">
          <my-bookmarks v-if="isOwnProfile" />
          <user-public-bookmarks v-else />
        </c-box>
      </c-box>
      <c-box :display="['none', 'none', 'none', 'block']" width="20%"></c-box>
    </c-flex>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import UserService from "@/services/users";
import MyBookmarks from "@/components/shared/Bookmark/MyBookmarks.vue";
import UserPublicBookmarks from "@/components/Bookmark/UserPublicBookmarks.vue";

export default {
  data() {
    return {
      user: {},
    };
  },
  components: {
    NavBar,
    MyBookmarks,
    UserPublicBookmarks,
  },
  created() {
    UserService.getUser(this.$route.params.id).then((data) => {
      this.user = data;
    });
  },
};
</script>
