import axios from "axios"
import { API_BASE_URL } from '@env'

const API_URL = API_BASE_URL

export const getListMitra = async ({ page = 1 } = {}) => {
  try {
    const headers = {
      Accept: 'application/json',
    }

    return await axios.get(`${API_URL}/api/lender/mitra?page=${page}`, {
      headers: headers
    });
  } catch (error) {
    throw Error(error)
  }
}

export const getDetailMitra = async (id) => {
  try {
    const headers = {
      Accept: 'application/json',
    }

    const response = await axios.get(`${API_URL}/api/lender/mitra/detail/${id}`, {
      headers: headers
    });

    return response
  } catch (error) {
    throw Error(error)
  }
}