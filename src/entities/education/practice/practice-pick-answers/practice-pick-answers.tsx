import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import AnswerCard from "./answer-card/answer-card";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { CardMode, Kana, TEST_DELAY } from "@/shared/constants/kana";
import { ILetter, dakuonFlatLettersId, handakuonFlatLettersId, yoonFlatLettersId } from "@/shared/data/lettersTable";
import { Question } from "@/shared/types/questions";
interface EducationPracticeSelectAnswersProps {
  question: Question
  onError?: (id: number | string) => void;
  onCompleted?: (isErrors: boolean, pickedAnswer: ILetter) => void;
}

const EducationPracticeSelectAnswers: React.FC<EducationPracticeSelectAnswersProps> = ({ 
  question,
  onError, 
  onCompleted
}) => {
  const screenWidth = Dimensions.get("window").width;
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const [errors, setErrors] = useState([] as (string | number)[]);
  const [corrected, setCorrected] = useState(null as string | number | null);
  
  useEffect(() => {
    setErrors([]);
    setCorrected(null);
  }, [question]);
  
  const pick = (letter: ILetter) => {
    if (corrected !== null) return;

    if (errors.includes(letter.id)) return; 

    if (letter.id !== question.trueAnswer) {
      setErrors((prev) => [...prev, letter.id]);

      setTimeout(() => {
        onError?.(letter.id);
      }, TEST_DELAY);
      return; 
    }

    setCorrected(letter.id);

    setTimeout(() => {
      onCompleted?.(errors.length === 0, letter);
    }, TEST_DELAY);
  };

  const isCorrectAnswer = (id: string): boolean => id === corrected;
  const isInCorrectAnswer = (id: string): boolean => errors.includes(id);

  const widthCard = (screenWidth - (20 * 2) - 15) / 2;

  const kana = question?.kana;
  const symbol = question?.symbol;
  const answers = question?.answers;

  const { i18n: { language } } = useTranslation();

  const lang = language === "ru" ? "ru" : "en";

  const symbolLable = kana === Kana.Romanji
    ? symbol?.[lang] : kana === Kana.Hiragana
      ? symbol?.hi : symbol?.ka;

  const getTitle = (answer: ILetter) => {
    const isKana = (question?.mode === CardMode.hiraganaToKatakana || question?.mode === CardMode.romajiToKatakana);
    const isHira = (question?.mode === CardMode.romajiToHiragana || question?.mode === CardMode.katakanaToHiragana);
    
    return isKana ? answer.ka : isHira ? answer.hi : answer[lang];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTypeById = (id: any) => {
    if (yoonFlatLettersId.includes(id)) return t("kana.yoon");
    if (handakuonFlatLettersId.includes(id)) return t("kana.handakuon");
    if (dakuonFlatLettersId.includes(id)) return t("kana.dakuon");

    return t("kana.basic");
  };

  const getSubTitle = () => {
    const isHira = (question?.mode === CardMode.hiraganaToKatakana || question?.mode === CardMode.hiraganaToRomaji);
    const isKana = (question?.mode === CardMode.katakanaToHiragana || question?.mode === CardMode.katakanaToRomaji);

    const displayKana = isKana ? t("kana.katakana") : isHira ? t("kana.hiragana") : t("kana.romanji");

    return displayKana + ` (${getTypeById(symbol?.id)})`;
  };


  return (
    <>
      <View>
        <Text style={[styles.symbol, { color: colors.color4 }]}>{symbolLable}</Text>
        <Text style={[styles.subText, { color: colors.color3 }]}>
          {getSubTitle()}
        </Text>
      </View>
      <View style={styles.container}>
        {answers?.length > 0 && answers.map(answer => (
          <AnswerCard 
            key={answer.id}
            value={answer}
            width={widthCard}
            redMarked={isInCorrectAnswer(answer.id)}
            greenMarked={isCorrectAnswer(answer.id)}
            onClick={pick}
          >
            {getTitle(answer)}
          </AnswerCard>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15
  },
  symbol: {
    textAlign: "center",
    fontSize: 84,
  },
  subText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
});


export default EducationPracticeSelectAnswers;