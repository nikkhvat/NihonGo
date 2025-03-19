import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, View, ScrollView, Platform, StatusBar } from "react-native";

import SettingsLanguage from "@/features/settings/settings-language/settings-language";
import SettingsStatistics from "@/features/settings/settings-statistics/settings-statistics";
import SettingsTheme from "@/features/settings/settings-theme/settings-theme";
import SettingsTransliterations from "@/features/settings/settings-transliterations/settings-language";
import JoinCommunity from "@/features/settings/join-community/join-community";
import SettingsSection from "@/entities/profile/setting-section/settings-section";
import SettingsHaptic from "@/features/settings/settings-haptic/settings-haptic";
import PrivacyPolicy from "@/features/settings/privacy-policy/privacy-policy";
import ContactSupport from "@/features/settings/contact-support/contact-support";
import RemoveData from "@/features/settings/remove-data/remove-data";
import SettingItem from "@/entities/profile/setting-item/setting-item";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import PageTitle from "@/shared/ui/page-title/page-title";
import { ROUTES } from "@/app/navigationTypes";

const SettingsPage: React.FC = () => {
  const isFocused = useIsFocused();
  
  const { t } = useTranslation();
  
  const { colors } = useThemeContext();
  const isJoinCommunity = false;

  const barStyle = colors._theme === "dark" ? "light-content" : "dark-content";

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(barStyle, true);
    }, [])
  );

  // useEffect(() => {
  //   StatusBar.setBarStyle(barStyle)
    
  //   console.log(`call is ${isFocused}`)
    
  //   if (isFocused) {
  //     StatusBar.setBackgroundColor(colors.BgSecondary)
  //   } else {
  //     StatusBar.setBackgroundColor(colors.BgPrimary)
  //   }
  // }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.BgPrimary }} >
      <PageTitle isSaveArea isKey>{ROUTES.SETTINGS_ROOT}</PageTitle>
      
      <ScrollView contentContainerStyle={styles.scroll}>
        <SettingsSection>
          <SettingsStatistics />
          <SettingsHaptic />
          <SettingsTheme />
        </SettingsSection>

        <SettingsSection>
          <SettingsLanguage />
          <SettingsTransliterations />
        </SettingsSection>

        <SettingsSection>
          <PrivacyPolicy />
          <ContactSupport />
        </SettingsSection>

        {isJoinCommunity && (
          <SettingsSection>
            <JoinCommunity />
          </SettingsSection>
        )}

        <SettingsSection>
          <RemoveData />
          <SettingItem
            text={t('settings.sourceCode.title')}
            subText={t('settings.sourceCode.githubRepository')}
            link={process.env.GITHUB_REPOSITORY}
          />
          <SettingItem
            isLast
            text={t('settings.version')}
            subText={`${process.env.VERSION} (${Platform.OS})`}
          />
        </SettingsSection>
      </ScrollView>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  scroll: {
    gap: 16,
    paddingBottom: 16
  },
  title: {
    marginLeft: 20,
  },
});
