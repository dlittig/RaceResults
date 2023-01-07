import React, { FC } from "react";
import { View } from "react-native";
import ThemeProvider from "../../provider/ThemeProvider/ThemeProvider";

import style from "./BaseView.style";

const BaseView: FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider.Consumer>
    {(theme) => (
      <View style={[style.container, style[`${theme}Container`]]}>
        {children}
      </View>
    )}
  </ThemeProvider.Consumer>
);

export default BaseView;
