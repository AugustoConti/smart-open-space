import { post, useGet } from './api-client';

const createOS = osData => post('/openSpace', osData);
const useGetAllOS = onError => useGet('/openSpace', [], onError);
const useGetOS = (id, onError) => useGet(`/openSpace/${id}`, { talks: [] }, onError);

const createTalk = (id, talkData) => post(`/openSpace/talk/${id}`, talkData);

const login = userData => post('/user/auth', userData);
const register = userData => post('/user', userData);

export { useGetOS, useGetAllOS, createOS, createTalk, login, register };
