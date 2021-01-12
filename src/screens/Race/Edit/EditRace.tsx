import React, { FC, ReactNode, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import {
  FAB,
  List,
  Text,
  TextInput,
  Checkbox,
  Banner,
} from "react-native-paper";

import BaseView from "../../../components/BaseView/BaseView";
import { Race } from "../../../store/reducers/raceReducer";
import { RACE_CURCUIT } from "../../../store/constants/racesConstants";
import { addRace, updateRace } from "../../../store/actions/raceActions";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";

import style from "./EditRace.style";
import { setSeenTipFastest } from "../../../store/actions/settingsActions";
import { useTranslation } from "react-i18next";
import ThemeProvider from "../../../provider/ThemeProvider/ThemeProvider";
import { THEMES } from "../../../store/constants/settingsConstants";
import { useConfirmation } from "../../../hooks/confirmation";
import { HOOK, useStore } from "../../../hooks/store";

type EditRaceRouteParams = {
  session: number;
  race?: number;
};

const EditRace = () => {
  const { setDisableConfirmation } = useConfirmation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const state = navigation?.dangerouslyGetState();
  const routeParams = state.routes[state.index].params as EditRaceRouteParams;
  const {
    race,
    session,
    sessionRaces,
    driversReducer,
    settingsReducer,
  } = useStore(
    [
      HOOK.RACE_SPECIFIC,
      HOOK.SESSION_SPECIFIC,
      HOOK.RACES_OF_SESSION,
      HOOK.DRIVERS,
      HOOK.SETTINGS,
    ],
    { raceId: routeParams.race, sessionId: routeParams.session }
  );

  const take = (key: string, fallback: any) =>
    typeof race !== "undefined" &&
    race !== null &&
    typeof race[key] !== "undefined"
      ? race[key]
      : fallback;

  const initCars = () => {
    const cars = take("cars", {});

    // If we are creating a new race, get the "winning" cars from the previous race of that session
    if (Object.keys(cars).length === 0) {
      // If there are no previous sessions, initialize with default
      if (sessionRaces.length === 0) {
        Object.keys(driversReducer.drivers).forEach((driverId) => {
          cars[driverId] = "";
        });
      } else {
        // If sessions are available, read cars from previous races
        const lastRace = sessionRaces[sessionRaces.length - 1];
        lastRace.order.forEach(
          (driverId: number, index: number, array: number[]) => {
            if (index === array.length - 1) {
              cars[driverId] = "";
            } else cars[driverId] = lastRace.cars[driverId];
          }
        );
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
  const [cars, setCars] = useState<{ [x: number]: string }>(initCars());
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

    setDisableConfirmation(true);
    navigation.goBack();
  };

  const renderItem: ReactNode = ({
    item: id,
    index,
    drag,
    isActive,
  }: RenderItemParams<any>) => (
    <ThemeProvider.Consumer>
      {(theme) => (
        <TouchableOpacity
          key={id}
          style={[
            {
              backgroundColor: isActive
                ? style[`${theme}Active`]
                : id?.backgroundColor,
            },
            style.touchableDrag,
          ]}
          onLongPress={drag}
          delayLongPress={200}
        >
          <View style={style.dragContainer}>
            <MaterialIcons
              name="drag-handle"
              size={24}
              color={style[`${theme}Icon`].color}
            ></MaterialIcons>
          </View>
          <View style={style.inputContainer}>
            <Text style={style[`${theme}Icon`].color}>
              {`${index!! + 1}: ${driversReducer.drivers[id].name}`}
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
            style={style.banner}
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
