import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import Draw from "@/entities/education/draw/draw";
import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonDraw } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { LearningTitle } from "../ui/title";
import { useTransliterationsContext } from "@/features/settings/settings-transliterations/context/transliteration";

type LessonDrawScreenProps = LessonDraw & {
  next: (hasError: boolean) => void;
  kana: KanaAlphabet;
};

const LessonDrawScreen: React.FC<LessonDrawScreenProps> = ({
  symbol,
  kana,
  next,
}) => {
  const { transliterations } = useTransliterationsContext(); 
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <LearningTitle>
        {t("lesson.drawSyllable", { syllable: symbol.transliterations[transliterations] })}
      </LearningTitle>

      <Draw
        isFullHeight
        isCheck
        kana={kana}
        letter={symbol}
        onCompleted={(error) => next(!error)}
      />
    </View>
  );
};

export default LessonDrawScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    height: 50,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    height: 50,
  },
});
