import React, { FC } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Badge, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteDriver } from "../../../store/actions/driversActions";
import { deleteRace } from "../../../store/actions/raceActions";
import { Race } from "../../../store/reducers/raceReducer";
import { humanReadableDate } from "../../../utils";

import style from "./Driver.style";

const DriverCard: FC = ({ driver, onPress, position }) => {
  const confirmDelete = () => {
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
  };
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={() => confirmDelete()}
      style={style.touchableFeedback}
    >
      <View style={style.container}>
        <Badge size={10} style={{backgroundColor: driver.color, ...style.badge}}></Badge>
        <Text>{driver.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;
