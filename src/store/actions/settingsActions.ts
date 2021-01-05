import { SETTINGS_APPLY_THEME, SETTINGS_SEEN_TIP_FASTEST } from "../constants/settingsConstants";

export const applyTheme = (theme: "dark" | "light") => ({
  type: SETTINGS_APPLY_THEME,
  payload: theme,
});

export const setSeenTipFastest = () => ({
  type: SETTINGS_SEEN_TIP_FASTEST,
});
