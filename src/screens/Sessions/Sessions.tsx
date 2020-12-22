import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Text, FAB, Button } from "react-native-paper";
import styles from "./Sessions.style";
import { APP_VIEW_SESSION } from "../../navigator/RouteConstants";

const Sessions = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Sessions</Text>
      <Button mode="contained" onPress={() => navigation.navigate(APP_VIEW_SESSION)}>
        View session
      </Button>
      <FAB
        style={styles.fab}
        label="Add"
        icon="plus"
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
};
export default Sessions;
