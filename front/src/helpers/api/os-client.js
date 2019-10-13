import { post, put, useGet } from './api-client';
import { useUser, getUser } from '../useAuth';

const withUser = fn => fn(getUser());

const createOS = osData => withUser(({ id }) => post(`/openSpace/${id}`, osData));

const useGetAllOS = onError => {
  const { id } = useUser();
  return useGet(`/openSpace/user/${id}`, [], onError);
};

const useGetOS = (id, onError) =>
  useGet(
    `/openSpace/${id}`,
    { activeQueue: false, endTime: '0', freeSlots: [], startTime: '1', talks: [] },
    onError
  );

const useGetSlots = (id, onError) => useGet(`/openSpace/slots/${id}`, [], onError);

const createTalk = (osID, talkData) =>
  withUser(({ id }) => post(`/openSpace/talk/${id}/${osID}`, talkData));

const useGetTalks = (id, onError) => useGet(`/openSpace/talks/${id}`, [], onError);

const useGetTalksByUser = (osID, onError) => {
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
  useGetTalksByUser,
};
