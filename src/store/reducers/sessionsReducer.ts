import { SESSIONS_ADD } from "../constants/sessionsConstants";
import { Driver } from "./driversReducer";

export type Session = {
  id: number;
  participants: Driver[];
  pointScheme: "gapped" | "linear";
  label?: string;
};

export type SessionsState = {
  sessions: Session[];
};

const initialState: SessionsState = {
  sessions: [],
};

export const sessionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSIONS_ADD:
      break;
    default:
      return state;
  }
};
