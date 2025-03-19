import React, { useEffect, useMemo, useState } from "react";

import { StyleSheet, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TEST_DELAY } from "@/shared/constants/kana";
import { shuffleArray } from "@/shared/helpers/letters";
import PrimaryButton from "../../../shared/ui/buttons/Primary/primary-button";
import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";

type SelectAnswerProps = {
  answers: { title: string; isTrue: boolean }[];
  onError?: () => void;
  onFinish?: (hasError: boolean) => void;
};

const SelectAnswer: React.FC<SelectAnswerProps> = ({
  answers,
  onError,
  onFinish,
}) => {
  const { colors } = useThemeContext();

  const shuffleAnswers = useMemo(() => shuffleArray(answers), [answers]);

  const [errors, setErrors] = useState<string[]>([]);
  const [correct, setCorrect] = useState<string[]>([]);

  const onAnswer = (answer: { title: string; isTrue: boolean }) => {
    if (answer.isTrue) {
      setCorrect((prev) => [...prev, answer.title]);

      setTimeout(() => {
        onFinish?.(Boolean(errors.length));
      }, TEST_DELAY);
    } else {
      setErrors((prev) => [...prev, answer.title]);
      setTimeout(() => {
        onError?.();
      }, TEST_DELAY);
    }
  };

  useEffect(() => {
    return () => {
      setErrors([]);
      setCorrect([]);
    };
  }, [answers]);

  return (
    <View style={styles.answers}>
      {shuffleAnswers.map((answer) => (
        <SecondaryButton
          key={answer.title}
          isOutline
          onClick={() => onAnswer(answer)}
          text={answer.title}
          containerStyles={
            errors.includes(answer.title) ? {
              backgroundColor: colors.BgDanger,
            } : correct.includes(answer.title) ? {
              backgroundColor: colors.BgSuccess,
            } : {}
          }
          textStyles={
            (errors.includes(answer.title) || correct.includes(answer.title)) ? {
              color: colors.TextContrastSecondary,
            } : {}
          }
        />
      ))}
    </View>
  );
};

export default SelectAnswer;

const styles = StyleSheet.create({
  answers: {
    width: "100%",
    flexDirection: "column",
    marginTop: 16,
    gap: 16,
  },
});
