import React from "react";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import {
  StyleSheet,
  Text,
  View,
  Switch,
  Linking,
  Pressable,
} from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import { useHaptic } from "@/shared/helpers/haptic";

interface SettingItemProps {
  text: string;
  subText?: string;
  isEnable?: boolean;
  onValueChange?: () => void;
  onClick?: () => void;
  isLast?: boolean;
  link?: string;
}

const SettingItem: React.FC<SettingItemProps> = ({
  text,
  subText,
  isEnable,
  onValueChange,
  isLast,
  onClick,
  link,
}) => {
  const { colors } = useThemeContext();
  const { triggerHaptic } = useHaptic()  

  return (
    <Pressable
      style={[
        styles.container,
        !isLast
          ? {
              borderBottomWidth: 1,
              borderBottomColor: colors.BorderDefault,
              borderColor: colors.BorderDefault,
            }
          : {},
        !subText ? { height: 44 } : { height: 64 },
      ]}
      onPress={() => {
        triggerHaptic()
        
        if (link) {
          Linking.openURL(link);
        }

        if (onClick !== undefined) {
          onClick();
        }
      }}
    >
      <View
        style={{
          flexDirection: "column",
          flexWrap: "wrap",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <Text style={[Typography.regularH4, { color: colors.TextPrimary }]}>
          {text}
        </Text>
        {subText && (
          <Text
            style={[
              Typography.regularParagraph,
              { color: colors.TextSecondary },
            ]}
          >
            {subText}
          </Text>
        )}
      </View>

      {isEnable !== undefined && onValueChange !== undefined && (
        <Switch
          trackColor={{
            false: colors.BgAccentPrimary,
            true: colors.BgAccentPrimary,
          }}
          thumbColor={isEnable ? colors.BgPrimary : colors.BgPrimary}
          ios_backgroundColor={colors.BgLightGray}
          onValueChange={() => {
            triggerHaptic()
            onValueChange?.();
          }}
          value={isEnable}
        />
      )}

      {link && (
        <Icon name={"chevron-right"} size={24} color={colors.IconSecondary} />
      )}

      {onClick !== undefined && (
        <Icon name={"chevron-right"} size={24} color={colors.IconSecondary} />
      )}
    </Pressable>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
});
