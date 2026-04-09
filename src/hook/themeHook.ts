import { useContext } from "react";

import { ThemeContext } from "../context/themeContext";

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  console.log("theme in hook", theme);
  if (!theme) {
    console.error("");
    return;
  }
  return theme;
};
