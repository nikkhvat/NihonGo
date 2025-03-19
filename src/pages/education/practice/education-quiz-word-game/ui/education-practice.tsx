import React, { useEffect } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useKeepAwake } from "expo-keep-awake";
import { StyleSheet, View, Text } from "react-native";

import { useEducationPracticeContext } from "../lib/context/education-practice-context";
import { useEducationStatisticContext } from "../lib/context/education-statistic-context";

import SafeLayout from "@/app/layouts/safeLayout";
import { RootState } from "@/app/store";
import EducationPracticeChooseLetters from "@/entities/education/practice/word-game-build-word/word-game-build-word";
import EducationPracticeChooseValue from "@/entities/education/practice/word-game-choose-value/word-game-choose-value";
import EducationPracticeFindPair from "@/entities/education/practice/word-game-find-pair/education-practice-find-pair";
import { countAvailableWords } from "@/pages/kana/kana-table-choice-letters-page/model/slice";
import { QuestionTypeBuildingWord, QuestionTypeChooseWord, QuestionTypeFindPairWord, TEST_DELAY } from "@/shared/constants/kana";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/app/navigationTypes";
import LinearProgressBar from "@/shared/ui/progressbar/linear/linear-progress-bar";
import { ROUTES } from "@/app/navigationTypes";
import { useNavigation } from '@react-navigation/native';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.PRACTICE_WORD_GAME>;
type LearnScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTES.PRACTICE_WORD_GAME>;

interface LearnScreenProps {
  route: LearnScreenRouteProp
}
export interface RegistrationErrorProps {
  type: typeof QuestionTypeFindPairWord | typeof QuestionTypeBuildingWord | typeof QuestionTypeChooseWord,
  pair: string[];
}

function EducationWordGame({ route }: LearnScreenProps) {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    })
  }, [navigation])

  useKeepAwake();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(countAvailableWords());
  }, [dispatch]);

  const selectedLetters = useAppSelector((state: RootState) => state.kana.selected);
  const selectedWords = useAppSelector((state: RootState) => state.kana.selectedWords);

  const { keysModeState } = route.params;

  const { wordKey } = useGetRomanji();

  const { init, submit, questions, currentIndex, generateQuestions } = useEducationPracticeContext();

  const { init: initStat, pickAnswer, registrError, getResult } = useEducationStatisticContext();

  useEffect(() => {
    const generateQuestion = generateQuestions({
      selectedLetters,
      selectedWords,
      keysModeState,
      lang: wordKey
    });

    init(generateQuestion);
    initStat();

    return () => {};
  }, [wordKey, keysModeState, selectedLetters, selectedWords]);

  const finishCallback = (onFinishPractice: boolean) => {
    setTimeout(() => {
      if (onFinishPractice) {
        const result = getResult();

        navigation.navigate(ROUTES.RESULTS, { result });
      }
    }, TEST_DELAY);
  };

  const onSubmit = (trueAnswer: boolean) => {
    if (currentIndex < questions.length) {
      pickAnswer({ correctAnswer: trueAnswer });
      submit(trueAnswer, finishCallback);
    }
  };

  const question = questions[currentIndex];

  const isFindPair = question?.type === QuestionTypeFindPairWord;
  const isBuildingWord = question?.type === QuestionTypeBuildingWord;
  const isChooseWord = question?.type === QuestionTypeChooseWord;

  if (questions.length === currentIndex) return;

  return (
    <SafeLayout
      additionalPaddingTop={20}
      style={styles.container} >
      <View style={styles.header}>
        <LinearProgressBar
          close={navigation.goBack}
          current={currentIndex}
          all={questions.length}
        />
      </View>

      {isFindPair &&
        <EducationPracticeFindPair
          question={question}
          onCompleted={(isError) => onSubmit(!isError)}
          onError={registrError}
        />}

      {isBuildingWord && 
        <EducationPracticeChooseLetters 
          question={question}
          onError={registrError}
          onFinish={(isError) => onSubmit(!isError)} />}

      {isChooseWord &&
        <EducationPracticeChooseValue
          title={question.title}
          answers={question.questions}
          onCompleted={(isError) => onSubmit(!isError)}
          onError={registrError}
          word={question.word}
          trueAnswer={question.trueKey}
        />}
    </SafeLayout>
  );
}

export default EducationWordGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  header: {
    width: "100%",
    flexDirection: "column",
    gap: 22
  }
});
