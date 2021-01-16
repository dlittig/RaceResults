import { StyleSheet, ViewStyle } from "react-native";
import { ThemeColors } from "../../theme/colors/values";

interface Styles {
  container: ViewStyle;
  lightContainer: ViewStyle;
  darkContainer: ViewStyle;
  spacer: ViewStyle;
  miniSpacer: ViewStyle;
}

const BaseScrollViewStyle = StyleSheet.create<Styles>({
  container: {
    display: "flex",
    flex: 1,
    padding: 16,
  },
  lightContainer: {
    backgroundColor: ThemeColors.LightColors.background,
  },
  darkContainer: {
    backgroundColor: ThemeColors.DarkColors.background,
  },
  spacer: {
    height: 90,
  },
  miniSpacer: {
    height: 50,
  },
});

export default BaseScrollViewStyle;
