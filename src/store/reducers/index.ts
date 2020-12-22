import { driversReducer, DriversState } from "./driversReducer";

export type RootReducerType = {
  driversReducer: DriversState
};

const RootReducer = {
  driversReducer,
};

export default RootReducer
