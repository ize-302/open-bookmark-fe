<template>
  <div>
    <c-pseudo-box
      as="button"
      @click="open"
      bg="brand.green"
      padding="8px 13px"
      fontWeight="bold"
      rounded="md"
      color="white"
      >+ New bookmark</c-pseudo-box
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
              <c-form-label for="url">URL</c-form-label>
              <c-input
                id="url"
                v-model="url"
                placeholder="URL here"
                mb="20px"
                @blur="
                  (e) => {
                    e.target.value && fetchUrlTitle();
                  }
                "
              />
            </c-form-control>

            <c-form-control is-required>
              <c-form-label for="title">Title</c-form-label>
              <c-input-group>
                <c-input
                  v-model="title"
                  id="title"
                  placeholder="Title"
                  mb="20px"
                  :disabled="loadingTitle"
                />
                <c-input-right-element
                  ><c-spinner v-if="loadingTitle" />
                </c-input-right-element>
              </c-input-group>
            </c-form-control>

            <c-form-control>
              <c-form-label for="category">Category</c-form-label>
              <c-select
                v-model="category"
                placeholder="Select Category"
                mb="20px"
              >
                <option
                  v-for="(category, index) in categories"
                  :key="index"
                  :value="category._id"
                >
                  {{ category.name }}
                </option>
              </c-select>
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
                <c-switch v-model="is_private" id="private" />
              </c-form-control>
            </c-flex>
            <c-button
              :disabled="!url || !title"
              type="submit"
              variant-color="green"
              width="100%"
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
import CategoryService from "@/services/category";
import OtherService from "@/services/others";

export default {
  name: "add-bookmark",
  data() {
    return {
      isOpen: false,
      blockScrollOnMount: false,
      title: "",
      url: "",
      description: "",
      is_private: false,
      category: "",
      loadingTitle: false,
      categories: [],
    };
  },
  methods: {
    open() {
      this.isOpen = true;
      this.fetchCategories();
    },
    close() {
      this.isOpen = false;
      this.url = "";
      this.description = "";
      this.title = "";
      this.category = "";
      this.is_private = false;
    },
    fetchCategories() {
      CategoryService.fetchUserCategories().then((data) => {
        this.categories = data;
      });
    },
    fetchUrlTitle() {
      this.loadingTitle = true;
      OtherService.fetchUrlTitle(this.url)
        .then((data) => {
          this.title = data.title;
          this.loadingTitle = false;
        })
        .catch((err) => {
          this.loadingTitle = false;
          this.$toast({
            title: err.response.data.message,
            status: "error",
            position: "top",
          });
        });
    },
    addBookmark() {
      BookmarkService.createBookmark({
        title: this.title,
        url: this.url,
        description: this.description,
        is_private: this.is_private,
        category: this.category,
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
        this.is_private = false;
        this.$emit("fetchBookmarks");
      });
    },
  },
};
</script>
