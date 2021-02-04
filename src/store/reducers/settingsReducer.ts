import {
  SETTINGS_APPLY_THEME,
  SETTINGS_SEEN_TIP_FASTEST,
} from "../constants/settingsConstants";

export type SettingsState = {
  theme: "light" | "dark";
  tipFastestSeen: boolean;
};

const initialState: SettingsState = {
  theme: "light",
  tipFastestSeen: false,
};

export const settingsReducer = (state = initialState, action): SettingsState => {
  let newState: SettingsState | null = null;
  let theme;

  switch (action.type) {
    case SETTINGS_APPLY_THEME:
      theme = action.payload;
      newState = { ...state, theme };

      return newState;
    case SETTINGS_SEEN_TIP_FASTEST:
      newState = { ...state, tipFastestSeen: true };
      return newState;
    default:
      return state;
  }
};
