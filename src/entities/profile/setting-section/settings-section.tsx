import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import React, { ReactNode } from "react";
import { View } from "react-native";

interface SettingSectionProps {
  children: ReactNode;
}

const SettingsSection: React.FC<SettingSectionProps> = ({ children }) => {
  const { colors } = useThemeContext();

  return (
    <View
      style={{
        marginHorizontal: 16,
        paddingLeft: 16,
        borderRadius: 12,
        backgroundColor: colors.BgSecondary
      }}
    >
      {children}
    </View>
  );
};

export default SettingsSection;
