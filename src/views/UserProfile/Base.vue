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
            <c-pseudo-box
              v-if="!isOwnProfile"
              mt="10px"
              as="button"
              @click="handleFollow()"
              :bg="isFollowing ? 'red.300' : 'brand.green'"
              padding="5px 20px"
              fontWeight="bold"
              rounded="md"
              color="white"
              >{{ isFollowing ? "Unfollow" : "Follow" }}</c-pseudo-box
            >
            <c-stack mt="10px" fontSize="14px" direction="row" :spacing="6">
              <c-link
                ><b>{{ user.followers && user.followers.length }}</b> followers
              </c-link>
              <c-link
                ><b>{{ user.following && user.following.length }}</b>
                following</c-link
              >
            </c-stack>
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
  watch: {
    $route() {
      this.getUser();
    },
  },
  computed: {
    isFollowing() {
      return (
        this.user.followers && this.user.followers.includes(this.loggedUser.sub)
      );
    },
  },
  methods: {
    handleFollow() {
      if (this.isFollowing) {
        // unfollow
        UserService.unfollowUser(this.$route.params.id).then(() => {
          this.getUser();
        });
      } else {
        // follow
        UserService.followUser(this.$route.params.id).then(() => {
          this.getUser();
        });
      }
    },
    getUser() {
      UserService.getUser(this.$route.params.id).then((data) => {
        this.user = data;
      });
    },
  },
  created() {
    this.getUser();
  },
};
</script>
