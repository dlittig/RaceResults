import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { DataTable, ProgressBar } from "react-native-paper";

import { calculateScores } from "../../utils";
import { HOOK, useStore } from "../../hooks/store";
import BaseView from "../../components/BaseView/BaseView";
import BaseScrollView from "../../components/BaseScrollView/BaseScrollView";

type SessionResultType = {
  id: number;
  points: number;
};

const Scoreboard: FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const state = navigation?.dangerouslyGetState();
  const { session: sessionId } = state.routes[state.index].params;
  const { driversReducer, session } = useStore(
    [HOOK.DRIVERS, HOOK.SESSION_SPECIFIC],
    { sessionId }
  );

  const [doneLoading, setDoneLoading] = useState<boolean>(false);
  const [sessionResults, setSessionResults] = useState<
    Array<SessionResultType>
  >([]);

  useEffect(() => {
    const { finalOrder } = calculateScores(session);

    setSessionResults(finalOrder);

    // Finish loading animation
    setDoneLoading(true);
  }, []);

  return (
    <BaseView>
      {!doneLoading && (
        <View>
          <ProgressBar indeterminate={true} />
        </View>
      )}
      {doneLoading && (
        <BaseScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>#</DataTable.Title>
              <DataTable.Title>{t("text.scoreboard.driver")}</DataTable.Title>
              <DataTable.Title numeric>
                {t("text.scoreboard.points")}
              </DataTable.Title>
            </DataTable.Header>

            {sessionResults.map((res, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{index + 1}</DataTable.Cell>
                <DataTable.Cell>
                  {driversReducer.drivers[res.id].name}
                </DataTable.Cell>
                <DataTable.Cell numeric>{res.points}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </BaseScrollView>
      )}
    </BaseView>
  );
};

export default Scoreboard;
