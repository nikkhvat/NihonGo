import React, { FC, ReactNode } from "react";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";

import { Text, StyleSheet, Pressable, StyleProp, ViewStyle, TextStyle, DimensionValue } from "react-native";
import { useHaptic } from "@/shared/helpers/haptic";

interface PrimaryButtonProps {
  content?: ReactNode;

  text?: string;
  icon?: React.ReactElement;

  isDisabled?: boolean;
  isOutline?: boolean;
  isIcon?: boolean;

  width?: DimensionValue;
  isFullWidth?: boolean;

  isHapticFeedback?: boolean;

  containerStyles?: StyleProp<ViewStyle>;
  containerStylesFunc?: (option: { pressed: boolean }) => StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;

  children?: React.ReactElement;

  onClick?: () => void;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  content,
  text,

  icon,

  isDisabled,
  isOutline,
  isIcon,

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

  const getButtonStyles = (pressed: boolean) => [
    isFullWidth ? { flex: 1 } : { width },

    isDisabled
      ? { backgroundColor: colors.BgLightGray, borderColor: colors.BorderDefault }
      : {
        backgroundColor: pressed
          ? colors.BgContrastPressed
          : colors.BgContrast,
      },

    isIcon && {
      backgroundColor: pressed
        ? colors.BgAccentSecondaryPressed
        : colors.BgAccentSecondary,
      borderColor: pressed
        ? colors.BgAccentSecondaryPressed
        : colors.BgAccentSecondary,
    },

    isOutline && {
      backgroundColor: pressed ? colors.BgPrimaryPressed : colors.BgPrimary,
      borderColor: colors.BorderDefault,
    },

    styles.button,
    containerStyles,
    containerStylesFunc?.({pressed}),
  ];

  const getTextStyles = () => [
    {
      color: isDisabled ? colors.TextSecondary : colors.TextContrastPrimary,
    },
    isOutline && {
      color: isDisabled ? colors.TextSecondary : colors.TextPrimary,
    },
    Typography.boldH4,
    textStyles,
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

export default PrimaryButton;