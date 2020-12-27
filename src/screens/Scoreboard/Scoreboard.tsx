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

const Scoreboard = () => {
  const navigation = useNavigation();
  const state = navigation?.dangerouslyGetState();
  const session = state.routes[state.index].params as Session;
  const take = (key: string, fallback: any) =>
    typeof session !== "undefined" && typeof session[key] !== undefined
      ? session[key]
      : fallback;

  const [doneLoading, setDoneLoading] = useState<boolean>(false);
  const [sessionResults, setSessionResults] = useState<{ [x: number]: number }>(
    {}
  );
  const raceReducer = useSelector<RootReducerType, RaceState>(
    (state) => state.raceReducer
  );
  const driversReducer = useSelector<RootReducerType, DriversState>(
    (state) => state.driversReducer
  );

  useEffect(() => {
    // Get all races of this session
    const races = raceReducer.races.filter(
      (race) => race.session === session.id
    );

    // Create datastructure that contains the id and the earned points
    //const drivers = {};
    //session.participants.forEach((driver: number) => (drivers[driver] = 0));

    // Create a "position to points" map based on the selected scheme in the session
    let pointsMap = {};

    if (session.pointScheme === "gapped") {
      for (let i = 0; i < session.participants.length; i++) {
        if (i === 0) {
          // If first element, give bonus point
          pointsMap[i + 1] = session.participants.length + 1 - i;
          continue;
        }

        pointsMap[i + 1] = session.participants.length - i;
      }
    }

    if (session.pointScheme === "linear") {
      for (let i = 0; i < session.participants.length; i++) {
        pointsMap[i + 1] = session.participants.length - i;
      }
    }

    // Iterate through all the races and accumulate all the values
    const results = {};

    console.log("RACESS", races);
    races.forEach((race) => {
      race.order.forEach((driverId, position) => {
        // If result hashmap does not contain driver
        if (typeof results[driverId] === "undefined") {
          results[driverId] = pointsMap[position + 1];
        } else {
          results[driverId] += pointsMap[position + 1];
        }
      });
    });

    console.log(results, pointsMap);

    // Transform result into sorted order
    // ...
    setSessionResults(results);

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
              <DataTable.Title>Driver</DataTable.Title>
              <DataTable.Title numeric>Points</DataTable.Title>
            </DataTable.Header>

            {Object.keys(sessionResults).map((driverId, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>
                  {driversReducer.drivers[driverId].name}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {sessionResults[driverId]}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </BaseScrollView>
      )}
    </BaseView>
  );
};

export default Scoreboard;
