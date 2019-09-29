import { post, put, useGet } from './api-client';
import { useUser } from '../useAuth';

const createOS = osData => post('/openSpace', osData);

const useGetAllOS = onError => {
  const { id } = useUser();
  return useGet(`/openSpace/user/${id}`, [], onError);
};

const useGetOS = (id, onError) => useGet(`/openSpace/${id}`, { talks: [] }, onError);

const createTalk = (osID, talkData) => {
  const { id } = useUser();
  return post(`/openSpace/talk/${id}/${osID}`, talkData);
};

const useGetTalks = (osID, onError) => {
  const { id } = useUser();
  return useGet(`/openSpace/talks/${id}/${osID}`, [], onError);
};

const scheduleTalk = (talkID, roomID, hour) =>
  put(`/openSpace/schedule/${talkID}/${roomID}/${hour}`);

export { createOS, createTalk, scheduleTalk, useGetAllOS, useGetOS, useGetTalks };
