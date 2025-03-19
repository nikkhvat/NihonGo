import React, { useEffect } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useKeepAwake } from "expo-keep-awake";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import { useEducationPracticeContext } from "../lib/context/education-practice-context";
import { useEducationStatisticContext } from "../lib/context/education-statistic-context";

import SafeLayout from "@/app/layouts/safeLayout";
import { RootState } from "@/app/store";
import EducationPracticeSelectAnswers from "@/entities/education/practice/practice-pick-answers/practice-pick-answers";
import EducationPracticeTimer from "@/entities/education/practice/practice-timer/practice-timer";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { recalculate } from "@/pages/kana/kana-table-list-page/model/slice";
import { countAvailableWords } from "@/pages/kana/kana-table-choice-letters-page/model/slice";
import {
  CardMode,
  KanaAlphabet,
  QuestionMode,
} from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/app/navigationTypes";
import LinearProgressBar from "@/shared/ui/progressbar/linear/linear-progress-bar";
import { ROUTES } from "@/app/navigationTypes";
import { useNavigation } from '@react-navigation/native';
import PracticeDrawKana from "@/entities/education/practice/practice-draw-kana/practice-draw-kana";
import PracticeTypeKana from "@/entities/education/practice/practice-type-kana/practice-type-kana";
import { Typography } from "@/shared/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenNavigationProp = StackNavigationProp< RootStackParamList, typeof ROUTES.PRACTICE_TESTING >;
type LearnScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTES.PRACTICE_TESTING>;

interface LearnScreenProps {
  route: LearnScreenRouteProp;
}

function EducationPractice({ route }: LearnScreenProps) {
  const { height } = useWindowDimensions()
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    })
  }, [navigation])
  
  const dispatch = useAppDispatch();
  const { colors } = useThemeContext();
  
  useKeepAwake();

  useEffect(() => {
    dispatch(countAvailableWords());
  }, [dispatch]);

  const selectedLetters = useAppSelector(
    (state: RootState) => state.kana.selected,
  );

  const { keysCardModeState, timerDeration, questionMode } =
    route.params;

  const IS_CARDS = questionMode === QuestionMode.Choose;
  const IS_BRASH = questionMode === QuestionMode.Brash;
  const IS_TYPE = questionMode === QuestionMode.Type;

  const TIMER_SPEED =
    timerDeration === "fast" ? 3 : timerDeration === "slow" ? 7 : 5;

  const { init, submit, questions, currentIndex, generateQuestions } =
    useEducationPracticeContext();

  const {
    init: initStat,
    pickAnswer,
    getResult,
  } = useEducationStatisticContext();

  useEffect(() => {
    const generateQuestion = generateQuestions({
      selectedLetters,
      keysCardModeState,
      questionMode
    });

    init(generateQuestion);
    initStat();

    return () => {};
  }, []);

  const finishCallback = (onFinishPractice: boolean) => {
    if (onFinishPractice) {
      const result = getResult();

      dispatch(
        recalculate({
          data: result.incorrect.map((item) => {
            const isChapterHiragana =
              item.mode === CardMode.hiraganaToKatakana ||
              item.mode === CardMode.hiraganaToRomaji ||
              item.mode === CardMode.romajiToHiragana;
            return {
              chapter: isChapterHiragana
                ? KanaAlphabet.Hiragana
                : KanaAlphabet.Katakana,
              id: item.letter.id,
              isCorrect: false,
            };
          }),
        }),
      );

      dispatch(
        recalculate({
          data: result.correct.map((item) => {
            const isChapterHiragana =
              item.mode === CardMode.hiraganaToKatakana ||
              item.mode === CardMode.hiraganaToRomaji ||
              item.mode === CardMode.romajiToHiragana;
            return {
              chapter: isChapterHiragana
                ? KanaAlphabet.Hiragana
                : KanaAlphabet.Katakana,
              id: item.letter.id,
              isCorrect: true,
            };
          }),
        }),
      );

      navigation.navigate(ROUTES.RESULTS, { result });
    }
  };

  const onSubmit = (trueAnswer: boolean) => submit(trueAnswer, finishCallback);
  const onError = () => onSubmitTestQuestion(false, question.symbol);

  const endTime = () => onSubmitTestQuestion(false);

  const onSubmitTestQuestion = (
    correctAnswer: boolean,
    pickedAnswer?: ILetter,
  ) => {
    if (currentIndex < questions.length) {
      pickAnswer({
        correctAnswer: correctAnswer,
        kana: question.kana,
        question: question.symbol,
        pickedAnswer,
        mode: question.mode,
      });
      onSubmit(correctAnswer);
    }
  };

  const question = questions[currentIndex];

  if (IS_TYPE && question) {
    return (
      <View style={{
        paddingTop: insets.top + 20,
        height: "100%"
      }} >
        <PracticeTypeKana
          symbol={question?.symbol}
          kana={question?.kana}
          onCompleted={onSubmitTestQuestion}
          onError={onError}
        />
      </View>
    )
  }

  return (
    <SafeLayout
      additionalPaddingTop={20}
      style={[
        styles.container,
        {
          backgroundColor: colors.BgPrimary,
          gap: height < 700 ? 0 : 22,
        },
      ]}
    >
      <View>
        {questions.length !== 0 && currentIndex <= questions.length && <LinearProgressBar
          close={navigation.goBack}
          current={currentIndex}
          all={questions.length}
        />}

        {IS_CARDS && (
          <EducationPracticeTimer
            customStyles={{}}
            currentIndex={currentIndex}
            questions={questions.length}
            onTimerEnd={endTime}
            initial={TIMER_SPEED}
          />
        )}
      </View>

      {IS_CARDS && <EducationPracticeSelectAnswers
        question={question}
        onCompleted={onSubmitTestQuestion}
        onError={onError}
      />}

      {IS_BRASH && question && <PracticeDrawKana
        symbol={question?.symbol}
        kana={question.mode}
        onCompleted={onSubmitTestQuestion}
        onError={onError}
      />}
    </SafeLayout>
  );
}

export default EducationPractice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
