import { SETTINGS_SET } from "../constants/settingsConstants";
import { SettingsState } from "../reducers/settingsReducer";

export const setSettings = (settings: SettingsState) => ({
  type: SETTINGS_SET,
  payload: settings,
});
