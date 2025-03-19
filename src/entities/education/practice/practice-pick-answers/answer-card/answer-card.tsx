import React from "react";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { ILetter } from "@/shared/data/lettersTable";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { Typography } from "@/shared/typography";

interface AnswerCardProps {
  value: ILetter
  children: string

  width: number

  redMarked: boolean
  greenMarked: boolean

  onClick?: (value: ILetter) => void
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  value,
  width,
  redMarked,
  greenMarked,
  children,
  onClick
}) => {

  const { colors } = useThemeContext();

  const cardColor = redMarked ? colors.BgDanger : greenMarked ? colors.BgSuccess : colors.BgSecondary;
  const textColor = (redMarked || greenMarked) ? colors.TextContrastSecondary : colors.TextPrimary;

  return (
    <PrimaryButton
      onClick={() => onClick?.(value)}
      containerStylesFunc={({ pressed }) => ({
        width: width,
        height: width,
        backgroundColor: pressed ? colors.BgPrimaryPressed : cardColor,
        borderRadius: 24,
      })}
      isOutline
      text={children}
      textStyles={{
        ...Typography.regularH4,
        color: textColor,
      }}
    />
  )
};

export default AnswerCard;
