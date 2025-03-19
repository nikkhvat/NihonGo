import React from "react";

import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { useAppSelector } from "@/shared/model/hooks";
import { Typography } from "@/shared/typography";

export enum CardType {
  Practice = "practice",
  WordGame = "word_game",
}

const EducationKanaSelectedCard: React.FC = () => {
  const { width } = useWindowDimensions()
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const selectedLettersHiragana = useAppSelector(
    (state) => state.kana.selectedLettersHiragana,
  );

  const selectedLettersKatakana = useAppSelector(
    (state) => state.kana.selectedLettersKatakana,
  );

  const selectedWords = useAppSelector((state) => state.kana.selectedWords);

  const widthCard = (width / 2) - 24;

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 16, marginTop: 32 }} >
      <View style={[styles.content, {
        backgroundColor: colors.BgContrastSecondary,
        width: widthCard
      }]}>
        <View style={styles.header}>
          <Text style={[Typography.boldH1, { color: colors.TextContrastSecondary }]}>
            {selectedLettersHiragana + selectedLettersKatakana}
          </Text>
        </View>
        {(selectedLettersHiragana + selectedLettersKatakana) === 0 && (
          <Text
            style={[Typography.regularLabel, { color: colors.TextContrastSecondary }]}
          >
            {t("selectKana.nothingSelected")}
          </Text>
        )}
        {(selectedLettersHiragana + selectedLettersKatakana) !== 0 && (
          <Text
            style={[Typography.regularLabel, { color: colors.TextSecondary }]}
          >
            {selectedLettersHiragana ? t("kana.hiragana") : " "}
            {selectedLettersHiragana !== 0 && selectedLettersKatakana !== 0 ? " & " : ""}
            {selectedLettersKatakana ? t("kana.katakana") : " "}
          </Text>
        )}
      </View>
      <View style={[styles.content, { backgroundColor: colors.BgContrastSecondary, width: widthCard }]}>
        <Text style={[Typography.boldH1, { color: colors.TextContrastSecondary }]}>
          {selectedWords.hiragana.length + selectedWords.katakana.length}
        </Text>
        {(selectedWords.hiragana.length + selectedWords.katakana.length) === 0 && (
          <Text
            style={[Typography.regularLabel, { color: colors.TextSecondary }]}
          >
            {t("selectKana.nothingSelected")}
          </Text>
        )}
        {(selectedWords.hiragana.length + selectedWords.katakana.length) !== 0 && (
          <Text
            style={[Typography.regularLabel, { color: colors.TextSecondary }]}
          >
            {t("selectKana.words")}
          </Text>
        )}
      </View>
    </View>
  );
};

export default EducationKanaSelectedCard;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  content: {
    borderRadius: 12,
    height: 80,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 16,
  },
  button: {
    position: "absolute",
    right: 16,
    top: 16,
    borderWidth: 0,
    width: 50
  },
});
