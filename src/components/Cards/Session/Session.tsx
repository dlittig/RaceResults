import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteRaceBySession } from "../../../store/actions/raceActions";
import { deleteSession } from "../../../store/actions/sessionsActions";
import { Session } from "../../../store/reducers/sessionsReducer";
import { humanReadableDate } from "../../../utils";

import style from "./Session.style";

const SessionCard: FC = ({ session, onPress }) => {
  const confirmDelete = (session: Session) => {
    const sessionId = session.id;

    Alert.alert(
      "Confirm deletion",
      `Are you sure you want to delete the session "${session.label}"?`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(deleteSession(session));
            dispatch(deleteRaceBySession(sessionId));
          },
        },
      ],
      { cancelable: false }
    );
  };
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={() => confirmDelete(session)}
      style={style.touchableFeedback}
    >
      <View style={style.container}>
        <Text style={style.boldText}>{session.label}</Text>
        <Text>
          <MaterialCommunityIcons name="clock-time-five-outline" />
          {` ${humanReadableDate(session.startTime)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SessionCard;
