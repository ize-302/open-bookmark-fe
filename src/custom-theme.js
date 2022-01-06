// import { mode } from "@chakra-ui/vue";

export default {
  breakpoints: ["30em", "48em", "62em", "80em"],
  fonts: {
    heading: '"Inter", sans-serif',
    body: "Inter, sans-serif",
    mono: "Menlo, monospace",
  },
  colors: {
    brand: {
      blue: "blue",
      green: "#58C184",
      lightGreen: "rgba(89,193, 192, 5%)",
    },
  },
  baseStyles: {
    CBox: () => ({
      // bg: mode("blackAlpha.700", "whiteAlpha.400"),
    }),
  },
};
