import { isAndroid, isIOS } from "@/shared/constants/platformUtil";
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';

interface LoadFontsProps {
  successful?: () => void | Promise<void>;
  error?: (e: unknown) => void | Promise<void>;
  finallyCallback?: () => void | Promise<void>;
}

export const loadFonts = async ({ successful, error, finallyCallback }: LoadFontsProps) =>  {
  try {
    await Font.loadAsync({
      ...(isAndroid ? {
        'NotoSansJP-Black': require('./NotoSansJP-Black.ttf'),
        'NotoSansJP-Bold': require('./NotoSansJP-Bold.ttf'),
        'NotoSansJP-Medium': require('./NotoSansJP-Medium.ttf'),
        'NotoSansJP-Regular': require('./NotoSansJP-Regular.ttf'),
        'NotoSansJP-SemiBold': require('./NotoSansJP-SemiBold.ttf'),
      } : {}),
      ...(isIOS ? {
        'SFProText-Regular': require('./SFProText-Regular.ttf'),
        'SFProDisplay-Semibold': require('./SFProDisplay-Semibold.ttf'),
      } : {}),
      ...Icon.Ionicons.font,
      ...Icon.MaterialCommunityIcons.font,
    })
    await successful?.()
  } catch (e) {
    await error?.(e)
  } finally {
    await finallyCallback?.();
  }
}
