import React from "react";

import { View } from "react-native";

import Symbol from "@/entities/kana/symbol/symbol";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";

type borderLetterProps = {
  id: string
  kana: KanaAlphabet

  marginTop?: number;
}

const BorderLetter: React.FC<borderLetterProps> = ({ id, kana, marginTop }) => {
  const { colors } = useThemeContext();

  return (
    <View>
      <View style={{
        backgroundColor: colors.BgSecondary,
        borderRadius: 12,
        marginTop: marginTop !== undefined ? marginTop : 30,
      }} >
        <Symbol id={id} kana={kana} />
      </View>
    </View>
  );
};

export default BorderLetter;