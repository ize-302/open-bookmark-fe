<template>
  <c-box>
    <c-button
      :display="['block', 'block', 'none']"
      ref="btnRef"
      @click="isOpen = true"
      padding="0"
      height="100%"
      minWidth="100%"
      variant="ghost"
    >
      <c-icon color="black" size="24px" name="bars"
    /></c-button>

    <c-drawer
      :isOpen="isOpen"
      placement="left"
      :on-close="close"
      :initialFocusRef="() => $refs.inputInsideModal"
    >
      <c-drawer-overlay :display="['block', 'block', 'none']" />
      <c-drawer-content maxWidth="300px" :display="['block', 'block', 'none']">
        <c-drawer-close-button left="20px" top="20px" bg="transparent" />
        <c-drawer-header />

        <c-drawer-body padding="50px 10px">
          <c-stack rounded="md" position="sticky" top="80px">
            <menu-list />
          </c-stack>
        </c-drawer-body>
      </c-drawer-content>
    </c-drawer>
  </c-box>
</template>

<script>
import MenuList from "@/components/MenuList.vue";

export default {
  components: { MenuList },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    close() {
      this.isOpen = false;
    },
  },
};
</script>
