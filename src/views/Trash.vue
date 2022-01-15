<template>
  <div>
    <dashboard-layout>
      <c-box>
        <c-flex justifyContent="space-between">
          <c-heading :fontSize="['20px', '24px']">Trash</c-heading>
        </c-flex>
        <c-grid v-if="isEmpty(bookmarks)" placeItems="center" height="50vh">
          <c-heading color="#ddd">Trash is Empty!</c-heading>
        </c-grid>
        <c-box v-else mt="20px">
          <bookmark-item
            v-for="(bookmark, index) in bookmarks"
            :key="bookmark.index"
            :index="index"
            :bookmark="bookmark"
            @refreshBookmarks="refreshBookmarks"
          />
          <pagination
            :page="currentPage"
            :resultsPerPage="perPage"
            :totalResults="pageOptions.total_items"
            @changePage="changePage"
          />
        </c-box> </c-box
    ></dashboard-layout>
  </div>
</template>

<script>
import DashboardLayout from "@/views/layouts/Dashboard.layout.vue";
import TrashService from "@/services/trash";
import Pagination from "@/components/Pagination.vue";
import BookmarkItem from "../components/shared/BookmarkItem.vue";
import bookmarkMixin from "@/mixins/bookmark";

export default {
  name: "trash",
  mixins: [bookmarkMixin],
  components: {
    DashboardLayout,
    Pagination,
    BookmarkItem,
  },
  methods: {
    fetchBookmarks({ page = this.currentPage, per_page = this.perPage }) {
      TrashService.fetchUserTrashedBookmarks({ page, per_page }).then(
        (data) => {
          this.bookmarks = data.items;
          this.pageOptions = data.paginator;
        }
      );
    },
  },
};
</script>
