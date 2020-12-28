import { StyleSheet } from "react-native";

const SessionStyle = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyState: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  emptyStateText: {
    textAlign: "center",
  },
});

export default SessionStyle;
