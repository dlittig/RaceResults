import { driversReducer, DriversState } from "./driversReducer";
import { raceReducer, RaceState } from "./raceReducer";
import { sessionsReducer, SessionsState } from "./sessionsReducer";

export type RootReducerType = {
  driversReducer: DriversState,
  raceReducer: RaceState,
  sessionsReducer: SessionsState,
};

const RootReducer = {
  driversReducer,
  raceReducer,
  sessionsReducer
};

export default RootReducer
