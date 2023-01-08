import {
  sessionsReducer,
  SessionsState,
  TYPE_PRESET,
} from "../../src/store/reducers/sessionsReducer";
import * as types from "../../src/store/constants/sessionsConstants";
import { SessionsActionType } from "../../src/store/reducers/actionTypes";

describe("sessions reducer", () => {
  let currentState: SessionsState = { sessions: [] };

  it("should return the initial state", () => {
    expect(sessionsReducer(undefined, {} as SessionsActionType)).toEqual({
      sessions: [],
    });
  });

  it("should add session", () => {
    expect(
      sessionsReducer(undefined, {
        type: types.SESSIONS_ADD,
        payload: {
          type: TYPE_PRESET.SHIFT,
          id: 1610430495170,
          label: "B600",
          participants: [
            1610430413534, 1610430420760, 1610430426534, 1610430450383,
          ],
          pointScheme: "linear",
          startTime: 1610430495170,
        },
      })
    ).toEqual({
      sessions: [
        {
          type: TYPE_PRESET.SHIFT,
          id: 1610430495170,
          label: "B600",
          participants: [
            1610430413534, 1610430420760, 1610430426534, 1610430450383,
          ],
          pointScheme: "linear",
          startTime: 1610430495170,
        },
      ],
    });
  });

  it("should update session", () => {
    currentState = {
      sessions: [
        {
          type: TYPE_PRESET.SHIFT,
          id: 1610430495170,
          label: "B600",
          participants: [
            1610430413534, 1610430420760, 1610430426534, 1610430450383,
          ],
          pointScheme: "linear",
          startTime: 1610430495170,
        },
      ],
    };

    expect(
      sessionsReducer(currentState, {
        type: types.SESSIONS_UPDATE,
        payload: {
          type: TYPE_PRESET.SHIFT,
          id: 1610430495170,
          label: "A700",
          participants: [1610430450383],
          pointScheme: "gapped",
          startTime: 1610430495400,
        },
      })
    ).toEqual({
      sessions: [
        {
          type: TYPE_PRESET.SHIFT,
          id: 1610430495170,
          label: "A700",
          participants: [1610430450383],
          pointScheme: "gapped",
          startTime: 1610430495400,
        },
      ],
    });
  });

  it("deletes existing session", () => {
    expect(
      sessionsReducer(currentState, {
        type: types.SESSIONS_DELETE,
        payload: {
          type: TYPE_PRESET.STATIC,
          id: 1610430495170,
          label: "B600",
          participants: [
            1610430413534, 1610430420760, 1610430426534, 1610430450383,
          ],
          pointScheme: "linear",
          startTime: 1610430495170,
        },
      })
    ).toEqual({ sessions: [] });
  });
});
