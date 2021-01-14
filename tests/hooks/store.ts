import { combineReducers, createStore } from "redux";
import reducers from "../../src/store/reducers";

export const setupStore = (initialState = {}) => {
  const combinedReducers = combineReducers({ ...reducers });

  const store = createStore(combinedReducers, initialState);
  return store;
};
