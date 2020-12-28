import React, { FC } from "react";
import { Alert, TouchableOpacity, View, ToastAndroid } from "react-native";
import { Badge, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteDriver } from "../../../store/actions/driversActions";
import { deleteRace } from "../../../store/actions/raceActions";
import { RootReducerType } from "../../../store/reducers";
import { Race } from "../../../store/reducers/raceReducer";
import { SessionsState } from "../../../store/reducers/sessionsReducer";
import { humanReadableDate } from "../../../utils";

import style from "./Driver.style";

const DriverCard: FC = ({ driver, onPress, position }) => {
  const sessionsReducer = useSelector<RootReducerType, SessionsState>(
    (state) => state.sessionsReducer
  );

  const confirmDelete = () => {
    const participating = sessionsReducer.sessions.filter((session) =>
      session.participants.includes(driver.id)
    );

    if (participating.length === 0) {
      Alert.alert(
        "Confirm deletion",
        `Are you sure you want to delete "${driver.name}"?`,
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => dispatch(deleteDriver(driver)),
          },
        ],
        { cancelable: false }
      );
    } else {
      ToastAndroid.showWithGravity(
        "Can not delete driver who participated in sessions",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={() => confirmDelete()}
      style={style.touchableFeedback}
    >
      <View style={style.container}>
        <Badge
          size={10}
          style={{ backgroundColor: driver.color, ...style.badge }}
        ></Badge>
        <Text>{driver.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;
