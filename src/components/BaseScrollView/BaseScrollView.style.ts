import { StyleSheet } from "react-native";
import { ThemeColors } from "../../theme/colors/values";

const BaseScrollViewStyle = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    margin: 16,
  },
  lightContainer: {
    backgroundColor: ThemeColors.LightColors.background,

  },
  darkContainer: {
    backgroundColor: ThemeColors.DarkColors.background
  }
});

export default BaseScrollViewStyle;
