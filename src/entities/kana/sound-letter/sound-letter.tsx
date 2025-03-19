import React from "react";

import { Audio } from "expo-av";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import getSound from "@/shared/resources/sounds";
import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

interface SoundLetterProps {
  id: string;
  width?: number;
}

const SoundLetter: React.FC<SoundLetterProps> = ({ id, width }) => {
  const { colors } = useThemeContext();

  Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

  const playSound = async (id: string) => {
    try {
      const sound = getSound(id);

      const { sound: playbackObject } = await Audio.Sound.createAsync(sound, {
        shouldPlay: true,
      });

      playbackObject.playAsync();
    } catch (error) {
      return error;
    }
  };

  const soundIcon = (
    <Icon name={"volume-high"} size={24} color={colors.IconPrimary} />
  );

  return (
    <SecondaryButton
      isHapticFeedback
      icon={soundIcon}
      width={width}
      isOutline
      isFullWidth={!width}
      onClick={() => playSound(id)}
    />
  );
};

export default SoundLetter;
