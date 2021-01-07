import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, FAB } from "react-native-paper";
import styles from "./Sessions.style";
import {
  APP_EDIT_SESSION,
  APP_VIEW_SESSION,
} from "../../../navigator/RouteConstants";
import { useSelector } from "react-redux";
import SessionCard from "../../../components/Cards/Session";
import { SessionsState } from "../../../store/reducers/sessionsReducer";
import { RootReducerType } from "../../../store/reducers";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";
import BaseView from "../../../components/BaseView/BaseView";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { HOOK, useStore } from "../../../hooks/store";

const Sessions = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { sessions: sessionsReducer } = useStore<{ sessions: SessionsState }>(
    [HOOK.SESSIONS],
    {}
  );

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
      {sessionsReducer!!.sessions.length > 0 && (
        <BaseScrollView>
          {sessionsReducer!!.sessions.map((session, index) => (
            <SessionCard
              key={index}
              onPress={() =>
                navigation.navigate(t(APP_VIEW_SESSION), {
                  session: session.id,
                })
              }
              session={session}
            />
          ))}
        </BaseScrollView>
      )}
      <FAB
        style={styles.fab}
        label={t("actions.add")}
        icon="plus"
        onPress={() => navigation.navigate(t(APP_EDIT_SESSION))}
      />
    </BaseView>
  );
};
export default Sessions;
