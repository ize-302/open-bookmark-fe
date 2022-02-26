export default {
  data() {
    return {
      bookmarks: [],
      pageOptions: {},
      perPage: 20,
      isLoading: true,
      searchQuery: "",
    };
  },
  mounted() {
    this.fetchBookmarks({
      q: this.searchQuery,
      page: this.page,
      per_page: this.perPage,
    });
  },
  computed: {
    page() {
      return this.$route.query.page ? parseInt(this.$route.query.page) : 1;
    },
  },
  watch: {
    "$route.query.page"(newPage) {
      this.fetchBookmarks({
        q: this.searchQuery,
        page: newPage,
        per_page: this.perPage,
      });
    },
  },
  methods: {
    changePage(pageToGo) {
      this.$router.push({ query: { page: pageToGo } });
    },
    refreshBookmarks() {
      this.fetchBookmarks({
        q: this.searchQuery,
        page: this.page,
        per_page: this.perPage,
      });
    },
  },
};
