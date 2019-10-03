import { post, put, useGet } from './api-client';
import { useUser, getUser } from '../useAuth';

const createOS = osData => {
  const { id } = getUser();
  return post(`/openSpace/${id}`, osData);
};

const useGetAllOS = onError => {
  const { id } = useUser();
  return useGet(`/openSpace/user/${id}`, [], onError);
};

const useGetOS = (id, onError) => useGet(`/openSpace/${id}`, { talks: [] }, onError);

const useGetSlots = (id, onError) => useGet(`/openSpace/slots/${id}`, [], onError);

const createTalk = (osID, talkData) => {
  const { id } = getUser();
  return post(`/openSpace/talk/${id}/${osID}`, talkData);
};

const useGetTalks = (osID, onError) => {
  const { id } = useUser();
  return useGet(`/openSpace/talks/${id}/${osID}`, [], onError);
};

const scheduleTalk = (talkID, roomID, hour) =>
  put(`/schedule/${talkID}/${roomID}/${hour}`);

export {
  createOS,
  createTalk,
  scheduleTalk,
  useGetAllOS,
  useGetOS,
  useGetSlots,
  useGetTalks,
};
