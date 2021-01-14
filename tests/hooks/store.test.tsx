import React, { FC, ReactNode, ReactNodeArray } from "react";

import { renderHook } from "@testing-library/react-hooks";

import { setupStore } from "./store";
import { Provider } from "react-redux";
import { HOOK, UseStateResult, useStore } from "../../src/hooks/store";

describe("useResumeURL (context)", () => {
  const makeWrapper = (initialState?: any): FC => ({ children }) => (
    <Provider store={setupStore(initialState)}>{children}</Provider>
  );

  it("should retrieve empty sessions", () => {
    const { result } = renderHook(() => useStore<UseStateResult>([HOOK.SESSIONS], {}), {
      wrapper: makeWrapper(),
    });

    const { sessionsReducer } = result.current;

    expect(Boolean(sessionsReducer)).toBe(true);
    expect(result.current).toMatchObject({
      sessionsReducer: {
        sessions: [],
      },
    });
  });

  it("should retrieve empty races", () => {
    const { result } = renderHook(() => useStore<UseStateResult>([HOOK.RACES], {}), {
      wrapper: makeWrapper(),
    });

    const { racesReducer } = result.current;

    expect(Boolean(racesReducer)).toBe(true);
    expect(result.current).toMatchObject({
      racesReducer: {
        races: [],
      },
    });
  });
});
