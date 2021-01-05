import { SETTINGS_SET } from "../constants/settingsConstants";

export type SettingsState = {
  theme: "light" | "dark";
};

const initialState: SettingsState = {
  theme: "light",
};

export const settingsReducer = (state = initialState, action) => {
  let newState: SettingsState = {};

  switch (action.type) {
    case SETTINGS_SET:
      let settings = action.payload;
      newState = { ...state, ...settings };

      return newState;
    default:
      return state;
  }
};
