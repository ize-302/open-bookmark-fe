<template>
  <div>
    <nav-bar />
    <c-flex
      py="50px"
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
        <c-stack rounded="md" position="sticky" top="80px">
          <c-box v-for="(item, index) in menu" :key="index">
            <c-link
              :_hover="{
                bg: 'green.200',
                textDecoration: 'none',
                color: 'white',
              }"
              rounded="lg"
              display="block"
              color="gray.400"
              fontSize="18px"
              as="router-link"
              :to="item.path"
              py="10px"
              pl="20px"
              >{{ item.name }}</c-link
            >
          </c-box>
        </c-stack>
      </c-box>
      <c-box :width="['100%', '100%', '73%', '55%']">
        <slot />
      </c-box>
      <c-box :display="['none', 'none', 'none', 'block']" width="20%"></c-box>
    </c-flex>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar.vue";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      menu: [
        {
          name: "My bookmarks",
          path: "/my-bookmarks",
        },
        {
          name: "Saved bookmarks",
          path: "/saved-bookmarks",
        },
        {
          name: "Browse",
          path: "/browse",
        },
        {
          name: "Trash",
          path: "/trash",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.router-link-active {
  font-weight: 600;
  color: #fff;
  background: #58c184;
}
</style>
