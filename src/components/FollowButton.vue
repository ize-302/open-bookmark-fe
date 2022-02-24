<template>
  <c-pseudo-box
    v-if="!isOwnProfile(user)"
    mt="10px"
    as="button"
    @click="handleFollow(user)"
    :bg="isFollowing(user) ? 'red.300' : 'brand.green'"
    padding="5px 20px"
    fontWeight="bold"
    rounded="md"
    color="white"
    >{{ isFollowing(user) ? "Unfollow" : "Follow" }}</c-pseudo-box
  >
</template>

<script>
import UserService from "@/services/users";

export default {
  name: "followButton",
  props: ["user"],
  methods: {
    handleFollow(user) {
      if (this.isFollowing(user)) {
        // unfollow
        UserService.unfollowUser(user.sub).then(() => {
          this.$emit("update");
        });
      } else {
        // follow
        UserService.followUser(user.sub).then(() => {
          this.$emit("update");
        });
      }
    },
  },
};
</script>
