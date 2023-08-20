import axios from "axios"
import { getToken } from "./tokenService"

const API_BASE_URL = 'http://127.0.0.1:8000'


export const getProfileBorrower = async () => {
  const token = await getToken()
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  }

  const response = await axios.get(`${API_BASE_URL}/api/mitra/profile`, {
    headers: headers
  });

  return response
}