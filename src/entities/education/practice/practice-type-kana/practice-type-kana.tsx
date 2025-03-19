import React, { useState } from "react";

import { StyleSheet, Text, TextInput, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import {
  ILetter,
} from "@/shared/data/lettersTable";
import { Kana, TEST_DELAY } from "@/shared/constants/kana";
import { useTranslation } from "react-i18next";
import { Typography } from "@/shared/typography";
import { useTransliterationsContext } from "@/features/settings/settings-transliterations/context/transliteration";
import CustomKeyboard from "@/entities/general/keyboard/keyboard";

interface PracticeTypeKanaProps {
  symbol: ILetter;
  kana: Kana
  onError?: (id: number | string) => void;
  onCompleted?: (isErrors: boolean, pickedAnswer: ILetter) => void;
}

const PracticeTypeKana: React.FC<PracticeTypeKanaProps> = ({ symbol, kana, onCompleted, onError }) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const { transliterations } = useTransliterationsContext();
  
  const [val, setVal] = useState<string | null>();
  const [status, setStatus] = useState<null | "red" | "green">();

  const key = (kana === Kana.Katakana ? "ka" : "hi");

  const borderColor = status === "green"
    ? colors.BorderSuccess
    : status === "red"
      ? colors.BorderDanger
      : colors.BorderDefault;

  const title = `${symbol?.[key]} (${kana === Kana.Hiragana ? t('kana.hiragana') : t('kana.katakana')})`

  const onSubmit = (val: string) => {
    if (!val) return

    if (val.toLowerCase() === symbol?.transliterations?.[transliterations].toLowerCase()) {
      setStatus("green")
    } else {
      setStatus("red")
    }

    setTimeout(() => {
      if (val.toLowerCase() === symbol?.transliterations?.[transliterations].toLowerCase()) {
        onCompleted?.(true, symbol)
      } else {
        onError?.(symbol.id)
        onCompleted?.(false, symbol)
      }

      setStatus(null)
      setVal(null);
    }, TEST_DELAY);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.symbol, Typography.boldH1, { color: colors.TextPrimary }]}>
          {title}
        </Text>

        <TextInput
          style={[
            styles.input,
            { backgroundColor: colors.BgPrimary, color: colors.TextPrimary, borderColor: borderColor }
          ]}
          value={val || ""}
          onChangeText={(val) => {
            setVal(val)
          }}
        />
      </View>

      <CustomKeyboard onSubmit={onSubmit} setValue={setVal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  input: {
    padding: 8,
    borderWidth: 1,
    marginBottom: 16,
    marginTop: 16,
    borderRadius: 6,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "600",
  },
  symbol: {
    textAlign: "center",
  },
  subText: {
    textAlign: "auto",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default PracticeTypeKana;
