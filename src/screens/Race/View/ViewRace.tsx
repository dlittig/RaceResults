import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { DataTable, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";
import BaseView from "../../../components/BaseView/BaseView";
import NavSeparator from "../../../components/NavSeparator/NavSeparator";
import ThemeProvider from "../../../provider/ThemeProvider/ThemeProvider";
import { THEMES } from "../../../store/constants/settingsConstants";
import { RootReducerType } from "../../../store/reducers";
import { DriversState } from "../../../store/reducers/driversReducer";
import { Race, RaceState } from "../../../store/reducers/raceReducer";
import {
  Session,
  SessionsState,
} from "../../../store/reducers/sessionsReducer";
import { getPointsMap } from "../../../utils";

import style from "./ViewRace.style";

type ViewRaceRouteParams = {
  session: number;
  race?: number;
};

const ViewRace = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const state = navigation?.dangerouslyGetState();
  const driversReducer = useSelector<RootReducerType, DriversState>(
    (state) => state.driversReducer
  );
  const sessionsReducer = useSelector<RootReducerType, SessionsState>(
    (state) => state.sessionsReducer
  );
  const raceReducer = useSelector<RootReducerType, RaceState>(
    (state) => state.raceReducer
  );

  const routeParams = state.routes[state.index].params as ViewRaceRouteParams;

  const session = sessionsReducer.sessions.filter(
    (item) => item.id === routeParams.session
  )[0];

  const race = raceReducer.races.filter(
    (item) => item.id === routeParams.race
  )[0];

  const pointsMap = getPointsMap(
    session.pointScheme,
    session.participants.length
  );

  const pointsForFastestRound = (driverId: number): number =>
    race.fastest?.includes(driverId) ? 1 : 0;

  return (
    <BaseView>
      <Text style={style.raceTrack}>
        <ThemeProvider.Consumer>
          {(theme) => (
            <MaterialCommunityIcons
              name="map"
              color={theme === THEMES.LIGHT ? "#333" : "#fff"}
              size={16}
            />
          )}
        </ThemeProvider.Consumer>
        {` ${race.location}`}
      </Text>
      <NavSeparator />
      <BaseScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>#</DataTable.Title>
            <DataTable.Title>{t("text.scoreboard.driver")}</DataTable.Title>
            <DataTable.Title numeric>{t("text.scoreboard.points")}</DataTable.Title>
          </DataTable.Header>

          {race.order.map((driverId, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{index + 1}</DataTable.Cell>
              <DataTable.Cell>
                {driversReducer.drivers[driverId].name}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {pointsMap[index + 1] + pointsForFastestRound(driverId)}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </BaseScrollView>
    </BaseView>
  );
};

export default ViewRace;
