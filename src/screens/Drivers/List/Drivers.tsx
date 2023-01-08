import React, { FC } from "react";
import { View } from "react-native";
import { FAB, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";
import BaseView from "../../../components/BaseView/BaseView";
import DriverCard from "../../../components/Cards/Driver";
import {
  APP_EDIT_DRIVER,
  APP_VIEW_DRIVER,
} from "../../../navigator/RouteConstants";

import styles from "./Drivers.style";
import { useTranslation } from "react-i18next";
import { DriversResult, HOOK, useStore } from "../../../hooks/store";
import { Driver } from "../../../store/reducers/driversReducer";

const Drivers: FC = () => {
  const { driversReducer: driversState } = useStore<DriversResult>(
    [HOOK.DRIVERS],
    {}
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
        <BaseScrollView spacer>
          {Object.values(driversState.drivers).map(
            (driver: Driver, index: number) => (
              <DriverCard
                key={index}
                allowDelete={true}
                onPress={() =>
                  navigation.navigate(
                    t(APP_VIEW_DRIVER) as never,
                    { driver: driver.id } as never
                  )
                }
                driver={driver}
              />
            )
          )}
        </BaseScrollView>
      )}
      <FAB
        style={styles.fab}
        label={t("actions.add") || ""}
        icon="plus"
        onPress={() => navigation.navigate(t(APP_EDIT_DRIVER) as never)}
      />
    </BaseView>
  );
};

export default Drivers;
