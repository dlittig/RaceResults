import { Driver } from "../reducers/driversReducer";
import { Race } from "../reducers/raceReducer";
import { Session } from "../reducers/sessionsReducer";

interface DriverActionType {
  type: string;
  payload: Driver;
}

interface RaceActionType {
  type: string;
  payload: Race;
}

interface SessionActionType {
  type: string;
  payload: Session;
}

interface RaceWithSessionActionType {
  type: string;
  payload: number;
}

interface SettingsActionType {
  type: string;
  payload?: unknown;
}

export type ActionType =
  | DriverActionType
  | RaceActionType
  | SessionActionType
  | RaceWithSessionActionType
  | SettingsActionType;
