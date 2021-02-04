import React, { FC, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { List } from "react-native-paper";
import { useTranslation } from "react-i18next";

import BaseView from "../../components/BaseView";
import BaseScrollView from "../../components/BaseScrollView";
import { applyTheme } from "../../store/actions/settingsActions";
import { THEMES } from "../../store/constants/settingsConstants";
import { useStore, HOOK } from "../../hooks/store";

import style from "./Settings.style";

type LeftPropsType = {
  [x: string]: { left: ((props: any) => ReactNode) | undefined };
};

const Settings: FC = () => {
  const { settingsReducer } = useStore([HOOK.SETTINGS], {});
  const dispatch = useDispatch();
  const leftProps: LeftPropsType = {
    [THEMES.LIGHT]: { left: undefined },
    [THEMES.DARK]: { left: undefined },
  };
  const { t } = useTranslation();

  leftProps[settingsReducer.theme] = {
    left: (props: Record<string, unknown>) => (
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
              {...leftProps[THEMES.LIGHT]}
              onPress={() => dispatch(applyTheme(THEMES.LIGHT))}
            />

            <List.Item
              title={t("text.settings.theme.dark")}
              {...leftProps[THEMES.DARK]}
              onPress={() => dispatch(applyTheme(THEMES.DARK))}
            />
          </List.Accordion>
        </List.Section>
      </BaseScrollView>
    </BaseView>
  );
};

export default Settings;
