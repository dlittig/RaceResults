import { SESSIONS_ADD, SESSIONS_DELETE, SESSIONS_UPDATE } from "../constants/sessionsConstants";

export const addSession = (session: any) => ({
  type: SESSIONS_ADD,
  payload: session,
});

export const deleteSession = (session: any) => ({
  type: SESSIONS_DELETE,
  payload: session,
});

export const updateSession = (session: any) => ({
  type: SESSIONS_UPDATE,
  paylaod: session,
});
