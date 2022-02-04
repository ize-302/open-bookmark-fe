<template>
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
</template>

<script>
export default {
  name: "menuList",
  data() {
    return {
      menu: [
        {
          name: "My bookmarks",
          path: "/my-bookmarks",
        },
        {
          name: "Browse",
          path: "/browse",
        },
        {
          name: "Categories",
          path: "/categories",
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
  color: #fff !important;
  background: #58c184;
}
</style>
