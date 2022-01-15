export default {
  data() {
    return {
      bookmarks: [],
      pageOptions: {},
      perPage: 20,
    };
  },
  mounted() {
    this.fetchBookmarks({
      page: this.currentPage,
      per_page: this.perPage,
    });
  },
  computed: {
    currentPage() {
      return this.$route.query.page ? parseInt(this.$route.query.page) : 1;
    },
  },
  watch: {
    "$route.query.page"(newPage) {
      this.fetchBookmarks({ page: newPage, per_page: this.perPage });
    },
  },
  methods: {
    changePage(pageToGo) {
      this.$router.push({ query: { page: pageToGo } });
    },
    refreshBookmarks() {
      this.fetchBookmarks({
        page: this.currentPage,
        per_page: this.perPage,
      });
    },
  },
};
