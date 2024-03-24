import React, { useEffect } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useKeepAwake } from "expo-keep-awake";
import { Dimensions, StyleSheet, View } from "react-native";

import { useEducationPracticeContext } from "../lib/context/education-practice-context";
import { useEducationStatisticContext } from "../lib/context/education-statistic-context";

import SafeLayout from "@/app/layouts/safeLayout";
import { RootState } from "@/app/store";
import EducationPracticeSelectAnswers from "@/entities/education/practice/practice-pick-answers/practice-pick-answers";
import EducationPracticeTimer from "@/entities/education/practice/practice-timer/practice-timer";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { recalculate } from "@/pages/kana/kana-list/model/slice";
import { countAvailableWords } from "@/pages/kana/kana-quick-selection/model/slice";
import { CardMode, DifficultyLevelType, KanaAlphabet } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import LinearProgressBar from "@/shared/ui/progressbar/linear/linear-progress-bar";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "EducationPractice">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "EducationPractice">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

const screenHeight = Dimensions.get("window").height;

function EducationPractice({ route, navigation }: LearnScreenProps) {
  useKeepAwake();

  const dispatch = useAppDispatch();
  const { colors } = useThemeContext();

  useEffect(() => {
    dispatch(countAvailableWords());
  }, [dispatch]);

  const selectedLetters = useAppSelector((state: RootState) => state.kana.selected);

  const {
    keysCardModeState,
    timerDeration,
    keysDifficultyLevelState,
  } = route.params;

  const IS_TIMER = keysDifficultyLevelState.includes(DifficultyLevelType.TimeTest);
  const ONE_ATTEMPT = keysDifficultyLevelState.includes(DifficultyLevelType.OneAttempt);

  const TIMER_SPEED = timerDeration === "fast" ? 3 : timerDeration === "slow" ? 7 : 5;

  const { init, submit, questions, currentIndex, generateQuestions } = useEducationPracticeContext();

  const { init: initStat, pickAnswer, getResult } = useEducationStatisticContext();

  useEffect(() => {
    const generateQuestion = generateQuestions({
      selectedLetters,
      keysCardModeState,
    });

    init(generateQuestion);
    initStat();

    return () => { };
  }, []);

  // Вызываеться после ответа на вопрос
  const finishCallback = (onFinishPractice: boolean) => {
    if (onFinishPractice) {
      const result = getResult();

      dispatch(recalculate({
        data: result.incorrect.map(item => {
          const isChapterHiragana = item.mode === CardMode.hiraganaToKatakana || item.mode === CardMode.hiraganaToRomaji || item.mode === CardMode.romajiToHiragana;
          return {
            chapter: isChapterHiragana ? KanaAlphabet.Hiragana : KanaAlphabet.Katakana,
            id: item.letter.id,
            isCorrect: false,
          };
        })
      }));
      
      dispatch(recalculate({
        data: result.correct.map(item => {
          const isChapterHiragana = item.mode === CardMode.hiraganaToKatakana || item.mode === CardMode.hiraganaToRomaji || item.mode === CardMode.romajiToHiragana;
          return {
            chapter: isChapterHiragana ? KanaAlphabet.Hiragana : KanaAlphabet.Katakana,
            id: item.letter.id,
            isCorrect: true,
          };
        })
      }));

      navigation.navigate("Results", { result });
    }
  };

  const onSubmit = (trueAnswer: boolean) => submit(trueAnswer, finishCallback);
  const onError = () => {
    if (ONE_ATTEMPT) {
      onSubmitTestQuestion(false, question.symbol);
    }
  };

  const endTime = () => onSubmitTestQuestion(false);

  const onSubmitTestQuestion = (correctAnswer: boolean, pickedAnswer?: ILetter) => {
    if (currentIndex < questions.length) {
      pickAnswer({
        correctAnswer: correctAnswer,
        kana: question.kana,
        question: question.symbol,
        last: currentIndex === questions.length - 1,
        pickedAnswer,
        mode: question.mode,
      });
      onSubmit(correctAnswer);
    }
  };

  const question = questions[currentIndex];

  return (
    <SafeLayout additionalPaddingTop={20} style={[styles.container, { 
      backgroundColor: colors.color1,
      gap: screenHeight < 700 ? 0 : 22
    } ]}>
        <View style={styles.header}>
          <LinearProgressBar
            close={navigation.goBack}
            current={currentIndex + 1}
            all={questions.length}
          />
          {IS_TIMER &&
            <EducationPracticeTimer
              customStyles={{}}
              currentIndex={currentIndex}
              questions={questions.length}
              onTimerEnd={endTime}
              initial={TIMER_SPEED}
            />}
        </View>

        <EducationPracticeSelectAnswers
          question={question}
          onCompleted={onSubmitTestQuestion}
          onError={onError}
        />
    </SafeLayout>
  );
}

export default EducationPractice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  header: {
    width: "100%",
    flexDirection: "column",
  }
});
