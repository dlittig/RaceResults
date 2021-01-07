import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import DraggableFlatList from "react-native-draggable-flatlist";
import {
  FAB,
  List,
  Text,
  TextInput,
  Checkbox,
  Banner,
} from "react-native-paper";

import { RootReducerType } from "../../../store/reducers";
import BaseView from "../../../components/BaseView/BaseView";
import { DriversState } from "../../../store/reducers/driversReducer";
import { Race, RaceState } from "../../../store/reducers/raceReducer";
import { RACE_CURCUIT } from "../../../store/constants/racesConstants";
import { addRace, updateRace } from "../../../store/actions/raceActions";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";

import style from "./EditRace.style";
import { setSeenTipFastest } from "../../../store/actions/settingsActions";
import { SettingsState } from "../../../store/reducers/settingsReducer";
import { useTranslation } from "react-i18next";
import ThemeProvider from "../../../provider/ThemeProvider/ThemeProvider";
import { THEMES } from "../../../store/constants/settingsConstants";
import {
  sessionsReducer,
  SessionsState,
} from "../../../store/reducers/sessionsReducer";
import { useConfirmation } from "../../../hooks/confirmation";

type EditRaceRouteParams = {
  session: number;
  race?: number;
};

const EditRace = () => {
  useConfirmation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const driversReducer = useSelector<RootReducerType, DriversState>(
    (state) => state.driversReducer
  );
  const raceReducer = useSelector<RootReducerType, RaceState>(
    (state) => state.raceReducer
  );
  const sessionsReducer = useSelector<RootReducerType, SessionsState>(
    (state) => state.sessionsReducer
  );
  const settingsReducer = useSelector<RootReducerType, SettingsState>(
    (state) => state.settingsReducer
  );

  const state = navigation?.dangerouslyGetState();
  const routeParams = state.routes[state.index].params as EditRaceRouteParams;

  const race = raceReducer.races.filter(
    (item) => item.id === routeParams.race
  )[0];

  const session = sessionsReducer.sessions.filter(
    (item) => item.id === routeParams.session
  )[0];

  const take = (key: string, fallback: any) =>
    typeof race !== "undefined" && typeof race[key] !== "undefined"
      ? race[key]
      : fallback;

  const initCars = () => {
    const cars = take("cars", {});

    // If we are creating a new race, get the "winning" cars from the previous race of that session
    if (Object.keys(cars).length === 0) {
      const sessionRaces = raceReducer.races.filter(
        (race) => race.session === routeParams.session
      );

      // If there are no previous sessions, initialize with default
      if (sessionRaces.length === 0) {
        Object.keys(driversReducer.drivers).forEach((driverId) => {
          cars[driverId] = "";
        });
      } else {
        // If sessions are available, read cars from previous races
        const lastRace = sessionRaces[sessionRaces.length - 1];
        lastRace.order.forEach((driverId, index, array) => {
          console.log(driverId, index, array.length - 1);
          if (index === array.length - 1) {
            cars[driverId] = "";
          } else cars[driverId] = lastRace.cars[driverId];
        });
      }
    }

    return cars;
  };

  const [fastestDrivers, setFastestDrivers] = useState<number[]>(
    take("fastest", [])
  );
  const [location, setLocation] = useState<string>(
    take("location", RACE_CURCUIT[0])
  );
  const [drivers, setDrivers] = useState<number[]>(
    take("order", session.participants)
  );
  const [cars, setCars] = useState<{ [x: string]: any }>(initCars());
  const [bannerVisible, setBannerVisible] = useState<boolean>(true);
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  const onSave = () => {
    const race: Race = {
      id: take("id", Date.now()),
      time: take("time", Date.now()),
      session: take("session", routeParams.session),
      location,
      cars,
      order: drivers,
      fastest: fastestDrivers,
    };

    if (typeof routeParams.race !== "undefined") {
      dispatch(updateRace(race));
    } else {
      dispatch(addRace(race));
    }

    navigation.goBack();
  };

  const renderItem = ({ item: id, index, drag, isActive }) => (
    <ThemeProvider.Consumer>
      {(theme) => (
        <TouchableOpacity
          key={id}
          style={{
            backgroundColor: isActive
              ? theme === THEMES.LIGHT
                ? "#F0F0F0"
                : "#666666"
              : id?.backgroundColor,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
          onLongPress={drag}
          delayLongPress={200}
        >
          <View style={{ width: 40, justifyContent: "center" }}>
            <MaterialIcons
              name="drag-handle"
              size={24}
              color={theme === THEMES.LIGHT ? "#333" : "#fff"}
            ></MaterialIcons>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: theme === THEMES.LIGHT ? "#333" : "#fff",
              }}
            >
              {`${index + 1}: ${driversReducer.drivers[id].name}`}
            </Text>
            <TextInput
              mode="flat"
              label={`${t("form.car")} ${driversReducer.drivers[id].name}`}
              dense={true}
              value={cars[id]}
              onChangeText={(text) =>
                setCars({
                  ...cars,
                  [id]: text,
                })
              }
            />
          </View>
          <View>
            <Checkbox
              status={fastestDrivers.includes(id) ? "checked" : "unchecked"}
              onPress={() => {
                if (fastestDrivers.includes(id)) {
                  setFastestDrivers(
                    fastestDrivers.filter((item) => item !== id)
                  );
                } else {
                  setFastestDrivers([...fastestDrivers, id]);
                }
              }}
            />
          </View>
        </TouchableOpacity>
      )}
    </ThemeProvider.Consumer>
  );

  return (
    <BaseView>
      <BaseScrollView>
        {settingsReducer.tipFastestSeen === false && (
          <Banner
            style={{
              elevation: 4,
              margin: 8,
              marginBottom: 20,
              borderRadius: 8,
            }}
            visible={bannerVisible}
            actions={[
              {
                label: t("actions.got_it"),
                onPress: () => {
                  setBannerVisible(false), dispatch(setSeenTipFastest());
                },
              },
            ]}
          >
            {t("banner.fastest_lap")}
          </Banner>
        )}

        <DraggableFlatList
          data={drivers}
          renderItem={renderItem}
          keyExtractor={(item: number, index: number) =>
            `draggable-item-${item}-${index}`
          }
          onDragEnd={({ data }) => setDrivers(data)}
        />

        <List.Accordion
          title={t("form.race_track")}
          description={location}
          expanded={accordionOpen}
          onPress={() => setAccordionOpen(!accordionOpen)}
        >
          {RACE_CURCUIT.map((track, index) => (
            <List.Item
              key={index}
              title={track}
              right={(props) =>
                location === track ? (
                  <List.Icon {...props} icon="check" />
                ) : null
              }
              onPress={() => {
                setLocation(track), setAccordionOpen(false);
              }}
            />
          ))}
        </List.Accordion>
      </BaseScrollView>
      <FAB
        style={style.fab}
        label={t("actions.save")}
        icon="check"
        onPress={() => onSave()}
      />
    </BaseView>
  );
};

export default EditRace;
