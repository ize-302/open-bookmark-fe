<template>
  <dashboard-layout>
    <c-heading :fontSize="['20px', '24px']">Find bookmarks and users</c-heading>
    <c-stack direction="row" spacing="2" mt="20px">
      <c-input-group width="100%">
        <c-input-left-element
          ><c-icon name="search" color="gray.300"
        /></c-input-left-element>
        <c-input type="text" placeholder="Search" />
      </c-input-group>

      <c-button>Search</c-button>
    </c-stack>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layouts/Dashboard.layout.vue";

export default {
  name: "globalSearchPage",

  components: {
    DashboardLayout,
  },
};
</script>
