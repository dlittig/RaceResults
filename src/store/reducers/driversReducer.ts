import { Action } from "redux";
import { DRIVERS_ADD, DRIVERS_DELETE } from "../constants/driversConstants";

export type Driver = {
  id: number;
  name: string;
  color: string;
};

export type DriversState = {
  drivers: Driver[];
};

const initialState: DriversState = {
  drivers: [],
};

export const driversReducer = (state = initialState, action: Action<any>) => {
  let newState: DriversState = { drivers: [] };
  switch (action.type) {
    case DRIVERS_ADD:
      let driver = action.payload;
      newState = { ...state };
      newState.drivers.push(driver);

      return newState;
    case DRIVERS_DELETE:
      driver = action.payload;
      newState = {
        ...state,
        drivers: state.drivers.filter((elem) => elem.id !== driver.id),
      };

      return newState;
    default:
      return state;
  }
};
