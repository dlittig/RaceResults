import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { FAB, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";
import BaseView from "../../../components/BaseView/BaseView";
import DriverCard from "../../../components/Cards/Driver";
import {
  APP_EDIT_DRIVER,
  APP_VIEW_DRIVER,
} from "../../../navigator/RouteConstants";
import { RootReducerType } from "../../../store/reducers";
import { DriversState } from "../../../store/reducers/driversReducer";

import styles from "./Drivers.style";
import { useTranslation } from "react-i18next";

const Drivers = () => {
  const driversState: DriversState = useSelector<RootReducerType, DriversState>(
    (state) => state.driversReducer
  );
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <BaseView>
      {Object.keys(driversState.drivers).length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>{t("empty.drivers")}</Text>
        </View>
      )}
      {Object.keys(driversState.drivers).length > 0 && (
        <BaseScrollView>
          {Object.values(driversState.drivers).map((driver, index) => (
            <DriverCard
              key={index}
              allowDelete={true}
              onPress={() =>
                navigation.navigate(t(APP_VIEW_DRIVER), { driver: driver.id })
              }
              driver={driver}
            />
          ))}
        </BaseScrollView>
      )}
      <FAB
        style={styles.fab}
        label={t("actions.add")}
        icon="plus"
        onPress={() => navigation.navigate(t(APP_EDIT_DRIVER))}
      />
    </BaseView>
  );
};

export default Drivers;
