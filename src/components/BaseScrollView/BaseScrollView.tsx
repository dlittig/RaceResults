import React, { ReactNode, ReactNodeArray, FC } from "react";
import { ScrollView } from "react-native";
import ThemeProvider from "../../provider/ThemeProvider/ThemeProvider";

import style from "./BaseScrollView.style";

const BaseScrollView: FC = ({ children }) => (
  <ThemeProvider.Consumer>
    {(theme) => (
      <ScrollView style={[style.container, style[`${theme}Container`]]}>
        {children}
      </ScrollView>
    )}
  </ThemeProvider.Consumer>
);

export default BaseScrollView;
