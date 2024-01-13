import { useContext } from "react";
import { StatusBar as Bar } from "react-native";
import { ThemeColors } from "../../theme/colors/values";
import { THEMES } from "../../store/constants/settingsConstants";
import { ThemeContext } from "../../provider/ThemeProvider/ThemeProvider";

const getBackgroundColor = (theme: string) => {
  switch (theme) {
    case THEMES.LIGHT:
      return ThemeColors.LightColors.card;
    case THEMES.DARK:
      return ThemeColors.DarkColors.card;
    default:
      return ThemeColors.LightColors.card;
  }
};

const ThemedStatusBar = () => {
  const theme = useContext(ThemeContext);
  return (
    <Bar
      barStyle={theme === THEMES.LIGHT ? "dark-content" : "light-content"}
      animated={true}
      backgroundColor={getBackgroundColor(theme)}
    />
  );
};

export default ThemedStatusBar;
