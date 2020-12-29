import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import BaseView from "../../components/BaseView";
import { Text, Button } from "react-native-paper";
import { RACE_CURCUIT } from "../../store/constants/racesConstants";

import style from "./RandomMap.style";

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
    }

    setCurrentTrack({
      id: random,
      track: RACE_CURCUIT[random],
    });
  };

  useEffect(() => {
    getRandomTrack();
  }, []);

  return (
    <BaseView>
      <View style={style.container}>
        <Fontisto name="map" size={64} color={"#555"} />
        {currentTrack === null && (
          <Text style={style.text}>Getting random map...</Text>
        )}
        {currentTrack !== null && (
          <Text style={style.text}>{currentTrack?.track}</Text>
        )}
        <Button
          title="Generate"
          mode="contained"
          onPress={() => getRandomTrack()}
        >
          <MaterialCommunityIcons name="sync" size={16} />
          {` Generate`}
        </Button>
      </View>
    </BaseView>
  );
};

export default RandomMap;
