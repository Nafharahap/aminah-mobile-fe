import axios from "axios"
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'http://127.0.0.1:8000'

async function getToken() {
  let token = ''
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        const parsedValue = JSON.parse(localStorage.getItem('session'))
        token = parsedValue.api_token
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    const value = await SecureStore.getItemAsync('session')
    const parsedValue = JSON.parse(value)
    console.log('SESSION', parsedValue.api_token);
    token = parsedValue.api_token
  }

  return token
}

export const getProfileBorrower = async () => {
  const token = await getToken();

  console.log('TOKEN', token);

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }

  const response = await axios.get(`${API_BASE_URL}/api/mitra/profile`, {
    headers: headers
  });

  return response
}

export const postBorrowerSubmission = async (data) => {
  const token = await getToken();

  console.log('TOKEN', token);

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  }

  const response = await axios.post(`${API_BASE_URL}/api/mitra/pengajuan`, data, {
    headers: headers
  });

  return response
}