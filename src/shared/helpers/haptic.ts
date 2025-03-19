import { useAppSelector } from '../model/hooks';
import { isAndroid, isIOS } from '../constants/platformUtil';
import * as Haptics from "expo-haptics";
import { Vibration } from 'react-native';

const SUCCESS_PATTERN = [0, 1];
const ERROR_PATTERN = [0, 1, 100, 1];

export function useHaptic() {
  const isEnabledHaptic = useAppSelector(
    (state) => state.profile.isEnabledHaptic,
  );

  const triggerHaptic = (isEnable?: boolean) => {
    if (!isEnabledHaptic || !isEnable) {
      return
    }

    if (isIOS) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      Vibration.vibrate(1);
    }
  }

  const triggerSuccessNotification = () => {
    if (!isEnabledHaptic) return

    if (isIOS) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } 
    
    if (isAndroid) {
      Vibration.vibrate(SUCCESS_PATTERN);
    }
  };

  const triggerErrorNotification = () => {
    if (!isEnabledHaptic) return

    if (isIOS) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    if (isAndroid) {
      Vibration.vibrate(ERROR_PATTERN)
    }
  };

  return { triggerHaptic, triggerSuccessNotification, triggerErrorNotification };
}
