<template>
  <c-box>
    <navbar />
    <my-bookmarks />
  </c-box>
</template>

<script>
import MyBookmarks from "@/components/MyBookmarks.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "home",
  data() {
    return {
      bookmarks: [],
      pageOptions: {},
    };
  },
  components: {
    MyBookmarks,
    Navbar,
  },
};
</script>
