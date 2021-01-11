import React, { FC } from "react";
import BaseView from "../../components/BaseView";
import { applyTheme } from "../../store/actions/settingsActions";

import { List } from "react-native-paper";
import { connect } from "react-redux";
import BaseScrollView from "../../components/BaseScrollView";
import { THEMES } from "../../store/constants/settingsConstants";
import { useTranslation } from "react-i18next";

import style from "./Settings.style";

interface ISettings {
  theme: string;
  reduxApplyTheme: (s: {}) => void;
}

const Settings: FC<ISettings> = ({ theme, reduxApplyTheme }) => {
  const leftProps = {
    [THEMES.LIGHT]: undefined,
    [THEMES.DARK]: undefined,
  };
  const { t } = useTranslation();

  leftProps[theme] = {
    left: (props) => (
      <List.Icon {...props} icon="check" style={style.checkMark} />
    ),
  };

  return (
    <BaseView>
      <BaseScrollView>
        <List.Section>
          <List.Accordion
            title={t("text.settings.theme.title")}
            description={t("text.settings.theme.description")}
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          >
            <List.Item
              title={t("text.settings.theme.light")}
              {...leftProps.light}
              onPress={() => reduxApplyTheme(THEMES.LIGHT)}
            />

            <List.Item
              title={t("text.settings.theme.dark")}
              {...leftProps.dark}
              onPress={() => reduxApplyTheme(THEMES.DARK)}
            />
          </List.Accordion>
        </List.Section>
      </BaseScrollView>
    </BaseView>
  );
};

const mapStateToProps = ({ settingsReducer: { theme } }) => ({ theme });

const mapDispatchToProps = {
  reduxApplyTheme: applyTheme,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
