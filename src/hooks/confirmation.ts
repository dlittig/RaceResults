import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export const useConfirmation = (): {
  setDisableConfirmation: (value: boolean) => void;
} => {
  const disabled = useRef<boolean>(false);
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (disabled.current) return;
      // Prevent default behavior of leaving the screen
      e.preventDefault();

      // Prompt the user before leaving the screen
      Alert.alert(t("dialogs.leave.title"), t("dialogs.leave.content")!, [
        {
          text: t("actions.stay")!,
          style: "cancel",
          onPress: () => undefined,
        },
        {
          text: t("actions.leave")!,
          style: "destructive",
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    });
  }, []);

  return {
    setDisableConfirmation: (val: boolean) => (disabled.current = val),
  };
};
