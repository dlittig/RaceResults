import { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider/ThemeProvider";
import { usePathname, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { HOME_ROUTE } from "../../../app/index";
import { HOME_SETTINGS } from "../../../app/settings";
import getPaperTheme from "../../theme/paper";

const ThemedDrawer = () => {
  const theme = useContext(ThemeContext);

  return (
    <Drawer>
      <Drawer.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Sessions",
          title: "overview",
        }}
      />
      <Drawer.Screen
        name="settings" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Settings",
          title: "overview",
        }}
      />
    </Drawer>
  );
};

export default ThemedDrawer;
