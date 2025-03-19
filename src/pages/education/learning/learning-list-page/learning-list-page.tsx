import React, { useEffect } from "react";

import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import { AutoLesson, ManuallyLesson } from "@/shared/constants/lessons";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { checkLessons, updateLessons } from "../model/slice";
import { Typography } from "@/shared/typography";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { ROUTES } from "@/app/navigationTypes";
import Chapter from "@/widgets/learning/lesson/chapter/chapter";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigationTypes";
import PageTitle from "@/shared/ui/page-title/page-title";

type LearnResultsNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.RESULTS>;

const LearningListPage: React.FC = () => {
  const navigation = useNavigation<LearnResultsNavigationProp>();
  const dispatch = useAppDispatch();

  const { colors } = useThemeContext();
  
  const barStyle = colors._theme === "dark" ? "light-content" : "dark-content";

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle(barStyle, true);
    }, [])
  );

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

  const chapters = useAppSelector((state) => state.lessons.chapters);

  const completedLessons = useAppSelector((state) => state.lessons.completedLesson);

  const allIds = chapters.map(chapter => chapter.lessons.map(item => completedLessons.includes(item.id))).flat();
  const completedIds = allIds.filter(item => !!item);

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

  const percentageProgress = +((completedIds.length / allIds.length) * 100).toFixed();

  return (
    <AdaptiveLayout style={{ flex: 1, paddingBottom: 0 }}>      
      <PageTitle isSaveArea isKey>{ROUTES.LEARNING_ROOT}</PageTitle>
      
      <View style={{ width: '100%', }} />
      <View style={{ marginLeft: 16, marginRight: 16, marginTop: 9, zIndex: 999, }} >
        <View style={{ backgroundColor: colors.BgLightGray, width: "100%", height: 4, position: "relative", borderRadius: 2 }} >
          <View style={{ width: `${percentageProgress}%`, height: 4, backgroundColor: colors.BgSuccess, borderRadius: 2 }} />
          <View style={{ width: 35, height: 18, left: `${percentageProgress}%`, top: -7, backgroundColor: colors.BgSuccess, borderRadius: 20, position: "absolute", marginLeft: percentageProgress > 83 ? -35 : percentageProgress < 17.5 ? 0 : -17.5, alignItems: "center", justifyContent: "center" }} >
            <Text style={[
              Typography.regularCaption,
              {
                color: colors.TextContrastSecondary
              }
            ]} >{percentageProgress}%</Text>
          </View>
        </View>
      </View>

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
    paddingTop: 25,
  },
  connectionError: {
    marginTop: 100,
    textAlign: 'center',
  }
});
