import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, FAB } from "react-native-paper";
import styles from "./Sessions.style"

const Sessions = () => (
  <View style={styles.container}>
    <Text>Sessions</Text>
    <FAB
      style={styles.fab}
      label="Add"
      icon="plus"
      onPress={() => console.log("Pressed")}
    />
  </View>
);

export default Sessions;
