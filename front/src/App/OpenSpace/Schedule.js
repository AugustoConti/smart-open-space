import React from 'react';

import { Box, Grid } from 'grommet';
import PropTypes from 'prop-types';

import { useSlots } from '#api/sockets-client';

import Talk from './Talk';
import Talks from './Talks';

const Dots = ({ gridArea }) => (
  <Box
    alignSelf="center"
    border={{ size: 'xsmall', style: 'dashed' }}
    gridArea={gridArea}
  />
);
Dots.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

const HourHeader = ({ hour }) => (
  <Grid
    areas={[['left', 'main', 'right']]}
    columns={['flex', 'xsmall', 'flex']}
    rows={['xxsmall']}
  >
    <Dots gridArea="left" />
    <Box align="center" alignSelf="center" gridArea="main" flex>
      {`${hour}:00 hs`}
    </Box>
    <Dots gridArea="right" />
  </Grid>
);
HourHeader.propTypes = {
  hour: PropTypes.number.isRequired,
};

const TimeSpan = ({ hour, slots }) => (
  <>
    <HourHeader hour={hour} />
    {slots.length === 0 ? (
      <Box height="small" />
    ) : (
      <Talks>
        {slots.map(({ talk, room }) => (
          <Talk key={talk.id} talk={talk} room={room} />
        ))}
      </Talks>
    )}
  </>
);
TimeSpan.propTypes = {
  hour: PropTypes.number.isRequired,
  slots: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const getHour = time => Number(time.slice(0, 2));
const getRangeHours = (start, end) =>
  [...Array(getHour(end) + 1).keys()].slice(getHour(start));

const Schedule = ({ id, startTime, endTime }) => {
  const slots = useSlots(id);
  return getRangeHours(startTime, endTime).map(hour => {
    const slotsHour = slots.filter(s => s.hour === hour);
    const key = `${hour}-${slotsHour.map(s => s.id).join('-')}`;
    return <TimeSpan hour={hour} key={key} slots={slotsHour} />;
  });
};

export default Schedule;
