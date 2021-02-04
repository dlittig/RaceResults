import {
  SETTINGS_APPLY_THEME,
  SETTINGS_SEEN_TIP_FASTEST,
} from "../constants/settingsConstants";
import { ActionType } from "./types";

export const applyTheme = (theme: string): ActionType => ({
  type: SETTINGS_APPLY_THEME,
  payload: theme,
});

export const setSeenTipFastest = (): ActionType => ({
  type: SETTINGS_SEEN_TIP_FASTEST,
});
