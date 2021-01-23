import { StyleSheet } from "react-native";

const EditRaceStyle = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  touchableDrag: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  lightActive: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 16,
  },
  darkActive: {
    backgroundColor: "#555555",
    paddingHorizontal: 16,
  },
  darkIcon: {
    color: "#fff",
  },
  lightIcon: {
    color: "#333",
  },
  banner: {
    elevation: 4,
    margin: 8,
    marginBottom: 20,
    borderRadius: 8,
  },
  dragContainer: {
    width: 40,
    justifyContent: "center",
  },
  inputContainer: { flex: 1 },
  conditionSubheading: { marginVertical: 10 },
  conditionContainer: {
    marginVertical: 10,
  },
});

export default EditRaceStyle;
