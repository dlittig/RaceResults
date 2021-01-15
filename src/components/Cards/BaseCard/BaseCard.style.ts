import { StyleSheet } from "react-native";

const BaseCardStyle = StyleSheet.create({
  container: {
    elevation: 4,
    borderRadius: 8,
  },
  touchable: {
    margin: 2,
    padding: 3,
    marginBottom: 12,
    borderRadius: 8,
  },
  parentView: {
    borderRadius: 8,
  },
});

export default BaseCardStyle;
