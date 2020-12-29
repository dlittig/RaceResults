import { StyleSheet } from "react-native";

const SessionStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  badge: {
    marginEnd: 15,
  },
  touchableFeedback: {
    borderRadius: 10,
  },
  boldText: {
    fontWeight: "bold"
  }
});

export default SessionStyle;
