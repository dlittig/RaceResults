import React, { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { Text } from "react-native-paper";
import { RACE_CURCUIT } from "../../store/constants/racesConstants";

type CurrentTrackType = {
  id: number;
  track: string;
} | null;

const RandomMap = () => {
  const [currentTrack, setCurrentTrack] = useState<CurrentTrackType>(null);

  const getRandomTrack = () => {
    const currentTrackId = currentTrack?.id;
    setCurrentTrack(null);

    // Get random track that isnt the previous one
    let random = Math.floor(Math.random() * RACE_CURCUIT.length);
    while (random === currentTrackId) {
      random = Math.floor(Math.random() * RACE_CURCUIT.length);
      console.log("in while");
    }

    console.log(`Got random track ${random}`);

    setCurrentTrack({
      id: random,
      track: RACE_CURCUIT[random],
    });
  };

  useEffect(() => {
    getRandomTrack();
    console.log("First render");
  }, []);

  return (
    <View>
      <Text>Random map</Text>
      <Button title="Regenerate" onPress={() => getRandomTrack()}>Regenrate</Button>
      {currentTrack === null && <Text>Getting random map</Text>}
      {currentTrack !== null && <Text>{currentTrack?.track}</Text>}
    </View>
  );
};

export default RandomMap;
