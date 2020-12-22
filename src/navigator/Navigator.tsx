import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import EditDriver from "../screens/EditDriver";
import {
  APP_EDIT_DRIVER,
  APP_HOME,
  APP_RANDOM_MAP,
  APP_SCOREBOARD,
  APP_VIEW_SESSION,
} from "./RouteConstants";
import SessionsStack from "./SessionsStack";
import RandomMap from "../screens/RandomMap";
import ViewSession from "../screens/ViewSession";
import Scoreboard from "../screens/Scoreboard";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
};

const Navigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name={APP_HOME}
        options={options}
        component={DrawerNavigator}
      />
      <Stack.Screen name={APP_EDIT_DRIVER} component={EditDriver} />
      <Stack.Screen name={APP_RANDOM_MAP} component={RandomMap} />
      <Stack.Screen name={APP_VIEW_SESSION} component={ViewSession} />
      <Stack.Screen name={APP_SCOREBOARD} component={Scoreboard} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigator;
