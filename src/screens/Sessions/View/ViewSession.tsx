import React from "react";
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
import { HOOK, useStore } from "../../../hooks/store";

const ViewSession = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const state = navigation.dangerouslyGetState();
  const { session: sessionId } = state.routes[state.index].params;
  const { sessionRaces: races, session } = useStore(
    [HOOK.SESSION_SPECIFIC, HOOK.RACES_OF_SESSION],
    {
      sessionId,
    }
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
        {` ${session.label}`}
      </Text>
      <NavSeparator />
      <BaseScrollView>
        {races.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.text}>{t("empty.session_view")}</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate(t(APP_RANDOM_MAP))}
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
              navigation.navigate(t(APP_VIEW_RACE), {
                race: race.id,
                session: session.id,
              })
            }
          />
        ))}
      </BaseScrollView>
      <FAB
        style={styles.fab}
        label={t("actions.addRace")}
        icon="plus"
        onPress={() =>
          navigation.navigate(t(APP_EDIT_RACE), { session: session.id })
        }
      />
    </BaseView>
  );
};

export default ViewSession;
