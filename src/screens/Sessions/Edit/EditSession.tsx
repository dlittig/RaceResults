import React, { useReducer, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  Dialog,
  FAB,
  Portal,
  Text,
  Checkbox,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  Session,
  SessionsState,
} from "../../../store/reducers/sessionsReducer";
import {
  addSession,
  updateSession,
} from "../../../store/actions/sessionsActions";
import { useNavigation } from "@react-navigation/native";
import { Driver, DriversState } from "../../../store/reducers/driversReducer";
import { RootReducerType } from "../../../store/reducers";
import BaseView from "../../../components/BaseView/BaseView";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";

import style from "./EditSession.style";

const TOGGLE_DRIVER = "[edit sessions] toggle driver";
const SELECT_ALL_DRIVERS = "[edit sessions] select all drivers";

const reducer = (state: Driver[], action: any) => {
  switch (action.type) {
    case TOGGLE_DRIVER:
      if (!state.includes(action.driver)) {
        // add
        return [...state, action.driver.id];
      } else {
        // remove
        return [...state.filter((item) => item !== action.driver.id)];
      }
    case SELECT_ALL_DRIVERS:
      const drivers = action.payload;

      if (state.length === drivers.length) {
        return [];
      } else return drivers.map((driver) => driver.id);
    default:
      throw new Error();
  }
};

const EditDriver = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const driversReducer = useSelector<RootReducerType, DriversState>(
    (state) => state.driversReducer
  );

  const state = navigation.dangerouslyGetState();
  const routeParams = state.routes[state.index].params as Session;

  const take = (key: string, fallback: any) =>
    typeof routeParams !== "undefined" && typeof routeParams[key] !== undefined
      ? routeParams[key]
      : fallback;

  const [visible, setVisible] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(take("label", ""));
  const [pointScheme, setPointScheme] = useState<"gapped" | "linear">(
    take("pointScheme", "linear")
  );
  const [participants, dispatchParticipants] = useReducer(
    reducer,
    take("participants", [])
  );

  const onSave = () => {
    const session: Session = {
      id: take("id", Date.now()),
      startTime: take("startTime", Date.now()),
      participants,
      label,
      pointScheme,
    };

    if (typeof routeParams !== "undefined") {
      dispatch(updateSession(session));
    } else {
      dispatch(addSession(session));
    }

    navigation.goBack();
  };

  return (
    <BaseView>
      <BaseScrollView>
        <TextInput
          label="Label"
          value={label}
          onChangeText={(text) => setLabel(text)}
        />

        <Button onPress={() => setVisible(true)}>Select drivers</Button>

        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Button
              onPress={() =>
                dispatchParticipants({
                  type: SELECT_ALL_DRIVERS,
                  payload: Object.values(driversReducer.drivers),
                })
              }
            >
              Toggle all
            </Button>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                {Object.values(driversReducer.drivers).map((driver, index) => (
                  <Checkbox.Item
                    key={index}
                    label={driver.name}
                    status={
                      participants.filter(
                        (participant: number) => participant === driver.id
                      ).length === 1
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() =>
                      dispatchParticipants({ type: TOGGLE_DRIVER, driver })
                    }
                  />
                ))}
              </ScrollView>
              <Button onPress={() => setVisible(false)}>Close</Button>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
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

export default EditDriver;
