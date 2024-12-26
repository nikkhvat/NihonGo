import React, { useEffect, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, Text } from "react-native";

import { RootState } from "@/app/store";
import EducationKanaSelectedCard, {
  CardType,
} from "@/entities/education/practice/education-select-letters/education-select-letters";
import CardModeSelect from "@/entities/education/practice/practice-card-mode-select/practice-card-mode-select";
import TestModeSelect from "@/entities/education/practice/practice-test-mode-select/practice-test-mode-select";
import StartPracticeButton from "@/entities/education/start-practice-button/start-practice-button";
import { TABLET_PADDING, TABLET_WIDTH } from "@/shared/constants/app";
import { CardMode, DifficultyLevelType, QuestionMode, PracticeWordMode } from "@/shared/constants/kana";
import { verticalScale } from "@/shared/helpers/metrics";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/app/navigationTypes";
import { ROUTES } from "@/app/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import PracticeQuestionModeSelect from "@/entities/education/practice/practice-question-mode-select/practice-question-mode-select";
import WordGameModeSelect from "@/entities/education/practice/word-game-mode-select/word-game-mode-select";
import { countAvailableWords } from "@/pages/kana/kana-table-choice-letters-page/model/slice";

import SafeLayout from "@/app/layouts/safeLayout";

type PracticeNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.PRACTICE_ROOT>;

const screenWidth = Dimensions.get("window").width;

const PracticeWelcomePage: React.FC = () => {
  const navigation = useNavigation<PracticeNavigationProp>();
  const { t } = useTranslation();

  const [mode, setMode] = useState<PracticeWordMode[]>([]);

  const dispatch = useAppDispatch();

  const [selectedWords] = useAppSelector(
    (state: RootState) => [
      state.kana.selectedWords,
      state.kana.selectedLetters,
    ],
  );

  const isWordsHiragana = selectedWords.hiragana.length >= 10;
  const isWordsKatakana = selectedWords.katakana.length >= 10;

  const wordsCount =
    selectedWords.hiragana.length + selectedWords.katakana.length;

  const letters = useAppSelector((state: RootState) => state.kana.selected);

  const [cardsMode, setCardMode] = useState<CardMode[]>([]);
  const [testMode, setTestMode] = useState<DifficultyLevelType[]>([]);

  const [questionMode, setQuestionMode] = useState<QuestionMode>(QuestionMode.Choose);

  const [timerDeration, setTimerDeration] = useState<"fast" | "medium" | "slow">("medium");

  const hiraganaLength =
    letters.base.hiragana.length +
    letters.dakuon.hiragana.length +
    letters.handakuon.hiragana.length +
    letters.yoon.hiragana.length;

  const katakanaLength =
    letters.base.katakana.length +
    letters.dakuon.katakana.length +
    letters.handakuon.katakana.length +
    letters.yoon.katakana.length;

  const selectedLetters = hiraganaLength + katakanaLength;

  const isHiragana = hiraganaLength >= 5;
  const isKatakana = katakanaLength >= 5;

  useEffect(() => {
    dispatch(countAvailableWords());
  }, [selectedLetters])

  const toChooseAlphabet = () =>
    navigation.navigate(ROUTES.KANA_SELECT, { title: "" });

  const toPractice = () => {
    if (questionMode === QuestionMode.Word) {
      navigation.navigate(ROUTES.PRACTICE_WORD_GAME, {
        keysModeState: mode,
      });
    } else {
      navigation.navigate(ROUTES.PRACTICE_TESTING, {
        keysCardModeState: cardsMode,
        keysDifficultyLevelState: testMode,
        timerDeration: timerDeration,
        questionMode: questionMode,
      });
    }
  };

  const widthContainer =
    screenWidth - 40 - (screenWidth > TABLET_WIDTH ? verticalScale(TABLET_PADDING * 2) : 0);

  return (
    <SafeLayout disableTop disableButton style={{ flex: 1 }} >
      <ScrollView showsVerticalScrollIndicator={false} style={{    }} >
        <EducationKanaSelectedCard
          imageSource={questionMode === QuestionMode.Word ? CardType.WordGame : CardType.Practice}
          onEdit={toChooseAlphabet}
        />

        <PracticeQuestionModeSelect mode={questionMode} setMode={setQuestionMode} />

        {questionMode !== QuestionMode.Word && <CardModeSelect
          isHiraganaAvailable={isHiragana}
          isKatakanaAvailable={isKatakana}
          questionMode={questionMode}
          setCards={setCardMode}
        />}

        {questionMode === QuestionMode.Choose && <TestModeSelect
          available={isHiragana || isKatakana}
          cards={testMode}
          timerDeration={timerDeration}
          setCards={setTestMode}
          setTimerDeration={setTimerDeration}
        />}

        {questionMode === QuestionMode.Word && <WordGameModeSelect
          modeAvailable={
            selectedWords.hiragana.length + selectedWords.katakana.length >= 10
          }
          isHiraganaAvailable={isWordsHiragana}
          isKatakanaAvailable={isWordsKatakana}
          setMode={setMode}
        />}

        {questionMode !== QuestionMode.Word && <StartPracticeButton
          conditions={[
            {
              condition: questionMode === QuestionMode.Brash ?
                letters.base.hiragana.length >= 5 || letters.base.katakana.length >= 5
                : true,
              text: t("practice.tooltip.leastTenLettersMustBeSelectedFromBasic"),
            },
            {
              condition: selectedLetters >= 5,
              text: t("practice.tooltip.syllablesSelectMoreThan5"),
            },
            {
              condition: cardsMode.length > 0,
              text: t("practice.tooltip.cardSelectAtLeastOne"),
            }
          ]}
          onPress={toPractice}
        />}
        {questionMode === QuestionMode.Word && <StartPracticeButton
          conditions={[
            {
              condition: wordsCount >= 10,
              text: t("practice.tooltip.wordsSelectMoreThan10"),
            },
            {
              condition: mode.length > 0,
              text: t("practice.tooltip.modeSelectAtLeastOne"),
            },
          ]}
          onPress={toPractice}
        />}
      </ScrollView>
    </SafeLayout>
  );
};

export default PracticeWelcomePage;