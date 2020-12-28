import { StyleSheet } from "react-native";

const SessionStyle = StyleSheet.create({
  container: {
    margin: 5,
    marginBottom: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "#333",
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
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
