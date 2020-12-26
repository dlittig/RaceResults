import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, FAB } from "react-native-paper";
import styles from "./ViewSession.style";
import {
  APP_EDIT_RACE,
  APP_RANDOM_MAP,
} from "../../../navigator/RouteConstants";
import {
  Session,
  SessionsState,
} from "../../../store/reducers/sessionsReducer";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../../store/reducers";
import { RaceState } from "../../../store/reducers/raceReducer";
import BaseView from "../../../components/BaseView/BaseView";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";
import NavSeparator from "../../../components/NavSeparator/NavSeparator";
import Race from "../../../components/Cards/Race";

const ViewSession = () => {
  const sessionsReducer = useSelector<RootReducerType, SessionsState>(
    (state) => state.sessionsReducer
  );
  const raceReducer = useSelector<RootReducerType, RaceState>(
    (state) => state.raceReducer
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
    <BaseView>
      <Text style={styles.sessionLabel}>Name: {session.label}</Text>
      <NavSeparator />
      <BaseScrollView>
        {raceReducer.races.length === 0 && (
          <View>
            <Text>Start your session with a random map :)</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate(APP_RANDOM_MAP)}
            >
              Random map
            </Button>
          </View>
        )}
        {raceReducer.races.map((race, index) => (
          <Race
            key={race.id}
            position={index + 1}
            race={race}
            onPress={() =>
              navigation.navigate(APP_EDIT_RACE, { session, race })
            }
          />
        ))}
        {/* <Button
        mode="contained"
        onPress={() => navigation.navigate(APP_SCOREBOARD)}
      >
        Scoreboard
      </Button>
      <Button
        onPress={() => navigation.navigate(APP_EDIT_SESSION, { ...session })}
      >
        Edit
      </Button> */}
      </BaseScrollView>
      <FAB
        style={styles.fab}
        label="Race"
        icon="plus"
        onPress={() => navigation.navigate(APP_EDIT_RACE, { session })}
      />
    </BaseView>
  );
};

export default ViewSession;
