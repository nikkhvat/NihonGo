import { AutoLesson, ManuallyLesson } from "@/shared/constants/lessons"

export interface InitialState {
  completedLesson: string[]
  chapters: {
    title: string;
    lessons: (AutoLesson | ManuallyLesson)[]
  }[]
  hash: string | null;
  lastUpdate: number
  lang: "ru" | "en",
}
