const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const theme = {
  colors: {
    bgWhite: (opacity = 1) => `rgba(255,255,255,${opacity})`,
  },
};

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
