import axios from "axios"
import { API_BASE_URL } from '@env'

const headers = {
  Accept: 'application/json',
}

export const loginBorrower = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, data, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}

export const postRegisterBorrower = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/mitra/daftar`, data, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}

export const postRegisterLender = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/lender/daftar`, data, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}
