import { StyleSheet } from "react-native";
import { ThemeColors } from "../../theme/colors/values";

const BaseViewStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    flex: 1,
  },
  lightContainer: {
    backgroundColor: ThemeColors.LightColors.background,
  },
  darkContainer: {
    backgroundColor: ThemeColors.DarkColors.background,
  },
});

export default BaseViewStyle;
