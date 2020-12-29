import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import BaseView from "../../components/BaseView";

import pack from "../../../package.json";
import style from "./About.style";

const About = () => (
  <BaseView>
    <View style={style.container}>
      <Text>Built with ❤️ by dlittig</Text>
      <Text>v{pack.version}</Text>
    </View>
  </BaseView>
);

export default About;
