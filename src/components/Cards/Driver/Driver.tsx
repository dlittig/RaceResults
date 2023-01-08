import React, { FC } from "react";
import { Badge, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Alert, View, ToastAndroid } from "react-native";
import BaseCard from "../BaseCard";
import { Driver } from "../../../store/reducers/driversReducer";
import { deleteDriver } from "../../../store/actions/driversActions";

import style from "./Driver.style";
import { useTranslation } from "react-i18next";
import { HOOK, UseStateResult, useStore } from "../../../hooks/store";
import { Session } from "../../../store/reducers/sessionsReducer";

type DriverCardType = {
  driver: Driver;
  onPress: () => void;
  allowDelete: boolean;
};

const DriverCard: FC<DriverCardType> = ({ driver, onPress, allowDelete }) => {
  const { sessionsReducer } = useStore<UseStateResult>([HOOK.SESSIONS], {});
  const { t } = useTranslation();

  const confirmDelete = () => {
    const participating = sessionsReducer.sessions.filter((session: Session) =>
      session.participants.includes(driver.id)
    );

    if (participating.length === 0) {
      Alert.alert(
        t("dialogs.delete_driver.title"),
        `${t("dialogs.delete_driver.content")} "${driver.name}"?`,
        [
          {
            text: t("actions.cancel") || "",
            onPress: () => undefined,
            style: "cancel",
          },
          {
            text: t("actions.accept") || "",
            onPress: () => dispatch(deleteDriver(driver)),
          },
        ],
        { cancelable: false }
      );
    } else {
      ToastAndroid.showWithGravityAndOffset(
        t("toasts.delete_driver_in_use"),
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100
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
          visible={true}
          size={10}
          style={{ backgroundColor: driver.color, ...style.badge }}
        />
        <Text accessibilityLabel="driver name">{driver.name}</Text>
      </View>
    </BaseCard>
  );
};

export default DriverCard;
