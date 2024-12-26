import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { CardMode, QuestionMode } from "@/shared/constants/kana";

import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";
import { Typography } from "@/shared/typography";
import ButtonCard from "../button-card/button-card";

export type CardModeSelectProps = {
  isHiraganaAvailable: boolean;
  isKatakanaAvailable: boolean;

  questionMode: QuestionMode;

  setCards: React.Dispatch<React.SetStateAction<CardMode[]>>;
};

const CardModeSelect: React.FC<CardModeSelectProps> = ({
  isHiraganaAvailable,
  isKatakanaAvailable,
  questionMode,
  setCards,
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const [selectedCardMode, setSelectedCardMode] = useState<CardMode[]>([]);

  useEffect(() => {
    const initial = [];

    if (questionMode === QuestionMode.Choose) {
      if (isHiraganaAvailable) initial.push(CardMode.hiraganaToRomaji);
      if (isHiraganaAvailable) initial.push(CardMode.romajiToHiragana);
      if (isKatakanaAvailable) initial.push(CardMode.katakanaToRomaji);
      if (isKatakanaAvailable) initial.push(CardMode.romajiToKatakana);
    }

    if (questionMode === QuestionMode.Brash) {
      if (isHiraganaAvailable) initial.push(CardMode.romajiToHiragana);
      if (isKatakanaAvailable) initial.push(CardMode.romajiToKatakana);
    }
    
    if (questionMode === QuestionMode.Type) {
      if (isHiraganaAvailable) initial.push(CardMode.hiraganaToRomaji);
      if (isKatakanaAvailable) initial.push(CardMode.katakanaToRomaji);
    }

    setSelectedCardMode(initial);
    setCards(initial);
  }, [isHiraganaAvailable, isKatakanaAvailable, setCards, questionMode]);

  enum CardType {
    Active,
    Inactive,
    Disabled,
  }

  const getTextStyle = (type: CardType) => [
    Typography.boldH4,
    {
      width: 18,
      color:
        type === CardType.Disabled ? colors.TextSecondary :
        type === CardType.Active
          ? colors.TextPrimary
          : type === CardType.Inactive
            ? colors.TextPrimary
            : colors.TextSecondary,
    },
  ];

  const icon = (type: CardType) => (
    <Icon
      name={"chevron-right"}
      size={24}
      color={
        type === CardType.Active
          ? colors.TextPrimary
          : type === CardType.Inactive
            ? colors.TextPrimary
            : colors.TextSecondary
      }
    />
  );

  interface Card {
    title: (type: CardType) => React.JSX.Element
    key: CardMode
    condition: boolean
  }

  const cards: Card[][] = [[], []];

  if (questionMode === QuestionMode.Choose) {
    cards[0].push({
      title: (type: CardType) => (
        <View style={styles.line}>
          <Text style={getTextStyle(type)}>あ</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>A</Text>
        </View>
      ),
      key: CardMode.hiraganaToRomaji,
      condition: isHiraganaAvailable,
    })
    cards[0].push({
      title: (type: CardType) => (
        <View style={styles.line}>
          <Text style={getTextStyle(type)}>A</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>あ</Text>
        </View>
      ),
      key: CardMode.romajiToHiragana,
      condition: isHiraganaAvailable,
    })
    cards[0].push({
      title: (type: CardType) => (
        <View style={styles.line}>
          <Text style={getTextStyle(type)}>あ</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>ア</Text>
        </View>
      ),
      key: CardMode.hiraganaToKatakana,
      condition: isHiraganaAvailable && isKatakanaAvailable,
    })

    cards[1].push({
      title: (type: CardType) => (
        <View style={styles.line}>
          <Text style={getTextStyle(type)}>ア</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>A</Text>
        </View>
      ),
      key: CardMode.katakanaToRomaji,
      condition: isKatakanaAvailable,
    })
    cards[1].push({
      title: (type: CardType) => (
        <View style={styles.line}>
          <Text style={getTextStyle(type)}>A</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>ア</Text>
        </View>
      ),
      key: CardMode.romajiToKatakana,
      condition: isKatakanaAvailable,
    })
    cards[1].push({
      title: (type: CardType) => (
        <View style={styles.line}>
          <Text style={getTextStyle(type)}>ア</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>あ</Text>
        </View>
      ),
      key: CardMode.katakanaToHiragana,
      condition: isHiraganaAvailable && isKatakanaAvailable,
    })
  }
  
  if (questionMode === QuestionMode.Brash) {
    cards[0].push({
      title: (type: CardType) => (
        <View style={styles.line}>
          <Text style={getTextStyle(type)}>A</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>あ</Text>
        </View>
      ),
      key: CardMode.romajiToHiragana,
      condition: isHiraganaAvailable,
    });

    cards[1].push({
      title: (type: CardType) => (
        <View style={styles.line}>
          <Text style={getTextStyle(type)}>A</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>ア</Text>
        </View>
      ),
      key: CardMode.romajiToKatakana,
      condition: isKatakanaAvailable,
    })
  }

  if (questionMode === QuestionMode.Type) {
    cards[0].push({
      title: (type: CardType) => (
        <View style={styles.line}>
          <Text style={getTextStyle(type)}>あ</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>A</Text>
        </View>
      ),
      key: CardMode.hiraganaToRomaji,
      condition: isHiraganaAvailable,
    })

    cards[1].push({
      title: (type: CardType) => (
        <View style={styles.line}>
          <Text style={getTextStyle(type)}>ア</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>A</Text>
        </View>
      ),
      key: CardMode.katakanaToRomaji,
      condition: isKatakanaAvailable,
    })
  }

  const toggle = (key: CardMode) => {
    if (selectedCardMode.includes(key)) {
      setSelectedCardMode((prev) => prev.filter((item) => item !== key));
      setCards((prev) => prev.filter((item) => item !== key));
    } else {
      setSelectedCardMode((prev) => [...prev, key]);
      setCards((prev) => [...prev, key]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[Typography.boldH3, { color: colors.TextPrimary }]}>
        {t("practice.mode.cards")}
      </Text>

      <View style={styles.buttonsContainer}>
        {cards.map((column, columnIndex) => (
          <View key={`column-${columnIndex}`} style={styles.column}>
            {column.map((btn) => (
              <ButtonCard<CardMode>
                key={btn.key}
                isGray
                setValue={toggle}
                currentValue={selectedCardMode.includes(btn.key) ? btn.key : false}
                value={btn.key}
                contentTop={btn.title(
                  btn.condition
                  ? selectedCardMode.includes(btn.key)
                  ? CardType.Active
                  : CardType.Inactive
                  : CardType.Disabled,
                )}
                text={columnIndex === 0 ? t("kana.hiragana") : t("kana.katakana")}
                isDisabled={!btn.condition}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default CardModeSelect;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 16,
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    gap: 16,
  },
  text: {
    fontWeight: "700",
    fontSize: 15,
    width: 13,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
