import React, { useEffect, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Text, StatusBar } from "react-native";

import { RootState } from "@/app/store";
import EducationKanaSelectedCard, {
  CardType,
} from "@/entities/education/practice/education-select-letters/education-select-letters";
import CardModeSelect from "@/entities/education/practice/practice-card-mode-select/practice-card-mode-select";
import StartPracticeButton from "@/entities/education/start-practice-button/start-practice-button";
import { CardMode, QuestionMode, PracticeWordMode } from "@/shared/constants/kana";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/app/navigationTypes";
import { ROUTES } from "@/app/navigationTypes";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import PracticeQuestionModeSelect from "@/entities/education/practice/practice-question-mode-select/practice-question-mode-select";
import WordGameModeSelect from "@/entities/education/practice/word-game-mode-select/word-game-mode-select";
import { countAvailableWords } from "@/pages/kana/kana-table-choice-letters-page/model/slice";

import SafeLayout from "@/app/layouts/safeLayout";
import PageTitle from "@/shared/ui/page-title/page-title";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import PracticeCard from "@/entities/education/practice/practice-card/practice-card";

import practiceImage1 from "@/shared/resources/lesson-image/1.png";
import practiceImage2 from "@/shared/resources/lesson-image/2.png";
import practiceImage3 from "@/shared/resources/lesson-image/3.png";
import practiceImage4 from "@/shared/resources/lesson-image/4.png";
import practiceImage5 from "@/shared/resources/lesson-image/5.png";
import practiceImage6 from "@/shared/resources/lesson-image/6.png";
import practiceImage7 from "@/shared/resources/lesson-image/7.png";
import { useHaptic } from "@/shared/helpers/haptic";

type PracticeNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.PRACTICE_ROOT>;
const PracticeWelcomePage: React.FC = () => {
  const { triggerHaptic } = useHaptic();
  const navigation = useNavigation<PracticeNavigationProp>();
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();

  const { colors } = useThemeContext();

  const [mode, setMode] = useState<PracticeWordMode[]>([]);
  
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content", true);
    }, [])
  );

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

  const [questionMode, setQuestionMode] = useState<QuestionMode>(QuestionMode.Choose);

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

  const toChooseAlphabet = () => {
    triggerHaptic(true);
    navigation.navigate(ROUTES.KANA_SELECT, { title: "" });
  }

  const toPractice = () => {
    if (questionMode === QuestionMode.Word) {
      navigation.navigate(ROUTES.PRACTICE_WORD_GAME, {
        keysModeState: mode,
      });
    } else {
      navigation.navigate(ROUTES.PRACTICE_TESTING, {
        keysCardModeState: cardsMode,
        timerDeration: "medium",
        questionMode: questionMode,
      });
    }
  };

  enum PracticeType {
    Testing,
    Draw,
    // Audio,
    SelectWord,
    ComparePair,
    BuildWord,
    TypeWord,
  }

  const start = (type: PracticeType) => {
    triggerHaptic(true);

    if (type === PracticeType.Testing) {
      navigation.navigate(ROUTES.PRACTICE_TESTING, { keysCardModeState: cardsMode, timerDeration: "medium", questionMode: QuestionMode.Choose })
    }

    if (type === PracticeType.Draw) {
      navigation.navigate(ROUTES.PRACTICE_TESTING, { keysCardModeState: cardsMode, timerDeration: "medium", questionMode: QuestionMode.Brash })
    }
    
    // if (type === PracticeType.Audio) {
    //   navigation.navigate(ROUTES.PRACTICE_TESTING, { keysCardModeState: cardsMode, timerDeration: "medium", questionMode: QuestionMode.Audio })
    // }

    if (type === PracticeType.SelectWord) {
      navigation.navigate(ROUTES.PRACTICE_WORD_GAME, { keysModeState: [PracticeWordMode.Choice] });
    }
    
    if (type === PracticeType.ComparePair) {
      navigation.navigate(ROUTES.PRACTICE_WORD_GAME, { keysModeState: [PracticeWordMode.FindPair] });
    }
    
    if (type === PracticeType.TypeWord) {
      navigation.navigate(ROUTES.PRACTICE_WORD_GAME, { keysModeState: [PracticeWordMode.WordBuilding] });
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.BgSecondary }} >
      <View style={{
        backgroundColor: colors.BgContrastPrimary,
        paddingTop: insets.top,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}>
        <PageTitle
          icon={<Icon onPress={() => toChooseAlphabet()} name={"tune"} size={29} color={colors.IconContrast} />}
          isKey
        >
          {ROUTES.PRACTICE_ROOT}
        </PageTitle>

        <EducationKanaSelectedCard />
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingLeft: 16,
          paddingRight: 16,
        }}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 8,
        }}
      >
        
        <PracticeCard onClick={() => start(PracticeType.Testing)} title="Тестирование" subtitle="Выбери ответ на время" image={practiceImage1} />
        <PracticeCard onClick={() => start(PracticeType.Draw)} title="Рисование" subtitle="Нарисуй хирагану / катакану" image={practiceImage2} />
        {/* <PracticeCard onClick={() => start(PracticeType.Audio)} title="Аудирование" subtitle="Выбери правильный ответ" image={practiceImage3} /> */}
        <PracticeCard onClick={() => start(PracticeType.SelectWord)} title="Выбор слова" subtitle="Выбери правильный ответ" image={practiceImage4} />
        <PracticeCard onClick={() => start(PracticeType.ComparePair)} title="Составление пары" subtitle="Собери пару из слов" image={practiceImage5} />
        <PracticeCard onClick={() => start(PracticeType.BuildWord)} title="Составление слова" subtitle="Составь слово" image={practiceImage6} />
        <PracticeCard onClick={() => start(PracticeType.TypeWord)} title="Ввод слова" subtitle="Напиши слово" image={practiceImage7} />

        {/* <PracticeQuestionModeSelect mode={questionMode} setMode={setQuestionMode} />

        {questionMode !== QuestionMode.Word && <CardModeSelect
          isHiraganaAvailable={isHiragana}
          isKatakanaAvailable={isKatakana}
          questionMode={questionMode}
          setCards={setCardMode}
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
        />} */}
      </ScrollView>
    </View>
  );
};

export default PracticeWelcomePage;