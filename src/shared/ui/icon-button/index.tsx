import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";

interface IconButtonProps {
  onPress: () => void,

  children: React.ReactNode
}

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  children
}) => {
  return (
    <Pressable
      hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
      onPress={onPress}
    >
      <View style={{
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center"
      }} >
        {children}
      </View>
    </Pressable>
  )
};

export default IconButton;