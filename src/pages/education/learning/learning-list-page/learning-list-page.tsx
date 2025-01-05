import React, { useEffect } from "react";

import { ScrollView, StyleSheet, Text } from "react-native";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import { AutoLesson, ManuallyLesson } from "@/shared/constants/lessons";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { checkLessons, updateLessons } from "../model/slice";
import { Typography } from "@/shared/typography";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { ROUTES } from "@/app/navigationTypes";
import Chapter from "@/widgets/learning/lesson/chapter/chapter";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigationTypes";

type LearnResultsNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.RESULTS>;

const LearningListPage: React.FC = () => {
  const navigation = useNavigation<LearnResultsNavigationProp>();
  const dispatch = useAppDispatch();

  const { colors } = useThemeContext();

  const { lessonsKey } = useGetRomanji();
  
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    })
  }, [navigation])

  const isAutoLesson = (item: AutoLesson | ManuallyLesson): item is AutoLesson => "letters" in item;

  const startLesson = (item: AutoLesson | ManuallyLesson) => {
    if (isAutoLesson(item)) {
      const clonedArray = JSON.parse(JSON.stringify(item.letters));
      navigation.navigate(ROUTES.LESSON_PAGE, {lesson: { ...item, letters: clonedArray }});
    } else {
      navigation.navigate(ROUTES.LESSON_PAGE, {lesson: item});
    }
  };

  const chapters = useAppSelector((state) => state.lessons.chapters)
  const hash = useAppSelector((state) => state.lessons.hash)
  const chaptersLang = useAppSelector((state) => state.lessons.lang)

  const fetchLessons = () => {
    if (chaptersLang !== lessonsKey) {
      return dispatch(updateLessons({ lang: lessonsKey }))
    }

    if (!chapters || chapters.length === 0) {
      return dispatch(updateLessons({ lang: lessonsKey }))
    }

    if (!chapters[0]?.title) {
      return dispatch(updateLessons({ lang: lessonsKey }))
    }
  }

  useEffect(() => {
    fetchLessons();
  }, [chapters, chaptersLang, lessonsKey])

  useEffect(() => {
    if (hash) {
      dispatch(checkLessons({ lang: lessonsKey, hash }))
    }
  }, [])

  const isShowChapters = chapters[0]?.title;

  return (
    <AdaptiveLayout style={{ flex: 1, paddingBottom: 0 }}>
      <>
        {!isShowChapters && <Text style={[styles.connectionError, Typography.boldH2, {
          color: colors.TextPrimary
        }]} >Server connection error</Text>}

        {isShowChapters && <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        > 
          {chapters?.length > 0 && chapters?.map((item, index) => (
            <Chapter
              title={item.title}
              lessons={item.lessons ? item.lessons : []}
              key={index}
              startLesson={startLesson}
              isLast={index + 1 === chapters.length}
            />
          ))}
        </ScrollView>}
      </>
    </AdaptiveLayout>
  );
};

export default LearningListPage;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  connectionError: {
    marginTop: 100,
    textAlign: 'center',
  }
});
