<template>
  <c-flex
    mt="50px"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <c-box>
      <c-button
        :disabled="isInFirstPage"
        @click="changePage(page - 1)"
        size="sm"
      >
        <c-icon name="arrow-left" color="#666" />
      </c-button>
      <c-button
        v-for="(p, index) in paginators"
        :key="index"
        @click="changePage(p)"
        :class="{ active: page === p }"
        bg="brand.green"
        color="white"
        :disabled="page === p ? true : false"
        mx="5px"
        size="sm"
      >
        {{ p }}
      </c-button>
      <c-button
        :disabled="isInLastPage"
        @click="changePage(page + 1)"
        size="sm"
      >
        <c-icon name="arrow-right" color="#666" />
      </c-button>
    </c-box>
    <c-flex mt="15px" v-if="showJumpPage" alignItems="center">
      <c-text fontWeight="500">Jump to page</c-text>
      <form @submit.prevent="validateJump">
        <c-flex>
          <c-input
            width="80px"
            textAlign="center"
            v-model="jumpValue"
            placeholder="..."
            ml="20px"
          />
          <c-button :disabled="!isValidJumpValue"> JUMP </c-button>
        </c-flex>
      </form>
      <span>of {{ totalPages }}</span>
    </c-flex>
  </c-flex>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      jumpValue: "",
    };
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
    resultsPerPage: {
      type: Number,
      required: true,
    },
    totalResults: {
      type: Number,
      required: true,
    },
    showJumpPage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    changePage(pageToGo) {
      this.$emit("changePage", pageToGo);
    },
    validateJump() {
      if (this.jumpValue <= this.totalPages)
        this.changePage(parseInt(this.jumpValue));
    },
  },
  computed: {
    isValidJumpValue() {
      const page = parseInt(this.jumpValue);
      if (!page || typeof page !== "number") return false;
      return page > 0 && page <= this.totalPages;
    },
    totalPages() {
      if (this.totalResults <= this.resultsPerPage) return 1;
      return Math.ceil(this.totalResults / this.resultsPerPage);
    },
    isInFirstPage() {
      return this.page === 1;
    },
    isInLastPage() {
      return this.page === this.totalPages;
    },
    hasLargePageNum() {
      if (this.page + 2 >= 1000) {
        return true;
      }
      return false;
    },
    paginators() {
      const firstPage = 1;
      let lastPage = this.totalPages;
      let paginators = [];
      /* if currentPage is near firstPage */
      if (this.totalPages <= 5) {
        for (var i = 0; i < this.totalPages; i++) {
          paginators.push(i + 1);
        }
      } else {
        if (this.page - firstPage < 3) {
          for (let i = firstPage; i < Math.max(2 + 4, this.page + 2); ++i) {
            paginators.push(i);
          }
        } /* if currentPage is near lastPage */ else if (
          lastPage - this.page <
          2
        ) {
          // if on the last page
          if (this.isInLastPage) {
            paginators.push(this.page - 4, this.page - 3);
            if (this.hasLargePageNum) paginators.shift(); // remove first element for large Page numbers
          } else {
            // not on the last page
            if (!this.hasLargePageNum) {
              paginators.push(this.page - 3);
            }
          }
          if (!this.hasLargePageNum) paginators.push(this.page - 2);
          for (
            let i = Math.min(lastPage - 2 + 4, this.page - 1);
            i < lastPage + 1;
            ++i
          ) {
            paginators.push(i);
          }
        } /* if currentPage is in the middle */ else {
          if (!this.hasLargePageNum) paginators.push(this.page - 2);
          for (let i = this.page - 1; i < this.page + 3; ++i) {
            paginators.push(i);
          }
          if (this.hasLargePageNum) paginators.pop();
        }
      }
      return paginators;
    },
  },
};
</script>
