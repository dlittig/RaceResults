import {
  DRIVERS_ADD,
  DRIVERS_DELETE,
  DRIVERS_UPDATE,
} from "../constants/driversConstants";
import { Driver } from "../reducers/driversReducer";
import { ActionType } from "./types";

export const addDriver = (driver: Driver): ActionType => ({
  type: DRIVERS_ADD,
  payload: driver,
});

export const deleteDriver = (driver: Driver): ActionType => ({
  type: DRIVERS_DELETE,
  payload: driver,
});

export const updateDriver = (driver: Driver): ActionType => ({
  type: DRIVERS_UPDATE,
  payload: driver,
});
