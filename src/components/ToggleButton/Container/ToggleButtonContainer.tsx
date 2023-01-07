import React, { FC } from "react";
import { View } from "react-native";

import style from "./ToggleButtonContainer.style";

export const ToggleContext = React.createContext<ToggleButtonContainerType>({
  value: "",
  onChange: () => undefined,
});

type ToggleButtonContainerType = {
  value: string;
  onChange: (value: string) => void;
};

const ToggleButtonContainer: FC<
  ToggleButtonContainerType & { children: React.ReactNode }
> = ({ children, value, onChange }) => {
  return (
    <ToggleContext.Provider value={{ value, onChange }}>
      <View style={style.container}>{children}</View>
    </ToggleContext.Provider>
  );
};

export default ToggleButtonContainer;
