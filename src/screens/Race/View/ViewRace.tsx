import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { DataTable, Text } from "react-native-paper";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";
import BaseView from "../../../components/BaseView/BaseView";
import NavSeparator from "../../../components/NavSeparator/NavSeparator";
import { HOOK, UseStateResult, useStore } from "../../../hooks/store";
import ThemeProvider from "../../../provider/ThemeProvider/ThemeProvider";
import { THEMES } from "../../../store/constants/settingsConstants";
import { getPointsMap } from "../../../utils";

import style from "./ViewRace.style";
import { CONDITION } from "../../../store/reducers/raceReducer";

type ViewRaceRouteParams = {
  session: number;
  race?: number;
};

const ViewRace = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const state = navigation?.dangerouslyGetState();

  const routeParams = state.routes[state.index].params as ViewRaceRouteParams;
  const { session, race, driversReducer } = useStore(
    [HOOK.RACE_SPECIFIC, HOOK.SESSION_SPECIFIC, HOOK.DRIVERS],
    { sessionId: routeParams.session, raceId: routeParams.race }
  );

  const pointsMap = getPointsMap(
    session.pointScheme,
    session.participants.length
  );

  const pointsForFastestRound = (driverId: number): number =>
    race.fastest?.includes(driverId) ? 1 : 0;

  const getWeatherIcon = () => {
    switch (race.condition) {
      case CONDITION.DRY:
        return "sunny";
      case CONDITION.NIGHT:
        return "moon";
      case CONDITION.RAIN:
        return "rainy";
    }
  };

  return (
    <BaseView>
      <Text style={style.raceTrack}>
        <ThemeProvider.Consumer>
          {(theme) => (
            <Ionicons
              name={getWeatherIcon()}
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
            <DataTable.Title numeric>
              {t("text.scoreboard.points")}
            </DataTable.Title>
          </DataTable.Header>

          {race.order.map((driverId, index) => (
            <React.Fragment key={index}>
              <DataTable.Row key={`${index}-details`}>
                <DataTable.Cell>{index + 1}</DataTable.Cell>
                <DataTable.Cell>
                  {driversReducer.drivers[driverId].name}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {pointsMap[index + 1] + pointsForFastestRound(driverId)}
                </DataTable.Cell>
              </DataTable.Row>
              {typeof race.cars[driverId] !== undefined &&
                race.cars[driverId].length > 0 && (
                  <DataTable.Row key={`${index}-car`}>
                    <DataTable.Cell>
                      <></>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Ionicons name="car-sport" />
                      {` ${race.cars[driverId]}`}
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      <></>
                    </DataTable.Cell>
                  </DataTable.Row>
                )}
            </React.Fragment>
          ))}
        </DataTable>
      </BaseScrollView>
    </BaseView>
  );
};

export default ViewRace;
