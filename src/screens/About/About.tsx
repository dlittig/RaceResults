import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import BaseView from "../../components/BaseView";

import pack from "../../../package.json";
import style from "./About.style";
import { useTranslation } from "react-i18next";

const About: FC = () => {
  const { t } = useTranslation();

  return (
    <BaseView>
      <View style={style.container}>
        <Text>{t("about.greeting")}</Text>
        <Text>v{pack.version}</Text>
      </View>
    </BaseView>
  );
};

export default About;
