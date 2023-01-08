import { Session } from "../store/reducers/sessionsReducer";
import { CONDITION, Race } from "../store/reducers/raceReducer";
import Clipboard from "expo-clipboard";
import { ToastAndroid } from "react-native";
import { store } from "../store/Store";
import { RootReducerType } from "../store/reducers";

export const humanReadableDate = (time: number): string => {
  const date: Date = new Date(time);
  return `${padd(date.getHours())}:${padd(date.getMinutes())} ${padd(
    date.getDate()
  )}.${padd(date.getMonth() + 1)}.${date.getFullYear()}`;
};

export const padd = (elem: number): string =>
  elem < 10 ? `0${elem}` : `${elem}`;

export const getPointsMap = (
  scheme: "gapped" | "linear",
  participants: number
): Record<number, number> => {
  const pointsMap: Record<number, number> = {};

  if (scheme === "gapped") {
    for (let i = 0; i < participants; i++) {
      if (i === 0) {
        // If first element, give bonus point
        pointsMap[i + 1] = participants + 1 - i;
        continue;
      }

      pointsMap[i + 1] = participants - i;
    }
  }

  if (scheme === "linear") {
    for (let i = 0; i < participants; i++) {
      pointsMap[i + 1] = participants - i;
    }
  }

  return pointsMap;
};

const pointsForFastestRound = (race: Race, driverId: number): number =>
  race.fastest?.includes(driverId) ? 1 : 0;

type RaceResultsType = {
  [x: number]: { id: number; points: number };
};

type ScoresType = {
  results: RaceResultsType;
  finalOrder: { id: number; points: number }[];
  races: Race[];
  pointsMap: Record<number, number>;
};

export const calculateScores = (s: Session): ScoresType => {
  const state: RootReducerType = store.getState();
  // Get all races of this session
  const races = state.raceReducer.races.filter((race) => race.session === s.id);

  // Create datastructure that contains the id and the earned points
  //const drivers = {};
  //session.participants.forEach((driver: number) => (drivers[driver] = 0));

  // Create a "position to points" map based on the selected scheme in the session
  const pointsMap = getPointsMap(s.pointScheme, s.participants.length);

  // Iterate through all the races and accumulate all the values
  const results: RaceResultsType = {};

  races.forEach((race) => {
    Object.values(race.order).forEach((driverId: number, position) => {
      // If result hashmap does not contain driver
      if (typeof results[driverId] === "undefined") {
        results[driverId] = {
          id: driverId,
          points:
            pointsMap[position + 1] + pointsForFastestRound(race, driverId),
        };
      } else {
        results[driverId].points +=
          pointsMap[position + 1] + pointsForFastestRound(race, driverId);
      }
    });
  });

  // Transform result into sorted order
  const finalOrder: { id: number; points: number }[] = Object.values(
    results
  ).sort((a, b) => b.points - a.points);

  return { finalOrder, races, results, pointsMap };
};

export const exportSession = (s: number): void => {
  const state: RootReducerType = store.getState();
  const session = state.sessionsReducer.sessions.filter(
    (item) => item.id === s
  )[0];

  const { finalOrder, races, pointsMap } = calculateScores(session);

  let resultString = `Name: ${session.label}\n\n`;

  races.forEach((race: Race) => {
    let weather = "";
    switch (race.condition) {
      case CONDITION.DRY:
        weather = "Dry";
        break;
      case CONDITION.NIGHT:
        weather = "Night";
        break;
      case CONDITION.RAIN:
        weather = "Rain";
        break;
    }

    resultString += `Track: ${race.location} (${weather})\n\n`;

    // Order and points
    Object.values(race.order).forEach((driverId, index) => {
      const car =
        typeof race.cars[driverId] !== "undefined" &&
        race.cars[driverId].length > 0
          ? `[${race.cars[driverId]}]`
          : "";

      resultString += `${index + 1}. ${
        state.driversReducer.drivers[driverId].name
      } ${car} (${
        pointsMap[index + 1] + pointsForFastestRound(race, driverId)
      } Points${pointsForFastestRound(race, driverId) === 1 ? " *" : ""})\n`;
    });

    resultString += "\n";
  });

  // Now apply the final score
  resultString += "\nSCORES:\n";

  finalOrder.forEach((res, index) => {
    resultString += `${index + 1}. ${
      state.driversReducer.drivers[res.id].name
    } (${res.points} Points)\n`;
  });

  resultString += `\nCongrats ${
    state.driversReducer.drivers[finalOrder[0].id].name
  }!`;

  Clipboard.setString(resultString);
  ToastAndroid.showWithGravityAndOffset(
    "Copied results to clipboard",
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    100
  );
};
