import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Layer } from 'grommet';

import { activateQueue, finishQueue, useGetOS } from '#api/os-client';
import { useQueue } from '#api/sockets-client';
import MyProps from '#helpers/MyProps';
import useAuth, { useUser } from '#helpers/useAuth';
import { RedirectToRoot, usePushToProjector, usePushToMyTalks } from '#helpers/routes';
import Detail from '#shared/Detail';
import { CartIcon, ScheduleIcon, TalkIcon, UserAddIcon, VideoIcon } from '#shared/icons';
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

const QueryForm = ({ title, subTitle, onExit, onSubmit }) => (
  <Layer onEsc={onExit} onClickOutside={onExit}>
    <Box pad="medium">
      <Box margin={{ vertical: 'medium' }}>
        <Title level="2" label={title} />
        <Detail size="large" text={subTitle} textAlign="center" />
      </Box>
      <MyForm
        onSecondary={onExit}
        onSubmit={data => {
          onExit();
          return onSubmit(data);
        }}
      />
    </Box>
  </Layer>
);
QueryForm.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  onExit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const OpenSpace = () => {
  const pushToProjector = usePushToProjector();
  const pushToMyTalks = usePushToMyTalks();
  const user = useUser();
  const [showQuery, setShowQuery] = useState(false);
  const [showIndentify, setShowIndentify] = useState(false);
  const {
    data: { id, activeQueue, finishedQueue, name, organizer, pendingQueue, slots } = {},
    isPending,
    isRejected,
    setData,
  } = useGetOS();
  const queue = useQueue();

  if (isPending) return <Spinner />;
  if (isRejected) return <RedirectToRoot />;

  const amTheOrganizer = user && organizer.id === user.id;
  const doFinishQueue = () => finishQueue(id).then(setData);

  return (
    <>
      <MainHeader>
        <MainHeader.Title label={name} />
        {pendingQueue ? (
          <MainHeader.SubTitle icon={TalkIcon} label="CHARLAS" />
        ) : (
          <MainHeader.SubTitle icon={ScheduleIcon} label="AGENDA" />
        )}
        {finishedQueue && <MainHeader.SubTitle label="Marketplace finalizado" />}
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
        {amTheOrganizer && pendingQueue && (
          <MainHeader.ButtonLoading
            color="accent-4"
            icon={<CartIcon />}
            label="Iniciar Marketplace"
            onClick={() => activateQueue(id).then(setData)}
          />
        )}
        {amTheOrganizer &&
          activeQueue && (
            <MainHeader.Button
              color="accent-2"
              icon={<VideoIcon />}
              label="Proyector"
              onClick={pushToProjector}
            />
          ) && (
            <MainHeader.ButtonLoading
              color="neutral-4"
              icon={<CartIcon />}
              label="Finalizar Marketplace"
              onClick={() => {
                if (queue && queue.length > 0) {
                  setShowQuery(true);
                  return Promise.resolve();
                }
                return doFinishQueue();
              }}
            />
          )}
      </MainHeader>
      <Box margin={{ bottom: 'medium' }}>
        {pendingQueue ? <TalksGrid /> : <Schedule slots={slots} />}
      </Box>
      {showIndentify && <Identify onExit={() => setShowIndentify(false)} />}
      {showQuery && (
        <QueryForm
          title="¿Seguro?"
          subTitle={`Queda${queue.length > 1 ? 'n' : ''} ${queue.length} en la cola`}
          onExit={() => setShowQuery(false)}
          onSubmit={doFinishQueue}
        />
      )}
    </>
  );
};

export default OpenSpace;
