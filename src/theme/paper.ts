import { DefaultTheme, DarkTheme } from "react-native-paper";
import { THEMES } from "../store/constants/settingsConstants";
import { ThemeColors, IColors } from "./colors/values";

const get = (scheme: string) => {
  let values: IColors = null;

  switch (scheme) {
    case THEMES.LIGHT:
      values = ThemeColors.LightColors;
      break;
    case THEMES.DARK:
      values = ThemeColors.DarkColors;
      break;
    default:
      values = ThemeColors.LightColors;
  }

  let theme = null;

  if (scheme === THEMES.DARK) {
    theme = {
      ...DarkTheme,
      roundness: 6,
      colors: {
        ...DarkTheme.colors,
        primary: values.primary,
        accent: values.accent,
      },
    };
  } else {
    theme = {
      ...DefaultTheme,
      roundness: 6,
      colors: {
        ...DefaultTheme.colors,
        primary: values.primary,
        accent: values.accent,
      },
    };
  }

  return theme;
};

export default get;
