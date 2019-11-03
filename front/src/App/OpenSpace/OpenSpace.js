import React from 'react';
import { Box } from 'grommet';

import { activateQueue, useGetOS } from '#api/os-client';
import { useUser } from '#helpers/useAuth';
import { ScheduleIcon, TalkIcon, VideoIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import Spinner from '#shared/Spinner';
import {
  RedirectToRoot,
  usePushToProjector,
  usePushToMyTalks,
  usePushToLogin,
} from '#helpers/routes';
import Schedule from './Schedule';
import TalksGrid from './TalksGrid';

const OpenSpace = () => {
  const pushToProjector = usePushToProjector();
  const pushToMyTalks = usePushToMyTalks();
  const pushToLogin = usePushToLogin();
  const user = useUser();
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
          onClick={user ? pushToMyTalks : pushToLogin}
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
    </>
  );
};

export default OpenSpace;
