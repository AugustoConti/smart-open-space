import React from 'react';
import { Redirect } from 'react-router-dom';

import { Box } from 'grommet';

import { activateQueue, useGetOS } from '#api/os-client';
import MyProps from '#helpers/MyProps';
import { useUser } from '#helpers/useAuth';
import { ScheduleIcon, TalkIcon, VideoIcon } from '#shared/icons';
import MainHeader from '#shared/MainHeader';
import Spinner from '#shared/Spinner';

import Schedule from './Schedule';
import TalksGrid from './TalksGrid';

const OpenSpace = ({
  match: {
    params: { id },
  },
  history,
  location: { pathname },
}) => {
  const user = useUser();
  const {
    data: { activeQueue, name, startTime, endTime, organizer } = {},
    isPending,
    isRejected,
    setData,
  } = useGetOS(id);

  if (isRejected) return <Redirect to="/" />;

  const amTheOrganizer = () => organizer.id === user.id;

  return (
    <>
      {isPending ? (
        <Spinner size="medium" />
      ) : (
        <MainHeader>
          <MainHeader.Title label={name} />
          {activeQueue ? (
            <MainHeader.SubTitle icon={ScheduleIcon} label="AGENDA" />
          ) : (
            <MainHeader.SubTitle icon={TalkIcon} label="CHARLAS" />
          )}
          <MainHeader.Button
            color="accent-1"
            label="Mis charlas"
            onClick={() => history.push(user ? `${pathname}/myTalks` : '/login')}
          />
          <MainHeader.Button
            color="accent-3"
            icon={<VideoIcon />}
            label="Modo Proyector"
            onClick={() => history.push(`${pathname}/projector`)}
          />
          {!activeQueue && amTheOrganizer() && (
            <MainHeader.Button
              color="accent-4"
              label="Activar Encolamiento"
              onClick={() => activateQueue(id).then(setData)}
            />
          )}
        </MainHeader>
      )}
      <Box margin={{ bottom: 'medium' }}>
        {isPending ? (
          <Spinner />
        ) : activeQueue ? (
          <Schedule id={id} startTime={startTime} endTime={endTime} />
        ) : (
          <TalksGrid id={id} />
        )}
      </Box>
    </>
  );
};
OpenSpace.propTypes = {
  history: MyProps.history,
  location: MyProps.location,
  match: MyProps.match,
};

export default OpenSpace;
