<template>
  <c-box>
    <c-flex justifyContent="space-between">
      <c-heading :fontSize="['20px', '24px']">My Bookmarks</c-heading>
      <add-bookmark @fetchBookmarks="refreshBookmarks()" />
    </c-flex>
    <form @submit.prevent="fetchBookmarks">
      <c-stack direction="row" spacing="2" mt="20px">
        <c-input-group width="100%">
          <c-input-left-element
            ><c-icon name="search" color="gray.300"
          /></c-input-left-element>
          <c-input v-model="searchQuery" type="text" placeholder="Search" />
        </c-input-group>
        <c-button variant-color="green" px="30px" type="submit"
          >Search</c-button
        >
      </c-stack>
    </form>
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
        >No Bookmark!</c-heading
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
    </c-box>
  </c-box>
</template>

<script>
import AddBookmark from "@/components/Bookmark/AddBookmark.vue";
import Pagination from "@/components/Pagination.vue";
import BookmarkItem from "@/components/shared/Bookmark/BookmarkItem.vue";
import bookmarkMixin from "@/mixins/bookmark";
import UserService from "@/services/users";

export default {
  name: "myBookmarks",
  mixins: [bookmarkMixin],

  components: {
    AddBookmark,
    Pagination,
    BookmarkItem,
  },
  methods: {
    fetchBookmarks({
      q = this.searchQuery,
      page = this.page,
      per_page = this.perPage,
    }) {
      UserService.fetchMyBookmarks({
        q,
        page,
        per_page,
      }).then((data) => {
        this.bookmarks = data.items;
        this.pageOptions = data.paginator;
        this.isLoading = false;
      });
    },
  },
};
</script>
