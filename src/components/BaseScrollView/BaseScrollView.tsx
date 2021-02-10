import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import ThemeProvider from "../../provider/ThemeProvider/ThemeProvider";

import style from "./BaseScrollView.style";

type BaseScrollViewType = {
  spacer?: boolean;
};

const BaseScrollView: FC<BaseScrollViewType> = ({
  children,
  spacer = false,
}) => (
  <ThemeProvider.Consumer>
    {(theme) => (
      <ScrollView style={[style.container, style[`${theme}Container`]]}>
        {children}
        {spacer && <View style={style.spacer} />}
        {!spacer && <View style={style.miniSpacer} />}
      </ScrollView>
    )}
  </ThemeProvider.Consumer>
);

export default BaseScrollView;
