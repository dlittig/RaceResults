import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button, Text, FAB } from "react-native-paper";
import styles from "./ViewSession.style";
import {
  APP_EDIT_RACE,
  APP_RANDOM_MAP,
  APP_VIEW_RACE,
} from "../../../navigator/RouteConstants";
import { Race as RaceType } from "../../../store/reducers/raceReducer";
import BaseView from "../../../components/BaseView/BaseView";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";
import NavSeparator from "../../../components/NavSeparator/NavSeparator";
import Race from "../../../components/Cards/Race";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import ThemeProvider from "../../../provider/ThemeProvider/ThemeProvider";
import { THEMES } from "../../../store/constants/settingsConstants";
import { HOOK, UseStateResult, useStore } from "../../../hooks/store";

type RouteParams = {
  session: number;
};

const ViewSession: FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const state = navigation.getState();
  const { session: sessionId } = state.routes[state.index]
    .params as RouteParams;
  const { sessionRaces: races, session } = useStore<UseStateResult>(
    [HOOK.SESSION_SPECIFIC, HOOK.RACES_OF_SESSION],
    { sessionId }
  );

  return (
    <BaseView>
      <Text style={styles.sessionLabel}>
        <ThemeProvider.Consumer>
          {(theme) => (
            <MaterialCommunityIcons
              name="tag"
              color={theme === THEMES.LIGHT ? "#333" : "#fff"}
              size={16}
            />
          )}
        </ThemeProvider.Consumer>
        {session && ` ${session.label}`}
      </Text>
      <NavSeparator />
      <BaseScrollView spacer>
        {races.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.text}>{t("empty.session_view")}</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate(t(APP_RANDOM_MAP) as never)}
            >
              <MaterialCommunityIcons name="sync" size={16} />
              {` ${t("actions.generate")}`}
            </Button>
          </View>
        )}
        {races.map((race: RaceType, index: number) => (
          <Race
            key={race.id}
            position={index + 1}
            race={race}
            onPress={() =>
              navigation.navigate(
                t(APP_VIEW_RACE) as never,
                {
                  race: race.id,
                  session: session!.id,
                } as never
              )
            }
          />
        ))}
      </BaseScrollView>
      <FAB
        style={styles.fab}
        label={t("actions.addRace") || ""}
        icon="plus"
        onPress={() =>
          navigation.navigate(
            t(APP_EDIT_RACE) as never,
            { session: session!.id } as never
          )
        }
      />
    </BaseView>
  );
};

export default ViewSession;
