import axios from "axios"
import { API_BASE_URL } from '@env'

const headers = {
  Accept: 'application/json',
}

export const loginBorrower = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/api/login`, data, {
    headers: headers
  });

  return response
}

export const postRegisterBorrower = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/api/mitra/daftar`, data, {
    headers: headers
  });

  return response
}

export const postRegisterLender = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/api/lender/daftar`, data, {
    headers: headers
  });

  return response
}
