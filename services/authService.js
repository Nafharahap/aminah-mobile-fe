import axios from "axios"

const API_BASE_URL = 'http://127.0.0.1:8000'

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
