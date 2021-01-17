export interface IColors {
  primary: string;
  accent: string;
  card: string;
  cardHighlight: string;
  cardShadow: string;
  text: string;
  textInactive: string;
  background: string;
}

interface IThemeColors {
  DarkColors: IColors;
  LightColors: IColors;
}

const DarkColors: IColors = {
  primary: "#077aff",
  accent: "#077aff",
  card: "#222",
  cardHighlight: "#444444",
  cardShadow: "#3f3f3f",
  text: "#ffffff",
  textInactive: "#bbbbbb",
  background: "#222",
};

const LightColors: IColors = {
  primary: "#077aff",
  accent: "#077aff",
  card: "#ffffff",
  cardHighlight: "#eeeeee",
  cardShadow: "#000",
  text: "rgb(28, 28, 30)",
  textInactive: "#555",
  background: "#fff",
};

export const ThemeColors: IThemeColors = {
  DarkColors,
  LightColors,
};
