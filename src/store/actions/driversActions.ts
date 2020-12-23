import { DRIVERS_ADD, DRIVERS_DELETE, DRIVERS_UPDATE } from "../constants/driversConstants";
import { Driver } from "../reducers/driversReducer";

export const addDriver = (driver: Driver) => ({
  type: DRIVERS_ADD,
  payload: driver,
});

export const deleteDriver = (driver: Driver) => ({
  type: DRIVERS_DELETE,
  payload: driver,
});

export const updateDriver = (driver: Driver) => ({
  type: DRIVERS_UPDATE,
  payload: driver,
});
