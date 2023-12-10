import axios from "axios"
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '@env'

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
    token = parsedValue.api_token
  }

  return token
}

export const getListPembayaran = async () => {
  const token = await getToken();

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }

  const response = await axios.get(`${API_BASE_URL}/api/lender/dompet/bayar`, {
    headers: headers
  });

  return response
}

export const getDetailPembayaran = async (id) => {
  const token = await getToken();

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }

  const response = await axios.get(`${API_BASE_URL}/api/lender/dompet/bayar/detail/${id}`, {
    headers: headers
  });

  return response
}

export const postIsiDompet = async (data) => {
  const token = await getToken();

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  }

  const response = await axios.post(`${API_BASE_URL}/api/lender/dompet/isi`, data, {
    headers: headers
  });

  return response
}

export const postBayar = async (data) => {
  const token = await getToken();

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  }

  const response = await axios.post(`${API_BASE_URL}/api/lender/dompet/bayar`, data, {
    headers: headers
  });

  return response
}