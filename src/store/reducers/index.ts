import { driversReducer, DriversState } from "./driversReducer";
import { raceReducer, RaceState } from "./raceReducer";
import { sessionsReducer, SessionsState } from "./sessionsReducer";
import { SettingsState, settingsReducer } from "./settingsReducer";

export type RootReducerType = {
  driversReducer: DriversState,
  raceReducer: RaceState,
  sessionsReducer: SessionsState,
  settingsReducer: SettingsState,
};

const RootReducer = {
  driversReducer,
  raceReducer,
  sessionsReducer,
  settingsReducer,
};

export default RootReducer
