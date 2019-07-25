import AsyncStorage from '@react-native-community/async-storage';

/**
 * store data in device persistent storage as a key value pair
 * @param {String} key
 * @param {String} value
 */
export const storeData = async (key, value) => {
  await AsyncStorage.setItem(String(key), String(value));
};

/**
 * read data from device persistent storage
 * @param {String} key
 * @param {String} defaultValue
 * @returns {String}
 */
export const getData = async (key, defaultValue) => {
  const value = await AsyncStorage.getItem(String(key));
  return value || defaultValue;
};

export const KEYS = {
  countryCode: 'countryCode'
};
