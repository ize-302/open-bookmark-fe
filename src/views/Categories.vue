<template>
  <dashboard-layout>
    <c-box>
      <c-flex justifyContent="space-between">
        <c-heading :fontSize="['20px', '24px']">Categories</c-heading>
        <add-category @fetchCategories="refreshCategories()" />
      </c-flex>
      <c-grid v-if="isEmpty(categories)" placeItems="center" height="50vh">
        <c-heading color="#ddd">No saved Categories!</c-heading>
      </c-grid>
      <c-box v-else mt="20px">
        <category-item
          v-for="(category, index) in categories"
          :key="category.index"
          :index="index"
          :category="category"
          @refreshCategories="refreshCategories"
      /></c-box>
    </c-box>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "./layouts/Dashboard.layout.vue";
import CategoryService from "@/services/category";
import categoryMixin from "@/mixins/category";
import CategoryItem from "@/components/Category/CategoryItem.vue";
import AddCategory from "@/components/Category/AddCategory.vue";

export default {
  name: "categories",
  mixins: [categoryMixin],
  data() {
    return {
      categories: [],
    };
  },
  components: {
    DashboardLayout,
    CategoryItem,
    AddCategory,
  },
  methods: {
    fetchCategories() {
      CategoryService.fetchUserCategories().then((data) => {
        this.categories = data;
      });
    },
  },
};
</script>
