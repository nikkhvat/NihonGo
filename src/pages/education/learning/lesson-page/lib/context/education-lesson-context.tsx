/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import {
  AnyLesson,
  InfoLessonScreen,
  LessonScreen,
} from "@/shared/constants/lessons";
import { ILetter } from "@/shared/data/lettersTable";

import { useHaptic } from "@/shared/helpers/haptic";

interface EducationLessonContextValue {
  init: (
    letters: ILetter[],
    type: "auto" | "manually",
    infoScreens: InfoLessonScreen[],
  ) => void;
  next: (hasError?: boolean) => void;
  retry: () => void;
  lessonScreens: (AnyLesson | InfoLessonScreen)[];
  currentScreen: (AnyLesson | InfoLessonScreen) | null;
  screen: number;
}

export const EducationLessonContext =
  createContext<EducationLessonContextValue>({
    init: () => {},
    next: () => {},
    retry: () => {},
    lessonScreens: [],
    currentScreen: null,
    screen: 0,
  });

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateScreens(letters: ILetter[]): AnyLesson[] {
  const screens: AnyLesson[] = [];

  const addedLetters = [];

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    addedLetters.push(letter);

    screens.push({ name: LessonScreen.Symbol, symbol: letter });
    screens.push({ name: LessonScreen.Draw, symbol: letter });

    if (addedLetters.length % 2 === 0) {
      screens.push({
        name: LessonScreen.MatchSymbols,
        symbols: [letter, letters[i - 1]],
      });
    }
    if (addedLetters.length % 3 === 0) {
      screens.push({
        name: LessonScreen.SelectSymbol,
        symbols: shuffleArray([letters[i], letters[i - 1], letters[i - 2]]),
      });
      screens.push({
        name: LessonScreen.MatchSymbols,
        symbols: [letter, letters[i - 1]],
      });
    }

    if (letters.length - 1 === i) {
      screens.push({
        name: LessonScreen.SelectSymbol,
        symbols: shuffleArray(letters).slice(0, 3),
      });
    }
  }

  screens.push({ name: LessonScreen.SelectSequenceLetters, sequence: letters });
  screens.push({ name: LessonScreen.SelectSequenceLetters, sequence: letters });
  screens.push({ name: LessonScreen.BuildWord, sequence: letters });
  screens.push({ name: LessonScreen.BuildWord, sequence: letters });
  screens.push({ name: LessonScreen.Finish });

  return screens;
}

export const useEducationLessonContext = () =>
  useContext(EducationLessonContext);

export const EducationPracticeContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { triggerHaptic } = useHaptic();
  
  const [screens, setScreens] = useState(
    [] as (AnyLesson | InfoLessonScreen)[],
  );
  const [screen, setScreen] = useState(0);

  const init = (
    letters: ILetter[],
    type: "auto" | "manually",
    infoScreens: InfoLessonScreen[],
  ) => {
    if (type === "auto") {
      const screens = generateScreens(letters);
      setScreens(screens);
    } else {
      setScreens([
        ...infoScreens,
        {
          name: LessonScreen.Finish,
        },
      ]);
    }
  };

  const next = (hasError?: boolean) => {
    if (hasError) {
      if ((screens[screen] as any).retry !== 2) {
        setScreens((prev) => [
          ...prev.slice(0, -1),
          {
            ...screens[screen],
            retry: (screens[screen] as any)?.retry
              ? (screens[screen] as any)?.retry + 1
              : 1,
          },
          { name: LessonScreen.Finish },
        ]);
      }
    }

    if (screen + 1 !== screens.length) {
      setScreen((prev) => prev + 1);
    }

    // triggerHaptic(true);
  };

  const retry = () => {
    setScreen(0);
  };

  return (
    <EducationLessonContext.Provider
      value={{
        init,
        next,
        retry,
        lessonScreens: screens,
        screen,
        currentScreen: screens[screen],
      }}
    >
      {children}
    </EducationLessonContext.Provider>
  );
};
