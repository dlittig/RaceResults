import React, { FC } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SessionsList from "../screens/Sessions/List";
import DriversList from "../screens/Drivers/List";
import {
  APP_ABOUT,
  APP_DRIVERS,
  APP_RANDOM_MAP,
  APP_SESSIONS,
  APP_SETTINGS,
} from "./RouteConstants";
import RandomMap from "../screens/RandomMap";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import About from "../screens/About";
import Settings from "../screens/Settings";
import { useTranslation } from "react-i18next";
import ThemeProvider from "../provider/ThemeProvider/ThemeProvider";
import { THEMES } from "../store/constants/settingsConstants";
import { ThemeColors } from "../theme/colors/values";

const Drawer = createDrawerNavigator();

const getOptions = (theme: string) => ({
  headerShown: true,
  headerTintColor:
    theme === THEMES.LIGHT
      ? ThemeColors.LightColors.text
      : ThemeColors.DarkColors.text,
});

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
        <Drawer.Navigator
          initialRouteName={t(APP_SESSIONS)}
          screenOptions={{ headerStyle }}
        >
          <Drawer.Screen
            name={t(APP_SESSIONS)}
            options={{
              ...getOptions(theme),
              drawerIcon: ({
                color,
                size,
              }: {
                color: string;
                size: number;
              }) => (
                <MaterialCommunityIcons
                  name="gamepad-variant"
                  color={color}
                  size={size}
                />
              ),
            }}
            component={SessionsList}
          />
          <Drawer.Screen
            name={t(APP_DRIVERS)}
            options={{
              ...getOptions(theme),
              drawerIcon: ({
                color,
                size,
              }: {
                color: string;
                size: number;
              }) => (
                <MaterialCommunityIcons
                  name="racing-helmet"
                  color={color}
                  size={size}
                />
              ),
            }}
            component={DriversList}
          />
          <Drawer.Screen
            name={t(APP_RANDOM_MAP)}
            options={{
              ...getOptions(theme),
              drawerIcon: ({
                color,
                size,
              }: {
                color: string;
                size: number;
              }) => (
                <MaterialCommunityIcons name="map" color={color} size={size} />
              ),
            }}
            component={RandomMap}
          />
          <Drawer.Screen
            name={t(APP_SETTINGS)}
            options={{
              ...getOptions(theme),
              drawerIcon: ({
                color,
                size,
              }: {
                focused: boolean;
                color: string;
                size: number;
              }) => (
                <MaterialCommunityIcons name="cog" color={color} size={size} />
              ),
            }}
            component={Settings}
          />
          <Drawer.Screen
            name={t(APP_ABOUT)}
            component={About}
            options={{
              ...getOptions(theme),
              drawerIcon: ({
                color,
                size,
              }: {
                color: string;
                size: number;
              }) => (
                <MaterialCommunityIcons
                  name="information-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      )}
    </ThemeProvider.Consumer>
  );
};

export default Navigator;
