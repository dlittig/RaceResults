import { Action } from "redux";
import {
  DRIVERS_ADD,
  DRIVERS_DELETE,
  DRIVERS_UPDATE,
} from "../constants/driversConstants";

export type Driver = {
  id: number;
  name: string;
  color: string;
};

export type DriversState = {
  drivers: {
    [x: number]: Driver;
  };
};

const initialState: DriversState = {
  drivers: {},
};

export const driversReducer = (state = initialState, action: Action<any>) => {
  let newState: DriversState = { drivers: [] };

  switch (action.type) {
    case DRIVERS_ADD:
      let driver = action.payload;
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
