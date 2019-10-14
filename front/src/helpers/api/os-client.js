import { useAsync } from 'react-async';

import { get, post, put } from './api-client';
import { getUser } from '../useAuth';

const withUser = fn => fn(getUser());

const createOS = osData => withUser(({ id }) => post(`openSpace/${id}`, osData));

const createTalk = (osId, talkData) =>
  withUser(({ id }) => post(`openSpace/talk/${id}/${osId}`, talkData));

const getAllOS = () => withUser(({ id }) => get(`openSpace/user/${id}`));
const useGetAllOS = () => useAsync({ promiseFn: getAllOS });

const getOS = ({ osId }) => get(`openSpace/${osId}`);
const useGetOS = osId => useAsync({ promiseFn: getOS, osId });

const getTalks = ({ osId }) => get(`openSpace/talks/${osId}`);
const useGetTalks = osId => useAsync({ promiseFn: getTalks, osId });

const scheduleTalk = (talkID, roomID, hour) =>
  put(`schedule/${talkID}/${roomID}/${hour}`);

const getMyTalks = ({ osId }) =>
  withUser(({ id }) => {
    const os = getOS({ osId });
    const slots = get(`openSpace/slots/${osId}`);
    const talks = get(`openSpace/talks/${id}/${osId}`);
    return Promise.all([os, slots, talks]);
  });
const useGetMyTalks = osId => useAsync({ promiseFn: getMyTalks, osId });

export {
  createOS,
  createTalk,
  useGetAllOS,
  useGetOS,
  useGetTalks,
  useGetMyTalks,
  scheduleTalk,
};
