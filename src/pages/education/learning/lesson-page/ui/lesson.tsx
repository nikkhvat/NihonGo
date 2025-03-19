import React, { useEffect } from "react";

import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { completeLesson } from "../../model/slice";
import { useEducationLessonContext } from "../lib/context/education-lesson-context";

import SafeLayout from "@/app/layouts/safeLayout";
import { KanaAlphabet } from "@/shared/constants/kana";
import { AutoLesson, InfoLessonScreen, LessonScreen, ManuallyLesson } from "@/shared/constants/lessons";
import { useAppDispatch } from "@/shared/model/hooks";
import LinearProgressBar from "@/shared/ui/progressbar/linear/linear-progress-bar";
import BuildWordScreen from "@/widgets/learning/lesson/build-word-screen/build-word-screen";
import LessonDrawScreen from "@/widgets/learning/lesson/draw/draw";
import FinishScreen from "@/widgets/learning/lesson/finish-screen/finish-screen";
import InfoScreen from "@/widgets/learning/lesson/info-screen/info-screen";
import MatchLettersScreen from "@/widgets/learning/lesson/match-letters/match-letters";
import SelectLettersScreen from "@/widgets/learning/lesson/select-letters/select-letters";
import SelectSequenceLettersScreen from "@/widgets/learning/lesson/select-sequence-letters/select-sequence-letters";
import LessonSymbolScreen from "@/widgets/learning/lesson/symbol/symbol";
import { isAnyLessonScreen, isAutoLesson, isInfoLessonScreen, isManuallyLesson } from "../lib/helpers/lesson";
import { useNavigation } from '@react-navigation/native';

interface LessonProps {
  lesson: AutoLesson | ManuallyLesson
}

const Lesson: React.FC<LessonProps> = ({ lesson }) => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();

  const { init, currentScreen, screen, lessonScreens, next, retry } =
    useEducationLessonContext();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
      headerBackVisible: false
    })
  }, [navigation])

  const id = lesson.id;

  const addMarkCompleteLessonInStore = () => dispatch(completeLesson(id));

  const onComplete = () => {
    addMarkCompleteLessonInStore();
    navigation.goBack();
  };

  const onRetry = () => {
    addMarkCompleteLessonInStore();

    if (isAutoLesson(lesson)) {
      init(lesson.letters, "auto", []);
    }

    if (isManuallyLesson(lesson)) {
      init([], "manually", lesson.screens as InfoLessonScreen[]);
    }

    retry();
  };

  useEffect(() => {
    if (isAutoLesson(lesson)) {
      init(lesson.letters, "auto", []);
    }

    if (isManuallyLesson(lesson)) {
      init([], "manually", lesson.screens as InfoLessonScreen[]);
    }
  }, []);

  const isAnyScreen =
    currentScreen !== null && isAnyLessonScreen(currentScreen);

  const ifContainsFinishScreen = lessonScreens.some(screen => isAnyLessonScreen(screen) && screen?.name === LessonScreen.Finish)

  return (
    <SafeLayout
      disableLeft
      disableRight
      style={styles.container}
    >
      <View
        style={{
          paddingLeft: insets.left + 16,
          paddingRight: insets.right + 16,
        }}
      >
        {(isManuallyLesson(lesson)
          ? true
          : screen !== lessonScreens.length) &&
          !(isAnyLessonScreen(currentScreen) && currentScreen?.name === LessonScreen.Finish) &&  (
          <LinearProgressBar
            close={navigation.goBack}
            current={screen}
            all={ifContainsFinishScreen ? lessonScreens.length - 1 : lessonScreens.length}
          />
        )}
      </View>
      
      {isAutoLesson(lesson) &&
        isAnyScreen &&
        currentScreen?.name !== LessonScreen.Finish && (
          <View
            style={[
              styles.container,
              {
                paddingLeft: insets.left + 16,
                paddingRight: insets.right + 16,
              },
            ]}
          >
            {isAnyScreen && currentScreen?.name === LessonScreen.Symbol && (
              <LessonSymbolScreen
                name={LessonScreen.Symbol}
                symbol={currentScreen.symbol}
                kana={lesson.kana || KanaAlphabet.Hiragana}
                next={next}
                key={screen}
              />
            )}

            {isAnyScreen && currentScreen?.name === LessonScreen.Draw && (
              <LessonDrawScreen
                name={LessonScreen.Draw}
                symbol={currentScreen.symbol}
                kana={lesson.kana || KanaAlphabet.Hiragana}
                next={next}
                key={screen}
              />
            )}

            {isAnyScreen &&
              currentScreen?.name === LessonScreen.MatchSymbols && (
                <MatchLettersScreen
                  name={LessonScreen.MatchSymbols}
                  symbols={currentScreen.symbols}
                  kana={lesson.kana || KanaAlphabet.Hiragana}
                  next={next}
                  key={screen}
                />
              )}

            {isAnyScreen &&
              currentScreen?.name === LessonScreen.SelectSymbol && (
                <SelectLettersScreen
                  name={LessonScreen.SelectSymbol}
                  symbols={currentScreen.symbols}
                  kana={lesson.kana || KanaAlphabet.Hiragana}
                  next={next}
                  key={screen}
                />
              )}

            {isAnyScreen &&
              currentScreen?.name === LessonScreen.SelectSequenceLetters && (
                <SelectSequenceLettersScreen
                  name={LessonScreen.SelectSequenceLetters}
                  sequence={currentScreen.sequence}
                  kana={lesson.kana || KanaAlphabet.Hiragana}
                  next={next}
                  key={screen}
                />
              )}

            {isAnyScreen && currentScreen?.name === LessonScreen.BuildWord && (
              <BuildWordScreen
                name={LessonScreen.BuildWord}
                sequence={currentScreen.sequence}
                kana={lesson.kana || KanaAlphabet.Hiragana}
                next={next}
                key={screen}
              />
            )}
          </View>
        )}

      {(isAutoLesson(lesson) || isManuallyLesson(lesson)) &&
        currentScreen !== null &&
        isAnyLessonScreen(currentScreen) &&
        currentScreen?.name === LessonScreen.Finish && (
          <View
            style={[
              styles.container,
              {
                paddingLeft: insets.left + 16,
                paddingRight: insets.right + 16,
              },
            ]}
          >
            <FinishScreen
              name={LessonScreen.Finish}
              next={onComplete}
              retry={onRetry}
            />
          </View>
        )}

      {isManuallyLesson(lesson) && !isAnyLessonScreen(currentScreen) && (
        <View style={styles.container}>
          {currentScreen !== null && isInfoLessonScreen(currentScreen) && (
            <InfoScreen
              next={next}
              finish={onComplete}
              title={currentScreen.title}
              blocks={currentScreen.blocks}
              isLast={screen + 1 === lessonScreens.length}
            />
          )}
        </View>
      )}
    </SafeLayout>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
