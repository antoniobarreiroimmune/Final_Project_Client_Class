import { extendTheme } from "@chakra-ui/react";


export const COLORS = {
  PRIMARY: "#0f172a",
  SECONDARY: "#FFF9C7",
  BACKGROUND: "#F4F4F4",
  TEXT: "#333333",
  ACCENT: "#4be8ff",
  WHITE: "#FFFFFF",
};


export const theme = extendTheme({
  colors: {
    primary: COLORS.PRIMARY,
    secondary: COLORS.SECONDARY,
    background: COLORS.BACKGROUND,
    text: COLORS.TEXT,
    accent: COLORS.ACCENT,
  },
  styles: {
    global: {
      body: {
        backgroundColor: "background",
        color: "text",
        lineHeight: "base",
        overscrollBehavior: "none",
      },
      a: {
        color: "primary",
        _hover: {
          textDecoration: "underline",
        },
      },

    },
  },
  components: {
    Button: {

      baseStyle: {
        fontWeight: "bold",
      },
      variants: {

        solid: {
          bg: "primary",
          color: "white",
          _hover: {
            bg: "accent",
          },
        },
      },
    },

  },
});
