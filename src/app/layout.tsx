import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import { useTranslation } from "react-i18next";
import { StatusBar } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { darkTheme } from "@/shared/themes/dark";

import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from "@/shared/fonts/load-fonts";
import { isAndroid } from "@/shared/constants/platformUtil";
import { RootNavigation } from "./routes";
import { fonts } from "@/shared/typography";
import { lightTheme } from "@/shared/themes/light";
import WelcomePage from "@/pages/welcome/welcome";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

const Layout = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const { colors } = useThemeContext();
  const { i18n } = useTranslation();

  useEffect(() => {
    loadFonts({
      successful: async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
      },
      error: (e) => {
        console.warn(e)
      },
      finallyCallback: async () => {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      },
    });
  }, []);

  useEffect(() => {
    const loadLang = async () => {
      try {
        const savedLang = await AsyncStorage.getItem("lang");
        if (savedLang) {
          i18n.changeLanguage(savedLang);
        }
      } catch (error) {
        return error;
      }
    };

    loadLang();
  }, [i18n]);

  if (isAndroid) {
    SystemUI.setBackgroundColorAsync("#1E1E1E");
    NavigationBar.setBackgroundColorAsync(colors.BgPrimary);
  }

  if (!appIsReady) {
    return null;
  }

  const currentTheme = colors._theme === "dark"
    ? { dark: true, colors: darkTheme, fonts: fonts }
    : { dark: false, colors: lightTheme, fonts: fonts };

  const barStyle = colors._theme === "dark" ? "light-content" : "dark-content";

  return (
    <>
      <StatusBar barStyle={barStyle} translucent={true} backgroundColor="transparent" />

      <WelcomePage />
      <RootNavigation theme={currentTheme} />
    </>
  );
};

export default Layout;