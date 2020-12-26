import React, { ReactNode, ReactNodeArray, FC } from "react";
import { ScrollView } from "react-native";

import style from "./BaseScrollView.style";

type ScrollViewType = {
  children: ReactNode | ReactNodeArray;
};

const BaseScrollView: FC<ScrollViewType> = ({ children }) => (
  <ScrollView style={style.container}>{children}</ScrollView>
);

export default BaseScrollView;
