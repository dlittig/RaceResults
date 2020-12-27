import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { FAB, List, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";
import BaseView from "../../../components/BaseView/BaseView";
import { APP_EDIT_DRIVER } from "../../../navigator/RouteConstants";
import { RootReducerType } from "../../../store/reducers";
import { Driver, DriversState } from "../../../store/reducers/driversReducer";
import styles from "./Drivers.style";

const Drivers = () => {
  const driversState: DriversState = useSelector<RootReducerType, DriversState>(
    (state) => state.driversReducer
  );
  const navigation = useNavigation();

  return (
    <BaseView>
      {Object.keys(driversState.drivers).length === 0 && (
        <View>
          <Text>Get started by creating some drivers 🙂</Text>
        </View>
      )}
      {Object.keys(driversState.drivers).length > 0 && (
        <BaseScrollView>
          {Object.values(driversState.drivers).map((driver, index) => (
            <List.Item
              key={index}
              title={driver.name}
              onPress={() =>
                navigation.navigate(APP_EDIT_DRIVER, { ...driver })
              }
            />
          ))}
        </BaseScrollView>
      )}
      <FAB
        style={styles.fab}
        label="Add"
        icon="plus"
        onPress={() => navigation.navigate(APP_EDIT_DRIVER)}
      />
    </BaseView>
  );
};

export default Drivers;
