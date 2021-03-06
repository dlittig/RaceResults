import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import EditDriver from "../screens/Drivers/Edit";
import {
  APP_EDIT_DRIVER,
  APP_EDIT_RACE,
  APP_EDIT_SESSION,
  APP_HOME,
  APP_RANDOM_MAP,
  APP_SCOREBOARD,
  APP_VIEW_DRIVER,
  APP_VIEW_RACE,
  APP_VIEW_SESSION,
} from "./RouteConstants";
import RandomMap from "../screens/RandomMap";
import ViewSession from "../screens/Sessions/View";
import Scoreboard from "../screens/Scoreboard";
import EditSession from "../screens/Sessions/Edit";
import EditRace from "../screens/Race/Edit";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import ViewRace from "../screens/Race/View";
import { exportSession } from "../utils";
import ViewDriver from "../screens/Drivers/View";
import ThemeProvider from "../provider/ThemeProvider/ThemeProvider";
import getNavigationTheme from "../theme/navigation";
import { useTranslation } from "react-i18next";

import styles from "./Navigator.style";
const Stack = createStackNavigator();

const options = {
  headerShown: false,
  transitionSpec: {
    open: TransitionSpecs.FadeInFromBottomAndroidSpec,
    close: TransitionSpecs.FadeOutToBottomAndroidSpec,
  },
};

const headerStyle = {
  elevation: 0, // remove shadow on Android
  shadowOpacity: 0, // remove shadow on iOS
  borderBottomWidth: 0,
};

const Navigator: FC = () => {
  const { t } = useTranslation();
  return (
    <ThemeProvider.Consumer>
      {(theme) => (
        <NavigationContainer theme={getNavigationTheme(theme)}>
          <Stack.Navigator screenOptions={{ headerStyle }}>
            <Stack.Screen
              name={t(APP_HOME)}
              options={options}
              component={DrawerNavigator}
            />
            <Stack.Screen
              name={t(APP_VIEW_DRIVER)}
              options={({ navigation, route }) => ({
                headerRight: () => (
                  <View style={styles.actions}>
                    <IconButton
                      icon="pencil"
                      accessibilityLabel="Edit"
                      size={24}
                      onPress={() =>
                        navigation.navigate(t(APP_EDIT_DRIVER), {
                          ...route.params,
                        })
                      }
                    />
                  </View>
                ),
              })}
              component={ViewDriver}
            />
            <Stack.Screen name={t(APP_EDIT_DRIVER)} component={EditDriver} />
            <Stack.Screen name={t(APP_EDIT_SESSION)} component={EditSession} />
            <Stack.Screen
              name={t(APP_VIEW_RACE)}
              component={ViewRace}
              options={({ navigation, route }) => ({
                headerRight: () => (
                  <View style={styles.actions}>
                    <IconButton
                      icon="pencil"
                      accessibilityLabel="Edit"
                      size={24}
                      onPress={() =>
                        navigation.navigate(t(APP_EDIT_RACE), {
                          ...route.params,
                        })
                      }
                    />
                  </View>
                ),
              })}
            />
            <Stack.Screen name={t(APP_EDIT_RACE)} component={EditRace} />
            <Stack.Screen name={t(APP_RANDOM_MAP)} component={RandomMap} />
            <Stack.Screen
              name={t(APP_VIEW_SESSION)}
              options={({ navigation, route }) => ({
                headerRight: () => (
                  <View style={styles.actions}>
                    <IconButton
                      icon="scoreboard"
                      accessibilityLabel="Scoreboard"
                      size={24}
                      onPress={() =>
                        navigation.navigate(t(APP_SCOREBOARD), {
                          ...route.params,
                        })
                      }
                    />
                    <IconButton
                      icon="pencil"
                      accessibilityLabel="Edit"
                      size={24}
                      onPress={() => {
                        navigation.navigate(t(APP_EDIT_SESSION), {
                          ...route.params,
                        });
                      }}
                    />
                  </View>
                ),
              })}
              component={ViewSession}
            />
            <Stack.Screen
              name={t(APP_SCOREBOARD)}
              options={({ route }) => ({
                headerRight: () => (
                  <View style={styles.actions}>
                    <IconButton
                      icon="export"
                      accessibilityLabel="Export"
                      size={24}
                      onPress={() =>
                        exportSession(route?.params?.session as number)
                      }
                    />
                  </View>
                ),
              })}
              component={Scoreboard}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </ThemeProvider.Consumer>
  );
};

export default Navigator;
