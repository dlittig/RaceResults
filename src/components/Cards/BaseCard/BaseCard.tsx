import React, { FC, ReactNode, ReactNodeArray } from "react";
import { Surface, TouchableRipple } from "react-native-paper";

import style from "./BaseCard.style";

type BaseCardType = {
  children: ReactNode | ReactNodeArray;
  onPress?: () => void;
  onLongPress?: () => void;
  touchable?: boolean;
};

const BaseCard: FC<BaseCardType> = ({
  children,
  onPress,
  onLongPress,
  touchable = true,
}) =>
  touchable ? (
    <TouchableRipple
      style={style.touchable}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Surface style={style.container}>{children}</Surface>
    </TouchableRipple>
  ) : (
    <Surface style={style.container}>{children}</Surface>
  );

export default BaseCard;
