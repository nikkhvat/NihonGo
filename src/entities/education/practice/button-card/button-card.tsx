import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";
import React, { ReactNode } from "react";
import { StyleProp, View, ViewStyle, Text, useWindowDimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";

interface ButtonCardProps<T extends string> {
  icon?: string
  text?: string
  contentTop?: ReactNode
  content?: ReactNode

  isGray?: boolean
  
  setValue: (mode: T) => void;
  currentValue: T | false;
  value: T;

  isDisabled?: boolean;
}


function ButtonCard<T extends string>({
  icon,
  text,
  contentTop,
  content,
  
  isGray,
  
  setValue,
  currentValue,
  value,
  
  isDisabled,
}: ButtonCardProps<T>) {
  const { width } = useWindowDimensions()
  const { colors } = useThemeContext();
  
  const buttonStyle: StyleProp<ViewStyle> = {
    flexDirection: "column",
    alignItems: "flex-start",
    width: width /2 - 28,
    gap: 60,
    height: "auto",
    padding: 14,
  }

  const primaryTextColor = value !== currentValue ? colors.TextPrimary : colors.TextContrastSecondary;

  return (
    <SecondaryButton
      isGray={isGray}
      onClick={() => setValue(value)}
      containerStyles={{ ...buttonStyle, ...{ borderColor: colors.BorderDefault } }}
      isHapticFeedback
      isDisabled={isDisabled}
      isOutline={value !== currentValue} >
      <View style={{ flexDirection: "column", gap: 8 }} >
        {icon && <Icon
          name={icon as any}
          size={24}
          color={isGray ? colors.IconPrimary : value !== currentValue ? colors.IconPrimary : colors.IconContrast}
        />}
        {contentTop && contentTop}
        {content && content}
        {text && <Text style={[Typography.boldParagraph, { color: isDisabled ? colors.TextSecondary :  isGray ? colors.TextPrimary : primaryTextColor }]} >{text}</Text>}
      </View>
    </SecondaryButton>
  )
};

export default ButtonCard;