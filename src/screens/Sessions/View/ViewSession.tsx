import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { Button, Text, FAB } from "react-native-paper";
import styles from "./ViewSession.style";
import {
  APP_EDIT_RACE,
  APP_RANDOM_MAP,
  APP_VIEW_RACE,
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
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ViewSession = () => {
  const navigation = useNavigation();
  const state = navigation.dangerouslyGetState();
  const routeParams = state.routes[state.index].params as Session;
  const sessionsReducer = useSelector<RootReducerType, SessionsState>(
    (state) => state.sessionsReducer
  );
  const raceReducer = useSelector<RootReducerType, RaceState>(
    (state) => state.raceReducer
  );
  const session = sessionsReducer.sessions.filter(
    (el) => el.id === routeParams.id
  )[0];
  const races = raceReducer.races.filter((race) => race.session === session.id);

  return (
    <BaseView>
      <Text style={styles.sessionLabel}>
        <MaterialCommunityIcons name="tag" color={"#333"} size={16} />
        {` ${session.label}`}
      </Text>
      <NavSeparator />
      <BaseScrollView>
        {races.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.text}>
              Start your session with a random map 😎
            </Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate(APP_RANDOM_MAP)}
            >
              <MaterialCommunityIcons name="sync" size={16} />
              {` Random map`}
            </Button>
          </View>
        )}
        {races.map((race, index) => (
          <Race
            key={race.id}
            position={index + 1}
            race={race}
            onPress={() =>
              navigation.navigate(APP_VIEW_RACE, { race, session })
            }
          />
        ))}
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
