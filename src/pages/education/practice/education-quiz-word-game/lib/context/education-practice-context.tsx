import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import generateChoiceAnswer from "../helpers/generate-choice-answer";
import generateFindThePair from "../helpers/generate-find-the-pair";
import generateWordBuilding from "../helpers/generate-word-building";

import { RootState } from "@/app/store";
import {
  CardMode,
  KanaAlphabet,
  PracticeWordMode,
} from "@/shared/constants/kana";
import {
  ILetter,
  LettersKeys,
  lettersTableById,
} from "@/shared/data/lettersTable";
import { Word } from "@/shared/data/words";
import { shuffleArray } from "@/shared/helpers/letters";
import { getRandomWords } from "@/shared/helpers/words";
import { AnyWordGameQuestion, Maybe } from "@/shared/types/questions";
import { useHaptic } from "@/shared/helpers/haptic";

interface generateQuestionsProps {
  selectedLetters: RootState["kana"]["selected"];
  selectedWords: RootState["kana"]["selectedWords"];
  keysModeState: PracticeWordMode[];
  lang: "en" | "ru";
}
interface EducationPracticeContextValue {
  init: (questions: AnyWordGameQuestion[]) => void;
  generateQuestions: (options: generateQuestionsProps) => AnyWordGameQuestion[];
  submit: (
    trueSelected: boolean,
    callback?: (onFinishPractice: boolean, trueAnswer: boolean) => void,
  ) => void;
  questions: AnyWordGameQuestion[];
  currentIndex: number;
}

export const EducationPracticeContext =
  createContext<EducationPracticeContextValue>({
    init: () => {},
    submit: () => {},
    generateQuestions: () => [],
    questions: [],
    currentIndex: 0,
  });

export const useEducationPracticeContext = () =>
  useContext(EducationPracticeContext);

export const EducationPracticeContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { triggerSuccessNotification, triggerErrorNotification } = useHaptic();

  const [currentIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<AnyWordGameQuestion[]>([]);

  const submit = (
    trueSelected: boolean,
    callback?: (onFinishPractice: boolean, trueAnswer: boolean) => void,
  ) => {
    setQuestionIndex((prev) => prev + 1);
    
    if (trueSelected) {
      triggerSuccessNotification();
    } else {
      triggerErrorNotification();
    }

    if (currentIndex > questions.length - 1) return;

    if (currentIndex === questions.length - 1) {
      callback?.(true, trueSelected);
    } else {
      callback?.(false, trueSelected);
    }
  };

  const init = (questions: AnyWordGameQuestion[]) => {
    setQuestions(questions);
  };

  const generateWordQuestion = (
    word: Word,
    questionTypes: PracticeWordMode[],
    kana: KanaAlphabet,
    katakanaWords: Word[],
    hiraganaWords: Word[],
    lang: "en" | "ru",
    katakanaLetters: ILetter[],
    hiraganaLetters: ILetter[],
  ): Maybe<AnyWordGameQuestion> => {
    const type =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];

    switch (type) {
      case PracticeWordMode.Choice: {
        return generateChoiceAnswer({ word, katakanaWords, hiraganaWords, kana, lang });
      }
      case PracticeWordMode.WordBuilding: {
        return generateWordBuilding({
          word,
          katakanaLetters,
          hiraganaLetters,
          selectKanaType: kana,
          lang,
        });
      }
      case PracticeWordMode.FindPair: {
        return generateFindThePair({ word, katakanaWords, hiraganaWords, kana, lang });
      }
    }
  };

  const generateQuestions = ({
    selectedLetters,
    selectedWords,
    keysModeState,
    lang,
  }: generateQuestionsProps): AnyWordGameQuestion[] => {
    const katakanaLetters = [
      ...selectedLetters.base.katakana,
      ...selectedLetters.dakuon.katakana,
      ...selectedLetters.handakuon.katakana,
      ...selectedLetters.yoon.katakana,
    ].map((item) => lettersTableById[item as LettersKeys]);

    const hiraganaLetters = [
      ...selectedLetters.base.hiragana,
      ...selectedLetters.dakuon.hiragana,
      ...selectedLetters.handakuon.hiragana,
      ...selectedLetters.yoon.hiragana,
    ].map((item) => lettersTableById[item as LettersKeys]);

    const katakanaWords: Word[] = selectedWords.katakana;
    const hiraganaWords: Word[] = selectedWords.hiragana;

    const questions: AnyWordGameQuestion[] = [];

    const wordsCount: number = katakanaWords.length + hiraganaWords.length;

    const questionsCount: number = wordsCount > 10 ? 10 : wordsCount;

    const questionTypes: CardMode[] = [];

    if (katakanaWords.length >= 10) {
      questionTypes.push(CardMode.katakanaToRomaji);
      questionTypes.push(CardMode.romajiToKatakana);
    }

    if (hiraganaWords.length >= 10) {
      questionTypes.push(CardMode.hiraganaToRomaji);
      questionTypes.push(CardMode.romajiToHiragana);
    }

    const cardTypes: PracticeWordMode[] = [];

    if (keysModeState.includes(PracticeWordMode.Choice))
      cardTypes.push(PracticeWordMode.Choice);
    if (keysModeState.includes(PracticeWordMode.WordBuilding))
      cardTypes.push(PracticeWordMode.WordBuilding);
    if (keysModeState.includes(PracticeWordMode.FindPair))
      cardTypes.push(PracticeWordMode.FindPair);

    const addedQuestionKatakana: string[] = [];
    const addedQuestionHiragana: string[] = [];

    for (let i = 0; i < questionsCount; i++) {
      const type =
        questionTypes[Math.floor(Math.random() * questionTypes.length)];

      const alphabet =
        type === CardMode.hiraganaToRomaji || type === CardMode.romajiToHiragana
          ? KanaAlphabet.Hiragana
          : KanaAlphabet.Katakana;

      const word = getRandomWords(
        addedQuestionHiragana,
        [hiraganaWords, katakanaWords].flat(),
      );

      if (word !== null && word !== undefined) {
        if (
          type === CardMode.hiraganaToRomaji ||
          type === CardMode.romajiToHiragana
        ) {
          addedQuestionHiragana.push(word?.romanji);
        } else {
          addedQuestionKatakana.push(word?.romanji);
        }

        const question = generateWordQuestion(
          word,
          cardTypes,
          alphabet,
          katakanaWords,
          hiraganaWords,
          lang,
          katakanaLetters as any as ILetter[],
          hiraganaLetters as any as ILetter[],
        );

        if (question !== null) {
          questions.push(question);
        }
      }
    }

    return shuffleArray(questions);
  };

  return (
    <EducationPracticeContext.Provider
      value={{
        init,
        submit,
        questions,
        currentIndex,
        generateQuestions,
      }}
    >
      {children}
    </EducationPracticeContext.Provider>
  );
};
