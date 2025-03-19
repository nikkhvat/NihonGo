import React, { useRef, useReducer, useState, useEffect } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Svg, Path } from "react-native-svg";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  GestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Symbol from "@/entities/kana/symbol/symbol";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TABLET_PADDING, TABLET_WIDTH } from "@/shared/constants/app";
import { KanaAlphabet, TEST_DELAY } from "@/shared/constants/kana";
import { dakuonFlatLettersId, handakuonFlatLettersId, ILetter, yoonFlatLettersId } from "@/shared/data/lettersTable";
import { verticalScale } from "@/shared/helpers/metrics";
import { useAppSelector } from "@/shared/model/hooks";
import ToggleStrokeWidth from "./buttons/toggle-stroke-width";
import ToggleShowBorders from "./buttons/toggle-show-borders";
import ToggleShowLetter from "./buttons/toggle-show-letter";
import ClearButtons from "./buttons/clear-buttons";
import CanvasBorder from "./canvas-border";
import Recognizer from "@/shared/helpers/hieroglyph-recognition/recognizer";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { kanaTemplates } from "@/shared/helpers/hieroglyph-recognition/templates";
import { useTranslation } from "react-i18next";
import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";
import { processDrawing } from "@/shared/helpers/hieroglyph-recognition/record";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Typography } from "@/shared/typography";
import { normalizeCoordinates } from "@/shared/helpers/hieroglyph-recognition/coordinates";

enum StateColor {
  Green = "Green",
  Red = "Red",
  NotInitialized = "not_initialized",
}
interface DrawProps {
  letter: ILetter;
  kana: KanaAlphabet;

  isCheck?: boolean;

  isFullHeight?: boolean;

  isTextRecognition?: boolean;

  onError?: (id: number | string) => void;
  onCompleted?: (isErrors: boolean, pickedAnswer: ILetter) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTypeById = (id: any) => {
  if (yoonFlatLettersId.includes(id)) return "kana.yoon";
  if (handakuonFlatLettersId.includes(id)) return "kana.handakuon";
  if (dakuonFlatLettersId.includes(id)) return "kana.dakuon";

  return "kana.basic";
};

const Draw: React.FC<DrawProps> = ({ isCheck, letter, kana, isTextRecognition, isFullHeight, onError, onCompleted }) => {
  const { width } = useWindowDimensions()
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const currentPathRef = useRef<{ x: number; y: number }[]>([]);
  const pathsRef = useRef<{ x: number; y: number }[][]>([]);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const canvasSize = width - 32 - (width > TABLET_WIDTH ? verticalScale(TABLET_PADDING) : 0);

  const strokeWidth =
    useAppSelector((state) => state.profile?.draw?.lineWidth) || 14;

  const isShowLetter = useAppSelector((state) => state.profile?.draw?.isShowLetter);
  const isShowBorder = useAppSelector((state) => state.profile?.draw?.isShowBorder);

  const onGestureEvent = (event: GestureHandlerGestureEvent) => {
    const { x, y } = event.nativeEvent as unknown as { x: number, y: number };

    if (currentPathRef.current.length === 0) {
      currentPathRef.current = [{ x, y }];
    } else {
      const newPoint = { x, y };
      currentPathRef.current = [...currentPathRef.current, newPoint];
    }

    requestAnimationFrame(() => {
      forceUpdate();
    });
  };

  const onHandlerStateChange = (event: GestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === 5) {
      pathsRef.current = [...pathsRef.current, currentPathRef.current];
      currentPathRef.current = [];
      forceUpdate();
    }
  };

  const handleClearStepButtonClick = () => {
    if (currentPathRef.current.length > 0) {
      currentPathRef.current.pop();
    } else if (pathsRef.current.length > 0) {
      pathsRef.current.pop();
    }
    forceUpdate();
  };

  const handleClearButtonClick = () => {
    pathsRef.current = [];
    currentPathRef.current = [];
    forceUpdate();
  };

  const generatePathDAttribute = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";

    const moveToStart = (x: number, y: number) => `M ${x},${y}`;
    
    const quadraticCurveTo = (x1: number, y1: number, x2: number, y2: number) => ` Q ${x1},${y1} ${x2},${y2}`;

    const smoothCurveTo = (x: number, y: number) => ` T ${x},${y}`;
    const getMidPoint = (point1: { x: number; y: number }, point2: { x: number; y: number }) => ({
      x: (point1.x + point2.x) / 2,
      y: (point1.y + point2.y) / 2,
    });

    let d = moveToStart(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currPoint = points[i];
      const midPoint = i > 1 ? getMidPoint(prevPoint, currPoint) : prevPoint;

      d += quadraticCurveTo(prevPoint.x, prevPoint.y, midPoint.x, midPoint.y);
    }

    const lastPoint = points[points.length - 1];
    d += smoothCurveTo(lastPoint.x, lastPoint.y);

