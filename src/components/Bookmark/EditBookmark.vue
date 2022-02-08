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
              <c-form-label for="Category">Category</c-form-label>
              <c-select
                v-model="selectedCategory"
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
                :value="description"
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
import CategoryService from "@/services/category";

export default {
  name: "editBookmark",
  props: ["bookmark"],
  data() {
    return {
      isOpen: false,
      title: "",
      url: "",
      description: "",
      is_private: false,
      categories: [],
      selectedCategory: "",
    };
  },
  watch: {
    isOpen() {
      this.fetchCategories();
      this.title = this.bookmark.title;
      this.url = this.bookmark.url;
      this.description = this.bookmark.description;
      this.is_private = this.bookmark.is_private;
    },
  },
  methods: {
    close() {
      this.isOpen = false;
    },
    fetchCategories() {
      CategoryService.fetchUserCategories().then((data) => {
        this.categories = data;
        const findCategory = this.categories.find(
          (category) => category._id === this.bookmark.category
        );
        this.selectedCategory = findCategory._id;
      });
    },
    updateBookmark() {
      BookmarkService.updateBookmark({
        id: this.bookmark._id,
        title: this.title,
        url: this.url,
        description: this.description,
        is_private: this.is_private,
        category: this.selectedCategory,
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
