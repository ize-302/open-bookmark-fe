<template>
  <c-box>
    <c-flex justifyContent="space-between">
      <c-heading fontSize="24px">My Bookmarks</c-heading>
      <add-bookmark @fetchBookmarks="fetchBookmarks" />
    </c-flex>
    <c-list mt="20px">
      <c-list-item
        v-for="(bookmark, index) in bookmarks"
        :key="index"
        :bg="index % 2 && 'brand.lightGreen'"
        padding="10px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <c-flex alignItems="baseline">
          <c-icon v-if="bookmark.isPrivate" marginRight="10px" name="lock" />

          <c-link
            color="brand.green"
            :href="bookmark.url"
            is-external
            fontSize="16px"
            >{{ bookmark.title }}
          </c-link>
        </c-flex>

        <c-menu>
          <c-menu-button variant="ghost">
            <c-icon name="ellipsis-v" />
          </c-menu-button>
          <c-menu-list>
            <c-menu-item>Open in new tab</c-menu-item>
            <c-divider />
            <c-menu-item>Copy URL</c-menu-item>
            <c-divider />
            <c-menu-item>Edit</c-menu-item>
            <c-menu-item @click="deleteBookmark(bookmark.id)"
              >Delete</c-menu-item
            >
            <c-divider />
            <c-menu-item
              >Make {{ bookmark.isPrivate ? "public" : "private" }}</c-menu-item
            >
          </c-menu-list>
        </c-menu>
      </c-list-item>
    </c-list>
  </c-box>
</template>

<script>
import BookmarkService from "@/services/bookmarks";
import AddBookmark from "@/components/AddBookmark.vue";

export default {
  name: "MyBookmarks",
  data() {
    return {
      bookmarks: [],
      pageOptions: {},
    };
  },
  components: {
    AddBookmark,
  },
  mounted() {
    this.fetchBookmarks();
  },
  methods: {
    fetchBookmarks() {
      BookmarkService.bookmarks().then((data) => {
        this.bookmarks = data.items;
        this.pageOptions = data.paginator;
      });
    },

    deleteBookmark(id) {
      BookmarkService.delete(id).then((response) => {
        this.fetchBookmarks();
        console.log(response);
      });
    },
  },
};
</script>
