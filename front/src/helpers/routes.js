import React from 'react';
import { useHistory, useLocation, useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const useID = (id) => ((idParam) => id || idParam)(useParams().id);

const toRoot = '/';
const toLogin = '/login';
const toRegister = '/register';
const toNewOS = '/new';
const useToOS = (id) => `/os/${useID(id)}`;
const useToMyTalks = (id) => `/os/${useID(id)}/myTalks`;
const useToNewTalk = (id) => `/newTalk/${useID(id)}`;
const useToProjector = (id) => `/os/${useID(id)}/projector`;

export const RedirectToRoot = () => <Redirect to={toRoot} />;
export const RedirectToLogin = () => <Redirect to={toLogin} />;
export const RedirectToLoginFromOS = ({ openSpaceId }) => (
  <Redirect to={{ pathname: toLogin, state: { openSpaceId } }} />
);
export const RedirectToOS = ({ id }) => <Redirect to={useToOS(id)} />;
RedirectToOS.propTypes = { id: PropTypes.string.isRequired };

const pushTo = (history, path) => () => history.push(path);
export const usePushToRoot = () => pushTo(useHistory(), toRoot);
export const usePushToLogin = () => pushTo(useHistory(), toLogin);
export const usePushToRegister = () => pushTo(useHistory(), toRegister);
export const usePushToMyTalks = (id) => pushTo(useHistory(), useToMyTalks(id));
export const usePushToNewOS = () => pushTo(useHistory(), toNewOS);
export const usePushToOS = (id) => pushTo(useHistory(), useToOS(id));
export const usePushToNewTalk = (id) => pushTo(useHistory(), useToNewTalk(id));
export const usePushToProjector = (id) => pushTo(useHistory(), useToProjector(id));

export const useInRegister = () => useLocation().pathname === toRegister;
