import React from "react";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { getImage } from "@/shared/resources/svgs";
import { useWindowDimensions, View } from "react-native";
import { verticalScale } from "@/shared/helpers/metrics";
import { TABLET_PADDING, TABLET_WIDTH } from "@/shared/constants/app";


interface SymbolProps {
  id: string
  kana: KanaAlphabet.Hiragana | KanaAlphabet.Katakana
  width?: number
  height?: number

  isGray?: boolean
}

const Symbol: React.FC<SymbolProps> = ({
  id,
  kana,

  isGray,
}) => {
  const { width } = useWindowDimensions()
  const { colors } = useThemeContext();

  const canvasSize = width - 40 - (width > TABLET_WIDTH ? verticalScale(TABLET_PADDING) : 0);

  const getImagePath = (key: string | undefined) => {
    const keyString = `${kana}_${key?.replaceAll("-", "_")}`;

    return getImage(keyString);
  };

  const fillColor = isGray ? colors.BgLightGray : colors.BgAccentPrimary;
  const strokeColor = isGray ? colors.BgLightGray : colors.BgContrast;

  return <View style={{
    height: canvasSize,
    width: canvasSize,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }} >
    {getImagePath(id)(fillColor, strokeColor)}
  </View>;
};

export default Symbol;