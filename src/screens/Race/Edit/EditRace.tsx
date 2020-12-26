import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RootReducerType } from "../../../store/reducers";
import { Race } from "../../../store/reducers/raceReducer";
import BaseView from "../../../components/BaseView/BaseView";
import DraggableFlatList from "react-native-draggable-flatlist";
import { FAB, List, Text, TextInput } from "react-native-paper";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Session } from "../../../store/reducers/sessionsReducer";
import { RACE_CURCUIT } from "../../../store/constants/racesConstants";
import { addRace, updateRace } from "../../../store/actions/raceActions";
import { Driver, DriversState } from "../../../store/reducers/driversReducer";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";

import style from "./EditRace.style";

type EditRaceRouteParams = {
  session: Session;
  race?: Race;
};

const EditRace = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const driversReducer = useSelector<RootReducerType, DriversState>(
    (state) => state.driversReducer
  );

  const state = navigation?.dangerouslyGetState();

  const routeParams = state.routes[state.index].params as EditRaceRouteParams;

  console.log("RP", routeParams);

  const take = (key: string, fallback: any) =>
    typeof routeParams?.race !== "undefined" &&
    typeof routeParams?.race[key] !== undefined
      ? routeParams?.race[key]
      : fallback;

  const initCars = () => {
    const cars = take("cars", {});
    driversReducer.drivers.forEach((driver) => {
      cars[driver.id] = "";
    });

    return cars;
  };

  const [location, setLocation] = useState<string>(
    take("location", RACE_CURCUIT[0])
  );
  const [drivers, setDrivers] = useState<Driver[]>(
    take("order", driversReducer.drivers)
  );
  const [cars, setCars] = useState<{ [x: string]: any }>(initCars());

  const onSave = () => {
    const race: Race = {
      id: take("id", Date.now()),
      time: take("time", Date.now()),
      session: routeParams.session.id,
      location,
      cars,
      order: drivers,
    };

    if (typeof routeParams.race !== "undefined") {
      dispatch(updateRace(race));
    } else {
      dispatch(addRace(race));
    }

    navigation.goBack();
  };

  const renderItem = ({ item, index, drag, isActive }) => (
    <TouchableOpacity
      key={item.id}
      style={{
        backgroundColor: isActive ? "blue" : item?.backgroundColor,
        flexDirection: "row",
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
          {`${index + 1}: ${item.name}`}
        </Text>
        <TextInput
          mode="flat"
          label={`Car of ${item.name}`}
          dense={true}
          value={cars[item.id]}
          onChangeText={(text) =>
            setCars({
              ...cars,
              [item.id]: text,
            })
          }
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <BaseView>
      <BaseScrollView>
        <DraggableFlatList
          data={drivers}
          renderItem={renderItem}
          keyExtractor={(item: Driver, index: number) =>
            `draggable-item-${item.id}-${index}`
          }
          onDragEnd={({ data }) => setDrivers(data)}
        />

        <List.Accordion title="Race track" description={location}>
          {RACE_CURCUIT.map((track, index) => (
            <List.Item
              key={index}
              title={track}
              right={(props) =>
                location === track ? (
                  <List.Icon {...props} icon="check" />
                ) : null
              }
              onPress={() => setLocation(track)}
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
