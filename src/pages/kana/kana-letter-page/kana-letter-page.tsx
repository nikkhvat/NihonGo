import React, { useEffect, useMemo, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import Draw from "@/entities/education/draw/draw";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import SoundLetter from "@/entities/kana/sound-letter/sound-letter";
import Symbol from "@/entities/kana/symbol/symbol";
import SymbolHeader from "@/entities/kana/symbol-header/symbol-header";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import {
  ILetter,
  LettersKeys,
  baseFlatLettersId,
  dakuonFlatLettersId,
  handakuonFlatLettersId,
  lettersTableById,
  yoonFlatLettersId,
} from "@/shared/data/lettersTable";
import { useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/app/navigationTypes";
import IconButton from "@/shared/ui/icon-button";
import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";
import { ROUTES } from "@/app/navigationTypes";

import { useNavigation } from '@react-navigation/native';
import { isAndroid } from "@/shared/constants/platformUtil";
import { Typography } from "@/shared/typography";

interface KanaInfoProps {
  route: RouteProp<RootStackParamList, typeof ROUTES.KANA_INFO>;
  navigation: StackNavigationProp<RootStackParamList, typeof ROUTES.KANA_INFO>;

  customProps?: {
    id: string,
    kana: KanaAlphabet
  }

  onClose?: () => void;
  isOnlyDrawing?: boolean;
}

enum Screen {
  Symbol,
  Draw,
}

const KanaLetterPage: React.FC<KanaInfoProps> = ({ route, customProps, isOnlyDrawing, onClose }) => {
  const navigation = useNavigation();

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const { colors } = useThemeContext();

  const { id: LetterIdFromParams, kana: kanaFromParams } = route.params || customProps;

  const [letterId, setLetterId] = useState(LetterIdFromParams);
  const [letterKana, setLetterKana] = useState(kanaFromParams);
  const [currentScreen, setCurrentScreen] = useState(isOnlyDrawing ? Screen.Draw : Screen.Symbol);

  const leftIcon = (
    <Icon name={"chevron-left"} size={24} color={colors.IconPrimary} />
  );

  const rightIcon = (
    <Icon name={"chevron-right"} size={24} color={colors.IconPrimary} />
  );

  const pencilIcon = (
    <Icon name={"pencil-outline"} size={24} color={colors.IconPrimary} />
  );

  const flatLetters = useMemo(
    () => [
      ...baseFlatLettersId,
      ...dakuonFlatLettersId,
      ...handakuonFlatLettersId,
      ...yoonFlatLettersId,
    ],
    [],
  );

  const letterStat = useAppSelector(
    (state) => state.statistics.statistics[letterKana][letterId],
  );

  const headerTitle =
    letterKana === KanaAlphabet.Hiragana
      ? t("kana.hiragana")
      : t("kana.katakana");

  const switchButtonText = `${letterKana === KanaAlphabet.Hiragana ? t("kana.katakana") : t("kana.hiragana")}`;

  useEffect(() => {
    navigation.setOptions({
      header: () => <View style={{
        paddingLeft: insets.left + 16,
        paddingRight: insets.right + 16,
        backgroundColor: "transparent",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }} >
        <IconButton onPress={switchScreen}>
          <Icon
            name={currentScreen === Screen.Draw ? "chevron-left" : "close"}
            size={29}
            color={colors.IconPrimary}
          />
        </IconButton>
        <Text style={[Typography.semiBoldH4, { color: colors.TextPrimary }]} >
          {headerTitle}
        </Text>

        <View style={{ width: 50 }} ></View>
      </View>
    });
  }, [navigation, currentScreen, letterKana]);

  const isEnabledStats = useAppSelector((state) => state.statistics.isEnabled);

  const active = lettersTableById[letterId as LettersKeys];
  const activeIndex = flatLetters.findIndex((element) => element === active.id);

  const prevLetter = () =>
    activeIndex !== 0 && setLetterId(flatLetters[activeIndex - 1]);

  const nextLetter = () =>
    flatLetters.length !== activeIndex + 1 &&
    setLetterId(flatLetters[activeIndex + 1]);

  const letter = lettersTableById[letterId as LettersKeys];

  const goToDrawScreen = () => setCurrentScreen(Screen.Draw);

  const switchScreen = () => {
    if (currentScreen) {
      return setCurrentScreen(Screen.Symbol);
    }

    navigation.goBack();
  };

  const switchKana = () => {
    if (letterKana === KanaAlphabet.Hiragana) {
      return setLetterKana(KanaAlphabet.Katakana);
    }

    setLetterKana(KanaAlphabet.Hiragana);
  };

  return (
    <AdaptiveLayout style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.symbolContainer}>
          
          <View style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }} >
            <SymbolHeader
              indicatorColor={isEnabledStats ? letterStat?.level : null}
              hideTitle
              kana={letterKana}
              letter={letter as unknown as ILetter}
            />
          </View>

            <View style={{ marginTop: 16 }}> 
            {currentScreen === Screen.Symbol && <View style={{
              backgroundColor: colors.BgSecondary,
              borderRadius: 24,
            }} >
              <Symbol id={letter.id} kana={letterKana} />
            </View>}

            {currentScreen === Screen.Draw && (
              <Draw
                kana={letterKana}
                letter={letter as unknown as ILetter}
                isTextRecognition
              />
            )}
            </View>
        </View>

        <View style={styles.buttonContainer}>
          {currentScreen === Screen.Symbol && (
            <View style={styles.buttons}>
              <SoundLetter id={letter.id} />

              <SecondaryButton
                isHapticFeedback
                icon={pencilIcon}
                isOutline
                isFullWidth
                onClick={goToDrawScreen}
              />
            </View>
          )}
        </View>

        {!isOnlyDrawing && <View style={[styles.buttons, { paddingBottom: insets.bottom }]}>
          <SecondaryButton
            isHapticFeedback
            icon={leftIcon}
            isOutline
            width={50}
            onClick={() => prevLetter()}
          />

          <SecondaryButton
            isHapticFeedback
            text={switchButtonText}
            icon={<Icon name={"chevron-right"} size={24} color={colors.IconPrimary} />}
            isOutline
            isFullWidth
            onClick={switchKana}
          />

          <SecondaryButton
            isHapticFeedback
            icon={rightIcon}
            isOutline
            width={50}
            onClick={() => nextLetter()}
          />
        </View>}
      </View>
    </AdaptiveLayout>
  );
};

export default KanaLetterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  symbolContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 16,
    gap: 16,
  },
});
