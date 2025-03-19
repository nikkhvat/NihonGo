import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { SectionList, StatusBar, StyleSheet, Text, View } from "react-native";

import EducationKanaTable from "@/features/education/education-kana-table/education-kana-table";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Alphabet, KanaAlphabet } from "@/shared/constants/kana";
import { LettersKeys } from "@/shared/data/lettersTable";
import { RootStackParamList } from "@/app/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import Switcher from "@/shared/ui/switcher/switcher";
import { ROUTES } from "@/app/navigationTypes";
import { Typography } from "@/shared/typography";
import { isAndroid, isIOS } from "@/shared/constants/platformUtil";
import { getTypeById } from "@/shared/helpers/kana-letter";
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';

import PageTitle from "@/shared/ui/page-title/page-title";

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.KANA_TABLE_ROOT>;

const MemoizedEducationKanaTable = React.memo(EducationKanaTable);
interface KanaInfoProps {
  route: RouteProp<RootStackParamList, typeof ROUTES.KANA_INFO>;
  navigation: StackNavigationProp<RootStackParamList, typeof ROUTES.KANA_INFO>;
}

export const KanaTableListPage: React.FC<KanaInfoProps> = () => {
  const { colors } = useThemeContext();  

  const navigation = useNavigation<ScreenNavigationProp>();

  const barStyle = colors._theme === "dark" ? "light-content" : "dark-content";

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(barStyle, true);
    }, [])
  );
  
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    })
  }, [navigation])

  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<KanaAlphabet>(KanaAlphabet.Hiragana);

  const openModal = useCallback((id: LettersKeys) => {
    const modalTitle = `${activeTab === KanaAlphabet.Hiragana ? t("kana.hiragana") : t("kana.katakana")} (${t(getTypeById(id))})`;

    navigation.navigate(ROUTES.KANA_INFO, {
      id: id,
      kana: activeTab,
      title: modalTitle
    });
  }, [activeTab, navigation, t]);

  const sections = useMemo(
    () => [
      { title: t("kana.basic"), data: ["base"] },
      { title: t("kana.dakuon"), data: ["dakuon"] },
      { title: t("kana.handakuon"), data: ["handakuon"] },
      { title: t("kana.yoon"), data: ["yoon"] },
    ],
    [t]
  );

  return (
    <>
    <PageTitle isSaveArea isKey>{ROUTES.KANA_TABLE_ROOT}</PageTitle>
    
    <View style={{ flex: 1, backgroundColor: colors.BgPrimary }} >
      {isIOS && <View style={[styles.lineContainer, { top: 92, backgroundColor: colors.BorderDefault }]} />}
      
      <View style={{ paddingBottom: isAndroid ? 20 : 0, paddingHorizontal: 20 }}>
        <Switcher<KanaAlphabet>
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          options={[
            KanaAlphabet.Hiragana, 
            KanaAlphabet.Katakana
          ]}
          translate={[
            t("kana.hiragana"),
            t("kana.katakana"),
          ]}
        />
      </View>

      <SectionList
        sections={sections}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <React.Suspense fallback={<View />}>
            <MemoizedEducationKanaTable
              type={item as Alphabet}
              kana={activeTab}
              onClick={openModal}
              last={item === "yoon"}
            />
          </React.Suspense>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={[styles.nameContainer, { backgroundColor: colors.BgPrimary }]}>
            <Text style={[Typography.boldH3, { color: colors.TextPrimary }]}>{title}</Text>
          </View>
        )}
      />
    </View>
    </>
  );
};

export default KanaTableListPage;


const styles = StyleSheet.create({
  title: {
    marginLeft: 20,
  },
  nameContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  lineContainer: {
    width: "100%",
    height: 1,
    position: "absolute",
    zIndex: 999,
  },
});