import { post } from './api-client';

const login = userData => post('user/auth', userData);

const register = userData => post('user', userData);

export { login, register };
