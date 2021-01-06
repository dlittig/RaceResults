import React from "react";
import { View } from "react-native";
import ThemeProvider from "../../provider/ThemeProvider/ThemeProvider";

import style from "./NavSeparator.style";

const NavSeparator = () => (
  <ThemeProvider.Consumer>
    {(theme) => (
      <View style={[style.separator, style[`${theme}Separator`]]}></View>
    )}
  </ThemeProvider.Consumer>
);

export default NavSeparator;