    return d;
  };

  function shortenLines(data: number[][][]) {
    return data.map(line => line.map(item => item.map(point => +point.toFixed(4))))
  }

  const [state, setState] = useState<StateColor>(StateColor.NotInitialized)

  const detectSymbol = () => {
    const recognizer = new Recognizer();

    if (kana === KanaAlphabet.Hiragana) {
      kanaTemplates.addHiragana(recognizer)
    }
    
    if (kana === KanaAlphabet.Katakana) {
      kanaTemplates.addKatakana(recognizer)
    }

    const strokes = normalizeCoordinates(pathsRef.current);

    const result = recognizer.recognize(strokes);
    const isSomeKana = result
      ?.some(symbol => symbol.name[0] === (kana === KanaAlphabet.Hiragana ? letter.hi : letter.ka));

    if (isSomeKana) {
      setState(StateColor.Green)
      setTimeout(() => {
        onCompleted?.(true, letter)
        setState(StateColor.NotInitialized)
        handleClearButtonClick()
      }, TEST_DELAY)
    } else {
      setState(StateColor.Red)
      setTimeout(() => {
        onError?.(letter.id)
        onCompleted?.(false, letter)
        setState(StateColor.NotInitialized)
        handleClearButtonClick()
      }, TEST_DELAY)
    }
  }

  const IS_SAVE = false;

  useEffect(() => {
    handleClearButtonClick();
  }, [letter])

  return (
    <GestureHandlerRootView style={[{ height: canvasSize + 165 }, isFullHeight ? {flex: 1, justifyContent: "space-between"} : {}]}>
      <View>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <View
            style={{
              borderRadius: 24,
              position: "relative",
              height: canvasSize,
              width: canvasSize,
            }}
          >
            <View style={{
              borderRadius: 22,
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: "100%",
              height: "100%",
              borderWidth: 1,
              borderColor: colors.BorderDefault,
            }} />

            {state !== StateColor.NotInitialized && <View style={{
              position: "absolute",
              backgroundColor: colors.BgSecondary,
              width: 90,
              height: 90,
              right: 0,
              zIndex: 999,
              borderWidth: 1,
              borderColor: colors.BorderDefault,
              borderTopRightRadius: 24,
              borderBottomLeftRadius: 24,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2
            }} >
              {state === StateColor.Green && <Icon name={"circle-outline"} size={32} color={colors.TextSuccess} />}
              {state === StateColor.Green && <Text style={[
                { color: colors.TextSuccess },
                Typography.boldH3
              ]}>まる</Text>}
              {state === StateColor.Red && <Icon name={"close"} size={32} color={colors.TextDanger} />}
              {state === StateColor.Red && <Text style={[
                { color: colors.TextDanger },
                Typography.boldH3
              ]}>ばつ</Text>}
            </View>}

            {isShowLetter && !isCheck && (
              <View
                style={[
                  styles.drawContainerImage,
                  { width: canvasSize - 2, height: canvasSize - 1 },
                ]}
              >
                <Symbol isGray id={letter?.id} kana={kana} />
              </View>
            )}
            <Svg height={canvasSize} width={canvasSize}>
              {isShowBorder && <CanvasBorder canvasSize={canvasSize} />}
              {pathsRef.current.map((path, index) => (
                <Path
                  key={`path-${index}`}
                  d={generatePathDAttribute(path)}
                  stroke={colors.BgContrast}
                  fill="transparent"
                  strokeWidth={isCheck ? 6 : strokeWidth}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              ))}
              <Path
                d={generatePathDAttribute(currentPathRef.current)}
                stroke={colors.BgContrast}
                fill="transparent"
                strokeWidth={isCheck ? 6 : strokeWidth}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </PanGestureHandler>

        <View>
          <ClearButtons
            clearFull={handleClearButtonClick}
            clearStep={handleClearStepButtonClick}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.actionButtons}>
              {(getTypeById(letter.id) === "kana.basic" && isTextRecognition) &&
                <SecondaryButton
                  width={50}
                  icon={
                    <Icon
                      name={"text-recognition"}
                      size={24}
                      color={colors.IconContrast} />}
                  onClick={detectSymbol}
                  textStyles={[Typography.boldH2, { marginLeft: 10 }]}
                  containerStyles={{
                    flexDirection: 'row-reverse',
                    alignItems: 'center'
                  }}
                />}

              {IS_SAVE && <SecondaryButton
                width={50}
                icon={
                  <Icon
                    name={"content-save-all-outline"}
                    size={24}
                    color={colors.IconContrast} />}
                onClick={() => {
                  const points = shortenLines(normalizeCoordinates(processDrawing(pathsRef.current)));
                  console.log(JSON.stringify(points))
                }}
              />}
                
              {!isCheck && <ToggleShowBorders />}
              {!isCheck && <ToggleShowLetter />}
            </View>
            {!isCheck &&  <ToggleStrokeWidth />}
          </View>
        </View>
      </View>

      {isCheck && <PrimaryButton isHapticFeedback onClick={detectSymbol} text={t("practice.check")} />}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  drawContainerImage: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 16,
  },
});

export default Draw;