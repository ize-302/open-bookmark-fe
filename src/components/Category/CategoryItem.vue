<template>
  <div>
    <c-pseudo-box
      :bg="index % 2 && 'brand.lightGreen'"
      padding="5px 0 5px 5px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      :_hover="{ bg: 'green.50' }"
      cursor="pointer"
    >
      <c-stack direction="row" ml="10px" alignItems="center">
        <c-text fontWeight="500" fontSize="16px">{{ category.name }} </c-text>
        <c-text fontWeight="500" fontSize="16px" color="gray.400">
          {{ category.bookmarks.length }} Bookmarks
        </c-text>
      </c-stack>

      <c-menu>
        <c-menu-button padding="0" variant-color="transparent">
          <c-icon name="ellipsis-v" color="#666" />
        </c-menu-button>
        <c-menu-list>
          <edit-category
            :category="category"
            @fetchCategories="$emit('refreshCategories')"
          />
          <c-menu-item color="red.300" @click="deleteCategory()"
            >Delete</c-menu-item
          >
        </c-menu-list>
      </c-menu>
    </c-pseudo-box>
  </div>
</template>

<script>
import EditCategory from "@/components/Category/EditCategory.vue";
import CategoryService from "@/services/category";

export default {
  name: "categoryItem",
  components: {
    EditCategory,
  },
  props: {
    category: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    deleteCategory() {
      CategoryService.deleteCategory(this.category._id).then((data) => {
        this.$emit("refreshCategories");
        this.$toast({
          title: data.message,
          status: "success",
          position: "top",
        });
      });
    },
  },
};
</script>
