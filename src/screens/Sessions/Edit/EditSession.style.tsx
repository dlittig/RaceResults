import { StyleSheet } from "react-native";

const EditSessionStyle = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  participants: {
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    flexGrow: 2,
  },
  radioButtonField: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
  },
});

export default EditSessionStyle;
