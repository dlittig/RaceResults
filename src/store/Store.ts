import { createStore } from "redux";
import {
  persistStore,
  persistCombineReducers,
  createMigrate,
} from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

import reducers, { RootReducerType } from "./reducers";
import { CONDITION, Race } from "./reducers/raceReducer";

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
};

const persistConfig = {
  key: "race_results",
  version: 1,
  storage: ExpoFileSystemStorage,
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

const initialState = {};

const store = createStore(persistedReducer, initialState);
const persistor = persistStore(store);

export { store, persistor };
