<template>
  <c-box bg="brand.green" minHeight="100vh">
    <c-stack
      maxWidth="1024px"
      width="100%"
      margin="0 auto"
      direction="row"
      justifyContent="space-between"
      position="sticky"
      :padding="['15px', '20px', '30px 30px', '30px 0']"
      top="0px"
      bg="brand.green"
      alignItems="center"
    >
      <c-heading :fontSize="['18px', '24px']" color="green.800"
        ><c-icon name="bookmark" /> OpenBookmark</c-heading
      >
      <google-signin />
    </c-stack>
    <c-grid placeItems="center">
      <c-box textAlign="center" marginTop="50px">
        <c-heading :fontSize="['24px', '32px', '54px']"
          >All your bookmarks <br />in one open space
        </c-heading>
        <!-- <c-flex
          :direction="['column', 'column', 'row']"
          marginTop="20px"
          gap="20px"
          justifyContent="center"
        >
          <c-button
            size="lg"
            rounded="10px"
            bg="#1967D2"
            color="white"
            fontWeight="500"
            :_hover="{
              bg: 'black',
              textDecoration: 'none',
            }"
          >
            <c-icon mr="10px" name="download" /> Chrome extension</c-button
          >
          <c-button
            size="lg"
            rounded="10px"
            bg="#FF8831"
            color="white"
            fontWeight="500"
            :_hover="{
              bg: 'black',
              textDecoration: 'none',
            }"
          >
            <c-icon mr="10px" name="download" /> Firefox Extension</c-button
          >
        </c-flex> -->
      </c-box>

      <c-box :margin="['50px 20px 0 20px']">
        <c-image
          rounded="10px"
          borderWidth="3px"
          borderColor="green.700"
          src="/screenshot.png"
          width="1200px"
          objectFit="fill"
          bg="white"
        />
      </c-box>
    </c-grid>
  </c-box>
</template>

<script>
import GoogleSignin from "../components/GoogleSignin.vue";

export default {
  components: { GoogleSignin },
  name: "landing",
};
</script>
