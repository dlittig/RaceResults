import React, { FC } from "react";
import BaseView from "../../components/BaseView";
import { setSettings } from "../../store/actions/settingsActions";

import { List } from "react-native-paper";
import { connect } from "react-redux";
import BaseScrollView from "../../components/BaseScrollView";
import { THEMES } from "../../store/constants/settingsConstants";

interface ISettings {
  theme: string;
  reduxSetSettings: (s: {}) => void;
}

const Settings: FC<ISettings> = ({ theme, reduxSetSettings }) => {
  const leftProps = {
    [THEMES.LIGHT]: undefined,
    [THEMES.DARK]: undefined,
  };

  leftProps[theme] = {
    left: (props) => (
      <List.Icon {...props} icon="check" style={{ height: 15 }} />
    ),
  };

  return (
    <BaseView>
      <BaseScrollView>
        <List.Section>
          <List.Accordion
            title="Display theme"
            description="Adjust how the appearance of the app should look like"
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          >
            <List.Item
              title="Light"
              {...leftProps.light}
              onPress={() => reduxSetSettings({ theme: THEMES.LIGHT })}
            />

            <List.Item
              title="Dark"
              {...leftProps.dark}
              onPress={() => reduxSetSettings({ theme: THEMES.DARK })}
            />
          </List.Accordion>
        </List.Section>
      </BaseScrollView>
    </BaseView>
  );
};

const mapStateToProps = ({ settingsReducer: { theme } }) => ({ theme });

const mapDispatchToProps = {
  reduxSetSettings: setSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
