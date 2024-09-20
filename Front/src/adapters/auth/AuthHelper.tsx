import { AuthModel } from '../../domain/models/Auth';
import { decode } from 'base-64';
import { refreshToken } from '../../services/Auth.services.request';

const decodeToken = (token: string) => {
  try {
    return JSON.parse(decode(token.split('.')[1]));
  } catch (err) {
    console.log('error', err);
    return null;
  }
};

const AUTH_LOCAL_STORAGE_KEY = 'authorization';

const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) {
    return true;
  }
  const expirationDate = new Date(decoded.exp * 1000);
  return expirationDate < new Date();
};

const refreshAuthToken = async (): Promise<AuthModel | null> => {
  const auth = getAuth();
  if (!auth || !auth.refresh) {
    return Promise.resolve(null);
  }

  try {
    const response = await refreshToken(auth.refresh);

    const newAuth = {
      ...auth,
      access: response.access,
      refresh: response.refresh,
    };
    setAuth(newAuth);
    return newAuth;
  } catch (err) {
    console.error('Token refresh error', err);
    removeAuth();
    window.location.href = '/auth';
    return null;
  }
};

const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    console.log('No hay localStorage disponible');
    return;
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);

  if (!lsValue) {
    console.log('No se encontró el valor en localStorage');
    return;
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
    if (auth) {
      console.log('Se encontró el auth:', auth);
      return auth;
    }
  } catch (error) {
    console.error('Error al parsear AUTH_LOCAL_STORAGE:', error);
  }
};

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);

    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
  }
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json';
  axios.interceptors.request.use(
    async (config: { headers: { Authorization: string } }) => {
      const auth = getAuth();
      if (auth && auth.access) {
        if (isTokenExpired(auth.access)) {
          const updatedAuth = await refreshAuthToken();
          if (updatedAuth) {
            config.headers.Authorization = `Bearer ${updatedAuth.access}`;
          } else {
            return Promise.reject('Failed to refresh token');
          }
        } else {
          config.headers.Authorization = `Bearer ${auth.access}`;
        }
      }
      return config;
    },
    (err: any) => Promise.reject(err)
  );
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY };
