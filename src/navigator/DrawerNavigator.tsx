import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Sessions from "../screens/Sessions";
import Drivers from "../screens/Drivers";
import { APP_DRIVERS, APP_SESSIONS } from "./RouteConstants";

const Drawer = createDrawerNavigator();

const options = {
  headerShown: true,
};

const Navigator = () => (
  <Drawer.Navigator initialRouteName={APP_SESSIONS}>
    <Drawer.Screen name={APP_SESSIONS} options={options} component={Sessions} />
    <Drawer.Screen name={APP_DRIVERS} options={options} component={Drivers} />
  </Drawer.Navigator>
);

export default Navigator;
