import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Layer } from 'grommet';

import { activateQueue, useGetOS } from '#api/os-client';
import useAuth, { useUser } from '#helpers/useAuth';
import { RedirectToRoot, usePushToProjector, usePushToMyTalks } from '#helpers/routes';
import { ScheduleIcon, TalkIcon, VideoIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import MyForm from '#shared/MyForm';
import Spinner from '#shared/Spinner';
import Title from '#shared/Title';

import Schedule from './Schedule';
import TalksGrid from './TalksGrid';

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
        <Box margin={{ vertical: 'medium' }}>
          <Title level="2">{email ? '¿Tu nombre?' : '¿Quien sos?'}</Title>
        </Box>
        {email ? (
          <MyForm onSecondary={onExit} onSubmit={onRegister}>
            <MyForm.Text label="Para mostrar en tus charlas" />
          </MyForm>
        ) : (
          <MyForm onSecondary={onExit} onSubmit={onIdentify}>
            <MyForm.Email />
          </MyForm>
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
        <MainHeader.Button
          color="accent-1"
          icon={<TalkIcon />}
          label="Mis charlas"
          onClick={user ? pushToMyTalks : () => setShowIndentify(true)}
        />
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
