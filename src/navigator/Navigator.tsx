import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import EditDriver from "../screens/EditDriver";
import { APP_EDIT_DRIVER, APP_HOME } from "./RouteConstants";

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
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigator;
