import {
  SESSIONS_ADD,
  SESSIONS_DELETE,
  SESSIONS_UPDATE,
} from "../constants/sessionsConstants";
import { Driver } from "./driversReducer";

export type Session = {
  id: number;
  participants: Driver[];
  pointScheme: "gapped" | "linear";
  label?: string;
  startTime: number;
};

export type SessionsState = {
  sessions: Session[];
};

const initialState: SessionsState = {
  sessions: [],
};

export const sessionsReducer = (state = initialState, action) => {
  let newState: SessionsState = { sessions: [] };

  switch (action.type) {
    case SESSIONS_ADD:
      let session = action.payload;
      newState = { ...state };
      newState.sessions.push(session);

      return newState;
    case SESSIONS_UPDATE:
      session = action.payload;
      newState = { ...state };
      const index = state.sessions.findIndex((item) => item.id === session.id);
      newState.sessions[index] = session;

      return newState;
    case SESSIONS_DELETE:
      session = action.payload;
      newState = {
        ...state,
        sessions: state.sessions.filter((elem) => elem.id !== session.id),
      };

      return newState;
    default:
      return state;
  }
};
