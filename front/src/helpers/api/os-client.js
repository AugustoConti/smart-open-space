import { useAsync } from 'react-async';
import { useParams } from 'react-router-dom';

import { get, post, put } from './api-client';
import { getUser } from '../useAuth';

const withUser = fn => fn(getUser());

const createOS = osData => withUser(({ id }) => post(`openSpace/${id}`, osData));

const createTalk = (osId, talkData) =>
  withUser(({ id }) => post(`openSpace/talk/${id}/${osId}`, talkData));

const getAllOS = () => withUser(({ id }) => get(`openSpace/user/${id}`));
const useGetAllOS = () => useAsync({ promiseFn: getAllOS });

const getOS = ({ osId }) => get(`openSpace/${osId}`);
const useGetOS = () => useAsync({ promiseFn: getOS, osId: useParams().id });

const getTalks = ({ osId }) => get(`openSpace/talks/${osId}`);
const useGetTalks = () => useAsync({ promiseFn: getTalks, osId: useParams().id });

const scheduleTalk = (talkID, roomID, hour) =>
  put(`talk/schedule/${talkID}/${roomID}/${hour}`);

const activateQueue = osId =>
  withUser(({ id }) => put(`openSpace/activateQueue/${id}/${osId}`));

const finishQueue = osId =>
  withUser(({ id }) => put(`openSpace/finishQueue/${id}/${osId}`));

const enqueueTalk = talkId =>
  withUser(({ id }) => put(`openSpace/enqueueTalk/${id}/${talkId}`));

const nextTalk = osId => withUser(({ id }) => put(`talk/nextTalk/${id}/${osId}`));

const getMyTalks = ({ osId }) =>
  withUser(({ id }) => {
    const os = getOS({ osId });
    const slots = get(`openSpace/slots/${osId}`);
    const talks = get(`openSpace/talks/${id}/${osId}`);
    return Promise.all([os, slots, talks]);
  });
const useGetMyTalks = () => useAsync({ promiseFn: getMyTalks, osId: useParams().id });

export {
  activateQueue,
  createOS,
  createTalk,
  enqueueTalk,
  finishQueue,
  nextTalk,
  useGetAllOS,
  useGetOS,
  useGetTalks,
  useGetMyTalks,
  scheduleTalk,
};
