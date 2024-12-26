import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { PracticeWordMode } from "@/shared/constants/kana";

import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";
import { Typography } from "@/shared/typography";
import ButtonCard from "../button-card/button-card";

export type CardModeSelectProps = {
  isHiraganaAvailable: boolean;
  isKatakanaAvailable: boolean;

  modeAvailable: boolean;

  setMode: React.Dispatch<React.SetStateAction<PracticeWordMode[]>>;
};

const WordGameModeSelect: React.FC<CardModeSelectProps> = ({
  isHiraganaAvailable,
  isKatakanaAvailable,

  modeAvailable,

  setMode,
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const [selectedCardMode, setSelectedCardMode] = useState<PracticeWordMode[]>([]);

  useEffect(() => {
    const initial = [];

    if (modeAvailable) initial.push(PracticeWordMode.Choice);
    if (modeAvailable) initial.push(PracticeWordMode.FindPair);
    if (modeAvailable) initial.push(PracticeWordMode.WordBuilding);

    setSelectedCardMode(initial);
    setMode(initial);
  }, [isHiraganaAvailable, isKatakanaAvailable, modeAvailable, setMode]);

  const toggle = (key: PracticeWordMode) => {
    if (selectedCardMode.includes(key)) {
      setSelectedCardMode((prev) => prev.filter((item) => item !== key));
      setMode((prev) => prev.filter((item) => item !== key));
    } else {
      setSelectedCardMode((prev) => [...prev, key]);
      setMode((prev) => [...prev, key]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[Typography.boldH3, { color: colors.TextPrimary }]}>
        {t("practice.modeTitle")}
      </Text>
      <View style={styles.buttonsContainer}>
        <ButtonCard<PracticeWordMode>
          isGray
          setValue={toggle}
          currentValue={selectedCardMode.includes(PracticeWordMode.Choice) ? PracticeWordMode.Choice : false}
          value={PracticeWordMode.Choice}
          text={t("practice.wordsMode.choice")}
          icon={"format-line-spacing"}
        />
        <ButtonCard<PracticeWordMode>
          isGray
          setValue={toggle}
          currentValue={selectedCardMode.includes(PracticeWordMode.FindPair) ? PracticeWordMode.FindPair : false}
          value={PracticeWordMode.FindPair}
          text={t("practice.wordsMode.findThePair")}
          icon={"puzzle-outline"}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonCard<PracticeWordMode>
          isGray
          setValue={toggle}
          currentValue={selectedCardMode.includes(PracticeWordMode.WordBuilding) ? PracticeWordMode.WordBuilding : false}
          value={PracticeWordMode.WordBuilding}
          text={t("practice.wordsMode.wordBuilding")}
          icon={"check-circle-outline"}
        />
      </View>
    </View>
  );
};

export default WordGameModeSelect;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 16,
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    gap: 16,
  },
  text: {
    fontWeight: "700",
    fontSize: 18,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
