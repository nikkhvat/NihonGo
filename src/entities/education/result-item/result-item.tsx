import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface ResultItemProps {
  title: string,
  body: string,
}

const ResultItem: FC<ResultItemProps> = ({ title, body }) => {
  const { colors } = useThemeContext();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.BgSecondary }]}>
      <Text style={[Typography.regularH4, { color: colors.TextSecondary}]}>{title}</Text>
      <Text style={[Typography.boldH4, { color: colors.TextPrimary }]}>{body}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 84,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 10,
  }
});

export default ResultItem;