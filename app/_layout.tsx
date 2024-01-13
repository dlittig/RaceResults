import "react-native-gesture-handler";

import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { Alert } from "react-native";
import { Provider } from "react-redux";
import * as Updates from "expo-updates";
import { PersistGate } from "redux-persist/integration/react";

import i18n from "../src/translations/i18n";
import { persistor, store } from "../src/store/Store";
import ThemedDrawer from "../src/components/ThemedDrawer";
import ThemedStatusBar from "../src/components/ThemedStatusBar";
import ThemeProvider from "../src/provider/ThemeProvider/ThemeProvider";

// Keep this line to signal that i18n should be initialized
i18n;

const App = () => {
  console.log("_layout");

  useEffect(() => {
    Updates.addListener((event) => {
      if (Updates.UpdateEventType.UPDATE_AVAILABLE === event.type) {
        Alert.alert(
          "Update",
          "A new update of this app is available. Do you want to apply it now?",
          [
            {
              text: "Later",
              onPress: () => console.log("Applying later."),
            },
            { text: "OK", onPress: () => Updates.reloadAsync() },
          ],
          { cancelable: false }
        );
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <ThemedStatusBar />
          <ThemedDrawer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
