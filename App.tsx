import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigator from "./src/navigator";
import { persistor, store } from "./src/store/Store";

const App = () => (
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

export default App;
