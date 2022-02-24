<template>
  <div>
    <c-pseudo-box
      borderBottom="1px solid #eee"
      padding="5px 0 5px 0px"
      display="flex"
      justifyContent="space-between"
      alignItems="start"
      marginBottom="10px"
      paddingBottom="10px"
    >
      <c-stack :spacing="0">
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
          <c-icon v-if="bookmark.is_private" size="14px" ml="6px" name="lock" />
        </c-flex>
        <c-text mt="5px" color="gray.500" fontWeight="200" fontSize="14px">{{
          bookmark.description || "No description"
        }}</c-text>
        <c-flex alignItems="baseline">
          <c-text
            mr="20px"
            mt="10px"
            color="gray.400"
            fontWeight="200"
            fontSize="12px"
            >Added {{ bookmark.created_at | formatDate("DD MMM YYYY") }}</c-text
          >

          <c-text
            v-if="currentPageName === 'browse' || currentPageName === 'search'"
            mt="10px"
            color="gray.400"
            fontWeight="200"
            fontSize="12px"
            >By
            <c-tooltip
              fontSize="12px"
              :label="bookmark.author.sub ? 'Go to profile' : 'User not found'"
              placement="bottom"
            >
              <c-link
                color="brand.green"
                as="router-link"
                :to="`u/${bookmark.author.sub}`"
                >{{ bookmark.author.full_name || "Unknown user" }}</c-link
              >
            </c-tooltip>
          </c-text>
        </c-flex>
      </c-stack>
      <c-menu>
        <c-menu-button padding="0" variant-color="transparent">
          <c-icon name="ellipsis-v" color="#666" />
        </c-menu-button>
        <c-menu-list>
          <c-menu-item>
            <c-link :href="bookmark.url" is-external>Open in new tab </c-link>
          </c-menu-item>
          <c-divider />
          <c-menu-item
            v-clipboard:copy="bookmark.url"
            v-clipboard:success="onCopy"
            >Copy URL</c-menu-item
          >
          <c-divider
            v-if="
              currentPageName === 'myBookmarks' ||
              currentPageName === 'trash' ||
              isOwnProfile(bookmark.author)
            "
          />
          <c-menu-item
            v-if="
              currentPageName === 'myBookmarks' || isOwnProfile(bookmark.author)
            "
            @click="updatePrivacy()"
            >Make {{ bookmark.is_private ? "public" : "private" }}</c-menu-item
          >
          <edit-bookmark
            v-if="
              currentPageName === 'myBookmarks' || isOwnProfile(bookmark.author)
            "
            :bookmark="bookmark"
            @fetchBookmarks="$emit('refreshBookmarks')"
          />
          <c-menu-item
            v-if="
              currentPageName === 'myBookmarks' || isOwnProfile(bookmark.author)
            "
            color="red.300"
            @click="trashBookmark()"
            >Delete</c-menu-item
          >
          <c-menu-item
            v-if="currentPageName === 'trash'"
            color="red.300"
            @click="deleteBookmark()"
            >Delete permanently</c-menu-item
          >
          <c-menu-item
            v-if="currentPageName === 'trash'"
            @click="restoreBookmark()"
            >Restore</c-menu-item
          >
        </c-menu-list>
      </c-menu>
    </c-pseudo-box>
  </div>
</template>

<script>
import EditBookmark from "@/components/Bookmark/EditBookmark.vue";
import TrashService from "@/services/trash";
import BookmarkService from "@/services/bookmarks";

export default {
  name: "bookmarkItem",
  components: {
    EditBookmark,
  },
  props: {
    bookmark: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    onCopy() {
      this.$toast({
        title: "URL copied",
        status: "success",
        position: "top",
      });
    },
    trashBookmark() {
      TrashService.trashBookmark(this.bookmark.id).then((response) => {
        this.$emit("refreshBookmarks");
        this.$toast({
          title: response.message,
          status: "success",
          position: "top",
        });
      });
    },
    restoreBookmark() {
      TrashService.restoreBookmark(this.bookmark.id).then((response) => {
        this.$emit("refreshBookmarks");
        this.$toast({
          title: response.message,
          status: "success",
          position: "top",
        });
      });
    },
    deleteBookmark() {
      BookmarkService.deleteBookmark(this.bookmark.id).then(() => {
        this.$emit("refreshBookmarks");
      });
    },
    updatePrivacy() {
      BookmarkService.updateBookmark({
        id: this.bookmark.id,
        is_private: !this.bookmark.is_private,
      }).then((response) => {
        this.$emit("refreshBookmarks");
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
