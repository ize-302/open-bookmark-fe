<template>
  <div>
    <c-button @click="open" bg="brand.green" color="white"
      >+ New bookmark</c-button
    >
    <c-modal
      :is-open="isOpen"
      :on-close="close"
      :block-scroll-on-mount="blockScrollOnMount"
      isCentered
      size="500px"
    >
      <c-modal-content
        padding="40px 20px 40px 20px"
        ref="content"
        borderRadius="5px"
      >
        <c-modal-header>Add Bookmark</c-modal-header>
        <c-modal-close-button />
        <c-modal-body>
          <form @submit.prevent="addBookmark">
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
              >Add</c-button
            >
          </form>
        </c-modal-body>
      </c-modal-content>
      <c-modal-overlay />
    </c-modal>
  </div>
</template>

<script>
import BookmarkService from "@/services/bookmarks";

export default {
  name: "add-bookmark",
  data() {
    return {
      isOpen: false,
      blockScrollOnMount: false,
      title: "",
      url: "",
      description: "",
      isPrivate: false,
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
    addBookmark() {
      BookmarkService.createBookmark({
        title: this.title,
        url: this.url,
        description: this.description,
        isPrivate: this.isPrivate,
      }).then((response) => {
        this.close();
        this.$toast({
          title: response.message,
          status: "success",
          position: "top",
        });
        this.title = "";
        this.url = "";
        this.description = "";
        this.isPrivate = false;
        this.$emit("fetchBookmarks");
      });
    },
  },
};
</script>
