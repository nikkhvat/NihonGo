import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { LessonFinish } from "@/shared/constants/lessons";

import * as StoreReview from "expo-store-review";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { LearningTitle } from "../ui/title";
import { Typography } from "@/shared/typography";
import { isIOS } from "@/shared/constants/platformUtil";
import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";

type FinishScreenProps = LessonFinish & {
  next: () => void;
  retry: () => void;
};

const FinishScreen: React.FC<FinishScreenProps> = ({ next, retry }) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const onNext = () => {
    next();
    const chance = Math.random();

    try {
      if (isIOS && chance <= 0.1) {
        StoreReview.requestReview();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <LearningTitle style={[Typography.boldH1]}>
          {t("lesson.learningComplete")}
        </LearningTitle>
        <LearningTitle
          style={[Typography.regularParagraph, { color: colors.TextSecondary }]}
        >
          {t("lesson.practiceEveryDay")}
        </LearningTitle>
      </View>

      <View style={styles.buttonsContainer}>
        <SecondaryButton isHapticFeedback isOutline isFullWidth text={t("common.retry")} onClick={retry} />
        <PrimaryButton
          isHapticFeedback
          isFullWidth
          text={t("common.complete")}
          onClick={onNext}
        />
      </View>
    </View>
  );
};

export default FinishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleContainer: {
    width: "100%",
    flex: 1,
    gap: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    width: "100%",
    gap: 16,

    height: 116,
  },
});
