<template>
  <c-box>
    <my-bookmarks />
  </c-box>
</template>

<script>
import MyBookmarks from "@/components/MyBookmarks.vue";

export default {
  name: "Home",
  data() {
    return {
      bookmarks: [],
      pageOptions: {},
    };
  },
  components: {
    MyBookmarks,
  },
};
</script>
