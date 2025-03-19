import React, { useEffect } from "react";

import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { CardMode, Kana } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { RootStackParamList } from "@/app/navigationTypes";
import CircularProgressBar from "@/shared/ui/progressbar/circular/circular-progress-bar";

import * as StoreReview from "expo-store-review";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { Typography } from "@/shared/typography";
import ResultItem from "@/entities/education/result-item/result-item";
import { ROUTES } from "@/app/navigationTypes";
import PageTitle from "@/shared/ui/page-title/page-title";
import { isIOS } from "@/shared/constants/platformUtil";

type LearnResultsNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.RESULTS>;
interface EducationResultProps {
  route: RouteProp<RootStackParamList, typeof ROUTES.RESULTS>;
}

const EducationResultPage: React.FC<EducationResultProps> = ({ route }) => {
  const navigation = useNavigation<LearnResultsNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    })
  }, [navigation])
  
  const { result } = route.params;

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { getRomanji } = useGetRomanji();

  const { colors } = useThemeContext();

  const home = () => {
    navigation.popToTop();

    const chance = Math.random();

    try {
      if (isIOS && chance <= 0.1) {
        StoreReview.requestReview();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const millisecondsToSeconds = (milliseconds: number) => {
    const totalSeconds = milliseconds / 1000;
    if (totalSeconds >= 60) {
      const minutes = Math.floor(totalSeconds / 60);
      const remainingSeconds = totalSeconds % 60;
      return `${minutes.toFixed(0)} ${t("result.min")} ${remainingSeconds.toFixed(0)} ${t("result.sec")}`;
    } else {
      return `${totalSeconds.toFixed(0)} ${t("result.sec")}`;
    }
  };

  const getKeyByKana = (letter: ILetter, kana: CardMode) => {
    const isKatakana =
      kana === CardMode.katakanaToHiragana ||
      kana === CardMode.katakanaToRomaji;
    const isHiragana =
      kana === CardMode.hiraganaToKatakana ||
      kana === CardMode.hiraganaToRomaji;

    return isKatakana ? letter.ka : isHiragana ? letter.hi : getRomanji(letter);
  };

  const getKeyAnswer = (letter: ILetter, mode: CardMode) => {
    if (mode === CardMode.hiraganaToKatakana)
      return `${letter.hi} (${letter.ka})`;
    if (mode === CardMode.hiraganaToRomaji)
      return `${letter.hi} (${getRomanji(letter)})`;
    if (mode === CardMode.romajiToHiragana)
      return `${getRomanji(letter)} (${letter.hi})`;
    if (mode === CardMode.katakanaToHiragana)
      return `${letter.ka} (${letter.hi})`;
    if (mode === CardMode.katakanaToRomaji)
      return `${letter.ka} (${getRomanji(letter)})`;
    if (mode === CardMode.romajiToKatakana)
      return `${getRomanji(letter)} (${letter.ka})`;
  };

  return (
    <AdaptiveLayout style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colors.BgPrimary,
        }}
      >
        <PageTitle style={containerStyles.title} >
          {t("result.title")}
        </PageTitle>

        <View
          style={[containerStyles.statsCard, Typography.boldH4, { borderColor: colors.BorderDefault }]}
        >
          <View style={containerStyles.statsGraph}>
            <CircularProgressBar
              progress={(result.correctQuestions / result.totalQuestions) * 100}
            />
          </View>
          <View>
            <Text
              style={[Typography.boldH3, { color: colors.TextPrimary }]}
            >
              {t("result.score")}
            </Text>
            <View style={containerStyles.statsSubText}>
              <Text
                style={[
                  Typography.boldH4,
                  { color: colors.TextPrimary },
                ]}
              >
                {result.correctQuestions} / {result.totalQuestions}
              </Text>
            </View>
            <Text
              style={[Typography.regularLabel, { color: colors.TextSecondary, marginTop: 32 }]}
            >
              {millisecondsToSeconds(result.totalTime)} (
              {millisecondsToSeconds(result.avgTime)} /{" "}
              {t("result.question")?.toLocaleLowerCase()})
            </Text>
          </View>
        </View>

        <ScrollView style={containerStyles.scroll}>
          {!(
            result.type === "RESULT_WORD_GAME" &&
            result.incorrectWordBuilding.length +
              result.incorrectFindThePair.length +
              result.incorrectChoice.length ===
              0
          ) && (
            <Text
              style={[
                Typography.boldH3,
                {
                  marginTop: 30,
                  color: colors.TextPrimary,
                },
              ]}
            >
              {t("result.details")}
            </Text>
          )}

          {result.type === "RESULT_PRACTICE" && (
          <ResultItem title={t("result.alphabet")} body={result.alphabets.map((alphabet) =>
              alphabet === Kana.Romanji
                ? t("kana.romanji")
                : alphabet === Kana.Hiragana
                  ? t("kana.hiragana")
                  : t("kana.katakana"),
            )
            .join(", ")} />
            )}

          {result.type === "RESULT_PRACTICE" && (
            <ResultItem title={t("result.fastestAnswer")} body={`${getKeyByKana(result.fastestAnswer.answer, result.fastestAnswer.type)} : ${millisecondsToSeconds(result.fastestAnswer.time)}`} />
          )}

          {result.type === "RESULT_PRACTICE" && (
            <ResultItem title={t("result.slowestAnswer")} body={`${getKeyByKana(result.slowestAnswer.answer, result.slowestAnswer.type)} : ${millisecondsToSeconds(result.slowestAnswer.time)}`} />
          )}
          
          {result.type === "RESULT_PRACTICE" && result.incorrect.length > 0 && (
            <ResultItem title={t("result.incorrectAnswers")} body={result.incorrect
              .map((item) => `${getKeyAnswer(item.letter, item.mode)}`)
              .join(", ")} />
          )}
          
          {result.type === "RESULT_WORD_GAME" && result.incorrectWordBuilding.length > 0 && (
            <ResultItem title={t("result.incorrectWordBuilding")} body={result.incorrectWordBuilding
              .map((item) => `${item[0]} (${item[1]})`)
              .join(", ")} />
          )}
          
          {result.type === "RESULT_WORD_GAME" && result.incorrectFindThePair.length > 0 && (
            <ResultItem title={t("result.incorrectFindPair")} body={result.incorrectFindThePair
              .map((item) => `${item[0]} (${item[1]})`)
              .join(", ")} />
          )}
          
          {result.type === "RESULT_WORD_GAME" && result.incorrectChoice.length > 0 && (
            <ResultItem title={t("result.incorrectChoice")} body={result.incorrectChoice
              .map((item) => `${item[0]} (${item[1]})`)
              .join(", ")} />
          )}
          

          {result.type === "RESULT_WORD_GAME" &&
            result.incorrectWordBuilding.length +
              result.incorrectFindThePair.length +
              result.incorrectChoice.length ===
              0 && (
              <Text
                style={[
                  containerStyles.wellDoneNoErrors,
                  { color: colors.TextPrimary },
                ]}
              >
                {t("result.wellDoneNoErrors")}
              </Text>
            )}
        </ScrollView>
        <View
          style={{ marginBottom: insets.bottom, paddingHorizontal: 20 }}
        >
          <PrimaryButton isHapticFeedback text={t("result.done")} onClick={home} />
        </View>
      </View>
    </AdaptiveLayout>
  );
};

const containerStyles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  scroll: {
    padding: 20,
    paddingTop: 0,
  },
  statsCard: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 130,
    flexDirection: "row",
    padding: 15,
    gap: 16,
  },
  statsGraph: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  statsSubText: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsCard: {
    width: "100%",
    minHeight: 84,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
    gap: 10,
  },
  detailsCardTitle: {
    fontSize: 17,
    fontWeight: "400",
  },
  detailsCardValue: {
    fontSize: 17,
    fontWeight: "700",
  },
  wellDoneNoErrors: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: "700",
  },
});

export default EducationResultPage;
