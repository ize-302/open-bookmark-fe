<template>
  <div>
    <nav-bar />
    <c-flex
      py="50px"
      px="20px"
      width="100%"
      maxW="1500px"
      justifyContent="space-between"
      margin="0 auto"
    >
      <c-box
        :display="['none', 'none', 'block']"
        :width="['', '', '25%', '20%']"
        :mr="['10px', '20px', '0']"
        position="relative"
        top="0"
      >
        <menu-list />
      </c-box>
      <c-box :width="['100%', '100%', '73%', '55%']">
        <slot />
      </c-box>
      <c-box :display="['none', 'none', 'none', 'block']" width="20%"></c-box>
    </c-flex>
  </div>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import MenuList from "@/components/MenuList.vue";

export default {
  components: {
    NavBar,
    MenuList,
  },
};
</script>
