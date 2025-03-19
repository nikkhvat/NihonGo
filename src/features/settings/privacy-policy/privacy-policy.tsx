import SettingItem from "@/entities/profile/setting-item/setting-item";
import { isAndroid } from "@/shared/constants/platformUtil";
import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy: React.FC = () => {
  const { t, i18n: { language } } = useTranslation();

  const iosLink = `${process.env.API_URL}/${language}/privacy_policy`
  const androidLink = `${process.env.API_URL}/${language}/google/privacy_policy`

  return (
    <SettingItem
      text={t('settings.privacyPolicy')}
      link={isAndroid ? androidLink : iosLink}
    />
  );
};

export default PrivacyPolicy;
