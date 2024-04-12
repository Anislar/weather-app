import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCity = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error: Error | any) {
    console.log(error);
  }
};

export const storeCity = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error: Error | any) {
    console.log(error);
  }
};
