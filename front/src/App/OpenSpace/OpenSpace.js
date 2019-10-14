import React from 'react';
import { Redirect } from 'react-router-dom';

import { Box } from 'grommet';

import { useGetOS } from '#helpers/api/os-client';
import MyProps from '#helpers/MyProps';
import { useUser } from '#helpers/useAuth';
import { ScheduleIcon, TalkIcon } from '#shared/icons';
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
    data: { activeQueue, name, startTime, endTime } = {},
    isPending,
    isRejected,
  } = useGetOS(id);

  if (isPending) return <Spinner />;
  if (isRejected) return <Redirect to="/" />;

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
          label="Mis charlas"
          onClick={() => history.push(user ? `${pathname}/mis-charlas` : '/login')}
        />
      </MainHeader>
      <Box margin={{ bottom: 'medium' }}>
        {activeQueue ? (
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
