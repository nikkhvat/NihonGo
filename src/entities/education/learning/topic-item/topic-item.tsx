import React from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { Typography } from "@/shared/typography";

interface TopicItemProps {
  isPassed?: boolean;
  isOpened?: boolean;
  isLast: boolean;

  icon?: string;
  title: string;
  subtitle: string;
  infoTitle: string;
  infoSubTitle: string;

  onClick?: () => void;
  onStartLesson?: () => void;
}

const TopicItem: React.FC<TopicItemProps> = ({
  icon = "?",
  isPassed,
  title,
  subtitle,
  infoTitle,
  infoSubTitle,
  isLast,
  isOpened,
  onClick,
  onStartLesson,
}) => {
  const { width } = useWindowDimensions()
  const { colors } = useThemeContext();
  const { t, i18n } = useTranslation();

  const indicatorRoundColors = {
    borderColor: isPassed ? colors.BgSuccess : colors.BgAccentSecondary,
    backgroundColor: "transparent",
  };

  const indicatorCheckColors = {
    borderColor: colors.BgPrimary,
    backgroundColor: colors.BgSuccess,
  };

  const indicatorIconColors = {
    backgroundColor: colors.BgAccentSecondary,
  };

  const lineStyle = {
    backgroundColor: isPassed ? colors.BgSuccess : colors.BgAccentSecondary,
    height: isOpened ? "65%" : 16,
  } as const;

  return (
    <Pressable
      style={[
        styles.container,
        { paddingBottom: isOpened && !isLast ? 8 : 26 },
      ]}
      onPress={() => onClick?.()}
    >
      <View style={[styles.content]}>
        <View style={styles.indicator}>
          <View style={[styles.indicatorRound, indicatorRoundColors]}></View>
          <View style={[styles.indicatorIcon, indicatorIconColors]}>
            <Text style={[Typography.boldH2, { color: colors.BgContrast }]}>
              {icon}
            </Text>
          </View>
          {isPassed && (
            <View style={[styles.indicatorCheck, indicatorCheckColors]}>
              <Icon name={"check-bold"} size={12} color={colors.IconContrast} />
            </View>
          )}
        </View>

        <View style={[styles.info, { width: width - 130 }]}>
          <Text style={[Typography.boldH4, { color: colors.BgContrast, marginTop: 12, maxWidth: 180 }]}>{title}</Text>
          <Text style={[Typography.regularParagraph, { color: colors.BgContrast }]}>
            {subtitle}
          </Text>

          {isOpened && (
            <View style={styles.openedInfo}>
              <View>
                <View
                  style={[styles.infoLine, { backgroundColor: colors.BorderDefault }]}
                />
                <Text style={[Typography.boldH4, { color: colors.BgContrast, marginTop: 16 }]}>
                  {infoTitle}
                </Text>
                <Text style={[Typography.regularParagraph, { color: colors.BgContrast, marginTop: 4, }]}>
                  {infoSubTitle}
                </Text>
              </View>

              <PrimaryButton
                isHapticFeedback
                width={i18n.language === 'de' ? 128 : 108}
                text={isPassed ? t("common.retry") : t("common.start")}
                onClick={onStartLesson}
              />
            </View>
          )}
        </View>
      </View>
      {(!isLast || isOpened) && <View style={[styles.line, lineStyle]} />}
    </Pressable>
  );
};

export default TopicItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 8,
    flex: 1,
  },
  content: {
    width: "100%",
    flexDirection: "row",
    height: "100%",
    alignItems: "flex-start",
    gap: 16,
  },
  indicator: {
    position: "relative",
    width: 72,
    height: 72,
  },
  info: {
    gap: 5,
  },
  infoLine: {
    width: "100%",
    marginTop: 16,
    height: 1,
  },
  indicatorRound: {
    borderRadius: 70,
    width: 70,
    height: 70,
    borderWidth: 4,
  },
  indicatorIcon: {
    width: 54,
    height: 54,
    position: "absolute",
    borderRadius: 54,
    left: 8,
    top: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorCheck: {
    position: "absolute",
    bottom: -5,
    left: 26,
    width: 20,
    height: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  line: {
    width: 4,
    position: "absolute",
    left: 50,
    borderRadius: 4,
    top: 82,
  },
  openedInfo: {
    width: "100%",
    minHeight: 160,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
