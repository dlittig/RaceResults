import React, { useReducer, useState } from "react";
import { ToastAndroid, View } from "react-native";
import {
  Button,
  Dialog,
  FAB,
  Portal,
  Text,
  Checkbox,
  TextInput,
  Chip,
  Badge,
  Subheading,
  RadioButton,
  IconButton,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { Session } from "../../../store/reducers/sessionsReducer";
import { useTranslation } from "react-i18next";
import {
  addSession,
  updateSession,
} from "../../../store/actions/sessionsActions";
import { useNavigation } from "@react-navigation/native";
import BaseView from "../../../components/BaseView/BaseView";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";

import style from "./EditSession.style";
import { useConfirmation } from "../../../hooks/confirmation";
import { HOOK, useStore, UseStateResult } from "../../../hooks/store";

const TOGGLE_DRIVER = "[edit sessions] toggle driver";
const SELECT_ALL_DRIVERS = "[edit sessions] select all drivers";

const reducer = (state: number[], action: any) => {
  switch (action.type) {
    case TOGGLE_DRIVER:
      if (!state.includes(action.driver.id)) {
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

const EditSession = () => {
  const { setDisableConfirmation } = useConfirmation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const state = navigation.dangerouslyGetState();
  const { session: sessionId } = state.routes[state.index].params || {
    session: undefined,
  };

  const { session, driversReducer, sessionRaces } = useStore<UseStateResult>(
    [HOOK.SESSION_SPECIFIC, HOOK.RACES_OF_SESSION, HOOK.DRIVERS],
    { sessionId }
  );

  const take = (key: string, fallback: any) =>
    typeof session !== "undefined" &&
    session !== null &&
    typeof session[key] !== "undefined"
      ? session[key]
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

    if (typeof sessionId !== "undefined") {
      dispatch(updateSession(session));
    } else {
      dispatch(addSession(session));
    }

    setDisableConfirmation(true);
    navigation.goBack();
  };

  const openDriverDialogIfAvailable = () => {
    if (typeof sessionId !== "undefined") {
      if (sessionRaces && sessionRaces.length > 0)
        ToastAndroid.showWithGravityAndOffset(
          t("toasts.change_driver_failed"),
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          100
        );
      else setVisible(true);
    } else setVisible(true);
  };

  return (
    <BaseView>
      <BaseScrollView>
        <TextInput
          label={t("form.name")}
          value={label}
          onChangeText={(text) => setLabel(text)}
        />

        <View>
          <View style={style.selectDriver}>
            <Subheading style={style.driverSubheading}>
              {t("screens.drivers.list")}
            </Subheading>
            <IconButton
              icon="cog"
              size={16}
              onPress={() => openDriverDialogIfAvailable()}
            />
          </View>

          <View style={style.participants}>
            {participants.map((participant: number, index: number) => (
              <Chip
                mode="outlined"
                avatar={
                  <Badge
                    size={10}
                    style={{
                      backgroundColor: driversReducer!!.drivers[participant]
                        .color,
                    }}
                  ></Badge>
                }
                key={`${participant}-${index}`}
              >
                {driversReducer!!.drivers[participant].name}
              </Chip>
            ))}
          </View>
        </View>

        <View>
          <Subheading style={style.pointSchemeSubheading}>
            {t("text.session.pointScheme")}
          </Subheading>
          <RadioButton.Group
            onValueChange={(newValue: string) => setPointScheme(newValue)}
            value={pointScheme}
          >
            <View style={style.radioButtonField}>
              <RadioButton value="linear" />
              <Text onPress={() => setPointScheme("linear")}>
                {t("form.linear")}
              </Text>
            </View>
            <View style={style.radioButtonField}>
              <RadioButton value="gapped" />
              <Text onPress={() => setPointScheme("gapped")}>
                {t("form.gapped")}
              </Text>
            </View>
          </RadioButton.Group>
          {/* </View> */}
        </View>

        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>{t("dialogs.select_drivers")}</Dialog.Title>
            <Dialog.Content>
              <Dialog.ScrollArea>
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
              </Dialog.ScrollArea>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() =>
                  dispatchParticipants({
                    type: SELECT_ALL_DRIVERS,
                    payload: Object.values(driversReducer!!.drivers),
                  })
                }
              >
                {t("actions.toggle_all")}
              </Button>
              <Button onPress={() => setVisible(false)}>
                {t("actions.close")}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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

export default EditSession;
