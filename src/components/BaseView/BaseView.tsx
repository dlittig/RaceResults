import React, { ReactNode, ReactNodeArray, FC } from "react";
import { View } from "react-native";

import style from "./BaseView.style";

type ScrollViewType = {
  children: ReactNode | ReactNodeArray;
};

const BaseView: FC<ScrollViewType> = ({ children }) => (
  <View style={style.container}>{children}</View>
);

export default BaseView;
