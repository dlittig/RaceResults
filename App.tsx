import React, { useEffect } from "react";

import { Provider } from "react-redux";
import * as Updates from "expo-updates";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigator from "./src/navigator";
import { Alert } from "react-native";
import { persistor, store } from "./src/store/Store";

const App = () => {
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
        <PaperProvider>
          <SafeAreaProvider>
            <Navigator />
          </SafeAreaProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
