import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { AuthModel, UserModel } from '../../domain/models/Auth';
import { getAuth, removeAuth } from './AuthHelper';
import {
  getUserByToken,
  setAuthToken,
} from '../../services/Auth.services.request';
import { WithChildren } from '../../domain/models/setUpAxios';

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  logout: () => void;
};

const initAuthContextPropsState = {
  auth: getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      setAuth(auth);
      setAuthToken(auth.access);
    } else {
      removeAuth();
      setAuthToken(null);
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const requestUser = async (
  apiToken: string,
  currentUser: any,
  setCurrentUser: (data: any) => void,
  logout: () => void
) => {
  try {
    if (!currentUser) {
      const { data } = await getUserByToken(apiToken);
      if (data) {
        setCurrentUser(data);
      }
    }
  } catch (error) {
    console.error(error);
    if (currentUser) {
      logout();
    }
  }
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, currentUser, logout, setCurrentUser } = useAuth();

  useEffect(() => {
    if (auth && auth.access) {
      requestUser(auth.access, currentUser, setCurrentUser, logout);
    } else {
      logout;
    }
  }, [auth, currentUser]);

  return <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };
