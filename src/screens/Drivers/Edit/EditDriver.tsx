import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Badge,
  Button,
  Dialog,
  FAB,
  List,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Driver, DriversState } from "../../../store/reducers/driversReducer";
import { addDriver, updateDriver } from "../../../store/actions/driversActions";
import { useNavigation } from "@react-navigation/native";
import BaseView from "../../../components/BaseView/BaseView";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";

import style from "./EditDriver.style";
import { RootReducerType } from "../../../store/reducers";
import { useTranslation } from "react-i18next";

const colors = [
  "#d73964",
  "#f6c244",
  "#e25241",
  "#d0da59",
  "#70b949",
  "#009688",
  "#4a97e4",
  "#4053ae",
  "#9946c7",
  "#d9639e",
  "#6d6f74",
  "#939287",
  "#868ea3",
];

const EditDriver = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const state = navigation?.dangerouslyGetState();

  const { driver: driverId } = state.routes[state.index].params || {
    driver: undefined,
  };
  const driversReducer = useSelector<RootReducerType, DriversState>(
    (state) => state.driversReducer
  );

  const take = (key: string, fallback: any) =>
    typeof driverId !== "undefined" &&
    typeof driversReducer.drivers[driverId][key] !== "undefined"
      ? driversReducer.drivers[driverId][key]
      : fallback;

  const [name, setName] = useState<string>(take("name", ""));
  const [selectedColor, setSelectedColor] = useState<string>(
    take("color", "#d73964")
  );

  const onSave = () => {
    const driver: Driver = {
      id: take("id", Date.now()),
      name,
      color: selectedColor,
    };

    if (typeof driverId !== "undefined") {
      dispatch(updateDriver(driver));
    } else {
      dispatch(addDriver(driver));
    }

    navigation.goBack();
  };

  return (
    <BaseView>
      <BaseScrollView>
        <TextInput
          label={t("form.name")}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <List.Accordion
          title={t("form.driver_color")}
          description={
            <Text size={10} style={{ color: selectedColor }}>
              {t("form.selected_color")}
            </Text>
          }
        >
          {colors.map((color, index) => (
            <List.Item
              key={index}
              title={t("text.driver.color")}
              titleStyle={{ color: color }}
              right={(props) =>
                selectedColor === color ? (
                  <List.Icon {...props} icon="check" />
                ) : null
              }
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </List.Accordion>
      </BaseScrollView>
      <FAB
        style={style.fab}
        label={t("actions.save")}
        icon="check"
        onPress={() => onSave()}
      />
    </BaseView>
  );
};

export default EditDriver;
