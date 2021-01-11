import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { ProgressBar, Subheading } from "react-native-paper";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";

import BaseView from "../../../components/BaseView";
import { HOOK, useStore } from "../../../hooks/store";
import DriverCard from "../../../components/Cards/Driver";
import { Race } from "../../../store/reducers/raceReducer";
import BaseScrollView from "../../../components/BaseScrollView";
import { THEMES } from "../../../store/constants/settingsConstants";
import ThemeProvider from "../../../provider/ThemeProvider/ThemeProvider";

const ViewDriver = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const state = navigation.dangerouslyGetState();
  const { driver: driverId } = state.routes[state.index].params || {
    driver: undefined,
  };
  const { driversReducer, racesReducer, driver } = useStore(
    [HOOK.DRIVERS, HOOK.RACES, HOOK.DRIVER_SPECIFIC],
    { driverId }
  );

  const [showChart, setShowChart] = useState(false);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const pos = [];

    let index = 0;
    // Collect history of all races of that user
    for (let i = 0; i < racesReducer.races.length; i++) {
      const race: Race = racesReducer.races[i];
      if (race.order.includes(`${driverId}`)) {
        const item = {
          x: ++index,
          y: race.order.findIndex((item) => item === `${driverId}`) + 1,
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
                driver={driver}
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
                      domain={{
                        x: [0.5, racesReducer.races.length + 0.5],
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
                      label={t("text.driver.positions")}
                      style={
                        theme === THEMES.DARK
                          ? {
                              tickLabels: {
                                fill: "#fff",
                              },
                              axis: { stroke: "#fff" },
                              axisLabel: { fill: "#fff" },
                            }
                          : {}
                      }
                      dependentAxis={true}
                      invertAxis={true}
                      tickValues={positions.map(
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
