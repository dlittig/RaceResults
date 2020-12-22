import { DRIVERS_ADD, DRIVERS_DELETE, DRIVERS_UPDATE } from "../constants/driversConstants";

export const addDriver = (driver: any) => ({
  type: DRIVERS_ADD,
  payload: driver,
});

export const deleteDriver = (driver: any) => ({
  type: DRIVERS_DELETE,
  payload: driver,
});

export const updateDriver = (driver: any) => ({
  type: DRIVERS_UPDATE,
  paylaod: driver,
});
