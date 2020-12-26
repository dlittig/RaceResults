import {
  RACE_ADD,
  RACE_DELETE,
  RACE_DELETE_BY_SESSION_ID,
  RACE_UPDATE,
} from "../constants/racesConstants";
import { Race } from "../reducers/raceReducer";

export const addRace = (race: Race) => ({
  type: RACE_ADD,
  payload: race,
});

export const deleteRace = (race: Race) => ({
  type: RACE_DELETE,
  payload: race,
});

export const updateRace = (race: Race) => ({
  type: RACE_UPDATE,
  payload: race,
});

export const deleteRaceBySession = (sessionId: number) => ({
  type: RACE_DELETE_BY_SESSION_ID,
  payload: sessionId,
});
