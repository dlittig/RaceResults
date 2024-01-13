import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import React, { FC, PropsWithChildren } from "react";

import { store } from "../../store/";
import getPaperTheme from "../../theme/paper";
import { HOOK, UseStateResult, useStore } from "../../hooks/store";

export const ThemeContext = React.createContext(
  store.getState().settingsReducer.theme ?? "light"
);

const ThemeProvider: FC<PropsWithChildren> & {
  Consumer: typeof ThemeContext.Consumer;
} = ({ children }) => {
  const colorScheme = useColorScheme();
  const { settingsReducer } = useStore<UseStateResult>([HOOK.SETTINGS], {});
  const scheme = settingsReducer.theme ?? colorScheme ?? "light";

  console.log("TP", children);

  return (
    <ThemeContext.Provider value={scheme}>
      <PaperProvider theme={getPaperTheme(scheme)}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
ThemeProvider.Consumer = ThemeContext.Consumer;

export default ThemeProvider;
