import { extendTheme } from "@chakra-ui/react"

export const COLORS = {
  SECONDARY: "#FFF9C7",
}

export const theme = extendTheme({
  styles: {
    global: {
      body: { overscrollBehavior: "none" },
    },
  },
})
