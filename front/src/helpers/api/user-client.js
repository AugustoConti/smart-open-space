import { get, post } from './api-client';

const identify = (email) => get(`user/identify/${email}/`).then((r) => r.data);

const login = (userData) => post('user/auth', userData);

const register = (userData) => post('user', userData);

const sendRecoveryEmail = (email) => post(`user/recovery`, { email });

const resetPassword = (email, password, token) =>
  post('user/reset', { email, password, resetToken: token });

export { identify, login, register, sendRecoveryEmail, resetPassword };
