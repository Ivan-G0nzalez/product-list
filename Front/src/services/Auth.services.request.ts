import axios from 'axios';
import { AuthModel, UserReponse } from '../domain/models/Auth';

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

export const login = (username: string, password: string) => {
  return axios.post<AuthModel>(`${BASE_URL}auth/token/`, {
    username,
    password,
  });
};

export const refreshToken = async (refresh: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}auth/token/refresh/`,
      { refresh },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error('Error al refrescar el token');
    }
    throw error;
  }
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export function getUserByToken(token: string): Promise<UserReponse> {
  return axios
    .post(`${BASE_URL}auth/test/`, {
      api_token: token,
    })
    .then((d) => d.data);
}
