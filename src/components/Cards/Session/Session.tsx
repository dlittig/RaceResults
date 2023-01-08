import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteRaceBySession } from "../../../store/actions/raceActions";
import { deleteSession } from "../../../store/actions/sessionsActions";
import { Session } from "../../../store/reducers/sessionsReducer";
import { humanReadableDate } from "../../../utils";
import BaseCard from "../BaseCard";

import style from "./Session.style";

type SessionCardProps = {
  session: Session;
  onPress: () => void;
};

const SessionCard: FC<SessionCardProps> = ({ session, onPress }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const confirmDelete = (session: Session) => {
    const sessionId = session.id;

    Alert.alert(
      t("dialogs.delete_session.title"),
      `${t("dialogs.delete_session.content")} "${session.label}"?`,
      [
        {
          text: t("actions.cancel") || "",
          onPress: () => undefined,
          style: "cancel",
        },
        {
          text: t("actions.accept") || "",
          onPress: () => {
            dispatch(deleteSession(session));
            dispatch(deleteRaceBySession(sessionId));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <BaseCard onPress={onPress} onLongPress={() => confirmDelete(session)}>
      <View style={style.container}>
        <Text style={style.boldText}>{session.label}</Text>
        <Text>
          <MaterialCommunityIcons name="clock-time-five-outline" />
          {` ${humanReadableDate(session.startTime)}`}
        </Text>
      </View>
    </BaseCard>
  );
};

export default SessionCard;
