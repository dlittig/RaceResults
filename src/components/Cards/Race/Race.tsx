import React, { FC } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteRace } from "../../../store/actions/raceActions";
import { Race } from "../../../store/reducers/raceReducer";
import { humanReadableDate } from "../../../utils";
import BaseCard from "../BaseCard";

import style from "./Race.style";

type RaceCardType = {
  race: Race;
  onPress: () => void;
  position: number;
};

const RaceCard: FC<RaceCardType> = ({ race, onPress, position }) => {
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
    <BaseCard onPress={onPress} onLongPress={() => confirmDelete()}>
      <View style={style.container}>
        <Text
          style={style.boldText}
        >{`Race ${position}: ${race.location}`}</Text>
        <Text>Started: {humanReadableDate(race.time)}</Text>
      </View>
    </BaseCard>
  );
};

export default RaceCard;
