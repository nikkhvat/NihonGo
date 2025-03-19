import React, { ReactNode } from "react";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";

import { Text, StyleSheet, Pressable, DimensionValue, StyleProp, TextStyle, ViewStyle } from "react-native";
import { useHaptic } from "@/shared/helpers/haptic";

interface SecondaryButtonProps {
  content?: ReactNode;

  text?: string;
  icon?: React.ReactElement;

  isDisabled?: boolean;
  isOutline?: boolean;
  isGray?: boolean;

  width?: DimensionValue;
  isFullWidth?: boolean;

  isHapticFeedback?: boolean;

  containerStyles?: StyleProp<ViewStyle>;
  containerStylesFunc?: (option: { pressed: boolean }) => StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;

  children?: React.ReactElement;

  onClick?: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  content,
  
  text,
  icon,

  isDisabled,
  isOutline,
  isGray,

  width,
  isFullWidth,

  isHapticFeedback,

  containerStyles,
  containerStylesFunc,
  textStyles,

  children,

  onClick,
}) => {
  const { triggerHaptic } = useHaptic();
  const { colors } = useThemeContext();

  const onPress = () => {
    if (isDisabled) return;

    triggerHaptic(isHapticFeedback);
    onClick?.();
  };

  const getButtonStyles = (pressed: boolean): StyleProp<ViewStyle> => [
    isFullWidth ? { flex: 1 } : { width },

    {
      backgroundColor: colors.BgAccentPrimary,
    },

    pressed &&
    !isOutline && {
      backgroundColor: colors.BgAccentPrimaryPressed,
    },

    isGray && {
      backgroundColor: colors.BgAccentSecondary,
    },

    pressed && isGray && {
      backgroundColor: colors.BgAccentSecondaryPressed,
    },

    isOutline && {
      backgroundColor: colors.BgSecondary,
    },

    isDisabled && {
      backgroundColor: colors.BgLightGray,
    },

    pressed &&
    isOutline &&
    !isDisabled && {
      backgroundColor: colors.BgPrimaryPressed,
    },

    icon && {
      flexDirection: "row",
      gap: 6,
      justifyContent: "center",
      alignItems: "center",
      height: 50,
    },

    styles.button,
    containerStyles && containerStyles,
    containerStylesFunc?.({ pressed }),
  ];

  const getTextStyles = () => [
    {
      color: colors.TextContrastSecondary,
    },
    isOutline && {
      color: colors.TextPrimary,
    },
    isDisabled && {
      color: colors.TextSecondary,
    },
    Typography.boldH4,
    textStyles && textStyles,
  ];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => getButtonStyles(pressed)}
    >
      {!content && text && <Text style={getTextStyles()}>{text}</Text>}

      {content && !text && content}
      {icon && icon}

      {children && children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,

    borderRadius: 12,
  },
});

export default SecondaryButton;