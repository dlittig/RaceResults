import React, { FC, useReducer, useState } from "react";
import { ToastAndroid, View } from "react-native";
import {
  Button,
  Dialog,
  FAB,
  Portal,
  Checkbox,
  TextInput,
  Chip,
  Badge,
  Subheading,
  IconButton,
  Caption,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { Session, TYPE_PRESET } from "../../../store/reducers/sessionsReducer";
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
import ToggleButtonContainer from "../../../components/ToggleButton/Container";
import ToggleButton from "../../../components/ToggleButton";
import { Driver } from "../../../store/reducers/driversReducer";

const TOGGLE_DRIVER = "[edit sessions] toggle driver";
const SELECT_ALL_DRIVERS = "[edit sessions] select all drivers";

type ToggleDriverAction = {
  type: typeof TOGGLE_DRIVER;
  driver: Driver;
};

type ToggleAllDriversAction = {
  type: typeof SELECT_ALL_DRIVERS;
  payload: Driver[];
};

type ActionType = ToggleDriverAction | ToggleAllDriversAction;

const reducer = (state: number[], action: ActionType) => {
  let drivers;
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
      drivers = action.payload;

      if (state.length === drivers.length) {
        return [];
      } else return drivers.map((driver: Driver) => driver.id);
    default:
      throw new Error();
  }
};

type RouteParams = {
  session: number;
};

const EditSession: FC = () => {
  const { setDisableConfirmation } = useConfirmation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const state = navigation.getState();
  const { session: sessionId } = (state.routes[state.index]
    .params as RouteParams) || {
    session: undefined,
  };

  const { session, driversReducer, sessionRaces } = useStore<UseStateResult>(
    [HOOK.SESSION_SPECIFIC, HOOK.RACES_OF_SESSION, HOOK.DRIVERS],
    { sessionId }
  );

  const take = <T extends unknown>(key: string, fallback: T): T =>
    typeof session !== "undefined" &&
    session !== null &&
    typeof session[key] !== "undefined"
      ? (session[key] as T)
      : fallback;

  const [visible, setVisible] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(take<string>("label", ""));
  const [pointScheme, setPointScheme] = useState<"gapped" | "linear">(
    take("pointScheme", "linear")
  );
  const [participants, dispatchParticipants] = useReducer(
    reducer,
    take("participants", [])
  );

  const [type, setType] = useState<TYPE_PRESET>(
    take("type", TYPE_PRESET.SHIFT)
  );

  const onSave = () => {
    const session: Session = {
      id: take("id", Date.now()),
      startTime: take("startTime", Date.now()),
      participants,
      label,
      pointScheme,
      type,
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
      <BaseScrollView spacer>
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
                    visible
                    size={10}
                    style={{
                      backgroundColor:
                        driversReducer.drivers[participant].color,
                    }}
                  ></Badge>
                }
                key={`${participant}-${index}`}
              >
                {driversReducer.drivers[participant].name}
              </Chip>
            ))}
          </View>
        </View>

        <View>
          <Subheading style={style.pointSchemeSubheading}>
            {t("text.session.carPolicy.title")}
          </Subheading>
          <ToggleButtonContainer
            value={type}
            onChange={(value) => setType(value as TYPE_PRESET)}
          >
            <ToggleButton
              label={t("text.session.carPolicy.shift")}
              value={TYPE_PRESET.SHIFT}
            />
            <ToggleButton
              label={t("text.session.carPolicy.static")}
              value={TYPE_PRESET.STATIC}
            />
          </ToggleButtonContainer>
          <Caption>
            {type === TYPE_PRESET.SHIFT &&
              t("text.session.carPolicy.shiftHint")}
            {type === TYPE_PRESET.STATIC &&
              t("text.session.carPolicy.staticHint")}
          </Caption>

          <Subheading style={style.pointSchemeSubheading}>
            {t("text.session.pointScheme.title")}
          </Subheading>
          <ToggleButtonContainer
            value={pointScheme}
            onChange={(value) => setPointScheme(value as "gapped" | "linear")}
          >
            <ToggleButton
              label={t("text.session.pointScheme.linear")}
              value="linear"
            />
            <ToggleButton
              label={t("text.session.pointScheme.gapped")}
              value="gapped"
            />
          </ToggleButtonContainer>
          <Caption>
            {pointScheme === "linear" &&
              t("text.session.pointScheme.linearHint")}
            {pointScheme === "gapped" &&
              t("text.session.pointScheme.gappedHint")}
          </Caption>
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
                      dispatchParticipants({
                        type: TOGGLE_DRIVER,
                        driver,
                      })
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
                    payload: Object.values(driversReducer.drivers),
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
