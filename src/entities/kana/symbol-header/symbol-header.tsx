import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import {
  ILetter,
  dakuonFlatLettersId,
  handakuonFlatLettersId,
  yoonFlatLettersId,
} from "@/shared/data/lettersTable";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { StatisticLevel } from "@/pages/kana/kana-table-list-page/model/types";


interface SymbolHeaderProps {
  kana: KanaAlphabet;
  letter: ILetter;

  hideTitle?: boolean;
  bottomTitle?: boolean;

  indicatorColor?: StatisticLevel | null;
}

const SymbolHeader: React.FC<SymbolHeaderProps> = ({
  kana,
  letter,
  hideTitle,
  bottomTitle,
  indicatorColor,
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const { getRomanji } = useGetRomanji();

  const getTypeById = (id: any) => {
    if (yoonFlatLettersId.includes(id)) return t("kana.yoon");
    if (handakuonFlatLettersId.includes(id)) return t("kana.handakuon");
    if (dakuonFlatLettersId.includes(id)) return t("kana.dakuon");

    return t("kana.basic");
  };

  const title = {
    hiragana: t("kana.hiragana"),
    katakana: t("kana.katakana"),
  };

  const getIndicatorColor = (indicator?: StatisticLevel | null) => {
    switch (indicator) {
      case StatisticLevel.Green: return colors.BgSuccess
      case StatisticLevel.Yellow: return colors.BgWarning
      case StatisticLevel.Red: return colors.BgDanger
      default:
        return "transparent"
    }
  }

  return (
    <View style={styles.titleContainer}>
      <View style={[styles.cellIndicator, { backgroundColor: getIndicatorColor(indicatorColor) }]} ></View>

      {!hideTitle && !bottomTitle && (
        <Text style={[styles.title, { color: colors.TextPrimary }]}>
          {title[kana]} ({getTypeById(letter?.id)})
        </Text>
      )}
      
      <Text style={[styles.subTitle, { color: colors.TextPrimary }]}>
        {getRomanji(letter).toUpperCase()}
      </Text>

      {!hideTitle && bottomTitle && (
        <Text style={[styles.title, { color: colors.TextPrimary }]}>
          {title[kana]} ({getTypeById(letter?.id)})
        </Text>
      )}
    </View>
  );
};

export default SymbolHeader;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 62,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  subTitle: {
    fontSize: 34,
    fontWeight: "700",
    marginTop: 16,
  },
  cellIndicator: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 6,
    top: 16,
    right: -5,
  },
});
