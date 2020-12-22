import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { APP_RANDOM_MAP, APP_SCOREBOARD } from "../../navigator/RouteConstants";

const ViewSession = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>View Session</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate(APP_SCOREBOARD)}
      >
        Scoreboard
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate(APP_RANDOM_MAP)}
      >
        Random map
      </Button>
    </View>
  );
};

export default ViewSession;
