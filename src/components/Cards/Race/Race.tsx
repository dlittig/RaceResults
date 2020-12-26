import React, { FC } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteRace } from "../../../store/actions/raceActions";
import { Race } from "../../../store/reducers/raceReducer";
import { humanReadableDate } from "../../../utils";

import style from "./Race.style";

const RaceCard: FC = ({ race, onPress, position }) => {
  const confirmDelete = () => {
    Alert.alert(
      "Confirm deletion",
      `Are you sure you want to delete this race?`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => dispatch(deleteRace(race)),
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
        <Text style={style.boldText}>{`Race ${position}: ${race.location}`}</Text>
        <Text>Started: {humanReadableDate(race.time)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RaceCard;
