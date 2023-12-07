import axios from "axios"
import { API_BASE_URL } from '@env'

export const getListMitra = async ({ page = 1 } = {}) => {
  const headers = {
    Accept: 'application/json',
  }

  const response = await axios.get(`${API_BASE_URL}/api/lender/mitra?page=${page}`, {
    headers: headers
  });

  return response
}

export const getDetailMitra = async (id) => {
  const headers = {
    Accept: 'application/json',
  }

  const response = await axios.get(`${API_BASE_URL}/api/lender/mitra/detail/${id}`, {
    headers: headers
  });

  return response
}