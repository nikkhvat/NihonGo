import React, { ReactNode } from "react";

import { StyleProp, useWindowDimensions, View, ViewStyle } from "react-native";

import { TABLET_PADDING, TABLET_WIDTH } from "@/shared/constants/app";
import { verticalScale } from "@/shared/helpers/metrics";

interface AdaptiveLayoutProps {
  style?: StyleProp<ViewStyle>
  children: ReactNode;
}

const AdaptiveLayout: React.FC<AdaptiveLayoutProps> = ({
  style = {},
  children
}) => {
  const { width } = useWindowDimensions()
  
  return (
    <>
      {children}
    </>
    // <View style={[{ paddingHorizontal: width > TABLET_WIDTH ? verticalScale(TABLET_PADDING) : 0 }, style]}>
    // </View>
  );
};

export default AdaptiveLayout;