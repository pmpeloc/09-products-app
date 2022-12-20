/* eslint-disable curly */
import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import coffeeApi from '../api/coffeeApi';
import {
  User,
  LoginResponse,
  LoginData,
  RegisterData,
} from '../interfaces/app.interface';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signIn: (loginData: LoginData) => void;
  signUp: (registerData: RegisterData) => void;
  logout: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return dispatch({ type: 'notAuthenticated' });
    const resp = await coffeeApi.get('/auth');
    if (resp.status !== 200) {
      return dispatch({ type: 'notAuthenticated' });
    }
    await AsyncStorage.setItem('token', resp.data.token);
    dispatch({
      type: 'signUp',
      payload: { token: resp.data.token, user: resp.data.usuario },
    });
  };

  const signIn = async ({ correo, password }: LoginData) => {
    try {
      const { data } = await coffeeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: { token: data.token, user: data.usuario },
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Wrong data',
      });
    }
  };

  const signUp = async ({ nombre, correo, password }: RegisterData) => {
    try {
      const { data } = await coffeeApi.post<LoginResponse>('/usuarios', {
        nombre,
        correo,
        password,
      });
      dispatch({
        type: 'signUp',
        payload: { token: data.token, user: data.usuario },
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'This email is already register',
      });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'logout' });
  };

  const removeError = () => dispatch({ type: 'removeError' });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logout,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
