import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (value) => {
  try {
    await AsyncStorage.setItem('TOKEN', value);
  } catch (e) {
    alert('Token tidak berhasil di simpan')
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('TOKEN');
    if (value !== null) {
      return value
    }
  } catch (e) {
    alert('Token tidak dapat diambil')
  }
};
