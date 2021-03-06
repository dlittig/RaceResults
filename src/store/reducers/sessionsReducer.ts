import {
  SESSIONS_ADD,
  SESSIONS_DELETE,
  SESSIONS_UPDATE,
} from "../constants/sessionsConstants";
import { SessionsActionType } from "./actionTypes";

export enum TYPE_PRESET {
  STATIC = "static",
  SHIFT = "shift",
}

export type Session = {
  id: number;
  participants: number[];
  pointScheme: "gapped" | "linear";
  label?: string;
  startTime: number;
  type: TYPE_PRESET;
  [k: string]: unknown;
};

export type SessionsState = {
  sessions: Session[];
};

const initialState: SessionsState = {
  sessions: [],
};

export const sessionsReducer = (
  state = initialState,
  action: SessionsActionType
): SessionsState => {
  let newState: SessionsState = { sessions: [] };
  let session: Session, index;

  switch (action.type) {
    case SESSIONS_ADD:
      session = action.payload;
      newState = { ...state };
      newState.sessions.push(session);

      return newState;
    case SESSIONS_UPDATE:
      session = action.payload;
      newState = { ...state };
      index = state.sessions.findIndex((item) => item.id === session.id);
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
