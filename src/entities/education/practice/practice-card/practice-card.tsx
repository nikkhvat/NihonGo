import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

import { Typography } from "@/shared/typography";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface PracticeCardProps {
  image?: any
  title: string
  subtitle: string
  onClick: () => void
}

const PracticeCard: React.FC<PracticeCardProps> = ({
  title,
  subtitle,
  onClick,
  image,
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  return (
    <Pressable onPress={onClick} style={({ pressed }) => [styles.card, { backgroundColor: pressed ? colors.BgPrimaryPressed : colors.BgPrimary }]}>
      <View style={styles.content} >
        {image && <Image style={[styles.image, { borderColor: colors.BorderDefault }]} source={image} />}

        <View style={styles.description} >
          <Text style={[styles.title, { color: colors.TextPrimary }, Typography.boldH4]}>{title}</Text>
          <Text style={[styles.subtitle, { color: colors.TextPrimary }, Typography.regularParagraph]}>{subtitle}</Text>
        </View>
      </View>

      <Icon name="chevron-right" color={colors.IconSecondary} size={30} />
    </Pressable>
  )
};

export default PracticeCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 86,
    gap: 16,
    marginBottom: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 100,
  },
  description: {
    flexDirection: "column",
    gap: 4,
  },
  title: {},
  subtitle: {},
});
