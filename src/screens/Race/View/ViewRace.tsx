import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { DataTable, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";
import BaseView from "../../../components/BaseView/BaseView";
import NavSeparator from "../../../components/NavSeparator/NavSeparator";
import { RootReducerType } from "../../../store/reducers";
import { DriversState } from "../../../store/reducers/driversReducer";
import { Race } from "../../../store/reducers/raceReducer";
import { Session } from "../../../store/reducers/sessionsReducer";
import { getPointsMap } from "../../../utils";

import style from "./ViewRace.style";

type ViewRaceRouteParams = {
  session: Session;
  race?: Race;
};

const ViewRace = () => {
  const navigation = useNavigation();
  const state = navigation?.dangerouslyGetState();
  const driversReducer = useSelector<RootReducerType, DriversState>(
    (state) => state.driversReducer
  );

  const routeParams = state.routes[state.index].params as ViewRaceRouteParams;

  const pointsMap = getPointsMap(
    routeParams.session.pointScheme,
    routeParams.session.participants.length
  );
  //const pointsMap = {};

  return (
    <BaseView>
      <Text style={style.raceTrack}>
        <MaterialCommunityIcons name="map" color={"#333"} size={16} />
        {` ${routeParams.race?.location}`}
      </Text>
      <NavSeparator />
      <BaseScrollView>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>#</DataTable.Title>
            <DataTable.Title>Driver</DataTable.Title>
            <DataTable.Title numeric>Points</DataTable.Title>
          </DataTable.Header>

          {Object.values(routeParams.race?.order).map((driverId, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{index + 1}</DataTable.Cell>
              <DataTable.Cell>
                {driversReducer.drivers[driverId].name}
              </DataTable.Cell>
              <DataTable.Cell numeric>{pointsMap[index + 1]}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </BaseScrollView>
    </BaseView>
  );
};

export default ViewRace;
