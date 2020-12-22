import React, { useState } from "react";
import { View } from "react-native";
import { FAB, Text, TextInput } from "react-native-paper";
import NativeColorPicker from "native-color-picker";

const colors = [
  "#d73964",
  "#d23440",
  "#db643a",
  "#e88334",
  "#e2a71e",
  "#e25241",
  "#d0da59",
  "#4053ae",
  "#70b949",
  "#73564a",
  "#67ab5a",
  "#8f36aa",
  "#f6c244",
  "#52b9d0",
  "#4595ec",
  "#009688",
  "#5abeA7",
  "#59bccd",
  "#4a97e4",
  "#2d68cd",
  "#9946c7",
  "#d9639e",
  "#6d6f74",
  "#939287",
  "#868ea3",
];

const EditDriver = () => {
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("#d73964");

  return (
    <View>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <NativeColorPicker
        colors={colors}
        selectedColor={color}
        onSelect={setColor}
        animate="scale"
        scrollEnabled={true}
      />

      <FAB label="Save" icon="check" />
    </View>
  );
};

export default EditDriver;
