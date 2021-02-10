import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "react-native-paper";

import styles from "./Error.style";

const Error: FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>{t("error.component")}</Text>
    </View>
  );
};

export default Error;
