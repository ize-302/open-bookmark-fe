<template>
  <c-box>
    <c-flex justifyContent="space-between">
      <c-heading :fontSize="['20px', '24px']">Bookmarks</c-heading>
    </c-flex>
    <c-grid v-if="isEmpty(bookmarks)" placeItems="center" height="50vh">
      <c-heading color="#ddd">No Bookmarks!</c-heading>
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
        :page="page"
        :resultsPerPage="perPage"
        :totalResults="pageOptions.total_items"
        @changePage="changePage"
      />
    </c-box>
  </c-box>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import BookmarkItem from "@/components/shared/Bookmark/BookmarkItem.vue";
import bookmarkMixin from "@/mixins/bookmark";
import UserService from "@/services/users";

export default {
  name: "userPublicBookmarks",
  mixins: [bookmarkMixin],

  components: {
    Pagination,
    BookmarkItem,
  },
  methods: {
    fetchBookmarks({ page = this.page, per_page = this.perPage }) {
      UserService.fetchUserPublicBookmarks({
        id: this.$route.params.id,
        page,
        per_page,
      }).then((data) => {
        this.bookmarks = data.items;
        this.pageOptions = data.paginator;
      });
    },
  },
};
</script>
