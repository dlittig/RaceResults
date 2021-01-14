module.exports = {
  preset: "jest-expo",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
      "|react-native-paper" +
      "|react-native-iphone-x-helper" +
      "|redux-persist-expo-filesystem" +
      "|expo-file-system" +
      "|expo-localization" +
      "|@unimodules" +
      ")/)",
  ],
};
