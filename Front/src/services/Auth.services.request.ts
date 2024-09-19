import axios from 'axios';
import {
  AuthModel,
  UserReponse,
  RegisterUserModel,
} from '../domain/models/Auth';

import toastr from '../utils/toast/Toast-General';

const BASE_URL = import.meta.env.VITE_BASE_URL;

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

export const getUserByToken = (token: string): Promise<UserReponse> => {
  return axios
    .post(`${BASE_URL}auth/test/`, {
      api_token: token,
    })
    .then((d) => d.data);
};

export const registerUser = ({
  full_name,
  email,
  username,
  password,
  password2,
  avatar,
}: RegisterUserModel) => {
  return axios
    .post(`${BASE_URL}auth/register/`, {
      full_name,
      email,
      username,
      password,
      password2,
      avatar,
    })
    .then((response) => {
      if (response.data.success) {
        toastr.success(response.data.message, 'Éxito');
      }
      toastr.success('Register creado', 'Éxito');
      return response.data;
    })
    .catch((error) => {
      if (error.response.data.message) {
        toastr.error(error.response.data.message, 'Error');
      } else {
        toastr.error('Ocurrió un error al crear el Registro', 'Error');
      }
      console.error(error);
      // Opcionalmente, puedes devolver undefined o manejar el error de otra manera
      return undefined;
    });
};

export const changePassword = (
  newPassword: string,
  token: string,
  email: string
) => {
  return axios.post<{ result: boolean }>(
    `${BASE_URL}auth/reset-password-confirm/`,
    {
      email: email,
      token: token,
      password: newPassword,
    }
  );
};

export const requestPassword = (email: string) => {
  return axios.post<{ result: boolean }>(`${BASE_URL}auth/forgot-password/`, {
    email,
  });
};
