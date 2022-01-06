<template>
  <div>
    <!-- <c-button ref="btnRef" @click="isOpen = true">Open Drawer</c-button> -->
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
            <c-form-control is-required>
              <c-form-label for="title">Title</c-form-label>
              <c-input
                v-model="title"
                id="title"
                placeholder="ChakraUI form control"
                mb="20px"
              />
            </c-form-control>

            <c-form-control is-required>
              <c-form-label for="url">URL</c-form-label>
              <c-input
                id="url"
                v-model="url"
                placeholder="https://vue.chakra-ui.com/formcontrol"
                mb="20px"
              />
            </c-form-control>

            <c-form-control>
              <c-form-label for="description">Description</c-form-label>
              <c-textarea
                v-model="description"
                id="description"
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
  </div>
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
      description: "",
      isPrivate: false,
    };
  },
  watch: {
    isOpen() {
      if (this.isOpen) {
        BookmarkService.getBookmark(this.id).then((response) => {
          this.title = response.title;
          this.url = response.url;
          this.description = response.description;
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
        description: this.description,
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
