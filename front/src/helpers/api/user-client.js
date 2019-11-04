import { post } from './api-client';

const identify = email => post('user/identify', { email }).then(r => r.data);

const login = userData => post('user/auth', userData);

const register = userData => post('user', userData);

export { identify, login, register };
