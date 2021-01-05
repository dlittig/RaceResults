import React, { ReactNode, ReactNodeArray, FC } from "react";
import { View } from "react-native";
import ThemeProvider from "../../provider/ThemeProvider/ThemeProvider";

import style from "./BaseView.style";

type ScrollViewType = {
  children: ReactNode | ReactNodeArray;
};

const BaseView: FC<ScrollViewType> = ({ children }) => (
  <ThemeProvider.Consumer>
    {(theme) => (
      <View style={[style.container, style[`${theme}Container`]]}>
        {children}
      </View>
    )}
  </ThemeProvider.Consumer>
);

export default BaseView;
