<template>
  <dashboard-layout>
    <c-heading :fontSize="['20px', '24px']">Find bookmarks and users</c-heading>
    <form @submit.prevent="updateQuery()">
      <c-stack direction="row" spacing="2" mt="20px">
        <c-input-group width="100%">
          <c-input-left-element
            ><c-icon name="search" color="gray.300"
          /></c-input-left-element>
          <c-input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            :isRequired="true"
          />
        </c-input-group>

        <c-select
          width="300px"
          v-model="searchFor"
          placeholder="Search for"
          :isRequired="true"
        >
          <option value="users">Users</option>
          <option value="bookmarks">Bookmarks</option>
        </c-select>

        <c-button variant-color="green" px="30px" type="submit"
          >Search</c-button
        >
      </c-stack>
    </form>

    <c-heading
      mt="50px"
      mb="20px"
      v-if="result.length > 0"
      :fontSize="['20px', '24px']"
      >Search results</c-heading
    >

    <!-- bookmarks search result -->
    <c-box v-if="resultType === 'bookmarks'">
      <bookmark-item
        v-for="(bookmark, index) in result"
        :key="bookmark.index"
        :index="index"
        :bookmark="bookmark"
      />
    </c-box>

    <!-- users serch result -->
    <c-box v-if="resultType === 'users'">
      <c-pseudo-box
        v-for="(user, index) in result"
        :key="index"
        borderBottom="1px solid #eee"
        padding="5px 0 5px 0px"
        display="flex"
        justifyContent="space-between"
        alignItems="start"
        marginBottom="10px"
        paddingBottom="10px"
      >
        <c-stack direction="row" alignItems="center">
          <c-avatar
            bg="brand.green"
            :name="user.full_name"
            :src="user.avatar_url"
            size="md"
          />
          <c-text ml="5px" fontWeight="500" fontSize="16px">{{
            user.full_name
          }}</c-text>
        </c-stack>
        <c-box>
          <follow-button @update="handleSearch" :user="user" />
        </c-box>
      </c-pseudo-box>
    </c-box>

    <!-- pagination -->
    <pagination
      v-if="!isEmpty(result)"
      :page="page"
      :resultsPerPage="perPage"
      :totalResults="pageOptions.total_items"
      @changePage="changePage"
    />

    <!-- loading / no result -->
    <c-flex
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="50vh"
    >
      <c-spinner
        v-if="isLoading"
        thickness="4px"
        speed="0.65s"
        empty-color="green.200"
        color="vue.500"
        size="xl"
      />
      <c-heading v-if="!isLoading && isEmpty(result)" color="#ddd"
        >No Results!</c-heading
      >
    </c-flex>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layouts/Dashboard.layout.vue";
import SearchService from "@/services/search.js";
import BookmarkItem from "@/components/shared/Bookmark/BookmarkItem.vue";
import Pagination from "@/components/Pagination.vue";
import FollowButton from "@/components/FollowButton.vue";

export default {
  name: "globalSearchPage",
  data() {
    return {
      searchFor: this.$route.query.search_for,
      searchQuery: this.$route.query.q,
      perPage: 20,
      result: [],
      resultType: "",
      pageOptions: {},
      isLoading: false,
    };
  },

  components: {
    DashboardLayout,
    BookmarkItem,
    Pagination,
    FollowButton,
  },

  watch: {
    $route() {
      this.handleSearch();
    },
  },

  computed: {
    page() {
      return this.$route.query.page ? parseInt(this.$route.query.page) : 1;
    },
  },

  mounted() {
    this.handleSearch();
  },

  methods: {
    changePage(pageToGo) {
      this.$router.replace({ query: { ...this.$route.query, page: pageToGo } });
    },
    handleSearch() {
      this.result = [];
      SearchService.globalSearch({
        search_for: this.$route.query.search_for,
        q: this.$route.query.q,
        page: this.$route.query.page,
        per_page: this.perPage,
      }).then((data) => {
        this.result = data.items;
        this.pageOptions = data.paginator;
        this.resultType = data.result_type;
        this.isLoading = false;
      });
    },
    updateQuery() {
      const oldQuery = JSON.stringify(this.$route.query);
      const newQuery = JSON.stringify({
        q: this.searchQuery,
        search_for: this.searchFor,
        page: 1,
      });
      if (oldQuery !== newQuery) {
        this.$router.replace({ query: {} });
        this.$router.push({
          name: "search",
          query: JSON.parse(newQuery),
        });
        this.isLoading = true;
      }
    },
  },
};
</script>
