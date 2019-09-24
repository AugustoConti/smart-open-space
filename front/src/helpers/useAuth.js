import React from 'react';

import * as userClient from './api/os-client';

const localStorageKey = '__smartopenspace_user__';

const handleUserResponse = user => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(user));
  return user;
};

const login = userData => userClient.login(userData).then(handleUserResponse);

const register = userData => userClient.register(userData).then(handleUserResponse);

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

export { AuthProvider };
export default useAuth;
