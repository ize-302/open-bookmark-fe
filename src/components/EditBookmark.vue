<template>
  <c-box>
    <c-menu-item ref="btnRef" @click="isOpen = true">Edit</c-menu-item>
    <c-drawer
      :isOpen="isOpen"
      placement="right"
      :on-close="close"
      :initialFocusRef="() => $refs.inputInsideModal"
    >
      <c-drawer-overlay />
      <c-drawer-content>
        <c-drawer-close-button />
        <c-drawer-header>Edit Bookmark</c-drawer-header>

        <c-drawer-body>
          <form @submit.prevent="updateBookmark">
            <c-form-control>
              <c-form-label for="url">URL</c-form-label>
              <c-input
                disabled="disabled"
                id="url"
                v-model="url"
                placeholder="URL here"
                mb="20px"
              />
            </c-form-control>

            <c-form-control is-required>
              <c-form-label for="title">Title</c-form-label>
              <c-input
                v-model="title"
                id="title"
                placeholder="Title"
                mb="20px"
              />
            </c-form-control>

            <c-form-control>
              <c-form-label for="comment">Comment</c-form-label>
              <c-textarea
                :value="comment"
                v-model="comment"
                id="comment"
                placeholder="Here is a sample placeholder"
                mb="20px"
              />
            </c-form-control>

            <c-flex
              justifyContent="space-between"
              mb="20px"
              alignItems="center"
            >
              <c-flex>
                <c-text fontWeight="600">Make Private? </c-text>
                <c-icon ml="6px" mt="3px" name="lock" />
              </c-flex>
              <c-form-control>
                <c-switch v-model="isPrivate" id="private" />
              </c-form-control>
            </c-flex>
            <c-button type="submit" variant-color="green" width="100%"
              >Update</c-button
            >
          </form>
        </c-drawer-body>
      </c-drawer-content>
    </c-drawer>
  </c-box>
</template>

<script>
import BookmarkService from "@/services/bookmarks";

export default {
  name: "editBookmark",
  props: ["id"],
  data() {
    return {
      isOpen: false,
      title: "",
      url: "",
      comment: "",
      isPrivate: false,
    };
  },
  watch: {
    isOpen() {
      if (this.isOpen) {
        BookmarkService.getBookmark(this.id).then((response) => {
          this.title = response.title;
          this.url = response.url;
          this.comment = response.comment;
          this.isPrivate = response.isPrivate;
        });
      }
    },
  },
  methods: {
    close() {
      this.isOpen = false;
    },
    updateBookmark() {
      BookmarkService.updateBookmark({
        id: this.id,
        title: this.title,
        url: this.url,
        comment: this.comment,
        isPrivate: this.isPrivate,
      }).then((response) => {
        this.$toast({
          title: response.message,
          status: "success",
          position: "top",
        });
        this.close();
        this.$emit("fetchBookmarks");
      });
    },
  },
};
</script>
