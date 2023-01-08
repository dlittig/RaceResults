import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, FAB } from "react-native-paper";
import styles from "./Sessions.style";
import {
  APP_EDIT_SESSION,
  APP_VIEW_SESSION,
} from "../../../navigator/RouteConstants";
import SessionCard from "../../../components/Cards/Session";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";
import BaseView from "../../../components/BaseView/BaseView";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { HOOK, SessionsResult, useStore } from "../../../hooks/store";

const Sessions: FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { sessionsReducer } = useStore<SessionsResult>([HOOK.SESSIONS], {});

  return (
    <BaseView>
      {sessionsReducer.sessions.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            {t("empty.sessions")}
            <MaterialCommunityIcons name="menu" size={16} />
          </Text>
        </View>
      )}
      {sessionsReducer.sessions.length > 0 && (
        <BaseScrollView spacer>
          {sessionsReducer.sessions.map((session, index) => (
            <SessionCard
              key={index}
              onPress={() =>
                navigation.navigate(
                  t(APP_VIEW_SESSION) as never,
                  {
                    session: session.id,
                  } as never
                )
              }
              session={session}
            />
          ))}
        </BaseScrollView>
      )}
      <FAB
        style={styles.fab}
        label={t("actions.add") || ""}
        icon="plus"
        onPress={() => navigation.navigate(t(APP_EDIT_SESSION) as never)}
      />
    </BaseView>
  );
};
export default Sessions;
