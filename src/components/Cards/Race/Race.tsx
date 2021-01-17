import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteRace } from "../../../store/actions/raceActions";
import { CONDITION, Race } from "../../../store/reducers/raceReducer";
import { humanReadableDate } from "../../../utils";
import BaseCard from "../BaseCard";

import style from "./Race.style";

type RaceCardType = {
  race: Race;
  onPress: () => void;
  position: number;
};

const RaceCard: FC<RaceCardType> = ({ race, onPress, position }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const confirmDelete = () => {
    Alert.alert(
      t("dialogs.delete_race.title"),
      t("dialogs.delete_race.content"),
      [
        {
          text: t("actions.cancel"),
          onPress: () => {},
          style: "cancel",
        },
        {
          text: t("actions.accept"),
          onPress: () => dispatch(deleteRace(race)),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <BaseCard onPress={onPress} onLongPress={() => confirmDelete()}>
      <View style={style.container}>
        <Text style={style.boldText}>{`${t("text.race.race")} ${position}: ${
          race.location
        }`}</Text>
        <Text>
          <MaterialCommunityIcons name="clock-time-five-outline" />
          {` ${humanReadableDate(race.time)} `}
          {race.condition === CONDITION.DRY && (
            <Ionicons name="sunny" />
          )}
          {race.condition === CONDITION.NIGHT && (
            <Ionicons name="moon" />
          )}
          {race.condition === CONDITION.RAIN && (
            <Ionicons name="rainy" />
          )}
        </Text>
      </View>
    </BaseCard>
  );
};

export default RaceCard;
