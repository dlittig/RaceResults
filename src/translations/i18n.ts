import i18n from "i18next";
import translations from ".";
import { currentLocale } from "../utils";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translations,
    lng: currentLocale,
    preload: ["en_US", "de_DE"],
    fallbackLng: "en_US",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
