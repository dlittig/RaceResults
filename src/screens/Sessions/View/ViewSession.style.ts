import { StyleSheet } from "react-native";

const ViewSessionStyle = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    display: "flex",
    flex: 1,
  },
  sessionLabel: {
    fontSize: 16,
    marginHorizontal: 72,
    marginBottom: 12,
  },
  emptyState: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 12,
  }
});

export default ViewSessionStyle;
