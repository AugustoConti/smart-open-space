import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Layer } from 'grommet';

import { activateQueue, useGetOS } from '#api/os-client';
import MyProps from '#helpers/MyProps';
import useAuth, { useUser } from '#helpers/useAuth';
import { RedirectToRoot, usePushToProjector, usePushToMyTalks } from '#helpers/routes';
import { ScheduleIcon, TalkIcon, UserAddIcon, VideoIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import MyForm from '#shared/MyForm';
import Spinner from '#shared/Spinner';
import Title from '#shared/Title';

import Schedule from './Schedule';
import TalksGrid from './TalksGrid';

const IdentifyForm = ({ children, onSecondary, onSubmit, title }) => (
  <>
    <Box margin={{ vertical: 'medium' }}>
      <Title level="2" label={title} />
    </Box>
    <MyForm onSecondary={onSecondary} onSubmit={onSubmit}>
      {children}
    </MyForm>
  </>
);
IdentifyForm.propTypes = {
  children: MyProps.children.isRequired,
  onSecondary: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const Identify = ({ onExit }) => {
  const [email, setEmail] = useState();
  const { identify, register } = useAuth();

  const onRegister = ({ value: { name } }) => register({ email, name }).then(onExit);

  const onIdentify = ({ value: { email: e } }) =>
    identify(e).then(data => {
      if (data) {
        onExit();
      } else {
        setEmail(e);
      }
      return data;
    });

  return (
    <Layer onEsc={onExit} onClickOutside={onExit}>
      <Box pad="medium">
        {email ? (
          <IdentifyForm onSecondary={onExit} onSubmit={onRegister} title="¿Tu nombre?">
            <MyForm.Text label="Para mostrarlo en tus charlas" />
          </IdentifyForm>
        ) : (
          <IdentifyForm onSecondary={onExit} onSubmit={onIdentify} title="¿Quien sos?">
            <MyForm.Email />
          </IdentifyForm>
        )}
      </Box>
    </Layer>
  );
};
Identify.propTypes = { onExit: PropTypes.func.isRequired };

const OpenSpace = () => {
  const pushToProjector = usePushToProjector();
  const pushToMyTalks = usePushToMyTalks();
  const user = useUser();
  const [showIndentify, setShowIndentify] = useState(false);
  const {
    data: { id, activeQueue, name, startTime, endTime, organizer } = {},
    isPending,
    isRejected,
    setData,
  } = useGetOS();

  if (isPending) return <Spinner />;
  if (isRejected) return <RedirectToRoot />;

  const amTheOrganizer = user && organizer.id === user.id;

  return (
    <>
      <MainHeader>
        <MainHeader.Title label={name} />
        {activeQueue ? (
          <MainHeader.SubTitle icon={ScheduleIcon} label="AGENDA" />
        ) : (
          <MainHeader.SubTitle icon={TalkIcon} label="CHARLAS" />
        )}
        {user ? (
          <MainHeader.Button
            color="accent-1"
            icon={<TalkIcon />}
            label="Mis charlas"
            onClick={pushToMyTalks}
          />
        ) : (
          <MainHeader.Button
            color="accent-3"
            icon={<UserAddIcon />}
            label="Ingresar"
            onClick={() => setShowIndentify(true)}
          />
        )}
        {amTheOrganizer &&
          (activeQueue ? (
            <MainHeader.Button
              color="accent-2"
              icon={<VideoIcon />}
              label="Proyector"
              onClick={pushToProjector}
            />
          ) : (
            <MainHeader.ButtonLoading
              color="accent-4"
              label="Activar Encolamiento"
              onClick={() => activateQueue(id).then(setData)}
            />
          ))}
      </MainHeader>
      <Box margin={{ bottom: 'medium' }}>
        {activeQueue ? (
          <Schedule startTime={startTime} endTime={endTime} />
        ) : (
          <TalksGrid />
        )}
      </Box>
      {showIndentify && <Identify onExit={() => setShowIndentify(false)} />}
    </>
  );
};

export default OpenSpace;
