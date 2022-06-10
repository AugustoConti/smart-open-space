import { useAsync } from 'react-async';
import { useParams } from 'react-router-dom';

import { get, post, put } from './api-client';
import { getUser } from '../useAuth';

const withUser = (fn) => fn(getUser());

const createOS = (osData) => withUser(({ id }) => post(`openSpace/${id}`, osData));

const createTalkFor = (userId, openSpaceId, talkData) =>
  post(`openSpace/talk/${userId}/${openSpaceId}`, talkData);

const editTalkOf = (userId, openSpaceId, talkId, talkData) =>
  put(`talk/${talkId}/user/${userId}`, talkData);

const createTalk = (openSpaceId, talkData) =>
  withUser(({ id }) => createTalkFor(id, openSpaceId, talkData));

const editTalk = (openSpaceId, talkId, talkData) =>
  withUser(({ id }) => editTalkOf(id, openSpaceId, talkId, talkData));

const voteTalk = (talkID) =>
  withUser(({ id: userID }) => put(`talk/${talkID}/user/${userID}/vote`));

const getAllOpenSpaces = () => withUser(({ id }) => get(`openSpace/user/${id}`));
const useGetAllOpenSpaces = () => useAsync({ promiseFn: getAllOpenSpaces });

const getOpenSpace = ({ osId: openSpaceId }) => get(`openSpace/${openSpaceId}`);
const useGetOpenSpace = () => useAsync({ promiseFn: getOpenSpace, osId: useParams().id });

const getTalk = ({ talkId }) => get(`talk/${talkId}`);
const useGetTalk = () => useAsync({ promiseFn: getTalk, talkId: useParams().talkId });

const getTalks = ({ osId }) => get(`openSpace/talks/${osId}`).then((talks) => talks);
const useGetTalks = () => useAsync({ promiseFn: getTalks, osId: useParams().id });

const scheduleTalk = (talkID, roomID, hour, userID) =>
  put(`talk/schedule/${userID}/${talkID}/${roomID}/${hour}`);

const exchangeTalk = (talkID, roomID, hour) =>
  put(`talk/exchange/${talkID}/${roomID}/${hour}`);

const startCallForPapers = (openSpaceId) =>
  withUser(({ id }) => put(`openSpace/${openSpaceId}/user/${id}/callForPapers`));

const activateQueue = (osId) =>
  withUser(({ id }) => put(`openSpace/activateQueue/${id}/${osId}`));

const finishQueue = (osId) =>
  withUser(({ id }) => put(`openSpace/finishQueue/${id}/${osId}`));

const enqueueTalk = (talkId) =>
  withUser(({ id }) => put(`openSpace/enqueueTalk/${id}/${talkId}`));

const nextTalk = (osId) => withUser(({ id }) => put(`talk/nextTalk/${id}/${osId}`));

const getCurrentUserTalks = ({ osId: openSpaceId }) =>
  withUser(({ id }) => {
    const os = getOpenSpace({ osId: openSpaceId });
    const assignedSlots = get(`openSpace/assignedSlots/${openSpaceId}`);
    const currentUserTalks = get(`openSpace/talks/${id}/${openSpaceId}`).then(
      (talks) => talks
    );
    return Promise.all([os, assignedSlots, currentUserTalks]);
  });
const useGetCurrentUserTalks = () =>
  useAsync({ promiseFn: getCurrentUserTalks, osId: useParams().id });

export {
  activateQueue,
  createOS,
  createTalk,
  createTalkFor,
  enqueueTalk,
  finishQueue,
  nextTalk,
  useGetAllOpenSpaces,
  useGetOpenSpace,
  useGetTalks,
  useGetCurrentUserTalks,
  scheduleTalk,
  exchangeTalk,
  startCallForPapers,
  voteTalk,
  useGetTalk,
  editTalk,
};
