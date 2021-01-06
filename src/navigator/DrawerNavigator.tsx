import React from "react";
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

const Drawer = createDrawerNavigator();

const options = {
  headerShown: true,
};

const headerStyle = {
  elevation: 0, // remove shadow on Android
  shadowOpacity: 0, // remove shadow on iOS
  borderBottomWidth: 0,
};

const Navigator = () => {
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      initialRouteName={t(APP_SESSIONS)}
      screenOptions={{ headerStyle }}
    >
      <Drawer.Screen
        name={t(APP_SESSIONS)}
        options={{
          ...options,
          drawerIcon: ({ focused, color, size }) => (
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
          ...options,
          drawerIcon: ({ focused, color, size }) => (
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
          ...options,
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}
        component={RandomMap}
      />
      <Drawer.Screen
        name={t(APP_SETTINGS)}
        options={{
          ...options,
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
        component={Settings}
      />
      <Drawer.Screen
        name={t(APP_ABOUT)}
        component={About}
        options={{
          ...options,
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="information-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Navigator;
