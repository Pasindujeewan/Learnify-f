import { useContext } from "react";

import { ThemeContext } from "../context/themeContext";

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    return;
  }
  return theme;
};
