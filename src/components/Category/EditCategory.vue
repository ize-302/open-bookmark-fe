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
        <c-drawer-header>Edit Category</c-drawer-header>

        <c-drawer-body>
          <form @submit.prevent="updateCategory">
            <c-form-control is-required>
              <c-form-label for="name">Name</c-form-label>
              <c-input v-model="name" id="name" placeholder="name" mb="20px" />
            </c-form-control>

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
import CategoryService from "@/services/category";

export default {
  name: "editCategory",
  props: ["category"],
  data() {
    return {
      isOpen: false,
      name: "",
    };
  },
  watch: {
    isOpen() {
      if (this.isOpen) {
        this.name = this.category.name;
      }
    },
  },
  methods: {
    close() {
      this.isOpen = false;
    },
    updateCategory() {
      CategoryService.updateCategory({
        id: this.category._id,
        name: this.name,
      }).then((response) => {
        this.$toast({
          title: response.message,
          status: "success",
          position: "top",
        });
        this.close();
        this.$emit("fetchCategories");
      });
    },
  },
};
</script>
