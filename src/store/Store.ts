import { createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

import reducers from "./reducers";

const persistConfig = {
  key: "race_results",
  storage: ExpoFileSystemStorage,
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

const initialState = {}

const store = createStore(persistedReducer, initialState);
const persistor = persistStore(store);

export { store, persistor };
