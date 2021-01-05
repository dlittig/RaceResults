import { de_DE } from "./de-DE";
import { en_US } from "./en-US";

export const getResources = () => ({
  ...de_DE,
  ...en_US,
})

export default {
  "de_DE": de_DE,
  "en_US": en_US,
};
