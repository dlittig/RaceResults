import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button, Text, FAB } from "react-native-paper";
import styles from "./ViewSession.style";
import {
  APP_EDIT_SESSION,
  APP_RANDOM_MAP,
  APP_SCOREBOARD,
} from "../../../navigator/RouteConstants";
import {
  Session,
  SessionsState,
} from "../../../store/reducers/sessionsReducer";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../../store/reducers";

const ViewSession = () => {
  const sessionsReducer = useSelector<RootReducerType, SessionsState>(
    (state) => state.sessionsReducer
  );
  const currentSession = (): Session =>
    sessionsReducer.sessions.filter((el) => el.id === routeParams.id)[0];

  const navigation = useNavigation();
  const state = navigation.dangerouslyGetState();
  const routeParams = state.routes[state.index].params as Session;
  const [session, setSession] = useState<Session>(currentSession());

  useEffect(() => {
    setSession(currentSession());
  }, [sessionsReducer]);

  return (
    <View style={styles.container}>
      <Text>Name: {session.label}</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate(APP_SCOREBOARD)}
      >
        Scoreboard
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate(APP_RANDOM_MAP)}
      >
        Random map
      </Button>
      <Button
        onPress={() => navigation.navigate(APP_EDIT_SESSION, { ...session })}
      >
        Edit
      </Button>
      <FAB
        style={styles.fab}
        label="Race"
        icon="plus"
        onPress={() => {}}
      />
    </View>
  );
};

export default ViewSession;
