import React, { FC } from "react";

import { renderHook } from "@testing-library/react-hooks";

import { setupStore } from "./store";
import { Provider } from "react-redux";
import { HOOK, UseStateResult, useStore } from "../../src/hooks/store";

const wrapWith = (name: string, content: any) => ({
  [`${name}Reducer`]: content,
});

const races = [
  {
    cars: {
      "1610430413534": "Mustang",
      "1610430420760": "GTR R34",
      "1610430426534": "Tacoma",
      "1610430450383": "MB 190",
    },
    fastest: [1610430420760],
    id: 1610430546152,
    location: "Autodromo Nazionale Monza",
    order: [1610430413534, 1610430420760, 1610430426534, 1610430450383],
    session: 1610430495170,
    time: 1610430546152,
  },
  {
    cars: {
      "1610430413534": "A",
      "1610430420760": "B",
      "1610430426534": "C",
      "1610430450383": "D",
    },
    fastest: [1610430413534],
    id: 1610430546200,
    location: "Nürburgring",
    order: [1610430413534, 1610430450383, 1610430426534, 1610430420760],
    session: 1610430495170,
    time: 1610430546200,
  },
  {
    cars: {
      "1610430413534": "A",
      "1610430420760": "B",
      "1610430426534": "C",
      "1610430450383": "D",
    },
    fastest: [1610430413534],
    id: 1610430546300,
    location: "Nürburgring",
    order: [1610430413534, 1610430450383, 1610430426534, 1610430420760],
    session: 1610430495300,
    time: 1610430546300,
  },
];

const sessions = [
  {
    id: 1610430495170,
    label: "B600",
    participants: [1610430413534, 1610430420760, 1610430426534, 1610430450383],
    pointScheme: "linear",
    startTime: 1610430495170,
  },
];

const drivers = {
  1610430413534: {
    color: "#d73964",
    id: 1610430413534,
    name: "David",
  },
  1610430420760: {
    color: "#70b949",
    id: 1610430420760,
    name: "Jason",
  },
};

const settings = {
  tipFastestSeen: false,
  theme: "dark",
};

describe("useStore([HOOK], {})", () => {
  const makeWrapper = (initialState?: any): FC => ({ children }) => (
    <Provider store={setupStore(initialState)}>{children}</Provider>
  );

  it("should retrieve empty sessions", () => {
    const { result } = renderHook(
      () => useStore<UseStateResult>([HOOK.SESSIONS], {}),
      {
        wrapper: makeWrapper(),
      }
    );

    const { sessionsReducer } = result.current;

    expect(Boolean(sessionsReducer)).toBe(true);
    expect(result.current).toMatchObject(
      wrapWith("sessions", {
        sessions: [],
      })
    );
  });

  it("should retrieve empty races", () => {
    const { result } = renderHook(
      () => useStore<UseStateResult>([HOOK.RACES], {}),
      {
        wrapper: makeWrapper(),
      }
    );

    const { racesReducer } = result.current;

    expect(Boolean(racesReducer)).toBe(true);
    expect(result.current).toMatchObject(
      wrapWith("races", {
        races: [],
      })
    );
  });

  it("should retrieve empty drivers", () => {
    const { result } = renderHook(
      () => useStore<UseStateResult>([HOOK.DRIVERS], {}),
      {
        wrapper: makeWrapper(),
      }
    );

    const { driversReducer } = result.current;

    expect(Boolean(driversReducer)).toBe(true);
    expect(result.current).toMatchObject(
      wrapWith("drivers", {
        drivers: {},
      })
    );
  });

  it("should retrieve all sessions", () => {
    const allSessions = wrapWith("sessions", sessions);
    const { result } = renderHook(
      () => useStore<UseStateResult>([HOOK.SESSIONS], {}),
      {
        wrapper: makeWrapper(allSessions),
      }
    );

    const { sessionsReducer } = result.current;

    expect(Boolean(sessionsReducer)).toBe(true);
    expect(result.current).toMatchObject(allSessions);
  });

  it("should retrieve all races", () => {
    const allRaces = wrapWith("race", races);
    const { result } = renderHook(
      () => useStore<UseStateResult>([HOOK.RACES], {}),
      {
        wrapper: makeWrapper(allRaces),
      }
    );

    const { racesReducer } = result.current;

    expect(Boolean(racesReducer)).toBe(true);
    expect(result.current).toMatchObject(wrapWith("races", races));
  });

  it("should retrieve all drivers", () => {
    const allDrivers = wrapWith("drivers", drivers);
    const { result } = renderHook(
      () => useStore<UseStateResult>([HOOK.DRIVERS], {}),
      {
        wrapper: makeWrapper(allDrivers),
      }
    );

    const { driversReducer } = result.current;

    expect(Boolean(driversReducer)).toBe(true);
    expect(result.current).toMatchObject(allDrivers);
  });

  it("should return a specific race", () => {
    const selectedRace = races[1];
    const { result } = renderHook(
      () =>
        useStore<UseStateResult>([HOOK.RACE_SPECIFIC], {
          raceId: selectedRace.id,
        }),
      {
        wrapper: makeWrapper(wrapWith("race", { races })),
      }
    );

    const { race } = result.current;

    expect(Boolean(race)).toBe(true);
    expect(result.current).toMatchObject({
      race: selectedRace,
    });
  });

  it("should return a specific session", () => {
    const selectedSession = sessions[0];
    const { result } = renderHook(
      () =>
        useStore<UseStateResult>([HOOK.SESSION_SPECIFIC], {
          sessionId: selectedSession.id,
        }),
      {
        wrapper: makeWrapper(wrapWith("sessions", { sessions })),
      }
    );

    const { session } = result.current;

    expect(Boolean(session)).toBe(true);
    expect(result.current).toMatchObject({
      session: selectedSession,
    });
  });

  it("should return a specific driver", () => {
    const selectedDriver = drivers[1610430413534];
    const { result } = renderHook(
      () =>
        useStore<UseStateResult>([HOOK.DRIVER_SPECIFIC], {
          driverId: selectedDriver.id,
        }),
      {
        wrapper: makeWrapper(wrapWith("drivers", { drivers })),
      }
    );

    const { driver } = result.current;

    expect(Boolean(driver)).toBe(true);
    expect(result.current).toMatchObject({
      driver: selectedDriver,
    });
  });

  it("should return all races of a session", () => {
    const selectedSession = sessions[0];
    const { result } = renderHook(
      () =>
        useStore<UseStateResult>([HOOK.RACES_OF_SESSION], {
          sessionId: selectedSession.id,
        }),
      {
        wrapper: makeWrapper(wrapWith("race", { races })),
      }
    );

    const { sessionRaces } = result.current;

    expect(Boolean(sessionRaces)).toBe(true);
    expect(result.current).toMatchObject({
      sessionRaces: [races[0], races[1]],
    });
  });

  it("should retrieve settings", () => {
    const { result } = renderHook(
      () => useStore<UseStateResult>([HOOK.SETTINGS], {}),
      {
        wrapper: makeWrapper(wrapWith("settings", settings)),
      }
    );

    const { settingsReducer } = result.current;

    expect(Boolean(settingsReducer)).toBe(true);
    expect(result.current).toMatchObject({
      settingsReducer: settings,
    });
  });
});
