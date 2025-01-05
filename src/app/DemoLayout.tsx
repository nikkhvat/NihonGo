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
import { fonts } from "@/shared/typography";
import { lightTheme } from "@/shared/themes/light";
import WelcomePage from "@/pages/welcome/welcome";
import { ROUTES } from "./navigationTypes";

import LearningList from "@/pages/education/learning/learning-list-page/learning-list-page";
import PracticeWelcomePage from "@/pages/education/practice/practice-welcome/practice-welcome";

import LessonPage from "@/pages/education/learning/lesson-page/lesson-page";
import EducationResultPage from "@/pages/education/practice/education-result-page/education-result-page";
import EducationWordGamePage from "@/pages/education/practice/education-quiz-word-game/index";
import TestingPage from "@/pages/education/practice/education-quiz-testing";
import KanaTableChoiceLettersPage from "@/pages/kana/kana-table-choice-letters-page/kana-table-choice-letters-page";

import SettingsPage from "@/pages/settings/settings-page";
import KanaLetterPage from "@/pages/kana/kana-letter-page/kana-letter-page";
import KanaTableListPage from "@/pages/kana/kana-table-list-page/kana-table-list-page";

import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator, TransitionPresets } from '@react-navigation/bottom-tabs';
import { TabBarButton } from "./BottomTabNavigator";
import PageTitle from "@/shared/ui/page-title/page-title";
import { isAndroid } from "@/shared/constants/platformUtil";

const screen = 1 // SCREEN NUMBER
// 1 - Choose Practice Mode

export const BottomTabs = createBottomTabNavigator({
  tabBar: (props) => <TabBarButton {...props} />,
  screens: {
    [ROUTES.KANA_TABLE_ROOT]: KanaTableListPage,
    [ROUTES.LEARNING_ROOT]: LearningList,
    [ROUTES.PRACTICE_ROOT]: PracticeWelcomePage,
    [ROUTES.SETTINGS_ROOT]: SettingsPage,
  },
  screenOptions: {
    header: (props) => <PageTitle isSaveArea isKey>{props.route.name}</PageTitle>,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    [ROUTES.HOME]: {
      screen: BottomTabs,
      options: {
        headerShown: false,
      },
    },

    [ROUTES.PRACTICE_TESTING]: TestingPage,
    [ROUTES.PRACTICE_WORD_GAME]: EducationWordGamePage,
    [ROUTES.LESSON_PAGE]: LessonPage,
    [ROUTES.RESULTS]: EducationResultPage,

    [ROUTES.KANA_INFO]: KanaLetterPage,
    [ROUTES.KANA_SELECT]: KanaTableChoiceLettersPage,
  },
});

export const RootNavigation = createStaticNavigation(RootStack);

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

const DemoLayout = () => {
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

  // useEffect(() => {
  //   if (screen === 1) {
  //     navigation.navigate(ROUTES.PRACTICE_ROOT)
  //   }
  // }, [screen])

  if (isAndroid()) {
    SystemUI.setBackgroundColorAsync(colors.BgPrimary);
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
      <StatusBar
        barStyle={barStyle}
        backgroundColor={colors.BgPrimary}
      />

      <WelcomePage />
      <RootNavigation theme={currentTheme} />
    </>
  );
};

export default DemoLayout;