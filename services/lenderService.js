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

export const getProfileLender = async () => {
  const token = await getToken();

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }

  const response = await axios.get(`${API_BASE_URL}/api/lender/profile`, {
    headers: headers
  });

  return response
}

export const getTarikLenderSaldoInvoice = async () => {
  const token = await getToken();

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }

  const response = await axios.get(`${API_BASE_URL}/api/lender/saldo/tarik/invoice`, {
    headers: headers
  });

  return response
}

export const getListTransaksiLender = async ({ page = 1 } = {}) => {
  const token = await getToken();

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }

  const response = await axios.get(`${API_BASE_URL}/api/lender/transaksi?page=${page}`, {
    headers: headers
  });

  return response
}

export const postLenderSubmission = async (data) => {
  const token = await getToken();

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  }

  const response = await axios.post(`${API_BASE_URL}/api/lender/profile/update`, data, {
    headers: headers
  });

  return response
}

export const postCheckoutCart = async (data) => {
  const token = await getToken();

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  }

  const response = await axios.post(`${API_BASE_URL}/api/lender/checkout-api`, data, {
    headers: headers
  });

  return response
}

export const postLenderWithdrawBallance = async (data) => {
  const token = await getToken();

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  }

  const response = await axios.post(`${API_BASE_URL}/api/lender/saldo/tarik`, data, {
    headers: headers
  });

  return response
}