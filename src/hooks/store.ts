import { useSelector } from "react-redux";
import { RootReducerType } from "../store/reducers";
import { Driver, DriversState } from "../store/reducers/driversReducer";
import { Race, RaceState } from "../store/reducers/raceReducer";
import { Session, SessionsState } from "../store/reducers/sessionsReducer";
import { SettingsState } from "../store/reducers/settingsReducer";

export enum HOOK {
  RACES = "[hook] get all races",
  RACE_SPECIFIC = "[hook] get specific race",
  SESSIONS = "[hook] get all sessions",
  SESSION_SPECIFIC = "[hook] get specific session",
  DRIVERS = "[hook] get all drivers",
  DRIVER_SPECIFIC = "[hook] get specific driver",
  RACES_OF_SESSION = "[hook] get races of session",
  SETTINGS = "[hook] settings",
}

// export type UseStateResult = {
//   racesReducer?: RaceState;
//   driversReducer?: DriversState;
//   sessionsReducer?: SessionsState;
//   settingsReducer?: SettingsState;
//   driver?: Driver | null;
//   session?: Session | null;
//   race?: Race | null;
//   sessionRaces?: Race[];
// };

export type RacesResult = {
  racesReducer: RaceState;
};

export type RaceSpecificResult = {
  race: Race | null;
};

export type SessionsResult = {
  sessionsReducer: SessionsState;
};

export type SessionSpecificResult = {
  session: Session | null;
};

export type DriversResult = {
  driversReducer: DriversState;
};

export type DriverSpecificResult = {
  driver: Driver | null;
};

export type RacesOfSessionResult = {
  sessionRaces: Race[];
};

export type SettingsResult = {
  settingsReducer: SettingsState;
};

export type UseStateResult = RacesResult &
  RaceSpecificResult &
  SessionsResult &
  SessionSpecificResult &
  DriversResult &
  DriverSpecificResult &
  RacesOfSessionResult &
  SettingsResult;

type IdParams = { raceId?: number; sessionId?: number; driverId?: number };

export const useStore = <T extends unknown>(
  query: HOOK[],
  { raceId, sessionId, driverId }: IdParams
): T => {
  const result: UseStateResult | Record<string, unknown> = {};
  let raceReducer, races, sessionsReducer, sessions, driversReducer;

  query.forEach((prop) => {
    switch (prop) {
      case HOOK.RACES:
        result.racesReducer = useSelector<RootReducerType, RaceState>(
          (state) => state.raceReducer
        );
        break;
      case HOOK.RACE_SPECIFIC:
        raceReducer = useSelector<RootReducerType, RaceState>(
          (state) => state.raceReducer
        );
        races = raceReducer.races.filter((race) => race.id === raceId);
        result.race = races.length > 0 ? races[0] : null;
        break;
      case HOOK.SESSIONS:
        result.sessionsReducer = useSelector<RootReducerType, SessionsState>(
          (state) => state.sessionsReducer
        );
        break;
      case HOOK.SESSION_SPECIFIC:
        sessionsReducer = useSelector<RootReducerType, SessionsState>(
          (state) => state.sessionsReducer
        );
        sessions = sessionsReducer.sessions.filter(
          (session) => session.id === sessionId
        );
        result.session = sessions.length > 0 ? sessions[0] : null;
        break;
      case HOOK.DRIVERS:
        result.driversReducer = useSelector<RootReducerType, DriversState>(
          (state) => state.driversReducer
        );
        break;
      case HOOK.DRIVER_SPECIFIC:
        driversReducer = useSelector<RootReducerType, DriversState>(
          (state) => state.driversReducer
        );
        result.driver =
          typeof driverId !== "undefined" &&
          typeof driversReducer.drivers[driverId] !== "undefined"
            ? driversReducer.drivers[driverId]
            : null;
        break;
      case HOOK.RACES_OF_SESSION:
        raceReducer = useSelector<RootReducerType, RaceState>(
          (state) => state.raceReducer
        );
        result.sessionRaces = raceReducer.races.filter(
          (race) => race.session === sessionId
        );
        break;
      case HOOK.SETTINGS:
        result.settingsReducer = useSelector<RootReducerType, SettingsState>(
          (state) => state.settingsReducer
        );
        break;
    }
  });

  return result as T;
};
