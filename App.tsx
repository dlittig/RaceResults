import React, { useEffect } from "react";

import { Provider } from "react-redux";
import * as Updates from "expo-updates";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigator from "./src/navigator";
import { Alert, StatusBar } from "react-native";
import { persistor, store } from "./src/store/Store";
import { ThemeColors } from "./src/theme/colors/values";

import i18n from "./src/translations/i18n";
import { THEMES } from "./src/store/constants/settingsConstants";
import ThemeProvider from "./src/provider/ThemeProvider/ThemeProvider";

const App = () => {
  const getBackgroundColor = (theme: string) => {
    switch (theme) {
      case THEMES.LIGHT:
        return ThemeColors.LightColors.card;
      case THEMES.DARK:
        return ThemeColors.DarkColors.card;
    }
  };

  // Keep this line to signal that i18n should be initialized
  i18n;

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
          <ThemeProvider.Consumer>
            {(theme) => (
              <>
                <StatusBar
                  barStyle={
                    theme === THEMES.LIGHT ? "dark-content" : "light-content"
                  }
                  animated={true}
                  backgroundColor={getBackgroundColor(theme)}
                />
                <SafeAreaProvider>
                  <Navigator />
                </SafeAreaProvider>
              </>
            )}
          </ThemeProvider.Consumer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
