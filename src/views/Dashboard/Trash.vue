<template>
  <div>
    <dashboard-layout>
      <c-box>
        <c-flex justifyContent="space-between">
          <c-heading :fontSize="['20px', '24px']">Trash</c-heading>
        </c-flex>
        <c-flex
          v-if="isEmpty(bookmarks)"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="50vh"
        >
          <c-spinner
            v-if="isLoading"
            thickness="4px"
            speed="0.65s"
            empty-color="green.200"
            color="vue.500"
            size="xl"
          />
          <c-heading v-if="!isLoading && isEmpty(bookmarks)" color="#ddd"
            >Trash is Empty!</c-heading
          >
        </c-flex>
        <c-box v-if="!isLoading && !isEmpty(bookmarks)" mt="20px">
          <bookmark-item
            v-for="(bookmark, index) in bookmarks"
            :key="bookmark.index"
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
        </c-box> </c-box
    ></dashboard-layout>
  </div>
</template>

<script>
import DashboardLayout from "@/views/layouts/Dashboard.layout.vue";
import TrashService from "@/services/trash";
import Pagination from "@/components/Pagination.vue";
import BookmarkItem from "@/components/shared/Bookmark/BookmarkItem.vue";
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
    fetchBookmarks({ page = this.page, per_page = this.perPage }) {
      TrashService.fetchUserTrashedBookmarks({ page, per_page }).then(
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
