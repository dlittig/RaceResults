import React, { FC } from "react";
import { Badge, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Alert, View, ToastAndroid } from "react-native";
import BaseCard from "../BaseCard";
import { Driver } from "../../../store/reducers/driversReducer";
import { deleteDriver } from "../../../store/actions/driversActions";

import style from "./Driver.style";
import { useTranslation } from "react-i18next";
import { HOOK, useStore } from "../../../hooks/store";

type DriverCardType = {
  driver: Driver;
  onPress: () => void;
  allowDelete: boolean;
};

const DriverCard: FC<DriverCardType> = ({ driver, onPress, allowDelete }) => {
  const { sessionsReducer } = useStore([HOOK.SESSIONS], {});
  const { t } = useTranslation();

  const confirmDelete = () => {
    const participating = sessionsReducer.sessions.filter((session) =>
      session.participants.includes(driver.id)
    );

    if (participating.length === 0) {
      Alert.alert(
        t("dialogs.delete_driver.title"),
        `${t("dialogs.delete_driver.content")} "${driver.name}"?`,
        [
          {
            text: t("actions.cancel"),
            onPress: () => {},
            style: "cancel",
          },
          {
            text: t("actions.accept"),
            onPress: () => dispatch(deleteDriver(driver)),
          },
        ],
        { cancelable: false }
      );
    } else {
      ToastAndroid.showWithGravity(
        t("toasts.delete_driver_in_use"),
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };
  const dispatch = useDispatch();

  return (
    <BaseCard
      onPress={onPress}
      onLongPress={() => (allowDelete ? confirmDelete() : null)}
    >
      <View style={style.container}>
        <Badge
          size={10}
          style={{ backgroundColor: driver.color, ...style.badge }}
        ></Badge>
        <Text>{driver.name}</Text>
      </View>
    </BaseCard>
  );
};

export default DriverCard;
