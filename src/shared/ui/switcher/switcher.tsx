import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Pressable,
  LayoutChangeEvent,
  DimensionValue,
  StyleProp,
  ViewStyle,
} from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import { useHaptic } from "@/shared/helpers/haptic";

interface SwitcherProps<T extends string> {
  activeTab: T;
  options: T[];
  translate?: (React.ReactNode | string)[];
  width?: DimensionValue;
  setActiveTab: (val: T) => void;
  isFullWidth?: boolean;
  customStyles?: StyleProp<ViewStyle>;
}

function Switcher<T extends string>(props: SwitcherProps<T>) {
  const { activeTab, setActiveTab, options, translate } = props;

  const { colors } = useThemeContext();
  const { triggerHaptic } = useHaptic();

  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedColor = useRef(new Animated.Value(0)).current;
  const [tabWidth, setTabWidth] = useState(0);

  useEffect(() => {
    const index = options.indexOf(activeTab);

    Animated.spring(animatedValue, {
      toValue: index * tabWidth,
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedColor, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTab, animatedValue, animatedColor, options.length, tabWidth]);

  const onLayout = (event: LayoutChangeEvent) => {
    const offset = 2;
    const { width } = event.nativeEvent.layout;
    setTabWidth((width / options.length) - offset);
  };

  return (
    <View style={[styles.content, { width: props.width ? props.width : "100%" }, props.customStyles]} onLayout={onLayout}>
      <View style={[styles.tabs, { backgroundColor: colors.BgSecondary }]}>
        {options.map((tab, index) => {
          const colorInterpolation = animatedColor.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [colors.TextPrimary, colors.TextContrastPrimary, colors.TextPrimary],
            extrapolate: "clamp",
          });
          return (
            <Pressable
              key={tab}
              onPress={() => {
                setActiveTab(options[index]);
                triggerHaptic(true);
              }}
              style={[styles.tab]}
            >
              <Animated.Text style={[Typography.boldH4, { color: colorInterpolation }]}>
                {translate && translate.length === options.length ? translate[index] : tab}
              </Animated.Text>
            </Pressable>
          );
        })}
        <Animated.View
          style={[
            styles.indicator,
            {
              width: tabWidth,
              transform: [{ translateX: animatedValue }],
              backgroundColor: colors.BgContrast,
            },
          ]}
        />
      </View>
    </View>
  );
}

export default Switcher;

const styles = StyleSheet.create({
  content: {
    height: 50,
  },
  tabs: {
    padding: 2,
    flexDirection: "row",
    width: "100%",
    borderRadius: 12,
    position: "relative",
    zIndex: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderRadius: 10,
  },
  indicator: {
    position: "absolute",
    height: "100%",
    borderRadius: 12,
    zIndex: -1,
    marginTop: 2,
    marginLeft: 2,
  },
});
