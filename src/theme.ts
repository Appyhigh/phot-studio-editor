import { createTheme } from "baseui"

const primitives = {
  black: "#000000",
  black600: "#171725",
  white: "#fff",
  primary100: "#EEEEEE",
  grey400: "#F1F1F5",
  grey500: "#696974",
  primary500: "#44444F",
  grey700: "#44444F",
  caution: "#FF974A",
  secondary: "#6729F3",
  accent: "#6729F3",
  primaryFontFamily: "Rubik",
  secondaryFontFamily: "Poppins",
  scale0: "2px",
  scale100: "4px",
  scale200: "6px",
  scale300: "8px",
  scale400: "10px",
  scale500: "12px",
  scale550: "14px",
  scale600: "16px",
  scale650: "18px",
  scale700: "20px",
  scale750: "22px",
  scale800: "24px",
  scale850: "28px",
  scale900: "32px",
  scale950: "36px",
  scale1000: "40px",
  backgroundSecondary: "#696974",
  borderAccent:"#92929D"
}

const overrides = {
  colors: {
    black: primitives.black,
    darkBlack: primitives.black600,
    white: primitives.white,
    primary100: primitives.primary100,
    lightGrey: primitives.grey400,
    grey: primitives.grey500,
    primary500: primitives.primary500,
    darkestGrey: primitives.grey700,
    caution: primitives.caution,
    accent: primitives.accent,
    backgroundSecondary:primitives.backgroundSecondary,
    borderAccent:primitives.borderAccent
  },
  typography: {
    primaryExtraBold: {
      fontFamily: "Rubik",
      fontWeight: "700",
    },
    primaryBold: {
      fontFamily: "Rubik",
      fontWeight: "600",
    },
    primaryNormal: {
      fontFamily: "Rubik",
      fontWeight: "500",
    },
    primaryLight: {
      fontFamily: "Rubik",
      fontWeight: "400",
    },
    secondaryExtraBold: {
      fontFamily: "Poppins",
      fontWeight: "700",
    },
    secondaryBold: {
      fontFamily: "Poppins",
      fontWeight: "600",
    },
    secondaryNormal: {
      fontFamily: "Poppins",
      fontWeight: "500",
    },
    secondaryLight: {
      fontFamily: "Poppins",
      fontWeight: "400",
    },
    ParagraphXSmall: {
      fontFamily: "Poppins",
      fontWeight: "500",
      fontSize: "12px",
    },
  },
  sizing: {
    scale0: primitives.scale0,
    scale100: primitives.scale100,
    scale200: primitives.scale200,
    scale300: primitives.scale300,
    scale400: primitives.scale400,
    scale500: primitives.scale500,
    scale550: primitives.scale550,
    scale600: primitives.scale600,
    scale650: primitives.scale650,
    scale700: primitives.scale700,
    scale750: primitives.scale750,
    scale800: primitives.scale800,
    scale850: primitives.scale850,
    scale900: primitives.scale900,
    scale950: primitives.scale950,
    scale1000: primitives.scale1000,
  },
}

export const CustomTheme = createTheme(primitives, overrides)
