import React from 'react';

import { post } from './api/useFetch';

const localStorageKey = '__smartopenspace_user__';

const handleUserResponse = user => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(user));
  return user;
};

const login = user => post('/user/auth', user).then(handleUserResponse);

const register = user => post('/user', user).then(handleUserResponse);

const logout = () => {
  window.localStorage.removeItem(localStorageKey);
  return Promise.resolve();
};

const getUser = () => JSON.parse(window.localStorage.getItem(localStorageKey));

const AuthContext = React.createContext();

const AuthProvider = props => (
  <AuthContext.Provider value={{ getUser, login, logout, register }} {...props} />
);

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { AuthProvider, useAuth };
