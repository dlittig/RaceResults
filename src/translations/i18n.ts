import i18n from "i18next";
import translations from ".";
import { initReactI18next } from "react-i18next";
import * as ExpoLocalization from "expo-localization";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translations,
    lng: ExpoLocalization.locale,
    preload: ["en-US", "de-DE"],
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
