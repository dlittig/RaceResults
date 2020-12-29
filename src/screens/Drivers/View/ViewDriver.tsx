import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Badge,
  ProgressBar,
  Subheading,
  Text,
} from "react-native-paper";
import { useSelector } from "react-redux";
import DriverCard from "../../../components/Cards/Driver";
import { LineChart } from "react-native-chart-kit";
import BaseScrollView from "../../../components/BaseScrollView";
import BaseView from "../../../components/BaseView";
import { RootReducerType } from "../../../store/reducers";
import { Race, RaceState } from "../../../store/reducers/raceReducer";
import { Dimensions, View } from "react-native";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
import { DriversState } from "../../../store/reducers/driversReducer";

const ViewDriver = () => {
  const navigation = useNavigation();
  const state = navigation.dangerouslyGetState();
  const { driver } = state.routes[state.index].params;
  const driversReducer = useSelector<RootReducerType, DriversState>(
    (state) => state.driversReducer
  );

  const raceReducer = useSelector<RootReducerType, RaceState>(
    (state) => state.raceReducer
  );

  const [showChart, setShowChart] = useState(false);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const pos = [];

    let index = 0;
    // Collect history of all races of that user
    for (let i = 0; i < raceReducer.races.length; i++) {
      const race: Race = raceReducer.races[i];
      if (race.order.includes(`${driver}`)) {
        const item = {
          x: ++index,
          y: race.order.findIndex((item) => item === `${driver}`) + 1,
        };

        pos.push(item);
      }
    }

    setPositions(pos);

    setShowChart(true);
  }, []);

  console.log("POS", positions);

  return (
    <BaseView>
      {!showChart && (
        <View>
          <ProgressBar indeterminate={true} />
        </View>
      )}
      <BaseScrollView>
        <DriverCard
          driver={driversReducer.drivers[driver]}
          allowDelete={false}
          onPress={() => {}}
        />

        {showChart && positions.length > 1 && (
          <View>
            <Subheading>History</Subheading>
            <VictoryChart>
              <VictoryLine
                theme={VictoryTheme.material}
                data={positions}
                animate={{
                  duration: 500,
                  onLoad: { duration: 500 },
                }}
                interpolation="natural"
                domain={{
                  x: [1, raceReducer.races.length],
                  y: [1, Object.keys(driversReducer.drivers).length],
                }}
              />
              <VictoryAxis tickFormat={() => ""} />
              <VictoryAxis
                dependentAxis={true}
                invertAxis={true}
                tickValues={Object.keys(driversReducer.drivers).map(
                  (key, index) => index + 1
                )}
              />
            </VictoryChart>
            {/* <LineChart
              labels={positions.map((item) => "")}
              data={{
                datasets: [
                  {
                    data: positions,
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              segments={positions.length}
              fromZero={true}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#FFF",
                backgroundGradientFrom: "#FFF",
                backgroundGradientTo: "#FFF",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            /> */}
          </View>
        )}
      </BaseScrollView>
    </BaseView>
  );
};

export default ViewDriver;
