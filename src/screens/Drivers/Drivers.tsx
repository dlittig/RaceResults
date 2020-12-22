import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { FAB, List, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { APP_EDIT_DRIVER } from "../../navigator/RouteConstants";
import { RootReducerType } from "../../store/reducers";
import { Driver } from "../../store/reducers/driversReducer"
import styles from "./Drivers.style";

const Drivers = () => {
  const drivers: Driver[] = useSelector<RootReducerType, Driver[]>((state) => state.driversReducer.drivers);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {drivers.map((driver) => (
        <List.Item title={driver.name} />
      ))}

      <FAB
        style={styles.fab}
        label="Add"
        icon="plus"
        onPress={() => navigation.navigate(APP_EDIT_DRIVER)}
      />
    </View>
  );
};

export default Drivers;
