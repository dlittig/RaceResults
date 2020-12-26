import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SessionsList from "../screens/Sessions/List";
import DriversList from "../screens/Drivers/List";
import { APP_DRIVERS, APP_RANDOM_MAP, APP_SESSIONS } from "./RouteConstants";
import RandomMap from "../screens/RandomMap";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

const options = {
  headerShown: true,
};

const headerStyle = {
  elevation: 0, // remove shadow on Android
  shadowOpacity: 0, // remove shadow on iOS
  borderBottomWidth: 0,
};

const Navigator = () => (
  <Drawer.Navigator
    initialRouteName={APP_SESSIONS}
    screenOptions={{ headerStyle }}
  >
    <Drawer.Screen
      name={APP_SESSIONS}
      options={{
        ...options,
        drawerIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons name="gamepad-variant" color={color} size={size} />
        )}
      }
      component={SessionsList}
    />
    <Drawer.Screen
      name={APP_DRIVERS}
      options={{
        ...options,
        drawerIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons name="racing-helmet" color={color} size={size} />
        )}
      }
      component={DriversList}
    />
    <Drawer.Screen
      name={APP_RANDOM_MAP}
      options={{
        ...options,
        drawerIcon: ({ focused, color, size }) => (
          <MaterialCommunityIcons name="map" color={color} size={size} />
        )}
      }
      component={RandomMap}
    />
  </Drawer.Navigator>
);

export default Navigator;
