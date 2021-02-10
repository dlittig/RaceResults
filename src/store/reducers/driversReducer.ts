import {
  DRIVERS_ADD,
  DRIVERS_DELETE,
  DRIVERS_UPDATE,
} from "../constants/driversConstants";
import { DriversActionType } from "./actionTypes";

export type Driver = {
  id: number;
  name: string;
  color: string;
  [k: string]: unknown;
};

export type DriversState = {
  drivers: {
    [x: number]: Driver;
  };
};

const initialState: DriversState = {
  drivers: {},
};

export const driversReducer = (
  state = initialState,
  action: DriversActionType
): DriversState => {
  let newState: DriversState = { drivers: [] };
  let driver;

  switch (action.type) {
    case DRIVERS_ADD:
      driver = action.payload;
      newState = { ...state };
      newState.drivers[driver.id] = driver;
      return newState;
    case DRIVERS_UPDATE:
      driver = action.payload;
      newState = { ...state };
      newState.drivers[driver.id] = driver;

      return newState;
    case DRIVERS_DELETE:
      // TODO check if user is referenced somewhere else and cancel deletion if so
      driver = action.payload;
      newState = {
        ...state,
      };

      delete newState.drivers[driver.id];

      return newState;
    default:
      return state;
  }
};
