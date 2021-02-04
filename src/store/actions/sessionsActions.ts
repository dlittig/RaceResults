import {
  SESSIONS_ADD,
  SESSIONS_DELETE,
  SESSIONS_UPDATE,
} from "../constants/sessionsConstants";
import { Session } from "../reducers/sessionsReducer";
import { ActionType } from "./types";

export const addSession = (session: Session): ActionType => ({
  type: SESSIONS_ADD,
  payload: session,
});

export const deleteSession = (session: Session): ActionType => ({
  type: SESSIONS_DELETE,
  payload: session,
});

export const updateSession = (session: Session): ActionType => ({
  type: SESSIONS_UPDATE,
  payload: session,
});
