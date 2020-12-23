import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  Dialog,
  FAB,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { Driver } from "../../../store/reducers/driversReducer";
import { addDriver, updateDriver } from "../../../store/actions/driversActions";
import { useNavigation } from "@react-navigation/native";

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
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const state = navigation?.dangerouslyGetState();

  const routeParams = state.routes[state.index].params as Driver;

  const take = (key: string, fallback: any) =>
    typeof routeParams !== "undefined" && typeof routeParams[key] !== undefined
      ? routeParams[key]
      : fallback;

  const [name, setName] = useState<string>(take("name", ""));
  const [color, setColor] = useState<string>(take("color", "#d73964"));
  const [visible, setVisible] = useState<boolean>(false);

  const onSave = () => {
    const driver: Driver = {
      id: take("id", Date.now()),
      name,
      color,
    };

    if (typeof routeParams !== "undefined") {
      dispatch(updateDriver(driver));
    } else {
      dispatch(addDriver(driver));
    }

    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Button onPress={() => setVisible(true)}>Set color</Button>

      {/* <NativeColorPicker
        colors={colors}
        selectedColor={color}
        onSelect={setColor}
        animate="scale"
        scrollEnabled={true}
      /> */}
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
              <Text>This is a scrollable area</Text>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>

      <FAB label="Save" icon="check" onPress={() => onSave()} />
    </View>
  );
};

export default EditDriver;
