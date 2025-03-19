import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, useWindowDimensions, Pressable, StatusBar } from "react-native";
import { useHaptic } from "@/shared/helpers/haptic";
import { Typography } from "@/shared/typography";
import Icon from "@expo/vector-icons/Feather";
import IconMaterial from "@expo/vector-icons/MaterialCommunityIcons";

interface KeyboardProps {
  onSubmit: (val: string) => void
  setValue: (val: string) => void
}

const english = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["keyboard-caps", "z", "x", "c", "v", "b", "n", "m", "del"],
]

let keyboardState = "";

const CustomKeyboard: React.FC<KeyboardProps> = ({ setValue, onSubmit }) => {
  const { width } = useWindowDimensions();
  const { colors } = useThemeContext();
  const { triggerHaptic } = useHaptic();

  const [isCaps, setIsCaps] = useState(false);

  const onPress = (item: string) => {
    triggerHaptic(true)
    
    if (item === "keyboard-caps") {
      setIsCaps(val => !val);
      return;
    }
    
    if (item === "del") {
      keyboardState = keyboardState.slice(0, -1);
      return;
    }
    
    if (item === "del-long") {
      keyboardState = "";
      return;
    }
    
    if (item === "space") {
      keyboardState += " "
      return;
    }
    
    if (item === "enter") {
      onSubmit(keyboardState);
      keyboardState = "";
      return;
    }

    if (isCaps) {
      keyboardState += item.toUpperCase();
    } else {
      keyboardState += item;
    }
  }
  
  const widthItem = (width / 11) - 1

  useEffect(() => {
    console.log("INIT")

    SystemUI.setBackgroundColorAsync('#212121');
    NavigationBar.setBackgroundColorAsync('#212121');

    return () => {
      console.log("OUT")

      SystemUI.setBackgroundColorAsync(colors.BgPrimary);
      NavigationBar.setBackgroundColorAsync(colors.BgPrimary);
    }
  }, [])

  return (
    <View style={{
      marginTop: 0,
      backgroundColor: '#212121',
      paddingBottom: 30,
    }} >
      {/* <View style={{
        backgroundColor: "red",
        height: 300,
        width: 2,
        position: "absolute",
        left: 380,
        zIndex: 999
      }} ></View> */}

      <View style={{
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 70,
      }} >
        <View style={[
          {
            width: 1,
            height: "50%",
            backgroundColor: colors.BorderDefault
          },
        ]} ></View>
        <View style={[
          {
            width: 1,
            height: "50%",
            backgroundColor: colors.BorderDefault
          },
        ]} ></View>
      </View>
      {english.map((row, index) => <View style={styles.row} key={`keyboard_row/${index}`} >
        {row.map(item => 
          <Pressable 
            onPress={() => {
              onPress(item);
              setValue(keyboardState)
            }}
            onLongPress={() => {
              if (item === "del") {
                onPress("del-long");
                setValue(keyboardState)
              }
            }}
            style={({ pressed }) => [
              styles.button,
              {
                width: item.length !== 1 ? widthItem * 1.55 :  widthItem,
                backgroundColor: item === "del" ? pressed ? 
                colors.BgPrimary : colors.BgPrimaryPressed : item === "null" ? "transparent" :
                  pressed ? colors.BgPrimaryPressed : colors.BgSecondary,
            }]}
            key={`keyboard_button/${item}`}
          >
            {item === "del" && <Icon name={"delete"} size={24} color={colors.IconPrimary} />}
            {item === "keyboard-caps" && <IconMaterial name={"keyboard-caps"} size={24} color={colors.IconPrimary} />}
            
            {item.length === 1 && <Text style={[{ color: colors.TextPrimary }, Typography.regularH2]} >
              {isCaps ? item.toUpperCase() : item}
            </Text>}
          </Pressable>)}
      </View>)}
      <View style={styles.row}>
        <View style={{ width: (width / 4.6) + 8, flexDirection: 'row', gap: 4 }} >
          <View style={[styles.button, { width: (width / 9.2) + 2, backgroundColor: colors.BgPrimaryPressed }]} >
            <Text style={[{ color: colors.TextSecondary }, Typography.regularH4]} >123</Text>
          </View>
          <View style={[styles.button, { width: (width / 9.2) + 2, backgroundColor: colors.BgPrimaryPressed }]} >
            <IconMaterial size={24} name="emoticon-devil-outline" color={colors.IconSecondary} />
          </View>
        </View>
        <Pressable onPress={() => {
          onPress("space");
          setValue(keyboardState)
        }} style={({ pressed }) => [styles.button, {
          width: width / 2.08,
          backgroundColor: pressed ? colors.BgPrimaryPressed : colors.BgSecondary,
          }]} >
          <Text style={[{ color: colors.TextPrimary }, Typography.regularH4]} >
            Space
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onPress("enter")}
          style={({ pressed }) => [
            styles.button,
            {
              width: (width / 4.6) + 8,
              backgroundColor: pressed ? colors.BgPrimary : colors.BgPrimaryPressed,
            }]}
        >
          <Text style={[{ color: colors.TextPrimary }, Typography.regularH4]} >
            Done
          </Text>
        </Pressable>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
    gap: 4,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 6,
  }
});

export default CustomKeyboard;