import { createStore } from "redux";
import {
  persistStore,
  persistCombineReducers,
  createMigrate,
} from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

import reducers, { RootReducerType } from "./reducers";
import { CONDITION, Race } from "./reducers/raceReducer";
import { Session, TYPE_PRESET } from "./reducers/sessionsReducer";

const migrations = {
  0: (state: RootReducerType) => {
    // Add dry condition to all races
    const {
      raceReducer: { races },
    } = state;

    const newRaces = races.map((race: Race) => {
      if (typeof race.condition === "undefined" || race.condition === null) {
        race.condition = CONDITION.DRY;
      }

      return race;
    });

    return {
      ...state,
      raceReducer: { races: newRaces },
    };
  },
  5: (state: RootReducerType) => {
    // Add type to session wether new cars should
    // be copied or cars stay the same in session
    const {
      sessionsReducer: { sessions },
    } = state;

    const newSessions = sessions.map((session: Session) => {
      if (typeof session.type === "undefined" || session.type === null) {
        session.type = TYPE_PRESET.SHIFT;
      }

      return session;
    });

    return {
      ...state,
      sessionsReducer: { sessions: newSessions },
    };
  },
};

const persistConfig = {
  key: "race_results",
  version: 5, // key has to match the version specified in the migration above
  storage: ExpoFileSystemStorage,
  migrate: createMigrate(migrations, { debug: true }),
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

const initialState = {};

const store = createStore(persistedReducer, initialState);
const persistor = persistStore(store);

export { store, persistor };
