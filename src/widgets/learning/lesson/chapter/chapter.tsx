import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native";

import TopicItem from "@/entities/education/learning/topic-item/topic-item";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { AutoLesson, ManuallyLesson } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { useAppSelector } from "@/shared/model/hooks";
import { Typography } from "@/shared/typography";

type ChapterProps = {
  title: string
  lessons: (AutoLesson | ManuallyLesson)[]
  startLesson: (item: AutoLesson | ManuallyLesson) => void
  isLast: boolean
}

const Chapter: React.FC<ChapterProps> = ({
  lessons,
  title,
  isLast,
  startLesson,
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const { getRomanji } = useGetRomanji();

  const [activeLesson, setActiveLesson] = useState<string | null>(null);


  const isAutoLesson = (item: AutoLesson | ManuallyLesson): item is AutoLesson => "letters" in item;

  const completedLessons = useAppSelector(
    (state) => state.lessons.completedLesson,
  );

  const firstChapterIds = lessons.map((item) => item.id);
  const firstChapterProgress = firstChapterIds.filter((item) =>
    completedLessons.includes(item) || completedLessons.includes(item),
  );

  const toggleActiveLesson = (key: string) => {
    if (activeLesson === key) {
      setActiveLesson("");
    } else {
      setActiveLesson(key);
    }
  };
  
  const subtitleColor = firstChapterProgress.length === firstChapterIds.length
    ? colors.TextSuccess
    : colors.TextPrimary

  if (lessons.length === 0) return <></>;

  return (
    <View>
      <Text style={[styles.title, Typography.boldH3, { color: colors.TextPrimary }]}>
        {title}
      </Text>

      <Text
        style={[
          styles.subtitle,
          Typography.boldLabel,
          { color: subtitleColor },
        ]}
      >
        {firstChapterProgress.length}/{firstChapterIds.length}{" "}
        {t("lessonsList.completed")}
      </Text>

      {lessons.map((item, index) => {
        if (isAutoLesson(item)) {
          const activeTab = (item as any).type === "hiragana" ?
            KanaAlphabet.Hiragana :
            KanaAlphabet.Katakana;
  
          const kanaTitle = activeTab === KanaAlphabet.Hiragana
              ? t("kana.hiragana")
              : t("kana.katakana");

          return (
            <TopicItem
              key={getKana(item.title, activeTab)}
              isPassed={completedLessons.includes(item.id)}
              isOpened={activeLesson === getKana(item.title, activeTab)}
              isLast={index + 1 === lessons.length}
              icon={getKana(item.title, activeTab)}
              title={`${t("lessonsList.lesson")} ${index + (activeTab === KanaAlphabet.Katakana ? 11 : 0)}`}
              subtitle={item.letters
                .map((item) => getKana(item, activeTab))
                .join(", ")}
              infoTitle={`${kanaTitle} ${item.letters
                .map((item) => getRomanji(item))
                .join(", ")
                .toLocaleLowerCase()}`}
              infoSubTitle={`${t(item.msg).replace('{{count}}', item.letters.length.toString())}`}
              onClick={() =>
                toggleActiveLesson(getKana(item.title, activeTab))
              }
              onStartLesson={() =>
                startLesson({ ...item, kana: activeTab })
              }
            />
          );
        }

        const isPassed = completedLessons.includes(item.id);

        return (
          <TopicItem
            key={item.title}
            isPassed={isPassed}
            isOpened={activeLesson === `${item.title}`}
            isLast={index + 1 === lessons.length}
            icon={item.icon}
            title={item.title}
            subtitle={item.subTitle}
            infoTitle={item.infoTitle}
            infoSubTitle={item.infoSubTitle}
            onClick={() =>
              toggleActiveLesson(`${item.title}`)
            }
            onStartLesson={() => startLesson({ ...item })}
          />
        );
      })}
      
      {!isLast && <View style={[styles.line, { backgroundColor: colors.BorderDefault}]} />}
    </View>
  );
};

export default Chapter;

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 22,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 22,
    paddingHorizontal: 20,
  },
  line: {
    width: "100%",
    height: 1,
    marginBottom: 30
  }
});
