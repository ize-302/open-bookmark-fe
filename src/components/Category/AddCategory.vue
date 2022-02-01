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
      >+ New Category</c-pseudo-box
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
        <c-modal-header>Add Category</c-modal-header>
        <c-modal-close-button />
        <c-modal-body>
          <form @submit.prevent="addCategory">
            <c-form-control is-required>
              <c-form-label for="name">Name</c-form-label>
              <c-input-group>
                <c-input
                  v-model="name"
                  id="name"
                  placeholder="Name"
                  mb="20px"
                />
              </c-input-group>
            </c-form-control>

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
import CategoryService from "@/services/category";

export default {
  name: "add-category",
  data() {
    return {
      isOpen: false,
      blockScrollOnMount: false,
      name: "",
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
      this.name = "";
    },
    addCategory() {
      CategoryService.createCategory({
        name: this.name,
      }).then((data) => {
        this.close();
        this.$toast({
          title: data.message,
          status: "success",
          position: "top",
        });
        this.name = "";
        this.$emit("fetchCategories");
      });
    },
  },
};
</script>
