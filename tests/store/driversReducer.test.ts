import {
  driversReducer,
  DriversState,
} from "../../src/store/reducers/driversReducer";
import * as types from "../../src/store/constants/driversConstants";

describe("drivers reducer", () => {
  let currentState: DriversState = { drivers: {} };

  it("should return the initial state", () => {
    expect(driversReducer(undefined, {})).toEqual({
      drivers: {},
    });
  });

  it("should add driver", () => {
    expect(
      driversReducer(undefined, {
        type: types.DRIVERS_ADD,
        payload: {
          color: "#d73964",
          id: 1610430413534,
          name: "David",
        },
      })
    ).toEqual({
      drivers: {
        1610430413534: {
          color: "#d73964",
          id: 1610430413534,
          name: "David",
        },
      },
    });
  });

  it("should update driver", () => {
    currentState = {
      drivers: {
        1610430413534: {
          color: "#d73964",
          id: 1610430413534,
          name: "David",
        },
      },
    };

    expect(
      driversReducer(currentState, {
        type: types.DRIVERS_UPDATE,
        payload: {
          color: "#70b949",
          id: 1610430413534,
          name: "David",
        },
      })
    ).toEqual({
      drivers: {
        1610430413534: {
          color: "#70b949",
          id: 1610430413534,
          name: "David",
        },
      },
    });
  });

  it("deletes existing driver", () => {
    expect(
      driversReducer(currentState, {
        type: types.DRIVERS_DELETE,
        payload: {
          color: "#d73964",
          id: 1610430413534,
          name: "David",
        },
      })
    ).toEqual({ drivers: {} });
  });
});
