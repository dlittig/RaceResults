module.exports = {
  preset: "jest-expo",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|@react-native" +
      "|react-native-paper" +
      "|react-native-iphone-x-helper" +
      "|redux-persist-expo-filesystem" +
      "|expo-file-system" +
      "|expo-localization" +
      "|@unimodules" +
      ")/)",
  ],
};
