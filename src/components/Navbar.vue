<template>
  <c-box
    position="sticky"
    borderBottom="1px solid #ddd"
    width="100%"
    left="0"
    top="0"
    background="white"
  >
    <c-flex
      maxW="1500px"
      margin="0 auto"
      px="0px"
      py="10px"
      justifyContent="space-between"
      alignItems="center"
    >
      <c-heading fontSize="20px" color="brand.green">Open Bookmark</c-heading>
      <c-menu>
        <c-menu-button right-icon="chevron-down" variant="solid">
          <c-avatar
            name="Evan You"
            src="https://bit.ly/chakra-evan-you"
            size="sm"
          />
          <c-text mx="7px" fontWeight="300" fontSize="16px">Adavize</c-text>
        </c-menu-button>
        <c-menu-list>
          <c-menu-group title="Account">
            <c-menu-item>My Profile</c-menu-item>
            <c-menu-item>My Bookmarks</c-menu-item>
            <c-menu-item>Change password</c-menu-item>
          </c-menu-group>
          <c-menu-divider />
          <c-menu-item>Trash</c-menu-item>
        </c-menu-list>
      </c-menu>
    </c-flex>
  </c-box>
</template>
