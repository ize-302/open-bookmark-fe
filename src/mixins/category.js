export default {
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    refreshCategories() {
      this.fetchCategories();
    },
  },
};
