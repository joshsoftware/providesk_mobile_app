import AsyncStorage from '@react-native-async-storage/async-storage';

export type keys = 'username' | 'token' | 'user-info';

type setter = (key: keys, value: string) => Promise<void>;
type getter = (key: keys) => Promise<string | null>;

const setValue: setter = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    throw e;
  }
};

const getValue: getter = async key => {
  try {
    const res = await AsyncStorage.getItem(key);
    return res;
  } catch (e) {
    throw e;
  }
};

export default {setValue, getValue};
