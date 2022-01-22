import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    primaryPalette: {
      primary: "#27AE60",
      "primary.50": "#93D7AF",
      secondary: "#EB5757",
    },
    grey: {
      "600": "#333333",
      "300": "#828282",
      "200": "#999999",
      "150": "#BDBDBD",
      "100": "#E0E0E0",
      "0": "#F5F5F5",
    },
    feedback: {
      negative: "#E60000",
      warning: "#FFCD07",
      success: "#168821",
      information: "#155BCB",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  fontSizes: {
    caption: "12px",
    body: "14px",
    headline: "16px",
    heading3: "18px",
    heading2: "22px",
    heading1: "26px",
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "grey.600",
      },
    },
  },
});
