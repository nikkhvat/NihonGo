import React, { useEffect, useMemo, useState } from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TEST_DELAY } from "@/shared/constants/kana";
import { shuffleArray } from "@/shared/helpers/letters";
import { Typography } from "@/shared/typography";
import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";

type SequenceProps = {
  sequence: string[];

  onFinish?: (hasError: boolean) => void;
  onError?: () => void;
};

const Sequence: React.FC<SequenceProps> = ({ sequence, onFinish, onError }) => {
  const { colors } = useThemeContext();

  const shuffledLetters = useMemo(() => shuffleArray(sequence), [JSON.stringify(sequence)]);

  const emptyLetters = useMemo(
    () => sequence.map(() => null),
    [JSON.stringify(sequence)],
  );

  const [selectedLetters, setSelectedLetters] = useState(
    emptyLetters as (null | { letter: string; index: number })[],
  );

  const [trueAnswers, setTrueAnswers] = useState(
    emptyLetters as (null | true | false)[],
  );

  const onClickLetter = (data: { index: number; letter: string }) => {
    let isFirstElem = false;

    setSelectedLetters((prev) =>
      prev.map((item) => {
        if (item === null && !isFirstElem) {
          isFirstElem = true;
          return data;
        }
        return item;
      }),
    );
  };

  const isSelected = (data: { index: number; letter: string }) =>
    selectedLetters.some(
      (element) =>
        element?.index === data.index && element.letter === data.letter,
    );

  function reset() {
    const emptyLetters = sequence.map(() => null);

    setSelectedLetters(emptyLetters);
    setTrueAnswers(emptyLetters);
  }

  useEffect(() => {
    if (selectedLetters.every((letter) => letter !== null)) {
      const answers = sequence.map(
        (letter, index) =>
          letter?.toUpperCase() ===
          selectedLetters[index]?.letter?.toUpperCase(),
      );

      setTrueAnswers(answers);
      const hasError = answers.some((answer) => !answer);

      setTimeout(() => {
        if (hasError) {
          onError?.();
        }
        onFinish?.(hasError);
        reset();
        setTrueAnswers(prev => prev.map(() => null));
      }, TEST_DELAY);
    }
  }, [selectedLetters]);

  useEffect(() => {
    reset();
  }, [JSON.stringify(sequence)]);

  const getBorderLetterContainer = (
    letter: null | { letter: string; index: number },
    idx: number,
  ) => {
    if (letter === null && selectedLetters[idx - 1] !== null) return { borderColor: colors.BgAccentPrimary }
    if (trueAnswers[idx] === null) return { borderColor: colors.BgLightGray }
    if (trueAnswers[idx]) return { borderColor: colors.BgSuccess }
    return { borderColor: colors.BgDanger }
  };

  return (
    <View style={styles.content}>
      <Pressable onPress={reset} style={styles.wordContainer}>
        {selectedLetters.map((letter, i) => (
          <View
            key={`selected-letter${i}-${letter}`}
            style={[
              styles.letterContainer,
              getBorderLetterContainer(letter, i),
            ]}
          >
            {letter !== null && (
              letter.letter && <Text style={[styles.letter, Typography.regularH4, { color: colors.TextPrimary }]}>
                {letter.letter}
              </Text>
            )}
          </View>
        ))}
      </Pressable>

      <View style={styles.chooseLettersContainer}>
        {shuffledLetters.map((letter, index) => {
          const data = { index: index, letter: letter };
          const selected = isSelected(data);

          const key = `letter-list-${letter}-${index}`;

          if (selected) return <View key={key} style={styles.emptyButton} />

          return (
            <SecondaryButton
              key={key}
              width={50}
              isOutline
              onClick={() => !selected && onClickLetter(data)}
              text={letter}
            />
          )
        })}
      </View>
    </View>
  );
};

export default Sequence;

const styles = StyleSheet.create({
  content: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  letterContainer: {
    minWidth: 22,
    minHeight: 32,
    borderBottomWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    textTransform: "uppercase",
  },
  chooseLettersContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 9,
    marginTop: 30,
  },
  emptyButton: {
    width: 50
  }
});
