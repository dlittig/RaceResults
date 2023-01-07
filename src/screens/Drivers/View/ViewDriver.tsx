import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { DataTable, ProgressBar, Subheading } from "react-native-paper";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
  VictoryScatter,
} from "victory-native";

import BaseView from "../../../components/BaseView";
import { HOOK, useStore } from "../../../hooks/store";
import DriverCard from "../../../components/Cards/Driver";
import { Race } from "../../../store/reducers/raceReducer";
import BaseScrollView from "../../../components/BaseScrollView";
import { THEMES } from "../../../store/constants/settingsConstants";
import ThemeProvider from "../../../provider/ThemeProvider/ThemeProvider";
import BaseCard from "../../../components/Cards/BaseCard";

import style from "./ViewDriver.style";

type StatsType = {
  positionsOverRaces: { [x: number]: number };
  racesOfDriver: Race[];
  fastestRaces: Race[];
};

type RouteParams = {
  driver: number;
};

const ViewDriver: FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const state = navigation.getState();

  const { driver: driverId } = state.routes[state.index].params as RouteParams;
  const { driversReducer, racesReducer, driver } = useStore(
    [HOOK.DRIVERS, HOOK.RACES, HOOK.DRIVER_SPECIFIC],
    { driverId }
  );

  const [showChart, setShowChart] = useState(false);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [stats, setStats] = useState<StatsType>({
    positionsOverRaces: {},
    racesOfDriver: [],
    fastestRaces: [],
  });

  const percent = (val: number, max: number): number =>
    Math.round(((val / max) * 100 + Number.EPSILON) * 100) / 100;

  useEffect(() => {
    const pos = [];

    let index = 0;
    // Collect history of all races of that user
    for (let i = 0; i < racesReducer.races.length; i++) {
      const race: Race = racesReducer.races[i];
      /* eslint-disable */
      if (race.order.includes(`${driverId}`) || race.order.includes(driverId)) {
        // String conversion or legacy reasons
        const item = {
          x: ++index,
          y:
            race.order.findIndex(
              /* eslint-disable */
              (item) => item === `${driverId}` || item === driverId
            ) + 1,
        };

        pos.push(item);
      }
    }

    setPositions(pos);

    const racesOfDriver = racesReducer.races.filter(
      (race: Race) =>
        /* eslint-disable */
        race.order.includes(driverId) || race.order.includes(`${driverId}`)
    );

    const fastestRaces = racesOfDriver.filter(
      (race: Race) =>
        race.fastest?.includes(driverId) ||
        /* eslint-disable */
        race.fastest?.includes(`${driverId}`)
    );

    const positionsOverRaces: Record<number, number> = {};
    Object.values(driversReducer.drivers).map(
      (_, index) => (positionsOverRaces[index + 1] = 0)
    );
    racesOfDriver.forEach((race: Race) => {
      const pos = race.order.findIndex(
        /* eslint-disable */
        (driver) => driver === driverId || driver === `${driverId}`
      );
      positionsOverRaces[pos + 1] += 1;
    });

    setStats({
      racesOfDriver,
      fastestRaces,
      positionsOverRaces,
    });

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
                    <VictoryScatter
                      style={
                        theme === THEMES.DARK
                          ? {
                              data: { fill: "#fff" },
                            }
                          : {}
                      }
                      size={4}
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
                      tickValues={Object.keys(driversReducer.drivers).map(
                        (key, index) => index + 1
                      )}
                    />
                  </VictoryChart>
                </View>
              )}
              {stats.racesOfDriver.length > 1 && showChart && (
                <BaseCard touchable={false}>
                  <View style={style.statsContainer}>
                    <Subheading style={style.bold}>
                      {t("text.driver.stats")}
                    </Subheading>
                    <DataTable>
                      <DataTable.Header>
                        <DataTable.Title>
                          {t("text.driver.races")}
                        </DataTable.Title>
                        <DataTable.Title numeric>#</DataTable.Title>
                        <DataTable.Title numeric>%</DataTable.Title>
                      </DataTable.Header>
                      <DataTable.Row>
                        <DataTable.Cell>{t("text.driver.all")}</DataTable.Cell>
                        <DataTable.Cell numeric>
                          {stats.racesOfDriver.length}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>-</DataTable.Cell>
                      </DataTable.Row>
                      <DataTable.Row>
                        <DataTable.Cell>
                          {t("text.driver.fastest")}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          {stats.fastestRaces.length}
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                          {percent(
                            stats.fastestRaces.length,
                            stats.racesOfDriver.length
                          )}
                        </DataTable.Cell>
                      </DataTable.Row>
                    </DataTable>
                    <Subheading style={[style.bold, style.marginTop]}>
                      {t("text.driver.positions")}
                    </Subheading>
                    <DataTable>
                      <DataTable.Header>
                        <DataTable.Title>
                          {t("text.driver.place")}
                        </DataTable.Title>
                        <DataTable.Title numeric>#</DataTable.Title>
                        <DataTable.Title numeric>%</DataTable.Title>
                      </DataTable.Header>
                      {Object.keys(stats.positionsOverRaces)
                        .filter(
                          (position) => stats.positionsOverRaces[position] !== 0
                        )
                        .map((position) => (
                          <DataTable.Row key={position}>
                            <DataTable.Cell>{position}</DataTable.Cell>
                            <DataTable.Cell numeric>
                              {stats.positionsOverRaces[position]}
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                              {percent(
                                stats.positionsOverRaces[position],
                                stats.racesOfDriver.length
                              )}
                            </DataTable.Cell>
                          </DataTable.Row>
                        ))}
                    </DataTable>
                  </View>
                </BaseCard>
              )}
            </BaseScrollView>
          </>
        )}
      </ThemeProvider.Consumer>
    </BaseView>
  );
};

export default ViewDriver;
