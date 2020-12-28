import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { DataTable, ProgressBar, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import BaseScrollView from "../../components/BaseScrollView/BaseScrollView";
import BaseView from "../../components/BaseView/BaseView";
import { RootReducerType } from "../../store/reducers";
import { DriversState } from "../../store/reducers/driversReducer";
import { RaceState } from "../../store/reducers/raceReducer";
import { Session } from "../../store/reducers/sessionsReducer";
import { calculateScores, getPointsMap } from "../../utils";

const Scoreboard = () => {
  const navigation = useNavigation();
  const state = navigation?.dangerouslyGetState();
  const session = state.routes[state.index].params as Session;

  const [doneLoading, setDoneLoading] = useState<boolean>(false);
  const [sessionResults, setSessionResults] = useState<
    Array<{ [x: number]: number }>
  >([]);
  const raceReducer = useSelector<RootReducerType, RaceState>(
    (state) => state.raceReducer
  );
  const driversReducer = useSelector<RootReducerType, DriversState>(
    (state) => state.driversReducer
  );

  useEffect(() => {
    const { finalOrder } = calculateScores(session);

    setSessionResults(finalOrder);

    // Finish loading animation
    setDoneLoading(true);
  }, []);

  return (
    <BaseView>
      {!doneLoading && (
        <View>
          <ProgressBar indeterminate={true} />
        </View>
      )}
      {doneLoading && (
        <BaseScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>#</DataTable.Title>
              <DataTable.Title>Driver</DataTable.Title>
              <DataTable.Title numeric>Points</DataTable.Title>
            </DataTable.Header>

            {sessionResults.map((res, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{index + 1}</DataTable.Cell>
                <DataTable.Cell>
                  {driversReducer.drivers[res.id].name}
                </DataTable.Cell>
                <DataTable.Cell numeric>{res.points}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </BaseScrollView>
      )}
    </BaseView>
  );
};

export default Scoreboard;
