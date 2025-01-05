import AsyncStorage from "@react-native-async-storage/async-storage";
import SafeLayout from "@/app/layouts/safeLayout";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";

import practiceImage from "@/shared/assets/icon.png";
import { languageList, ShortLanguage } from "@/shared/constants/language";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import CountryFlag from "react-native-country-flag";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { useTranslation } from "react-i18next";
import { updateLessons } from "../education/learning/model/slice";
import { toggleWelcomePage } from "../settings/model/slice";

import { useHaptic } from "@/shared/helpers/haptic";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";

interface LanguageItemProps {
  langKey: ShortLanguage;
  name: string
  active: ShortLanguage | null;
  onClick: (key: ShortLanguage) => void;
}

const LanguageItem: React.FC<LanguageItemProps> = ({ active, langKey, name, onClick }) => {
  const { triggerHaptic } = useHaptic();
  const { colors } = useThemeContext();

  return (
    <Pressable
      style={({ pressed }) => [styles.languageItem, {
        borderColor: colors.BorderDefault,
        backgroundColor: active === langKey ?
          pressed ? colors.BgAccentPrimaryPressed : colors.BgAccentPrimary :
          pressed ? colors.BgPrimaryPressed : colors.BgPrimary
      }]}
      onPress={() => {
        triggerHaptic();
        onClick(langKey)
      }}
    >
      <View style={styles.languageLeft} >
        <CountryFlag
          style={[styles.languageFlag, { borderColor: active === langKey ? colors.BgAccentPrimary : colors.BorderDefault }]}
          isoCode={langKey === ShortLanguage.EN ? "gb" : langKey === ShortLanguage.CH ? "cn" : langKey === ShortLanguage.KO ? "kr" : langKey}
          size={24}
        />

        <Text style={[Typography.semiBoldH4, { color: active === langKey ? colors.TextContrastSecondary : colors.TextPrimary, textAlignVertical: "center" }]} >{name}</Text>
      </View>

      {active === langKey && <Icon name={"check-bold"} size={16} color={colors.IconContrast} />}
    </Pressable>
  )
};

const WelcomePage: React.FC = () => {
  const { colors } = useThemeContext();
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isWelcomePage = useAppSelector((state) => state.profile?.isWelcomePage);

  const setLanguage = async (lang: ShortLanguage) => {
    if (!lang) return

    i18n.changeLanguage(lang);
    dispatch(updateLessons({ lang: lang }));
    await AsyncStorage.setItem("lang", lang);
  }

  const confirmLanguage = async () => dispatch(toggleWelcomePage());

  if (!isWelcomePage) return null;

  return (
    <SafeLayout style={[styles.page, { backgroundColor: colors.BgPrimary }]} >
      <View style={styles.header} >
        <Image
          style={[styles.logo, { borderColor: colors.BorderDefault }]}
          source={practiceImage}
        />
        <Text style={[Typography.boldH1, styles.title, { color: colors.TextPrimary }]} >{t("common.welcome")}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} >
        {languageList.map(item =>
          <LanguageItem
            key={item.key}
            langKey={item.key}
            name={item.title}
            active={i18n.language as ShortLanguage}
            onClick={setLanguage}
          />)}
      </ScrollView>
      
      <View style={styles.bottomButton} >
        <Text style={[styles.tooltip, { color: colors.TextSecondary }, Typography.regularCaption]} >
          *{t("settings.changeLanguageCaption")}
        </Text>

        <PrimaryButton
          onClick={confirmLanguage}
          text={t("alert.confirm")}
        /> 
      </View>
    </SafeLayout>
  )
}

const styles = StyleSheet.create({
  page: {
    position: 'absolute',
    zIndex: 100,
    width: "100%",
    height: "100%",
    flex: 1,
  },
  header: {
    marginTop: 24,
    marginBottom: 24,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: {
    textAlign: "center"
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 24,
    borderWidth: 1,
  },
  languageItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    height: 50,
  },
  languageFlag: {
    borderRadius: 4,
    width: 38,
    borderWidth: 1
  },
  languageLeft: {
    flexDirection: "row",
    gap: 10,
  },
  bottomButton: {
    // paddingTop: 30
  },
  tooltip: {
    textAlign: "center",
    marginBottom: 8,
    marginTop: 8
  }
})

export default WelcomePage;