import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SessionsList from "../screens/Sessions/List";
import DriversList from "../screens/Drivers/List";
import { APP_DRIVERS, APP_SESSIONS } from "./RouteConstants";

const Drawer = createDrawerNavigator();

const options = {
  headerShown: true,
};

const Navigator = () => (
  <Drawer.Navigator initialRouteName={APP_SESSIONS}>
    <Drawer.Screen name={APP_SESSIONS} options={options} component={SessionsList} />
    <Drawer.Screen name={APP_DRIVERS} options={options} component={DriversList} />
  </Drawer.Navigator>
);

export default Navigator;
