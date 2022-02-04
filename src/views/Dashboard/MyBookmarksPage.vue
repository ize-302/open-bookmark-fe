<template>
  <dashboard-layout>
    <my-bookmarks />
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layouts/Dashboard.layout.vue";
import MyBookmarks from "@/components/shared/Bookmark/MyBookmarks.vue";

export default {
  name: "myBookmarksPage",

  components: {
    DashboardLayout,
    MyBookmarks,
  },
};
</script>
