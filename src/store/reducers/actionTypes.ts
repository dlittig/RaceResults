import {
  DRIVERS_ADD,
  DRIVERS_DELETE,
  DRIVERS_UPDATE,
} from "../constants/driversConstants";
import {
  RACE_ADD,
  RACE_DELETE,
  RACE_DELETE_BY_SESSION_ID,
  RACE_UPDATE,
} from "../constants/racesConstants";
import {
  SESSIONS_ADD,
  SESSIONS_DELETE,
  SESSIONS_UPDATE,
} from "../constants/sessionsConstants";
import {
  SETTINGS_APPLY_THEME,
  SETTINGS_SEEN_TIP_FASTEST,
} from "../constants/settingsConstants";
import { Driver } from "./driversReducer";
import { Race } from "./raceReducer";
import { Session } from "./sessionsReducer";

type ApplyThemeAction = {
  type: typeof SETTINGS_APPLY_THEME;
  payload: "light" | "dark";
};

type SeenTipFastestAction = {
  type: typeof SETTINGS_SEEN_TIP_FASTEST;
};

export type SettingsActionType = ApplyThemeAction | SeenTipFastestAction;

export type DriversActionType = {
  type: typeof DRIVERS_ADD | typeof DRIVERS_UPDATE | typeof DRIVERS_DELETE;
  payload: Driver;
};

export type SessionsActionType = {
  type: typeof SESSIONS_ADD | typeof SESSIONS_UPDATE | typeof SESSIONS_DELETE;
  payload: Session;
};

type RaceAddUpdateDeleteAction = {
  type: typeof RACE_ADD | typeof RACE_UPDATE | typeof RACE_DELETE;
  payload: Race;
};

type RaceDeleteBySessionAction = {
  type: typeof RACE_DELETE_BY_SESSION_ID;
  payload: number;
};

export type RacesActionType =
  | RaceAddUpdateDeleteAction
  | RaceDeleteBySessionAction;
