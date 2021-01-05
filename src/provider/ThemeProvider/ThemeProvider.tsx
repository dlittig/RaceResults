import React from "react";
import { useSelector } from "react-redux";
import getPaperTheme from "../../theme/paper";
import { Provider as PaperProvider } from "react-native-paper";
import { store } from "../../store/";
import { RootReducerType } from "../../store/reducers";
import { SettingsState } from "../../store/reducers/settingsReducer";

export const ThemeContext = React.createContext(
  store.getState().settingsReducer.theme
);

const ThemeProvider = ({ children }) => {
  const settingsReducer = useSelector<RootReducerType, SettingsState>(
    (state) => state.settingsReducer
  );
  let scheme = settingsReducer.theme;

  return (
    <ThemeContext.Provider value={scheme}>
      <PaperProvider theme={getPaperTheme(scheme)}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
ThemeProvider.Consumer = ThemeContext.Consumer;

export default ThemeProvider;
