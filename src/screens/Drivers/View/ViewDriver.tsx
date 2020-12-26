import { useNavigation } from "@react-navigation/native";
import React, { View } from "react";
import { Text } from "react-native-paper";
import BaseScrollView from "../../../components/BaseScrollView/BaseScrollView";
import BaseView from "../../../components/BaseView/BaseView";
import { Driver } from "../../../store/reducers/driversReducer";

const ViewDriver = () => {
  const navigation = useNavigation();
  const state = navigation.dangerouslyGetState();
  const routeParams = state.routes[state.index].params as Driver;

  return (
    <BaseView>
      <BaseScrollView>
        <View>
          <Text>{routeParams.name}</Text>
          <Text>
            See history of positions here in chart graph: "npm i
            react-native-chart-kit"
          </Text>
        </View>
      </BaseScrollView>
    </BaseView>
  );
};

export default ViewDriver;
