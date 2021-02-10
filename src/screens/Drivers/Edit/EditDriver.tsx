import React, { FC, useState } from "react";
import { FAB, List, Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Driver } from "../../../store/reducers/driversReducer";
import { addDriver, updateDriver } from "../../../store/actions/driversActions";
import { useNavigation } from "@react-navigation/native";
import BaseView from "../../../components/BaseView/BaseView";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";

import style from "./EditDriver.style";
import { useTranslation } from "react-i18next";
import { useConfirmation } from "../../../hooks/confirmation";
import { HOOK, useStore } from "../../../hooks/store";
import { ToastAndroid } from "react-native";

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

type RouteParams = {
  driver?: number;
};

const EditDriver: FC = () => {
  const { setDisableConfirmation } = useConfirmation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const state = navigation?.dangerouslyGetState();

  const { driver: driverId } = (state.routes[state.index]
    .params as RouteParams) || { driver: undefined };
  const { driver } = useStore([HOOK.DRIVER_SPECIFIC], { driverId });

  const take = <T extends unknown>(key: string, fallback: T): T =>
    typeof driverId !== "undefined" &&
    driver !== null &&
    typeof driver[key] !== "undefined"
      ? driver[key]
      : fallback;

  const [name, setName] = useState<string>(take("name", ""));
  const [selectedColor, setSelectedColor] = useState<string>(
    take("color", "#d73964")
  );

  const onSave = () => {
    if (name.length === 0) {
      ToastAndroid.showWithGravityAndOffset(
        t("toasts.driver_name_empty"),
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100
      );

      return;
    }

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

    setDisableConfirmation(true);
    navigation.goBack();
  };

  return (
    <BaseView>
      <BaseScrollView spacer>
        <TextInput
          label={t("form.name")}
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <List.Accordion
          title={t("form.driver_color")}
          description={
            <Text style={{ color: selectedColor }}>
              {t("form.selected_color")}
            </Text>
          }
        >
          {colors.map((color, index) => (
            <List.Item
              key={index}
              title={t("text.driver.color")}
              titleStyle={{ color }}
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
