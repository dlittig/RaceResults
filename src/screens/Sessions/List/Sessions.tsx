import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Text, FAB, Button, List } from "react-native-paper";
import styles from "./Sessions.style";
import { APP_EDIT_SESSION, APP_VIEW_SESSION } from "../../../navigator/RouteConstants";
import { useSelector } from "react-redux";
import { SessionsState } from "../../../store/reducers/sessionsReducer";
import { RootReducerType } from "../../../store/reducers";

const Sessions = () => {
  const navigation = useNavigation();
  const sessionsReducer = useSelector<RootReducerType, SessionsState>(
    (state) => state.sessionsReducer
  );

  return (
    <View style={styles.container}>
      {sessionsReducer.sessions.map((session, index) => (
        <List.Item
          key={index}
          title={session.label || session.startTime}
          onPress={() => navigation.navigate(APP_VIEW_SESSION, { ...session })}
        />
      ))}
      <FAB
        style={styles.fab}
        label="Add"
        icon="plus"
        onPress={() => navigation.navigate(APP_EDIT_SESSION)}
      />
    </View>
  );
};
export default Sessions;
