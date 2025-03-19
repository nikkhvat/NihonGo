import AsyncStorage from "@react-native-async-storage/async-storage";
import SettingItem from "@/entities/profile/setting-item/setting-item";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

import { clearStateProfile } from "@/pages/settings/model/slice";
import { clearStateLessons } from "@/pages/education/learning/model/slice";
import { clearStateKana } from "@/pages/kana/kana-table-choice-letters-page/model/slice";
import { clearStateStatistics } from "@/pages/kana/kana-table-list-page/model/slice";
import { useHaptic } from "@/shared/helpers/haptic";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, ROUTES } from "@/app/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";

type ProfileNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.SETTINGS_ROOT>;

const RemoveData: React.FC = () => {
  const { t, i18n: { language } } = useTranslation();
  const { triggerHaptic } = useHaptic()

  const navigation = useNavigation<ProfileNavigationProp>();

  const dispatch = useAppDispatch();

  const kanaState = useAppSelector((state) => state.kana);
  const lessonsState = useAppSelector((state) => state.lessons);
  const profileState = useAppSelector((state) => state.profile);
  const statisticsState = useAppSelector((state) => state.statistics);

  const stateSize = new Blob([
    JSON.stringify(kanaState),
    JSON.stringify(lessonsState),
    JSON.stringify(profileState),
    JSON.stringify(statisticsState),
  ]).size;

  const langSizes = {
    en: ["B", "KB", "MB", "GB"],
    ru: ["Б", "КБ", "МБ", "ГБ"],
    de: ["B", "KB", "MB", "GB"],
    es: ["B", "KB", "MB", "GB"],
    fr: ["o", "Ko", "Mo", "Go"],
    it: ["B", "KB", "MB", "GB"],
    pt: ["B", "KB", "MB", "GB"],
    ch: ["字节", "千字节", "兆字节", "吉字节"],
    ko: ["바이트", "킬로바이트", "메가바이트", "기가바이트"],
  }

  function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0";

    const k = 1024;
    const sizes = langSizes[language as "en"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
  }

  const eraseData = () => {
    dispatch(clearStateProfile());
    dispatch(clearStateLessons());
    dispatch(clearStateStatistics());
    dispatch(clearStateKana());

    // Clean LocalStorage
    AsyncStorage.removeItem("isWelcome");
    AsyncStorage.removeItem("lang");
    AsyncStorage.removeItem("transliteration");
    AsyncStorage.removeItem("app_theme");

    // Go to kana table
    navigation.navigate(ROUTES.KANA_TABLE_ROOT)
  }

  const confirmationCloseAlert = () =>
    Alert.alert(t('settings.eraseData.title'), t('settings.eraseData.subtitle'), [
      { text: t('alert.cancel'), style: 'cancel' },
      {
        text: t('alert.confirm'), onPress: () => {
          triggerHaptic(true);
          eraseData();
        }
      },
    ]);

  const dataTakesUp = t('settings.eraseData.dataTakesUp') + ': ' + formatBytes(stateSize);

  return (
    <SettingItem
      text={t('settings.eraseData.button')}
      subText={dataTakesUp}
      onClick={confirmationCloseAlert}
    />
  );
};

export default RemoveData;