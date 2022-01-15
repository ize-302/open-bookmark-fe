import Vue from "vue";

Vue.mixin({
  methods: {
    isEmpty(val) {
      if (val !== null && typeof val === "object") {
        if (Object.keys(val).length === 0) return true;
      } else if (val == null || val === "") {
        return true;
      }
      return false;
    },
  },
  computed: {
    currentPage() {
      return this.$route.name;
    },
  },
});
