import React, { useEffect, useRef, useState } from "react";

import { View, Text, StyleSheet, Animated, useWindowDimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

interface EducationPracticeTimerProps {
  onTimerEnd?: () => void;
  initial: number;
  currentIndex: number;
  questions: number;
  customStyles?: Record<string, string | number>;
}


const EducationPracticeTimer: React.FC<EducationPracticeTimerProps> = ({
  initial = 5,
  onTimerEnd,
  currentIndex,
  questions,
  customStyles = {},
}) => {
  const { width } = useWindowDimensions()
  const { colors } = useThemeContext();

  const animatedValue = useRef(new Animated.Value(5)).current;
  const [timeLeft, setTimeLeft] = useState(initial);

  const progressBarWidth = width - 40 - 95;
  const progressBarWidthItem = (width - 40 - 95) / initial;

  const set = (val: number) => {
    Animated.timing(animatedValue, {
      toValue: (val) * progressBarWidthItem,
      duration: 500,
      useNativeDriver: false,
      delay: 0,
    }).start();

    setTimeLeft(val);
  };

  useEffect(() => {
    set(initial);
  }, [currentIndex]);

  useEffect(() => {
    if (timeLeft === -1) {
      if (currentIndex < questions) {
        onTimerEnd?.();
        set(initial);
      }
    }

    const intervalId = setInterval(() => {
      set(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, currentIndex]);

  const fullProgress = (timeLeft / initial) * 100;

  return (
    <View style={[styles.container, customStyles]}>
      <View
        style={[
          styles.timerContainer,
          { backgroundColor: colors.BgLightGray, width: progressBarWidth },
        ]}
      >
        <Animated.View
          style={{
            ...styles.timerStroke,
            width: animatedValue,
            backgroundColor:
              fullProgress <= 40 ? colors.BgDanger : colors.BgSuccess,
          }}
        />
      </View>
      <View style={styles.timerTextContainer}>
        <Icon name={"timer-outline"} size={24} color={colors.TextPrimary} />
        <Text style={[styles.timerTime, { color: colors.IconPrimary }]}>
          00:0{timeLeft}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  timerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 10,
    borderRadius: 33,
  },
  timerStroke: {
    height: 10,
    borderRadius: 33,
  },
  timerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  timerTime: {
    fontSize: 17,
    fontWeight: "600",
  },
});

export default EducationPracticeTimer;
