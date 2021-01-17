import {
  CONDITION,
  raceReducer,
  RaceState,
} from "../../src/store/reducers/raceReducer";
import * as types from "../../src/store/constants/racesConstants";

describe("races reducer", () => {
  let currentState: RaceState = { races: [] };

  it("should return the initial state", () => {
    expect(raceReducer(undefined, {})).toEqual({
      races: [],
    });
  });

  it("should add session", () => {
    expect(
      raceReducer(undefined, {
        type: types.RACE_ADD,
        payload: {
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
      })
    ).toEqual({
      races: [
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
      ],
    });
  });

  it("should update race", () => {
    currentState = {
      races: [
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
          condition: CONDITION.DRY,
        },
      ],
    };

    expect(
      raceReducer(currentState, {
        type: types.RACE_UPDATE,
        payload: {
          cars: {
            "1610430413534": "A",
            "1610430420760": "B",
            "1610430426534": "C",
            "1610430450383": "D",
          },
          fastest: [1610430413534],
          id: 1610430546152,
          location: "Nürburgring",
          order: [1610430426534, 1610430450383, 1610430413534, 1610430420760],
          session: 1610430495170,
          time: 1610430546400,
          condition: CONDITION.RAIN,
        },
      })
    ).toEqual({
      races: [
        {
          cars: {
            "1610430413534": "A",
            "1610430420760": "B",
            "1610430426534": "C",
            "1610430450383": "D",
          },
          fastest: [1610430413534],
          id: 1610430546152,
          location: "Nürburgring",
          order: [1610430426534, 1610430450383, 1610430413534, 1610430420760],
          session: 1610430495170,
          time: 1610430546400,
          condition: CONDITION.RAIN,
        },
      ],
    });
  });

  it("deletes existing race", () => {
    expect(
      raceReducer(currentState, {
        type: types.RACE_DELETE,
        payload: {
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
          condition: CONDITION.DRY,
        },
      })
    ).toEqual({ races: [] });
  });

  it("deletes races by session id", () => {
    expect(
      raceReducer(currentState, {
        type: types.RACE_DELETE_BY_SESSION_ID,
        payload: 1610430495170,
      })
    ).toEqual({ races: [] });
  });
});
