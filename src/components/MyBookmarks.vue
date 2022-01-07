<template>
  <c-box>
    <c-flex justifyContent="space-between">
      <c-heading fontSize="24px">My Bookmarks</c-heading>
      <add-bookmark @fetchBookmarks="fetchBookmarks" />
    </c-flex>
    <c-grid v-if="bookmarks.length === 0" placeItems="center" height="50vh">
      <c-heading color="#ddd">No saved Bookmarks!</c-heading>
    </c-grid>
    <c-list v-else mt="20px">
      <c-pseudo-box
        as="list-item"
        v-for="(bookmark, index) in bookmarks"
        :key="index"
        :bg="index % 2 && 'brand.lightGreen'"
        padding="5px 0 5px 5px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        :_hover="{ bg: 'gray.100' }"
        cursor="pointer"
      >
        <c-flex alignItems="baseline">
          <img
            :src="
              'https://s2.googleusercontent.com/s2/favicons?domain_url=' +
              bookmark.url
            "
          />
          <c-text ml="10px" fontWeight="500" fontSize="16px"
            >{{ bookmark.title }}
          </c-text>
          <c-icon v-if="bookmark.isPrivate" size="14px" ml="6px" name="lock" />
        </c-flex>

        <c-menu>
          <c-menu-button padding="0" variant-color="transparent">
            <c-icon name="ellipsis-v" color="#666" />
          </c-menu-button>
          <c-menu-list>
            <c-menu-item>
              <c-link :href="bookmark.url" is-external
                >Open in new tab
              </c-link></c-menu-item
            >
            <c-divider />
            <c-menu-item
              v-clipboard:copy="bookmark.url"
              v-clipboard:success="onCopy"
              >Copy URL</c-menu-item
            >
            <c-divider />
            <edit-bookmark
              :id="bookmark._id"
              @fetchBookmarks="fetchBookmarks"
            />
            <c-menu-item @click="deleteBookmark(bookmark._id)"
              >Delete</c-menu-item
            >
          </c-menu-list>
        </c-menu>
      </c-pseudo-box>
    </c-list>
  </c-box>
</template>

<script>
import BookmarkService from "@/services/bookmarks";
import AddBookmark from "@/components/AddBookmark.vue";
import EditBookmark from "./EditBookmark.vue";

export default {
  name: "myBookmarks",
  data() {
    return {
      bookmarks: [],
      pageOptions: {},
    };
  },
  components: {
    AddBookmark,
    EditBookmark,
  },
  mounted() {
    this.fetchBookmarks();
  },
  methods: {
    fetchBookmarks() {
      BookmarkService.getAllBookmarks().then((data) => {
        this.bookmarks = data.items;
        this.pageOptions = data.paginator;
      });
    },
    onCopy: function () {
      this.$toast({
        title: "URL copied",
        status: "success",
        position: "top",
      });
    },
    deleteBookmark(id) {
      BookmarkService.deleteBookmark(id).then((response) => {
        this.fetchBookmarks();
        this.$toast({
          title: response.message,
          status: "success",
          position: "top",
        });
      });
    },
  },
};
</script>
