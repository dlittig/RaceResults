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
import ThemeProvider from "../../../provider/ThemeProvider/ThemeProvider";
import { THEMES } from "../../../store/constants/settingsConstants";
import { useTranslation } from "react-i18next";

const ViewDriver = () => {
  const { t } = useTranslation();
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

  return (
    <BaseView>
      <ThemeProvider.Consumer>
        {(theme) => (
          <>
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
                  <Subheading>{t("text.driver.history")}</Subheading>
                  <VictoryChart>
                    <VictoryLine
                      style={
                        theme === THEMES.DARK
                          ? {
                              data: { stroke: "#fff" },
                            }
                          : {}
                      }
                      theme={VictoryTheme.grayscale}
                      data={positions}
                      animate={{
                        duration: 500,
                        onLoad: { duration: 500 },
                      }}
                      interpolation="natural"
                      domain={{
                        x: [0.5, raceReducer.races.length + 0.5],
                        y: [
                          0.5,
                          Object.keys(driversReducer.drivers).length + 0.5,
                        ],
                      }}
                    />
                    <VictoryAxis
                      tickFormat={() => ""}
                      style={
                        theme === THEMES.DARK
                          ? { axis: { stroke: "#fff" } }
                          : {}
                      }
                    />
                    <VictoryAxis
                      style={
                        theme === THEMES.DARK
                          ? {
                              tickLabels: {
                                fill: "#fff",
                              },
                              axis: { stroke: "#fff" },
                            }
                          : {}
                      }
                      dependentAxis={true}
                      invertAxis={true}
                      tickValues={Object.keys(driversReducer.drivers).map(
                        (key, index) => index + 1
                      )}
                    />
                  </VictoryChart>
                </View>
              )}
            </BaseScrollView>
          </>
        )}
      </ThemeProvider.Consumer>
    </BaseView>
  );
};

export default ViewDriver;
