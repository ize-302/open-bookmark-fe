<template>
  <dashboard-layout>
    <c-box>
      <c-flex justifyContent="space-between">
        <c-heading :fontSize="['20px', '24px']"
          >Bookmarks by accounts you follow</c-heading
        >
      </c-flex>
      <c-flex
        v-if="isEmpty(bookmarks)"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="50vh"
      >
        <c-spinner
          v-if="isLoading && isEmpty(bookmarks)"
          thickness="4px"
          speed="0.65s"
          empty-color="green.200"
          color="vue.500"
          size="xl"
        />
        <c-heading v-if="!isLoading && isEmpty(bookmarks)" color="#ddd"
          >No saved Bookmarks!</c-heading
        >
      </c-flex>
      <c-box v-if="!isLoading && !isEmpty(bookmarks)" mt="20px">
        <bookmark-item
          v-for="(bookmark, index) in bookmarks"
          :key="bookmark.title"
          :index="index"
          :bookmark="bookmark"
          @refreshBookmarks="refreshBookmarks"
        />
        <pagination
          :page="page"
          :resultsPerPage="perPage"
          :totalResults="pageOptions.total_items"
          @changePage="changePage"
        />
      </c-box>
    </c-box>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "../layouts/Dashboard.layout.vue";
import Pagination from "@/components/Pagination.vue";
import BookmarkItem from "@/components/shared/Bookmark/BookmarkItem.vue";
import bookmarkMixin from "@/mixins/bookmark";
import BookmarkService from "@/services/bookmarks";

export default {
  name: "browse",
  mixins: [bookmarkMixin],
  components: {
    Pagination,
    DashboardLayout,
    BookmarkItem,
  },
  methods: {
    fetchBookmarks({ page = this.page, per_page = this.perPage }) {
      BookmarkService.fetchAllPublicBookmarks({ page, per_page }).then(
        (data) => {
          this.bookmarks = data.items;
          this.pageOptions = data.paginator;
          this.isLoading = false;
        }
      );
    },
  },
};
</script>
