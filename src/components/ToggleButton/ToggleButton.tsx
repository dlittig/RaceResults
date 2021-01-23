import React from "react";
import { Button } from "react-native-paper";
import { ToggleContext } from "./Container";

import style from "./ToggleButton.style";

type ToggleButtonProps = {
  label: string;
  value: string;
};

const ToggleButton = ({ label, value }: ToggleButtonProps) => (
  <ToggleContext.Consumer>
    {({ value: oldValue, onChange }) => (
      <Button
        style={style.button}
        mode={oldValue === value ? "contained" : "outlined"}
        onPress={() => onChange(value)}
      >
        {label}
      </Button>
    )}
  </ToggleContext.Consumer>
);

export default ToggleButton;
