import axios from "axios"
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { API_BASE_URL } from '@env'

const API_URL = API_BASE_URL

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
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }

    const response = await axios.get(`${API_URL}/api/lender/profile`, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}

export const getTarikLenderSaldoInvoice = async () => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }

    const response = await axios.get(`${API_URL}/api/lender/saldo/tarik/invoice`, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error.response.data.message)
  }
}

export const getListTransaksiLender = async ({ page = 1, type = '1,3,6' } = {}) => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }

    if (type == 0) {
      type = '1,3,6'
    }

    const response = await axios.get(`${API_URL}/api/lender/transaksi?page=${page}&type=${type}`, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}

export const getDetailTransaksiLender = async (trx_hash) => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }

    const response = await axios.get(`${API_URL}/api/lender/transaksi/${trx_hash}`, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}

export const getPendanaanListLender = async (borrowerId) => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }

    const response = await axios.get(`${API_URL}/api/mitra/pendanaan/bayar/lender/${borrowerId}`, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error.message)
  }
}

export const postLenderSubmission = async (data) => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }

    const response = await axios.post(`${API_URL}/api/lender/profile/update`, data, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}

export const postCheckoutCart = async (data) => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }

    const response = await axios.post(`${API_URL}/api/lender/checkout-api`, data, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}

export const postLenderWithdrawBallance = async (data) => {
  try {
    const token = await getToken();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }

    const response = await axios.post(`${API_URL}/api/lender/saldo/tarik`, data, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}