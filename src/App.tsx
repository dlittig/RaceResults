import React from "react";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigator from "./navigator";
import { persistor, store } from "./store/Store";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <Navigator />
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);

export default App;
