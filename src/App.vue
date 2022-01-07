<template>
  <c-box>
    <!-- <c-button
        @click="chakraToggleColorMode"
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex="1"
        :bg="chakraColorMode === 'dark' ? 'whiteAlpha.400' : 'blackAlpha.800'"
      >
        <c-icon
          :name="chakraColorMode === 'dark' ? 'moon' : 'sun'"
          :color="chakraColorMode === 'dark' ? 'blackAlpha.800' : 'orange'"
        />
      </c-button> -->
    <router-view />
  </c-box>
</template>

<script>
export default {
  name: "App",
  // inject: ["$chakraColorMode", "$chakraToggleColorMode"],
  computed: {
    // colorMode() {
    //   return this.$chakraColorMode();
    // },
  },
};
</script>
