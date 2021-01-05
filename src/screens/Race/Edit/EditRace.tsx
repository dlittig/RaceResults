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

type EditRaceRouteParams = {
  session: number;
  race?: number;
};

const EditRace = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const driversReducer = useSelector<RootReducerType, DriversState>(
    (state) => state.driversReducer
  );
  const raceReducer = useSelector<RootReducerType, RaceState>(
    (state) => state.raceReducer
  );
  const settingsReducer = useSelector<RootReducerType, SettingsState>(
    (state) => state.settingsReducer
  );

  const state = navigation?.dangerouslyGetState();
  const routeParams = state.routes[state.index].params as EditRaceRouteParams;

  const race = raceReducer.races.filter(
    (item) => item.id === routeParams.race
  )[0];

  const take = (key: string, fallback: any) =>
    typeof race !== "undefined" && typeof race[key] !== "undefined"
      ? race[key]
      : fallback;

  const initCars = () => {
    const cars = take("cars", {});

    if (Object.keys(cars).length === 0) {
      Object.keys(driversReducer.drivers).forEach((driverId) => {
        cars[driverId] = "";
      });
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
    take("order", Object.keys(driversReducer.drivers))
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
    <TouchableOpacity
      key={id}
      style={{
        backgroundColor: isActive ? "#F0F0F0" : id?.backgroundColor,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
      onLongPress={drag}
      delayLongPress={200}
    >
      <View style={{ width: 40, justifyContent: "center" }}>
        <MaterialIcons name="drag-handle" size={24}></MaterialIcons>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "#333",
          }}
        >
          {`${index + 1}: ${driversReducer.drivers[id].name}`}
        </Text>
        <TextInput
          mode="flat"
          label={`Car of ${driversReducer.drivers[id].name}`}
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
              setFastestDrivers(fastestDrivers.filter((item) => item !== id));
            } else {
              setFastestDrivers([...fastestDrivers, id]);
            }
          }}
        />
      </View>
    </TouchableOpacity>
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
                label: "Got it",
                onPress: () => {
                  setBannerVisible(false), dispatch(setSeenTipFastest());
                },
              },
            ]}
          >
            With the checkbox you can keep track of the fastest round driven.
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
          title="Race track"
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
        label="Save"
        icon="check"
        onPress={() => onSave()}
      />
    </BaseView>
  );
};

export default EditRace;
