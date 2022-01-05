<template>
  <c-theme-provider>
    <c-reset />
    <c-box maxW="800px" margin="0 auto" h="100vh" py="50px">
      <router-view />
    </c-box>
  </c-theme-provider>
</template>

<script>
export default {
  name: "App",
};
</script>
