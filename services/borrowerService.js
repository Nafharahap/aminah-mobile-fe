import axios from "axios"
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '@env'

const apiBaseUrl = API_BASE_URL

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

export const getProfileBorrower = async () => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }

    const response = await axios.get(`${apiBaseUrl}/api/mitra/profile`, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}

export const postBorrowerSubmission = async (data) => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }

    const response = await axios.post(`${apiBaseUrl}/api/mitra/pengajuan`, data, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}

export const getTarikBorrowerSaldoInvoice = async () => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }

    const response = await axios.get(`${apiBaseUrl}/api/mitra/saldo/tarik/invoice`, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}

export const getPendanaanList = async (id) => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }

    const response = await axios.get(`${apiBaseUrl}/api/mitra/pendanaan/bayar/${id}`, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error.message)
  }
}

export const postBorrowerWithdrawBallance = async (data) => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }

    const response = await axios.post(`${apiBaseUrl}/api/mitra/saldo/tarik`, data, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}

export const postReturnPendanaan = async (data) => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }

    const response = await axios.post(`${apiBaseUrl}/api/mitra/pendanaan/bayar`, data, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}