import { RACE_ADD } from "../constants/raceConstants";
import { Driver } from "./driversReducer";

export type Race = {
  id: number;
  time: number;
  cars: {
    [x: number]: string; // index is the id of the driver
  }
  order: {
    [x: number]: Driver; // index is the order from 1-X
  };
  fastest?: Driver[];
  location: string;
};

export type RaceState = {
  races: Race[];
};

const initialState: RaceState = {
  races: [],
};

export const raceReducer = (state = initialState, action) => {
  switch (action.type) {
    case RACE_ADD:
      break;
    default:
      return state;
  }
};
