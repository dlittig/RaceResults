import React, { FC, PropsWithChildren } from "react";
import getPaperTheme from "../../theme/paper";
import { Provider as PaperProvider } from "react-native-paper";
import { store } from "../../store/";
import { HOOK, UseStateResult, useStore } from "../../hooks/store";

export const ThemeContext = React.createContext(
  store.getState().settingsReducer.theme
);

const ThemeProvider: FC<PropsWithChildren> & {
  Consumer: typeof ThemeContext.Consumer;
} = ({ children }) => {
  const { settingsReducer } = useStore<UseStateResult>([HOOK.SETTINGS], {});
  const scheme = settingsReducer.theme;

  return (
    <ThemeContext.Provider value={scheme}>
      <PaperProvider theme={getPaperTheme(scheme)}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
ThemeProvider.Consumer = ThemeContext.Consumer;

export default ThemeProvider;
