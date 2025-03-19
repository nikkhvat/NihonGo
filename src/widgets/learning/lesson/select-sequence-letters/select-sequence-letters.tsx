import React, { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { useWindowDimensions, View } from "react-native";

import { KanaAlphabet, TEST_DELAY } from "@/shared/constants/kana";
import { LessonSelectSequenceLetters } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import { shuffleArray } from "@/shared/helpers/letters";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { LearningTitle } from "../ui/title";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

type SelectSequenceLettersProps = LessonSelectSequenceLetters & {
  next: (hasError: boolean) => void;
  kana: KanaAlphabet;
};

const SelectSequenceLettersScreen: React.FC<SelectSequenceLettersProps> = ({
  sequence,
  kana,
  next,
}) => {
  const { colors } = useThemeContext();
  const { width } = useWindowDimensions()
  const [states, setStates] = useState<(null | false | true)[]>();

  const { getRomanji } = useGetRomanji();
  const { t } = useTranslation();

  const sequenceTrans = sequence
    .map((item) => item.transliterations[0])
    .join(", ");

  const shuffledArray = useMemo(() => shuffleArray(sequence), [sequenceTrans]);
  const shuffledArray2 = useMemo(() => shuffleArray(sequence), [sequenceTrans]);

  const shuffleArrayString = shuffledArray.map(item => getRomanji(item)).join(", ");

  const shuffledArrayString = shuffledArray
    .map((item) => getRomanji(item))
    .join(", ");

  const shuffledArray2String = shuffledArray2
    .map((item) => getRomanji(item))
    .join(", ");

  const buttons = useMemo(
    () => shuffleArray([shuffledArrayString, shuffledArray2String]),
    [sequenceTrans],
  );

  const submit = (answer: string) => {
    setStates(prev => buttons.map((item, index) => item === answer
      ? shuffleArrayString === answer
        ? true : false : (prev?.[index] === false || prev?.[index] === true) ? prev?.[index] : null))

    setTimeout(() => {
      next(shuffledArrayString !== answer);
    }, TEST_DELAY);
  };

  const rowLength = shuffledArrayString.length;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <LearningTitle>
        {t("lesson.chooseCorrectTransliterationSequence")}
      </LearningTitle>

      <LearningTitle>
        {shuffledArray.map((item) => getKana(item, kana)).join(", ")}
      </LearningTitle>

      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          rowGap: 16,
          flexDirection: rowLength > 18 ? "column" : "row",
        }}
      >
        {buttons.map((button, index) => (
          <PrimaryButton
            isHapticFeedback
            containerStyles={{
              width: rowLength > 18 ? "100%" : (width - 55) / 2,
              height: 50,
              backgroundColor: states?.[index] === true
                ? colors.BgSuccess : states?.[index] === false
                  ? colors.BgDanger
                  : colors.BgPrimary
            }}
            textStyles={{
              color: states?.[index] === true ? colors.TextContrastSecondary : states?.[index] === false ? colors.TextContrastSecondary : colors.TextPrimary
            }}
            isOutline
            key={button}
            width={(rowLength > 18 ? "100%" : (width - 55) / 2) as number}
            text={button}
            onClick={() => submit(button)}
          />
        ))}
      </View>
    </View>
  );
};

export default SelectSequenceLettersScreen;
