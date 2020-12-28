import { Session } from "../store/reducers/sessionsReducer";
import { Race } from "../store/reducers/raceReducer";
import Clipboard from "expo-clipboard";
import { ToastAndroid } from "react-native";
import { store } from "../store/Store";

export const humanReadableDate = (time: number) => {
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
) => {
  const pointsMap = {};

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

export const calculateScores = (s: Session) => {
  const state = store.getState();
  // Get all races of this session
  const races = state.raceReducer.races.filter((race) => race.session === s.id);

  // Create datastructure that contains the id and the earned points
  //const drivers = {};
  //session.participants.forEach((driver: number) => (drivers[driver] = 0));

  // Create a "position to points" map based on the selected scheme in the session
  const pointsMap = getPointsMap(s.pointScheme, s.participants.length);

  // Iterate through all the races and accumulate all the values
  const results: { [x: number]: { id: number; points: number } } = {};

  races.forEach((race) => {
    Object.values(race.order).forEach((driverId: number, position) => {
      // If result hashmap does not contain driver
      if (typeof results[driverId] === "undefined") {
        results[driverId] = {
          id: driverId,
          points: pointsMap[position + 1],
        };
      } else {
        results[driverId].points += pointsMap[position + 1];
      }
    });
  });

  // Transform result into sorted order
  const finalOrder: { id: number; points: number }[] = Object.values(
    results
  ).sort((a, b) => a.points < b.points);

  return { finalOrder, races, results, pointsMap };
};

export const exportSession = (s: Session) => {
  const state = store.getState();

  const { finalOrder, races, pointsMap } = calculateScores(s);

  let resultString = `Name: ${s.label}\n\n`;

  races.forEach((race: Race, index: number) => {
    resultString += `Track: ${race.location}\n`;

    // Order and points
    Object.values(race.order).forEach((driverId, index) => {
      resultString += `${index + 1}. ${
        state.driversReducer.drivers[driverId].name
      } (${pointsMap[index + 1]} Points)\n`;
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
  } 🎉`;

  Clipboard.setString(resultString);
  ToastAndroid.showWithGravity(
    "Copied results to clipboard",
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM
  );
};
