import { driversReducer, DriversState } from "./driversReducer";
import { raceReducer, RaceState } from "./raceReducer";

export type RootReducerType = {
  driversReducer: DriversState,
  raceReducer: RaceState,
};

const RootReducer = {
  driversReducer,
  raceReducer
};

export default RootReducer
