import React from "react";

import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {  BottomTabBarProps } from "@react-navigation/bottom-tabs";

import { Pressable, View } from "react-native";
import { useHaptic } from "@/shared/helpers/haptic";

import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { Text } from '@react-navigation/elements';
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import { ROUTES } from "./navigationTypes";
import { isIOS } from "@/shared/constants/platformUtil";
import { useBottomTabVisibility } from "@/shared/contexts/BottomTabVisibilityContext";

const icons = {
  [ROUTES.LEARNING_ROOT]: "school-outline",
  [ROUTES.PRACTICE_ROOT]: "layers-outline",
  [ROUTES.SETTINGS_ROOT]: "cog-outline",
  [ROUTES.KANA_TABLE_ROOT]: "syllabary-hiragana",
} as const;

type IconType = typeof ROUTES.LEARNING_ROOT
  | typeof ROUTES.PRACTICE_ROOT
  | typeof ROUTES.SETTINGS_ROOT
  | typeof ROUTES.KANA_TABLE_ROOT

export const TabBarButton = ({ state, navigation }: BottomTabBarProps) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const { isVisible } = useBottomTabVisibility();

  const { triggerHaptic } = useHaptic()  

  const { colors } = useThemeContext();

  const titles = {
    [ROUTES.LEARNING_ROOT]: t('tabs.learning'),
    [ROUTES.PRACTICE_ROOT]: t('tabs.practice'),
    [ROUTES.SETTINGS_ROOT]: t('tabs.profile'),
    [ROUTES.KANA_TABLE_ROOT]: t('tabs.kana'),
  }

  if (!isVisible) return;

  return (
    <View style={{ 
      flexDirection: 'row',
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
      height: insets.bottom + (isIOS ? 52 : 62),
      alignItems: "center",
      borderTopColor: colors.BorderDefault,
      borderTopWidth: 1,
    }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          triggerHaptic(true);

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
            <Pressable
              key={route.name}
              onPress={onPress}
              
              style={{
                flex: 1,
                paddingTop: 3,
                alignItems: "center",
                gap: '0'
              }}
            >
              <MaterialCommunityIcon
                name={icons[route.name as IconType]}
                size={24}
                color={isFocused ? colors.IconAccent : colors.IconSecondary}
              />
              <Text style={[
                Typography.regularCaption,
                {
                  color: isFocused ? colors.TextTabBar : colors.TextSecondary
                }]}
                >{titles[route.name as IconType]}</Text>
            </Pressable>
          )
      })}
    </View>
  );
};