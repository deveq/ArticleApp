import {useCallback} from 'react';
import {Alert, Platform, ToastAndroid} from 'react-native';

export default function useInform() {
  const inform = useCallback(({message, title}: InformParams) => {
    if (Platform.OS === 'ios') {
      Alert.alert(title ?? '알림', message);
    } else {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }, []);

  return inform;
}

interface InformParams {
  title?: string;
  message: string;
}
