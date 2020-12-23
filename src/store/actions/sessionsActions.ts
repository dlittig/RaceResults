import { SESSIONS_ADD, SESSIONS_DELETE, SESSIONS_UPDATE } from "../constants/sessionsConstants";
import { Session } from "../reducers/sessionsReducer";

export const addSession = (session: Session) => ({
  type: SESSIONS_ADD,
  payload: session,
});

export const deleteSession = (session: Session) => ({
  type: SESSIONS_DELETE,
  payload: session,
});

export const updateSession = (session: Session) => ({
  type: SESSIONS_UPDATE,
  payload: session,
});
