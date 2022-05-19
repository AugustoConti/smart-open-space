import { get, post } from './api-client';

const identify = (email) => get(`user/identify/${email}/`).then((r) => r.data);

const login = (userData) => post('user/auth', userData);

const register = (userData) => post('user', userData);

export { identify, login, register };
