import { AutoLesson, ManuallyLesson } from "../shared/constants/lessons";

import { ResultInfoWordGame } from "@/pages/education/practice/education-quiz-word-game/lib/context/education-statistic-context";
import { ResultInfo } from "@/pages/education/practice/education-quiz-testing/lib/context/education-statistic-context";
import { CardMode, KanaAlphabet, QuestionMode, PracticeWordMode } from "@/shared/constants/kana";

export const ROUTES = {
  ROOT: 'Root',
  HOME: 'HOME',

  // Info kana and draw kana
  KANA_INFO: 'KANA_INFO',

  // Select alphabet
  KANA_SELECT: 'KanaSelect',
  
  // Lesson page
  LESSON_PAGE: 'LessonPage',
  
  // practice
  PRACTICE_WORD_GAME: 'EducationWordGame',
  PRACTICE_TESTING: 'EducationPractice',
  
  // results of practice
  RESULTS: 'Results',
  
  // bottom tab navigator
  PRACTICE_ROOT: 'Practice',
  LEARNING_ROOT: 'Learning',
  SETTINGS_ROOT: 'Settings',
  KANA_TABLE_ROOT: 'KanaTable',
} as const;


export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.ROOT]: undefined;

  // Info kana and draw kana
  [ROUTES.KANA_INFO]: KanaInfoPageProps;

  // Select alphabet
  [ROUTES.KANA_SELECT]: KanaTableChoiceLettersPage;

  // Lesson page
  [ROUTES.LESSON_PAGE]: LessonPage

  // practice (2 variants)
  [ROUTES.PRACTICE_WORD_GAME]: PracticeWordGame;
  [ROUTES.PRACTICE_TESTING]: PracticeTesting;

  // results of practice
  [ROUTES.RESULTS]: PracticeResultPage;

  // bottom tab navigator
  [ROUTES.PRACTICE_ROOT]: undefined,
  [ROUTES.LEARNING_ROOT]: undefined;
  [ROUTES.SETTINGS_ROOT]: undefined;
  [ROUTES.KANA_TABLE_ROOT]: undefined;
};

interface KanaInfoPageProps {
  id: string,
  kana: KanaAlphabet,
  title: string
}

interface KanaTableChoiceLettersPage {
  title: string
}

interface LessonPage {
  lesson: AutoLesson | ManuallyLesson
}

interface PracticeWordGame {
  keysModeState: PracticeWordMode[],
}

interface PracticeTesting {
  keysCardModeState: CardMode[],
  questionMode: QuestionMode
  timerDeration ?: "fast" | "medium" | "slow"
}

interface PracticeResultPage {
  result: ResultInfo | ResultInfoWordGame
}