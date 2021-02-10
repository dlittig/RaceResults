import {
  RACE_ADD,
  RACE_DELETE,
  RACE_DELETE_BY_SESSION_ID,
  RACE_UPDATE,
} from "../constants/racesConstants";
import { RacesActionType } from "./actionTypes";

export enum CONDITION {
  DRY = "WEATHER_DRY",
  NIGHT = "WEATHER_NIGHT",
  RAIN = "WEATHER_RAIN",
}

export type Race = {
  id: number;
  time: number;
  session: number; // session id
  cars: {
    [x: number]: string; // index is the id of the driver
  };
  order: number[]; // index is the order from 1-X, second number is the id
  fastest?: number[]; // id of the fastest driver
  location: string;
  condition: CONDITION;
  [k: string]: unknown;
};

export type RaceState = {
  races: Race[];
};

const initialState: RaceState = {
  races: [],
};

export const raceReducer = (
  state = initialState,
  action: RacesActionType
): RaceState => {
  let newState: RaceState = { races: [] };
  let race: Race, index, sessionId: number;

  switch (action.type) {
    case RACE_ADD:
      race = action.payload;
      newState = { ...state };
      newState.races.push(race);
      return newState;
    case RACE_UPDATE:
      race = action.payload;
      newState = { ...state };
      index = state.races.findIndex((item) => item.id === race.id);
      newState.races[index] = race;

      return newState;
    case RACE_DELETE:
      race = action.payload;
      newState = {
        ...state,
        races: state.races.filter((elem) => elem.id !== race.id),
      };

      return newState;
    case RACE_DELETE_BY_SESSION_ID:
      sessionId = action.payload;
      newState = {
        ...state,
        races: state.races.filter((elem) => elem.session !== sessionId),
      };

      return newState;
    default:
      return state;
  }
};
