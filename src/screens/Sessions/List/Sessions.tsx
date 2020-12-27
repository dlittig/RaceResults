import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, FAB, Button, List } from "react-native-paper";
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

const Sessions = () => {
  const navigation = useNavigation();
  const sessionsReducer = useSelector<RootReducerType, SessionsState>(
    (state) => state.sessionsReducer
  );

  return (
    <BaseView>
      {sessionsReducer.sessions.length === 0 && (
        <View>
          <Text>Get started by creating some drivers via the hamburger menu 🙂</Text>
        </View>
      )}
      {sessionsReducer.sessions.length > 0 && (
        <BaseScrollView>
          {sessionsReducer.sessions.map((session, index) => (
            <SessionCard
              key={index}
              onPress={() =>
                navigation.navigate(APP_VIEW_SESSION, { ...session })
              }
              session={session}
            />
          ))}
        </BaseScrollView>
      )}
      <FAB
        style={styles.fab}
        label="Add"
        icon="plus"
        onPress={() => navigation.navigate(APP_EDIT_SESSION)}
      />
    </BaseView>
  );
};
export default Sessions;
