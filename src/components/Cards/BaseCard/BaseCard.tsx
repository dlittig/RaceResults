import React, { FC, ReactNode, ReactNodeArray } from "react";
import { Surface, TouchableRipple } from "react-native-paper";

import style from "./BaseCard.style";

type BaseCardType = {
  children: ReactNode | ReactNodeArray;
  onPress: () => void;
  onLongPress: () => void;
};

const BaseCard: FC<BaseCardType> = ({ children, onPress, onLongPress }) => (
  <TouchableRipple
    style={style.touchable}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <Surface style={style.container}>{children}</Surface>
  </TouchableRipple>
);

export default BaseCard;
